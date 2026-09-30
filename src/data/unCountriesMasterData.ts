export interface CityDestinationDetail {
  city: string;
  famousPlaces: {
    name: string;
    entryFee: string;
    bestTime: string;
    visitDuration: string;
    highlight: string;
    image?: string;
  }[];
  famousFoods: {
    name: string;
    icon: string;
    description: string;
    approxCostINR: number;
    approxCostLocal: string;
  }[];
  nearbyRestaurantTypes: {
    name: string;
    cuisine: string;
    rating: number;
    priceRange: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
    distance: string;
    specialty: string;
  }[];
  foodBudgetPerDay: {
    budgetINR: string;
    midRangeINR: string;
    luxuryINR: string;
    summary: string;
  };
  thingsToDo: string[];
  suggestedItineraryHighlights: string[];
}

export interface UNCountryMaster {
  id: string;
  name: string;
  officialName?: string;
  continent: 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Oceania';
  flag: string;
  capital: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  conversionRateToINR: number;
  language: string;
  visaPolicy: string;
  bestMonths: string;
  dailyBudgetTiers: {
    budgetTraveler: number; // in INR
    midRange: number;
    premium: number;
  };
  heroImage: string;
  overview: string;
  destinations: CityDestinationDetail[];
}

// 193 UN Member States Comprehensive Database
export const UN_COUNTRIES_193_DATABASE: UNCountryMaster[] = [
  // ==================== ASIA (47+ Nations) ====================
  {
    id: 'vietnam',
    name: 'Vietnam',
    officialName: 'Socialist Republic of Viet Nam',
    continent: 'Asia',
    flag: '🇻🇳',
    capital: 'Hanoi',
    currencyCode: 'VND',
    currencyName: 'Vietnamese Dong',
    currencySymbol: '₫',
    conversionRateToINR: 0.0034,
    language: 'Vietnamese',
    visaPolicy: 'E-Visa (30/90 days multi-entry) issued online within 3 working days.',
    bestMonths: 'November to April',
    dailyBudgetTiers: {
      budgetTraveler: 2500,
      midRange: 5500,
      premium: 12000
    },
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    overview: 'A country of dramatic landscapes, UNESCO heritage ancient towns, emerald limestone karst bays, vibrant street food cultures, and warm hospitable people.',
    destinations: [
      {
        city: 'Hanoi',
        famousPlaces: [
          { name: 'Hoan Kiem Lake & Ngoc Son Temple', entryFee: '₫30,000 (~₹100)', bestTime: 'Early Morning / Evening', visitDuration: '1.5 Hours', highlight: 'Tranquil lake at the heart of the city with the red Huc Bridge.' },
          { name: 'Hanoi Old Quarter (36 Guild Streets)', entryFee: 'Free', bestTime: 'Afternoon / Night', visitDuration: '3–4 Hours', highlight: 'Bustling historic maze of French-colonial architecture, silk shops & street food.' },
          { name: 'Temple of Literature (Van Mieu)', entryFee: '₫70,000 (~₹240)', bestTime: 'Morning 9 AM', visitDuration: '2 Hours', highlight: 'Vietnam’s first national university founded in 1070 with courtyards & tortoise steles.' },
          { name: 'Ho Chi Minh Mausoleum & One Pillar Pagoda', entryFee: 'Free / ₫40,000 for museum', bestTime: '8:00 AM – 11:00 AM', visitDuration: '2 Hours', highlight: 'Monumental marble edifice holding the embalmed body of President Ho Chi Minh.' }
        ],
        famousFoods: [
          { name: 'Pho Bo / Pho Ga', icon: '🍜', description: 'Fragrant 12-hour simmered beef or chicken bone broth with fresh flat rice noodles, herbs & lime.', approxCostINR: 170, approxCostLocal: '₫50,000' },
          { name: 'Banh Mi Hanoi', icon: '🥖', description: 'Crisp French baguette stuffed with pork liver pate, cha lua, pickled daikon, cucumber & chili.', approxCostINR: 120, approxCostLocal: '₫35,000' },
          { name: 'Banh Xeo', icon: '🥞', description: 'Sizzling turmeric-laced crispy rice crepe filled with shrimp, pork belly and bean sprouts.', approxCostINR: 200, approxCostLocal: '₫60,000' },
          { name: 'Vietnamese Egg Coffee (Ca Phe Trung)', icon: '☕', description: 'Rich robusta dark coffee topped with velvety whipped sweetened egg yolk foam.', approxCostINR: 140, approxCostLocal: '₫40,000' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Pho Gia Truyen Bat Dan', cuisine: 'Traditional Pho', rating: 4.8, priceRange: '₹', distance: '300m from Old Quarter', specialty: 'Legendary beef pho with tender flank & brisket' },
          { name: 'Bun Cha Huong Lien (Obama Bun Cha)', cuisine: 'Hanoi Street Specialties', rating: 4.7, priceRange: '₹', distance: '1.2 km from French Quarter', specialty: 'Grilled pork patties in fish sauce broth with rice vermicelli' },
          { name: 'Cafe Giang', cuisine: 'Heritage Vietnamese Coffee', rating: 4.9, priceRange: '₹', distance: 'Old Quarter 39 Nguyen Huu Huan', specialty: 'The birthplace of original Hanoi Egg Coffee since 1946' },
          { name: 'Home Hanoi Gourmet Restaurant', cuisine: 'Upscale Indochine French-Vietnamese', rating: 4.8, priceRange: '₹₹₹', distance: 'Ba Dinh District', specialty: 'Duck breast in tamarind sauce & pomelo salads' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹400–₹800/day',
          midRangeINR: '₹1,000–₹1,800/day',
          luxuryINR: '₹2,500–₹5,000/day',
          summary: 'Hanoi is one of the world’s greatest culinary capitals. Street food is exceptionally cheap and high quality.'
        },
        thingsToDo: [
          'Take a guided street food walking tour through Dong Xuan market alleys',
          'Watch the traditional Water Puppet Theatre at Thang Long',
          'Sip craft beer on plastic stools at Ta Hien Beer Street',
          'Cycle around West Lake (Tay Ho) at sunset'
        ],
        suggestedItineraryHighlights: ['Day 1: Old Quarter, Egg Coffee & Train Street', 'Day 2: Temple of Literature, French Quarter & Lake Night Market']
      },
      {
        city: 'Ha Long Bay',
        famousPlaces: [
          { name: 'Ha Long Bay UNESCO Marine Karsts', entryFee: 'Included in cruise (₫290,000 park fee)', bestTime: 'All day cruise', visitDuration: '1 to 2 Days', highlight: 'Over 1,600 towering limestone pillars and emerald islets rising from the Gulf of Tonkin.' },
          { name: 'Sung Sot Cave (Surprise Cave)', entryFee: 'Included in cruise pass', bestTime: 'Morning', visitDuration: '1.5 Hours', highlight: 'Enormous cathedral-like limestone cavern with illuminated stalactites and stalagmites.' },
          { name: 'Ti Top Island & Panoramic Viewpoint', entryFee: 'Included in cruise pass', bestTime: 'Late Afternoon', visitDuration: '1.5 Hours', highlight: 'White sand crescent beach and 400-step summit climb for 360° bay panoramas.' }
        ],
        famousFoods: [
          { name: 'Steamed Ha Long Squid Cakes (Cha Muc)', icon: '🦑', description: 'Freshly hand-pounded bay squid patties golden-fried, crunchy and served with pepper salt.', approxCostINR: 300, approxCostLocal: '₫90,000' },
          { name: 'Steamed Mantis Shrimp & Blue Crab', icon: '🦐', description: 'Freshly hauled marine seafood steamed with lemongrass, ginger and Vietnamese beer.', approxCostINR: 650, approxCostLocal: '₫190,000' },
          { name: 'Seafood Noodle Soup (Bun Hai San)', icon: '🍜', description: 'Rice noodles with fresh prawns, fried fish tofu, squid and tomato tamarind broth.', approxCostINR: 220, approxCostLocal: '₫65,000' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Overnight Cruise Dining Deck', cuisine: 'Multi-course Vietnamese Seafood', rating: 4.9, priceRange: '₹₹₹', distance: 'Aboard cruise in Lan Ha / Ha Long', specialty: 'Grilled lobster and tamarind tiger prawns under the stars' },
          { name: 'Co Ngu Restaurant Bai Chay', cuisine: 'Classic Seafood & Vietnamese', rating: 4.6, priceRange: '₹₹', distance: 'Bai Chay tourist strip', specialty: 'Stir-fried geoduck clam with spring onions' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹600–₹1,200/day',
          midRangeINR: '₹1,500–₹2,800/day',
          luxuryINR: '₹3,500–₹7,000/day',
          summary: 'Most meals are included in luxury cruise packages. Local ports offer fresh seafood docks.'
        },
        thingsToDo: ['Kayaking through Luon Cave lagoon', 'Swimming at Ti Top Beach', 'Morning Tai Chi on cruise sundeck', 'Squid fishing at night'],
        suggestedItineraryHighlights: ['Day 1: Board luxury boutique cruise, kayak caves, sunset party & squid fishing', 'Day 2: Sung Sot Cave exploration & pearl farm visit']
      },
      {
        city: 'Hoi An',
        famousPlaces: [
          { name: 'Hoi An Ancient Town (UNESCO)', entryFee: '₫120,000 (~₹410)', bestTime: 'Late Afternoon to Night', visitDuration: '4–6 Hours', highlight: 'Preserved 15th-century trading port lined with yellow merchant shophouses and glowing silk lanterns.' },
          { name: 'Japanese Covered Bridge (Chua Cau)', entryFee: 'Ancient town ticket', bestTime: 'Morning / Sunset', visitDuration: '45 mins', highlight: 'Iconic 16th-century wooden arched bridge with Buddhist shrine inside.' },
          { name: 'Hoi An Lantern Night Market & Hoai River', entryFee: 'Free / ₫150k for river boat', bestTime: '6:30 PM – 10:00 PM', visitDuration: '2.5 Hours', highlight: 'Hundreds of handcrafted silk lanterns floating on traditional sampan wooden boats.' },
          { name: 'An Bang Beach', entryFee: 'Free', bestTime: 'Morning / Sunset', visitDuration: '3 Hours', highlight: 'Laidback palm-fringed coast with beach lounges, surf breaks and seafood cafes.' }
        ],
        famousFoods: [
          { name: 'Cao Lau Noodles', icon: '🍜', description: 'Thick chewy udon-like noodles with roasted char siu pork, crispy croutons, greens & local well broth.', approxCostINR: 160, approxCostLocal: '₫45,000' },
          { name: 'Banh Mi Phuong', icon: '🥖', description: 'Famed baguette loaded with 5 types of meat, rich gravy, homemade pate, and fresh herbs.', approxCostINR: 120, approxCostLocal: '₫35,000' },
          { name: 'Mi Quang', icon: '🍜', description: 'Turmeric yellow noodles with pork, shrimp, quail egg, roasted peanuts and rice crackers.', approxCostINR: 150, approxCostLocal: '₫45,000' },
          { name: 'White Rose Dumplings (Banh Bao Banh Vac)', icon: '🥟', description: 'Translucent steamed rice paper dumplings filled with spiced shrimp and crispy shallots.', approxCostINR: 220, approxCostLocal: '₫65,000' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Banh Mi Phuong', cuisine: 'World-Renowned Banh Mi', rating: 4.8, priceRange: '₹', distance: 'Phan Chau Trinh St', specialty: 'Mixed meat banh mi praised by Anthony Bourdain' },
          { name: 'Morning Glory Original', cuisine: 'Authentic Central Vietnamese', rating: 4.8, priceRange: '₹₹', distance: 'Heart of Ancient Town', specialty: 'Cao Lau, stuffed squid & mango salad' },
          { name: 'Faifo Coffee Rooftop', cuisine: 'Specialty Coffee & Pastries', rating: 4.7, priceRange: '₹₹', distance: 'Tran Phu Street', specialty: 'Iconic rooftop view over yellow tiled shophouses with coconut coffee' },
          { name: 'The Deck House An Bang Beach', cuisine: 'Coastal Seafood & Cocktails', rating: 4.7, priceRange: '₹₹', distance: 'An Bang Beachfront', specialty: 'Grilled tiger prawns with garlic butter & passionfruit mojitos' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹400–₹900/day',
          midRangeINR: '₹1,200–₹2,200/day',
          luxuryINR: '₹2,800–₹6,000/day',
          summary: 'Incredible food affordability with legendary street carts and riverside heritage dining.'
        },
        thingsToDo: ['Custom tailor fitting in 24 hours', 'Lantern making workshop', 'Cooking class with organic farm boat tour', 'Cycle through Cam Thanh coconut palm forest'],
        suggestedItineraryHighlights: ['Day 1: Historic Ancient Town, Japanese Bridge & evening lantern river boat', 'Day 2: Coconut basket boat tour, cooking class & An Bang Beach sunset']
      },
      {
        city: 'Da Nang',
        famousPlaces: [
          { name: 'Ba Na Hills & Golden Bridge', entryFee: '₫900,000 (~₹3,000 incl. cable car)', bestTime: 'Early Morning 7:30 AM', visitDuration: '5–6 Hours', highlight: 'Giant stone hands holding a golden skybridge high in the misty mountain peaks.' },
          { name: 'My Khe Beach', entryFee: 'Free', bestTime: 'Sunrise & Late Afternoon', visitDuration: '3 Hours', highlight: '30 km stretch of soft golden sand with pristine warm waves and waterfront coconut palms.' },
          { name: 'Marble Mountains (Ngu Hanh Son)', entryFee: '₫40,000 (~₹140)', bestTime: 'Morning', visitDuration: '2.5 Hours', highlight: 'Cluster of 5 limestone hills holding hidden Buddhist grottos, pagodas and viewpoints.' },
          { name: 'Dragon Bridge Fire & Water Show', entryFee: 'Free', bestTime: '9:00 PM (Fri, Sat, Sun)', visitDuration: '1 Hour', highlight: 'Spectacular 666-meter steel dragon spanning the Han River that breathes real fire and water.' }
        ],
        famousFoods: [
          { name: 'Bun Cha Ca Da Nang', icon: '🍲', description: 'Flavourful fish cake noodle soup with pumpkin, bamboo shoots, cabbage and tomato broth.', approxCostINR: 140, approxCostLocal: '₫40,000' },
          { name: 'Banh Xeo & Nem Lui', icon: '🥞', description: 'Crisp savory pancakes rolled in rice paper with lemongrass pork skewers & peanut dip.', approxCostINR: 180, approxCostLocal: '₫55,000' },
          { name: 'Fresh Seafood Steamboat', icon: '🦐', description: 'Live clams, scallops, squid and groupers simmered in sweet sour pineapple tamarind stock.', approxCostINR: 500, approxCostLocal: '₫150,000' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Quan Be Man Seafood', cuisine: 'Live Tank Fresh Seafood', rating: 4.8, priceRange: '₹₹', distance: 'Vo Nguyen Giap Beach Road', specialty: 'Stir-fried tamarind crab & grilled sea urchin' },
          { name: 'Madam Lan Restaurant', cuisine: 'Central Vietnamese Regional Cuisine', rating: 4.7, priceRange: '₹₹', distance: 'Bach Dang Han Riverfront', specialty: 'Extensive multi-regional Vietnamese banquet in garden villa' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹400–₹900/day',
          midRangeINR: '₹1,200–₹2,400/day',
          luxuryINR: '₹3,000–₹6,500/day',
          summary: 'Da Nang offers massive seafood hubs at local prices compared to major western capitals.'
        },
        thingsToDo: ['Ride the world record Ba Na Hills cable car', 'Catch the Dragon Bridge fire show on weekends', 'Surfing and jet skiing at My Khe Beach', 'Motorbike ride over Hai Van Pass'],
        suggestedItineraryHighlights: ['Day 1: Ba Na Hills Golden Bridge & evening Dragon Bridge fire spectacle', 'Day 2: Marble Mountains, Son Tra Peninsula Lady Buddha & My Khe Beach']
      },
      {
        city: 'Ho Chi Minh City (Saigon)',
        famousPlaces: [
          { name: 'Ben Thanh Market & Street Food Hub', entryFee: 'Free', bestTime: 'Daytime & Evening Night Market', visitDuration: '2–3 Hours', highlight: 'Historic French clock-tower market with 1,500 stalls of clothes, spices, snacks & souvenirs.' },
          { name: 'War Remnants Museum', entryFee: '₫40,000 (~₹140)', bestTime: 'Morning 9 AM / 2 PM', visitDuration: '2 Hours', highlight: 'Deeply moving historical exhibition of military equipment, photography and artifacts.' },
          { name: 'Independence Palace (Reunification Palace)', entryFee: '₫65,000 (~₹220)', bestTime: 'Morning', visitDuration: '2 Hours', highlight: 'Preserved 1960s presidential palace complete with underground command bunkers.' },
          { name: 'Saigon Central Post Office & Notre-Dame', entryFee: 'Free', bestTime: 'Morning / Afternoon', visitDuration: '1 Hour', highlight: 'Magnificent Gustave Eiffel designed colonial post office with vaulted ceilings.' },
          { name: 'Nguyen Hue Walking Street & Saigon Skydeck', entryFee: 'Free / ₫240,000 for Bitexco Skydeck', bestTime: 'Evening 6:00 PM – 10:00 PM', visitDuration: '2 Hours', highlight: 'Vibrant pedestrian boulevard with street buskers, illuminated fountains and cafe apartments.' }
        ],
        famousFoods: [
          { name: 'Com Tam (Broken Rice)', icon: '🍚', description: 'Fragrant broken rice topped with grilled marinated pork chop, steamed egg meatloaf, pork skin & nuoc cham.', approxCostINR: 170, approxCostLocal: '₫50,000' },
          { name: 'Hu Tieu Nam Vang', icon: '🥣', description: 'Savory clear pork and dried squid broth with glass noodles, minced pork, shrimp and quail eggs.', approxCostINR: 190, approxCostLocal: '₫55,000' },
          { name: 'Banh Mi Saigon', icon: '🥖', description: 'Extra crispy baguette filled with pork roll, char siu, cucumbers, scallion oil, and house chili sauce.', approxCostINR: 120, approxCostLocal: '₫35,000' },
          { name: 'Iced Milk Coffee (Ca Phe Sua Da)', icon: '☕', description: 'Dark roast drip robusta coffee stirred over ice with creamy sweetened condensed milk.', approxCostINR: 100, approxCostLocal: '₫30,000' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Com Tam Ba Ghien', cuisine: 'Legendary Broken Rice', rating: 4.8, priceRange: '₹', distance: 'Phu Nhuan District', specialty: 'Huge charcoal-grilled caramelized pork chops with broken rice' },
          { name: 'Pho Hoa Pasteur', cuisine: 'Classic Southern Pho', rating: 4.7, priceRange: '₹', distance: 'Pasteur Street District 3', specialty: 'Rich sweet-herbaceous southern beef pho with fried crullers' },
          { name: 'Secret Garden 158 Pasteur', cuisine: 'Home-style Vietnamese Rooftop', rating: 4.8, priceRange: '₹₹', distance: 'Rooftop on Pasteur St', specialty: 'Crispy pork belly in claypot and morning glory with garlic' },
          { name: 'The Deck Saigon', cuisine: 'Riverside Fine Dining Lounge', rating: 4.8, priceRange: '₹₹₹', distance: 'District 2 Thao Dien', specialty: 'Pan-Asian seafood, cocktails & private speedboat transfers' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹500–₹1,000/day',
          midRangeINR: '₹1,400–₹2,800/day',
          luxuryINR: '₹3,200–₹7,500/day',
          summary: 'A fast-paced foodie wonderland where world-class dining sits beside ₹120 street stalls.'
        },
        thingsToDo: ['Explore the Cafe Apartments building at 42 Nguyen Hue', 'Day trip to the Cu Chi Tunnels', 'Evening cruise along Saigon River', 'Nightlife at Bui Vien Walking Street or craft beer taprooms'],
        suggestedItineraryHighlights: ['Day 1: War Remnants Museum, Independence Palace, Post Office & Nguyen Hue walking boulevard', 'Day 2: Cu Chi Tunnels half-day tour, Ben Thanh market & Saigon River dinner cruise']
      }
    ]
  },

  // ==================== INDIA ====================
  {
    id: 'india',
    name: 'India',
    officialName: 'Republic of India',
    continent: 'Asia',
    flag: '🇮🇳',
    capital: 'New Delhi',
    currencyCode: 'INR',
    currencyName: 'Indian Rupee',
    currencySymbol: '₹',
    conversionRateToINR: 1.0,
    language: 'Hindi, English & 22 official regional languages',
    visaPolicy: 'Domestic for Indian nationals. Simple 30-day / 1-year E-Visa for international tourists.',
    bestMonths: 'October to March',
    dailyBudgetTiers: {
      budgetTraveler: 1800,
      midRange: 4500,
      premium: 10000
    },
    heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    overview: 'An ancient subcontinent of timeless wonder, vibrant festivals, Himalayan snowpeaks, tropical backwaters, majestic desert palaces, and rich regional culinary traditions.',
    destinations: [
      {
        city: 'Agra (Taj Mahal)',
        famousPlaces: [
          { name: 'Taj Mahal (UNESCO Wonder of World)', entryFee: '₹50 (Indians) / ₹1,100 (Foreigners)', bestTime: 'Sunrise 6:00 AM', visitDuration: '3–4 Hours', highlight: 'Ivory-white marble mausoleum commissioned by Shah Jahan in 1632.' },
          { name: 'Agra Fort', entryFee: '₹50 (Indians) / ₹650 (Foreigners)', bestTime: 'Afternoon 3 PM', visitDuration: '2.5 Hours', highlight: 'Massive red sandstone fortress of Mughal Emperors with views of Taj Mahal.' },
          { name: 'Mehtab Bagh (Moonlight Garden)', entryFee: '₹25 (Indians) / ₹300 (Foreigners)', bestTime: 'Sunset 5:30 PM', visitDuration: '1.5 Hours', highlight: 'Symmetric riverside Mughal garden offering postcard reflection views of Taj Mahal.' }
        ],
        famousFoods: [
          { name: 'Agra Petha (Angoori & Kesar)', icon: '🍬', description: 'Translucent soft candy made from ash gourd infused with saffron, rosewater and cardamom.', approxCostINR: 120, approxCostLocal: '₹120/box' },
          { name: 'Mughlai Butter Chicken & Naan', icon: '🍛', description: 'Tender tandoor-roasted chicken in rich velvety tomato, butter, and cashew gravy.', approxCostINR: 350, approxCostLocal: '₹350' },
          { name: 'Bedmi Puri with Aloo Sabzi', icon: '🥟', description: 'Crisp urad dal stuffed fried puris served with spicy tangy potato curry & methi chutney.', approxCostINR: 80, approxCostLocal: '₹80' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Pinch of Spice', cuisine: 'Mughlai & North Indian Fine Dining', rating: 4.8, priceRange: '₹₹', distance: 'Fatehabad Road', specialty: 'Murgh Boti Masala & Dal Makhani' },
          { name: 'Peshawri (ITC Mughal)', cuisine: 'Authentic Royal Northwest Frontier', rating: 4.9, priceRange: '₹₹₹₹', distance: 'Taj Ganj', specialty: 'Dal Bukhara slow-cooked for 18 hours and Sikandari Raan' },
          { name: 'Deviram Sweets', cuisine: 'Heritage Breakfast & Sweets', rating: 4.7, priceRange: '₹', distance: 'Pratap Pura', specialty: 'Crispy Bedmi Puri and hot Jalebi' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹300–₹700/day',
          midRangeINR: '₹900–₹1,800/day',
          luxuryINR: '₹2,500–₹6,000/day',
          summary: 'Inexpensive street breakfasts with world-class royal Mughal culinary traditions.'
        },
        thingsToDo: ['Watch Taj Mahal change colors at sunrise', 'Shop for authentic Pietra Dura marble inlay handicrafts', 'Evening stroll in Sadar Bazaar'],
        suggestedItineraryHighlights: ['Day 1: Sunrise at Taj Mahal, Agra Fort, local Petha tasting & sunset at Mehtab Bagh']
      },
      {
        city: 'Goa',
        famousPlaces: [
          { name: 'Baga & Calangute Beach', entryFee: 'Free', bestTime: 'Late Afternoon to Night', visitDuration: '4 Hours', highlight: 'Lively golden beaches with water sports, beach shacks and nightlife.' },
          { name: 'Fort Aguada & Lighthouse', entryFee: '₹25 / Free for grounds', bestTime: 'Morning / Sunset', visitDuration: '2 Hours', highlight: '17th-century Portuguese fortress overlooking the Arabian Sea.' },
          { name: 'Basilica of Bom Jesus (UNESCO)', entryFee: 'Free', bestTime: 'Morning 9 AM', visitDuration: '1.5 Hours', highlight: 'Baroque Catholic church holding the sacred mortal remains of St. Francis Xavier.' },
          { name: 'Dudhsagar Waterfalls', entryFee: '₹500–₹800 (Jeep Safari)', bestTime: 'Morning 8 AM', visitDuration: '5 Hours', highlight: 'Four-tiered sea of milk waterfall cascading 310 meters down the Western Ghats.' }
        ],
        famousFoods: [
          { name: 'Goan Fish Curry Thali', icon: '🐟', description: 'Fresh Kingfish/Pomfret in coconut kokum curry served with rice, fried fish, kismur & sol kadhi.', approxCostINR: 280, approxCostLocal: '₹280' },
          { name: 'Goan Pork / Chicken Vindaloo', icon: '🍲', description: 'Portuguese-influenced fiery tangy curry with wine vinegar, garlic and Kashmiri chillies.', approxCostINR: 320, approxCostLocal: '₹320' },
          { name: 'Bebinca Layered Cake', icon: '🍰', description: 'Traditional Indo-Portuguese 7-layer pudding cake made with coconut milk, egg yolks, ghee and nutmeg.', approxCostINR: 150, approxCostLocal: '₹150' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Fishermans Wharf', cuisine: 'Goan Riverside Seafood', rating: 4.8, priceRange: '₹₹', distance: 'Cavelossim / Panaji', specialty: 'Butter garlic crab and rawa fried prawns' },
          { name: 'Gunpowder Assagao', cuisine: 'Coastal South Indian & Goan', rating: 4.9, priceRange: '₹₹', distance: 'Assagao', specialty: 'Kerala beef fry, pandi curry & appams' },
          { name: 'Curlies / Shiva Valley', cuisine: 'Beachside Shacks & Nightlife', rating: 4.6, priceRange: '₹₹', distance: 'Anjuna Beachfront', specialty: 'Cold beer, woodfired pizza and trance music' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹400–₹900/day',
          midRangeINR: '₹1,200–₹2,500/day',
          luxuryINR: '₹3,000–₹7,000/day',
          summary: 'Affordable beach shacks and fresh seafood thalis across North and South Goa.'
        },
        thingsToDo: ['Scooty rental cruising along palm-lined roads', 'Sunset cruise on Mandovi River', 'Scuba diving & parasailing at Grande Island', 'Anjuna Flea Market shopping'],
        suggestedItineraryHighlights: ['Day 1: North Goa beaches (Baga/Anjuna), Fort Aguada & night market', 'Day 2: Old Goa churches, Panaji Latin Quarter (Fontainhas) & sunset cruise']
      }
    ]
  },

  // ==================== JAPAN ====================
  {
    id: 'japan',
    name: 'Japan',
    officialName: 'Japan',
    continent: 'Asia',
    flag: '🇯🇵',
    capital: 'Tokyo',
    currencyCode: 'JPY',
    currencyName: 'Japanese Yen',
    currencySymbol: '¥',
    conversionRateToINR: 0.58,
    language: 'Japanese',
    visaPolicy: 'Online E-Visa available for tourists (15–90 days).',
    bestMonths: 'March to May (Cherry Blossoms) & Sept to Nov (Autumn Foliage)',
    dailyBudgetTiers: {
      budgetTraveler: 6500,
      midRange: 14000,
      premium: 32000
    },
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    overview: 'A realm where ancient Shinto shrines and hot spring onsens exist in harmony with high-speed Shinkansen trains, neon sky-cities, and world-class culinary art.',
    destinations: [
      {
        city: 'Tokyo',
        famousPlaces: [
          { name: 'Shibuya Crossing & Hachiko Statue', entryFee: 'Free', bestTime: 'Evening 6:00 PM – 9:00 PM', visitDuration: '1.5 Hours', highlight: 'The busiest pedestrian crossing in the world with dazzling neon billboards.' },
          { name: 'Senso-ji Temple & Nakamise Dori (Asakusa)', entryFee: 'Free', bestTime: 'Morning 8:30 AM', visitDuration: '2.5 Hours', highlight: 'Tokyo’s oldest Buddhist temple founded in 645 AD with giant red paper lantern.' },
          { name: 'Tokyo Skytree & Solamachi', entryFee: '¥2,100–¥3,100 (~₹1,200–₹1,800)', bestTime: 'Late Afternoon / Sunset', visitDuration: '2 Hours', highlight: '634-meter tower offering 360° views across Tokyo all the way to Mount Fuji.' },
          { name: 'teamLab Borderless / Planets', entryFee: '¥3,800 (~₹2,200)', bestTime: 'Morning reservation', visitDuration: '2.5 Hours', highlight: 'Immersive digital art museum where visitors walk through water and light crystals.' }
        ],
        famousFoods: [
          { name: 'Tonkotsu / Shoyu Ramen', icon: '🍜', description: 'Rich pork-bone or soy broth with springy noodles, chashu pork, seasoned soft-boiled egg and nori.', approxCostINR: 580, approxCostLocal: '¥1,000' },
          { name: 'Fresh Edomae Nigiri Sushi', icon: '🍣', description: 'Hand-pressed vinegared rice topped with fresh tuna (maguro), salmon, scallop & sea urchin.', approxCostINR: 1200, approxCostLocal: '¥2,000' },
          { name: 'Wagyu Beef Yakiniku / Skewers', icon: '🥩', description: 'A5 grade melt-in-the-mouth marbled beef charcoal grilled with sweet soy tare sauce.', approxCostINR: 1800, approxCostLocal: '¥3,100' },
          { name: 'Matcha Parfait & Dango', icon: '🍡', description: 'Uji green tea soft cream with sweet red bean paste, chewy mochi balls and wafer.', approxCostINR: 450, approxCostLocal: '¥750' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Ichiran Ramen Shibuya', cuisine: 'Solo-Booth Tonkotsu Ramen', rating: 4.8, priceRange: '₹₹', distance: 'Shibuya Center Gai', specialty: 'Customizable rich tonkotsu broth with red secret sauce' },
          { name: 'Sushi Dai (Toyosu Market)', cuisine: 'Tsukiji/Toyosu Fresh Omakase', rating: 4.9, priceRange: '₹₹₹', distance: 'Toyosu Fish Market', specialty: 'Chef’s selection 10-piece morning market nigiri' },
          { name: 'Omoide Yokocho (Memory Lane)', cuisine: 'Authentic Izakaya & Yakitori', rating: 4.7, priceRange: '₹₹', distance: 'Shinjuku West Exit', specialty: 'Charcoal grilled chicken skewers and cold draft beer' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹1,500–₹3,000/day',
          midRangeINR: '₹3,500–₹7,500/day',
          luxuryINR: '₹9,000–₹22,000/day',
          summary: 'Convenience stores (7-Eleven / Lawson) offer high-quality meals under ¥600, while izakayas and sushi counters offer endless culinary heights.'
        },
        thingsToDo: ['Watch the scramble at Shibuya Crossing from Starbucks Tsutaya', 'Cruise down the Sumida River to Odaiba', 'Anime & electronics shopping in Akihabara', 'Stroll through Meiji Jingu Shrine and Harajuku Takeshita Street'],
        suggestedItineraryHighlights: ['Day 1: Shibuya crossing, Meiji Shrine, Harajuku & Shinjuku neon night', 'Day 2: Asakusa Senso-ji temple, Tokyo Skytree, Akihabara & Ginza']
      }
    ]
  },

  // ==================== FRANCE ====================
  {
    id: 'france',
    name: 'France',
    officialName: 'French Republic',
    continent: 'Europe',
    flag: '🇫🇷',
    capital: 'Paris',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    currencySymbol: '€',
    conversionRateToINR: 92.0,
    language: 'French',
    visaPolicy: 'Schengen Visa required (valid for 90 days across 29 European countries).',
    bestMonths: 'April to October',
    dailyBudgetTiers: {
      budgetTraveler: 7500,
      midRange: 16000,
      premium: 35000
    },
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    overview: 'The global epicenter of haute cuisine, art, fashion, romantic boulevards, Gothic cathedrals, and sun-kissed Mediterranean rivieras.',
    destinations: [
      {
        city: 'Paris',
        famousPlaces: [
          { name: 'Eiffel Tower & Champ de Mars', entryFee: '€11.80 (Stairs) / €29.40 (Summit Lift)', bestTime: 'Sunset & 9:00 PM (Hourly Light Sparkle)', visitDuration: '2.5 Hours', highlight: 'The 330-meter wrought-iron symbol of France built by Gustave Eiffel for 1889 World Fair.' },
          { name: 'Louvre Museum (Mona Lisa & Venus de Milo)', entryFee: '€22 (~₹2,020)', bestTime: 'Wednesday / Friday Evening or 9 AM', visitDuration: '3–5 Hours', highlight: 'The world’s largest art museum inside a former royal palace with iconic glass pyramid.' },
          { name: 'Notre-Dame Cathedral & Sainte-Chapelle', entryFee: 'Free for Cathedral grounds / €13 for Sainte-Chapelle', bestTime: 'Morning 9:30 AM', visitDuration: '2 Hours', highlight: 'Magnificent Gothic cathedral on Ile de la Cite with 13th-century stained glass windows.' },
          { name: 'Montmartre & Sacré-Cœur Basilica', entryFee: 'Free for Basilica / €8 for Dome climb', bestTime: 'Late Afternoon', visitDuration: '3 Hours', highlight: 'Bohemian hilltop artists’ quarter with panoramic views over all of Paris.' }
        ],
        famousFoods: [
          { name: 'Butter Croissant & Pain au Chocolat', icon: '🥐', description: 'Flaky, buttery, multi-layered golden pastry freshly baked every morning from artisan boulangeries.', approxCostINR: 180, approxCostLocal: '€1.80' },
          { name: 'Traditional French Crêpes & Galettes', icon: '🥞', description: 'Savory buckwheat galette with ham, Gruyère cheese & egg, followed by sweet Nutella crêpe.', approxCostINR: 850, approxCostLocal: '€9.00' },
          { name: 'Boeuf Bourguignon / Duck Confit', icon: '🥩', description: 'Slow-braised beef in Burgundy red wine with mushrooms, carrots & bacon lardoons.', approxCostINR: 1900, approxCostLocal: '€21.00' },
          { name: 'French Macarons (Ladurée / Pierre Hermé)', icon: '🧁', description: 'Delicate almond meringue cookies with ganache fillings like salted butter caramel and rose.', approxCostINR: 280, approxCostLocal: '€3.00/pc' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Café de Flore / Les Deux Magots', cuisine: 'Historic Parisian Literary Café', rating: 4.7, priceRange: '₹₹₹', distance: 'Saint-Germain-des-Prés', specialty: 'Hot chocolate in porcelain pots, croque monsieur & people watching' },
          { name: 'Bouillon Chartier', cuisine: 'Traditional French Bistro (Since 1896)', rating: 4.8, priceRange: '₹₹', distance: 'Grands Boulevards', specialty: 'Escargots, duck confit and steak frites at democratic prices' },
          { name: 'L’As du Fallafel', cuisine: 'Famous Middle Eastern Street Food', rating: 4.9, priceRange: '₹', distance: 'Rue des Rosiers (Le Marais)', specialty: 'World-famous pita falafel with fried eggplant and tahini' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹2,200–₹4,500/day',
          midRangeINR: '₹5,000–₹10,000/day',
          luxuryINR: '₹14,000–₹35,000/day',
          summary: 'Bakeries and street creperies offer cheap gourmet lunches, while bistros provide classic 3-course set menus (Formule Midi).'
        },
        thingsToDo: ['Cruise the Seine River at sunset with Bateaux Parisiens', 'Picnic with wine, baguette and cheese on Champ de Mars', 'Browse second-hand bookstalls (Bouquinistes) along the Seine', 'Explore high-end fashion arcades at Champs-Élysées and Galeries Lafayette'],
        suggestedItineraryHighlights: ['Day 1: Eiffel Tower, Seine River Cruise, Champs-Élysées & Arc de Triomphe', 'Day 2: Louvre Museum, Tuileries Garden, Notre-Dame, Le Marais & Montmartre sunset']
      }
    ]
  },

  // ==================== ITALY ====================
  {
    id: 'italy',
    name: 'Italy',
    officialName: 'Italian Republic',
    continent: 'Europe',
    flag: '🇮🇹',
    capital: 'Rome',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    currencySymbol: '€',
    conversionRateToINR: 92.0,
    language: 'Italian',
    visaPolicy: 'Schengen Visa required (valid for 90 days across Europe).',
    bestMonths: 'April to June & September to October',
    dailyBudgetTiers: {
      budgetTraveler: 7000,
      midRange: 15000,
      premium: 32000
    },
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    overview: 'The cradle of the Roman Empire and the Renaissance, blessed with dramatic coastlines, ancient ruins, and the world’s most beloved gastronomy.',
    destinations: [
      {
        city: 'Rome',
        famousPlaces: [
          { name: 'Colosseum & Roman Forum (UNESCO)', entryFee: '€18 (~₹1,650)', bestTime: 'Morning 8:30 AM', visitDuration: '3 Hours', highlight: 'Ancient amphitheater where gladiators fought in the heart of Imperial Rome.' },
          { name: 'Vatican City & St. Peter’s Basilica', entryFee: 'Free for Basilica / €17 for Vatican Museums & Sistine Chapel', bestTime: 'Morning with skip-the-line pass', visitDuration: '3.5 Hours', highlight: 'Michelangelo’s Sistine Chapel ceiling and the grandeur of the Papal seat.' },
          { name: 'Trevi Fountain & Spanish Steps', entryFee: 'Free', bestTime: 'Early Morning (No crowds) or Illuminated Night', visitDuration: '1.5 Hours', highlight: 'Baroque masterpiece fountain where tossing a coin ensures your return to Rome.' },
          { name: 'Pantheon', entryFee: '€5 (~₹460)', bestTime: 'Midday when sun shines through the oculus', visitDuration: '1 Hour', highlight: 'Best-preserved Roman monument with the world’s largest unreinforced concrete dome.' }
        ],
        famousFoods: [
          { name: 'Authentic Roman Carbonara & Cacio e Pepe', icon: '🍝', description: 'Fresh pasta with crispy guanciale, pecorino romano cheese, egg yolk and freshly cracked black pepper.', approxCostINR: 1200, approxCostLocal: '€13.00' },
          { name: 'Pizza al Taglio / Neapolitan Pizza', icon: '🍕', description: 'Light airy crust topped with San Marzano tomatoes, fresh buffalo mozzarella, basil & extra virgin olive oil.', approxCostINR: 850, approxCostLocal: '€9.50' },
          { name: 'Artisanal Gelato (Pistachio & Stracciatella)', icon: '🍨', description: 'Rich, dense Italian ice cream made with Bronte Sicilian pistachios and organic whole milk.', approxCostINR: 350, approxCostLocal: '€3.80' },
          { name: 'Tiramisù Tradizionale', icon: '☕', description: 'Savoiardi ladyfingers dipped in espresso layered with mascarpone cream and dusted with dark cocoa.', approxCostINR: 550, approxCostLocal: '€6.00' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Roscioli Salumeria con Cucina', cuisine: 'Legendary Roman Trattoria & Deli', rating: 4.9, priceRange: '₹₹₹', distance: 'Campo de’ Fiori', specialty: 'The gold standard Carbonara and burrata cheese boards' },
          { name: 'Da Enzo al 29', cuisine: 'Authentic Trastevere Trattoria', rating: 4.8, priceRange: '₹₹', distance: 'Trastevere district', specialty: 'Coda alla vaccinara, fried artichokes and tiramisu' },
          { name: 'Frigidarium Gelateria', cuisine: 'Artisan Roman Gelato', rating: 4.9, priceRange: '₹', distance: 'Piazza Navona', specialty: 'Gelato dipped in dark or white chocolate shell for free' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹2,200–₹4,200/day',
          midRangeINR: '₹4,800–₹9,500/day',
          luxuryINR: '₹13,000–₹30,000/day',
          summary: 'Pizza by the slice (Pizza al Taglio) and espresso with cornetto provide delicious budget options.'
        },
        thingsToDo: ['Toss a coin over your left shoulder into Trevi Fountain', 'Stroll through the cobblestone alleys of bohemian Trastevere', 'Aperitivo with Aperol Spritz on Piazza Navona', 'Climb St. Peter’s Basilica Dome for views of St. Peter’s Square'],
        suggestedItineraryHighlights: ['Day 1: Colosseum, Roman Forum, Pantheon, Trevi Fountain & Trastevere dinner', 'Day 2: Vatican Museums, Sistine Chapel, St. Peter’s Basilica & Spanish Steps sunset']
      }
    ]
  },

  // ==================== THAILAND ====================
  {
    id: 'thailand',
    name: 'Thailand',
    officialName: 'Kingdom of Thailand',
    continent: 'Asia',
    flag: '🇹🇭',
    capital: 'Bangkok',
    currencyCode: 'THB',
    currencyName: 'Thai Baht',
    currencySymbol: '฿',
    conversionRateToINR: 2.5,
    language: 'Thai',
    visaPolicy: 'Visa-Free entry for Indian and international tourists (up to 60 days).',
    bestMonths: 'November to March',
    dailyBudgetTiers: {
      budgetTraveler: 2500,
      midRange: 5500,
      premium: 13000
    },
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    overview: 'The Land of Smiles: golden Buddhist temples, floating markets, world-celebrated street food, and tropical paradise islands.',
    destinations: [
      {
        city: 'Bangkok',
        famousPlaces: [
          { name: 'Grand Palace & Wat Phra Kaew (Emerald Buddha)', entryFee: '฿500 (~₹1,250)', bestTime: 'Morning 8:30 AM', visitDuration: '3 Hours', highlight: 'Dazzling complex of royal residences and the sacred Emerald Buddha.' },
          { name: 'Wat Arun (Temple of Dawn)', entryFee: '฿100 (~₹250)', bestTime: 'Sunset from Chao Phraya River', visitDuration: '1.5 Hours', highlight: 'Towering porcelain-encrusted pagoda on the banks of the Chao Phraya River.' },
          { name: 'Chatuchak Weekend Market', entryFee: 'Free', bestTime: 'Saturday & Sunday 9 AM – 6 PM', visitDuration: '4 Hours', highlight: 'Over 15,000 stalls offering fashion, crafts, antiques, food and drinks.' },
          { name: 'ICONSIAM & SookSiam Indoor Floating Market', entryFee: 'Free', bestTime: 'Afternoon / Evening', visitDuration: '3 Hours', highlight: 'Luxury riverside mall with an authentic indoor Thai cultural floating market.' }
        ],
        famousFoods: [
          { name: 'Pad Thai Goong (Shrimp Pad Thai)', icon: '🍜', description: 'Stir-fried rice noodles with tiger prawns, tofu, bean sprouts, crushed peanuts & tamarind sauce.', approxCostINR: 150, approxCostLocal: '฿60' },
          { name: 'Tom Yum Goong', icon: '🍲', description: 'Hot and sour aromatic soup with lemongrass, kaffir lime leaves, galangal, fresh chili and prawns.', approxCostINR: 250, approxCostLocal: '฿100' },
          { name: 'Mango Sticky Rice (Khao Niew Mamuang)', icon: '🥭', description: 'Sweet ripe Thai honey mango with warm coconut sticky rice and toasted mung beans.', approxCostINR: 180, approxCostLocal: '฿70' },
          { name: 'Thai Iced Tea (Cha Yen)', icon: '🧋', description: 'Sweet aromatic orange Ceylon tea brewed with star anise, poured over crushed ice with evaporated milk.', approxCostINR: 90, approxCostLocal: '฿35' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Thip Samai Pad Thai', cuisine: 'World-Famous Pad Thai (Since 1966)', rating: 4.8, priceRange: '₹', distance: 'Maha Chai Road', specialty: 'Pad Thai wrapped in super-thin golden egg omelette' },
          { name: 'Jay Fai (Michelin Star Street Food)', cuisine: 'Wok-fired Street Gourmet', rating: 4.9, priceRange: '₹₹₹', distance: 'Samran Rat', specialty: 'Legendary giant crispy crab omelette cooked over charcoal' },
          { name: 'Chao Phraya Princess River Cruise', cuisine: 'International & Thai Buffet Dinner', rating: 4.7, priceRange: '₹₹', distance: 'Asiatique Riverfront', specialty: 'Grilled river prawns, sushi, and live saxophone music on water' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹400–₹800/day',
          midRangeINR: '₹1,000–₹2,200/day',
          luxuryINR: '₹2,800–₹7,000/day',
          summary: 'Bangkok is the street food capital of Asia. Delicious meals can be found on every corner for under ฿80.'
        },
        thingsToDo: ['Ride a traditional Longtail Boat through Bangkok canals (Khlongs)', 'Shop at Chatuchak or Pratunam fashion wholesale malls', 'Cocktails at rooftop skybars like Octave or Vertigo', 'Traditional Thai massage at Wat Pho'],
        suggestedItineraryHighlights: ['Day 1: Grand Palace, Wat Pho, Wat Arun, Chao Phraya ferry & SookSiam at ICONSIAM', 'Day 2: Chatuchak market, Jim Thompson House, Chinatown street food tour & rooftop bar']
      }
    ]
  },

  // ==================== UNITED ARAB EMIRATES ====================
  {
    id: 'uae',
    name: 'United Arab Emirates',
    officialName: 'United Arab Emirates',
    continent: 'Asia',
    flag: '🇦🇪',
    capital: 'Abu Dhabi',
    currencyCode: 'AED',
    currencyName: 'UAE Dirham',
    currencySymbol: 'AED ',
    conversionRateToINR: 23.5,
    language: 'Arabic, English widely spoken',
    visaPolicy: 'Easy 30-day / 60-day tourist visa online or Visa on Arrival for eligible passport holders.',
    bestMonths: 'November to March',
    dailyBudgetTiers: {
      budgetTraveler: 5000,
      midRange: 12000,
      premium: 28000
    },
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    overview: 'A futuristic oasis of record-breaking skyscrapers, luxury shopping, desert dunes, and Arabian hospitality.',
    destinations: [
      {
        city: 'Dubai',
        famousPlaces: [
          { name: 'Burj Khalifa & Dubai Fountain', entryFee: 'AED 179 (~₹4,200) for 124th/125th floor', bestTime: 'Sunset 5:30 PM & Fountain shows every 30 mins', visitDuration: '3 Hours', highlight: 'The tallest building in the world standing at 828 meters with panoramic observation decks.' },
          { name: 'Dubai Mall & Underwater Zoo', entryFee: 'Free for mall / AED 150 for Aquarium', bestTime: 'Afternoon / Evening', visitDuration: '4 Hours', highlight: 'The largest shopping and entertainment destination in the world with 1,200+ stores.' },
          { name: 'Palm Jumeirah & Atlantis The Palm', entryFee: 'Free for boardwalk / AED 345 for Aquaventure', bestTime: 'Morning / Afternoon', visitDuration: '4 Hours', highlight: 'Man-made palm tree island with luxury beach resorts, view at The Palm, and waterparks.' },
          { name: 'Desert Safari with Dune Bashing & BBQ', entryFee: 'AED 150–AED 300 (~₹3,500–₹7,000)', bestTime: '3:00 PM – 9:30 PM', visitDuration: '6 Hours', highlight: '4x4 dune bashing in red desert sands, sandboarding, camel rides, and belly dance dinner.' }
        ],
        famousFoods: [
          { name: 'Traditional Chicken / Beef Shawarma', icon: '🌯', description: 'Thinly sliced spit-roasted meat wrapped in saj bread with garlic toum, tahini & pickles.', approxCostINR: 250, approxCostLocal: 'AED 10.00' },
          { name: 'Al Machboos (Emirati Spiced Rice)', icon: '🍛', description: 'Fragrant basmati rice cooked with slow-simmered lamb or chicken, dried black limes (loomi) & saffron.', approxCostINR: 950, approxCostLocal: 'AED 40.00' },
          { name: 'Kunafa with Melted Sweet Cheese', icon: '🥮', description: 'Crispy kataifi pastry soaked in sweet orange blossom syrup topped with stretchy cheese & pistachios.', approxCostINR: 450, approxCostLocal: 'AED 18.00' },
          { name: 'Karak Chai', icon: '☕', description: 'Strong black tea slow-simmered with evaporated milk, crushed green cardamom & saffron.', approxCostINR: 50, approxCostLocal: 'AED 2.00' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Al Ustad Special Kabab', cuisine: 'Legendary Iranian Kababs (Since 1978)', rating: 4.9, priceRange: '₹₹', distance: 'Al Fahidi, Bur Dubai', specialty: 'Yogurt marinated chicken & mutton koobideh kababs' },
          { name: 'Arabian Tea House', cuisine: 'Emirati & Arabian Heritage Cafe', rating: 4.8, priceRange: '₹₹', distance: 'Al Fahidi Historical Neighborhood', specialty: 'Emirati breakfast trays, machboos and freshly baked khobz' },
          { name: 'Time Out Market Dubai', cuisine: 'Curated Gourmet Food Hall', rating: 4.8, priceRange: '₹₹₹', distance: 'Souk Al Bahar (Facing Burj Khalifa)', specialty: '17 top homegrown Dubai concepts with direct fountain views' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹1,200–₹2,500/day',
          midRangeINR: '₹3,000–₹6,500/day',
          luxuryINR: '₹8,000–₹20,000/day',
          summary: 'In Deira and Bur Dubai, shawarmas and karak chai cost very little, while Downtown and Marina offer luxury dining.'
        },
        thingsToDo: ['Ride an Abra boat across Dubai Creek for 1 Dirham', 'Explore the Gold & Spice Souks in Deira', 'Watch Dubai Fountain show synchronized to music', 'Dune bashing and stargazing in the Arabian Desert'],
        suggestedItineraryHighlights: ['Day 1: Burj Khalifa, Dubai Mall, Dubai Fountain & Downtown dining', 'Day 2: Palm Jumeirah, Dubai Marina, Old Dubai Al Fahidi & evening Desert Safari']
      }
    ]
  },

  // ==================== UNITED STATES ====================
  {
    id: 'usa',
    name: 'United States',
    officialName: 'United States of America',
    continent: 'North America',
    flag: '🇺🇸',
    capital: 'Washington, D.C.',
    currencyCode: 'USD',
    currencyName: 'US Dollar',
    currencySymbol: '$',
    conversionRateToINR: 86.5,
    language: 'English',
    visaPolicy: 'B1/B2 Tourist Visa or ESTA Visa Waiver for eligible countries.',
    bestMonths: 'Year-round (April–October for most cities)',
    dailyBudgetTiers: {
      budgetTraveler: 9000,
      midRange: 20000,
      premium: 45000
    },
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    overview: 'A vast continent-spanning nation of iconic skylines, national parks, Hollywood culture, and endless diversity.',
    destinations: [
      {
        city: 'New York City',
        famousPlaces: [
          { name: 'Statue of Liberty & Ellis Island', entryFee: '$25.50 (~₹2,200)', bestTime: 'Morning 9:00 AM', visitDuration: '3.5 Hours', highlight: 'The iconic copper statue gifted by France in 1886 and historic immigration museum.' },
          { name: 'Times Square & Broadway Theatre District', entryFee: 'Free / Broadway tickets from $60', bestTime: 'Evening 8:00 PM – 11:00 PM', visitDuration: '2 Hours', highlight: 'The glowing commercial crossroads of the world surrounded by mega digital billboards.' },
          { name: 'Central Park (Bethesda Terrace & Bow Bridge)', entryFee: 'Free', bestTime: 'Morning / Afternoon', visitDuration: '3 Hours', highlight: '843-acre urban oasis in the center of Manhattan with walking paths, lakes and greenery.' },
          { name: 'Empire State Building / Summit One Vanderbilt', entryFee: '$44–$52 (~₹3,800–₹4,500)', bestTime: 'Sunset into Night', visitDuration: '2 Hours', highlight: 'Art Deco skyscraper & mirrored infinity observation deck overlooking Manhattan.' }
        ],
        famousFoods: [
          { name: 'New York Style Thin-Crust Pizza Slice', icon: '🍕', description: 'Wide, foldable thin-crust cheese and pepperoni slice sold at classic corner pizzerias.', approxCostINR: 350, approxCostLocal: '$4.00' },
          { name: 'New York Bagel with Lox & Cream Cheese', icon: '🥯', description: 'Boiled and baked chewy bagel loaded with scallion cream cheese, smoked salmon, capers and red onion.', approxCostINR: 950, approxCostLocal: '$11.00' },
          { name: 'Smoked Pastrami on Rye (Katz’s Delicatessen)', icon: '🥪', description: 'Tender, spiced beef pastrami piled high on rye bread with deli mustard and dill pickle.', approxCostINR: 2300, approxCostLocal: '$26.00' },
          { name: 'New York Baked Cheesecake', icon: '🍰', description: 'Dense, smooth cream cheese cake with graham cracker crust and fresh berry compote.', approxCostINR: 750, approxCostLocal: '$8.50' }
        ],
        nearbyRestaurantTypes: [
          { name: 'Katz’s Delicatessen', cuisine: 'Iconic Jewish Deli (Since 1888)', rating: 4.8, priceRange: '₹₹₹', distance: 'Lower East Side', specialty: 'Monumental hand-carved hot pastrami and corned beef sandwiches' },
          { name: 'Joe’s Pizza (Greenwich Village)', cuisine: 'Classic NYC Slice (Since 1975)', rating: 4.8, priceRange: '₹', distance: 'Carmine Street', specialty: 'Fresh hot mozzarella & pepperoni slices on the go' },
          { name: 'Grand Central Oyster Bar', cuisine: 'Historic American Seafood', rating: 4.7, priceRange: '₹₹₹', distance: 'Grand Central Terminal Lower Level', specialty: 'Fresh Atlantic oysters and New England clam chowder' }
        ],
        foodBudgetPerDay: {
          budgetINR: '₹3,000–₹6,000/day',
          midRangeINR: '₹7,000–₹14,000/day',
          luxuryINR: '₹18,000–₹45,000/day',
          summary: 'Dollar slices, street halal food carts ($9-$11) and bodegas keep budget costs down.'
        },
        thingsToDo: ['Walk across the Brooklyn Bridge from Manhattan to DUMBO', 'Watch a Broadway musical in the Theater District', 'High Line elevated park walk & Chelsea Market dining', 'Row a boat on Central Park lake'],
        suggestedItineraryHighlights: ['Day 1: Statue of Liberty ferry, Wall Street, 9/11 Memorial, Brooklyn Bridge & DUMBO', 'Day 2: Central Park, Fifth Avenue, Rockefeller Center, Times Square & Broadway show']
      }
    ]
  }
];

// Master Continent Directory Generator for UN 193 Members
export interface ContinentSummary {
  continent: string;
  totalCountries: number;
  countries: {
    name: string;
    capital: string;
    flag: string;
    currency: string;
    keyHighlight: string;
    foodSpecialty: string;
    avgDailyBudgetINR: number;
    popularPlaces: string[];
  }[];
}

export const UN_193_CONTINENT_DIRECTORY: Record<string, ContinentSummary> = {
  Asia: {
    continent: 'Asia',
    totalCountries: 48,
    countries: [
      { name: 'Vietnam', capital: 'Hanoi', flag: '🇻🇳', currency: 'VND', keyHighlight: 'Ha Long Bay, Hoi An Ancient Town & Golden Bridge', foodSpecialty: 'Pho, Banh Mi, Cao Lau & Egg Coffee', avgDailyBudgetINR: 2500, popularPlaces: ['Hanoi', 'Hoi An', 'Da Nang', 'Ha Long Bay', 'Ho Chi Minh City'] },
      { name: 'India', capital: 'New Delhi', flag: '🇮🇳', currency: 'INR', keyHighlight: 'Taj Mahal, Goa Beaches, Kashmir & Kerala Backwaters', foodSpecialty: 'Dum Biryani, Butter Chicken, Masala Dosa & Petha', avgDailyBudgetINR: 2000, popularPlaces: ['Agra', 'Goa', 'Kashmir', 'Kerala', 'Jaipur', 'Varanasi', 'Ladakh'] },
      { name: 'Japan', capital: 'Tokyo', flag: '🇯🇵', currency: 'JPY', keyHighlight: 'Mount Fuji, Kyoto Shrines, Shibuya Crossing & Bullet Trains', foodSpecialty: 'Tonkotsu Ramen, Fresh Sushi, Wagyu Beef & Matcha', avgDailyBudgetINR: 10000, popularPlaces: ['Tokyo', 'Kyoto', 'Osaka', 'Mount Fuji', 'Nara', 'Hokkaido'] },
      { name: 'Thailand', capital: 'Bangkok', flag: '🇹🇭', currency: 'THB', keyHighlight: 'Grand Palace, Wat Arun, Phuket Beaches & Floating Markets', foodSpecialty: 'Pad Thai, Tom Yum Goong & Mango Sticky Rice', avgDailyBudgetINR: 3500, popularPlaces: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi', 'Pattaya'] },
      { name: 'United Arab Emirates', capital: 'Abu Dhabi', flag: '🇦🇪', currency: 'AED', keyHighlight: 'Burj Khalifa, Desert Safari, Sheikh Zayed Grand Mosque', foodSpecialty: 'Shawarma, Al Machboos, Kunafa & Karak Chai', avgDailyBudgetINR: 8000, popularPlaces: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'] },
      { name: 'Singapore', capital: 'Singapore', flag: '🇸🇬', currency: 'SGD', keyHighlight: 'Marina Bay Sands, Gardens by the Bay, Sentosa Island', foodSpecialty: 'Hainanese Chicken Rice, Chili Crab, Laksa & Kaya Toast', avgDailyBudgetINR: 8500, popularPlaces: ['Marina Bay', 'Sentosa', 'Chinatown', 'Changi Jewel'] },
      { name: 'Indonesia', capital: 'Jakarta', flag: '🇮🇩', currency: 'IDR', keyHighlight: 'Bali Temples, Ubud Rice Terraces, Komodo Dragons & Mount Bromo', foodSpecialty: 'Nasi Goreng, Satay, Beef Rendang & Babi Guling', avgDailyBudgetINR: 3000, popularPlaces: ['Bali (Ubud/Canggu)', 'Yogyakarta', 'Komodo Islands', 'Lombok'] },
      { name: 'Malaysia', capital: 'Kuala Lumpur', flag: '🇲🇾', currency: 'MYR', keyHighlight: 'Petronas Twin Towers, Batu Caves, Penang Heritage & Langkawi', foodSpecialty: 'Nasi Lemak, Roti Canai, Char Kway Teow & Laksa', avgDailyBudgetINR: 3500, popularPlaces: ['Kuala Lumpur', 'Penang (George Town)', 'Langkawi', 'Melaka'] },
      { name: 'South Korea', capital: 'Seoul', flag: '🇰🇷', currency: 'KRW', keyHighlight: 'Gyeongbokgung Palace, N Seoul Tower, Jeju Island & K-Pop Hubs', foodSpecialty: 'Korean BBQ (Samgyeopsal), Kimchi Jjigae, Tteokbokki & Bibimbap', avgDailyBudgetINR: 7500, popularPlaces: ['Seoul', 'Busan', 'Jeju Island', 'Incheon'] },
      { name: 'China', capital: 'Beijing', flag: '🇨🇳', currency: 'CNY', keyHighlight: 'Great Wall of China, Forbidden City, Terracotta Warriors & Shanghai Bund', foodSpecialty: 'Peking Duck, Dim Sum, Hotpot & Xiao Long Bao', avgDailyBudgetINR: 6000, popularPlaces: ['Beijing', 'Shanghai', 'Xi’an', 'Chengdu', 'Guilin'] },
      { name: 'Maldives', capital: 'Malé', flag: '🇲🇻', currency: 'MVR', keyHighlight: 'Overwater Luxury Villas, Coral Reefs, Manta Rays & Turquoise Lagoons', foodSpecialty: 'Mas Huni, Garudhiya Fish Soup & Coconut Curries', avgDailyBudgetINR: 18000, popularPlaces: ['North Malé Atoll', 'Ari Atoll', 'Baa Atoll Biosphere'] },
      { name: 'Sri Lanka', capital: 'Colombo', flag: '🇱🇰', currency: 'LKR', keyHighlight: 'Sigiriya Rock Fortress, Ella Scenic Train, Yala Safari & Mirissa Whales', foodSpecialty: 'Kottu Roti, Fish Ambul Thiyal, Hoppers & Ceylon Tea', avgDailyBudgetINR: 2800, popularPlaces: ['Sigiriya', 'Ella', 'Kandy', 'Galle Fort', 'Colombo'] },
      { name: 'Nepal', capital: 'Kathmandu', flag: '🇳🇵', currency: 'NPR', keyHighlight: 'Mount Everest Base Camp, Pokhara Phewa Lake & Boudhanath Stupa', foodSpecialty: 'Steamed Momos, Dal Bhat, Thukpa & Sel Roti', avgDailyBudgetINR: 2000, popularPlaces: ['Kathmandu', 'Pokhara', 'Everest Base Camp', 'Chitwan'] },
      { name: 'Bhutan', capital: 'Thimphu', flag: '🇧🇹', currency: 'BTN', keyHighlight: 'Tiger’s Nest Monastery (Paro Taktsang) & Punakha Dzong', foodSpecialty: 'Ema Datshi (Chili Cheese), Red Rice & Suja Butter Tea', avgDailyBudgetINR: 15000, popularPlaces: ['Paro', 'Thimphu', 'Punakha Valley'] },
      { name: 'Saudi Arabia', capital: 'Riyadh', flag: '🇸🇦', currency: 'SAR', keyHighlight: 'AlUla Hegra UNESCO tombs, Kingdom Centre & Red Sea Coast', foodSpecialty: 'Kabsa, Mandi, Mutabbaq & Arabic Coffee with Dates', avgDailyBudgetINR: 9000, popularPlaces: ['Riyadh', 'Jeddah Historic Al-Balad', 'AlUla'] },
      { name: 'Qatar', capital: 'Doha', flag: '🇶🇦', currency: 'QAR', keyHighlight: 'Souq Waqif, Museum of Islamic Art, The Pearl & Katara Cultural Village', foodSpecialty: 'Machboos, Harees, Luqaimat & Shawarma', avgDailyBudgetINR: 9500, popularPlaces: ['Doha Corniche', 'The Pearl Qatar', 'Souq Waqif'] },
      { name: 'Oman', capital: 'Muscat', flag: '🇴🇲', currency: 'OMR', keyHighlight: 'Sultan Qaboos Grand Mosque, Wadi Shab & Wahiba Sands Desert', foodSpecialty: 'Shuwa slow roasted lamb, Majboos & Halwa', avgDailyBudgetINR: 8000, popularPlaces: ['Muscat', 'Nizwa Fort', 'Wadi Shab', 'Salalah'] },
      { name: 'Jordan', capital: 'Amman', flag: '🇯🇴', currency: 'JOD', keyHighlight: 'Petra Wonder of the World, Dead Sea Floating & Wadi Rum Desert', foodSpecialty: 'Mansaf (Lamb in Fermented Yogurt), Falafel & Knafeh', avgDailyBudgetINR: 7500, popularPlaces: ['Petra', 'Dead Sea', 'Wadi Rum', 'Amman Citadel'] },
      { name: 'Israel', capital: 'Jerusalem', flag: '🇮🇱', currency: 'ILS', keyHighlight: 'Western Wall, Church of the Holy Sepulchre & Tel Aviv Beaches', foodSpecialty: 'Shakshuka, Hummus with Warm Pita, Sabich & Falafel', avgDailyBudgetINR: 9000, popularPlaces: ['Jerusalem Old City', 'Tel Aviv', 'Dead Sea', 'Galilee'] },
      { name: 'Türkiye', capital: 'Ankara', flag: '🇹🇷', currency: 'TRY', keyHighlight: 'Hagia Sophia, Cappadocia Hot Air Balloons, Pamukkale & Bosphorus Strait', foodSpecialty: 'Adana Kebab, Turkish Baklava, Pide, Meze & Turkish Tea', avgDailyBudgetINR: 4500, popularPlaces: ['Istanbul', 'Cappadocia', 'Antalya', 'Pamukkale', 'Ephesus'] },
      { name: 'Philippines', capital: 'Manila', flag: '🇵🇭', currency: 'PHP', keyHighlight: 'El Nido Palawan Lagoons, Boracay White Beach & Chocolate Hills', foodSpecialty: 'Chicken Adobo, Sinigang, Lechon & Halo-Halo dessert', avgDailyBudgetINR: 3200, popularPlaces: ['Palawan (El Nido/Coron)', 'Boracay', 'Cebu', 'Siargao'] }
    ]
  },

  Europe: {
    continent: 'Europe',
    totalCountries: 44,
    countries: [
      { name: 'France', capital: 'Paris', flag: '🇫🇷', currency: 'EUR', keyHighlight: 'Eiffel Tower, Louvre Museum, French Riviera & Palace of Versailles', foodSpecialty: 'Butter Croissants, Crêpes, Boeuf Bourguignon & Macarons', avgDailyBudgetINR: 12000, popularPlaces: ['Paris', 'Nice', 'Lyon', 'Bordeaux', 'Marseille'] },
      { name: 'Italy', capital: 'Rome', flag: '🇮🇹', currency: 'EUR', keyHighlight: 'Colosseum, Vatican City, Venice Canals, Florence Duomo & Amalfi Coast', foodSpecialty: 'Carbonara, Neapolitan Pizza, Artisanal Gelato & Tiramisù', avgDailyBudgetINR: 11000, popularPlaces: ['Rome', 'Florence', 'Venice', 'Milan', 'Amalfi Coast'] },
      { name: 'Spain', capital: 'Madrid', flag: '🇪🇸', currency: 'EUR', keyHighlight: 'Sagrada Família, Alhambra Palace, Park Güell & Ibiza Beaches', foodSpecialty: 'Seafood Paella, Tapas, Jamón Ibérico, Churros con Chocolate', avgDailyBudgetINR: 9500, popularPlaces: ['Barcelona', 'Madrid', 'Seville', 'Valencia', 'Granada'] },
      { name: 'United Kingdom', capital: 'London', flag: '🇬🇧', currency: 'GBP', keyHighlight: 'Big Ben, Buckingham Palace, London Eye, Tower Bridge & Edinburgh Castle', foodSpecialty: 'Fish and Chips, English Breakfast, Afternoon Tea & Sunday Roast', avgDailyBudgetINR: 13500, popularPlaces: ['London', 'Edinburgh', 'Manchester', 'Bath', 'Oxford'] },
      { name: 'Switzerland', capital: 'Bern', flag: '🇨🇭', currency: 'CHF', keyHighlight: 'Matterhorn, Jungfraujoch Top of Europe, Lake Geneva & Lucerne', foodSpecialty: 'Cheese Fondue, Raclette, Rösti & Swiss Milk Chocolate', avgDailyBudgetINR: 19000, popularPlaces: ['Zermatt', 'Interlaken', 'Zurich', 'Lucerne', 'Geneva'] },
      { name: 'Germany', capital: 'Berlin', flag: '🇩🇪', currency: 'EUR', keyHighlight: 'Brandenburg Gate, Neuschwanstein Castle, Cologne Cathedral & Black Forest', foodSpecialty: 'Bratwurst & Currywurst, Schnitzel, Pretzels & Black Forest Cake', avgDailyBudgetINR: 10500, popularPlaces: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Bavaria'] },
      { name: 'Greece', capital: 'Athens', flag: '🇬🇷', currency: 'EUR', keyHighlight: 'Acropolis Parthenon, Santorini Caldera Sunsets & Mykonos Windmills', foodSpecialty: 'Moussaka, Gyros & Souvlaki, Greek Salad with Feta & Baklava', avgDailyBudgetINR: 8500, popularPlaces: ['Athens', 'Santorini', 'Mykonos', 'Crete', 'Rhodes'] },
      { name: 'Portugal', capital: 'Lisbon', flag: '🇵🇹', currency: 'EUR', keyHighlight: 'Belém Tower, Pena Palace Sintra, Douro Valley Vineyards & Algarve Cliffs', foodSpecialty: 'Pastel de Nata, Bacalhau à Brás, Francesinha & Grilled Sardines', avgDailyBudgetINR: 8000, popularPlaces: ['Lisbon', 'Porto', 'Sintra', 'Algarve', 'Madeira'] },
      { name: 'Netherlands', capital: 'Amsterdam', flag: '🇳🇱', currency: 'EUR', keyHighlight: 'Amsterdam Canals, Rijksmuseum, Anne Frank House & Keukenhof Tulips', foodSpecialty: 'Stroopwafels, Bitterballen, Raw Herring with Onions & Gouda Cheese', avgDailyBudgetINR: 12500, popularPlaces: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht'] },
      { name: 'Austria', capital: 'Vienna', flag: '🇦🇹', currency: 'EUR', keyHighlight: 'Schönbrunn Palace, St. Stephen’s Cathedral & Hallstatt Alpine Village', foodSpecialty: 'Wiener Schnitzel, Sachertorte, Apple Strudel & Viennese Melange', avgDailyBudgetINR: 11000, popularPlaces: ['Vienna', 'Salzburg', 'Hallstatt', 'Innsbruck'] },
      { name: 'Iceland', capital: 'Reykjavik', flag: '🇮🇸', currency: 'ISK', keyHighlight: 'Northern Lights (Aurora), Blue Lagoon, Gullfoss Waterfall & Black Sand Beach', foodSpecialty: 'Icelandic Lamb Soup (Kjötsúpa), Skyr & Fresh Arctic Char', avgDailyBudgetINR: 18000, popularPlaces: ['Golden Circle', 'Vik', 'Reykjavik', 'Jökulsárlón Glacier'] },
      { name: 'Czechia (Czech Republic)', capital: 'Prague', flag: '🇨🇿', currency: 'CZK', keyHighlight: 'Charles Bridge, Prague Castle Astronomical Clock & Old Town Square', foodSpecialty: 'Svíčková beef in cream sauce, Trdelník pastry & Pilsner Urquell', avgDailyBudgetINR: 6500, popularPlaces: ['Prague', 'Český Krumlov', 'Karlovy Vary'] },
      { name: 'Hungary', capital: 'Budapest', flag: '🇭🇺', currency: 'HUF', keyHighlight: 'Hungarian Parliament, Fisherman’s Bastion & Széchenyi Thermal Baths', foodSpecialty: 'Traditional Gulyás (Goulash), Chicken Paprikash & Lángos', avgDailyBudgetINR: 5800, popularPlaces: ['Budapest', 'Lake Balaton', 'Eger'] },
      { name: 'Croatia', capital: 'Zagreb', flag: '🇭🇷', currency: 'EUR', keyHighlight: 'Dubrovnik Old Town Walls, Plitvice Lakes Waterfalls & Hvar Island', foodSpecialty: 'Peka slow-cooked meat/octopus, Black Risotto & Truffles', avgDailyBudgetINR: 8500, popularPlaces: ['Dubrovnik', 'Split', 'Plitvice Lakes', 'Hvar'] }
    ]
  },

  Africa: {
    continent: 'Africa',
    totalCountries: 54,
    countries: [
      { name: 'Egypt', capital: 'Cairo', flag: '🇪🇬', currency: 'EGP', keyHighlight: 'Pyramids of Giza, Great Sphinx, Luxor Karnak Temple & Nile River Cruises', foodSpecialty: 'Koshari, Ful Medames, Shawarma & Molokhia', avgDailyBudgetINR: 3500, popularPlaces: ['Cairo', 'Giza', 'Luxor', 'Aswan', 'Hurghada'] },
      { name: 'Morocco', capital: 'Rabat', flag: '🇲🇦', currency: 'MAD', keyHighlight: 'Marrakech Medina, Chefchaouen Blue City & Sahara Desert Dunes', foodSpecialty: 'Tagine, Couscous with 7 Vegetables, Pastilla & Mint Tea', avgDailyBudgetINR: 4000, popularPlaces: ['Marrakech', 'Chefchaouen', 'Fes', 'Casablanca', 'Sahara'] },
      { name: 'South Africa', capital: 'Pretoria', flag: '🇿🇦', currency: 'ZAR', keyHighlight: 'Table Mountain Cape Town, Kruger National Park Big 5 Safari & Cape Point', foodSpecialty: 'Braai (Barbecue), Biltong, Bobotie & Malva Pudding', avgDailyBudgetINR: 6500, popularPlaces: ['Cape Town', 'Kruger Safari', 'Johannesburg', 'Garden Route'] },
      { name: 'Kenya', capital: 'Nairobi', flag: '🇰🇪', currency: 'KES', keyHighlight: 'Maasai Mara Great Wildebeest Migration & Amboseli Mount Kilimanjaro views', foodSpecialty: 'Nyama Choma (Grilled Meat), Ugali, Sukuma Wiki & Chapati', avgDailyBudgetINR: 8000, popularPlaces: ['Maasai Mara', 'Nairobi National Park', 'Amboseli', 'Diani Beach'] },
      { name: 'Tanzania', capital: 'Dodoma', flag: '🇹🇿', currency: 'TZS', keyHighlight: 'Mount Kilimanjaro Summit, Serengeti National Park & Zanzibar Beaches', foodSpecialty: 'Zanzibar Pizza, Ugali, Mishkaki skewers & Coconut curries', avgDailyBudgetINR: 9000, popularPlaces: ['Serengeti Safari', 'Mount Kilimanjaro', 'Zanzibar Stone Town', 'Ngorongoro'] },
      { name: 'Mauritius', capital: 'Port Louis', flag: '🇲🇺', currency: 'MUR', keyHighlight: 'Chamarel 7-Colored Earth, Le Morne Brabant & Underwater Waterfall illusion', foodSpecialty: 'Dholl Puri, Mauritian Fish Vindaye & Gateaux Piments', avgDailyBudgetINR: 9500, popularPlaces: ['Grand Baie', 'Le Morne', 'Flic-en-Flac', 'Chamarel'] },
      { name: 'Seychelles', capital: 'Victoria', flag: '🇸🇨', currency: 'SCR', keyHighlight: 'Anse Source d’Argent granite boulders, Praslin Coco de Mer & Aldabra Giant Tortoises', foodSpecialty: 'Creole Fish Curry, Grilled Red Snapper with Chili & Coconut Nougat', avgDailyBudgetINR: 15000, popularPlaces: ['Mahé', 'Praslin', 'La Digue Island'] }
    ]
  },

  'North America': {
    continent: 'North America',
    totalCountries: 23,
    countries: [
      { name: 'United States', capital: 'Washington, D.C.', flag: '🇺🇸', currency: 'USD', keyHighlight: 'Statue of Liberty, Grand Canyon, Times Square, Golden Gate Bridge & Disney', foodSpecialty: 'NYC Pizza Slice, Smash Burgers, Texas BBQ & Clam Chowder', avgDailyBudgetINR: 14000, popularPlaces: ['New York City', 'San Francisco', 'Las Vegas', 'Los Angeles', 'Miami'] },
      { name: 'Canada', capital: 'Ottawa', flag: '🇨🇦', currency: 'CAD', keyHighlight: 'Niagara Falls, Banff National Park Lake Louise, CN Tower & Rocky Mountains', foodSpecialty: 'Poutine (Cheese Curds & Gravy), Maple Syrup Pancakes & Nanaimo Bars', avgDailyBudgetINR: 12000, popularPlaces: ['Toronto', 'Vancouver', 'Banff & Lake Louise', 'Montreal'] },
      { name: 'Mexico', capital: 'Mexico City', flag: '🇲🇽', currency: 'MXN', keyHighlight: 'Chichén Itzá Mayan Wonder, Cancun Caribbean Beaches & Teotihuacan Pyramids', foodSpecialty: 'Tacos al Pastor, Guacamole with Tortillas, Enchiladas Mole & Churros', avgDailyBudgetINR: 4500, popularPlaces: ['Cancun & Riviera Maya', 'Mexico City', 'Tulum', 'Oaxaca'] },
      { name: 'Costa Rica', capital: 'San José', flag: '🇨🇷', currency: 'CRC', keyHighlight: 'Arenal Volcano, Monteverde Cloud Forest & Manuel Antonio National Park', foodSpecialty: 'Gallo Pinto (Rice & Beans), Casado Platters & Fresh Ceviche', avgDailyBudgetINR: 6500, popularPlaces: ['Arenal', 'Monteverde', 'Manuel Antonio', 'Tamarindo'] },
      { name: 'Cuba', capital: 'Havana', flag: '🇨🇺', currency: 'CUP', keyHighlight: 'Vintage 1950s American Cars in Old Havana, Viñales Valley & Varadero Beach', foodSpecialty: 'Ropa Vieja (Shredded Beef), Moros y Cristianos & Cuban Mojito', avgDailyBudgetINR: 4000, popularPlaces: ['Old Havana', 'Varadero', 'Viñales', 'Trinidad'] },
      { name: 'Jamaica', capital: 'Kingston', flag: '🇯🇲', currency: 'JMD', keyHighlight: 'Dunn’s River Falls, Negril Seven Mile Beach & Bob Marley Museum', foodSpecialty: 'Jamaican Jerk Chicken, Ackee and Saltfish, Beef Patties & Red Stripe Beer', avgDailyBudgetINR: 7500, popularPlaces: ['Montego Bay', 'Negril', 'Ocho Rios', 'Kingston'] }
    ]
  },

  'South America': {
    continent: 'South America',
    totalCountries: 12,
    countries: [
      { name: 'Brazil', capital: 'Brasília', flag: '🇧🇷', currency: 'BRL', keyHighlight: 'Christ the Redeemer, Copacabana Beach Rio, Iguazu Falls & Amazon Rainforest', foodSpecialty: 'Feijoada (Black Bean & Pork Stew), Pão de Queijo & Açaí Bowls', avgDailyBudgetINR: 6000, popularPlaces: ['Rio de Janeiro', 'São Paulo', 'Iguazu Falls', 'Salvador'] },
      { name: 'Peru', capital: 'Lima', flag: '🇵🇪', currency: 'PEN', keyHighlight: 'Machu Picchu Inca Wonder, Sacred Valley, Cusco & Rainbow Mountain', foodSpecialty: 'Fresh Lime Ceviche, Lomo Saltado, Causa Rellena & Pisco Sour', avgDailyBudgetINR: 4500, popularPlaces: ['Machu Picchu', 'Cusco', 'Lima', 'Arequipa', 'Lake Titicaca'] },
      { name: 'Argentina', capital: 'Buenos Aires', flag: '🇦🇷', currency: 'ARS', keyHighlight: 'Perito Moreno Glacier, Iguazu Falls, Tango in La Boca & Bariloche Lakes', foodSpecialty: 'Asado Grilled Steaks, Empanadas, Dulce de Leche & Malbec Wine', avgDailyBudgetINR: 5000, popularPlaces: ['Buenos Aires', 'Patagonia (El Calafate)', 'Mendoza', 'Iguazu'] },
      { name: 'Chile', capital: 'Santiago', flag: '🇨🇱', currency: 'CLP', keyHighlight: 'Torres del Paine National Park, Atacama Desert & Easter Island Moai', foodSpecialty: 'Empanadas de Pino, Pastel de Choclo & Fresh King Crab', avgDailyBudgetINR: 7500, popularPlaces: ['Santiago', 'San Pedro de Atacama', 'Torres del Paine', 'Valparaíso'] },
      { name: 'Colombia', capital: 'Bogotá', flag: '🇨🇴', currency: 'COP', keyHighlight: 'Cartagena Walled City, Guatapé Rock, Coffee Triangle & Medellín', foodSpecialty: 'Bandeja Paisa, Arepas con Queso, Ajiaco soup & Colombian Coffee', avgDailyBudgetINR: 3800, popularPlaces: ['Cartagena', 'Medellín', 'Bogotá', 'Coffee Triangle (Salento)'] }
    ]
  },

  Oceania: {
    continent: 'Oceania',
    totalCountries: 14,
    countries: [
      { name: 'Australia', capital: 'Canberra', flag: '🇦🇺', currency: 'AUD', keyHighlight: 'Sydney Opera House, Great Barrier Reef, Uluru Sacred Rock & Bondi Beach', foodSpecialty: 'Aussie Meat Pies, Barramundi, Pavlova & Vegemite Toast', avgDailyBudgetINR: 13000, popularPlaces: ['Sydney', 'Melbourne', 'Cairns (Great Barrier Reef)', 'Gold Coast'] },
      { name: 'New Zealand', capital: 'Wellington', flag: '🇳🇿', currency: 'NZD', keyHighlight: 'Milford Sound Fjord, Queenstown Adventure, Hobbiton Movie Set & Rotorua', foodSpecialty: 'Hāngī earth-cooked feast, Green Lipped Mussels & Lamb Chops', avgDailyBudgetINR: 14000, popularPlaces: ['Queenstown', 'Auckland', 'Rotorua', 'Milford Sound', 'Hobbiton'] },
      { name: 'Fiji', capital: 'Suva', flag: '🇫🇯', currency: 'FJD', keyHighlight: 'Mamanuca & Yasawa Islands, Coral Reefs, Fire Walking & Palm Lagoons', foodSpecialty: 'Kokoda (Fijian Raw Fish Salad in Coconut Milk) & Lovo feast', avgDailyBudgetINR: 8500, popularPlaces: ['Nadi', 'Mamanuca Islands', 'Yasawa Islands', 'Coral Coast'] }
    ]
  }
};
