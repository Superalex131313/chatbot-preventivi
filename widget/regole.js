/* =====================================================================
   REGOLE DELL'ANALISI AUTOMATICA — cosa trovi nell'email che ricevi.
   Tutto ciò che decide pacchetto, complessità, servizi extra e
   priorità sta qui, in un unico posto facile da modificare.

   "a" contiene le risposte del cliente, per esempio:
     a.tipo = "ecommerce"             (risposta singola)
     a.b_priorita = ["estero", ...]   (risposta multipla)
   I codici delle risposte sono quelli di domande.js.
   ===================================================================== */

(function () {
  // Piccolo aiuto: vero se una risposta (singola o multipla) contiene il valore
  const ha = (risposta, valore) =>
    Array.isArray(risposta) ? risposta.includes(valore) : risposta === valore;

  // Fasce di budget dalla più bassa alla più alta ("non_so" non è in elenco)
  const FASCE = ["meno1000", "da1000a2500", "da2500a5000", "oltre5000"];
  const budgetAlmeno = (a, fascia) => FASCE.indexOf(a.budget) >= FASCE.indexOf(fascia);

  // Il cliente vuole collegare strumenti esterni (gestionale, agenda, CRM...)?
  const integrazioni = a =>
    ha(a.b_priorita, "gestionale") ||
    (Array.isArray(a.c_strumenti) && a.c_strumenti.some(s => s !== "nessuno"));

  // Il cliente vuole far prenotare (appuntamenti, servizi, consulenze)?
  const prenota = a =>
    ha(a.a_funzioni, "prenotazioni") || ha(a.c_online, "appuntamento") ||
    ha(a.c_strumenti, "agenda") || a.d_azione === "consulenza" || a.obiettivo === "tempo";

  // Il cliente vuole un'area riservata?
  const areaRiservata = a =>
    ha(a.d_area, "clienti") || ha(a.d_area, "documenti") || ha(a.b_priorita, "area");

  window.PreventivoRegole = {

    /* --- 1. PACCHETTO SUGGERITO ---------------------------------------
       Le regole si leggono dall'alto in basso: vince la PRIMA che vale.
       Per cambiare la priorità, sposta le righe. */
    pacchetti: [
      { pacchetto: "premium",
        perche: "budget oltre la fascia più alta oppure identità visiva da creare",
        vale: a => a.budget === "oltre5000" || a.identita === "no" },

      { pacchetto: "ecommerce",
        perche: "vendita online con più di 20 prodotti, vendita all'estero o collegamento al gestionale",
        vale: a => (a.tipo === "ecommerce" && (a.b_prodotti === "da20a100" || a.b_prodotti === "oltre100"))
                   || ha(a.b_priorita, "estero") || ha(a.b_priorita, "gestionale") || ha(a.c_strumenti, "gestionale")
                   || (a.tipo === "entrambi" && ha(a.c_online, "spedizione")) },

      { pacchetto: "business",
        perche: "area riservata, prenotazioni o integrazioni con altri strumenti",
        vale: a => areaRiservata(a) || integrazioni(a) || prenota(a) },

      { pacchetto: "essenziale",
        perche: "budget nella fascia più bassa e nessuna funzione extra",
        vale: a => a.budget === "meno1000" && a.tipo !== "ecommerce" && a.tipo !== "entrambi" &&
                   (a.tipo !== "negozio" || ha(a.a_funzioni, "nessuna")) }
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
      { punti: 1, vale: a => ha(a.b_priorita, "estero") },
      { punti: 2, vale: a => areaRiservata(a) },
      { punti: 2, vale: a => integrazioni(a) },
      { punti: 1, vale: a => prenota(a) },
      { punti: 1, vale: a => ha(a.a_funzioni, "fedelta") || ha(a.c_online, "ritiro") || ha(a.c_online, "disponibilita") },
      { punti: 1, vale: a => a.atmosfera === "dinamica" },
      { punti: 1, vale: a => a.identita === "no" },
      { punti: 1, vale: a => a.contenuti === "voi" }
    ],
    soglie: { media: 3, alta: 6 },

    /* --- 3. SERVIZI EXTRA DA PROPORRE --------------------------------- */
    extra: [
      { servizio: "Identità visiva (logo, colori, font)",     vale: a => a.identita === "no" },
      { servizio: "Completamento identità visiva",           vale: a => a.identita === "logo" },
      { servizio: "Copywriting dei testi",                   vale: a => a.contenuti === "voi" || a.contenuti === "parte" },
      { servizio: "Servizio fotografico / video",            vale: a => ha(a.a_vetrina, "spazio") || (a.contenuti === "voi" && a.atmosfera === "premium") },
      { servizio: "Integrazioni (gestionale, agenda, CRM)",  vale: a => integrazioni(a) },
      { servizio: "Sistema di prenotazione online",          vale: a => prenota(a) },
      { servizio: "Sito multilingua e vendita internazionale", vale: a => ha(a.b_priorita, "estero") },
      { servizio: "SEO locale e Google Business Profile",    vale: a => a.tipo === "negozio" || a.tipo === "entrambi" },
      { servizio: "Migrazione dal sito attuale",             vale: a => a.partenza === "rifare" || a.partenza === "migliorare" }
    ],

    /* --- 4. PRIORITÀ DEL CONTATTO -------------------------------------
       Alta se i tempi sono brevi E il budget parte da 1.000 (o equivalente). */
    prioritaAlta: a =>
      (a.tempi === "subito" || a.tempi === "settimane") && budgetAlmeno(a, "da1000a2500")
  };
})();
