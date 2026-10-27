/* =====================================================================
   AVVIO DEL WIDGET — è l'unico file da collegare al tuo sito:

     <script src="https://INDIRIZZO/widget/preventivo.js" defer></script>

   Questo file carica, nell'ordine, tutti gli altri pezzi della cartella
   widget/ (configurazione, testi, domande, regole, motore e stile).
   Non serve modificarlo.
   ===================================================================== */

(function () {
  "use strict";

  // Evita di caricare il widget due volte se il tag è incollato due volte
  if (window.__preventivoAvviato) return;
  window.__preventivoAvviato = true;

  // Trova l'indirizzo da cui è stato caricato questo file:
  // gli altri file stanno nella stessa cartella.
  // Se un plugin di ottimizzazione (WP Rocket, Autoptimize...) unisce gli script,
  // aggiungi al tag data-preventivo-base="https://INDIRIZZO/widget/" oppure escludi il file dall'unione.
  const questoScript = Array.from(document.scripts).find(s => s.dataset.preventivoBase || /\/preventivo\.js([?#]|$)/.test(s.src)) ||
    document.currentScript;
  if (!questoScript) return;
  const base = window.PreventivoBase || questoScript.dataset.preventivoBase ||
    questoScript.src.replace(/[^/?#]*([?#].*)?$/, "");
  const versione = (questoScript.src.match(/[?&]v=([^&#]+)/) || [])[1] || "1";
  window.PreventivoBase = base;
  window.PreventivoVer = versione;

  // Se il sito ha già definito delle impostazioni prima di questo tag
  // (utile su Wix/Squarespace), le teniamo e le applichiamo sopra config.js.
  const impostazioniDalSito = window.PreventivoConfig || null;

  const file = ["config.js", "testi.js", "domande.js", "regole.js", "chat.js"];

  // Carica i file uno dopo l'altro (l'ordine conta)
  function carica(i) {
    if (i === 1 && impostazioniDalSito) Object.assign(window.PreventivoConfig, impostazioniDalSito);
    if (i >= file.length) return;
    const s = document.createElement("script");
    s.src = base + file[i] + "?v=" + versione;
    s.onload = () => carica(i + 1);
    s.onerror = () => console.error("[Preventivo] Non riesco a caricare " + s.src);
    document.head.appendChild(s);
  }
  carica(0);
})();
