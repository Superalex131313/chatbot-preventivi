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
      obiettivo: "Chiaro. È lì che concentreremo il lavoro.",
      scelta: "Ottima scelta.",
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
        negozio: "Un negozio o uno spazio fisico", ecommerce: "Vendo online",
        entrambi: "Entrambi: negozio e online", servizi: "Offro servizi o consulenze" } },
      settore: { t: "In che settore lavori?", o: {
        moda: "Moda e accessori", food: "Food, vino e ristorazione", beauty: "Beauty e benessere",
        casa: "Casa, design e arredo", ospitalita: "Ospitalità e turismo",
        professionisti: "Professionisti e consulenza", altro: "Altro" } },
      obiettivo: { t: "Cosa ti aspetti, prima di tutto, dal nuovo sito?", o: {
        clienti: "Più richieste e nuovi clienti", vendite: "Più vendite online",
        immagine: "Un'immagine all'altezza del mio lavoro", tempo: "Meno lavoro manuale, più automatismi" } },
      partenza: { t: "Hai già un sito?", o: {
        no: "No, sarà il primo", rifare: "Sì, ma va rifatto da capo", migliorare: "Sì, va solo migliorato" } },
      sito_attuale: { t: "Qual è l'indirizzo del sito attuale?", h: "Facoltativo: lo guardiamo prima di sentirci.", p: "www.iltuosito.it" },
      a_vetrina: { t: "Cosa deve trovare subito chi arriva sul sito?", o: {
        prodotti: "I prodotti o i servizi", info: "Orari, indirizzo e come arrivare",
        promo: "Novità e promozioni", spazio: "Foto e video del tuo spazio" } },
      a_contatto: { t: "Come ti contattano di solito i clienti?", o: {
        telefono: "Telefono", whatsapp: "WhatsApp", form: "Un modulo sul sito", social: "Instagram o social" } },
      a_funzioni: { t: "Vuoi qualcosa in più?", o: {
        catalogo: "Un catalogo dei prodotti", prenotazioni: "Prenotazioni online",
        fedelta: "Promozioni o programma fedeltà", nessuna: "No, mi basta un sito chiaro e veloce" } },
      b_vendita: { t: "Cosa vendi online?", o: {
        fisici: "Prodotti fisici", digitali: "Prodotti digitali",
        servizi: "Servizi o esperienze", abbonamenti: "Abbonamenti" } },
      b_prodotti: { t: "Quanti prodotti avrai in catalogo?", o: {
        fino20: "Fino a 20", da20a100: "Da 20 a 100", oltre100: "Più di 100", da_definire: "Non lo so ancora" } },
      b_priorita: { t: "Su cosa non vuoi compromessi?", o: {
        pagamenti: "Pagamenti semplici e sicuri", spedizioni: "Spedizioni e resi senza pensieri",
        estero: "Vendere anche all'estero", gestionale: "Collegamento al gestionale",
        area: "Area clienti con i propri ordini" } },
      c_priorita: { t: "Cosa conta di più, oggi?", o: {
        vendere: "Vendere online", negozio: "Portare più persone in negozio", brand: "Far conoscere il brand" } },
      c_online: { t: "Cosa deve poter fare il cliente online?", o: {
        spedizione: "Comprare e ricevere a casa", ritiro: "Ordinare e ritirare in negozio",
        disponibilita: "Vedere cosa c'è in negozio", appuntamento: "Prenotare un appuntamento" } },
      c_strumenti: { t: "Usi già dei programmi da collegare al sito?", o: {
        gestionale: "Gestionale o magazzino", agenda: "Agenda degli appuntamenti",
        crm: "Newsletter o gestione contatti", nessuno: "No, nessuno" } },
      d_azione: { t: "Dopo aver visto il sito, cosa vuoi che faccia il visitatore?", o: {
        preventivo: "Chiederti un preventivo", consulenza: "Prenotare una consulenza", whatsapp: "Scriverti o chiamarti" } },
      d_convincere: { t: "Cosa convince i clienti a scegliere te?", o: {
        servizi: "Servizi chiari e i loro benefici", metodo: "Il tuo metodo di lavoro",
        risultati: "Risultati e recensioni", storia: "La tua storia e il team", prezzi: "Prezzi o pacchetti trasparenti" } },
      d_area: { t: "Ai tuoi clienti serve un'area riservata?", o: {
        no: "No, basta il sito", clienti: "Sì, un'area clienti",
        documenti: "Sì, per documenti e preventivi", valutiamo: "Ne parliamo insieme" } },
      atmosfera: { t: "Che atmosfera vuoi trasmettere?", h: "Scegli quella che ti somiglia di più.", o: {
        minimal: "Pulita e minimal", premium: "Elegante e raffinata",
        dinamica: "Viva, con animazioni", concreta: "Essenziale, dritta al punto" } },
      ispirazione: { t: "C'è un sito che ami e che ti ispira?", h: "Facoltativo: va bene anche di un altro settore.", p: "www.unsitochemipiace.com" },
      identita: { t: "Hai già logo, colori e font?", o: {
        tutto: "Sì, ho un'identità completa", logo: "Solo il logo", no: "No, mi serve un'identità visiva" } },
      contenuti: { t: "Testi e foto: a che punto sei?", o: {
        pronti: "Ho già tutto pronto", parte: "Ho qualcosa, il resto mi serve", voi: "Preferisco che ve ne occupiate voi" } },
      tempi: { t: "Quando vorresti essere online?", o: {
        subito: "Il prima possibile", settimane: "Entro un mese",
        mesi: "Entro due o tre mesi", calma: "Nessuna fretta, prima la qualità" } },
      canale: { t: "Come preferisci essere ricontattato?", o: {
        email: "Email", telefono: "Telefono", whatsapp: "WhatsApp", prenoto: "Prenoto subito una call" } },
      budget: { t: "Che budget hai in mente per il sito?", h: "Una cifra indicativa: resta tra noi e ci aiuta a proporti la soluzione giusta.", o: {
        meno1000: "Meno di 1.000 €", da1000a2500: "Da 1.000 a 2.500 €",
        da2500a5000: "Da 2.500 a 5.000 €", oltre5000: "Oltre 5.000 €", non_so: "Preferisco parlarne insieme" } }
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
      obiettivo: "Clear. That's exactly where we'll focus.",
      scelta: "Great choice.",
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
        negozio: "A shop or physical space", ecommerce: "I sell online",
        entrambi: "Both: a shop and online", servizi: "I offer services or consulting" } },
      settore: { t: "Which industry are you in?", o: {
        moda: "Fashion and accessories", food: "Food, wine and dining", beauty: "Beauty and wellness",
        casa: "Home, design and interiors", ospitalita: "Hospitality and travel",
        professionisti: "Professional services", altro: "Other" } },
      obiettivo: { t: "What do you expect from your new website, above all?", o: {
        clienti: "More enquiries and new clients", vendite: "More online sales",
        immagine: "An image that matches the quality of my work", tempo: "Less manual work, more automation" } },
      partenza: { t: "Do you already have a website?", o: {
        no: "No, this will be my first", rifare: "Yes, but it needs rebuilding", migliorare: "Yes, it just needs improving" } },
      sito_attuale: { t: "What is your current website address?", h: "Optional: we'll look at it before we talk.", p: "www.yourwebsite.com" },
      a_vetrina: { t: "What should visitors find first?", o: {
        prodotti: "Your products or services", info: "Opening hours, address and directions",
        promo: "News and offers", spazio: "Photos and videos of your space" } },
      a_contatto: { t: "How do your customers usually reach you?", o: {
        telefono: "Phone", whatsapp: "WhatsApp", form: "A form on the website", social: "Instagram or social media" } },
      a_funzioni: { t: "Would you like something extra?", o: {
        catalogo: "A product catalogue", prenotazioni: "Online bookings",
        fedelta: "Offers or a loyalty programme", nessuna: "No, a clear and fast website is enough" } },
      b_vendita: { t: "What do you sell online?", o: {
        fisici: "Physical products", digitali: "Digital products",
        servizi: "Services or experiences", abbonamenti: "Subscriptions" } },
      b_prodotti: { t: "How many products will your catalogue have?", o: {
        fino20: "Up to 20", da20a100: "20 to 100", oltre100: "More than 100", da_definire: "I don't know yet" } },
      b_priorita: { t: "Where won't you compromise?", o: {
        pagamenti: "Simple, secure payments", spedizioni: "Effortless shipping and returns",
        estero: "Selling internationally", gestionale: "Connection to your management system",
        area: "Customer accounts with order history" } },
      c_priorita: { t: "What matters most right now?", o: {
        vendere: "Selling online", negozio: "Bringing more people to the store", brand: "Building brand awareness" } },
      c_online: { t: "What should customers be able to do online?", o: {
        spedizione: "Buy and get it delivered", ritiro: "Order and pick up in store",
        disponibilita: "See what's available in store", appuntamento: "Book an appointment" } },
      c_strumenti: { t: "Do you already use software we should connect?", o: {
        gestionale: "Management or inventory system", agenda: "Appointment calendar",
        crm: "Newsletter or contact management", nessuno: "No, none" } },
      d_azione: { t: "After seeing your website, what should visitors do?", o: {
        preventivo: "Ask you for a quote", consulenza: "Book a consultation", whatsapp: "Message or call you" } },
      d_convincere: { t: "What makes clients choose you?", o: {
        servizi: "Clear services and their benefits", metodo: "Your way of working",
        risultati: "Results and reviews", storia: "Your story and team", prezzi: "Transparent prices or packages" } },
      d_area: { t: "Do your clients need a private area?", o: {
        no: "No, the website is enough", clienti: "Yes, a client area",
        documenti: "Yes, for documents and quotes", valutiamo: "Let's discuss it together" } },
      atmosfera: { t: "What atmosphere do you want to convey?", h: "Choose the one that feels most like you.", o: {
        minimal: "Clean and minimal", premium: "Elegant and refined",
        dinamica: "Lively, with animations", concreta: "Essential, straight to the point" } },
      ispirazione: { t: "Is there a website you love that inspires you?", h: "Optional: it can be from any industry.", p: "www.awebsiteilove.com" },
      identita: { t: "Do you already have a logo, colours and fonts?", o: {
        tutto: "Yes, a complete identity", logo: "Only the logo", no: "No, I need a visual identity" } },
      contenuti: { t: "Texts and photos: where are you at?", o: {
        pronti: "Everything is ready", parte: "I have some, I need the rest", voi: "I'd rather you took care of it" } },
      tempi: { t: "When would you like to go live?", o: {
        subito: "As soon as possible", settimane: "Within a month",
        mesi: "Within two or three months", calma: "No rush, quality first" } },
      canale: { t: "How would you like us to get back to you?", o: {
        email: "Email", telefono: "Phone", whatsapp: "WhatsApp", prenoto: "I'll book a call right away" } },
      budget: { t: "What budget do you have in mind?", h: "A rough figure: it stays between us and helps us suggest the right solution.", o: {
        meno1000: "Under $1,000", da1000a2500: "$1,000 to $2,500",
        da2500a5000: "$2,500 to $5,000", oltre5000: "Over $5,000", non_so: "I'd rather discuss it together" } }
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
      obiettivo: "C'est clair. C'est là que nous concentrerons le travail.",
      scelta: "Excellent choix.",
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
        negozio: "Une boutique ou un lieu physique", ecommerce: "Je vends en ligne",
        entrambi: "Les deux : boutique et en ligne", servizi: "Je propose des services ou du conseil" } },
      settore: { t: "Dans quel secteur travailles-tu ?", o: {
        moda: "Mode et accessoires", food: "Gastronomie, vin et restauration", beauty: "Beauté et bien-être",
        casa: "Maison, design et décoration", ospitalita: "Hôtellerie et tourisme",
        professionisti: "Professions libérales et conseil", altro: "Autre" } },
      obiettivo: { t: "Qu'attends-tu avant tout de ton nouveau site ?", o: {
        clienti: "Plus de demandes et de nouveaux clients", vendite: "Plus de ventes en ligne",
        immagine: "Une image à la hauteur de mon travail", tempo: "Moins de tâches manuelles, plus d'automatisation" } },
      partenza: { t: "As-tu déjà un site ?", o: {
        no: "Non, ce sera le premier", rifare: "Oui, mais il faut le refaire", migliorare: "Oui, il faut juste l'améliorer" } },
      sito_attuale: { t: "Quelle est l'adresse de ton site actuel ?", h: "Facultatif : nous le regarderons avant d'en parler.", p: "www.tonsite.fr" },
      a_vetrina: { t: "Que doit trouver en premier le visiteur ?", o: {
        prodotti: "Tes produits ou services", info: "Horaires, adresse et accès",
        promo: "Nouveautés et promotions", spazio: "Photos et vidéos de ton espace" } },
      a_contatto: { t: "Comment tes clients te contactent-ils d'habitude ?", o: {
        telefono: "Téléphone", whatsapp: "WhatsApp", form: "Un formulaire sur le site", social: "Instagram ou réseaux sociaux" } },
      a_funzioni: { t: "Tu veux quelque chose en plus ?", o: {
        catalogo: "Un catalogue des produits", prenotazioni: "Réservations en ligne",
        fedelta: "Promotions ou programme de fidélité", nessuna: "Non, un site clair et rapide me suffit" } },
      b_vendita: { t: "Que vends-tu en ligne ?", o: {
        fisici: "Produits physiques", digitali: "Produits numériques",
        servizi: "Services ou expériences", abbonamenti: "Abonnements" } },
      b_prodotti: { t: "Combien de produits aura ton catalogue ?", o: {
        fino20: "Jusqu'à 20", da20a100: "De 20 à 100", oltre100: "Plus de 100", da_definire: "Je ne sais pas encore" } },
      b_priorita: { t: "Sur quoi refuses-tu les compromis ?", o: {
        pagamenti: "Paiements simples et sécurisés", spedizioni: "Livraisons et retours sans souci",
        estero: "Vendre aussi à l'étranger", gestionale: "Connexion au logiciel de gestion",
        area: "Espace client avec ses commandes" } },
      c_priorita: { t: "Qu'est-ce qui compte le plus aujourd'hui ?", o: {
        vendere: "Vendre en ligne", negozio: "Attirer plus de monde en boutique", brand: "Faire connaître la marque" } },
      c_online: { t: "Que doit pouvoir faire le client en ligne ?", o: {
        spedizione: "Acheter et se faire livrer", ritiro: "Commander et retirer en boutique",
        disponibilita: "Voir ce qui est disponible en boutique", appuntamento: "Prendre rendez-vous" } },
      c_strumenti: { t: "Utilises-tu déjà des logiciels à connecter au site ?", o: {
        gestionale: "Gestion ou stock", agenda: "Agenda des rendez-vous",
        crm: "Newsletter ou gestion des contacts", nessuno: "Non, aucun" } },
      d_azione: { t: "Après avoir vu le site, que doit faire le visiteur ?", o: {
        preventivo: "Te demander un devis", consulenza: "Réserver une consultation", whatsapp: "T'écrire ou t'appeler" } },
      d_convincere: { t: "Qu'est-ce qui pousse tes clients à te choisir ?", o: {
        servizi: "Des services clairs et leurs avantages", metodo: "Ta méthode de travail",
        risultati: "Résultats et avis", storia: "Ton histoire et ton équipe", prezzi: "Des prix ou formules transparents" } },
      d_area: { t: "Tes clients ont-ils besoin d'un espace réservé ?", o: {
        no: "Non, le site suffit", clienti: "Oui, un espace client",
        documenti: "Oui, pour documents et devis", valutiamo: "Parlons-en ensemble" } },
      atmosfera: { t: "Quelle atmosphère veux-tu transmettre ?", h: "Choisis celle qui te ressemble le plus.", o: {
        minimal: "Épurée et minimaliste", premium: "Élégante et raffinée",
        dinamica: "Vivante, avec animations", concreta: "Essentielle, droit au but" } },
      ispirazione: { t: "Y a-t-il un site que tu adores et qui t'inspire ?", h: "Facultatif : il peut être d'un autre secteur.", p: "www.unsitequejaime.com" },
      identita: { t: "As-tu déjà un logo, des couleurs et des polices ?", o: {
        tutto: "Oui, une identité complète", logo: "Seulement le logo", no: "Non, il me faut une identité visuelle" } },
      contenuti: { t: "Textes et photos : où en es-tu ?", o: {
        pronti: "Tout est prêt", parte: "J'ai une partie, il me manque le reste", voi: "Je préfère que vous vous en occupiez" } },
      tempi: { t: "Quand voudrais-tu être en ligne ?", o: {
        subito: "Le plus tôt possible", settimane: "D'ici un mois",
        mesi: "D'ici deux ou trois mois", calma: "Pas d'urgence, la qualité d'abord" } },
      canale: { t: "Comment préfères-tu être recontacté ?", o: {
        email: "E-mail", telefono: "Téléphone", whatsapp: "WhatsApp", prenoto: "Je réserve un appel tout de suite" } },
      budget: { t: "Quel budget envisages-tu pour le site ?", h: "Un montant indicatif : il reste entre nous et nous aide à te proposer la bonne solution.", o: {
        meno1000: "Moins de 1 000 €", da1000a2500: "De 1 000 à 2 500 €",
        da2500a5000: "De 2 500 à 5 000 €", oltre5000: "Plus de 5 000 €", non_so: "Je préfère en parler ensemble" } }
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
      obiettivo: "Verstanden. Genau darauf konzentrieren wir uns.",
      scelta: "Gute Wahl.",
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
        negozio: "Ein Geschäft oder ein Ladenlokal", ecommerce: "Ich verkaufe online",
        entrambi: "Beides: Laden und online", servizi: "Ich biete Dienstleistungen oder Beratung" } },
      settore: { t: "In welcher Branche arbeitest du?", o: {
        moda: "Mode und Accessoires", food: "Essen, Wein und Gastronomie", beauty: "Beauty und Wellness",
        casa: "Wohnen, Design und Einrichtung", ospitalita: "Hotellerie und Tourismus",
        professionisti: "Freiberufler und Beratung", altro: "Andere" } },
      obiettivo: { t: "Was erwartest du vor allem von deiner neuen Website?", o: {
        clienti: "Mehr Anfragen und neue Kunden", vendite: "Mehr Umsatz online",
        immagine: "Einen Auftritt, der meiner Arbeit gerecht wird", tempo: "Weniger Handarbeit, mehr Automatik" } },
      partenza: { t: "Hast du schon eine Website?", o: {
        no: "Nein, es wird die erste", rifare: "Ja, aber sie muss neu gemacht werden", migliorare: "Ja, sie soll nur besser werden" } },
      sito_attuale: { t: "Wie lautet die Adresse deiner aktuellen Website?", h: "Optional: Wir schauen sie uns vor dem Gespräch an.", p: "www.deinewebsite.de" },
      a_vetrina: { t: "Was sollen Besucher als Erstes finden?", o: {
        prodotti: "Deine Produkte oder Leistungen", info: "Öffnungszeiten, Adresse und Anfahrt",
        promo: "Neuheiten und Angebote", spazio: "Fotos und Videos deiner Räume" } },
      a_contatto: { t: "Wie erreichen dich deine Kunden meistens?", o: {
        telefono: "Telefon", whatsapp: "WhatsApp", form: "Ein Formular auf der Website", social: "Instagram oder Social Media" } },
      a_funzioni: { t: "Möchtest du etwas zusätzlich?", o: {
        catalogo: "Einen Produktkatalog", prenotazioni: "Online-Buchungen",
        fedelta: "Angebote oder ein Treueprogramm", nessuna: "Nein, eine klare, schnelle Website reicht" } },
      b_vendita: { t: "Was verkaufst du online?", o: {
        fisici: "Physische Produkte", digitali: "Digitale Produkte",
        servizi: "Leistungen oder Erlebnisse", abbonamenti: "Abonnements" } },
      b_prodotti: { t: "Wie viele Produkte wird dein Katalog haben?", o: {
        fino20: "Bis zu 20", da20a100: "20 bis 100", oltre100: "Mehr als 100", da_definire: "Weiß ich noch nicht" } },
      b_priorita: { t: "Wo willst du keine Kompromisse?", o: {
        pagamenti: "Einfache, sichere Zahlungen", spedizioni: "Sorgloser Versand und Rückgabe",
        estero: "Auch ins Ausland verkaufen", gestionale: "Anbindung an dein Warenwirtschaftssystem",
        area: "Kundenkonto mit Bestellungen" } },
      c_priorita: { t: "Was zählt heute am meisten?", o: {
        vendere: "Online verkaufen", negozio: "Mehr Menschen in den Laden bringen", brand: "Die Marke bekannt machen" } },
      c_online: { t: "Was sollen Kunden online tun können?", o: {
        spedizione: "Kaufen und liefern lassen", ritiro: "Bestellen und im Laden abholen",
        disponibilita: "Sehen, was im Laden verfügbar ist", appuntamento: "Einen Termin buchen" } },
      c_strumenti: { t: "Nutzt du schon Programme, die wir anbinden sollten?", o: {
        gestionale: "Warenwirtschaft oder Lager", agenda: "Terminkalender",
        crm: "Newsletter oder Kontaktverwaltung", nessuno: "Nein, keine" } },
      d_azione: { t: "Was sollen Besucher nach dem Besuch deiner Website tun?", o: {
        preventivo: "Ein Angebot anfragen", consulenza: "Eine Beratung buchen", whatsapp: "Dir schreiben oder dich anrufen" } },
      d_convincere: { t: "Was überzeugt Kunden, dich zu wählen?", o: {
        servizi: "Klare Leistungen und ihr Nutzen", metodo: "Deine Arbeitsweise",
        risultati: "Ergebnisse und Bewertungen", storia: "Deine Geschichte und dein Team", prezzi: "Transparente Preise oder Pakete" } },
      d_area: { t: "Brauchen deine Kunden einen geschützten Bereich?", o: {
        no: "Nein, die Website reicht", clienti: "Ja, einen Kundenbereich",
        documenti: "Ja, für Dokumente und Angebote", valutiamo: "Lass uns darüber sprechen" } },
      atmosfera: { t: "Welche Stimmung soll deine Website vermitteln?", h: "Wähle die, die am besten zu dir passt.", o: {
        minimal: "Klar und minimalistisch", premium: "Elegant und raffiniert",
        dinamica: "Lebendig, mit Animationen", concreta: "Schlicht und auf den Punkt" } },
      ispirazione: { t: "Gibt es eine Website, die du liebst und die dich inspiriert?", h: "Optional: gern auch aus einer anderen Branche.", p: "www.einewebsitedieichmag.de" },
      identita: { t: "Hast du schon Logo, Farben und Schriften?", o: {
        tutto: "Ja, ein vollständiges Erscheinungsbild", logo: "Nur das Logo", no: "Nein, ich brauche ein visuelles Erscheinungsbild" } },
      contenuti: { t: "Texte und Fotos: Wie weit bist du?", o: {
        pronti: "Alles ist fertig", parte: "Einiges habe ich, der Rest fehlt", voi: "Ich möchte, dass ihr euch darum kümmert" } },
      tempi: { t: "Wann möchtest du online gehen?", o: {
        subito: "So bald wie möglich", settimane: "Innerhalb eines Monats",
        mesi: "In zwei bis drei Monaten", calma: "Keine Eile, Qualität zuerst" } },
      canale: { t: "Wie sollen wir uns bei dir melden?", o: {
        email: "E-Mail", telefono: "Telefon", whatsapp: "WhatsApp", prenoto: "Ich buche gleich ein Gespräch" } },
      budget: { t: "Welches Budget schwebt dir für die Website vor?", h: "Ein grober Betrag: Er bleibt unter uns und hilft uns, die richtige Lösung vorzuschlagen.", o: {
        meno1000: "Unter 1.000 €", da1000a2500: "1.000 bis 2.500 €",
        da2500a5000: "2.500 bis 5.000 €", oltre5000: "Über 5.000 €", non_so: "Lieber gemeinsam besprechen" } }
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
      obiettivo: "واضح. هنا بالضبط سنركّز عملنا.",
      scelta: "اختيار موفّق.",
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
        negozio: "متجر أو مكان فعلي", ecommerce: "أبيع عبر الإنترنت",
        entrambi: "الاثنان معًا: متجر وإنترنت", servizi: "أقدّم خدمات أو استشارات" } },
      settore: { t: "في أي مجال تعمل؟", o: {
        moda: "الأزياء والإكسسوارات", food: "الطعام والمطاعم", beauty: "التجميل والعناية",
        casa: "المنزل والتصميم والأثاث", ospitalita: "الضيافة والسياحة",
        professionisti: "المهن الحرة والاستشارات", altro: "مجال آخر" } },
      obiettivo: { t: "ماذا تنتظر قبل كل شيء من موقعك الجديد؟", o: {
        clienti: "طلبات أكثر وعملاء جدد", vendite: "مبيعات أكثر عبر الإنترنت",
        immagine: "صورة تليق بمستوى عملي", tempo: "عمل يدوي أقل وأتمتة أكثر" } },
      partenza: { t: "هل لديك موقع بالفعل؟", o: {
        no: "لا، سيكون الأول", rifare: "نعم، لكن يجب إعادة بنائه", migliorare: "نعم، يحتاج فقط إلى تحسين" } },
      sito_attuale: { t: "ما عنوان موقعك الحالي؟", h: "اختياري: سنلقي عليه نظرة قبل أن نتحدث.", p: "www.example.com" },
      a_vetrina: { t: "ما الذي يجب أن يجده الزائر أولًا؟", o: {
        prodotti: "منتجاتك أو خدماتك", info: "المواعيد والعنوان وطريقة الوصول",
        promo: "الجديد والعروض", spazio: "صور وفيديوهات لمكانك" } },
      a_contatto: { t: "كيف يتواصل معك عملاؤك عادةً؟", o: {
        telefono: "الهاتف", whatsapp: "واتساب", form: "نموذج على الموقع", social: "إنستغرام أو وسائل التواصل" } },
      a_funzioni: { t: "هل تريد شيئًا إضافيًا؟", o: {
        catalogo: "كتالوج للمنتجات", prenotazioni: "حجوزات عبر الإنترنت",
        fedelta: "عروض أو برنامج ولاء", nessuna: "لا، يكفيني موقع واضح وسريع" } },
      b_vendita: { t: "ماذا تبيع عبر الإنترنت؟", o: {
        fisici: "منتجات مادية", digitali: "منتجات رقمية",
        servizi: "خدمات أو تجارب", abbonamenti: "اشتراكات" } },
      b_prodotti: { t: "كم منتجًا سيضم الكتالوج؟", o: {
        fino20: "حتى 20", da20a100: "من 20 إلى 100", oltre100: "أكثر من 100", da_definire: "لا أعرف بعد" } },
      b_priorita: { t: "في ماذا لا تقبل الحلول الوسط؟", o: {
        pagamenti: "دفع سهل وآمن", spedizioni: "شحن وإرجاع دون عناء",
        estero: "البيع خارج البلد أيضًا", gestionale: "الربط بنظام الإدارة",
        area: "حساب للعميل مع طلباته" } },
      c_priorita: { t: "ما الأهم اليوم؟", o: {
        vendere: "البيع عبر الإنترنت", negozio: "جذب المزيد من الناس إلى المتجر", brand: "التعريف بالعلامة التجارية" } },
      c_online: { t: "ماذا يجب أن يستطيع العميل فعله عبر الإنترنت؟", o: {
        spedizione: "الشراء والتوصيل إلى المنزل", ritiro: "الطلب والاستلام من المتجر",
        disponibilita: "معرفة المتوفر في المتجر", appuntamento: "حجز موعد" } },
      c_strumenti: { t: "هل تستخدم برامج يجب ربطها بالموقع؟", o: {
        gestionale: "نظام الإدارة أو المخزون", agenda: "تقويم المواعيد",
        crm: "النشرة البريدية أو إدارة جهات الاتصال", nessuno: "لا، لا شيء" } },
      d_azione: { t: "بعد أن يرى الزائر موقعك، ماذا تريد أن يفعل؟", o: {
        preventivo: "أن يطلب منك عرض سعر", consulenza: "أن يحجز استشارة", whatsapp: "أن يراسلك أو يتصل بك" } },
      d_convincere: { t: "ما الذي يدفع العملاء إلى اختيارك؟", o: {
        servizi: "خدمات واضحة وفوائدها", metodo: "أسلوب عملك",
        risultati: "النتائج والتقييمات", storia: "قصتك وفريقك", prezzi: "أسعار أو باقات واضحة" } },
      d_area: { t: "هل يحتاج عملاؤك إلى منطقة خاصة؟", o: {
        no: "لا، الموقع يكفي", clienti: "نعم، منطقة للعملاء",
        documenti: "نعم، للمستندات والعروض", valutiamo: "لنتحدث عن ذلك معًا" } },
      atmosfera: { t: "ما الأجواء التي تريد أن ينقلها موقعك؟", h: "اختر الأقرب إليك.", o: {
        minimal: "نظيفة وبسيطة", premium: "أنيقة وراقية",
        dinamica: "حيوية، مع حركات", concreta: "عملية ومباشرة" } },
      ispirazione: { t: "هل هناك موقع تحبه ويلهمك؟", h: "اختياري: يمكن أن يكون من مجال آخر.", p: "www.example.com" },
      identita: { t: "هل لديك شعار وألوان وخطوط؟", o: {
        tutto: "نعم، لديّ هوية كاملة", logo: "الشعار فقط", no: "لا، أحتاج إلى هوية بصرية" } },
      contenuti: { t: "النصوص والصور: أين وصلت؟", o: {
        pronti: "كل شيء جاهز", parte: "لديّ جزء، وأحتاج الباقي", voi: "أفضّل أن تتولّوا ذلك" } },
      tempi: { t: "متى تريد أن يكون موقعك جاهزًا؟", o: {
        subito: "في أقرب وقت ممكن", settimane: "خلال شهر",
        mesi: "خلال شهرين أو ثلاثة", calma: "لا عجلة، الجودة أولًا" } },
      canale: { t: "كيف تفضّل أن نتواصل معك؟", o: {
        email: "البريد الإلكتروني", telefono: "الهاتف", whatsapp: "واتساب", prenoto: "أحجز مكالمة الآن" } },
      budget: { t: "ما الميزانية التي تفكّر فيها للموقع؟", h: "رقم تقريبي: يبقى بيننا ويساعدنا على اقتراح الحل المناسب.", o: {
        meno1000: "أقل من 4,000 درهم", da1000a2500: "من 4,000 إلى 10,000 درهم",
        da2500a5000: "من 10,000 إلى 20,000 درهم", oltre5000: "أكثر من 20,000 درهم", non_so: "أفضّل أن نتحدث عنها معًا" } }
    }
  }
};
