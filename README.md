# Chatbot preventivi

Un assistente elegante che guida i visitatori del tuo sito in 15 domande e ti manda via email una richiesta di preventivo già analizzata: pacchetto suggerito, complessità, servizi extra da proporre e priorità del contatto.

- Design "Anello d'oro": nero, avorio e oro tenue. Un anello d'oro si disegna all'apertura, una luce gli gira intorno e a ogni risposta parte un'onda leggera.
- Cinque lingue (italiano, inglese, francese, tedesco, arabo), scelte in automatico.
- Su smartphone si apre a schermo intero, su computer come pannello in basso a destra.
- Ricorda i progressi: chi chiude la chat riprende da dove era.
- Si inserisce in qualsiasi sito con **un solo tag**.

---

## Cosa c'è nella cartella

| File | A cosa serve | Lo devi toccare? |
|---|---|---|
| `widget/config.js` | Chiave Web3Forms, link di prenotazione, privacy, nome del brand | **Sì** |
| `widget/testi.js` | Tutte le frasi, in 5 lingue | Solo per cambiare un testo |
| `widget/domande.js` | Ordine e logica delle domande | Raramente |
| `widget/regole.js` | Regole di pacchetto, complessità, extra, priorità | Se vuoi cambiare l'analisi |
| `widget/widget.css` | Colori e stile | Solo per i colori (in alto nel file) |
| `widget/chat.js` | Il motore | No |
| `widget/preventivo.js` | L'avvio: è il file che colleghi al sito | No |
| `index.html` | Pagina di prova | No |

---

## Passo 1 — Inserire le tre impostazioni

Apri `widget/config.js` e cambia solo il testo tra virgolette.

### ACCESS_KEY (per ricevere le email)
1. Vai su **https://web3forms.com** e scrivi l'email su cui vuoi ricevere le richieste.
2. Web3Forms ti manda per email una chiave lunga, tipo `a1b2c3d4-....`.
3. In `config.js` sostituisci `INSERISCI_QUI`:
   ```js
   ACCESS_KEY: "a1b2c3d4-e5f6-....",
   ```
Finché lasci `INSERISCI_QUI` la chat funziona in **modalità prova**: non invia nulla e mostra il report nella console del browser. Comodo per provarla.

> La chiave di Web3Forms è pensata per stare in pagine pubbliche: non è una password. Per i robot c'è già una protezione (campo trappola e controllo dei tempi).

### BOOKING_URL (facoltativo)
Il tuo link Calendly, Cal.com o Google Calendar. Compare alla fine a chi sceglie "Prenoto subito un appuntamento", e come seconda opzione a tutti gli altri.
```js
BOOKING_URL: "https://calendly.com/iltuostudio/call-30-minuti",
```

### PRIVACY_URL (obbligatoria per legge)
L'indirizzo della tua pagina privacy:
```js
PRIVACY_URL: "https://www.iltuodominio.com/privacy",
```

### Il tuo brand
```js
BRAND_NAME: "Nome del tuo studio",
LOGO_URL: "",   // facoltativo: un'immagine quadrata del logo
```

---

## Passo 2 — Anteprima online (GitHub Pages)

La repository è pubblica e GitHub Pages è già attivo: ogni modifica salvata su GitHub va online da sola in un minuto o due.

- Anteprima del chatbot: **https://superalex131313.github.io/chatbot-preventivi/**
- Le 10 proposte di visual: `design/sfondi.png`. Le 10 proposte di design: `design/proposte.png`.

---

## Passo 3 — Inserirlo nel tuo sito

Copia questo tag e incollalo **prima di `</body>`** in tutte le pagine (o nel "footer" del tuo sito):

```html
<script src="https://superalex131313.github.io/chatbot-preventivi/widget/preventivo.js" defer></script>
```

Se preferisci ospitare i file sul tuo dominio (per esempio sull'hosting di Namecheap), carica la cartella `widget` e cambia l'indirizzo nel tag:
```html
<script src="https://www.iltuodominio.com/widget/preventivo.js" defer></script>
```

### Dove si incolla, piattaforma per piattaforma
- **WordPress**: installa il plugin gratuito *WPCode* → Code Snippets → Header & Footer → incolla in **Footer** → Salva.
  Se usi un plugin che "unisce" gli script (WP Rocket, Autoptimize, LiteSpeed), escludi `preventivo.js` dall'unione, oppure aggiungi al tag l'indirizzo della cartella:
  `<script src=".../widget/preventivo.js" data-preventivo-base="https://superalex131313.github.io/chatbot-preventivi/widget/" defer></script>`
- **Shopify**: Negozio online → Temi → ⋯ → Modifica codice → `theme.liquid` → incolla subito prima di `</body>` → Salva.
- **Wix**: Impostazioni → Codice personalizzato → Aggiungi codice → incolla, scegli "Tutte le pagine" e posizione **Body - end**.
- **Squarespace**: Impostazioni → Avanzate → Inserimento codice → **Footer**.
- **Webflow**: Site settings → Custom code → **Footer code** → Publish.
- **Sito HTML**: incolla il tag prima di `</body>` in ogni pagina.

### Aprire la chat dai tuoi pulsanti
Qualsiasi pulsante o link del tuo sito può aprire la chat:
```html
<a href="#preventivo">Richiedi un preventivo</a>
<button data-preventivo>Parliamo del tuo progetto</button>
```
Anche un link al tuo sito che finisce con `#preventivo` (es. `iltuodominio.com/#preventivo`) apre la chat subito: utile nelle email o nella bio di Instagram.

### Impostazioni senza toccare i file (Wix, Squarespace)
Se non puoi modificare `config.js`, scrivi le impostazioni **prima** del tag:
```html
<script>
  window.PreventivoConfig = { ACCESS_KEY: "la-tua-chiave", PRIVACY_URL: "https://...", BRAND_NAME: "Il tuo Studio" };
</script>
<script src="https://.../widget/preventivo.js" defer></script>
```

---

## Personalizzare

- **Cambiare una frase**: `widget/testi.js`, nella lingua giusta.
- **Fasce di budget e valute**: domanda `budget` in `testi.js`. Euro per italiano, francese e tedesco, dollari per l'inglese, dirham per l'arabo.
- **Regole del pacchetto suggerito**: `widget/regole.js`. Le regole si leggono dall'alto e vince la prima che vale.
- **Colori**: le prime righe di `widget/widget.css`.
- **Togliere una lingua**: in `config.js` togli il suo codice da `LINGUE`.

## Dopo ogni modifica
Il browser dei visitatori può tenere in memoria i file vecchi. Per essere sicuro che vedano la nuova versione, aumenta il numero nel tag:
```html
<script src=".../widget/preventivo.js?v=2" defer></script>
```

## Privacy
- Le risposte restano nel browser del visitatore (localStorage) finché non invia la richiesta, poi vengono cancellate. Dopo 30 giorni di inattività vengono comunque dimenticate.
- Prima dell'invio è obbligatorio il consenso, con link alla tua privacy policy.
- I font vengono caricati da Google Fonts. Se preferisci non contattare Google (GDPR), metti `FONT_GOOGLE: false` in `config.js`: la chat userà font di sistema simili.
