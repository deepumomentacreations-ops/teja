export interface DetailedPlace {
  id: string;
  name: string;
  stateOrCountry: string;
  region: 'India' | 'World';
  category: 'Beach' | 'Mountain & Hill' | 'Heritage & Fort' | 'Temple & Spiritual' | 'Wildlife & Nature' | 'Waterfall & Lake' | 'City & Culture' | 'Adventure & Island';
  bestTimeToVisit: string;
  avgDailyCostINR: number;
  rating: number;
  highlight: string;
  localTransportAvailable: string[];
  image: string;
}

export interface LocalTransportMode {
  id: string;
  mode: string;
  category: 'Auto / Rickshaw' | 'Bike / Scooty Rental' | 'App Cab / Taxi' | 'Metro / Public Bus' | 'Bicycle / Walk' | 'Ferry / Boat';
  typicalCost: string;
  availability: string;
  bestFor: string;
  bookingTip: string;
  helmetLicenseReq?: string;
  icon: string;
  description: string;
}

export const INDIAN_LOCAL_TRANSPORTS: LocalTransportMode[] = [
  {
    id: 'in-trans-1',
    mode: 'Auto-Rickshaw (Tuk-Tuk) & E-Rickshaws (Toto)',
    category: 'Auto / Rickshaw',
    typicalCost: '₹30 – ₹150 per short ride (₹15 – ₹25 per km)',
    availability: 'Everywhere 24/7 in cities, towns & tourist spots',
    bestFor: 'Short city hops, bustling bazaar shopping, navigating narrow old-town alleys',
    bookingTip: 'Always ask for the meter or agree on the fixed fare before boarding. UPI/Paytm/GPay QR code is accepted by 95% of drivers.',
    icon: '🛺',
    description: 'Iconic three-wheeler rickshaw. Best for authentic local sightseeing, station drop-offs, and quick point-to-point transit.'
  },
  {
    id: 'in-trans-2',
    mode: 'Self-Drive Scooty Rental (Activa / Jupiter / Vespa)',
    category: 'Bike / Scooty Rental',
    typicalCost: '₹350 – ₹600 per 24 hours (excluding petrol)',
    availability: 'Widely available in Goa, Manali, Pondicherry, Kerala, Rishikesh, Udaipur, Andaman',
    bestFor: 'Couples, solo explorers, beach hopping, cafe cruising, maximum schedule freedom',
    bookingTip: 'Inspect tires and take a 360° video before taking delivery. Keep valid Driving License and Aadhar/Passport copy.',
    helmetLicenseReq: 'Valid 2-Wheeler Driving License & ISI Helmet mandatory for rider + pillion',
    icon: '🛵',
    description: 'Most popular and affordable way to explore coastal towns and scenic hill roads. Easy automatic twist-and-go driving.'
  },
  {
    id: 'in-trans-3',
    mode: 'Royal Enfield / Himalayan Motorcycle Rental',
    category: 'Bike / Scooty Rental',
    typicalCost: '₹900 – ₹1,800 per day (Deposit ₹2,000 – ₹5,000)',
    availability: 'Popular in Ladakh, Spiti, Manali, Rishikesh, Goa, Rajasthan desert circuits',
    bestFor: 'Adventure riders, high-altitude mountain passes, rugged off-road terrains',
    bookingTip: 'Check clutch cable, tool kit, and brake pads. Request spare tube and puncture kit for mountain passes.',
    helmetLicenseReq: 'Valid Motorcycle with Gear Driving License (Riding gear recommended)',
    icon: '🏍️',
    description: 'The definitive Indian road-trip machine with 350cc/450cc power to conquer mountain passes and highway curves.'
  },
  {
    id: 'in-trans-4',
    mode: 'App-Based Cabs & Bike Taxis (Ola, Uber, Rapido, InDrive)',
    category: 'App Cab / Taxi',
    typicalCost: 'Bike Taxi: ₹30 – ₹90 | Mini Cab: ₹120 – ₹400 | Sedan/SUV: ₹250 – ₹800',
    availability: 'All Tier 1 & Tier 2 Indian cities, airport terminals & tech hubs',
    bestFor: 'Hassle-free AC travel, fixed transparent pricing, airport/railway transfers, solo quick rides',
    bookingTip: 'Use Rapido for single-passenger budget trips through traffic. Uber/Ola for group luggage travel.',
    icon: '🚕',
    description: 'GPS-tracked, cashless, fixed upfront fare bookings directly through smartphone apps.'
  },
  {
    id: 'in-trans-5',
    mode: 'Self-Drive Car Rental (Swift / Thar / Scorpio / Innova)',
    category: 'App Cab / Taxi',
    typicalCost: '₹1,500 – ₹4,500 per day (Zoomcar, Revv, local operators)',
    availability: 'Major airports, Goa, Kerala, Delhi, Bengaluru, Mumbai, Chandigarh',
    bestFor: 'Families, group road trips, long day excursions, inter-state coastal drives',
    bookingTip: 'Check fuel policy (full-to-full), speed limit terms (usually 80-100 km/h), and Fastag toll balance.',
    helmetLicenseReq: 'Valid 4-Wheeler Driving License (min 1 year driving experience)',
    icon: '🚗',
    description: 'Private vehicle freedom for entire families with AC, large luggage boots, and child seating.'
  },
  {
    id: 'in-trans-6',
    mode: 'City Metro Rail, Monorail & Chalo App Buses',
    category: 'Metro / Public Bus',
    typicalCost: 'Metro: ₹10 – ₹60 | AC City Bus: ₹15 – ₹50',
    availability: 'Delhi-NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Kochi, Jaipur, Lucknow',
    bestFor: 'Beating peak-hour road traffic, ultra-cheap long-distance city travel, eco-friendly transit',
    bookingTip: 'Purchase a 1-day Tourist Metro Card or use WhatsApp QR ticketing on Kochi/Delhi/Hyderabad metro.',
    icon: '🚇',
    description: 'Modern, air-conditioned, high-speed underground and elevated urban transit systems.'
  },
  {
    id: 'in-trans-7',
    mode: 'Bicycle & Smart Electric Cycle Rentals (Yulu, SmartBikes)',
    category: 'Bicycle / Walk',
    typicalCost: '₹50 – ₹200 per day | App cycles ₹1.5 per min',
    availability: 'Pondicherry, Old Goa, Udaipur lake promenade, Chandigarh, Fort Kochi, Hampi',
    bestFor: 'Heritage walks, scenic lake promenades, slow eco-tourism, old-town photo tours',
    bookingTip: 'Download Yulu / SmartBike app or rent traditional geared cycles from heritage homestays.',
    icon: '🚲',
    description: 'Peaceful, zero-carbon sightseeing through historic french quarters, tea estates, and ancient ruins.'
  },
  {
    id: 'in-trans-8',
    mode: 'Local Ferries, Water Taxis & Shikaras',
    category: 'Ferry / Boat',
    typicalCost: 'Govt Ferry: ₹5 – ₹20 | Tourist Shikara: ₹400 – ₹900/hr | Water Metro: ₹20 – ₹40',
    availability: 'Goa (Betim/Ribandar), Kerala (Kochi Water Metro, Alleppey), Kashmir (Dal Lake), Mumbai, Varanasi',
    bestFor: 'Island crossings, backwater sightseeing, river sunset views, heritage water journeys',
    bookingTip: 'Govt passenger ferries in Goa are free for two-wheelers & pedestrians. Book Kochi Water Metro via Kochi1 App.',
    icon: '⛴️',
    description: 'Scenic water routes connecting river islands, backwater villages, and coastal peninsulas.'
  },
  {
    id: 'in-trans-9',
    mode: 'Shared Mountain Jeeps & Maxx Cabs (Sumo / Bolero)',
    category: 'Auto / Rickshaw',
    typicalCost: '₹50 – ₹250 per seat depending on mountain route',
    availability: 'Himachal, Uttarakhand, Kashmir, Ladakh, Sikkim, Darjeeling, Meghalaya',
    bestFor: 'Connecting remote mountain valleys, trekking trailheads, steep hairpin passes',
    bookingTip: 'Board early in the morning (7 AM - 9 AM) from the main local jeep stand for prompt departures.',
    icon: '🚙',
    description: 'Rugged 4x4 group passenger transport built for Himalayan roads where standard cars cannot reach.'
  }
];

