/* =====================================================================
   MOTORE DELLA CHAT — disegna il widget, gestisce le risposte,
   salva i progressi, costruisce il report e lo invia con Web3Forms.
   Non serve modificarlo: testi, domande e regole sono negli altri file.

   Indice:
     1. Impostazioni e memoria del browser
     2. Stato (dove si trova il cliente e cosa ha risposto)
     3. Testi e percorso delle domande
     4. Costruzione del widget (bolla isolata Shadow DOM)
     5. Schermate
     6. Azioni (clic, risposte, avanti, indietro)
     7. Analisi, report e invio
     8. Apertura, chiusura, tastiera, invito
     9. Sfera di particelle
    10. Avvio
   ===================================================================== */

(function () {
  "use strict";

  /* ====================== 1. IMPOSTAZIONI E MEMORIA ====================== */

  const C = window.PreventivoConfig || {};
  const TESTI = window.PreventivoTesti;
  const DOMANDE = window.PreventivoDomande;
  const SEZIONI = window.PreventivoSezioni;
  const REGOLE = window.PreventivoRegole;
  const BASE = window.PreventivoBase || "";
  const VER = window.PreventivoVer || "1";

  const CHIAVE = "preventivo-chat:v1";               // risposte salvate
  const CHIAVE_INVITO = "preventivo-chat:invito";    // nuvoletta già mostrata
  const CHIAVE_APERTA = "preventivo-chat:aperta";    // chat aperta (tra una pagina e l'altra)
  const MS_RIPRESA = 30 * 60 * 1000;                 // dopo 30 minuti chiede "Riprendiamo?"
  const SECONDI_PER_DOMANDA = 12;                    // per stimare il tempo rimanente
  const MS_MINIMO_UMANO = 8000;                      // invii più veloci = robot

  const LINGUE = (C.LINGUE || ["it"]).filter(l => TESTI[l]);
  const movimentoRidotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const suMobile = () => window.matchMedia("(max-width: 640px)").matches;
  const inProva = !C.ACCESS_KEY || C.ACCESS_KEY === "INSERISCI_QUI";

  // localStorage può essere bloccato (navigazione privata): ogni accesso è protetto
  const memoria = {
    leggi(k, sessione) {
      try { return JSON.parse((sessione ? window.sessionStorage : window.localStorage).getItem(k)); }
      catch (e) { return null; }
    },
    scrivi(k, v, sessione) {
      try { (sessione ? window.sessionStorage : window.localStorage).setItem(k, JSON.stringify(v)); }
      catch (e) { /* memoria non disponibile: la chat funziona comunque */ }
    },
    togli(k, sessione) {
      try { (sessione ? window.sessionStorage : window.localStorage).removeItem(k); }
      catch (e) { /* idem */ }
    }
  };

  /* ====================== 2. STATO ====================== */

  // S = ciò che viene salvato nel browser. temp = ciò che vale solo ora.
  let S = caricaStato();
  let temp = { conferma: "", ripresa: false, invio: "fermo", inVolo: false, esito: null, errori: {}, altroAperto: false, bot: false, token: 0, occupato: false, bozza: null };

  function linguaIniziale() {
    // Prima la lingua della pagina, poi quella del browser
    const candidati = [document.documentElement.lang || ""].concat(navigator.languages || [navigator.language || ""]);
    for (const c of candidati) {
      const l = String(c).slice(0, 2).toLowerCase();
      if (LINGUE.includes(l)) return l;
    }
    return LINGUE[0] || "it";
  }

  function statoNuovo(lingua) {
    return { versione: 1, lingua: lingua || linguaIniziale(), risposte: {}, contatto: {},
             schermata: "benvenuto", inizio: null, modifica: false, salvato: Date.now() };
  }

  function caricaStato() {
    const s = memoria.leggi(CHIAVE);
    const durata = (C.GIORNI_MEMORIA || 30) * 864e5;
    if (s && s.versione === 1 && LINGUE.includes(s.lingua) && Date.now() - s.salvato < durata && s.schermata !== "grazie") {
      const esiste = s.schermata === "benvenuto" || s.schermata === "contatti" || s.schermata === "riepilogo" ||
                     DOMANDE.some(q => "q:" + q.id === s.schermata);
      if (!esiste) s.schermata = "benvenuto";
      return s;
    }
    if (s) memoria.togli(CHIAVE);
    return statoNuovo();
  }

  function salva() {
    if (S.schermata === "grazie") return;   // dopo l'invio non si salva più nulla
    S.salvato = Date.now();
    memoria.scrivi(CHIAVE, S);
  }

  /* ====================== 3. TESTI E PERCORSO ====================== */

  const L = () => TESTI[S.lingua] || TESTI.it;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Sostituisce {nome}, {n}, ... I valori sono protetti (esc) se html = true
  function riempi(testo, extra, html) {
    const valori = Object.assign({ nome: S.risposte.nome || "" }, extra || {});
    return String(testo).replace(/\{(\w+)\}/g, (m, k) => (k in valori ? (html ? esc(valori[k]) : String(valori[k])) : m));
  }
  const testoUi = k => (L().ui[k] != null ? L().ui[k] : TESTI.it.ui[k] != null ? TESTI.it.ui[k] : k);
  const ui = (k, extra) => riempi(testoUi(k), extra, true);     // per l'HTML
  const uiT = (k, extra) => riempi(testoUi(k), extra, false);   // per attributi e testo semplice

  const testiDomanda = (id, lingua) => (TESTI[lingua || S.lingua] || TESTI.it).d[id] || TESTI.it.d[id] || { t: id };
  const etichetta = (id, valore, lingua) => {
    const d = testiDomanda(id, lingua);
    return (d.o && d.o[valore]) || (TESTI.it.d[id].o || {})[valore] || valore;
  };

  // Le domande che valgono per questo cliente (dipende dal ramo scelto)
  const percorso = () => DOMANDE.filter(q => !q.quando || q.quando(S.risposte));
  // Per il conteggio, finché il ramo non è scelto si ipotizza il primo (tutti i rami hanno 3 domande)
  const contate = () => {
    const tipo = DOMANDE.find(q => q.id === "tipo");
    const ipotesi = Object.assign({ tipo: tipo && tipo.opzioni[0] }, S.risposte);
    return DOMANDE.filter(q => (!q.quando || q.quando(ipotesi)) && q.conta !== false);
  };
  const domandaCorrente = () => DOMANDE.find(q => "q:" + q.id === S.schermata);

  function risposto(q) {
    const r = S.risposte[q.id];
    if (q.tipo === "multipla") return Array.isArray(r) && r.length > 0;
    if (q.tipo === "testo") return q.obbligatoria ? !!r : r !== undefined;
    if (q.altro && r === q.altro) return !!S.risposte[q.id + "_altro"];
    return !!r;
  }

  // Solo le risposte del percorso attuale (se il cliente cambia ramo, le vecchie non contano)
  function risposteAttive() {
    const a = {};
    percorso().forEach(q => {
      if (S.risposte[q.id] !== undefined) a[q.id] = S.risposte[q.id];
      if (S.risposte[q.id + "_altro"]) a[q.id + "_altro"] = S.risposte[q.id + "_altro"];
    });
    return a;
  }

  // Testo leggibile di una risposta, nella lingua richiesta
  function testoRisposta(q, lingua) {
    const r = S.risposte[q.id];
    if (q.tipo === "testo") return r ? String(r) : "—";
    if (q.tipo === "multipla") return Array.isArray(r) && r.length ? r.map(v => etichetta(q.id, v, lingua)).join(", ") : "—";
    if (!r) return "—";
    const base = etichetta(q.id, r, lingua);
    return q.altro && r === q.altro && S.risposte[q.id + "_altro"] ? base + ": " + S.risposte[q.id + "_altro"] : base;
  }

  // "Domanda 6 di 15": le domande non contate prendono il numero della precedente
  function posizione(q) {
    const c = contate(), p = percorso();
    let i = c.indexOf(q);
    for (let k = p.indexOf(q); i < 0 && k >= 0; k--) i = c.indexOf(p[k]);
    return { n: Math.max(1, i + 1), tot: c.length };
  }

  function primaMancante() {
    return percorso().find(q => !risposto(q));
  }

  /* ====================== 4. COSTRUZIONE DEL WIDGET ====================== */

  const el = {};

  function iniziale() {
    return esc((C.BRAND_NAME || "S").trim().charAt(0).toUpperCase());
  }
  function avatar(classe) {
    return C.LOGO_URL
      ? `<span class="pv-av ${classe || ""}"><img src="${esc(C.LOGO_URL)}" alt=""></span>`
      : `<span class="pv-av ${classe || ""}" aria-hidden="true">${iniziale()}</span>`;
  }

  function costruisci() {
    const host = document.createElement("div");
    host.id = "preventivo-chat";
    document.body.appendChild(host);
    const root = host.attachShadow({ mode: "open" });
    el.root = root;

    root.innerHTML = `
      <link rel="stylesheet" href="${esc(BASE)}widget.css?v=${esc(VER)}">
      <div class="pv${C.POSIZIONE === "sinistra" ? " pv--sinistra" : ""}" style="display:none">

        <button class="pv-lancia" type="button" aria-haspopup="dialog" aria-expanded="false">
          ${avatar()}<span class="pv-lancia-testo"></span>
        </button>

        <div class="pv-invito" hidden>
          <button class="pv-invito-testo" type="button"></button>
          <button class="pv-invito-x" type="button">×</button>
        </div>

        <div class="pv-pannello" role="dialog" aria-modal="true" aria-labelledby="pv-marchio" hidden>
          <canvas class="pv-sfera" aria-hidden="true"></canvas>
          <svg class="pv-archi" aria-hidden="true">
            <defs><path id="pv-cerchio" d=""></path></defs>
            <text><textPath href="#pv-cerchio" startOffset="4%" class="pv-arco1"></textPath></text>
            <text><textPath href="#pv-cerchio" startOffset="31%" class="pv-arco2"></textPath></text>
          </svg>

          <header class="pv-testa">
            <div class="pv-lingua">
              <button class="pv-lingua-btn" type="button" aria-haspopup="true" aria-expanded="false"></button>
              <ul class="pv-lingua-menu" hidden></ul>
            </div>
            <div class="pv-marchio" id="pv-marchio">${avatar("pv-av--testa")}<span>${esc(C.BRAND_NAME || "")}</span></div>
            <button class="pv-chiudi" type="button"><span aria-hidden="true">×</span></button>
          </header>

          <div class="pv-avanzamento" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></div>
          <p class="pv-passo"></p>

          <div class="pv-corpo"></div>

          <footer class="pv-piede">
            <button class="pv-indietro" type="button"><span class="pv-freccia" aria-hidden="true">←</span> <span class="pv-indietro-testo"></span></button>
            <span class="pv-tempo"></span>
          </footer>
        </div>
      </div>`;

    const $ = s => root.querySelector(s);
    Object.assign(el, {
      pv: $(".pv"), lancia: $(".pv-lancia"), lanciaTesto: $(".pv-lancia-testo"),
      invito: $(".pv-invito"), invitoTesto: $(".pv-invito-testo"), invitoX: $(".pv-invito-x"),
      pannello: $(".pv-pannello"), canvas: $(".pv-sfera"), archi: $(".pv-archi"), cerchio: $("#pv-cerchio"),
      arco1: $(".pv-arco1"), arco2: $(".pv-arco2"),
      linguaBtn: $(".pv-lingua-btn"), linguaMenu: $(".pv-lingua-menu"), chiudi: $(".pv-chiudi"),
      barra: $(".pv-avanzamento"), barraI: $(".pv-avanzamento i"), passo: $(".pv-passo"),
      corpo: $(".pv-corpo"), indietro: $(".pv-indietro"), indietroTesto: $(".pv-indietro-testo"), tempo: $(".pv-tempo")
    });

    // Mostra il widget solo quando lo stile è caricato (niente "lampi" senza stile)
    const foglio = $("link");
    const mostra = () => { el.pv.style.display = ""; sfera.misura(); };
    // La sfera si rimisura quando il pannello cambia dimensione (apertura, rotazione, finestra)
    if (window.ResizeObserver) new ResizeObserver(() => sfera.misura()).observe(el.canvas);
    foglio.addEventListener("load", mostra);
    foglio.addEventListener("error", mostra);

    // Menu lingue (una sola volta: i nomi delle lingue non cambiano)
    el.linguaMenu.innerHTML = LINGUE.map(l =>
      `<li><button type="button" data-lingua="${l}" lang="${l}">${esc(TESTI[l].nomeLingua)}</button></li>`).join("");
    if (LINGUE.length < 2) el.linguaBtn.parentNode.style.visibility = "hidden";

    collegaEventi();
  }

  // Aggiorna intestazione, barra, passo, pulsante indietro e testi fissi
  function aggiornaCornice() {
    const lingua = L();
    el.pv.setAttribute("dir", lingua.dir);
    el.pv.setAttribute("lang", S.lingua);
    if (S.lingua === "ar") caricaFontArabi();

    el.lanciaTesto.textContent = uiT("lancia");
    el.lancia.setAttribute("aria-label", uiT("lancia"));
    el.invitoTesto.textContent = uiT("invito");
    el.invitoX.setAttribute("aria-label", uiT("chiudi"));
    el.chiudi.setAttribute("aria-label", uiT("chiudi"));
    el.linguaBtn.textContent = S.lingua.toUpperCase();
    el.linguaBtn.setAttribute("aria-label", uiT("lingua") + ": " + lingua.nomeLingua);
    el.linguaMenu.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", String(b.dataset.lingua === S.lingua)));
    el.indietroTesto.textContent = uiT("indietro");
    el.arco1.textContent = uiT("arco1");
    el.arco2.textContent = uiT("arco2");

    const schermata = temp.ripresa ? "ripresa" : S.schermata;
    const q = schermata === "ripresa" ? null : domandaCorrente();
    let perc = 0, passo = "", tempo = "";
    const tot = contate().length;
    if (q) {
      const pos = posizione(q);
      perc = (pos.n - 1) / (tot + 1) * 100;
      passo = uiT("domanda", { n: pos.n, tot: pos.tot }) + " · " + (lingua.sezioni[q.sezione] || "");
      const minuti = Math.ceil(((pos.tot - pos.n) * SECONDI_PER_DOMANDA + 30) / 60);
      tempo = pos.tot - pos.n <= 1 ? uiT("quasi") : uiT("restanti", { m: minuti });
    } else if (schermata === "contatti") {
      perc = tot / (tot + 1) * 100; passo = lingua.sezioni.contatti; tempo = uiT("quasi");
    } else if (schermata === "riepilogo" || schermata === "grazie") {
      perc = 100; passo = schermata === "riepilogo" ? lingua.sezioni.contatti : "";
    }
    const conBarra = !["benvenuto", "ripresa", "grazie"].includes(schermata);
    el.barra.style.visibility = conBarra ? "" : "hidden";
    el.barraI.style.width = perc.toFixed(1) + "%";
    el.barra.setAttribute("aria-valuenow", String(Math.round(perc)));
    el.barra.setAttribute("aria-label", passo || uiT("lancia"));
    el.passo.textContent = passo;
    el.tempo.textContent = tempo;
    el.indietro.hidden = ["benvenuto", "ripresa", "grazie"].includes(schermata);
  }

  // Font eleganti da Google Fonts (disattivabili con FONT_GOOGLE: false in config.js).
  // Vanno nella pagina principale: dentro la bolla isolata i font non si possono dichiarare.
  function caricaFont() {
    if (C.FONT_GOOGLE === false || document.getElementById("preventivo-font")) return;
    const f = document.createElement("link");
    f.id = "preventivo-font";
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap";
    document.head.appendChild(f);
  }

  let fontArabiCaricati = false;
  function caricaFontArabi() {
    if (fontArabiCaricati || C.FONT_GOOGLE === false) return;
    fontArabiCaricati = true;
    const f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500&family=Noto+Sans+Arabic:wght@300;400;500&display=swap";
    document.head.appendChild(f);
  }

  /* ====================== 5. SCHERMATE ====================== */

  // Disegna la schermata attuale; con "scrivendo" mostra prima i tre puntini
  function disegna(opzioni) {
    const o = opzioni || {};
    const token = ++temp.token;
    aggiornaCornice();
    const attesa = Math.min(600, Math.max(0, C.DURATA_SCRITTURA_MS == null ? 550 : C.DURATA_SCRITTURA_MS));
    if (o.scrivendo && attesa && !movimentoRidotto) {
      el.corpo.innerHTML = `<div class="pv-scrive" role="status"><span class="pv-sr">${ui("scrive")}</span><i></i><i></i><i></i></div>`;
      sfera.modo(S.schermata);
      setTimeout(() => { if (token === temp.token) disegnaSchermata(o); }, attesa);
    } else {
      disegnaSchermata(o);
    }
  }

  function disegnaSchermata(o) {
    const opz = o || {};
    // Il riepilogo richiede tutte le risposte: se ne manca una, ci si torna
    if (S.schermata === "riepilogo") {
      const manca = primaMancante();
      if (manca) { S.modifica = true; S.schermata = "q:" + manca.id; }
      else if (Object.keys(validaContatti()).length) { S.schermata = "contatti"; temp.errori = validaContatti(); }
      aggiornaCornice();
    }

    let html;
    const schermata = temp.ripresa ? "ripresa" : S.schermata;
    if (schermata === "ripresa") html = schermataRipresa();
    else if (schermata === "benvenuto") html = schermataBenvenuto();
    else if (schermata === "contatti") html = schermataContatti();
    else if (schermata === "riepilogo") html = schermataRiepilogo();
    else if (schermata === "grazie") html = schermataGrazie();
    else html = schermataDomanda(domandaCorrente());

    // Ridisegni "sul posto" (errori, lingua, invio): niente animazione d'ingresso né salto in cima
    const sulPosto = opz.fuoco === false;
    el.corpo.classList.toggle("pv-statico", sulPosto);
    const scorrimento = el.corpo.scrollTop;
    el.corpo.innerHTML = html;
    temp.bozza = null;
    el.corpo.scrollTop = sulPosto ? scorrimento : 0;
    el.pannello.classList.toggle("pv--centrato", ["benvenuto", "ripresa", "grazie"].includes(schermata));
    sfera.modo(schermata);

    if (opz.fuoco !== false && aperta) {
      const f = el.corpo.querySelector("[data-fuoco]");
      if (f) f.focus({ preventScroll: true });
    }
  }

  function schermataBenvenuto() {
    return `<section class="pv-scena pv-scena--centro">
      <h2 class="pv-q pv-q--grande" tabindex="-1" data-fuoco>${ui("benvenutoTitolo")}</h2>
      <p class="pv-testo">${ui("benvenutoTesto")}</p>
      <button class="pv-btn" type="button" data-azione="inizia">${ui("iniziamo")}</button>
      <p class="pv-nota">${ui("durata", { tot: contate().length })}</p>
    </section>`;
  }

  function schermataRipresa() {
    return `<section class="pv-scena pv-scena--centro">
      <h2 class="pv-q pv-q--grande" tabindex="-1" data-fuoco>${ui("ripresaTitolo")}</h2>
      <p class="pv-testo">${ui("ripresaTesto")}</p>
      <button class="pv-btn" type="button" data-azione="riprendi">${ui("riprendi")}</button>
      <button class="pv-link" type="button" data-azione="ricomincia">${ui("ricomincia")}</button>
    </section>`;
  }

  function schermataDomanda(q) {
    const d = testiDomanda(q.id);
    const conferma = temp.conferma ? `<p class="pv-ok">${temp.conferma}</p>` : "";
    temp.conferma = "";

    // --- Domanda con campo da scrivere ---
    if (q.tipo === "testo") {
      const valore = temp.bozza && temp.bozza.campo != null ? temp.bozza.campo : (S.risposte[q.id] || "");
      const errore = temp.errori.campo || "";
      return `<form class="pv-scena" data-form="testo" novalidate>
        ${conferma}
        <h2 class="pv-q" tabindex="-1"><label for="pv-campo">${esc(d.t)}</label></h2>
        ${d.h ? `<p class="pv-hint" id="pv-hint">${esc(d.h)}</p>` : ""}
        <input class="pv-campo-grande" id="pv-campo" type="text" data-fuoco
          ${q.formato === "url" ? 'inputmode="url" autocomplete="url"' : 'autocomplete="given-name"'}
          maxlength="${q.formato === "url" ? 200 : 40}" placeholder="${esc(d.p || "")}" value="${esc(valore)}"
          aria-describedby="pv-err${d.h ? " pv-hint" : ""}" ${errore ? 'aria-invalid="true"' : ""}>
        <p class="pv-errore" id="pv-err" role="alert">${errore}</p>
        <div class="pv-azioni">
          <button class="pv-btn" type="submit">${ui("continua")}</button>
          ${q.obbligatoria ? "" : `<button class="pv-link" type="button" data-azione="salta">${ui("salta")}</button>`}
        </div>
      </form>`;
    }

    // --- Domanda a scelta (singola o multipla) ---
    const multipla = q.tipo === "multipla";
    const scelte = multipla ? (S.risposte[q.id] || []) : [S.risposte[q.id]];
    const pieno = multipla && q.max && scelte.length >= q.max;
    const suggerimento = multipla ? (q.max ? ui("maxN", { max: q.max }) : ui("piuRisposte")) : "";
    const hint = [d.h ? esc(d.h) : "", suggerimento].filter(Boolean).join(" ");

    const bottoni = q.opzioni.map(v => {
      const scelto = scelte.includes(v);
      const bloccato = pieno && !scelto;
      return `<button class="pv-opz" type="button" data-azione="${multipla ? "alterna" : "scegli"}" data-valore="${v}"
        aria-pressed="${scelto}" ${bloccato ? 'aria-disabled="true"' : ""}><span>${esc(etichetta(q.id, v))}</span></button>`;
    }).join("");

    const conAltro = q.altro && (temp.altroAperto || S.risposte[q.id] === q.altro || (temp.bozza && temp.bozza.altro != null));
    const altro = conAltro ? `<form class="pv-altro" data-form="altro" novalidate>
        <label class="pv-sr" for="pv-altro">${esc(etichetta(q.id, q.altro))}</label>
        <input class="pv-campo" id="pv-altro" type="text" maxlength="60" placeholder="${ui("altroSegnaposto")}"
          value="${esc(temp.bozza && temp.bozza.altro != null ? temp.bozza.altro : (S.risposte[q.id + "_altro"] || ""))}" aria-describedby="pv-err" ${temp.errori.campo ? 'aria-invalid="true"' : ""}>
        <p class="pv-errore" id="pv-err" role="alert">${temp.errori.campo || ""}</p>
        <button class="pv-btn" type="submit">${ui("continua")}</button>
      </form>` : "";

    return `<section class="pv-scena">
      ${conferma}
      <h2 class="pv-q" id="pv-q" tabindex="-1" data-fuoco>${esc(d.t)}</h2>
      ${hint ? `<p class="pv-hint">${hint}</p>` : ""}
      <div class="pv-opzioni" role="group" aria-labelledby="pv-q">${bottoni}</div>
      ${altro}
      ${multipla ? `<div class="pv-azioni"><button class="pv-btn" type="button" data-azione="continua" ${scelte.length ? "" : "disabled"}>${ui("continua")}</button></div>` : ""}
    </section>`;
  }

  // Telefono obbligatorio solo se il cliente vuole essere chiamato o scritto su WhatsApp
  const telefonoNecessario = () => S.risposte.canale === "telefono" || S.risposte.canale === "whatsapp";

  function schermataContatti() {
    const c = S.contatto, e = temp.errori;
    const nomeIniziale = c.nome != null ? c.nome : (S.risposte.nome || "");
    const campo = (id, etich, tipo, auto, valore, obbligatorio, extra) => `
      <div class="pv-f">
        <label for="pv-${id}">${etich}${obbligatorio ? "" : ` <em>(${ui("facoltativo")})</em>`}</label>
        <input id="pv-${id}" name="${id}" type="${tipo}" autocomplete="${auto}" value="${esc(valore || "")}"
          ${obbligatorio ? 'aria-required="true"' : ""} ${e[id] ? `aria-invalid="true" aria-describedby="pv-e-${id}"` : ""} ${extra || ""}>
        ${e[id] ? `<p class="pv-errore" id="pv-e-${id}">${e[id]}</p>` : ""}
      </div>`;
    const privacy = C.PRIVACY_URL
      ? `<a href="${esc(C.PRIVACY_URL)}" target="_blank" rel="noopener">${ui("privacy")}</a>`
      : ui("privacy");

    return `<form class="pv-scena pv-modulo" data-form="contatti" novalidate>
      <h2 class="pv-q pv-q--medio" tabindex="-1" data-fuoco>${ui("contattiTitolo")}</h2>
      <p class="pv-hint">${ui("contattiSotto")}</p>
      ${campo("nome", ui("fNome"), "text", "name", nomeIniziale, true, 'maxlength="80"')}
      ${campo("attivita", ui("fAttivita"), "text", "organization", c.attivita, false, 'maxlength="80"')}
      ${campo("email", ui("fEmail"), "email", "email", c.email, true, 'maxlength="120" inputmode="email"')}
      ${campo("telefono", ui("fTelefono"), "tel", "tel", c.telefono, telefonoNecessario(), 'maxlength="30" inputmode="tel"')}
      <div class="pv-f">
        <label for="pv-note">${ui("fNote")} <em>(${ui("facoltativo")})</em></label>
        <textarea id="pv-note" name="note" rows="3" maxlength="1000" placeholder="${ui("fNoteSegnaposto")}">${esc(c.note || "")}</textarea>
      </div>
      <div class="pv-consenso">
        <input type="checkbox" id="pv-consenso" name="consenso" ${c.consenso ? "checked" : ""} aria-required="true"
          ${e.consenso ? 'aria-invalid="true" aria-describedby="pv-e-consenso"' : ""}>
        <label for="pv-consenso">${ui("consenso")} ${privacy}.</label>
      </div>
      ${e.consenso ? `<p class="pv-errore" id="pv-e-consenso">${e.consenso}</p>` : ""}
      <div class="pv-trappola" aria-hidden="true">
        <label>Non compilare<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></label>
      </div>
      <div class="pv-azioni"><button class="pv-btn" type="submit">${ui("rivedi")}</button></div>
    </form>`;
  }

  function schermataRiepilogo() {
    const lingua = L();
    const p = percorso();
    const blocchi = SEZIONI.filter(s => s !== "contatti").map(sezione => {
      const righe = p.filter(q => q.sezione === sezione).map(q => `
        <div class="pv-riga">
          <dt>${esc(testiDomanda(q.id).t)}</dt>
          <dd><span>${esc(testoRisposta(q))}</span>
            <button class="pv-link pv-link--piccolo" type="button" data-azione="modifica" data-id="${q.id}"
              aria-label="${esc(uiT("modifica") + ": " + testiDomanda(q.id).t)}">${ui("modifica")}</button></dd>
        </div>`).join("");
      return righe ? `<div class="pv-blocco"><h3>${esc(lingua.sezioni[sezione])}</h3><dl>${righe}</dl></div>` : "";
    }).join("");

    const c = S.contatto;
    const dati = [c.nome, c.attivita, c.email, c.telefono].filter(Boolean).map(esc).join("<br>");
    const invio = temp.invio === "invio";
    return `<section class="pv-scena pv-riepilogo">
      <h2 class="pv-q pv-q--medio" tabindex="-1" data-fuoco>${ui("riepTitolo")}</h2>
      <p class="pv-hint">${ui("riepSotto")}</p>
      ${blocchi}
      <div class="pv-blocco"><h3>${ui("tuoiDati")}</h3><dl>
        <div class="pv-riga"><dt class="pv-sr">${ui("tuoiDati")}</dt><dd><span>${dati}${c.note ? `<br><em>“${esc(c.note)}”</em>` : ""}</span>
          <button class="pv-link pv-link--piccolo" type="button" data-azione="modifica" data-id="contatti"
            aria-label="${esc(uiT("modifica") + ": " + uiT("tuoiDati"))}">${ui("modifica")}</button></dd></div>
      </dl></div>
      ${temp.invio === "errore" ? `<p class="pv-errore pv-errore--blocco" role="alert">${ui("errInvio")}</p>` : ""}
      <div class="pv-azioni">
        <button class="pv-btn" type="button" data-azione="invia" ${invio ? 'disabled aria-busy="true"' : ""}>
          ${invio ? ui("invio") : temp.invio === "errore" ? ui("riprova") : ui("invia")}</button>
      </div>
    </section>`;
  }

  function schermataGrazie() {
    const pacchetto = (L().pacchetti[temp.esito && temp.esito.pacchetto] || L().pacchetti.business);
    const prenoto = S.risposte.canale === "prenoto";
    let prenota = "";
    if (C.BOOKING_URL) {
      const link = `href="${esc(C.BOOKING_URL)}" target="_blank" rel="noopener"`;
      prenota = prenoto
        ? `<a class="pv-btn" ${link}>${ui("prenota")}</a>`
        : `<p class="pv-hint">${ui("prenotaAlt")}</p><a class="pv-btn pv-btn--sec" ${link}>${ui("prenota")}</a>`;
    } else if (prenoto) {
      prenota = `<p class="pv-hint">${ui("prenotaPoi")}</p>`;
    }
    return `<section class="pv-scena pv-scena--centro pv-grazie">
      <h2 class="pv-q pv-q--grande" tabindex="-1" data-fuoco>${ui("grazieTitolo")}</h2>
      <p class="pv-testo">${ui("grazieTesto")}</p>
      <div class="pv-pacchetto">
        <p class="pv-occhiello">${ui("progettoIdeale")}</p>
        <p class="pv-pacchetto-nome">${esc(pacchetto.n)}</p>
        <p class="pv-pacchetto-testo">${esc(pacchetto.d)}</p>
      </div>
      ${prenota}
      <button class="pv-link" type="button" data-azione="chiudi">${ui("chiudi")}</button>
      ${inProva ? `<p class="pv-prova">Modalità prova: nessuna email inviata. Il report è nella console del browser.</p>` : ""}
    </section>`;
  }

  /* ====================== 6. AZIONI ====================== */

  function vai(schermata, scrivendo) {
    if (temp.inVolo) return;              // richiesta in invio: si resta sul riepilogo
    S.schermata = schermata;
    temp.altroAperto = false;
    temp.errori = {};
    salva();
    disegna({ scrivendo });
  }

  // Passa alla domanda successiva del percorso.
  // In modalità "modifica" (dal riepilogo) salta quelle già risposte.
  function avanti() {
    const p = percorso();
    const i = p.findIndex(q => "q:" + q.id === S.schermata);
    for (let k = i + 1; k < p.length; k++) {
      if (S.modifica && risposto(p[k])) continue;
      return vai("q:" + p[k].id, true);
    }
    if (S.modifica) { S.modifica = false; temp.conferma = ""; return vai("riepilogo", false); }
    vai("contatti", true);
  }

  function indietro() {
    if (temp.inVolo) return;
    temp.conferma = "";
    temp.invio = "fermo";
    const p = percorso();
    if (S.schermata === "riepilogo") return vai("contatti");
    if (S.schermata === "contatti") {
      if (S.modifica) { S.modifica = false; return vai("riepilogo"); }
      return vai("q:" + p[p.length - 1].id);
    }
    const i = p.findIndex(q => "q:" + q.id === S.schermata);
    vai(i > 0 ? "q:" + p[i - 1].id : "benvenuto");
  }

  function impostaConferma(q) {
    temp.conferma = q.conferma && L().conferme[q.conferma] ? riempi(L().conferme[q.conferma], null, true) : "";
  }

  // Risposta singola: si vede la scelta per un attimo, poi si va avanti
  function scegli(valore) {
    const q = domandaCorrente();
    if (!q || temp.occupato) return;
    S.risposte[q.id] = valore;
    if (q.altro) {
      if (valore === q.altro) {
        temp.altroAperto = true;
        salva();
        disegnaSchermata({ fuoco: false });
        const campo = el.corpo.querySelector("#pv-altro");
        if (campo) campo.focus();
        return;
      }
      delete S.risposte[q.id + "_altro"];
    }
    salva();
    el.corpo.querySelectorAll(".pv-opz").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.valore === valore)));
    impostaConferma(q);
    temp.occupato = true;
    const da = S.schermata;
    setTimeout(() => {
      temp.occupato = false;
      if (S.schermata === da && aperta) avanti();   // annullato se nel frattempo si è tornati indietro o chiuso
    }, movimentoRidotto ? 0 : 260);
  }

  // Risposta multipla: aggiunge o toglie, rispettando massimo ed esclusive
  function alterna(valore, bottone) {
    const q = domandaCorrente();
    if (!q || bottone.getAttribute("aria-disabled") === "true") return;
    let scelte = Array.isArray(S.risposte[q.id]) ? S.risposte[q.id].slice() : [];
    if (scelte.includes(valore)) scelte = scelte.filter(v => v !== valore);
    else if (valore === q.esclusiva) scelte = [valore];
    else {
      scelte = scelte.filter(v => v !== q.esclusiva);
      if (!q.max || scelte.length < q.max) scelte.push(valore);
    }
    S.risposte[q.id] = scelte;
    salva();
    // Aggiorna i pulsanti senza ridisegnare (il fuoco resta dov'è)
    const pieno = q.max && scelte.length >= q.max;
    el.corpo.querySelectorAll(".pv-opz").forEach(b => {
      const scelto = scelte.includes(b.dataset.valore);
      b.setAttribute("aria-pressed", String(scelto));
      if (pieno && !scelto) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled");
    });
    const continua = el.corpo.querySelector('[data-azione="continua"]');
    if (continua) continua.disabled = scelte.length === 0;
  }

  function inviaTesto(form) {
    const q = domandaCorrente();
    let v = form.querySelector("#pv-campo").value.trim().replace(/\s+/g, " ");
    if (q.obbligatoria && !v) {
      temp.errori = { campo: ui("nomeErrore") };
      disegnaSchermata({ fuoco: false });
      el.corpo.querySelector("#pv-campo").focus();
      return;
    }
    if (q.id === "nome") v = v.charAt(0).toUpperCase() + v.slice(1);
    S.risposte[q.id] = v;
    impostaConferma(q);
    avanti();
  }

  function inviaAltro(form) {
    const q = domandaCorrente();
    const v = form.querySelector("#pv-altro").value.trim();
    if (!v) {
      temp.errori = { campo: ui("errObbligatorio") };
      temp.altroAperto = true;
      disegnaSchermata({ fuoco: false });
      el.corpo.querySelector("#pv-altro").focus();
      return;
    }
    S.risposte[q.id] = q.altro;
    S.risposte[q.id + "_altro"] = v;
    impostaConferma(q);
    avanti();
  }

  function leggiContatti(form) {
    const v = n => (form.elements[n] ? String(form.elements[n].value).trim() : "");
    S.contatto = { nome: v("nome"), attivita: v("attivita"), email: v("email"), telefono: v("telefono"),
                   note: v("note"), consenso: form.elements.consenso.checked };
    if (form.elements.botcheck && form.elements.botcheck.checked) temp.bot = true;
  }

  // Controlla i dati di contatto. Usata dal modulo, dal riepilogo e prima dell'invio:
  // così non si può arrivare all'invio con dati sbagliati o senza consenso.
  function validaContatti() {
    const c = S.contatto, e = {};
    const cifre = String(c.telefono || "").replace(/\D/g, "").length;
    if (!c.nome) e.nome = ui("errObbligatorio");
    if (!c.email) e.email = ui("errObbligatorio");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) e.email = ui("errEmail");
    if ((telefonoNecessario() || c.telefono) && cifre < 6) e.telefono = ui("errTelefono");
    if (!c.consenso) e.consenso = ui("errConsenso");
    return e;
  }

  function inviaContatti(form) {
    leggiContatti(form);
    const e = validaContatti();
    salva();
    if (Object.keys(e).length) {
      temp.errori = e;
      disegnaSchermata({ fuoco: false });
      const primo = el.corpo.querySelector('[aria-invalid="true"]');
      if (primo) primo.focus();
      return;
    }
    S.modifica = false;
    vai("riepilogo", false);
  }

  const azioni = {
    inizia() { S.inizio = S.inizio || Date.now(); temp.conferma = ""; vai("q:" + percorso()[0].id, true); },
    riprendi() { temp.ripresa = false; disegna(); },
    ricomincia() { S = statoNuovo(S.lingua); temp.ripresa = false; temp.esito = null; temp.invio = "fermo"; salva(); disegna(); },
    scegli(b) { scegli(b.dataset.valore); },
    alterna(b) { alterna(b.dataset.valore, b); },
    continua() {
      const q = domandaCorrente();
      if (q && risposto(q)) { impostaConferma(q); avanti(); }
    },
    salta() { const q = domandaCorrente(); S.risposte[q.id] = ""; avanti(); },
    modifica(b) {
      if (temp.inVolo) return;
      S.modifica = true;
      temp.invio = "fermo";
      vai(b.dataset.id === "contatti" ? "contatti" : "q:" + b.dataset.id, false);
    },
    invia() { inviaRichiesta(); },
    chiudi() { chiudi(); }
  };

  function collegaEventi() {
    el.lancia.addEventListener("click", () => apri());
    el.invitoTesto.addEventListener("click", () => apri());
    el.invitoX.addEventListener("click", nascondiInvito);
    el.chiudi.addEventListener("click", () => chiudi());
    el.indietro.addEventListener("click", indietro);

    el.corpo.addEventListener("click", e => {
      const b = e.target.closest("[data-azione]");
      if (!b || b.disabled) return;
      const f = azioni[b.dataset.azione];
      if (f) f(b);
    });

    el.corpo.addEventListener("submit", e => {
      e.preventDefault();
      const tipo = e.target.dataset.form;
      if (tipo === "testo") inviaTesto(e.target);
      else if (tipo === "altro") inviaAltro(e.target);
      else if (tipo === "contatti") inviaContatti(e.target);
    });

    // I dati di contatto si salvano mentre si scrive
    el.corpo.addEventListener("input", e => {
      const form = e.target.closest('[data-form="contatti"]');
      if (form) { leggiContatti(form); salva(); }
    });
    el.corpo.addEventListener("change", e => {
      const form = e.target.closest('[data-form="contatti"]');
      if (form) { leggiContatti(form); salva(); }
    });

    // Lingua
    el.linguaBtn.addEventListener("click", () => menuLingue(el.linguaMenu.hidden));
    el.linguaMenu.addEventListener("click", e => {
      const b = e.target.closest("[data-lingua]");
      if (!b) return;
      const campo = el.corpo.querySelector("#pv-campo"), altro = el.corpo.querySelector("#pv-altro");
      temp.bozza = { campo: campo ? campo.value : null, altro: altro ? altro.value : null };
      S.lingua = b.dataset.lingua;
      salva();
      menuLingue(false);
      disegna({ fuoco: false });
      el.linguaBtn.focus();
    });
    el.root.addEventListener("click", e => {
      if (!el.linguaMenu.hidden && !e.target.closest(".pv-lingua")) menuLingue(false);
    });

    el.root.addEventListener("keydown", tastiera);
    window.addEventListener("resize", () => sfera.misura());

    // Qualsiasi elemento del sito con data-preventivo (o link a #preventivo) apre la chat
    document.addEventListener("click", e => {
      const t = e.target.closest && e.target.closest('[data-preventivo], a[href="#preventivo"]');
      if (t) { e.preventDefault(); apri(); }
    });
  }

  function menuLingue(apri) {
    el.linguaMenu.hidden = !apri;
    el.linguaBtn.setAttribute("aria-expanded", String(apri));
    if (apri) {
      const corrente = el.linguaMenu.querySelector(`[data-lingua="${S.lingua}"]`);
      if (corrente) corrente.focus();
    }
  }

  /* ====================== 7. ANALISI, REPORT E INVIO ====================== */

  const prova = (f, a) => { try { return !!f(a); } catch (e) { return false; } };

  function analizza() {
    const a = risposteAttive();
    const regola = REGOLE.pacchetti.find(r => prova(r.vale, a));
    const punti = REGOLE.punti.reduce((t, r) => t + (prova(r.vale, a) ? r.punti : 0), 0);
    return {
      pacchetto: regola ? regola.pacchetto : REGOLE.pacchettoPredefinito,
      motivo: regola ? regola.perche : "nessuna regola specifica, pacchetto predefinito",
      punti,
      complessita: punti >= REGOLE.soglie.alta ? "Alta" : punti >= REGOLE.soglie.media ? "Media" : "Bassa",
      extra: REGOLE.extra.filter(r => prova(r.vale, a)).map(r => r.servizio),
      priorita: prova(REGOLE.prioritaAlta, a) ? "ALTA" : "Normale"
    };
  }

  // Il report che ricevi per email: sempre in italiano
  function costruisciReport(an) {
    const c = S.contatto;
    const q = id => DOMANDE.find(x => x.id === id);
    const r = id => (percorso().includes(q(id)) ? testoRisposta(q(id), "it") : "—");
    const linea = "────────────────────────────────";
    const righe = [
      "NUOVA RICHIESTA DI PREVENTIVO",
      an.priorita === "ALTA" ? "★ PRIORITÀ ALTA" : "",
      linea, "",
      "1. DATI DI CONTATTO",
      "Nome: " + (c.nome || "—"),
      "Attività: " + (c.attivita || "—"),
      "Email: " + (c.email || "—"),
      "Telefono: " + (c.telefono || "—"),
      "Canale preferito: " + r("canale"),
      "Lingua usata nella chat: " + TESTI[S.lingua].nomeLingua,
      "", linea, "",
      "2. PROFILO",
      "Tipo di attività: " + r("tipo"),
      "Settore: " + r("settore"),
      "Punto di partenza: " + r("partenza"),
      "Sito attuale: " + (S.risposte.sito_attuale && percorso().includes(q("sito_attuale")) ? S.risposte.sito_attuale : "—"),
      "Sito di ispirazione: " + (S.risposte.ispirazione || "—"),
      "", linea, "",
      "3. TUTTE LE RISPOSTE"
    ];
    // Le domande con "valuta" (il budget) mostrano la fascia nella valuta vista dal cliente
    const rispostaReport = dom => testoRisposta(dom, dom.valuta ? S.lingua : "it");
    percorso().forEach((dom, i) => {
      righe.push("", (i + 1) + ". " + testiDomanda(dom.id, "it").t, "   → " + rispostaReport(dom));
    });
    righe.push("", linea, "",
      "4. ANALISI AUTOMATICA",
      "Pacchetto suggerito: " + TESTI.it.pacchetti[an.pacchetto].n + "  (" + an.motivo + ")",
      "Complessità stimata: " + an.complessita + "  (" + an.punti + " punti)",
      "Servizi extra da proporre:" + (an.extra.length ? "" : " nessuno in particolare"));
    an.extra.forEach(x => righe.push("   • " + x));
    righe.push("Budget dichiarato: " + rispostaReport(q("budget")));
    righe.push("Priorità del contatto: " + an.priorita);
    if (S.risposte.canale === "prenoto") {
      righe.push(C.BOOKING_URL ? "Nota: il cliente ha scelto di prenotare subito la call dal link di prenotazione."
                               : "Nota: il cliente vuole prenotare una call. Inviagli tu il link.");
    }
    righe.push("", linea, "", "5. NOTE DEL CLIENTE", c.note || "—");
    return righe.filter((x, i) => !(x === "" && i === 1)).join("\n");
  }

  const pausa = ms => new Promise(r => setTimeout(r, ms));

  async function spedisci(an) {
    const c = S.contatto;
    const pacchetto = TESTI.it.pacchetti[an.pacchetto].n;
    const controllo = new AbortController();
    const timer = setTimeout(() => controllo.abort(), 30000);
    try {
      const risposta = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controllo.signal,
        body: JSON.stringify({
          access_key: C.ACCESS_KEY,
          subject: "Nuova richiesta preventivo – " + (c.attivita || c.nome) + " – " + pacchetto,
          from_name: (C.BRAND_NAME || "Sito") + " · Chatbot preventivi",
          name: c.nome,
          email: c.email,
          message: costruisciReport(an)
        })
      });
      const dati = await risposta.json().catch(() => ({}));
      if (!risposta.ok || !dati.success) throw new Error(dati.message || "HTTP " + risposta.status);
    } finally {
      clearTimeout(timer);
    }
  }

  async function inviaRichiesta() {
    if (temp.invio === "invio") return;
    const manca = primaMancante();
    if (manca) { S.modifica = true; return vai("q:" + manca.id, false); }
    const errori = validaContatti();
    if (Object.keys(errori).length) { vai("contatti", false); temp.errori = errori; return disegnaSchermata({ fuoco: false }); }

    temp.invio = "invio";
    temp.inVolo = true;
    disegnaSchermata({ fuoco: false });
    const an = analizza();
    try {
      const robot = temp.bot || (S.inizio && Date.now() - S.inizio < MS_MINIMO_UMANO);
      if (robot) {
        await pausa(600);                       // finto successo: il robot non sa di essere stato fermato
      } else if (inProva) {
        console.info("[Preventivo] MODALITÀ PROVA — inserisci ACCESS_KEY in config.js per ricevere le email.\n\n" +
          "OGGETTO: Nuova richiesta preventivo – " + (S.contatto.attivita || S.contatto.nome) + " – " +
          TESTI.it.pacchetti[an.pacchetto].n + "\n\n" + costruisciReport(an));
        await pausa(700);
      } else {
        await spedisci(an);
      }
    } catch (err) {
      console.error("[Preventivo] Invio non riuscito:", err);
      temp.inVolo = false;
      temp.invio = "errore";
      disegnaSchermata({ fuoco: false });
      const b = el.corpo.querySelector('[data-azione="invia"]');
      if (b) b.focus();
      return;
    }

    temp.inVolo = false;
    temp.invio = "fermo";
    temp.esito = an;
    memoria.togli(CHIAVE);
    S.schermata = "grazie";
    disegna();

    // Segnale per Google Analytics / Tag Manager, se presenti nel sito
    window.dispatchEvent(new CustomEvent("preventivo:inviato", { detail: { pacchetto: an.pacchetto } }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: "preventivo_inviato", pacchetto: an.pacchetto });
  }

  /* ====================== 8. APERTURA, CHIUSURA, TASTIERA ====================== */

  let aperta = false;
  let overflowPrecedente = null;   // null = non abbiamo bloccato lo scorrimento

  // Se il cliente torna dopo più di 30 minuti a metà questionario, gli chiediamo se riprendere
  function valutaRipresa() {
    temp.ripresa = !["benvenuto", "grazie"].includes(S.schermata) && Date.now() - S.salvato > MS_RIPRESA && !!S.risposte.nome;
  }

  function apri(senzaAnimazione) {
    if (aperta) return;
    aperta = true;
    if (!temp.ripresa) valutaRipresa();
    nascondiInvito();
    memoria.scrivi(CHIAVE_APERTA, true, true);
    el.pv.classList.add("pv--aperta");
    el.lancia.setAttribute("aria-expanded", "true");
    el.pannello.hidden = false;
    if (suMobile()) {
      overflowPrecedente = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }
    sfera.misura();
    sfera.avvia();
    disegna();
    if (senzaAnimazione || movimentoRidotto) el.pannello.classList.add("pv-visibile");
    else requestAnimationFrame(() => requestAnimationFrame(() => el.pannello.classList.add("pv-visibile")));
    window.dispatchEvent(new CustomEvent("preventivo:aperto"));
  }

  function chiudi() {
    if (!aperta) return;
    aperta = false;
    memoria.togli(CHIAVE_APERTA, true);
    el.pannello.classList.remove("pv-visibile");
    el.lancia.setAttribute("aria-expanded", "false");
    if (overflowPrecedente !== null) {
      document.documentElement.style.overflow = overflowPrecedente;
      overflowPrecedente = null;
    }
    menuLingue(false);
    setTimeout(() => {
      if (aperta) return;
      el.pannello.hidden = true;
      el.pv.classList.remove("pv--aperta");
      sfera.ferma();
      el.lancia.focus();
    }, movimentoRidotto ? 0 : 280);
    // Dopo l'invio, la prossima apertura riparte da capo
    if (S.schermata === "grazie") { S = statoNuovo(S.lingua); temp.esito = null; }
  }

  function tastiera(e) {
    if (e.key === "Escape") {
      if (!el.linguaMenu.hidden) { menuLingue(false); el.linguaBtn.focus(); }
      else if (aperta) chiudi();
      else nascondiInvito();
      return;
    }
    if (!aperta) return;

    // Frecce su/giù tra le risposte
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && e.target.classList && e.target.classList.contains("pv-opz")) {
      const tutte = Array.from(el.corpo.querySelectorAll(".pv-opz"));
      const i = tutte.indexOf(e.target) + (e.key === "ArrowDown" ? 1 : -1);
      if (tutte[i]) { e.preventDefault(); tutte[i].focus(); }
      return;
    }

    // Il tasto Tab resta dentro la chat finché è aperta
    if (e.key === "Tab") {
      const focalizzabili = Array.from(el.pannello.querySelectorAll(
        'button:not([disabled]), a[href], input:not([tabindex="-1"]), textarea'))
        .filter(x => x.offsetParent !== null && !x.closest("[hidden]"));
      if (!focalizzabili.length) return;
      const primo = focalizzabili[0], ultimo = focalizzabili[focalizzabili.length - 1];
      const attivo = el.root.activeElement;
      if (e.shiftKey && (attivo === primo || !el.pannello.contains(attivo))) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && (attivo === ultimo || !el.pannello.contains(attivo))) { e.preventDefault(); primo.focus(); }
    }
  }

  function mostraInvito() {
    if (aperta || memoria.leggi(CHIAVE_INVITO)) return;
    memoria.scrivi(CHIAVE_INVITO, true);
    el.invito.hidden = false;
    requestAnimationFrame(() => el.invito.classList.add("pv-visibile"));
  }
  function nascondiInvito() {
    el.invito.classList.remove("pv-visibile");
    el.invito.hidden = true;
  }

  /* ====================== 9. SFERA DI PARTICELLE ====================== */

  // Una sfera di punti che ruota lentamente: grande nell'accoglienza,
  // tenue sullo sfondo durante le domande. Ferma se la chat è chiusa
  // o se il visitatore ha chiesto meno animazioni.
  const sfera = (function () {
    let ctx, w = 0, h = 0, raf = null, angolo = 0;
    const punti = [];
    const corrente = { x: 0, y: 0, r: 0, a: 0 };
    const meta = { x: 0, y: 0, r: 0, a: 0 };
    let modoAttuale = "benvenuto";

    function crea() {
      const n = suMobile() ? 900 : 1400;
      const oro = Math.PI * (3 - Math.sqrt(5));     // distribuzione uniforme sulla sfera
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, raggio = Math.sqrt(1 - y * y), t = oro * i;
        const j = 0.94 + Math.random() * 0.06;
        punti.push({ x: Math.cos(t) * raggio * j, y: y * j, z: Math.sin(t) * raggio * j, s: Math.random() < 0.12 ? 1.6 : 1 });
      }
    }

    function calcolaMeta(salta) {
      const grande = modoAttuale === "benvenuto" || modoAttuale === "ripresa" || modoAttuale === "grazie";
      meta.x = w / 2;
      meta.y = grande ? h * 0.42 : h * 0.4;
      meta.r = grande ? Math.min(w * 0.36, h * 0.27) : Math.min(w * 0.44, h * 0.32);
      meta.a = modoAttuale === "grazie" ? 0.45 : grande ? 1 : 0.4;
      if (salta) Object.assign(corrente, meta);
      // Scritte ad arco solo nell'accoglienza (non in arabo: le lettere vanno legate)
      const archi = modoAttuale === "benvenuto" && S.lingua !== "ar";
      el.archi.classList.toggle("pv-visibile", archi);
      const r = meta.r + 22;
      el.archi.setAttribute("viewBox", `0 0 ${w} ${h}`);
      el.cerchio.setAttribute("d", `M ${meta.x - r} ${meta.y} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`);
    }

    function misura() {
      if (!el.canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = el.canvas.clientWidth; h = el.canvas.clientHeight;
      if (!w || !h) return;
      el.canvas.width = w * dpr; el.canvas.height = h * dpr;
      ctx = el.canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      calcolaMeta(true);
      disegnaFotogramma();
    }

    function disegnaFotogramma() {
      if (!ctx) return;
      ["x", "y", "r", "a"].forEach(k => { corrente[k] += (meta[k] - corrente[k]) * 0.07; });
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#F3EEE6";
      const cos = Math.cos(angolo), sin = Math.sin(angolo), ct = Math.cos(0.38), st = Math.sin(0.38);
      for (const p of punti) {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const y = p.y * ct - z * st;
        const z2 = p.y * st + z * ct;
        const profondita = (z2 + 1) / 2;
        ctx.globalAlpha = (0.08 + 0.5 * profondita) * corrente.a;
        ctx.fillRect(corrente.x + x * corrente.r, corrente.y + y * corrente.r, p.s, p.s);
      }
      ctx.globalAlpha = 1;
    }

    function ciclo() {
      angolo += 0.0018;
      disegnaFotogramma();
      raf = requestAnimationFrame(ciclo);
    }

    return {
      misura,
      modo(m) { modoAttuale = m; if (w) { calcolaMeta(movimentoRidotto); if (movimentoRidotto) disegnaFotogramma(); } },
      avvia() {
        if (!punti.length) crea();
        if (movimentoRidotto) { disegnaFotogramma(); return; }
        if (!raf) raf = requestAnimationFrame(ciclo);
      },
      ferma() { if (raf) cancelAnimationFrame(raf); raf = null; }
    };
  })();

  /* ====================== 10. AVVIO ====================== */

  function avvia() {
    if (!TESTI || !DOMANDE || !REGOLE) { console.error("[Preventivo] File mancanti: controlla la cartella widget/"); return; }
    caricaFont();
    costruisci();

    // Se il cliente torna dopo più di 30 minuti a metà questionario, gli chiediamo se riprendere
    valutaRipresa();
    aggiornaCornice();

    // La chat era aperta su un'altra pagina del sito: la riapriamo
    if (memoria.leggi(CHIAVE_APERTA, true) || location.hash === "#preventivo") apri(true);

    if (C.INVITO_DOPO_SECONDI > 0) setTimeout(mostraInvito, C.INVITO_DOPO_SECONDI * 1000);

    if (inProva) console.info("[Preventivo] Widget caricato in MODALITÀ PROVA (ACCESS_KEY non inserita).");

    // Per aprire o chiudere la chat da altri script del sito
    window.PreventivoChat = { apri: () => apri(), chiudi: () => chiudi() };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", avvia);
  else avvia();
})();
