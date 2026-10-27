/* =====================================================================
   REGOLE DELL'ANALISI AUTOMATICA — cosa trovi nell'email che ricevi.
   Tutto ciò che decide pacchetto, complessità, servizi extra e
   priorità sta qui, in un unico posto facile da modificare.

   "a" contiene le risposte del cliente, per esempio:
     a.tipo = "ecommerce"            (risposta singola)
     a.obiettivo = ["vendere", ...]  (risposta multipla)
   I codici delle risposte sono quelli di domande.js.
   ===================================================================== */

(function () {
  // Piccolo aiuto: vero se una risposta (singola o multipla) contiene il valore
  const ha = (risposta, valore) =>
    Array.isArray(risposta) ? risposta.includes(valore) : risposta === valore;

  // Il cliente vuole collegare strumenti esterni (gestionale, agenda, CRM...)?
  const integrazioni = a =>
    ha(a.b_priorita, "gestionale") ||
    (Array.isArray(a.c_strumenti) && a.c_strumenti.some(s => s !== "nessuno"));

  // Il cliente vuole far prenotare (appuntamenti, servizi, call)?
  const prenota = a =>
    ha(a.obiettivo, "prenotazioni") || ha(a.a_funzioni, "prenotazioni") || a.a_contatto === "prenotazione" ||
    a.c_priorita === "prenotazioni" || ha(a.c_strumenti, "agenda") || a.d_azione === "call";

  // Il cliente vuole un'area riservata?
  const areaRiservata = a =>
    ha(a.d_area, "clienti") || ha(a.d_area, "documenti") || ha(a.b_priorita, "area");

  window.PreventivoRegole = {

    /* --- 1. PACCHETTO SUGGERITO ---------------------------------------
       Le regole si leggono dall'alto in basso: vince la PRIMA che vale.
       Per cambiare la priorità, sposta le righe. */
    pacchetti: [
      { pacchetto: "premium",
        perche: "budget premium oppure identità visiva da creare",
        vale: a => a.investimento === "premium" || a.identita === "no" },

      { pacchetto: "ecommerce",
        perche: "e-commerce con più di 20 prodotti oppure collegamento al gestionale",
        vale: a => (a.tipo === "ecommerce" && (a.b_prodotti === "da20a100" || a.b_prodotti === "oltre100"))
                   || ha(a.b_priorita, "gestionale") || ha(a.c_strumenti, "gestionale") },

      { pacchetto: "business",
        perche: "area riservata o integrazioni con altri strumenti",
        vale: a => areaRiservata(a) || integrazioni(a) },

      { pacchetto: "essenziale",
        perche: "nessuna funzione extra e budget essenziale",
        vale: a => a.investimento === "essenziale" && !prenota(a) &&
                   (a.tipo !== "negozio" || ha(a.a_funzioni, "nessuna")) &&
                   a.tipo !== "ecommerce" && a.tipo !== "entrambi" }
    ],
    // Se nessuna regola vale:
    pacchettoPredefinito: "business",

    /* --- 2. COMPLESSITÀ STIMATA ---------------------------------------
       Ogni voce aggiunge punti. Totale: fino a 2 = Bassa, 3-5 = Media, 6+ = Alta */
    punti: [
      { punti: 2, vale: a => a.tipo === "ecommerce" || a.tipo === "entrambi" },
      { punti: 1, vale: a => a.b_prodotti === "da20a100" },
      { punti: 2, vale: a => a.b_prodotti === "oltre100" },
      { punti: 1, vale: a => ha(a.b_vendita, "abbonamenti") },
      { punti: 2, vale: a => areaRiservata(a) },
      { punti: 2, vale: a => integrazioni(a) },
      { punti: 1, vale: a => prenota(a) },
      { punti: 1, vale: a => ha(a.a_funzioni, "fedelta") || ha(a.c_unione, "ritiro") },
      { punti: 1, vale: a => a.atmosfera === "dinamica" },
      { punti: 1, vale: a => a.identita === "no" },
      { punti: 1, vale: a => a.contenuti === "voi" }
    ],
    soglie: { media: 3, alta: 6 },

    /* --- 3. SERVIZI EXTRA DA PROPORRE --------------------------------- */
    extra: [
      { servizio: "Identità visiva (logo, colori, font)", vale: a => a.identita === "no" },
      { servizio: "Completamento identità visiva",         vale: a => a.identita === "logo" || a.identita === "colori" },
      { servizio: "Copywriting dei testi",                 vale: a => a.contenuti === "voi" || a.contenuti === "parte" || a.contenuti === "insieme" },
      { servizio: "Servizio fotografico / video",          vale: a => ha(a.a_vetrina, "foto") || (a.contenuti === "voi" && a.atmosfera === "premium") },
      { servizio: "Integrazioni (gestionale, agenda, CRM)", vale: a => integrazioni(a) },
      { servizio: "Sistema di prenotazione online",        vale: a => prenota(a) },
      { servizio: "SEO locale e Google Business Profile",  vale: a => a.tipo === "negozio" || a.tipo === "entrambi" },
      { servizio: "Migrazione dal sito attuale",           vale: a => a.partenza === "rifare" || a.partenza === "migliorare" }
    ],

    /* --- 4. PRIORITÀ DEL CONTATTO -------------------------------------
       Alta se i tempi sono brevi E l'investimento è equilibrato o premium
       (oppure il budget dichiarato supera i 2.500 €). */
    prioritaAlta: a =>
      (a.tempi === "subito" || a.tempi === "settimane") &&
      (a.investimento === "equilibrato" || a.investimento === "premium" ||
       a.budget === "da2500a5000" || a.budget === "oltre5000")
  };
})();