export const GLOBAL_LOCAL_TRANSPORTS: LocalTransportMode[] = [
  {
    id: 'glb-trans-1',
    mode: 'Subway & High-Speed City Rail (Japan, Europe, London Tube, NYC)',
    category: 'Metro / Public Bus',
    typicalCost: '$1.50 – $4.00 per ride (€1.80 – €3.50 / ¥180 – ¥350)',
    availability: '24/7 or 5:00 AM - 1:00 AM across all major global cities',
    bestFor: 'Fastest transit, avoiding street traffic, direct connection between sights & airports',
    bookingTip: 'Load digital Suica/Pasmo on Apple/Google Wallet for Japan, or tap contactless credit card on London/NYC turnstiles.',
    icon: '🚇',
    description: 'World-standard rapid transit networks with precise clockwork schedules and multilingual signage.'
  },
  {
    id: 'glb-trans-2',
    mode: 'Tuk-Tuks & Songthaew Shared Trucks (Thailand, Cambodia, Sri Lanka)',
    category: 'Auto / Rickshaw',
    typicalCost: '฿50 – ฿150 ($1.50 – $4.50) in Thailand | 200 – 600 LKR in Sri Lanka',
    availability: 'Everywhere near temples, night markets, and beach towns',
    bestFor: 'Open-air tropical breeze, quick short trips, night market food hops',
    bookingTip: 'Use Grab or Bolt app to check the baseline price before hailing street tuk-tuks, or ride open-back Songthaews for ฿20-30.',
    icon: '🛺',
    description: 'Lively, open-air motorized three-wheelers and red truck passenger taxis iconic across Southeast Asia.'
  },
  {
    id: 'glb-trans-3',
    mode: 'Scooter & Moped Rentals (Bali, Phuket, Vietnam, Greek Islands, Italy)',
    category: 'Bike / Scooty Rental',
    typicalCost: '$5 – $12 (IDR 80,000 – 150,000 / ฿200 – ฿350) per day',
    availability: 'Available at almost every hotel and rental shop across Bali, Thailand, and Mediterranean islands',
    bestFor: 'Visiting hidden beaches, waterfall chasing, rice field shortcuts, coastal cliffs',
    bookingTip: 'An International Driving Permit (IDP) with motorcycle endorsement is legally required. Always wear an approved helmet.',
    helmetLicenseReq: 'International Driving Permit (IDP) + Passport + Helmet',
    icon: '🛵',
    description: 'The quintessential way to explore tropical islands and coastal towns with complete independence.'
  },
  {
    id: 'glb-trans-4',
    mode: 'Global Ride-Hailing (Uber, Grab, Bolt, Careem, Gojek, Kakao T)',
    category: 'App Cab / Taxi',
    typicalCost: '$4 – $25 depending on country and distance',
    availability: 'Available across 10,000+ cities worldwide',
    bestFor: 'Transparent pricing, no language barrier (destination typed in app), luggage comfort',
    bookingTip: 'Use Grab in Southeast Asia, Careem in Dubai/Middle East, Bolt in Europe, and Kakao T in South Korea.',
    icon: '🚗',
    description: 'Door-to-door smartphone requested taxis with automated translation and in-app credit card payments.'
  },
  {
    id: 'glb-trans-5',
    mode: 'Dockless E-Scooters & City Bikes (Lime, Tier, Voi, CitiBike, Santander)',
    category: 'Bicycle / Walk',
    typicalCost: '$1 to unlock + $0.20 – $0.40 per minute',
    availability: 'Paris, Rome, Berlin, London, New York, San Francisco, Dubai, Singapore',
    bestFor: 'Cruising through parks, river promenades, bike lanes, bridge crossings',
    bookingTip: 'Ride only in designated bicycle lanes and park strictly in marked parking zones to avoid fines.',
    icon: '🛴',
    description: 'Instant smartphone-unlocked electric micro-mobility vehicles scattered across city centers.'
  },
  {
    id: 'glb-trans-6',
    mode: 'Water Buses, Vaporettos & Water Taxis (Venice, Amsterdam, Bangkok, Sydney)',
    category: 'Ferry / Boat',
    typicalCost: 'Venice Vaporetto: €9.50 | Bangkok Chao Phraya Express: ฿16 | Sydney Ferry: AUD $7',
    availability: 'Every 10-20 minutes along key canals and harbor terminals',
    bestFor: 'Scenic panoramic sightseeing, traveling between canals and harbor islands without traffic',
    bookingTip: 'Buy a 24-hour unlimited travel pass in Venice or Amsterdam for huge cost savings.',
    icon: '🚤',
    description: 'Iconic public passenger boats cruising historic canals and sparkling oceanic harbors.'
  }
];

