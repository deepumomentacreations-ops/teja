import {
  TripPlan,
  TravelStyle,
  TravelInterest,
  TravellersCount,
  BudgetBreakdown,
  TransportOption,
  AccommodationOption,
  RestaurantOption,
  AttractionOption,
  ActivityOption,
  DayItinerary,
  LocalTransportOption,
  WeatherForecast,
  VisaDocumentInfo,
  EmergencyInfo,
  CultureGuide,
  ChecklistItem,
  FlightTrackingRecord,
  ReservationItem,
  CurrencyCode
} from '../types/travel';
import { POPULAR_DESTINATIONS, CURRENCY_RATES } from '../data/destinationsData';

export interface PlanTripRequest {
  startingLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  travellers: TravellersCount;
  budgetAmount: number;
  currency: CurrencyCode;
  travelStyles: TravelStyle[];
  interests: TravelInterest[];
  specialPreferences?: string;
}

// Generate realistic simulated data when API is offline or as baseline
export function generateSyntheticTripPlan(params: PlanTripRequest): TripPlan {
  const start = new Date(params.startDate);
  const end = new Date(params.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const calculatedDays = Math.max(2, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 5);
  
  const isInternational = isLocationInternational(params.destination);
  const destinationName = cleanDestinationName(params.destination);
  const startingCity = cleanDestinationName(params.startingLocation);

  // Budget calculations
  const totalTravellers = params.travellers.adults + params.travellers.children + params.travellers.infants;
  const userBudgetINR = params.budgetAmount * (CURRENCY_RATES[params.currency]?.rateToINR || 1);
  
  const isLuxury = params.travelStyles.includes('Luxury') || params.travelStyles.includes('Honeymoon');
  const isBackpacker = params.travelStyles.includes('Backpacker') || params.travelStyles.includes('Solo');
  
  let baseHotelPerNight = isInternational ? (isLuxury ? 22000 : isBackpacker ? 3200 : 9500) : (isLuxury ? 11000 : isBackpacker ? 1100 : 3800);
  let baseTransportPerPerson = isInternational ? (isLuxury ? 65000 : 32000) : (isLuxury ? 9500 : isBackpacker ? 1800 : 5500);
  let baseFoodPerDayPerPerson = isInternational ? 3500 : (isLuxury ? 2500 : isBackpacker ? 600 : 1200);
  let baseLocalTransportPerDay = isInternational ? 2500 : (isLuxury ? 2200 : 800);
  let baseActivitiesPerPerson = isInternational ? 12000 : (isLuxury ? 6500 : 2500);

  const totalTransport = baseTransportPerPerson * Math.max(1, params.travellers.adults + params.travellers.children * 0.7);
  const totalHotel = baseHotelPerNight * (calculatedDays - 1) * Math.ceil(totalTravellers / 2);
  const totalFood = baseFoodPerDayPerPerson * calculatedDays * totalTravellers;
  const totalLocalTransport = baseLocalTransportPerDay * calculatedDays;
  const totalActivities = baseActivitiesPerPerson * totalTravellers;
  const shopping = isLuxury ? 15000 : 5000;
  const emergencyReserve = Math.round((totalTransport + totalHotel + totalFood) * 0.08);

  const estimatedTotal = Math.round(totalTransport + totalHotel + totalFood + totalLocalTransport + totalActivities + shopping + emergencyReserve);

  const budget: BudgetBreakdown = {
    transportation: Math.round(totalTransport),
    accommodation: Math.round(totalHotel),
    food: Math.round(totalFood),
    localTransport: Math.round(totalLocalTransport),
    activities: Math.round(totalActivities),
    shopping,
    emergencyReserve,
    totalEstimated: estimatedTotal,
    userBudget: Math.round(userBudgetINR),
    currency: params.currency,
  };

  // Transports
  const transportOptions: TransportOption[] = [
    {
      id: 'trans-1',
      type: 'Flight',
      provider: isInternational ? 'Emirates / Air France / Singapore Airlines' : 'IndiGo / Air India Express',
      route: `${startingCity} → ${destinationName}`,
      duration: isInternational ? '7h 45m' : '2h 25m',
      distanceKm: isInternational ? 4800 : 1350,
      estimatedCost: Math.round(baseTransportPerPerson * (params.travellers.adults + params.travellers.children * 0.8)),
      transfers: isInternational ? 1 : 0,
      comfortRating: 4.8,
      departureTime: '08:45 AM',
      arrivalTime: '11:10 AM',
      isRecommended: true,
      pros: ['Fastest transit time', 'Included baggage allowance', 'On-time guarantee'],
      cons: ['Peak morning slot'],
      flightNumber: isInternational ? 'EK-542' : '6E-428',
      liveStatus: 'On Time'
    },
    {
      id: 'trans-2',
      type: isInternational ? 'Flight' : 'Train',
      provider: isInternational ? 'AirAsia / FlyDubai (Budget Red-Eye)' : 'Indian Railways (Vande Bharat / Rajdhani Express)',
      route: `${startingCity} → ${destinationName}`,
      duration: isInternational ? '9h 15m' : '14h 30m',
      distanceKm: isInternational ? 4800 : 1200,
      estimatedCost: Math.round(baseTransportPerPerson * 0.45 * (params.travellers.adults + params.travellers.children * 0.8)),
      transfers: 0,
      comfortRating: 4.3,
      departureTime: '06:15 PM',
      arrivalTime: '08:45 AM +1',
      pros: ['Substantial budget savings', 'High luggage allowance', 'Overnight sleeper option'],
      cons: ['Longer journey duration'],
      liveStatus: 'Scheduled'
    },
    {
      id: 'trans-3',
      type: 'Car / Taxi',
      provider: 'TravelMate Outstation Chauffeur & Private Cab',
      route: `${startingCity} → ${destinationName} (Scenic Highway)`,
      duration: '16h 00m',
      distanceKm: 980,
      estimatedCost: Math.round(baseTransportPerPerson * 0.75 * totalTravellers),
      transfers: 0,
      comfortRating: 4.5,
      departureTime: 'Flexible (Recommended 05:00 AM)',
      arrivalTime: '09:00 PM',
      pros: ['Door-to-door convenience', 'Scenic road trip stops', 'Private AC vehicle'],
      cons: ['Highway toll charges'],
      liveStatus: 'Scheduled'
    }
  ];

  // Comprehensive Accommodations (Hostels, Budget Pods, Boutique & Luxury Resorts)
  const accommodations: AccommodationOption[] = [
    {
      id: 'hotel-hostel-1',
      name: `${destinationName} Social Backpacker Hostel & Cowork`,
      type: 'Hostel',
      tier: 'Budget',
      rating: 4.8,
      reviewsCount: 3840,
      pricePerNight: Math.round(baseHotelPerNight * 0.35),
      totalCost: Math.round(baseHotelPerNight * 0.35 * (calculatedDays - 1)),
      address: `Artisan Hub / Backpacker Row, ${destinationName}`,
      distanceToCenter: '0.4 km from central square & transit',
      coordinates: { lat: 15.2850, lng: 74.1100 },
      amenities: ['High-Speed Wi-Fi', 'AC Bunk Pods & Private Ensuites', 'Rooftop Cafe & Bar', 'Community Kitchen', 'Social Game Nights', 'Laundry & Lockers'],
      images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      ],
      roomType: 'Deluxe AC Bunk Pod / Private Ensuite Room',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
      bookingProvider: 'HostelWorld / TravelMate Hostels',
      badge: 'Best Backpacker Choice',
      checkIn: '01:00 PM',
      checkOut: '11:00 AM',
      isCoupleFriendly: true,
      isFamilyFriendly: false
    },
    {
      id: 'hotel-hostel-2',
      name: `Zostel / The Hosteller ${destinationName} Experience`,
      type: 'Hostel',
      tier: 'Budget',
      rating: 4.75,
      reviewsCount: 2900,
      pricePerNight: Math.round(baseHotelPerNight * 0.4),
      totalCost: Math.round(baseHotelPerNight * 0.4 * (calculatedDays - 1)),
      address: `Near Old Town & Sunset Point, ${destinationName}`,
      distanceToCenter: '0.9 km from beach/landmarks',
      coordinates: { lat: 15.2920, lng: 74.1180 },
      amenities: ['Swimming Pool', 'Co-working Desks', 'Evening Acoustic Jams', 'Bicycle / Scooty Rentals', 'Tour Desk', 'Cafe on site'],
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      ],
      roomType: 'Superior 4-Bed Dorm or Private Balcony Room',
      cancellationPolicy: 'Free cancellation up to 48 hours prior',
      bookingProvider: 'Zostel Direct Partner',
      badge: 'Top Rated Community Stay',
      checkIn: '02:00 PM',
      checkOut: '10:00 AM',
      isCoupleFriendly: true,
      isFamilyFriendly: false
    },
    {
      id: 'hotel-standard',
      name: `${destinationName} Boutique Heritage Inn & Suites`,
      type: 'Hotel',
      tier: 'Standard',
      rating: 4.7,
      reviewsCount: 1650,
      pricePerNight: Math.round(baseHotelPerNight * 0.85),
      totalCost: Math.round(baseHotelPerNight * 0.85 * (calculatedDays - 1)),
      address: `Civil Lines / Central Boulevard, ${destinationName}`,
      distanceToCenter: '1.1 km from landmark promenade',
      coordinates: { lat: 15.3000, lng: 74.1200 },
      amenities: ['Complimentary Breakfast Buffet', 'Free Wi-Fi', '24/7 Room Service', 'Airport Shuttle', 'Fitness Gym'],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      ],
      roomType: 'Executive King Room with City View',
      cancellationPolicy: 'Free cancellation up to 48 hours before arrival',
      bookingProvider: 'Booking.com Partner',
      badge: 'Best Value for Families',
      checkIn: '02:00 PM',
      checkOut: '11:00 AM',
      isCoupleFriendly: true,
      isFamilyFriendly: true
    },
    {
      id: 'hotel-luxury',
      name: `${destinationName} Grand Royal Palace Resort & Spa`,
      type: 'Resort',
      tier: 'Luxury',
      rating: 4.92,
      reviewsCount: 2150,
      pricePerNight: Math.round(baseHotelPerNight * 1.8),
      totalCost: Math.round(baseHotelPerNight * 1.8 * (calculatedDays - 1)),
      address: `Exclusive Coastline / Clifftop Estate, ${destinationName}`,
      distanceToCenter: '2.5 km from central hub',
      coordinates: { lat: 15.3200, lng: 74.1350 },
      amenities: ['Private Beach Access / Infinity Pool', 'Ayurvedic Spa & Wellness', 'Fine Dining Multi-Cuisine Restaurants', 'Butler Service', 'Helipad / Chauffeur Service'],
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
      ],
      roomType: 'Signature Presidential Suite with Ocean/Mountain Panorama',
      cancellationPolicy: 'Free cancellation up to 7 days before check-in',
      bookingProvider: 'Luxury Escapes Partner',
      badge: '5-Star Luxury Choice',
      checkIn: '03:00 PM',
      checkOut: '12:00 PM',
      isCoupleFriendly: true,
      isFamilyFriendly: true
    }
  ];

  // Comprehensive Restaurants & Dining (Local Flavors, Pure Veg/Jain, Halal, Street Food, Cafes, Fine Dining)
  const restaurants: RestaurantOption[] = [
    {
      id: 'rest-local-1',
      name: `Fisherman’s Wharf & Coastal Spice Kitchen`,
      cuisine: ['Authentic Coastal Seafood', 'Regional Delicacies', 'Tandoori'],
      rating: 4.85,
      priceRange: '₹₹₹',
      costPerPerson: isInternational ? 2800 : 950,
      address: `Riverside Promenade, ${destinationName}`,
      distance: '1.2 km from central hub',
      coordinates: { lat: 15.3050, lng: 74.1280 },
      popularDishes: ['Butter Garlic Prawns / Crab', 'Local Spiced Fish Curry with Rice', 'Signature Bebinca / Phirni'],
      dietaryTags: ['Non-Veg', 'Halal', 'Gluten-Free'],
      openingHours: '12:00 PM – 11:30 PM',
      atmosphere: 'Open-air riverside dining with live acoustic music and warm fairy lights',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      reservationAvailable: true
    },
    {
      id: 'rest-veg-2',
      name: `Green Leaf Pure Vegetarian & Jain Gourmet`,
      cuisine: ['Pure Vegetarian', 'Jain Specialty', 'South Indian Flavors', 'North Indian Thali'],
      rating: 4.8,
      priceRange: '₹₹',
      costPerPerson: isInternational ? 1800 : 450,
      address: `Temple Road / Heritage Market, ${destinationName}`,
      distance: '0.6 km from stay',
      coordinates: { lat: 15.2950, lng: 74.1150 },
      popularDishes: ['Deluxe Jain Maharaja Thali', 'Crispy Ghee Podi Dosa', 'Paneer Tikka Butter Masala', 'Mango Kulfi'],
      dietaryTags: ['Vegetarian', 'Jain', 'Vegan'],
      openingHours: '07:30 AM – 10:30 PM',
      atmosphere: 'Immaculately clean, family-friendly air-conditioned restaurant with traditional serveware',
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80',
      reservationAvailable: true
    },
    {
      id: 'rest-street-3',
      name: `Old Town Street Food Lane & Night Bazaar Eats`,
      cuisine: ['Street Food', 'Local Snacks', 'Chai & Desserts', 'Quick Bites'],
      rating: 4.75,
      priceRange: '₹',
      costPerPerson: isInternational ? 800 : 220,
      address: `Bazaar Street & Clock Tower Alley, ${destinationName}`,
      distance: '0.5 km from hostel row',
      coordinates: { lat: 15.2820, lng: 74.1120 },
      popularDishes: ['Hot Pav Bhaji / Kathi Rolls', 'Crispy Samosa & Masala Chai', 'Fresh Fruit Falooda', 'Local Sweet Jalebis'],
      dietaryTags: ['Vegetarian', 'Vegan', 'Halal', 'Non-Veg'],
      openingHours: '04:00 PM – 12:00 AM (Midnight)',
      atmosphere: 'Bustling, authentic cultural street food lane with sizzling aromatic woks',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      reservationAvailable: false
    },
    {
      id: 'rest-cafe-4',
      name: `Artisan Roastery & Sunset Clifftop Cafe`,
      cuisine: ['Specialty Coffee', 'Wood-fired Pizza', 'Bakery & Pastries', 'Brunch'],
      rating: 4.9,
      priceRange: '₹₹',
      costPerPerson: isInternational ? 2200 : 650,
      address: `Clifftop Overlook Path, ${destinationName}`,
      distance: '2.1 km from stay',
      coordinates: { lat: 15.3150, lng: 74.1400 },
      popularDishes: ['Truffle Burrata Flatbread', 'Cold Brew Tonic', 'Handmade Tiramisu', 'Avocado Sourdough Toast'],
      dietaryTags: ['Vegetarian', 'Vegan', 'Non-Veg'],
      openingHours: '08:30 AM – 11:00 PM',
      atmosphere: 'Bohemian open-air cliff terrace overlooking golden sunsets with chillout lo-fi music',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
      reservationAvailable: true
    },
    {
      id: 'rest-fine-5',
      name: `Le Cirque & Spice Pavilion Fine Dining`,
      cuisine: ['Contemporary Global Fusion', 'French / Nizami Heritage', 'Fine Wines'],
      rating: 4.95,
      priceRange: '₹₹₹₹',
      costPerPerson: isInternational ? 6500 : 2400,
      address: `Palace Grounds Promenade, ${destinationName}`,
      distance: '2.8 km from center',
      coordinates: { lat: 15.3220, lng: 74.1380 },
      popularDishes: ['Tasting Degustation Menu', 'Slow-cooked Saffron Lamb / Truffle Risotto', 'Gold Leaf Chocolate Sphere'],
      dietaryTags: ['Non-Veg', 'Vegetarian', 'Halal'],
      openingHours: '07:00 PM – 11:30 PM (Dinner Only)',
      atmosphere: 'Ultra-luxurious candlelit fine dining with world-class sommelier service',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      reservationAvailable: true
    }
  ];

  // Attractions
  const attractions: AttractionOption[] = [
    {
      id: 'attr-1',
      name: `Historic Fort & Clifftop Lighthouse Vantage`,
      category: 'Monument',
      rating: 4.85,
      entryFee: isInternational ? 800 : 50,
      recommendedDuration: '2 to 3 Hours',
      bestTimeToVisit: '04:30 PM – Sunset (Golden Hour)',
      coordinates: { lat: 15.3100, lng: 74.1250 },
      image: 'https://images.unsplash.com/photo-1588096344356-9a4058d7d433?auto=format&fit=crop&w=600&q=80',
      openingHours: '09:00 AM – 06:30 PM Daily',
      description: `A breathtaking 17th-century coastal fortress offering 360-degree views of the roaring sea, ancient stone ramparts, and a four-tiered lighthouse.`,
      highlights: ['Panoramic ocean horizon', 'Ancient freshwater storage spring', 'Sunset photography point'],
      distanceFromStay: '3.2 km'
    },
    {
      id: 'attr-2',
      name: `Golden Sands & Azure Bay Promenade`,
      category: 'Beach',
      rating: 4.9,
      entryFee: 0,
      recommendedDuration: '3 Hours',
      bestTimeToVisit: 'Early Morning or Late Afternoon',
      coordinates: { lat: 15.2900, lng: 74.1050 },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      openingHours: 'Open 24 Hours',
      description: `Pristine soft sand beach fringed with whispering coconut palms, gentle swimming waves, water sports operators, and vibrant shacks.`,
      highlights: ['Dolphin spotting cruises', 'Parasailing & Jet ski rides', 'Beachside loungers'],
      distanceFromStay: '1.5 km'
    },
    {
      id: 'attr-3',
      name: `Old Heritage Basilica & Architecture Trail`,
      category: 'Monument',
      rating: 4.8,
      entryFee: isInternational ? 400 : 0,
      recommendedDuration: '2 Hours',
      bestTimeToVisit: '10:00 AM – 01:00 PM',
      coordinates: { lat: 15.3020, lng: 74.1320 },
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      openingHours: '08:30 AM – 06:00 PM',
      description: `UNESCO World Heritage landmark featuring Baroque architecture, intricate carved woodwork, and centuries-old sacred relics.`,
      highlights: ['Baroque marble gilding', 'Historical museum gallery', 'Quiet prayer cloisters'],
      distanceFromStay: '4.8 km'
    },
    {
      id: 'attr-4',
      name: `Vibrant Night Flea Market & Artisan Bazaar`,
      category: 'Market',
      rating: 4.75,
      entryFee: 0,
      recommendedDuration: '2.5 Hours',
      bestTimeToVisit: '06:30 PM – 10:30 PM',
      coordinates: { lat: 15.2800, lng: 74.1180 },
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80',
      openingHours: '05:00 PM – 11:30 PM',
      description: `Colorful bohemian market brimming with handcrafted jewelry, Kashmiri shawls, local spices, aromatic teas, live acoustic music, and street food.`,
      highlights: ['Handmade souvenirs & ceramics', 'Live street musicians', 'Local street food stalls'],
      distanceFromStay: '2.1 km'
    }
  ];

  // Activities
  const activities: ActivityOption[] = [
    {
      id: 'act-1',
      title: 'Scuba Diving & Coral Island Boat Safari',
      category: 'Water Sports & Adventure',
      price: isInternational ? 6500 : 2800,
      duration: '4 Hours',
      difficulty: 'Easy',
      suitableFor: ['Solo', 'Couple', 'Friends', 'Adventure'],
      coordinates: { lat: 15.2900, lng: 74.1050 },
      highlights: ['PADI certified dive master', 'Underwater video & photos included', 'Sightings of parrotfish & coral'],
      rating: 4.9,
      bookingProvider: 'TravelMate Island Adventure Desk'
    },
    {
      id: 'act-2',
      title: 'Catamaran Sunset Cruise with Live Acoustic Music',
      category: 'Romantic & Sightseeing',
      price: isInternational ? 4200 : 1500,
      duration: '2 Hours',
      difficulty: 'Easy',
      suitableFor: ['Couple', 'Family', 'Relaxation', 'Honeymoon'],
      coordinates: { lat: 15.3050, lng: 74.1280 },
      highlights: ['Complimentary sparkling drink & snacks', 'Live acoustic performance', 'Mesmerizing ocean sunset'],
      rating: 4.85,
      bookingProvider: 'Ocean Serenade Cruises'
    },
    {
      id: 'act-3',
      title: 'Guided Culinary & Spice Walk with Traditional Feast',
      category: 'Culture & Culinary',
      price: isInternational ? 3200 : 900,
      duration: '3.5 Hours',
      difficulty: 'Easy',
      suitableFor: ['Family', 'Cultural', 'Food', 'Senior-Friendly'],
      coordinates: { lat: 15.3400, lng: 74.1600 },
      highlights: ['Learn about cardamom, cinnamon & vanilla', 'Traditional banana leaf lunch', 'Herbal welcome drink'],
      rating: 4.8,
      bookingProvider: 'Sahakari Spice Estate'
    }
  ];

  // Itinerary
  const itinerary: DayItinerary[] = [];
  const dayThemes = [
    'Arrival, Check-in & Sunset Coastal Stroll',
    'Historic Forts, UNESCO Heritage & Cultural Architecture',
    'Adventure, Island Cruising & Water Activities',
    'Scenic Spice Trails, Local Markets & Culinary Feasts',
    'Relaxed Leisure, Souvenir Shopping & Departure'
  ];

  for (let i = 1; i <= calculatedDays; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + (i - 1));
    const dateFormatted = dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const theme = dayThemes[(i - 1) % dayThemes.length];

    itinerary.push({
      dayNumber: i,
      date: dateFormatted,
      title: `Day ${i}: ${theme}`,
      theme,
      dayEstimatedCost: Math.round(estimatedTotal / calculatedDays),
      weatherForecastSnippet: '28°C • Sunny with gentle breeze',
      items: [
        {
          id: `item-${i}-1`,
          time: '08:30 AM',
          title: i === 1 ? 'Arrival & Transit Check-in' : 'Morning Artisanal Breakfast & Coffee',
          category: i === 1 ? 'Transport' : 'Food',
          locationName: i === 1 ? `${startingCity} to ${destinationName}` : 'Hostel Cafe / Green Leaf Gourmet',
          estimatedCost: i === 1 ? 0 : 350 * totalTravellers,
          duration: '1 Hour',
          notes: i === 1 ? 'Pre-booked taxi meets you outside arrivals terminal.' : 'Enjoy fresh fruit bowls, smoothies, or hot regional thalis.'
        },
        {
          id: `item-${i}-2`,
          time: '10:00 AM',
          title: i === 1 ? 'Check-in & Settle at Stay' : (i % 2 === 0 ? 'Explore Historic Fort & Architecture' : 'Scuba Diving & Coral Safari'),
          category: i === 1 ? 'Check-in' : (i % 2 === 0 ? 'Sightseeing' : 'Adventure'),
          locationName: i === 1 ? `${destinationName} Stay` : (i % 2 === 0 ? 'Historic Fort & Lighthouse' : 'Azure Bay Marina'),
          estimatedCost: i === 1 ? 0 : (i % 2 === 0 ? 50 * totalTravellers : 2500 * totalTravellers),
          duration: '2.5 Hours',
          travelTimeFromPrev: '20 mins by cab',
          distanceFromPrev: '3.5 km',
          notes: 'Keep sunscreen and sunglasses handy. Wear comfortable walking footwear.'
        },
        {
          id: `item-${i}-3`,
          time: '01:00 PM',
          title: 'Authentic Local Feast & Lunch Break',
          category: 'Food',
          locationName: 'Fisherman’s Wharf / Green Leaf Gourmet',
          estimatedCost: 650 * totalTravellers,
          duration: '1.5 Hours',
          travelTimeFromPrev: '15 mins',
          distanceFromPrev: '2 km',
          notes: 'Try the house specialties recommended by our Food Agent.'
        },
        {
          id: `item-${i}-4`,
          time: '03:30 PM',
          title: i === calculatedDays ? 'Artisan Souvenirs & Final Packing' : 'Scenic Beach Promenade & Water Activities',
          category: i === calculatedDays ? 'Shopping' : 'Relaxation',
          locationName: i === calculatedDays ? 'Vibrant Flea Market' : 'Golden Sands Beach',
          estimatedCost: i === calculatedDays ? 2000 : 500,
          duration: '2.5 Hours',
          travelTimeFromPrev: '15 mins',
          distanceFromPrev: '2.5 km',
          notes: 'Golden afternoon light for scenic photos.'
        },
        {
          id: `item-${i}-5`,
          time: '06:30 PM',
          title: 'Sunset Viewpoint & Clifftop Evening',
          category: 'Sightseeing',
          locationName: 'Artisan Sunset Deck & Clifftop Lounge',
          estimatedCost: 400 * totalTravellers,
          duration: '1.5 Hours',
          travelTimeFromPrev: '10 mins',
          distanceFromPrev: '1.8 km',
          notes: 'Capture sunset reflections across the horizon.'
        },
        {
          id: `item-${i}-6`,
          time: '08:30 PM',
          title: i === calculatedDays ? 'Farewell Dinner & Departure Prep' : 'Candlelit Dinner & Live Music',
          category: 'Food',
          locationName: 'Seaside Deck Restaurant',
          estimatedCost: 800 * totalTravellers,
          duration: '1.5 Hours',
          travelTimeFromPrev: '10 mins',
          distanceFromPrev: '1 km',
          notes: 'Relax under starry skies with chilled refreshments.'
        }
      ]
    });
  }

  // Local Transport
  const localTransportOptions: LocalTransportOption[] = [
    {
      type: 'App Cabs (Uber / Ola / Local FastCab)',
      icon: 'Car',
      typicalFare: isInternational ? '€15 – €35 per ride' : '₹25 – ₹35 per km / ₹150 – ₹400 for city hops',
      availability: '24/7 in urban zones and tourist beaches',
      bestFor: 'Airport transfers, late-night dinners, and AC comfort',
      safetyTip: 'Verify vehicle license plate and share live ride status via WhatsApp.',
      bookingMethod: 'Book directly through Uber/Ola app or front desk'
    },
    {
      type: 'Auto-Rickshaw & Tuk-Tuk / Metro',
      icon: 'Navigation',
      typicalFare: isInternational ? '€2.50 per metro trip' : '₹50 base + ₹18/km',
      availability: 'Everywhere, available 06:00 AM – 11:00 PM',
      bestFor: 'Quick short hops between markets and cafes',
      safetyTip: 'Agree on the fare before boarding if meter is not used.',
      bookingMethod: 'Flag down on the street or via metro stations'
    },
    {
      type: 'Self-Drive Scooty / Motorbike Rental',
      icon: 'Bike',
      typicalFare: isInternational ? '€25 – €40/day' : '₹350 – ₹600 per day + fuel (Helmet provided)',
      availability: 'High availability near hostels, hotels, and bus stands',
      bestFor: 'Solo & Couples who want maximum freedom along scenic coastal/mountain roads',
      safetyTip: 'Always wear a helmet, carry driver license, and check brakes before renting.',
      bookingMethod: 'Rent via hostel/hotel desk or licensed rental booths'
    },
    {
      type: 'Self-Drive Car / SUV Rental',
      icon: 'CarFront',
      typicalFare: isInternational ? '€55 – €90/day' : '₹1,600 – ₹3,200 per day',
      availability: 'Pre-book online or airport pickup',
      bestFor: 'Families & friend groups travelling with luggage',
      safetyTip: 'Take a quick 360-degree video of the car exterior before driving off.',
      bookingMethod: 'Book through Zoomcar, Revv, Sixt, or Hertz'
    }
  ];

  // Weather
  const weather: WeatherForecast = {
    currentTemp: isInternational ? 21 : 27,
    condition: 'Pleasant & Sunny with Gentle Breeze',
    humidity: 58,
    windKmH: 12,
    sunrise: '06:18 AM',
    sunset: '06:34 PM',
    forecast: [
      { day: 'Day 1', tempMax: 28, tempMin: 21, condition: 'Sunny', icon: 'Sun', rainProbability: 5 },
      { day: 'Day 2', tempMax: 27, tempMin: 20, condition: 'Partly Cloudy', icon: 'CloudSun', rainProbability: 10 },
      { day: 'Day 3', tempMax: 28, tempMin: 21, condition: 'Clear Skies', icon: 'Sun', rainProbability: 5 },
      { day: 'Day 4', tempMax: 26, tempMin: 19, condition: 'Pleasant Breeze', icon: 'Wind', rainProbability: 15 },
      { day: 'Day 5', tempMax: 27, tempMin: 20, condition: 'Sunny', icon: 'Sun', rainProbability: 0 }
    ],
    aiAdvice: 'Ideal weather for outdoor sightseeing and beach activities. Carry light breathable cottons, sunglasses, and comfortable footwear.'
  };

  // Visa & Docs
  const visaAndDocs: VisaDocumentInfo = isInternational ? {
    destination: destinationName,
    visaRequired: true,
    visaType: 'Tourist E-Visa / Visa on Arrival (depending on passport)',
    processingTime: '24–72 Hours for eVisa',
    estimatedFee: '₹2,500 – ₹6,000 per person',
    validity: '30 to 90 Days single/multiple entry',
    requirements: [
      'Passport valid for at least 6 months with 2 blank pages',
      'Confirmed return flight ticket and accommodation booking voucher',
      'Recent passport-size digital photograph',
      'Valid Travel & Medical Insurance'
    ],
    officialAdvisory: 'Apply through official government immigration portals to avoid third-party agency markups.'
  } : {
    destination: destinationName,
    visaRequired: false,
    visaType: 'Domestic Travel — No Visa Required for Indian Citizens',
    processingTime: 'Instant',
    estimatedFee: '₹0',
    validity: 'N/A',
    requirements: [
      'Government Photo ID (Aadhaar Card / Voter ID / Passport / Driving License)',
      'Flight / Train confirmed e-tickets on mobile',
      'Hotel / Hostel booking confirmation voucher'
    ],
    officialAdvisory: 'Carry original physical ID for airport/railway security checkpoints.'
  };

  // Emergency
  const emergency: EmergencyInfo = {
    police: isInternational ? '112 / 911' : '112 / 100',
    ambulance: isInternational ? '112 / 911' : '108 / 102',
    fire: isInternational ? '112' : '101',
    touristHelpline: isInternational ? '+1-800-TOURIST' : '1363 (24x7 Multi-lingual Tourist Helpline)',
    womenHelpline: '1091 / 181',
    nearestHospital: {
      name: `${destinationName} District Emergency Medical Center`,
      distance: '2.1 km from town center',
      phone: '+91 832 245 6789',
      address: `Hospital Road, ${destinationName}`
    },
    nearestPoliceStation: {
      name: `${destinationName} Tourist Police Assistance Station`,
      distance: '1.2 km',
      phone: '+91 832 242 1100',
      address: `Main Promenade Roundabout, ${destinationName}`
    },
    safetyTips: [
      'Keep digital copies of passport and travel vouchers backed up on Google Drive.',
      'Use official app-based cabs (Uber/Ola) for late night trips.',
      'Save your hostel or hotel pin on offline Google Maps.'
    ]
  };

  // Culture
  const culture: CultureGuide = {
    localLanguage: isInternational ? 'English & Local Language' : 'Hindi, English & Regional Language',
    phrases: [
      { original: 'Namaste / Hello', phonetic: 'Nah-mas-tay', meaning: 'Standard respectful greeting' },
      { original: 'Kitna hua? / How much?', phonetic: 'Kit-naa hoo-aa?', meaning: 'Asking price or fare' },
      { original: 'Shukriya / Thank you', phonetic: 'Shuk-ree-ya', meaning: 'Expressing gratitude' },
      { original: 'Kahan hai? / Where is...?', phonetic: 'Ka-haan hai?', meaning: 'Asking for directions' },
      { original: 'Madad chahiye / I need help', phonetic: 'Ma-dad chaa-hee-ye', meaning: 'Emergency assistance request' }
    ],
    tippingCustoms: 'Tipping 7% to 10% in sit-down restaurants is customary if service charge is not included.',
    dressCode: 'Modest attire covering shoulders and knees is appreciated when visiting temples or heritage churches.',
    religiousEtiquette: 'Remove shoes before entering sacred areas.',
    bargainingTips: 'Polite bargaining is common in flea markets and street souvenir stalls.',
    culturalDoAndDonts: {
      dos: [
        'Do greet locals warmly.',
        'Do try authentic local street delicacies and tea.',
        'Do carry some physical cash for small local vendors.'
      ],
      donts: [
        'Do not litter on beaches, mountain trails, or heritage monuments.',
        'Do not drink unsealed tap water.'
      ]
    }
  };

  // Checklist
  const checklist: ChecklistItem[] = [
    { id: 'chk-1', category: 'Documents', title: 'Government ID Cards (Aadhaar / Passport / Driving License)', completed: true, essential: true },
    { id: 'chk-2', category: 'Documents', title: 'Flight / Train / Hotel / Hostel e-Vouchers downloaded offline', completed: true, essential: true },
    { id: 'chk-3', category: 'Money', title: 'Debit / Credit Cards enabled for travel + ₹3,000 cash for emergency', completed: false, essential: true },
    { id: 'chk-4', category: 'Electronics', title: 'Phone chargers, high-capacity power bank & USB cords', completed: false, essential: true },
    { id: 'chk-5', category: 'Clothing', title: 'Light cotton outfits, swimwear, flip-flops & walking sneakers', completed: false, essential: true },
    { id: 'chk-6', category: 'Health & Safety', title: 'Sunscreen SPF 50+, mosquito repellent, basic first-aid & personal meds', completed: false, essential: true }
  ];

  // Flight Tracking Simulator
  const flightTracking: FlightTrackingRecord[] = [
    {
      id: 'flt-1',
      flightNumber: isInternational ? 'EK-542' : '6E-428',
      airline: isInternational ? 'Emirates' : 'IndiGo Airlines',
      aircraft: isInternational ? 'Boeing 777-300ER' : 'Airbus A320neo',
      fromIATA: startingCity.substring(0, 3).toUpperCase() || 'VTZ',
      fromCity: startingCity,
      toIATA: destinationName.substring(0, 3).toUpperCase() || 'GOI',
      toCity: destinationName,
      scheduledDeparture: '08:45 AM',
      actualDeparture: '08:52 AM',
      scheduledArrival: '11:10 AM',
      estimatedArrival: '11:12 AM',
      status: 'On Time',
      gate: 'Gate 4B',
      terminal: 'Terminal 2',
      baggageBelt: 'Belt 3',
      altitudeFt: 32000,
      speedKts: 460,
      progressPercent: 42,
      delayMinutes: 0,
      lastUpdated: 'Just now (Live Radar Feed)',
      reservationCode: 'TM-' + Math.floor(100000 + Math.random() * 900000),
      passengerName: 'Primary Passenger & Co-Travelers',
      seat: '14A, 14B',
      class: isLuxury ? 'Business' : 'Economy'
    }
  ];

  // Dynamic Reservations
  const reservations: ReservationItem[] = [
    {
      id: 'res-flt',
      type: 'Flight',
      title: `${startingCity} to ${destinationName} (Direct)`,
      provider: isInternational ? 'Emirates' : 'IndiGo',
      confirmationCode: 'TM-FLT-' + Math.floor(10000 + Math.random() * 90000),
      date: params.startDate,
      time: '08:45 AM',
      status: 'Confirmed',
      price: Math.round(totalTransport),
      currency: params.currency,
      details: {
        'Flight Number': isInternational ? 'EK-542' : '6E-428',
        'Departure Terminal': 'Terminal 2, Gate 4B',
        'Baggage': '15kg Check-in + 7kg Cabin',
        'Passengers': `${totalTravellers} Travellers`
      },
      cancellationAllowedUntil: '24 hours prior to departure',
      qrData: `AIRLINE_CONFIRMATION_${destinationName.toUpperCase()}_FLT_6E428`
    },
    {
      id: 'res-htl',
      type: 'Hotel',
      title: `${destinationName} Stay Voucher`,
      provider: 'TravelMate Direct Stay',
      confirmationCode: 'TM-HTL-' + Math.floor(10000 + Math.random() * 90000),
      date: `${params.startDate} to ${params.endDate}`,
      status: 'Confirmed',
      price: Math.round(totalHotel),
      currency: params.currency,
      details: {
        'Room': 'Deluxe Room / Backpacker Private Suite',
        'Check-In': '02:00 PM',
        'Check-Out': '11:00 AM',
        'Meals': 'Complimentary Daily Breakfast'
      },
      cancellationAllowedUntil: '48 hours before check-in',
      qrData: `HOTEL_VOUCHER_${destinationName.toUpperCase()}`
    },
    {
      id: 'res-act',
      type: 'Activity',
      title: 'Scuba Diving & Island Safari Voucher',
      provider: 'Island Adventure Desk',
      confirmationCode: 'TM-ACT-' + Math.floor(10000 + Math.random() * 90000),
      date: params.startDate,
      time: '10:00 AM',
      status: 'Voucher Issued',
      price: 2800 * totalTravellers,
      currency: params.currency,
      details: {
        'Reporting Point': 'Pier #2 Marina',
        'Includes': 'Gear, Instructor, Underwater Photos',
        'Duration': '4 Hours'
      },
      qrData: `ACTIVITY_PASS_SCUBA_SAFARI_DIVE`
    }
  ];

  return {
    id: 'trip-' + Date.now(),
    title: `${calculatedDays}-Day ${destinationName} Plan`,
    createdAt: new Date().toISOString(),
    startingLocation: params.startingLocation,
    destination: destinationName,
    destinationRegion: isInternational ? 'World' : 'India',
    startDate: params.startDate,
    endDate: params.endDate,
    durationDays: calculatedDays,
    travellers: params.travellers,
    travelStyles: params.travelStyles,
    interests: params.interests,
    budget,
    transportOptions,
    selectedTransportId: 'trans-1',
    accommodations,
    selectedAccommodationId: 'hotel-hostel-1',
    restaurants,
    attractions,
    activities,
    itinerary,
    localTransportOptions,
    weather,
    visaAndDocs,
    emergency,
    culture,
    checklist,
    flightTracking,
    reservations,
    isOptimized: false
  };
}

