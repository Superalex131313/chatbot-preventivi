/* =====================================================================
   DOMANDE — l'ordine e la logica del questionario.
   I testi visibili (in tutte le lingue) stanno in testi.js:
   qui ci sono solo i "codici" delle domande e delle risposte.

   Ogni domanda ha:
     id        codice della domanda (lo stesso usato in testi.js)
     tipo      "singola"  = una risposta, si passa subito alla domanda dopo
               "multipla" = più risposte e pulsante "Continua"
               "testo"    = campo da scrivere
     sezione   gruppo mostrato in alto (profilo, progetto, stile, dettagli)
     opzioni   codici delle risposte, nell'ordine in cui compaiono
     max       (multipla) quante risposte al massimo
     esclusiva (multipla) risposta che toglie tutte le altre ("No, ...")
     altro     codice della risposta che apre un campo da scrivere
     quando    la domanda compare solo se questa condizione è vera
     conta     false = non entra nel conteggio "Domanda X di Y"
     conferma  codice della micro-frase mostrata dopo la risposta
     facoltativa  (testo) si può saltare
     valuta    nel report la risposta resta nella lingua (e valuta) del cliente

   Ogni ramo ha 3 domande: se ne aggiungi una, aggiungila a tutti i rami
   così il contatore "Domanda X di Y" resta preciso fin dall'inizio.
   ===================================================================== */

(function () {
  // Il ramo dipende dalla risposta alla domanda "tipo"
  const ramo = (a, r) => a.tipo === r;

  window.PreventivoDomande = [
    /* ---- PROFILO ---- */
    { id: "nome", tipo: "testo", sezione: "profilo", obbligatoria: true, conferma: "nome" },

    { id: "tipo", tipo: "singola", sezione: "profilo", conferma: "partenza",
      opzioni: ["negozio", "ecommerce", "entrambi", "servizi"] },

    { id: "settore", tipo: "singola", sezione: "profilo", altro: "altro",
      opzioni: ["moda", "food", "beauty", "casa", "ospitalita", "professionisti", "altro"] },

    { id: "obiettivo", tipo: "singola", sezione: "profilo", conferma: "obiettivo",
      opzioni: ["clienti", "vendite", "immagine", "tempo"] },

    { id: "partenza", tipo: "singola", sezione: "profilo",
      opzioni: ["no", "rifare", "migliorare"] },

    { id: "sito_attuale", tipo: "testo", sezione: "profilo", conta: false, formato: "url", facoltativa: true,
      quando: a => a.partenza === "rifare" || a.partenza === "migliorare" },

    /* ---- RAMO A — Negozio o spazio fisico ---- */
    { id: "a_vetrina", tipo: "multipla", max: 2, sezione: "progetto", quando: a => ramo(a, "negozio"),
      opzioni: ["prodotti", "info", "promo", "spazio"] },
    { id: "a_contatto", tipo: "multipla", sezione: "progetto", quando: a => ramo(a, "negozio"),
      opzioni: ["telefono", "whatsapp", "form", "social"] },
    { id: "a_funzioni", tipo: "multipla", esclusiva: "nessuna", sezione: "progetto", quando: a => ramo(a, "negozio"),
      opzioni: ["catalogo", "prenotazioni", "fedelta", "nessuna"] },

    /* ---- RAMO B — Vendita online ---- */
    { id: "b_vendita", tipo: "multipla", sezione: "progetto", quando: a => ramo(a, "ecommerce"),
      opzioni: ["fisici", "digitali", "servizi", "abbonamenti"] },
    { id: "b_prodotti", tipo: "singola", sezione: "progetto", quando: a => ramo(a, "ecommerce"),
      opzioni: ["fino20", "da20a100", "oltre100", "da_definire"] },
    { id: "b_priorita", tipo: "multipla", max: 2, sezione: "progetto", quando: a => ramo(a, "ecommerce"),
      opzioni: ["pagamenti", "spedizioni", "estero", "gestionale", "area"] },

    /* ---- RAMO C — Negozio e online ---- */
    { id: "c_priorita", tipo: "singola", sezione: "progetto", quando: a => ramo(a, "entrambi"),
      opzioni: ["vendere", "negozio", "brand"] },
    { id: "c_online", tipo: "multipla", sezione: "progetto", quando: a => ramo(a, "entrambi"),
      opzioni: ["spedizione", "ritiro", "disponibilita", "appuntamento"] },
    { id: "c_strumenti", tipo: "multipla", esclusiva: "nessuno", sezione: "progetto", quando: a => ramo(a, "entrambi"),
      opzioni: ["gestionale", "agenda", "crm", "nessuno"] },

    /* ---- RAMO D — Servizi e consulenze ---- */
    { id: "d_azione", tipo: "singola", sezione: "progetto", quando: a => ramo(a, "servizi"),
      opzioni: ["preventivo", "consulenza", "whatsapp"] },
    { id: "d_convincere", tipo: "multipla", max: 2, sezione: "progetto", quando: a => ramo(a, "servizi"),
      opzioni: ["servizi", "metodo", "risultati", "storia", "prezzi"] },
    { id: "d_area", tipo: "singola", sezione: "progetto", quando: a => ramo(a, "servizi"),
      opzioni: ["no", "clienti", "documenti", "valutiamo"] },

    /* ---- STILE (per tutti) ---- */
    { id: "atmosfera", tipo: "singola", sezione: "stile", conferma: "scelta",
      opzioni: ["minimal", "premium", "dinamica", "concreta"] },
    { id: "ispirazione", tipo: "testo", sezione: "stile", formato: "url", facoltativa: true },
    { id: "identita", tipo: "singola", sezione: "stile",
      opzioni: ["tutto", "logo", "no"] },
    { id: "contenuti", tipo: "singola", sezione: "stile",
      opzioni: ["pronti", "parte", "voi"] },

    /* ---- DETTAGLI (per tutti) ---- */
    { id: "tempi", tipo: "singola", sezione: "dettagli", conferma: "tempi",
      opzioni: ["subito", "settimane", "mesi", "calma"] },
    { id: "canale", tipo: "singola", sezione: "dettagli",
      opzioni: ["email", "telefono", "whatsapp", "prenoto"] },
    // valuta: true = nel report la fascia resta nella valuta vista dal cliente
    { id: "budget", tipo: "singola", sezione: "dettagli", valuta: true,
      opzioni: ["meno1000", "da1000a2500", "da2500a5000", "oltre5000", "non_so"] }
  ];

  // Ordine dei gruppi mostrati in alto nella chat
  window.PreventivoSezioni = ["profilo", "progetto", "stile", "dettagli", "contatti"];
})();
