/**
 * Times Café Bar & Grill — Source de données centralisée
 * Toutes les coordonnées, catégories, produits, événements, avis et formules
 */
const TIMES_DATA = {
  settings: {
    name: "Times Café Bar & Grill",
    shortName: "TIMES",
    tagline: "Les moments, ça se partage ici.",
    description: "Café, bar, restaurant, pizzeria et grillades à Akpakpa, Cotonou. Une cuisine généreuse, une terrasse sous les guirlandes et des soirées inoubliables entre amis.",
    slogan: "Cuisine généreuse · Grillades au feu de bois · Terrasse conviviale",
    phone: "+229 01 69 69 86 86",
    phoneDisplay: "01 69 69 86 86",
    phoneRaw: "2290169698686",
    whatsapp: "https://wa.me/2290169698686",
    email: "contact@times-cotonou.com",
    address: "Lot n° 36, Akpakpa PK6",
    city: "Cotonou, Bénin",
    fullAddress: "Lot n° 36, Akpakpa PK6, face Stade René Pleven, Cotonou, Bénin",
    landmark: "Akpakpa PK6 — Face Stade René Pleven, Carrefour Le Bélier",
    hoursSummary: "Tous les jours : 9h30 – 2h00",
    openingHour: 9.5, // 9h30
    closingHour: 2.0, // 2h00 du matin
    hoursSchedule: [
      { days: "Lundi – Jeudi", hours: "9h30 – 02h00" },
      { days: "Vendredi – Samedi", hours: "9h30 – 03h00" },
      { days: "Dimanche", hours: "9h30 – 02h00" }
    ],
    googleRating: {
      score: "4,3",
      reviewsCount: 44,
      stars: 4.3,
      link: "https://maps.app.goo.gl/ukoEQ7XUMRnVW49Y6"
    },
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.123456789!2d2.4567!3d6.3689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023554b73b22cfd%3A0x6b772c918349254!2sAkpakpa%2C%20Cotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sbj!4v1700000000000!5m2!1sfr!2sbj",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  },

  dailySpecialFormula: {
    title: "Formule Déjeuner Express Times",
    price: 4500,
    priceFormatted: "4 500 F CFA",
    hours: "Du lundi au vendredi · 11h30 – 15h00",
    included: "Entrée fraîcheur du jour + Plat mijoté ou grillé + Garniture au choix + Boisson fraîche ou Café expresso",
    days: [
      { day: "Lundi", title: "Poulet bicyclette braisé & Riz gras au soumbala", desc: "Sauce piment doux, crudités fraîches et alloco doré." },
      { day: "Mardi", title: "Filets de capitaine au curry & Riz basmati", desc: "Sauce onctueuse aux épices douces, légumes glacés du marché." },
      { day: "Mercredi", title: "Pâte blanche & Sauce gombo fraîche aux crabes et poisson fumé", desc: "La tradition béninoise authentique et savoureuse." },
      { day: "Jeudi", title: "Brochettes de bœuf marinées & Frites de patates douces", desc: "Sauce barbecue maison aux herbes locales." },
      { day: "Vendredi", title: "Poisson frit du port de pêche, sauce tomate piquante & Alloco", desc: "Pêche du jour croustillante, oignons et poivrons sautés." }
    ]
  },

  categories: [
    { id: "all", name: "Tout le catalogue", shortName: "Tout", icon: "🍽️" },
    { id: "grillades", name: "Grillades & Viandes braisées", shortName: "Grillades", icon: "🔥", desc: "Viandes sélectionnées et braisées à la minute sur feu de charbon de bois." },
    { id: "poissons", name: "Poissons & Fruits de mer", shortName: "Poissons", icon: "🐟", desc: "Poissons frais de la côte et crevettes grillées à la perfection." },
    { id: "plats-pays", name: "Plats du pays & Spécialités africaines", shortName: "Plats du pays", icon: "🍲", desc: "Les grandes recettes béninoises mijotées avec passion et authenticité." },
    { id: "pizzas", name: "Pizzas artisanales", shortName: "Pizzas", icon: "🍕", desc: "Pâte maison croustillante, garnitures généreuses et fromage fondu." },
    { id: "pates-riz", name: "Pâtes & Riz sautés", shortName: "Pâtes & Riz", icon: "🍝", desc: "Tagliatelles crémeuses et riz parfumés aux légumes croquants." },
    { id: "garnitures", name: "Garnitures & Accompagnements", shortName: "Garnitures", icon: "🍟", desc: "Portions savoureuses pour accompagner vos viandes et poissons." },
    { id: "desserts", name: "Desserts & Douceurs", shortName: "Desserts", icon: "🍨", desc: "Coupes glacées et notes sucrées pour couronner le repas." },
    { id: "bieres", name: "Bières pression & Bouteilles", shortName: "Bières", icon: "🍺", desc: "Bières fraîches servies en chope, bouteille ou tour de bière." },
    { id: "cocktails", name: "Cocktails & Apéritifs", shortName: "Cocktails", icon: "🍹", desc: "Cocktails avec ou sans alcool, créations rafraîchissantes du barman." },
    { id: "boissons-fraiches", name: "Boissons fraîches & Jus naturels", shortName: "Softs & Jus", icon: "🥤", desc: "Jus naturels pressés, sodas pétillants et eaux minérales." },
    { id: "chicha", name: "Chicha Lounge", shortName: "Chicha", icon: "💨", desc: "Saveurs premium préparées avec soin pour vos soirées en terrasse." }
  ],

  products: [
    // Poissons & Fruits de mer
    {
      id: "p-01",
      category: "poissons",
      name: "Poisson frit, riz et alloco",
      composition: "Capitaine ou mérou croustillant, sauce oignons et poivrons, bananes plantains frites et piment vert à part.",
      price: 4500,
      priceFormatted: "4 500 F CFA",
      image: "img/menu/poisson-frit-riz-alloco.jpg",
      is_orderable: true,
      badge: "Incontournable"
    },
    {
      id: "p-02",
      category: "poissons",
      name: "Poisson braisé entier, riz blanc",
      composition: "Poisson frais mariné aux épices du terroir, braisé au charbon de bois, servi avec ses sauces locales.",
      price: 5000,
      priceFormatted: "5 000 F CFA",
      image: "img/menu/poisson-braise-riz.jpg",
      is_orderable: true,
      badge: "Spécialité du chef"
    },
    {
      id: "p-03",
      category: "poissons",
      name: "Gambas sautées & légumes rôtis",
      composition: "Belles gambas flambées aux aromates, accompagnées d'un assortiment de légumes de saison rôtis.",
      price: 6500,
      priceFormatted: "6 500 F CFA",
      image: "img/menu/gambas-legumes.jpg",
      is_orderable: true,
      badge: "Prestige"
    },
    {
      id: "p-04",
      category: "poissons",
      name: "Filets de poisson au curry doux",
      composition: "Filets fondants mijotés dans une crème au curry parfumé, servis avec riz basmati.",
      price: 4800,
      priceFormatted: "4 800 F CFA",
      image: "img/menu/filets-poisson-curry.jpg",
      is_orderable: true
    },
    {
      id: "p-05",
      category: "poissons",
      name: "Poisson frit, riz & légumes glacés",
      composition: "Poisson doré croustillant, servi avec julienne de légumes sautés et sauce relevée.",
      price: 4200,
      priceFormatted: "4 200 F CFA",
      image: "img/menu/poisson-frit-riz-legumes.jpg",
      is_orderable: true
    },

    // Grillades
    {
      id: "g-01",
      category: "grillades",
      name: "Brochettes de poulet au bacon",
      composition: "Morceaux de poulet tendres enroulés de bacon fumé, grillés à point, parsemés d'herbes fraîches.",
      price: 3500,
      priceFormatted: "3 500 F CFA",
      image: "img/menu/brochettes-poulet-bacon.jpg",
      is_orderable: true,
      badge: "Best-seller"
    },
    {
      id: "g-02",
      category: "grillades",
      name: "Grillade mixte, riz & légumes grillés",
      composition: "Assortiment de viandes braisées (poulet, bœuf), tomate rôtie, oignons confits et sauce pimentée.",
      price: 5500,
      priceFormatted: "5 500 F CFA",
      image: "img/menu/grillade-riz-legumes.jpg",
      is_orderable: true,
      badge: "Gourmand"
    },
    {
      id: "g-03",
      category: "grillades",
      name: "Bœuf sauté aux oignons caramélisés",
      composition: "Émincé de filet de bœuf revenu au wok avec oignons doux et poivrons croquants.",
      price: 4500,
      priceFormatted: "4 500 F CFA",
      image: "img/menu/boeuf-saute-oignons.jpg",
      is_orderable: true
    },
    {
      id: "g-04",
      category: "grillades",
      name: "Plateau Barbecue Times (pour 3-4 personnes)",
      composition: "Grand festin à partager : poulet braisé, brochettes de bœuf, saucisses grillées, alloco, frites et 3 sauces.",
      price: 15000,
      priceFormatted: "15 000 F CFA",
      image: "img/menu/grillade-riz-legumes.jpg",
      is_orderable: true,
      badge: "Formule Groupe"
    },

    // Plats du pays
    {
      id: "d-01",
      category: "plats-pays",
      name: "Pâte de maïs & sauce verte traditionnelle",
      composition: "Pâte blanche locale servie avec une sauce verte mijotée aux crevettes, crabe et poisson braisé.",
      price: 3500,
      priceFormatted: "3 500 F CFA",
      image: "img/menu/pate-sauce-verte.jpg",
      is_orderable: true,
      badge: "Terroir"
    },
    {
      id: "d-02",
      category: "plats-pays",
      name: "Pâte de maïs & sauce gombo royale",
      composition: "Gombo frais battu, viande de bœuf fondante, poisson fumé et fruits de mer, goût pimenté exquis.",
      price: 3800,
      priceFormatted: "3 800 F CFA",
      image: "img/menu/pate-sauce-gombo.jpg",
      is_orderable: true,
      badge: "Saveur locale"
    },

    // Pizzas
    {
      id: "z-01",
      category: "pizzas",
      name: "Pizza Reine (Jambon & Champignons)",
      composition: "Sauce tomate maison infusée à l'origan, mozzarella râpée, jambon supérieur et champignons de Paris frais.",
      price: 5000,
      priceFormatted: "5 000 F CFA",
      image: "img/menu/pizza-jambon-champignons.jpg",
      is_orderable: true,
      badge: "Classique"
    },
    {
      id: "z-02",
      category: "pizzas",
      name: "Pizza 4 Fromages",
      composition: "Base crème ou tomate, mozzarella fondante, chèvre affiné, gorgonzola et emmental doré.",
      price: 5500,
      priceFormatted: "5 500 F CFA",
      image: "img/menu/pizza-jambon-champignons.jpg",
      is_orderable: true
    },
    {
      id: "z-03",
      category: "pizzas",
      name: "Pizza Times Spéciale Braisée",
      composition: "Sauce barbecue douce, émincé de poulet grillé au feu de bois, oignons rouges, poivrons et double mozzarella.",
      price: 6000,
      priceFormatted: "6 000 F CFA",
      image: "img/menu/pizza-jambon-champignons.jpg",
      is_orderable: true,
      badge: "Signature"
    },

    // Pâtes & Riz
    {
      id: "r-01",
      category: "pates-riz",
      name: "Riz cantonais sauté aux légumes et poulet",
      composition: "Riz basmati sauté au wok avec petits pois, carottes, œufs battus et dés de volaille croustillants.",
      price: 3500,
      priceFormatted: "3 500 F CFA",
      image: "img/menu/riz-cantonais.jpg",
      is_orderable: true
    },
    {
      id: "r-02",
      category: "pates-riz",
      name: "Tagliatelles crémeuses au poulet et champignons",
      composition: "Pâtes tagliatelles cuites al dente, sauce crème fraîche relevée au parmesan et blanc de poulet émincé.",
      price: 4500,
      priceFormatted: "4 500 F CFA",
      image: "img/menu/tagliatelles-poulet.jpg",
      is_orderable: true
    },

    // Garnitures
    {
      id: "acc-01",
      category: "garnitures",
      name: "Portion d'Alloco doré",
      composition: "Bananes plantains mûres frites à l'huile végétale propre, croustillantes et fondantes.",
      price: 1000,
      priceFormatted: "1 000 F CFA",
      image: "img/menu/poisson-frit-riz-alloco.jpg",
      is_orderable: true
    },
    {
      id: "acc-02",
      category: "garnitures",
      name: "Frites de pommes de terre croustillantes",
      composition: "Frites dorées servies chaudes avec sel de Guérande et sauces maison.",
      price: 1200,
      priceFormatted: "1 200 F CFA",
      image: "img/menu/grillade-riz-legumes.jpg",
      is_orderable: true
    },
    {
      id: "acc-03",
      category: "garnitures",
      name: "Riz basmati blanc parfumé",
      composition: "Riz cuit vapeur aux grains détachés et parfumés.",
      price: 800,
      priceFormatted: "800 F CFA",
      image: "img/menu/poisson-braise-riz.jpg",
      is_orderable: true
    },

    // Desserts
    {
      id: "s-01",
      category: "desserts",
      name: "Coupe de Glace artisanale (3 boules)",
      composition: "Parfums au choix : vanille Bourbon, chocolat intense, fraise des bois, pistache ou mangue exotique.",
      price: 2500,
      priceFormatted: "2 500 F CFA",
      image: "img/menu/glace.jpg",
      is_orderable: true,
      badge: "Fraîcheur"
    },

    // Bières
    {
      id: "b-01",
      category: "bieres",
      name: "Bière locale pression (Béninoise, Flag, Castel)",
      composition: "Servie bien fraîche en chope de 33cl ou 50cl.",
      price: 1200,
      priceFormatted: "1 200 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: false
    },
    {
      id: "b-02",
      category: "bieres",
      name: "Bière internationale (Heineken, Beaufort, Guinness)",
      composition: "Bouteille de 33cl ou 50cl servie glacée.",
      price: 1500,
      priceFormatted: "1 500 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: true
    },
    {
      id: "b-03",
      category: "bieres",
      name: "Bière aromatisée (Desperados, Savanna Dry)",
      composition: "Bouteille fraîche 33cl.",
      price: 2500,
      priceFormatted: "2 500 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: true
    },
    {
      id: "b-04",
      category: "bieres",
      name: "Tour de Bière Pression (3 Litres)",
      composition: "Idéal pour les groupes et soirées karaoké entre amis en terrasse.",
      price: 9000,
      priceFormatted: "9 000 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: false,
      badge: "Fête entre amis"
    },

    // Cocktails
    {
      id: "c-01",
      category: "cocktails",
      name: "Mojito Cubain Classique",
      composition: "Rhum blanc, menthe fraîche pilée, citron vert, sucre de canne et eau gazeuse.",
      price: 3500,
      priceFormatted: "3 500 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: false,
      badge: "Cocktail Star"
    },
    {
      id: "c-02",
      category: "cocktails",
      name: "Cocktail Sans Alcool Passion Exotique",
      composition: "Jus de fruits de la passion, ananas frais pressé, grenadine et pointe de citron.",
      price: 2500,
      priceFormatted: "2 500 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: true
    },

    // Boissons fraîches
    {
      id: "f-01",
      category: "boissons-fraiches",
      name: "Jus d'ananas ou d'orange frais pressé",
      composition: "100% fruits naturels sans sucre ajouté, préparé à la minute.",
      price: 2000,
      priceFormatted: "2 000 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: true
    },
    {
      id: "f-02",
      category: "boissons-fraiches",
      name: "Eau minérale naturelle (1.5L)",
      composition: "Bouteille scellée servie très fraîche.",
      price: 1000,
      priceFormatted: "1 000 F CFA",
      image: "img/ambiance/biere-terrasse.jpg",
      is_orderable: true
    },

    // Chicha
    {
      id: "ch-01",
      category: "chicha",
      name: "Chicha Lounge Premium",
      composition: "Parfums au choix : Menthe fraîche, Double Pomme, Myrtille glacée, Love 66, Pêche passion.",
      price: 5000,
      priceFormatted: "5 000 F CFA",
      image: "img/ambiance/terrasse-nuit.jpg",
      is_orderable: false,
      badge: "Ambiance Lounge"
    }
  ],

  events: [
    {
      id: "ev-01",
      title: "Jeudi Karaoké & Grillades Party",
      category: "Karaoké",
      day: "Tous les jeudis",
      time: "20h00 – 01h30",
      image: "img/ambiance/panorama-nuit.jpg",
      price: "Entrée libre · Conso requise",
      description: "Prenez le micro, chantez vos morceaux préférés et dégustez nos grillades au feu de bois dans une ambiance ultra-chaleureuse !",
      badge: "Hebdomadaire"
    },
    {
      id: "ev-02",
      title: "Friday Night Live & DJ Set",
      category: "Soirée DJ",
      day: "Tous les vendredis",
      time: "21h00 – 02h30",
      image: "img/ambiance/terrasse-nuit.jpg",
      price: "Entrée libre",
      description: "Le meilleur de l'Afrobeats, Amapiano et R&B mixé en live par notre DJ résident sous les guirlandes lumineuses.",
      badge: "Fête du weekend"
    },
    {
      id: "ev-03",
      title: "Grand Karaoké du Samedi Soir",
      category: "Karaoké",
      day: "Tous les samedis",
      time: "20h30 – 02h30",
      image: "img/ambiance/facade-nuit.jpg",
      price: "Entrée libre",
      description: "La soirée la plus animée d'Akpakpa ! Venez vibrer en famille ou entre amis autour d'une chope de bière et d'un bon plat.",
      badge: "Plein d'énergie"
    },
    {
      id: "ev-04",
      title: "Dimanche Braisé & Retransmission Matchs",
      category: "Sports & Chill",
      day: "Tous les dimanches",
      time: "16h00 – 23h00",
      image: "img/evenement-terrasse.jpg",
      price: "Entrée libre",
      description: "Tous les grands matchs de football sur écran géant en terrasse, accompagnés de nos plateaux de grillades à partager.",
      badge: "Sport & Convivialité"
    }
  ],

  reviews: [
    {
      id: "rev-01",
      author: "Aimé K.",
      rating: 5,
      date: "Il y a 2 semaines",
      source: "Avis vérifié Google",
      text: "Un endroit magnifique à Akpakpa ! La terrasse est superbe le soir avec les lumières, le poisson braisé est d'une fraîcheur incroyable et les soirées karaoké sont au top. Je recommande à 100% !"
    },
    {
      id: "rev-02",
      author: "Sandrine D.",
      rating: 5,
      date: "Il y a 1 mois",
      source: "Avis vérifié Google",
      text: "Ambiance très chaleureuse, service attentionné et rapide. Le plateau de grillades avec alloco était délicieux. C'est notre nouveau QG pour les sorties du vendredi soir."
    },
    {
      id: "rev-03",
      author: "Carlos M.",
      rating: 4,
      date: "Il y a 1 mois",
      source: "Avis vérifié Google",
      text: "Bière pression bien fraîche, brochettes poulet bacon impeccables. Le cadre en bois et les guirlandes donnent vraiment une ambiance détendue."
    },
    {
      id: "rev-04",
      author: "Priscille T.",
      rating: 5,
      date: "Il y a 2 mois",
      source: "Avis vérifié Google",
      text: "Superbe expérience pour l'anniversaire d'une amie ! L'équipe nous a très bien installés en terrasse. Pizzas très bonnes et cocktail rafraîchissant."
    }
  ],

  gallery: [
    { id: "gal-01", category: "terrasse", title: "Terrasse en bois sous les guirlandes", image: "img/terrasse-jour.jpg" },
    { id: "gal-02", category: "ambiance", title: "Façade illuminée et ambiance nocturne", image: "img/ambiance/facade-nuit.jpg" },
    { id: "gal-03", category: "ambiance", title: "Vue panoramique de la terrasse festive", image: "img/ambiance/panorama-nuit.jpg" },
    { id: "gal-04", category: "ambiance", title: "Tour de bière et détente entre amis", image: "img/ambiance/biere-terrasse.jpg" },
    { id: "gal-05", category: "terrasse", title: "Terrasse préparée pour événement", image: "img/evenement-terrasse.jpg" },
    { id: "gal-06", category: "plats", title: "Poisson frit garni, riz et alloco", image: "img/menu/poisson-frit-riz-alloco.jpg" },
    { id: "gal-07", category: "plats", title: "Plateau de grillades et légumes rôtis", image: "img/menu/grillade-riz-legumes.jpg" },
    { id: "gal-08", category: "plats", title: "Brochettes de volaille au bacon", image: "img/menu/brochettes-poulet-bacon.jpg" },
    { id: "gal-09", category: "terrasse", title: "Façade de Times en journée", image: "img/facade-jour.jpg" }
  ],

  storySteps: [
    {
      step: "01",
      title: "La naissance en 2017",
      subtitle: "Un rêve de convivialité à Akpakpa",
      desc: "Né de l'amour de la bonne cuisine et des moments partagés, Times s'installe au cœur d'Akpakpa avec une promesse simple : offrir un espace chaleureux où l'on mange copieusement et où l'on se sent chez soi.",
      image: "img/facade-jour.jpg"
    },
    {
      step: "02",
      title: "L'art de la braise & de la fête",
      subtitle: "Terrasse bois, guirlandes et karaoké",
      desc: "Au fil des années, le restaurant s'agrandit avec sa grande terrasse en bois, ses grillades au feu de charbon, sa bière pression toujours fraîche et ses célèbres rendez-vous karaoké qui réunissent tout Cotonou.",
      image: "img/evenement-terrasse.jpg"
    },
    {
      step: "03",
      title: "Aujourd'hui, votre QG incontournable",
      subtitle: "Du déjeuner d'affaires jusqu'au bout de la nuit",
      desc: "Ouvert 7 jours sur 7 jusqu'à 2h du matin, Times Café Bar & Grill est devenu la référence où se mêlent cuisine locale savoureuse, pizzas croustillantes, cocktails rafraîchissants et bonne humeur.",
      image: "img/ambiance/panorama-nuit.jpg"
    }
  ]
};

// Export global pour utilisation dans les scripts
if (typeof window !== "undefined") {
  window.TIMES_DATA = TIMES_DATA;
}