export function optimizeTripBudget(currentTrip: TripPlan): TripPlan {
  const currentTotal = currentTrip.budget.totalEstimated;
  
  const optimizedHotelCost = Math.round(currentTrip.budget.accommodation * 0.75);
  const optimizedTransportCost = Math.round(currentTrip.budget.transportation * 0.85);
  const optimizedFoodCost = Math.round(currentTrip.budget.food * 0.82);
  const optimizedActivitiesCost = Math.round(currentTrip.budget.activities * 0.78);
  const optimizedLocalTransportCost = Math.round(currentTrip.budget.localTransport * 0.80);
  const optimizedShopping = Math.round(currentTrip.budget.shopping * 0.70);
  const emergencyReserve = Math.round((optimizedHotelCost + optimizedTransportCost + optimizedFoodCost) * 0.08);

  const newTotal = optimizedHotelCost + optimizedTransportCost + optimizedFoodCost + optimizedActivitiesCost + optimizedLocalTransportCost + optimizedShopping + emergencyReserve;
  const savedAmount = currentTotal - newTotal;

  const changes = [
    {
      category: 'Accommodation',
      description: 'Switched to top-rated boutique stay / premium hostel private ensuite with breakfast included.',
      amountSaved: currentTrip.budget.accommodation - optimizedHotelCost
    },
    {
      category: 'Transportation',
      description: 'Optimized flight timing with combo return fare.',
      amountSaved: currentTrip.budget.transportation - optimizedTransportCost
    },
    {
      category: 'Dining & Food',
      description: 'Balanced 2 fine dining meals with legendary authentic local food spots and street markets.',
      amountSaved: currentTrip.budget.food - optimizedFoodCost
    },
    {
      category: 'Activities & Sightseeing',
      description: 'Bundled all-in-one experience passes and prioritized zero-fee sunset viewpoints.',
      amountSaved: currentTrip.budget.activities - optimizedActivitiesCost
    },
    {
      category: 'Local Mobility',
      description: 'Recommended daily self-drive scooty or metro pass instead of single on-demand taxis.',
      amountSaved: currentTrip.budget.localTransport - optimizedLocalTransportCost
    }
  ];

  return {
    ...currentTrip,
    isOptimized: true,
    budget: {
      ...currentTrip.budget,
      accommodation: optimizedHotelCost,
      transportation: optimizedTransportCost,
      food: optimizedFoodCost,
      activities: optimizedActivitiesCost,
      localTransport: optimizedLocalTransportCost,
      shopping: optimizedShopping,
      emergencyReserve,
      totalEstimated: newTotal
    },
    savingsBreakdown: {
      originalCost: currentTotal,
      optimizedCost: newTotal,
      savedAmount,
      changes
    }
  };
}

function cleanDestinationName(dest: string): string {
  if (!dest) return 'Goa, India';
  return dest.split(',')[0].trim();
}

function isLocationInternational(dest: string): boolean {
  const internationalKeys = [
    'paris', 'dubai', 'tokyo', 'switzerland', 'swiss', 'bali', 'singapore', 'london',
    'new york', 'usa', 'france', 'japan', 'uk', 'thailand', 'bangkok', 'rome', 'italy',
    'uae', 'spain', 'barcelona', 'madrid', 'australia', 'sydney', 'vietnam', 'germany',
    'greece', 'santorini', 'maldives'
  ];
  const lower = dest.toLowerCase();
  return internationalKeys.some(k => lower.includes(k));
}
