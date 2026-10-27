/* =====================================================================
   TESTI — tutte le frasi del chatbot, in ogni lingua.
   Per cambiare una frase, modifica il testo tra virgolette.
   {nome}, {n}, {tot}, {max}, {m} sono segnaposto: lasciali come sono.

   Struttura di ogni lingua:
     ui        pulsanti, messaggi e schermate
     conferme  micro-frasi dopo alcune risposte
     sezioni   nomi dei gruppi di domande
     pacchetti nome e descrizione mostrati al cliente alla fine
     d         le domande: t = titolo, h = sottotitolo, p = testo d'esempio
               nel campo, o = risposte (i codici sono quelli di domande.js)

   L'email che ricevi è sempre in italiano, tranne la fascia di budget,
   che resta nella valuta della lingua scelta dal cliente.
   VALUTE DEL BUDGET: euro (it, fr, de), dollari USA (en), dirham degli
   Emirati (ar, fasce convertite circa x4). Cambiale nella domanda "budget".
   ===================================================================== */

window.PreventivoTesti = {

  /* ============================== ITALIANO ============================== */
  it: {
    nomeLingua: "Italiano", dir: "ltr",
    ui: {
      lancia: "Richiedi un preventivo",
      invito: "Ti serve un sito? Lo definiamo insieme in pochi minuti.",
      chiudi: "Chiudi", lingua: "Lingua", ruolo: "Consulente di progetto",
      indietro: "Indietro", continua: "Continua", salta: "Salta", iniziamo: "Iniziamo",
      benvenutoTitolo: "Benvenuto.",
      benvenutoTesto: "In circa tre minuti capiamo insieme il sito perfetto per la tua attività.",
      durata: "{tot} domande · nessun impegno",
      arco1: "Su misura per te", arco2: "Pensato nei dettagli",
      ripresaTitolo: "Bentornato, {nome}.",
      ripresaTesto: "Le tue risposte sono al sicuro. Riprendiamo da dove eravamo?",
      riprendi: "Riprendi", ricomincia: "Ricomincia da capo",
      domanda: "Domanda {n} di {tot}",
      restanti: "Ancora circa {m} min", quasi: "Quasi finito",
      maxN: "Puoi sceglierne fino a {max}.", piuRisposte: "Puoi scegliere più risposte.",
      scrive: "Sta scrivendo",
      nomeErrore: "Scrivi il tuo nome per continuare.",
      altroSegnaposto: "Scrivi il tuo settore",
      contattiTitolo: "Ultimo passo, {nome}: dove possiamo inviarti la proposta?",
      contattiSotto: "Bastano venti secondi.",
      fNome: "Nome e cognome", fAttivita: "Nome dell'attività", fEmail: "Email",
      fTelefono: "Telefono", facoltativo: "facoltativo",
      fNote: "C'è qualcosa che ti sta particolarmente a cuore?",
      fNoteSegnaposto: "Un'idea, un sito che ti piace, una scadenza…",
      consenso: "Acconsento al trattamento dei miei dati per essere ricontattato, come indicato nella",
      privacy: "privacy policy",
      errObbligatorio: "Questo campo è necessario.",
      errEmail: "Controlla l'indirizzo email.",
      errTelefono: "Ci serve il numero per chiamarti o scriverti.",
      errConsenso: "Per inviare la richiesta serve il tuo consenso.",
      rivedi: "Rivedi le risposte",
      riepTitolo: "Ecco il tuo progetto, {nome}.",
      riepSotto: "Controlla che sia tutto giusto. Puoi modificare ogni risposta.",
      modifica: "Modifica", tuoiDati: "I tuoi dati",
      invia: "Invia la richiesta", invio: "Invio in corso…",
      errInvio: "Qualcosa non ha funzionato. Le tue risposte sono salve: riprova tra un attimo.",
      riprova: "Riprova",
      grazieTitolo: "Grazie, {nome}.",
      grazieTesto: "Abbiamo ricevuto tutto. Ti ricontatteremo entro 24 ore per costruire insieme il tuo progetto.",
      progettoIdeale: "Il progetto che fa per te",
      prenota: "Scegli giorno e ora della call",
      prenotaAlt: "Preferisci fissare subito la call?",
      prenotaPoi: "Ti invieremo per email il link per fissare la call."
    },
    conferme: {
      nome: "Piacere, {nome}.",
      partenza: "Perfetto, è un ottimo punto di partenza.",
      scelta: "Ottima scelta.",
      chiaro: "Chiaro, grazie.",
      tempi: "Perfetto, ne terremo conto."
    },
    sezioni: { profilo: "Profilo", progetto: "Progetto", stile: "Stile", dettagli: "Dettagli", contatti: "Contatti" },
    pacchetti: {
      essenziale: { n: "Essenziale", d: "Un sito chiaro, veloce ed elegante, con tutto l'indispensabile." },
      business:   { n: "Business",   d: "Un sito su misura che lavora per te: contatti, prenotazioni e strumenti collegati." },
      ecommerce:  { n: "E-commerce", d: "Un negozio online completo: catalogo, pagamenti sicuri e spedizioni." },
      premium:    { n: "Premium",    d: "Un progetto curato in ogni dettaglio: identità, design e prestazioni al massimo." }
    },
    d: {
      nome: { t: "Come posso chiamarti?", h: "Basta il nome.", p: "Il tuo nome" },
      tipo: { t: "Che tipo di attività hai?", o: {
        negozio: "Negozio o punto vendita", ecommerce: "E-commerce",
        entrambi: "Sia negozio che online", servizi: "Servizi su appuntamento o contatto" } },
      settore: { t: "In che settore operi?", o: {
        moda: "Moda e accessori", food: "Food & beverage", beauty: "Beauty e benessere",
        casa: "Casa e design", professionisti: "Professionisti e consulenza", altro: "Altro" } },
      obiettivo: { t: "Cosa deve fare, prima di tutto, il tuo sito?", o: {
        vendere: "Vendere prodotti o servizi", contatti: "Ricevere richieste di contatto",
        prenotazioni: "Far prenotare appuntamenti", presentare: "Presentare l'attività in modo chiaro" } },
      partenza: { t: "Da dove partiamo?", o: {
        zero_chiare: "Da zero, ho le idee chiare", zero_guida: "Da zero, vorrei essere guidato",
        rifare: "Ho già un sito da rifare", migliorare: "Ho già un sito da migliorare" } },
      sito_attuale: { t: "Qual è l'indirizzo del sito attuale?", h: "Facoltativo: ci aiuta a capire da dove partiamo.", p: "www.iltuosito.it" },
      a_vetrina: { t: "Cosa deve vedere subito il tuo cliente?", o: {
        prodotti: "Prodotti o servizi", info: "Orari, sede e contatti",
        promo: "Promozioni e novità", foto: "Foto e video del tuo spazio" } },
      a_contatto: { t: "Come preferisci che i clienti ti contattino?", o: {
        telefono: "Telefono", whatsapp: "WhatsApp", form: "Un modulo semplice", prenotazione: "Prenotando un appuntamento" } },
      a_funzioni: { t: "Ti serve una funzione in più?", o: {
        catalogo: "Catalogo online", prenotazioni: "Prenotazioni",
        fedelta: "Programma fedeltà o sconti", nessuna: "No, mi basta un sito chiaro e veloce" } },
      b_vendita: { t: "Cosa vendi online?", o: {
        fisici: "Prodotti fisici", digitali: "Prodotti digitali",
        servizi: "Servizi acquistabili", abbonamenti: "Abbonamenti o acquisti ricorrenti" } },
      b_prodotti: { t: "Quanti prodotti hai?", o: {
        fino20: "Fino a 20", da20a100: "Da 20 a 100", oltre100: "Oltre 100", da_definire: "Ancora da definire" } },
      b_priorita: { t: "Cosa conta di più per il tuo e-commerce?", o: {
        pagamenti: "Pagamenti facili e sicuri", spedizioni: "Spedizioni e tracciamento",
        area: "Area clienti e ordini", gestionale: "Collegamento al gestionale" } },
      c_priorita: { t: "Qual è la tua priorità principale?", o: {
        vendere: "Vendere online", negozio: "Portare clienti in negozio",
        contatti: "Raccogliere contatti", prenotazioni: "Far prenotare servizi" } },
      c_strumenti: { t: "Devi collegare strumenti che usi già?", o: {
        gestionale: "Gestionale o magazzino", agenda: "Agenda o prenotazioni",
        crm: "Gestione contatti ed email", nessuno: "No, per ora non serve" } },
      c_unione: { t: "Come vuoi unire online e negozio?", o: {
        catalogo: "Lo stesso catalogo", promo: "Promozioni dedicate",
        ritiro: "Ritiro in negozio", esperienza: "Un'unica esperienza, online e in negozio" } },
      d_azione: { t: "Cosa vuoi che faccia chi visita il sito?", o: {
        preventivo: "Chiedere un preventivo", call: "Prenotare una call",
        whatsapp: "Scriverti su WhatsApp", form: "Compilare un modulo" } },
      d_convincere: { t: "Cosa deve convincere chi ti visita?", o: {
        servizi: "Servizi e benefici", metodo: "Metodo di lavoro",
        risultati: "Risultati e recensioni", prezzi: "Prezzi o pacchetti" } },
      d_area: { t: "Ti serve un'area riservata?", o: {
        no: "No, solo il sito pubblico", clienti: "Sì, un'area clienti",
        documenti: "Sì, per documenti o preventivi", valutiamo: "Valutiamola insieme" } },
      atmosfera: { t: "Che atmosfera vuoi trasmettere?", h: "Scegli quella che ti somiglia di più.", o: {
        minimal: "Pulita e minimal", premium: "Elegante e premium",
        dinamica: "Dinamica, con animazioni", risultati: "Essenziale, orientata ai risultati" } },
      identita: { t: "Hai già logo, colori e font?", o: {
        tutto: "Sì, ho tutto", logo: "Ho solo il logo",
        colori: "Ho solo colori o indicazioni", no: "No, mi serve un'identità visiva" } },
      contenuti: { t: "Chi prepara testi e immagini?", o: {
        pronti: "Li ho già pronti", parte: "Li ho in parte",
        voi: "Li preparate voi, con le mie indicazioni", insieme: "Li decidiamo insieme" } },
      investimento: { t: "Che tipo di investimento hai in mente?", o: {
        essenziale: "Essenziale, solo l'indispensabile", equilibrato: "Equilibrato tra qualità e prezzo",
        premium: "Premium, design e prestazioni", insieme: "Preferisco definirlo insieme" } },
      tempi: { t: "Quando vorresti il sito online?", o: {
        subito: "Il prima possibile", settimane: "Entro 2–4 settimane",
        mesi: "Entro 1–2 mesi", calma: "Nessuna fretta, prima la qualità" } },
      canale: { t: "Come preferisci essere ricontattato?", o: {
        email: "Email", telefono: "Telefono", whatsapp: "WhatsApp", prenoto: "Prenoto subito un appuntamento" } },
      budget: { t: "Che budget hai previsto per il sito?", h: "Una cifra indicativa: resta tra noi e ci aiuta a proporti la soluzione giusta.", o: {
        meno1000: "Meno di 1.000 €", da1000a2500: "Da 1.000 a 2.500 €",
        da2500a5000: "Da 2.500 a 5.000 €", oltre5000: "Oltre 5.000 €", non_so: "Non lo so ancora" } }
    }
  },

  /* =============================== ENGLISH =============================== */
  en: {
    nomeLingua: "English", dir: "ltr",
    ui: {
      lancia: "Request a quote",
      invito: "Need a website? Let's shape it together in a few minutes.",
      chiudi: "Close", lingua: "Language", ruolo: "Project consultant",
      indietro: "Back", continua: "Continue", salta: "Skip", iniziamo: "Let's begin",
      benvenutoTitolo: "Welcome.",
      benvenutoTesto: "In about three minutes, we'll find the perfect website for your business together.",
      durata: "{tot} questions · no commitment",
      arco1: "Made for you", arco2: "Crafted in every detail",
      ripresaTitolo: "Welcome back, {nome}.",
      ripresaTesto: "Your answers are safe. Shall we pick up where we left off?",
      riprendi: "Continue", ricomincia: "Start over",
      domanda: "Question {n} of {tot}",
      restanti: "About {m} min left", quasi: "Almost done",
      maxN: "Choose up to {max}.", piuRisposte: "You can choose more than one.",
      scrive: "Typing",
      nomeErrore: "Please write your name to continue.",
      altroSegnaposto: "Write your industry",
      contattiTitolo: "Last step, {nome}: where should we send your proposal?",
      contattiSotto: "It takes twenty seconds.",
      fNome: "Full name", fAttivita: "Business name", fEmail: "Email",
      fTelefono: "Phone", facoltativo: "optional",
      fNote: "Is there anything that matters to you most?",
      fNoteSegnaposto: "An idea, a website you love, a deadline…",
      consenso: "I agree to the processing of my data in order to be contacted, as described in the",
      privacy: "privacy policy",
      errObbligatorio: "This field is required.",
      errEmail: "Please check the email address.",
      errTelefono: "We need your number to call or message you.",
      errConsenso: "Your consent is needed to send the request.",
      rivedi: "Review your answers",
      riepTitolo: "Here is your project, {nome}.",
      riepSotto: "Check that everything is right. You can edit any answer.",
      modifica: "Edit", tuoiDati: "Your details",
      invia: "Send request", invio: "Sending…",
      errInvio: "Something went wrong. Your answers are saved: please try again in a moment.",
      riprova: "Try again",
      grazieTitolo: "Thank you, {nome}.",
      grazieTesto: "We've received everything. We'll get back to you within 24 hours to build your project together.",
      progettoIdeale: "The right project for you",
      prenota: "Pick a day and time for the call",
      prenotaAlt: "Prefer to book the call now?",
      prenotaPoi: "We'll email you a link to book the call."
    },
    conferme: {
      nome: "Nice to meet you, {nome}.",
      partenza: "Perfect, that's a great starting point.",
      scelta: "Great choice.",
      chiaro: "Clear, thank you.",
      tempi: "Perfect, we'll keep that in mind."
    },
    sezioni: { profilo: "Profile", progetto: "Project", stile: "Style", dettagli: "Details", contatti: "Contact" },
    pacchetti: {
      essenziale: { n: "Essential",  d: "A clear, fast and elegant website with everything you need." },
      business:   { n: "Business",   d: "A tailor-made website that works for you: enquiries, bookings and connected tools." },
      ecommerce:  { n: "E-commerce", d: "A complete online store: catalogue, secure payments and shipping." },
      premium:    { n: "Premium",    d: "A project refined in every detail: identity, design and top performance." }
    },
    d: {
      nome: { t: "What should I call you?", h: "Just your first name.", p: "Your name" },
      tipo: { t: "What kind of business do you have?", o: {
        negozio: "Shop or physical store", ecommerce: "E-commerce",
        entrambi: "Both a shop and online", servizi: "Services by appointment or enquiry" } },
      settore: { t: "Which industry are you in?", o: {
        moda: "Fashion and accessories", food: "Food & beverage", beauty: "Beauty and wellness",
        casa: "Home and design", professionisti: "Professional services", altro: "Other" } },
      obiettivo: { t: "What should your website do, above all?", o: {
        vendere: "Sell products or services", contatti: "Receive enquiries",
        prenotazioni: "Take appointment bookings", presentare: "Present the business clearly" } },
      partenza: { t: "Where are we starting from?", o: {
        zero_chiare: "From scratch, I know what I want", zero_guida: "From scratch, I'd like guidance",
        rifare: "I have a website to rebuild", migliorare: "I have a website to improve" } },
      sito_attuale: { t: "What is your current website address?", h: "Optional: it helps us see where we're starting from.", p: "www.yourwebsite.com" },
      a_vetrina: { t: "What should your customers see first?", o: {
        prodotti: "Products or services", info: "Opening hours, location and contacts",
        promo: "Offers and news", foto: "Photos and videos of your space" } },
      a_contatto: { t: "How would you like customers to reach you?", o: {
        telefono: "Phone", whatsapp: "WhatsApp", form: "A simple form", prenotazione: "By booking an appointment" } },
      a_funzioni: { t: "Do you need an extra feature?", o: {
        catalogo: "Online catalogue", prenotazioni: "Bookings",
        fedelta: "Loyalty programme or discounts", nessuna: "No, a clear and fast website is enough" } },
      b_vendita: { t: "What do you sell online?", o: {
        fisici: "Physical products", digitali: "Digital products",
        servizi: "Bookable services", abbonamenti: "Subscriptions or recurring purchases" } },
      b_prodotti: { t: "How many products do you have?", o: {
        fino20: "Up to 20", da20a100: "20 to 100", oltre100: "Over 100", da_definire: "Not decided yet" } },
      b_priorita: { t: "What matters most for your store?", o: {
        pagamenti: "Easy, secure payments", spedizioni: "Shipping and tracking",
        area: "Customer accounts and orders", gestionale: "Connection to your management system" } },
      c_priorita: { t: "What is your main priority?", o: {
        vendere: "Selling online", negozio: "Bringing customers to the store",
        contatti: "Collecting leads", prenotazioni: "Taking service bookings" } },
      c_strumenti: { t: "Do you need to connect tools you already use?", o: {
        gestionale: "Management or inventory system", agenda: "Calendar or bookings",
        crm: "Contacts and email management", nessuno: "No, not for now" } },
      c_unione: { t: "How do you want to connect online and in-store?", o: {
        catalogo: "The same catalogue", promo: "Dedicated offers",
        ritiro: "In-store pickup", esperienza: "One seamless experience, online and in-store" } },
      d_azione: { t: "What do you want visitors to do?", o: {
        preventivo: "Request a quote", call: "Book a call",
        whatsapp: "Message you on WhatsApp", form: "Fill in a form" } },
      d_convincere: { t: "What should win your visitors over?", o: {
        servizi: "Services and benefits", metodo: "Your way of working",
        risultati: "Results and reviews", prezzi: "Prices or packages" } },
      d_area: { t: "Do you need a private area?", o: {
        no: "No, just the public website", clienti: "Yes, a client area",
        documenti: "Yes, for documents or quotes", valutiamo: "Let's decide together" } },
      atmosfera: { t: "What atmosphere do you want to convey?", h: "Choose the one that feels most like you.", o: {
        minimal: "Clean and minimal", premium: "Elegant and premium",
        dinamica: "Dynamic, with animations", risultati: "Essential, results-driven" } },
      identita: { t: "Do you already have a logo, colours and fonts?", o: {
        tutto: "Yes, I have everything", logo: "Only the logo",
        colori: "Only colours or guidelines", no: "No, I need a visual identity" } },
      contenuti: { t: "Who will prepare the texts and images?", o: {
        pronti: "I already have them", parte: "I have some of them",
        voi: "You do, with my input", insieme: "We decide together" } },
      investimento: { t: "What kind of investment do you have in mind?", o: {
        essenziale: "Essential, just what's needed", equilibrato: "Balanced quality and price",
        premium: "Premium, design and performance", insieme: "I'd rather define it together" } },
      tempi: { t: "When would you like the website online?", o: {
        subito: "As soon as possible", settimane: "Within 2–4 weeks",
        mesi: "Within 1–2 months", calma: "No rush, quality first" } },
      canale: { t: "How would you like us to get back to you?", o: {
        email: "Email", telefono: "Phone", whatsapp: "WhatsApp", prenoto: "I'll book a call right away" } },
      budget: { t: "What budget have you set for the website?", h: "A rough figure: it stays between us and helps us suggest the right solution.", o: {
        meno1000: "Under $1,000", da1000a2500: "$1,000 to $2,500",
        da2500a5000: "$2,500 to $5,000", oltre5000: "Over $5,000", non_so: "I don't know yet" } }
    }
  },

  /* =============================== FRANÇAIS =============================== */
  fr: {
    nomeLingua: "Français", dir: "ltr",
    ui: {
      lancia: "Demander un devis",
      invito: "Besoin d'un site ? Définissons-le ensemble en quelques minutes.",
      chiudi: "Fermer", lingua: "Langue", ruolo: "Conseiller projet",
      indietro: "Retour", continua: "Continuer", salta: "Passer", iniziamo: "Commençons",
      benvenutoTitolo: "Bienvenue.",
      benvenutoTesto: "En trois minutes environ, trouvons ensemble le site idéal pour ton activité.",
      durata: "{tot} questions · sans engagement",
      arco1: "Sur mesure pour toi", arco2: "Pensé dans les détails",
      ripresaTitolo: "Bon retour, {nome}.",
      ripresaTesto: "Tes réponses sont en sécurité. On reprend là où on s'était arrêtés ?",
      riprendi: "Reprendre", ricomincia: "Recommencer",
      domanda: "Question {n} sur {tot}",
      restanti: "Encore environ {m} min", quasi: "Presque fini",
      maxN: "Tu peux en choisir jusqu'à {max}.", piuRisposte: "Tu peux choisir plusieurs réponses.",
      scrive: "En train d'écrire",
      nomeErrore: "Écris ton prénom pour continuer.",
      altroSegnaposto: "Écris ton secteur",
      contattiTitolo: "Dernière étape, {nome} : où pouvons-nous t'envoyer la proposition ?",
      contattiSotto: "Vingt secondes suffisent.",
      fNome: "Nom et prénom", fAttivita: "Nom de l'activité", fEmail: "E-mail",
      fTelefono: "Téléphone", facoltativo: "facultatif",
      fNote: "Y a-t-il quelque chose qui te tient particulièrement à cœur ?",
      fNoteSegnaposto: "Une idée, un site que tu aimes, une échéance…",
      consenso: "J'accepte le traitement de mes données pour être recontacté, comme indiqué dans la",
      privacy: "politique de confidentialité",
      errObbligatorio: "Ce champ est nécessaire.",
      errEmail: "Vérifie l'adresse e-mail.",
      errTelefono: "Nous avons besoin de ton numéro pour t'appeler ou t'écrire.",
      errConsenso: "Ton consentement est nécessaire pour envoyer la demande.",
      rivedi: "Revoir mes réponses",
      riepTitolo: "Voici ton projet, {nome}.",
      riepSotto: "Vérifie que tout est correct. Tu peux modifier chaque réponse.",
      modifica: "Modifier", tuoiDati: "Tes coordonnées",
      invia: "Envoyer la demande", invio: "Envoi en cours…",
      errInvio: "Un problème est survenu. Tes réponses sont enregistrées : réessaie dans un instant.",
      riprova: "Réessayer",
      grazieTitolo: "Merci, {nome}.",
      grazieTesto: "Nous avons tout reçu. Nous te recontacterons sous 24 heures pour construire ensemble ton projet.",
      progettoIdeale: "Le projet qu'il te faut",
      prenota: "Choisir le jour et l'heure de l'appel",
      prenotaAlt: "Tu préfères fixer l'appel tout de suite ?",
      prenotaPoi: "Nous t'enverrons par e-mail le lien pour fixer l'appel."
    },
    conferme: {
      nome: "Enchanté, {nome}.",
      partenza: "Parfait, c'est un excellent point de départ.",
      scelta: "Excellent choix.",
      chiaro: "C'est clair, merci.",
      tempi: "Parfait, nous en tiendrons compte."
    },
    sezioni: { profilo: "Profil", progetto: "Projet", stile: "Style", dettagli: "Détails", contatti: "Contact" },
    pacchetti: {
      essenziale: { n: "Essentiel",  d: "Un site clair, rapide et élégant, avec tout l'indispensable." },
      business:   { n: "Business",   d: "Un site sur mesure qui travaille pour toi : contacts, réservations et outils connectés." },
      ecommerce:  { n: "E-commerce", d: "Une boutique en ligne complète : catalogue, paiements sécurisés et livraisons." },
      premium:    { n: "Premium",    d: "Un projet soigné dans chaque détail : identité, design et performances au plus haut." }
    },
    d: {
      nome: { t: "Comment puis-je t'appeler ?", h: "Ton prénom suffit.", p: "Ton prénom" },
      tipo: { t: "Quel type d'activité as-tu ?", o: {
        negozio: "Boutique ou point de vente", ecommerce: "E-commerce",
        entrambi: "Boutique et en ligne", servizi: "Services sur rendez-vous ou sur demande" } },
      settore: { t: "Dans quel secteur travailles-tu ?", o: {
        moda: "Mode et accessoires", food: "Food & beverage", beauty: "Beauté et bien-être",
        casa: "Maison et design", professionisti: "Professions libérales et conseil", altro: "Autre" } },
      obiettivo: { t: "Que doit faire ton site, avant tout ?", o: {
        vendere: "Vendre des produits ou services", contatti: "Recevoir des demandes de contact",
        prenotazioni: "Faire réserver des rendez-vous", presentare: "Présenter clairement l'activité" } },
      partenza: { t: "D'où partons-nous ?", o: {
        zero_chiare: "De zéro, mes idées sont claires", zero_guida: "De zéro, j'aimerais être guidé",
        rifare: "J'ai un site à refaire", migliorare: "J'ai un site à améliorer" } },
      sito_attuale: { t: "Quelle est l'adresse de ton site actuel ?", h: "Facultatif : cela nous aide à comprendre d'où nous partons.", p: "www.tonsite.fr" },
      a_vetrina: { t: "Que doit voir ton client en premier ?", o: {
        prodotti: "Produits ou services", info: "Horaires, adresse et contacts",
        promo: "Promotions et nouveautés", foto: "Photos et vidéos de ton espace" } },
      a_contatto: { t: "Comment préfères-tu que tes clients te contactent ?", o: {
        telefono: "Téléphone", whatsapp: "WhatsApp", form: "Un formulaire simple", prenotazione: "En réservant un rendez-vous" } },
      a_funzioni: { t: "As-tu besoin d'une fonction en plus ?", o: {
        catalogo: "Catalogue en ligne", prenotazioni: "Réservations",
        fedelta: "Programme de fidélité ou réductions", nessuna: "Non, un site clair et rapide me suffit" } },
      b_vendita: { t: "Que vends-tu en ligne ?", o: {
        fisici: "Produits physiques", digitali: "Produits numériques",
        servizi: "Services à acheter", abbonamenti: "Abonnements ou achats récurrents" } },
      b_prodotti: { t: "Combien de produits as-tu ?", o: {
        fino20: "Jusqu'à 20", da20a100: "De 20 à 100", oltre100: "Plus de 100", da_definire: "Encore à définir" } },
      b_priorita: { t: "Qu'est-ce qui compte le plus pour ta boutique ?", o: {
        pagamenti: "Paiements simples et sécurisés", spedizioni: "Livraisons et suivi",
        area: "Espace client et commandes", gestionale: "Connexion au logiciel de gestion" } },
      c_priorita: { t: "Quelle est ta priorité principale ?", o: {
        vendere: "Vendre en ligne", negozio: "Attirer des clients en boutique",
        contatti: "Collecter des contacts", prenotazioni: "Faire réserver des services" } },
      c_strumenti: { t: "Dois-tu connecter des outils que tu utilises déjà ?", o: {
        gestionale: "Logiciel de gestion ou stock", agenda: "Agenda ou réservations",
        crm: "Gestion des contacts et e-mails", nessuno: "Non, pas pour l'instant" } },
      c_unione: { t: "Comment veux-tu relier en ligne et boutique ?", o: {
        catalogo: "Le même catalogue", promo: "Des promotions dédiées",
        ritiro: "Retrait en boutique", esperienza: "Une seule expérience, en ligne et en boutique" } },
      d_azione: { t: "Que veux-tu que fasse le visiteur ?", o: {
        preventivo: "Demander un devis", call: "Réserver un appel",
        whatsapp: "T'écrire sur WhatsApp", form: "Remplir un formulaire" } },
      d_convincere: { t: "Qu'est-ce qui doit convaincre le visiteur ?", o: {
        servizi: "Services et avantages", metodo: "Méthode de travail",
        risultati: "Résultats et avis", prezzi: "Prix ou formules" } },
      d_area: { t: "As-tu besoin d'un espace réservé ?", o: {
        no: "Non, seulement le site public", clienti: "Oui, un espace client",
        documenti: "Oui, pour documents ou devis", valutiamo: "Décidons-le ensemble" } },
      atmosfera: { t: "Quelle atmosphère veux-tu transmettre ?", h: "Choisis celle qui te ressemble le plus.", o: {
        minimal: "Épurée et minimaliste", premium: "Élégante et premium",
        dinamica: "Dynamique, avec animations", risultati: "Essentielle, axée sur les résultats" } },
      identita: { t: "As-tu déjà un logo, des couleurs et des polices ?", o: {
        tutto: "Oui, j'ai tout", logo: "Seulement le logo",
        colori: "Seulement des couleurs ou des indications", no: "Non, il me faut une identité visuelle" } },
      contenuti: { t: "Qui prépare les textes et les images ?", o: {
        pronti: "Je les ai déjà", parte: "Je les ai en partie",
        voi: "Vous, avec mes indications", insieme: "On en décide ensemble" } },
      investimento: { t: "Quel type d'investissement envisages-tu ?", o: {
        essenziale: "Essentiel, juste l'indispensable", equilibrato: "Équilibre qualité-prix",
        premium: "Premium, design et performances", insieme: "Je préfère le définir ensemble" } },
      tempi: { t: "Quand voudrais-tu que le site soit en ligne ?", o: {
        subito: "Le plus tôt possible", settimane: "D'ici 2 à 4 semaines",
        mesi: "D'ici 1 à 2 mois", calma: "Pas d'urgence, la qualité d'abord" } },
      canale: { t: "Comment préfères-tu être recontacté ?", o: {
        email: "E-mail", telefono: "Téléphone", whatsapp: "WhatsApp", prenoto: "Je réserve un rendez-vous tout de suite" } },
      budget: { t: "Quel budget as-tu prévu pour le site ?", h: "Un montant indicatif : il reste entre nous et nous aide à te proposer la bonne solution.", o: {
        meno1000: "Moins de 1 000 €", da1000a2500: "De 1 000 à 2 500 €",
        da2500a5000: "De 2 500 à 5 000 €", oltre5000: "Plus de 5 000 €", non_so: "Je ne sais pas encore" } }
    }
  },

  /* =============================== DEUTSCH =============================== */
  de: {
    nomeLingua: "Deutsch", dir: "ltr",
    ui: {
      lancia: "Angebot anfragen",
      invito: "Du brauchst eine Website? Lass sie uns in wenigen Minuten gemeinsam planen.",
      chiudi: "Schließen", lingua: "Sprache", ruolo: "Projektberatung",
      indietro: "Zurück", continua: "Weiter", salta: "Überspringen", iniziamo: "Los geht's",
      benvenutoTitolo: "Willkommen.",
      benvenutoTesto: "In etwa drei Minuten finden wir gemeinsam die perfekte Website für dein Unternehmen.",
      durata: "{tot} Fragen · unverbindlich",
      arco1: "Maßgeschneidert für dich", arco2: "Bis ins Detail durchdacht",
      ripresaTitolo: "Willkommen zurück, {nome}.",
      ripresaTesto: "Deine Antworten sind gespeichert. Machen wir dort weiter, wo wir aufgehört haben?",
      riprendi: "Fortsetzen", ricomincia: "Neu beginnen",
      domanda: "Frage {n} von {tot}",
      restanti: "Noch etwa {m} Min.", quasi: "Fast geschafft",
      maxN: "Du kannst bis zu {max} wählen.", piuRisposte: "Du kannst mehrere Antworten wählen.",
      scrive: "Schreibt",
      nomeErrore: "Schreib deinen Namen, um fortzufahren.",
      altroSegnaposto: "Deine Branche",
      contattiTitolo: "Letzter Schritt, {nome}: Wohin dürfen wir dir das Angebot schicken?",
      contattiSotto: "Dauert nur zwanzig Sekunden.",
      fNome: "Vor- und Nachname", fAttivita: "Name des Unternehmens", fEmail: "E-Mail",
      fTelefono: "Telefon", facoltativo: "optional",
      fNote: "Gibt es etwas, das dir besonders am Herzen liegt?",
      fNoteSegnaposto: "Eine Idee, eine Website, die dir gefällt, eine Frist…",
      consenso: "Ich stimme der Verarbeitung meiner Daten zur Kontaktaufnahme zu, wie in der folgenden Seite beschrieben:",
      privacy: "Datenschutzerklärung",
      errObbligatorio: "Dieses Feld wird benötigt.",
      errEmail: "Bitte prüfe die E-Mail-Adresse.",
      errTelefono: "Wir brauchen deine Nummer, um dich anzurufen oder dir zu schreiben.",
      errConsenso: "Für die Anfrage brauchen wir deine Zustimmung.",
      rivedi: "Antworten überprüfen",
      riepTitolo: "Das ist dein Projekt, {nome}.",
      riepSotto: "Prüfe, ob alles stimmt. Du kannst jede Antwort ändern.",
      modifica: "Ändern", tuoiDati: "Deine Daten",
      invia: "Anfrage senden", invio: "Wird gesendet…",
      errInvio: "Etwas hat nicht geklappt. Deine Antworten sind gespeichert: Versuch es gleich noch einmal.",
      riprova: "Erneut versuchen",
      grazieTitolo: "Danke, {nome}.",
      grazieTesto: "Wir haben alles erhalten. Wir melden uns innerhalb von 24 Stunden, um dein Projekt gemeinsam aufzubauen.",
      progettoIdeale: "Das passende Projekt für dich",
      prenota: "Tag und Uhrzeit für das Gespräch wählen",
      prenotaAlt: "Möchtest du das Gespräch gleich buchen?",
      prenotaPoi: "Wir schicken dir per E-Mail den Link, um das Gespräch zu buchen."
    },
    conferme: {
      nome: "Freut mich, {nome}.",
      partenza: "Perfekt, das ist ein sehr guter Ausgangspunkt.",
      scelta: "Gute Wahl.",
      chiaro: "Alles klar, danke.",
      tempi: "Perfekt, das berücksichtigen wir."
    },
    sezioni: { profilo: "Profil", progetto: "Projekt", stile: "Stil", dettagli: "Details", contatti: "Kontakt" },
    pacchetti: {
      essenziale: { n: "Essenziell", d: "Eine klare, schnelle und elegante Website mit allem Nötigen." },
      business:   { n: "Business",   d: "Eine maßgeschneiderte Website, die für dich arbeitet: Anfragen, Buchungen und verbundene Tools." },
      ecommerce:  { n: "E-Commerce", d: "Ein vollständiger Onlineshop: Katalog, sichere Zahlungen und Versand." },
      premium:    { n: "Premium",    d: "Ein Projekt, sorgfältig bis ins Detail: Identität, Design und Höchstleistung." }
    },
    d: {
      nome: { t: "Wie darf ich dich nennen?", h: "Der Vorname reicht.", p: "Dein Name" },
      tipo: { t: "Was für ein Unternehmen hast du?", o: {
        negozio: "Laden oder Geschäft", ecommerce: "E-Commerce",
        entrambi: "Laden und online", servizi: "Dienstleistungen nach Termin oder Anfrage" } },
      settore: { t: "In welcher Branche bist du tätig?", o: {
        moda: "Mode und Accessoires", food: "Food & Beverage", beauty: "Beauty und Wellness",
        casa: "Wohnen und Design", professionisti: "Freiberufler und Beratung", altro: "Andere" } },
      obiettivo: { t: "Was soll deine Website vor allem leisten?", o: {
        vendere: "Produkte oder Leistungen verkaufen", contatti: "Kontaktanfragen erhalten",
        prenotazioni: "Termine buchen lassen", presentare: "Das Unternehmen klar vorstellen" } },
      partenza: { t: "Wo fangen wir an?", o: {
        zero_chiare: "Bei null, ich weiß, was ich will", zero_guida: "Bei null, ich hätte gern Beratung",
        rifare: "Ich habe eine Website, die neu muss", migliorare: "Ich habe eine Website, die besser werden soll" } },
      sito_attuale: { t: "Wie lautet die Adresse deiner aktuellen Website?", h: "Optional: So sehen wir, wo wir anfangen.", p: "www.deinewebsite.de" },
      a_vetrina: { t: "Was sollen deine Kunden als Erstes sehen?", o: {
        prodotti: "Produkte oder Leistungen", info: "Öffnungszeiten, Adresse und Kontakt",
        promo: "Angebote und Neuheiten", foto: "Fotos und Videos deiner Räume" } },
      a_contatto: { t: "Wie sollen Kunden dich am liebsten erreichen?", o: {
        telefono: "Telefon", whatsapp: "WhatsApp", form: "Ein einfaches Formular", prenotazione: "Über eine Terminbuchung" } },
      a_funzioni: { t: "Brauchst du eine zusätzliche Funktion?", o: {
        catalogo: "Online-Katalog", prenotazioni: "Buchungen",
        fedelta: "Treueprogramm oder Rabatte", nessuna: "Nein, eine klare, schnelle Website reicht mir" } },
      b_vendita: { t: "Was verkaufst du online?", o: {
        fisici: "Physische Produkte", digitali: "Digitale Produkte",
        servizi: "Buchbare Leistungen", abbonamenti: "Abos oder wiederkehrende Käufe" } },
      b_prodotti: { t: "Wie viele Produkte hast du?", o: {
        fino20: "Bis zu 20", da20a100: "20 bis 100", oltre100: "Über 100", da_definire: "Noch offen" } },
      b_priorita: { t: "Was ist für deinen Shop am wichtigsten?", o: {
        pagamenti: "Einfache, sichere Zahlungen", spedizioni: "Versand und Sendungsverfolgung",
        area: "Kundenkonto und Bestellungen", gestionale: "Anbindung an dein Warenwirtschaftssystem" } },
      c_priorita: { t: "Was ist deine wichtigste Priorität?", o: {
        vendere: "Online verkaufen", negozio: "Kunden in den Laden bringen",
        contatti: "Kontakte sammeln", prenotazioni: "Leistungen buchen lassen" } },
      c_strumenti: { t: "Musst du Tools anbinden, die du schon nutzt?", o: {
        gestionale: "Warenwirtschaft oder Lager", agenda: "Kalender oder Buchungen",
        crm: "Kontakt- und E-Mail-Verwaltung", nessuno: "Nein, im Moment nicht" } },
      c_unione: { t: "Wie willst du Online und Laden verbinden?", o: {
        catalogo: "Derselbe Katalog", promo: "Eigene Angebote",
        ritiro: "Abholung im Laden", esperienza: "Ein einheitliches Erlebnis, online und im Laden" } },
      d_azione: { t: "Was sollen Besucher auf deiner Website tun?", o: {
        preventivo: "Ein Angebot anfragen", call: "Ein Gespräch buchen",
        whatsapp: "Dir auf WhatsApp schreiben", form: "Ein Formular ausfüllen" } },
      d_convincere: { t: "Was soll deine Besucher überzeugen?", o: {
        servizi: "Leistungen und Vorteile", metodo: "Deine Arbeitsweise",
        risultati: "Ergebnisse und Bewertungen", prezzi: "Preise oder Pakete" } },
      d_area: { t: "Brauchst du einen geschützten Bereich?", o: {
        no: "Nein, nur die öffentliche Website", clienti: "Ja, einen Kundenbereich",
        documenti: "Ja, für Dokumente oder Angebote", valutiamo: "Lass uns das gemeinsam klären" } },
      atmosfera: { t: "Welche Stimmung soll deine Website vermitteln?", h: "Wähle die, die am besten zu dir passt.", o: {
        minimal: "Klar und minimalistisch", premium: "Elegant und hochwertig",
        dinamica: "Dynamisch, mit Animationen", risultati: "Schlicht und ergebnisorientiert" } },
      identita: { t: "Hast du schon Logo, Farben und Schriften?", o: {
        tutto: "Ja, ich habe alles", logo: "Nur das Logo",
        colori: "Nur Farben oder Vorgaben", no: "Nein, ich brauche ein visuelles Erscheinungsbild" } },
      contenuti: { t: "Wer bereitet Texte und Bilder vor?", o: {
        pronti: "Ich habe sie schon", parte: "Ich habe einen Teil",
        voi: "Ihr, nach meinen Vorgaben", insieme: "Wir entscheiden gemeinsam" } },
      investimento: { t: "An welche Art von Investition denkst du?", o: {
        essenziale: "Essenziell, nur das Nötigste", equilibrato: "Ausgewogen zwischen Qualität und Preis",
        premium: "Premium, Design und Leistung", insieme: "Lieber gemeinsam festlegen" } },
      tempi: { t: "Wann soll die Website online gehen?", o: {
        subito: "So bald wie möglich", settimane: "In 2–4 Wochen",
        mesi: "In 1–2 Monaten", calma: "Keine Eile, Qualität zuerst" } },
      canale: { t: "Wie sollen wir uns bei dir melden?", o: {
        email: "E-Mail", telefono: "Telefon", whatsapp: "WhatsApp", prenoto: "Ich buche gleich einen Termin" } },
      budget: { t: "Welches Budget hast du für die Website eingeplant?", h: "Ein grober Betrag: Er bleibt unter uns und hilft uns, die richtige Lösung vorzuschlagen.", o: {
        meno1000: "Unter 1.000 €", da1000a2500: "1.000 bis 2.500 €",
        da2500a5000: "2.500 bis 5.000 €", oltre5000: "Über 5.000 €", non_so: "Weiß ich noch nicht" } }
    }
  },

  /* =============================== العربية =============================== */
  ar: {
    nomeLingua: "العربية", dir: "rtl",
    ui: {
      lancia: "اطلب عرض سعر",
      invito: "تحتاج إلى موقع؟ لنحدده معًا في دقائق قليلة.",
      chiudi: "إغلاق", lingua: "اللغة", ruolo: "مستشار المشروع",
      indietro: "رجوع", continua: "متابعة", salta: "تخطٍّ", iniziamo: "لنبدأ",
      benvenutoTitolo: "أهلًا بك.",
      benvenutoTesto: "في نحو ثلاث دقائق نكتشف معًا الموقع المثالي لنشاطك.",
      durata: "{tot} سؤالًا · دون أي التزام",
      arco1: "مصمَّم خصيصًا لك", arco2: "بعناية في كل التفاصيل",
      ripresaTitolo: "مرحبًا بعودتك، {nome}.",
      ripresaTesto: "إجاباتك محفوظة. هل نكمل من حيث توقفنا؟",
      riprendi: "متابعة", ricomincia: "البدء من جديد",
      domanda: "السؤال {n} من {tot}",
      restanti: "تبقّى نحو {m} دقيقة", quasi: "أوشكنا على الانتهاء",
      maxN: "يمكنك اختيار {max} كحد أقصى.", piuRisposte: "يمكنك اختيار أكثر من إجابة.",
      scrive: "يكتب الآن",
      nomeErrore: "اكتب اسمك للمتابعة.",
      altroSegnaposto: "اكتب مجال عملك",
      contattiTitolo: "الخطوة الأخيرة يا {nome}: إلى أين نرسل لك العرض؟",
      contattiSotto: "لن يستغرق ذلك سوى عشرين ثانية.",
      fNome: "الاسم الكامل", fAttivita: "اسم النشاط", fEmail: "البريد الإلكتروني",
      fTelefono: "الهاتف", facoltativo: "اختياري",
      fNote: "هل هناك شيء يهمّك بشكل خاص؟",
      fNoteSegnaposto: "فكرة، موقع يعجبك، موعد نهائي…",
      consenso: "أوافق على معالجة بياناتي للتواصل معي، وفق ما هو موضَّح في",
      privacy: "سياسة الخصوصية",
      errObbligatorio: "هذا الحقل مطلوب.",
      errEmail: "تحقّق من عنوان البريد الإلكتروني.",
      errTelefono: "نحتاج إلى رقمك للاتصال بك أو مراسلتك.",
      errConsenso: "نحتاج إلى موافقتك لإرسال الطلب.",
      rivedi: "مراجعة الإجابات",
      riepTitolo: "هذا هو مشروعك يا {nome}.",
      riepSotto: "تأكّد من أن كل شيء صحيح. يمكنك تعديل أي إجابة.",
      modifica: "تعديل", tuoiDati: "بياناتك",
      invia: "إرسال الطلب", invio: "جارٍ الإرسال…",
      errInvio: "حدث خطأ ما. إجاباتك محفوظة: حاول مجددًا بعد لحظات.",
      riprova: "إعادة المحاولة",
      grazieTitolo: "شكرًا لك، {nome}.",
      grazieTesto: "استلمنا كل شيء. سنتواصل معك خلال 24 ساعة لنبني مشروعك معًا.",
      progettoIdeale: "المشروع المناسب لك",
      prenota: "اختر يوم المكالمة وموعدها",
      prenotaAlt: "تفضّل تحديد موعد المكالمة الآن؟",
      prenotaPoi: "سنرسل إليك عبر البريد الإلكتروني رابط تحديد موعد المكالمة."
    },
    conferme: {
      nome: "تشرّفنا، {nome}.",
      partenza: "ممتاز، إنها نقطة انطلاق رائعة.",
      scelta: "اختيار موفّق.",
      chiaro: "واضح، شكرًا لك.",
      tempi: "ممتاز، سنأخذ ذلك بعين الاعتبار."
    },
    sezioni: { profilo: "الملف", progetto: "المشروع", stile: "الأسلوب", dettagli: "التفاصيل", contatti: "التواصل" },
    pacchetti: {
      essenziale: { n: "أساسي",          d: "موقع واضح وسريع وأنيق، فيه كل ما تحتاجه." },
      business:   { n: "أعمال",          d: "موقع مصمَّم خصيصًا يعمل لصالحك: طلبات تواصل وحجوزات وأدوات مترابطة." },
      ecommerce:  { n: "متجر إلكتروني", d: "متجر إلكتروني متكامل: كتالوج، ودفع آمن، وشحن." },
      premium:    { n: "مميّز",          d: "مشروع متقَن في كل تفاصيله: هوية وتصميم وأداء في أعلى مستوى." }
    },
    d: {
      nome: { t: "بماذا أناديك؟", h: "يكفي الاسم الأول.", p: "اسمك" },
      tipo: { t: "ما نوع نشاطك؟", o: {
        negozio: "متجر أو نقطة بيع", ecommerce: "متجر إلكتروني",
        entrambi: "متجر وبيع عبر الإنترنت معًا", servizi: "خدمات بالحجز أو عند الطلب" } },
      settore: { t: "في أي مجال تعمل؟", o: {
        moda: "الأزياء والإكسسوارات", food: "الأطعمة والمشروبات", beauty: "التجميل والعناية",
        casa: "المنزل والتصميم", professionisti: "المهن الحرة والاستشارات", altro: "مجال آخر" } },
      obiettivo: { t: "ما الذي يجب أن يفعله موقعك قبل كل شيء؟", o: {
        vendere: "بيع منتجات أو خدمات", contatti: "استقبال طلبات التواصل",
        prenotazioni: "حجز المواعيد", presentare: "تقديم نشاطك بوضوح" } },
      partenza: { t: "من أين نبدأ؟", o: {
        zero_chiare: "من الصفر، وأفكاري واضحة", zero_guida: "من الصفر، وأحتاج إلى توجيه",
        rifare: "لديّ موقع أريد إعادة بنائه", migliorare: "لديّ موقع أريد تحسينه" } },
      sito_attuale: { t: "ما عنوان موقعك الحالي؟", h: "اختياري: يساعدنا على فهم نقطة البداية.", p: "www.example.com" },
      a_vetrina: { t: "ما الذي يجب أن يراه عميلك أولًا؟", o: {
        prodotti: "المنتجات أو الخدمات", info: "المواعيد والعنوان ووسائل التواصل",
        promo: "العروض والجديد", foto: "صور وفيديوهات لمكانك" } },
      a_contatto: { t: "كيف تفضّل أن يتواصل معك العملاء؟", o: {
        telefono: "الهاتف", whatsapp: "واتساب", form: "نموذج بسيط", prenotazione: "بحجز موعد" } },
      a_funzioni: { t: "هل تحتاج إلى ميزة إضافية؟", o: {
        catalogo: "كتالوج إلكتروني", prenotazioni: "الحجوزات",
        fedelta: "برنامج ولاء أو خصومات", nessuna: "لا، يكفيني موقع واضح وسريع" } },
      b_vendita: { t: "ماذا تبيع عبر الإنترنت؟", o: {
        fisici: "منتجات مادية", digitali: "منتجات رقمية",
        servizi: "خدمات قابلة للشراء", abbonamenti: "اشتراكات أو مشتريات متكررة" } },
      b_prodotti: { t: "كم عدد منتجاتك؟", o: {
        fino20: "حتى 20", da20a100: "من 20 إلى 100", oltre100: "أكثر من 100", da_definire: "لم يُحدَّد بعد" } },
      b_priorita: { t: "ما الأهم بالنسبة إلى متجرك الإلكتروني؟", o: {
        pagamenti: "دفع سهل وآمن", spedizioni: "الشحن والتتبّع",
        area: "حساب العميل والطلبات", gestionale: "الربط بنظام الإدارة" } },
      c_priorita: { t: "ما أولويتك الرئيسية؟", o: {
        vendere: "البيع عبر الإنترنت", negozio: "جذب العملاء إلى المتجر",
        contatti: "جمع بيانات التواصل", prenotazioni: "حجز الخدمات" } },
      c_strumenti: { t: "هل تحتاج إلى ربط أدوات تستخدمها بالفعل؟", o: {
        gestionale: "نظام الإدارة أو المخزون", agenda: "التقويم أو الحجوزات",
        crm: "إدارة جهات الاتصال والبريد", nessuno: "لا، ليس الآن" } },
      c_unione: { t: "كيف تريد الجمع بين المتجر والإنترنت؟", o: {
        catalogo: "الكتالوج نفسه", promo: "عروض مخصّصة",
        ritiro: "الاستلام من المتجر", esperienza: "تجربة واحدة متكاملة، عبر الإنترنت وفي المتجر" } },
      d_azione: { t: "ماذا تريد أن يفعل زائر موقعك؟", o: {
        preventivo: "طلب عرض سعر", call: "حجز مكالمة",
        whatsapp: "مراسلتك عبر واتساب", form: "تعبئة نموذج" } },
      d_convincere: { t: "ما الذي يجب أن يُقنع الزائر؟", o: {
        servizi: "الخدمات والمزايا", metodo: "أسلوب العمل",
        risultati: "النتائج والتقييمات", prezzi: "الأسعار أو الباقات" } },
      d_area: { t: "هل تحتاج إلى منطقة خاصة؟", o: {
        no: "لا، الموقع العام فقط", clienti: "نعم، منطقة للعملاء",
        documenti: "نعم، للمستندات أو العروض", valutiamo: "لنقرّر ذلك معًا" } },
      atmosfera: { t: "ما الأجواء التي تريد أن ينقلها موقعك؟", h: "اختر الأقرب إليك.", o: {
        minimal: "نظيفة وبسيطة", premium: "أنيقة وفاخرة",
        dinamica: "حيوية، مع حركات", risultati: "عملية ومركّزة على النتائج" } },
      identita: { t: "هل لديك شعار وألوان وخطوط؟", o: {
        tutto: "نعم، لديّ كل شيء", logo: "لديّ الشعار فقط",
        colori: "لديّ الألوان أو بعض التوجيهات فقط", no: "لا، أحتاج إلى هوية بصرية" } },
      contenuti: { t: "من يُعدّ النصوص والصور؟", o: {
        pronti: "جاهزة لديّ", parte: "لديّ جزء منها",
        voi: "أنتم، وفق توجيهاتي", insieme: "نقرّر ذلك معًا" } },
      investimento: { t: "ما نوع الاستثمار الذي تفكّر فيه؟", o: {
        essenziale: "أساسي، الضروري فقط", equilibrato: "متوازن بين الجودة والسعر",
        premium: "مميّز، تصميم وأداء", insieme: "أفضّل تحديده معًا" } },
      tempi: { t: "متى تريد أن يكون الموقع جاهزًا؟", o: {
        subito: "في أقرب وقت ممكن", settimane: "خلال 2–4 أسابيع",
        mesi: "خلال 1–2 شهر", calma: "لا عجلة، الجودة أولًا" } },
      canale: { t: "كيف تفضّل أن نتواصل معك؟", o: {
        email: "البريد الإلكتروني", telefono: "الهاتف", whatsapp: "واتساب", prenoto: "أحجز موعدًا الآن" } },
      budget: { t: "ما الميزانية التي خصّصتها للموقع؟", h: "رقم تقريبي: يبقى بيننا ويساعدنا على اقتراح الحل المناسب.", o: {
        meno1000: "أقل من 4,000 درهم", da1000a2500: "من 4,000 إلى 10,000 درهم",
        da2500a5000: "من 10,000 إلى 20,000 درهم", oltre5000: "أكثر من 20,000 درهم", non_so: "لا أعرف بعد" } }
    }
  }
};