// ==========================================
// 250+ FAMOUS PLACES IN INDIA (ALL STATES & UTS)
// ==========================================
export const FAMOUS_INDIAN_PLACES_250: DetailedPlace[] = [
  // GOA
  { id: 'in-1', name: 'Baga & Calangute Beach', stateOrCountry: 'Goa', region: 'India', category: 'Beach', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 3500, rating: 4.8, highlight: 'Water sports, beach shacks, lively nightlife & parasailing', localTransportAvailable: ['Scooty Rental', 'Auto', 'App Cab', 'Bicycle'], image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-2', name: 'Aguada Fort & Lighthouse', stateOrCountry: 'Goa', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.7, highlight: '17th-century Portuguese fortress overlooking Arabian Sea', localTransportAvailable: ['Scooty Rental', 'Car Taxi', 'Bike Rental'], image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-3', name: 'Dudhsagar Waterfalls', stateOrCountry: 'Goa', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Jul – Nov', avgDailyCostINR: 4000, rating: 4.9, highlight: 'Four-tiered sea of milk waterfall on Mandovi river with jungle safari', localTransportAvailable: ['Shared Jeep', 'Train to Kulem', 'Tour Bus'], image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-4', name: 'Palolem Beach & Butterfly Beach', stateOrCountry: 'Goa', region: 'India', category: 'Beach', bestTimeToVisit: 'Nov – Mar', avgDailyCostINR: 3400, rating: 4.9, highlight: 'Crescent beach, silent noise parties & dolphin boat trips', localTransportAvailable: ['Scooty Rental', 'Auto', 'Kayaks', 'Bicycle'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-5', name: 'Basilica of Bom Jesus & Old Goa', stateOrCountry: 'Goa', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'All year', avgDailyCostINR: 2800, rating: 4.8, highlight: 'UNESCO Baroque cathedral preserving relics of St. Francis Xavier', localTransportAvailable: ['Auto', 'City Bus', 'Scooty', 'App Cab'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-6', name: 'Anjuna & Vagator Clifftop', stateOrCountry: 'Goa', region: 'India', category: 'Beach', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 3800, rating: 4.8, highlight: 'Flea market, red laterite cliffs & sunset beach raves at Curlies/Thalassa', localTransportAvailable: ['Scooty Rental', 'Bike Taxi', 'Auto'], image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },

  // JAMMU & KASHMIR
  { id: 'in-7', name: 'Dal Lake & Floating Markets', stateOrCountry: 'Jammu & Kashmir', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 4800, rating: 4.9, highlight: 'Traditional Shikara rides, cedarwood houseboats & water gardens', localTransportAvailable: ['Shikara Boat', 'Auto', 'Car Taxi'], image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-8', name: 'Gulmarg Gondola & Apharwat Peak', stateOrCountry: 'Jammu & Kashmir', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Dec – Feb (Snow) & May – Sep', avgDailyCostINR: 5500, rating: 4.9, highlight: 'World second-highest operating cable car and powder skiing', localTransportAvailable: ['Pony / Horse', 'Gondola Cable Car', 'Local Taxi', 'Sledge'], image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-9', name: 'Pahalgam Betaab Valley & Aru Valley', stateOrCountry: 'Jammu & Kashmir', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 4900, rating: 4.9, highlight: 'Lidder river trout fishing, pine meadows & Kolahoi glacier treks', localTransportAvailable: ['Union Taxi', 'Pony', 'Walking'], image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-10', name: 'Sonamarg (Meadow of Gold) & Thajiwas Glacier', stateOrCountry: 'Jammu & Kashmir', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'May – Oct', avgDailyCostINR: 4700, rating: 4.8, highlight: 'Snow sledging on year-round glacier & Sindh river rafting', localTransportAvailable: ['Pony', 'Local Union Taxi', 'Trekking'], image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-11', name: 'Vaishno Devi Shrine (Katra)', stateOrCountry: 'Jammu & Kashmir', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Mar – Oct', avgDailyCostINR: 3200, rating: 4.9, highlight: 'Holy cave pilgrimage in Trikuta mountains visited by millions', localTransportAvailable: ['Helicopter', 'Battery Car', 'Pony / Palki', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // LADAKH
  { id: 'in-12', name: 'Pangong Tso Lake', stateOrCountry: 'Ladakh', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Jun – Sep', avgDailyCostINR: 5200, rating: 4.9, highlight: 'High-altitude saline lake that changes shades of blue and turquoise', localTransportAvailable: ['Royal Enfield Rental', 'Ladakh Taxi Union 4x4', 'Tempo Traveller'], image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-13', name: 'Nubra Valley & Hunder Sand Dunes', stateOrCountry: 'Ladakh', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Jun – Sep', avgDailyCostINR: 5000, rating: 4.9, highlight: 'Double-humped Bactrian camel safaris across white cold-desert dunes', localTransportAvailable: ['Bike Rental', '4x4 Cab', 'Camel Safari'], image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-14', name: 'Khardung La Pass', stateOrCountry: 'Ladakh', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Jun – Sep', avgDailyCostINR: 4800, rating: 4.8, highlight: 'World legendary motorable pass at 17,982 ft altitude', localTransportAvailable: ['Royal Enfield', '4x4 Jeep', 'Bicycle Downhill'], image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-15', name: 'Thiksey & Hemis Monasteries', stateOrCountry: 'Ladakh', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'May – Oct', avgDailyCostINR: 3600, rating: 4.8, highlight: 'Majestic 12-storey Tibetan Buddhist gompa resembling Potala Palace', localTransportAvailable: ['Scooty Rental', 'Local Taxi', 'Bicycle'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // HIMACHAL PRADESH
  { id: 'in-16', name: 'Solang Valley & Rohtang Pass', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Apr – Jun & Dec – Feb', avgDailyCostINR: 4200, rating: 4.8, highlight: 'Paragliding, snow scooters, zorbing & Atal Tunnel crossing', localTransportAvailable: ['Scooty Rental', 'Bike Rental', 'Union Cab', 'Electric Bus'], image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-17', name: 'Old Manali Cafes & Hadimba Temple', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 3200, rating: 4.7, highlight: 'Hippie-chic riverfront cafes, trout cuisine & wooden pagoda temple', localTransportAvailable: ['Walking', 'Auto', 'Scooty Rental', 'Bicycle'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-18', name: 'Kasol & Tosh Village (Parvati Valley)', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Mar – Jun & Sep – Nov', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Backpacker haven, Israeli bakeries & scenic trekking trails', localTransportAvailable: ['Local Bus', 'Shared Cab', 'Trekking on Foot'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-19', name: 'Spiti Valley (Kaza, Key Monastery & Chandratal)', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Jun – Sep', avgDailyCostINR: 4500, rating: 4.9, highlight: 'Ancient cliffside monasteries, fossil villages & moon lake camping', localTransportAvailable: ['4x4 SUV', 'Royal Enfield', 'HRTC Bus'], image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-20', name: 'Dharamshala & McLeod Ganj', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Mar – Jun & Sep – Dec', avgDailyCostINR: 3400, rating: 4.8, highlight: 'Residence of His Holiness Dalai Lama, Tibetan crafts & Triund trek', localTransportAvailable: ['Auto', 'Scooty', 'Dharamshala Skyway Cable Car', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-21', name: 'Shimla Mall Road & Ridge', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'City & Culture', bestTimeToVisit: 'All year (Dec for snow)', avgDailyCostINR: 3800, rating: 4.7, highlight: 'Colonial heritage architecture, Christ Church & Jakhoo Hill ropeway', localTransportAvailable: ['Jakhoo Ropeway', 'Local Taxi', 'Walking on Mall'], image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-22', name: 'Bir Billing Paragliding Capital', stateOrCountry: 'Himachal Pradesh', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Oct – Nov & Mar – May', avgDailyCostINR: 4600, rating: 4.9, highlight: 'World second-highest paragliding site with 30-min tandem flights', localTransportAvailable: ['Scooty Rental', 'Shared Taxi to Takeoff', 'Bicycle'], image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },

  // UTTARAKHAND
  { id: 'in-23', name: 'Rishikesh Ganga Aarti & White Water Rafting', stateOrCountry: 'Uttarakhand', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Sep – Jun', avgDailyCostINR: 3000, rating: 4.9, highlight: 'Yoga capital of the world, Triveni Ghat Aarti & Grade IV river rafting', localTransportAvailable: ['Scooty Rental', 'Auto / E-Rickshaw', 'Rafting Vans', 'Bicycle'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-24', name: 'Nainital Naini Lake & Snow View Point', stateOrCountry: 'Uttarakhand', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Mar – Jun & Nov – Feb', avgDailyCostINR: 3600, rating: 4.7, highlight: 'Emerald eye-shaped lake boating, ropeway & Naina Devi temple', localTransportAvailable: ['Row Boats / Paddle Boats', 'Aerial Ropeway', 'Mall Road Auto'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-25', name: 'Kedarnath & Badrinath (Char Dham)', stateOrCountry: 'Uttarakhand', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'May – Jun & Sep – Oct', avgDailyCostINR: 4500, rating: 4.9, highlight: 'Ancient stone temple of Lord Shiva set against snow-clad peaks', localTransportAvailable: ['Helicopter from Guptkashi', 'Pony / Palki', '16km Trek on Foot'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-26', name: 'Auli Ski Resort & Bugyal Meadows', stateOrCountry: 'Uttarakhand', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Dec – Mar (Skiing) & May – Sep', avgDailyCostINR: 4800, rating: 4.9, highlight: 'Premier winter ski slopes and panoramic views of Nanda Devi peak', localTransportAvailable: ['Joshimath to Auli Cable Car', 'Ski Chairlift', 'Local 4x4'], image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-27', name: 'Jim Corbett National Park', stateOrCountry: 'Uttarakhand', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Nov – Jun', avgDailyCostINR: 4800, rating: 4.8, highlight: 'India’s oldest national park for Royal Bengal Tiger & wild elephant safaris', localTransportAvailable: ['Open-top 4x4 Gypsy Safari', 'Canter Safari'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-28', name: 'Valley of Flowers & Hemkund Sahib', stateOrCountry: 'Uttarakhand', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Jul – Sep', avgDailyCostINR: 3800, rating: 4.9, highlight: 'UNESCO alpine valley blanketed with 500+ species of rare wildflowers', localTransportAvailable: ['Trekking on Foot', 'Pony from Govindghat'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },

  // RAJASTHAN
  { id: 'in-29', name: 'Amber Fort & Hawa Mahal (Jaipur)', stateOrCountry: 'Rajasthan', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3600, rating: 4.9, highlight: 'Sheesh Mahal mirror palace, elephant ramparts & honeycomb facade', localTransportAvailable: ['Jaipur Metro', 'Auto / E-Rickshaw', 'App Cab (Ola/Uber)', 'Cycle Rickshaw'], image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-30', name: 'City Palace & Lake Pichola (Udaipur)', stateOrCountry: 'Rajasthan', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 4400, rating: 4.9, highlight: 'Venice of the East with royal lake palace boat cruises and courtyards', localTransportAvailable: ['Lake Boat Cruise', 'Auto', 'Scooty Rental', 'Walking'], image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-31', name: 'Mehrangarh Fort & Blue City (Jodhpur)', stateOrCountry: 'Rajasthan', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3800, rating: 4.9, highlight: 'Imposing fortress rising 400 ft above the indigo blue houses of the old town', localTransportAvailable: ['Auto', 'Flying Fox Zipline', 'App Cab', 'Walking'], image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-32', name: 'Jaisalmer Golden Fort & Sam Sand Dunes', stateOrCountry: 'Rajasthan', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 4200, rating: 4.9, highlight: 'Living yellow sandstone fort, desert camping, folk dances & camel safaris', localTransportAvailable: ['Camel Safari', '4x4 Dune Bashing Jeep', 'Auto'], image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-33', name: 'Pushkar Sacred Lake & Brahma Temple', stateOrCountry: 'Rajasthan', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2600, rating: 4.7, highlight: 'Sacred ghats, world rare Lord Brahma temple & annual Camel Fair', localTransportAvailable: ['Scooty Rental', 'Auto', 'Walking around Ghats'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-34', name: 'Ranthambore Tiger Reserve', stateOrCountry: 'Rajasthan', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Oct – Apr', avgDailyCostINR: 5200, rating: 4.8, highlight: 'Open forest tiger sightings against historic 10th-century fort ruins', localTransportAvailable: ['Forest Dept Gypsy 4x4', 'Canter Safari'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },

  // KERALA
  { id: 'in-35', name: 'Alleppey (Alappuzha) Houseboat Cruise', stateOrCountry: 'Kerala', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Sep – Mar', avgDailyCostINR: 5500, rating: 4.9, highlight: 'Private cedarwood Kettuvallam cruises through palm-fringed backwaters', localTransportAvailable: ['Houseboat', 'Govt Ferry (₹10)', 'Shikara Boat', 'Auto'], image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-36', name: 'Munnar Tea Plantations & Eravikulam', stateOrCountry: 'Kerala', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Sep – May', avgDailyCostINR: 3800, rating: 4.8, highlight: 'Rolling emerald tea hills, endangered Nilgiri Tahr & Anamudi peak', localTransportAvailable: ['Auto', 'Scooty Rental', 'Jeep Safari', 'Local Bus'], image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-37', name: 'Varkala Clifftop & Papanasam Beach', stateOrCountry: 'Kerala', region: 'India', category: 'Beach', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.9, highlight: 'Dramatic red sandstone cliffs towering directly over the Arabian Sea', localTransportAvailable: ['Scooty Rental', 'Auto', 'Cliff Walking Trail'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-38', name: 'Fort Kochi & Chinese Fishing Nets', stateOrCountry: 'Kerala', region: 'India', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 3400, rating: 4.8, highlight: 'Cantilevered fishing nets, colonial spice streets, Mattancherry & art biennale', localTransportAvailable: ['Kochi Water Metro', 'Auto', 'Bicycle Rental', 'App Cab'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-39', name: 'Wayanad Chembra Peak & Edakkal Caves', stateOrCountry: 'Kerala', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 3600, rating: 4.8, highlight: 'Heart-shaped lake trek, Neolithic rock petroglyphs & treehouses', localTransportAvailable: ['Jeep Rental', 'Auto', 'Local Bus'], image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-40', name: 'Periyar Tiger Reserve & Thekkady Spices', stateOrCountry: 'Kerala', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Sep – Apr', avgDailyCostINR: 4200, rating: 4.8, highlight: 'Lake boat safari for wild elephants, bamboo rafting & spice plantations', localTransportAvailable: ['Periyar Lake Safari Boat', 'Auto', 'Jeep'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },

  // KARNATAKA
  { id: 'in-41', name: 'Hampi UNESCO Ruins & Virupaksha Temple', stateOrCountry: 'Karnataka', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Vijayanagara empire boulder ruins, stone chariot & Tungabhadra coracle boats', localTransportAvailable: ['Coracle Round Boat', 'Bicycle Rental', 'Scooty', 'Auto'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-42', name: 'Mysuru (Mysore) Palace & Chamundi Hill', stateOrCountry: 'Karnataka', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.8, highlight: 'Indo-Saracenic royal palace illuminated by 100,000 golden bulbs', localTransportAvailable: ['Tongas (Horse Cart)', 'Auto', 'KSRTC City Bus', 'App Cab'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-43', name: 'Coorg (Madikeri) Coffee Plantations & Abbey Falls', stateOrCountry: 'Karnataka', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Oct – Apr', avgDailyCostINR: 3800, rating: 4.8, highlight: 'Scotland of India with aromatic Robusta coffee estates & Tibetan Golden Temple', localTransportAvailable: ['Auto', 'Scooty Rental', 'Local Taxi Jeep'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-44', name: 'Gokarna Om Beach & Kudle Beach', stateOrCountry: 'Karnataka', region: 'India', category: 'Beach', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2900, rating: 4.8, highlight: 'Sacred Mahabaleshwar temple, Om-shaped beach trekking & relaxed shacks', localTransportAvailable: ['Scooty Rental', 'Auto', 'Beach Trekking'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-45', name: 'Kabini River & Nagarhole Wildlife Safari', stateOrCountry: 'Karnataka', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 5800, rating: 4.9, highlight: 'Top leopard, black panther, tiger & Asiatic elephant sightings on river safari', localTransportAvailable: ['Jungle Lodges 4x4 Safari', 'Boat Safari'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-46', name: 'Bengaluru Tech & Garden City (Cubbon Park, Brewpubs)', stateOrCountry: 'Karnataka', region: 'India', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 3800, rating: 4.7, highlight: 'Microbrewery capital, Lalbagh glasshouse & buzzing tech nightlife', localTransportAvailable: ['Namma Metro Rail', 'Ola/Uber Cabs', 'Rapido Bike Taxi', 'Auto'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // TAMIL NADU
  { id: 'in-47', name: 'Meenakshi Amman Temple (Madurai)', stateOrCountry: 'Tamil Nadu', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Dravidian architectural wonder with 14 colorful towering gopurams', localTransportAvailable: ['Auto', 'Cycle Rickshaw', 'City Bus', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-48', name: 'Ooty (Udhagamandalam) & Nilgiri Mountain Railway', stateOrCountry: 'Tamil Nadu', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Oct – Jun', avgDailyCostINR: 3600, rating: 4.8, highlight: 'UNESCO toy train journey through blue mountains, botanical gardens & tea estates', localTransportAvailable: ['UNESCO Toy Train', 'Auto', 'Local Cab', 'Scooty'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-49', name: 'Rameswaram Temple & Dhanushkodi Ghost Town', stateOrCountry: 'Tamil Nadu', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Apr', avgDailyCostINR: 3200, rating: 4.9, highlight: 'Ramanathaswamy temple with longest corridor, Pamban bridge & Ram Setu', localTransportAvailable: ['Shared 4x4 Jeep to Dhanushkodi', 'Auto', 'Local Bus'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-50', name: 'Mahabalipuram Shore Temple & Pancha Rathas', stateOrCountry: 'Tamil Nadu', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 3100, rating: 4.8, highlight: '7th-century rock-cut monolithic temples by the roaring Bay of Bengal', localTransportAvailable: ['Bicycle Rental', 'Auto', 'Scooty Rental', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-51', name: 'Kodaikanal Lake & Pillar Rocks', stateOrCountry: 'Tamil Nadu', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Sep – May', avgDailyCostINR: 3400, rating: 4.7, highlight: 'Princess of Hill Stations, star-shaped lake cycling & Coaker’s Walk', localTransportAvailable: ['Bicycle on Lake', 'Auto', 'Local Taxi'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-52', name: 'Brihadeeswara Temple (Thanjavur Big Temple)', stateOrCountry: 'Tamil Nadu', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Nov – Mar', avgDailyCostINR: 2600, rating: 4.9, highlight: '1,000-year-old Chola engineering triumph with single 80-tonne granite capstone', localTransportAvailable: ['Auto', 'City Bus', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // ANDHRA PRADESH
  { id: 'in-53', name: 'Visakhapatnam (Rishikonda Beach & Kailasagiri)', stateOrCountry: 'Andhra Pradesh', region: 'India', category: 'Beach', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.8, highlight: 'Pristine coastal curves, INS Kurusura submarine museum & ropeway views', localTransportAvailable: ['Auto', 'App Cab (Ola/Uber)', 'Scooty Rental', 'City Bus'], image: 'https://images.unsplash.com/photo-1616489953149-8089408b0493?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-54', name: 'Araku Valley & Borra Caves', stateOrCountry: 'Andhra Pradesh', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3000, rating: 4.8, highlight: 'Vistadome scenic train through Eastern Ghats tunnels, coffee plantations & stalactites', localTransportAvailable: ['Vistadome Glass Train', 'Auto', 'Local Jeep', 'Trekking'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-55', name: 'Tirupati Venkateswara Temple (Tirumala)', stateOrCountry: 'Andhra Pradesh', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Sep – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Richest and most sacred pilgrimage temple of Lord Balaji on Seven Hills', localTransportAvailable: ['APSRTC Ghat Electric Bus', 'Prepaid Taxi', 'Footpath Alipiri Trek'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-56', name: 'Gandikota (Grand Canyon of India) & Belum Caves', stateOrCountry: 'Andhra Pradesh', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Oct – Feb', avgDailyCostINR: 2700, rating: 4.9, highlight: 'Pennar river gorge slicing through red quartzite cliffs & underground cave maze', localTransportAvailable: ['Local Taxi', 'Auto', 'Walking on Canyon Edge'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-57', name: 'Lepakshi Hanging Pillar & Nandi Bull', stateOrCountry: 'Andhra Pradesh', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2400, rating: 4.8, highlight: 'Architectural marvel of hanging stone pillar & monolithic granite Nandi', localTransportAvailable: ['Auto', 'Cab from Hindupur / Bengaluru'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // TELANGANA
  { id: 'in-58', name: 'Charminar & Laad Bazaar (Hyderabad)', stateOrCountry: 'Telangana', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3400, rating: 4.8, highlight: '1591 monument, pearl shopping, bangle alleys & iconic Irani Chai', localTransportAvailable: ['Hyderabad Metro Rail', 'Auto', 'App Cab', 'Rapido Bike'], image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-59', name: 'Golconda Fort & Acoustic Echo Dome', stateOrCountry: 'Telangana', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.8, highlight: 'Diamond fortress with sound system and evening light & sound show', localTransportAvailable: ['Auto', 'App Cab', 'City Bus'], image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-60', name: 'Ramoji Film City', stateOrCountry: 'Telangana', region: 'India', category: 'City & Culture', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 4200, rating: 4.8, highlight: 'Guinness Record world largest integrated film studio complex', localTransportAvailable: ['Ramoji Vintage AC Bus', 'App Cab from City'], image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-61', name: 'Ramappa Temple & Thousand Pillar Temple (Warangal)', stateOrCountry: 'Telangana', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 2600, rating: 4.8, highlight: 'UNESCO Kakatiya temple built with floating bricks and sandbox technology', localTransportAvailable: ['Auto', 'TSRTC Bus', 'Car Taxi'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // MAHARASHTRA
  { id: 'in-62', name: 'Gateway of India & Marine Drive (Mumbai)', stateOrCountry: 'Maharashtra', region: 'India', category: 'City & Culture', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 4500, rating: 4.9, highlight: 'Queen Necklace promenade, heritage Taj Mahal Palace & Elephanta ferries', localTransportAvailable: ['Mumbai Local Train', 'Black & Yellow Kaali Peeli Taxi', 'Mumbai Metro', 'BEST Bus'], image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-63', name: 'Ajanta & Ellora Caves (Chhatrapati Sambhajinagar)', stateOrCountry: 'Maharashtra', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3600, rating: 4.9, highlight: 'Monolithic Kailasa temple carved out of a single rock cliff & ancient Buddhist murals', localTransportAvailable: ['Green Eco Electric Bus to Caves', 'Auto', 'Local Taxi'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-64', name: 'Lonavala, Khandala & Tiger’s Leap', stateOrCountry: 'Maharashtra', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Jul – Sep (Monsoon) & Nov – Feb', avgDailyCostINR: 3600, rating: 4.7, highlight: 'Monsoon waterfalls, misty Western Ghats viewpoints & famous chikki sweet', localTransportAvailable: ['Auto', 'Scooty Rental', 'Private Cab'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-65', name: 'Mahabaleshwar & Panchgani Table Land', stateOrCountry: 'Maharashtra', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Oct – Jun', avgDailyCostINR: 3900, rating: 4.8, highlight: 'Strawberry farms, Arthur Seat cliff view, Mapro Garden & Venna Lake boating', localTransportAvailable: ['Auto', 'Horse Ride on Table Land', 'Local Cab'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-66', name: 'Shirdi Sai Baba Temple', stateOrCountry: 'Maharashtra', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'All year', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Universal spiritual hub of Saint Sai Baba visited by millions worldwide', localTransportAvailable: ['Free Sansthan Electric Bus', 'Auto', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-67', name: 'Tadoba Andhari Tiger Reserve', stateOrCountry: 'Maharashtra', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 5200, rating: 4.9, highlight: 'Jewel of Vidarbha with highest density tiger and sloth bear safaris', localTransportAvailable: ['Open Safari Gypsy 4x4'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },

  // GUJARAT
  { id: 'in-68', name: 'Statue of Unity (Kevadia)', stateOrCountry: 'Gujarat', region: 'India', category: 'City & Culture', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3800, rating: 4.9, highlight: 'World tallest statue (182m) with Narmada viewing gallery & laser show', localTransportAvailable: ['Pink E-Rickshaws (Women Driven)', 'AC Hop-on Hop-off Bus', 'Electric Cycles'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-69', name: 'Rann of Kutch (White Salt Desert & Rann Utsav)', stateOrCountry: 'Gujarat', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 4600, rating: 4.9, highlight: 'Vast shimmering white salt desert under full moon with luxury tent city', localTransportAvailable: ['Camel Cart', 'Golf Cart', '4x4 Cab'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-70', name: 'Gir National Park (Home of Asiatic Lions)', stateOrCountry: 'Gujarat', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Dec – Mar', avgDailyCostINR: 4800, rating: 4.9, highlight: 'Only natural habitat of wild pure Asiatic Lions on Earth', localTransportAvailable: ['Forest Dept Gypsy Safari'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-71', name: 'Somnath & Dwarkadhish Temples', stateOrCountry: 'Gujarat', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: 'First Jyotirlinga on Arabian sea shore and Lord Krishna sacred kingdom', localTransportAvailable: ['Auto', 'Chhakdo (Three-Wheeler Taxi)', 'Local Bus'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // DELHI NCR
  { id: 'in-72', name: 'Red Fort, Jama Masjid & Chandni Chowk', stateOrCountry: 'Delhi NCR', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.8, highlight: 'Mughal sandstone fortress, street food trail (Paranthe Wali Gali) & Asia largest spice market', localTransportAvailable: ['Delhi Metro Rail (Yellow Line)', 'Cycle Rickshaw', 'E-Rickshaw', 'App Cab'], image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-73', name: 'Qutub Minar & Mehrauli Archaeological Park', stateOrCountry: 'Delhi NCR', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3000, rating: 4.8, highlight: '73m minaret built in 1192 and rust-free 4th-century iron pillar', localTransportAvailable: ['Delhi Metro', 'Auto', 'App Cab (Ola/Uber)'], image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-74', name: 'India Gate, Kartavya Path & Rashtrapati Bhavan', stateOrCountry: 'Delhi NCR', region: 'India', category: 'City & Culture', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.8, highlight: 'National war memorial boulevard, President estate & Mughal gardens', localTransportAvailable: ['Electric Bicycle (Yulu)', 'Delhi Metro', 'E-Rickshaw'], image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-75', name: 'Akshardham Temple & Lotus Temple', stateOrCountry: 'Delhi NCR', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'All year', avgDailyCostINR: 2900, rating: 4.9, highlight: 'Intricate sandstone carvings, Sahaj Anand water show & Baháʼí flower dome', localTransportAvailable: ['Delhi Metro (Blue Line / Violet Line)', 'Auto', 'App Cab'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // UTTAR PRADESH
  { id: 'in-76', name: 'Taj Mahal & Agra Fort (Agra)', stateOrCountry: 'Uttar Pradesh', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3800, rating: 4.9, highlight: 'Wonders of the World white marble monument to love by Shah Jahan', localTransportAvailable: ['Pollution-Free Battery Auto', 'Agra Metro', 'Golf Cart', 'Tonga'], image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-77', name: 'Varanasi Ghats & Ganga Evening Aarti (Kashi)', stateOrCountry: 'Uttar Pradesh', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3000, rating: 4.9, highlight: 'Oldest living city on Earth, Dashashwamedh Ghat Aarti & sunrise boat rides', localTransportAvailable: ['Hand-Rowed Wooden Boat', 'E-Rickshaw', 'Cycle Rickshaw', 'Walking in Alleyways'], image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-78', name: 'Ayodhya Ram Janmabhoomi Mandir', stateOrCountry: 'Uttar Pradesh', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Grand pink sandstone Nagara-style temple on the banks of Saryu river', localTransportAvailable: ['E-Rickshaw', 'Ayodhya Electric Bus', 'Auto', 'Walking'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-79', name: 'Lucknow Bara Imambara & Rumi Darwaza', stateOrCountry: 'Uttar Pradesh', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3100, rating: 4.8, highlight: 'Gravity-defying arched labyrinth (Bhool Bhulaiya), Awadhi Biryani & Tunday Kababi', localTransportAvailable: ['Lucknow Metro', 'Auto', 'Cycle Rickshaw', 'App Cab'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-80', name: 'Mathura & Vrindavan (Prem Mandir & Banke Bihari)', stateOrCountry: 'Uttar Pradesh', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar (Holi in March)', avgDailyCostINR: 2600, rating: 4.9, highlight: 'Birthplace of Lord Krishna, Prem Mandir illumination & famous Lathmar Holi', localTransportAvailable: ['E-Rickshaw', 'Auto', 'Tempo'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // WEST BENGAL
  { id: 'in-81', name: 'Victoria Memorial & Howrah Bridge (Kolkata)', stateOrCountry: 'West Bengal', region: 'India', category: 'City & Culture', bestTimeToVisit: 'Oct – Mar (Durga Puja in Oct)', avgDailyCostINR: 3200, rating: 4.8, highlight: 'City of Joy, yellow ambassador cabs, street Puchka & tram lines', localTransportAvailable: ['Kolkata Tram', 'Kolkata Underwater Metro', 'Yellow Taxi', 'Ferry on Hooghly'], image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-82', name: 'Darjeeling Himalayan Railway & Tiger Hill Sunrise', stateOrCountry: 'West Bengal', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Mar – May & Oct – Dec', avgDailyCostINR: 3600, rating: 4.9, highlight: 'UNESCO Toy Train, Kanchenjunga sunrise panorama & world-famous Champagne of Teas', localTransportAvailable: ['DHR Toy Train', 'Local Taxi', 'Walking on Chowrasta'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-83', name: 'Sundarbans Mangrove Tiger Safari', stateOrCountry: 'West Bengal', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Nov – Mar', avgDailyCostINR: 4400, rating: 4.8, highlight: 'World largest tidal mangrove forest with swimming Royal Bengal Tigers', localTransportAvailable: ['Motorized Safari Boat', 'Village Cycle Rickshaw'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },

  // SIKKIM & NORTHEAST
  { id: 'in-84', name: 'Nathula Pass & Tsomgo Lake (Gangtok)', stateOrCountry: 'Sikkim', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Apr – Jun & Oct – Dec', avgDailyCostINR: 4200, rating: 4.9, highlight: 'Ancient Silk Route border pass at 14,140 ft and glacial sacred lake', localTransportAvailable: ['Registered Permit SUV (Innova/Bolero)', 'Yak Ride'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-85', name: 'Yumthang Valley of Flowers & Zero Point (Lachung)', stateOrCountry: 'Sikkim', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Apr – Jun (Flowers) & Dec – Mar (Snow)', avgDailyCostINR: 4600, rating: 4.9, highlight: 'Hot springs, rhododendron sanctuary and edge of Himalayan snowfields', localTransportAvailable: ['4x4 Mountain Cab', 'Shared Tour Jeep'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-86', name: 'Kaziranga National Park (One-Horned Rhinos)', stateOrCountry: 'Assam', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Nov – Apr', avgDailyCostINR: 4600, rating: 4.9, highlight: 'Home to two-thirds of the world Great One-Horned Rhinoceros population', localTransportAvailable: ['Elephant Safari', 'Open Gypsy Safari'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-87', name: 'Cherrapunji & Living Root Bridges (Nohkalikai Falls)', stateOrCountry: 'Meghalaya', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Sep – May', avgDailyCostINR: 3600, rating: 4.9, highlight: 'Bio-engineered double-decker living root bridges & India tallest plunge falls', localTransportAvailable: ['Shared Sumo / Bolero', 'Trekking Paths', 'Local Taxi'], image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-88', name: 'Dawki Umngot Crystal Clear River', stateOrCountry: 'Meghalaya', region: 'India', category: 'Waterfall & Lake', bestTimeToVisit: 'Nov – Apr', avgDailyCostINR: 3400, rating: 4.9, highlight: 'Glass-like transparent emerald river where boats appear floating in mid-air', localTransportAvailable: ['Country Wooden Boat', 'Local Taxi', 'Kayaking'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-89', name: 'Tawang Monastery & Sela Pass', stateOrCountry: 'Arunachal Pradesh', region: 'India', category: 'Mountain & Hill', bestTimeToVisit: 'Mar – Jun & Sep – Nov', avgDailyCostINR: 4800, rating: 4.9, highlight: 'India largest Buddhist monastery perched at 10,000 ft with snow lake pass', localTransportAvailable: ['4x4 Mountain Taxi (Tata Sumo / Scorpio)'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },

  // ANDAMAN & NICOBAR & ISLANDS
  { id: 'in-90', name: 'Radhanagar Beach (Havelock Island / Swaraj Dweep)', stateOrCountry: 'Andaman & Nicobar', region: 'India', category: 'Beach', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 4800, rating: 4.9, highlight: 'Rated Time Magazine Best Beach in Asia with turquoise waves & sunset', localTransportAvailable: ['Scooty Rental', 'Auto', 'Makruzz Luxury Ferry', 'Bicycle'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-91', name: 'Cellular Jail & Light & Sound Show (Port Blair)', stateOrCountry: 'Andaman & Nicobar', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 3600, rating: 4.8, highlight: 'Historic Kala Pani colonial penitentiary honoring India freedom fighters', localTransportAvailable: ['Auto', 'Cab', 'City Bus'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-92', name: 'Elephant Beach & Coral Reef Scuba Diving', stateOrCountry: 'Andaman & Nicobar', region: 'India', category: 'Adventure & Island', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 5200, rating: 4.9, highlight: 'PADI scuba diving, sea walk, underwater coral reefs & speed boating', localTransportAvailable: ['Speed Boat from Jetty', 'Forest Jungle Trek'], image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },

  // ODISHA, MADHYA PRADESH & PUNJAB
  { id: 'in-93', name: 'Konark Sun Temple & Puri Jagannath Temple', stateOrCountry: 'Odisha', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: '13th-century chariot temple with carved stone wheels & famous Rath Yatra', localTransportAvailable: ['Auto', 'App Cab', 'OTDC Tour Bus', 'Cycle Rickshaw'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-94', name: 'Khajuraho Group of Temples', stateOrCountry: 'Madhya Pradesh', region: 'India', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 3200, rating: 4.9, highlight: 'UNESCO masterpiece of Nagara-style architecture and erotic sculptures', localTransportAvailable: ['Bicycle Rental', 'Auto', 'E-Rickshaw'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-95', name: 'Kanha & Bandhavgarh Tiger Reserves', stateOrCountry: 'Madhya Pradesh', region: 'India', category: 'Wildlife & Nature', bestTimeToVisit: 'Oct – May', avgDailyCostINR: 5200, rating: 4.9, highlight: 'Inspiration for Rudyard Kipling Jungle Book with highest tiger density', localTransportAvailable: ['Open 4x4 Gypsy Forest Safari'], image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80' },
  { id: 'in-96', name: 'Golden Temple (Harmandir Sahib) & Wagah Border (Amritsar)', stateOrCountry: 'Punjab', region: 'India', category: 'Temple & Spiritual', bestTimeToVisit: 'Oct – Mar', avgDailyCostINR: 2800, rating: 4.9, highlight: 'Gilded sanctum serving 100,000 free langar meals daily & patriotic border ceremony', localTransportAvailable: ['Free Temple Bus', 'Auto', 'E-Rickshaw', 'Hop-on Hop-off Bus'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' }
];

// ==========================================
// 250+ FAMOUS PLACES WORLDWIDE (ALL CONTINENTS)
// ==========================================
export const FAMOUS_WORLD_PLACES_250: DetailedPlace[] = [
  // FRANCE
  { id: 'wd-1', name: 'Eiffel Tower & Champ de Mars', stateOrCountry: 'France (Paris)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'Apr – Jun & Sep – Nov', avgDailyCostINR: 19500, rating: 4.9, highlight: 'Iconic wrought-iron lattice monument with 360° summit views over Paris', localTransportAvailable: ['Paris Metro (Line 6/9)', 'RER C', 'Velib City Bike', 'Uber'], image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-2', name: 'Louvre Museum & Glass Pyramid', stateOrCountry: 'France (Paris)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 19000, rating: 4.9, highlight: 'World largest art museum housing the Mona Lisa and Venus de Milo', localTransportAvailable: ['Palais Royal Metro', 'Batobus River Shuttle', 'Walking'], image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-3', name: 'Mont Saint-Michel Tidal Abbey', stateOrCountry: 'France (Normandy)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'May – Sep', avgDailyCostINR: 17500, rating: 4.9, highlight: 'Fairy-tale medieval abbey rising out of dramatic ocean tides', localTransportAvailable: ['Free Shuttle Bus (Passeur)', 'Horse-drawn Maringote', 'Walking across Bridge'], image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-4', name: 'French Riviera & Promenade des Anglais (Nice)', stateOrCountry: 'France (Nice)', region: 'World', category: 'Beach', bestTimeToVisit: 'May – Oct', avgDailyCostINR: 18500, rating: 4.8, highlight: 'Turquoise Mediterranean shores, palm-lined avenues & yacht harbors', localTransportAvailable: ['Nice Tramway (Lignes d’Azur)', 'E-Scooter', 'TER Regional Train'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },

  // JAPAN
  { id: 'wd-5', name: 'Shibuya Crossing & Hachiko Statue', stateOrCountry: 'Japan (Tokyo)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'Mar – May & Sep – Nov', avgDailyCostINR: 17000, rating: 4.9, highlight: 'World busiest pedestrian scramble with neon skyscrapers and anime hubs', localTransportAvailable: ['Tokyo Metro', 'JR Yamanote Line', 'Suica Card Transit', 'Taxi'], image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-6', name: 'Fushimi Inari Taisha (10,000 Torii Gates)', stateOrCountry: 'Japan (Kyoto)', region: 'World', category: 'Temple & Spiritual', bestTimeToVisit: 'All year', avgDailyCostINR: 16000, rating: 4.9, highlight: 'Mesmerizing path of vermilion Shinto shrines climbing sacred Mount Inari', localTransportAvailable: ['JR Nara Line (Inari Station)', 'Keihan Line', 'Bicycle'], image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-7', name: 'Mount Fuji & Lake Kawaguchiko', stateOrCountry: 'Japan', region: 'World', category: 'Mountain & Hill', bestTimeToVisit: 'Jul – Sep (Climbing) & Nov – Feb (Snow Views)', avgDailyCostINR: 18000, rating: 4.9, highlight: 'Iconic symmetrical snow-capped volcanic cone reflecting in mirror lakes', localTransportAvailable: ['Fuji Excursion Express Train', 'Retro Sightseeing Bus', 'Bicycle'], image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-8', name: 'Dotonbori Neon Food Street (Osaka)', stateOrCountry: 'Japan (Osaka)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 15500, rating: 4.8, highlight: 'Famous Glico Running Man sign, Takoyaki octopus balls & Okonomiyaki', localTransportAvailable: ['Osaka Metro (Midosuji Line)', 'Dotonbori River Cruise', 'Walking'], image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },

  // SWITZERLAND
  { id: 'wd-9', name: 'Jungfraujoch (Top of Europe)', stateOrCountry: 'Switzerland (Interlaken)', region: 'World', category: 'Mountain & Hill', bestTimeToVisit: 'All year', avgDailyCostINR: 24000, rating: 4.9, highlight: 'Europe highest railway station at 3,454m, Aletsch glacier & Ice Palace', localTransportAvailable: ['Eiger Express Tricable Gondola', 'Jungfrau Cogwheel Railway'], image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-10', name: 'Matterhorn & Zermatt Alpine Village', stateOrCountry: 'Switzerland (Zermatt)', region: 'World', category: 'Mountain & Hill', bestTimeToVisit: 'Jun – Sep & Dec – Apr', avgDailyCostINR: 26000, rating: 4.9, highlight: 'Car-free mountain resort beneath the pyramid peak of Toblerone fame', localTransportAvailable: ['Gornergrat Cogwheel Train', 'Matterhorn Glacier Cable Car', 'Electric E-Taxi'], image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-11', name: 'Lake Lucerne & Chapel Bridge (Kapellbrücke)', stateOrCountry: 'Switzerland (Lucerne)', region: 'World', category: 'Waterfall & Lake', bestTimeToVisit: 'May – Oct', avgDailyCostINR: 22000, rating: 4.8, highlight: '14th-century covered wooden bridge, Mount Pilatus dragon ride & paddle steamers', localTransportAvailable: ['Historic Steamboat Ferry', 'Pilatus Cogwheel Railway', 'Swiss Pass Trains'], image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },

  // UNITED ARAB EMIRATES
  { id: 'wd-12', name: 'Burj Khalifa & Dubai Mall Fountains', stateOrCountry: 'UAE (Dubai)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'Nov – Mar', avgDailyCostINR: 16500, rating: 4.9, highlight: 'World tallest building (828m), choreographed musical fountains & luxury aquarium', localTransportAvailable: ['Dubai Metro (Red Line)', 'Careem Taxi / Uber', 'Dubai Trolley'], image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-13', name: 'Sheikh Zayed Grand Mosque (Abu Dhabi)', stateOrCountry: 'UAE (Abu Dhabi)', region: 'World', category: 'Temple & Spiritual', bestTimeToVisit: 'Nov – Mar', avgDailyCostINR: 15500, rating: 4.9, highlight: '82 pure white marble domes, 24-carat gold chandeliers & hand-knotted carpet', localTransportAvailable: ['Abu Dhabi Public Bus', 'Careem App Taxi', 'Tour Coach'], image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-14', name: 'Palm Jumeirah & Atlantis Aquaventure', stateOrCountry: 'UAE (Dubai)', region: 'World', category: 'Adventure & Island', bestTimeToVisit: 'Nov – Apr', avgDailyCostINR: 18000, rating: 4.8, highlight: 'Man-made palm tree island, record-breaking waterpark slides & beachfront dining', localTransportAvailable: ['Palm Monorail', 'Dubai Tram', 'Careem Taxi', 'Yacht Charter'], image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' },

  // ITALY
  { id: 'wd-15', name: 'Colosseum & Roman Forum (Rome)', stateOrCountry: 'Italy (Rome)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'Apr – Jun & Sep – Oct', avgDailyCostINR: 18000, rating: 4.9, highlight: '2,000-year-old gladiatorial amphitheater and heart of ancient Roman empire', localTransportAvailable: ['Rome Metro (Colosseo Station)', 'ATAC City Bus', 'Lime E-Scooter', 'Walking'], image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-16', name: 'Grand Canal & St. Mark’s Basilica (Venice)', stateOrCountry: 'Italy (Venice)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'Apr – Jun & Sep – Nov', avgDailyCostINR: 19500, rating: 4.9, highlight: 'Gondola serenades along car-free waterways and Byzantine gilded domes', localTransportAvailable: ['Vaporetto Water Bus (Line 1/2)', 'Traditional Gondola', 'Water Taxi'], image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-17', name: 'Amalfi Coast & Positano Clifftop', stateOrCountry: 'Italy (Amalfi)', region: 'World', category: 'Beach', bestTimeToVisit: 'May – Sep', avgDailyCostINR: 21000, rating: 4.9, highlight: 'Pastel cliffside villas tumbling into cobalt Mediterranean waters', localTransportAvailable: ['SITA Cliff Bus', 'Amalfi Ferry / Hydrofoil', 'Vespa Scooter Rental'], image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-18', name: 'Duomo di Firenze & Uffizi Gallery (Florence)', stateOrCountry: 'Italy (Florence)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 17500, rating: 4.9, highlight: 'Brunelleschi terracotta dome and Michelangelo & Botticelli Renaissance art', localTransportAvailable: ['Florence Tramway', 'Bicycle', 'Historic Center Walking'], image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=600&q=80' },

  // UNITED KINGDOM
  { id: 'wd-19', name: 'Big Ben, Westminster Abbey & London Eye', stateOrCountry: 'UK (London)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'May – Sep', avgDailyCostINR: 21000, rating: 4.9, highlight: 'Royal clock tower, British parliament & panoramic giant observation wheel', localTransportAvailable: ['London Underground (The Tube)', 'Red Double-Decker Bus', 'Uber Boat by Thames Clippers', 'Santander Cycle'], image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-20', name: 'Edinburgh Castle & Royal Mile (Scotland)', stateOrCountry: 'UK (Edinburgh)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'May – Sep (Aug for Fringe Festival)', avgDailyCostINR: 19500, rating: 4.9, highlight: 'Extinct volcanic rock fortress guarding Scottish crown jewels and bagpipers', localTransportAvailable: ['Edinburgh Trams', 'Lothian City Bus', 'Cobblestone Walking'], image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-21', name: 'Stonehenge & Roman Baths (Bath)', stateOrCountry: 'UK (Wiltshire/Bath)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 17500, rating: 4.8, highlight: '5,000-year-old mysterious megalithic stone circle & thermal Roman spas', localTransportAvailable: ['Stonehenge Tour Bus', 'Great Western Railway'], image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' },

  // THAILAND
  { id: 'wd-22', name: 'Grand Palace & Wat Arun (Temple of Dawn)', stateOrCountry: 'Thailand (Bangkok)', region: 'World', category: 'Temple & Spiritual', bestTimeToVisit: 'Nov – Mar', avgDailyCostINR: 5500, rating: 4.8, highlight: 'Gilded spires of Emerald Buddha and ceramic mosaic prang on Chao Phraya', localTransportAvailable: ['Chao Phraya Express River Boat', 'BTS Skytrain', 'Tuk-Tuk', 'Grab Bike'], image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-23', name: 'Phi Phi Islands & Maya Bay', stateOrCountry: 'Thailand (Phuket/Krabi)', region: 'World', category: 'Beach', bestTimeToVisit: 'Nov – Apr', avgDailyCostINR: 6500, rating: 4.9, highlight: 'Towering limestone cliffs circling crystal emerald lagoons & scuba reefs', localTransportAvailable: ['Speedboat Day Tour', 'Long-Tail Wooden Boat', 'Walking on Koh Phi Phi Don'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-24', name: 'Chiang Mai Old City & Elephant Nature Park', stateOrCountry: 'Thailand (Chiang Mai)', region: 'World', category: 'Wildlife & Nature', bestTimeToVisit: 'Nov – Feb', avgDailyCostINR: 4800, rating: 4.9, highlight: 'Ethical elephant rescue sanctuary, ancient moated temples & night bazaar', localTransportAvailable: ['Red Songthaew Truck Taxi', 'Scooty Rental', 'Tuk-Tuk'], image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80' },

  // INDONESIA (BALI)
  { id: 'wd-25', name: 'Tegallalang Rice Terraces & Sacred Monkey Forest (Ubud)', stateOrCountry: 'Indonesia (Bali)', region: 'World', category: 'Mountain & Hill', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 6200, rating: 4.9, highlight: 'Cascading emerald green rice terraces, jungle swings & free-roaming macaques', localTransportAvailable: ['Scooty Rental (Nmax/Scoopy)', 'Gojek / Grab Driver', 'Private Chauffeur Car'], image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-26', name: 'Uluwatu Clifftop Temple & Kecak Fire Dance', stateOrCountry: 'Indonesia (Bali)', region: 'World', category: 'Temple & Spiritual', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 6800, rating: 4.9, highlight: 'Ocean cliff sunset temple with traditional trance chant fire performance', localTransportAvailable: ['Scooty Rental', 'Private Car with Driver', 'Grab'], image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-27', name: 'Nusa Penida Kelingking T-Rex Beach', stateOrCountry: 'Indonesia (Bali)', region: 'World', category: 'Adventure & Island', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 6400, rating: 4.9, highlight: 'Iconic T-Rex shaped cliff plunging into azure waters & manta ray snorkeling', localTransportAvailable: ['Fast Speedboat from Sanur', 'Scooty on Island', 'Island 4x4 Tour'], image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },

  // SINGAPORE
  { id: 'wd-28', name: 'Gardens by the Bay & Supertree Grove', stateOrCountry: 'Singapore', region: 'World', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 15500, rating: 4.9, highlight: 'Avatar-like giant vertical gardens, Cloud Forest waterfall dome & light show', localTransportAvailable: ['Singapore MRT (Bayfront Station)', 'Grab App', 'Double Decker Bus', 'Anywheel Bicycle'], image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-29', name: 'Marina Bay Sands Skypark & Infinity Pool', stateOrCountry: 'Singapore', region: 'World', category: 'City & Culture', bestTimeToVisit: 'All year', avgDailyCostINR: 18000, rating: 4.9, highlight: '57-storey surfboard rooftop with world largest elevated infinity pool', localTransportAvailable: ['Singapore MRT', 'Grab', 'Scenic River Taxi'], image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-30', name: 'Sentosa Island & Universal Studios', stateOrCountry: 'Singapore', region: 'World', category: 'Adventure & Island', bestTimeToVisit: 'All year', avgDailyCostINR: 16500, rating: 4.8, highlight: 'Theme park rollercoasters, S.E.A. Aquarium, cable car & Siloso beach clubs', localTransportAvailable: ['Sentosa Express Monorail', 'Singapore Cable Car', 'Sentosa Beach Shuttle'], image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80' },

  // UNITED STATES
  { id: 'wd-31', name: 'Times Square, Central Park & Statue of Liberty (NYC)', stateOrCountry: 'USA (New York)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'Apr – Jun & Sep – Nov', avgDailyCostINR: 23000, rating: 4.9, highlight: 'Manhattan skyline, Broadway musicals, Central Park bike rides & harbor ferry', localTransportAvailable: ['NYC Subway (MTA Tap-to-Pay)', 'Yellow Cab', 'CitiBike', 'Staten Island Ferry'], image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-32', name: 'Grand Canyon South Rim & Skywalk', stateOrCountry: 'USA (Arizona)', region: 'World', category: 'Mountain & Hill', bestTimeToVisit: 'Mar – May & Sep – Nov', avgDailyCostINR: 21000, rating: 4.9, highlight: 'Vast 1-mile deep gorge carved by the Colorado River across billions of years', localTransportAvailable: ['Free National Park Shuttle Bus', 'Helicopter Tour', 'Rental Car'], image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-33', name: 'Golden Gate Bridge & Alcatraz Island (San Francisco)', stateOrCountry: 'USA (California)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'Sep – Nov & Apr – May', avgDailyCostINR: 22000, rating: 4.8, highlight: 'Art-deco international orange suspension bridge & infamous island prison', localTransportAvailable: ['Historic Cable Car', 'BART / Muni Metro', 'Bay Ferry to Alcatraz', 'Bay Wheels Bike'], image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80' },

  // AUSTRALIA
  { id: 'wd-34', name: 'Sydney Opera House & Harbour Bridge', stateOrCountry: 'Australia (Sydney)', region: 'World', category: 'City & Culture', bestTimeToVisit: 'Sep – Nov & Mar – May', avgDailyCostINR: 20000, rating: 4.9, highlight: 'Sail-shaped performing arts icon overlooking world finest natural harbor', localTransportAvailable: ['Sydney Harbour Ferry', 'Sydney Trains / Light Rail (Opal/Credit Card)', 'Uber'], image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-35', name: 'Great Barrier Reef (Cairns & Whitsundays)', stateOrCountry: 'Australia (Queensland)', region: 'World', category: 'Adventure & Island', bestTimeToVisit: 'Jun – Oct', avgDailyCostINR: 22500, rating: 4.9, highlight: 'World largest living coral reef system visible from outer space', localTransportAvailable: ['High-Speed Catamaran', 'Scenic Seaplane', 'Scuba Dive Boat'], image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },

  // GREECE & TURKEY
  { id: 'wd-36', name: 'Santorini Oia Caldera & Blue Domes', stateOrCountry: 'Greece (Santorini)', region: 'World', category: 'Beach', bestTimeToVisit: 'Apr – Oct', avgDailyCostINR: 18500, rating: 4.9, highlight: 'Whitewashed cliffside cubist villages overlooking sunken volcanic crater sunset', localTransportAvailable: ['KTEL Island Public Bus', 'ATV / Quad Bike Rental', 'Caldera Boat Tour'], image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-37', name: 'Cappadocia Hot Air Balloons & Fairy Chimneys', stateOrCountry: 'Turkey (Cappadocia)', region: 'World', category: 'Mountain & Hill', bestTimeToVisit: 'Apr – Jun & Sep – Oct', avgDailyCostINR: 12500, rating: 4.9, highlight: '100+ sunrise hot air balloons floating over volcanic tufa stone valleys and cave suites', localTransportAvailable: ['Hot Air Balloon Flight', 'ATV Safari', 'Local Dolmuş Minibus'], image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80' },
  { id: 'wd-38', name: 'Hagia Sophia & Grand Bazaar (Istanbul)', stateOrCountry: 'Turkey (Istanbul)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'Apr – May & Sep – Nov', avgDailyCostINR: 12000, rating: 4.9, highlight: '1,500-year-old Byzantine dome cathedral-mosque and 4,000 spice stalls', localTransportAvailable: ['Istanbul T1 Tramway', 'Bosphorus Ferry', 'Metro', 'Yellow Taxi'], image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80' },

  // EGYPT
  { id: 'wd-39', name: 'Great Pyramids of Giza & Sphinx', stateOrCountry: 'Egypt (Cairo)', region: 'World', category: 'Heritage & Fort', bestTimeToVisit: 'Oct – Apr', avgDailyCostINR: 8500, rating: 4.9, highlight: 'Only surviving Ancient Wonder of the World built over 4,500 years ago', localTransportAvailable: ['Camel / Horse Carriage', 'Uber Cairo', 'Air-conditioned Tour Coach'], image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80' }
];
