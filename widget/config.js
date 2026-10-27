/* =====================================================================
   CONFIGURAZIONE — l'unico file che devi toccare per personalizzare
   il chatbot. Cambia solo il testo tra virgolette.
   ===================================================================== */

window.PreventivoConfig = {

  /* --- 1. CHIAVE WEB3FORMS (obbligatoria per ricevere le email) -------
     La trovi nell'email che Web3Forms ti manda dopo esserti registrato
     su https://web3forms.com. Incollala al posto di INSERISCI_QUI.
     Finché resta INSERISCI_QUI il chatbot funziona in "modalità prova":
     non invia nulla e mostra il report nella console del browser. */
  ACCESS_KEY: "INSERISCI_QUI",

  /* --- 2. LINK DI PRENOTAZIONE (facoltativo) --------------------------
     Il tuo link Calendly, Google Calendar, Cal.com...
     Esempio: "https://calendly.com/iltuostudio/call-30-minuti"
     Lascialo vuoto ("") se non hai un sistema di prenotazione. */
  BOOKING_URL: "",

  /* --- 3. PRIVACY POLICY (obbligatoria per legge) ---------------------
     L'indirizzo della pagina privacy del tuo sito. */
  PRIVACY_URL: "https://www.iltuosito.it/privacy",

  /* --- 4. IL TUO BRAND ------------------------------------------------ */
  BRAND_NAME: "Il tuo Studio",   // compare in alto nella chat e nelle email
  LOGO_URL: "",                  // facoltativo: immagine quadrata del logo (es. "https://.../logo.png").
                                 // Se vuoto viene mostrata l'iniziale del nome.

  /* --- 5. LINGUE ------------------------------------------------------
     La chat sceglie da sola la lingua del visitatore tra queste.
     Togli dalla lista quelle che non vuoi. La prima è quella di riserva. */
  LINGUE: ["it", "en", "fr", "de", "ar"],

  /* --- 6. COMPORTAMENTO ----------------------------------------------- */
  INVITO_DOPO_SECONDI: 8,        // nuvoletta di invito (una sola volta). 0 = mai
  DURATA_SCRITTURA_MS: 550,      // animazione "sta scrivendo" (massimo 600)
  POSIZIONE: "destra",           // "destra" oppure "sinistra"
  GIORNI_MEMORIA: 30,            // dopo quanti giorni dimentica una chat lasciata a metà

  /* --- 7. FONT --------------------------------------------------------
     true = carica Cormorant Garamond e Inter da Google Fonts.
     false = non contatta Google (più prudente per il GDPR): usa i font
     del tuo sito se li hai già, altrimenti font di sistema simili. */
  FONT_GOOGLE: true
};
