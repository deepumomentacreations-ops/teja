export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD' | 'JPY';

export interface CurrencyRate {
  symbol: string;
  rateToINR: number; // 1 Currency = X INR
}

export type TravelStyle =
  | 'Solo'
  | 'Couple'
  | 'Family'
  | 'Friends'
  | 'Backpacker'
  | 'Luxury'
  | 'Adventure'
  | 'Honeymoon'
  | 'Cultural'
  | 'Spiritual'
  | 'Nature'
  | 'Food'
  | 'Shopping'
  | 'Senior-Friendly';

export type TravelInterest =
  | 'Beaches'
  | 'Mountains'
  | 'History'
  | 'Food'
  | 'Adventure'
  | 'Shopping'
  | 'Photography'
  | 'Wildlife'
  | 'Nightlife'
  | 'Culture'
  | 'Relaxation'
  | 'Water Sports'
  | 'Wellness & Spa';

export interface TravellersCount {
  adults: number;
  children: number;
  infants: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TransportOption {
  id: string;
  type: 'Flight' | 'Train' | 'Bus' | 'Car / Taxi' | 'Rental Car' | 'Self-Drive Bike';
  provider: string;
  route: string;
  duration: string;
  distanceKm: number;
  estimatedCost: number; // in INR
  transfers: number;
  comfortRating: number; // 1 to 5
  departureTime: string;
  arrivalTime: string;
  isRecommended?: boolean;
  bookingUrl?: string;
  pros: string[];
  cons: string[];
  flightNumber?: string;
  liveStatus?: 'On Time' | 'Scheduled' | 'Delayed' | 'Gate Open';
}

export interface AccommodationOption {
  id: string;
  name: string;
  type: 'Resort' | 'Hotel' | 'Hostel' | 'Boutique Villa' | 'Heritage Stay' | 'Apartment';
  tier: 'Budget' | 'Standard' | 'Premium' | 'Luxury';
  rating: number;
  reviewsCount: number;
  pricePerNight: number; // in INR
  totalCost: number;
  address: string;
  distanceToCenter: string;
  coordinates: Coordinates;
  amenities: string[];
  images: string[];
  roomType: string;
  cancellationPolicy: string;
  bookingProvider: string;
  badge?: string;
  checkIn: string;
  checkOut: string;
  isCoupleFriendly?: boolean;
  isFamilyFriendly?: boolean;
}

export interface RestaurantOption {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  priceRange: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  costPerPerson: number;
  address: string;
  distance: string;
  coordinates: Coordinates;
  popularDishes: string[];
  dietaryTags: ('Vegetarian' | 'Vegan' | 'Jain' | 'Halal' | 'Gluten-Free' | 'Non-Veg')[];
  openingHours: string;
  atmosphere: string;
  image?: string;
  reservationAvailable: boolean;
}

export interface AttractionOption {
  id: string;
  name: string;
  category: 'Beach' | 'Monument' | 'Nature' | 'Museum' | 'Temple' | 'Market' | 'Viewpoint' | 'Water Activity';
  rating: number;
  entryFee: number; // 0 for free
  recommendedDuration: string;
  bestTimeToVisit: string;
  coordinates: Coordinates;
  image: string;
  openingHours: string;
  description: string;
  highlights: string[];
  distanceFromStay?: string;
}

export interface ActivityOption {
  id: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  suitableFor: string[];
  coordinates: Coordinates;
  highlights: string[];
  rating: number;
  bookingProvider?: string;
}

export interface ItineraryTimelineItem {
  id: string;
  time: string;
  title: string;
  category: 'Food' | 'Sightseeing' | 'Transport' | 'Relaxation' | 'Adventure' | 'Shopping' | 'Check-in' | 'Nightlife';
  locationName: string;
  coordinates?: Coordinates;
  estimatedCost: number;
  duration: string;
  travelTimeFromPrev?: string;
  distanceFromPrev?: string;
  notes?: string;
  iconName?: string;
  isCustom?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  title: string;
  theme: string;
  items: ItineraryTimelineItem[];
  dayEstimatedCost: number;
  weatherForecastSnippet?: string;
}

export interface LocalTransportOption {
  type: string;
  icon: string;
  typicalFare: string;
  availability: string;
  bestFor: string;
  safetyTip: string;
  bookingMethod: string;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  localTransport: number;
  activities: number;
  shopping: number;
  emergencyReserve: number;
  totalEstimated: number;
  userBudget: number;
  currency: CurrencyCode;
}

export interface WeatherDay {
  day: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  rainProbability: number;
}

export interface WeatherForecast {
  currentTemp: number;
  condition: string;
  humidity: number;
  windKmH: number;
  sunrise: string;
  sunset: string;
  forecast: WeatherDay[];
  aiAdvice: string;
}

export interface ChecklistItem {
  id: string;
  category: 'Documents' | 'Clothing' | 'Electronics' | 'Health & Safety' | 'Money' | 'Custom';
  title: string;
  completed: boolean;
  essential: boolean;
}

export interface VisaDocumentInfo {
  destination: string;
  visaRequired: boolean;
  visaType: string;
  processingTime: string;
  estimatedFee: string;
  validity: string;
  requirements: string[];
  officialAdvisory: string;
  sourceUrl?: string;
}

export interface EmergencyInfo {
  police: string;
  ambulance: string;
  fire: string;
  touristHelpline: string;
  womenHelpline?: string;
  nearestHospital: {
    name: string;
    distance: string;
    phone: string;
    address: string;
  };
  nearestPoliceStation: {
    name: string;
    distance: string;
    phone: string;
    address: string;
  };
  safetyTips: string[];
}

export interface CultureGuide {
  localLanguage: string;
  phrases: {
    original: string;
    phonetic: string;
    meaning: string;
  }[];
  tippingCustoms: string;
  dressCode: string;
  religiousEtiquette: string;
  bargainingTips: string;
  culturalDoAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export interface FlightTrackingRecord {
  id: string;
  flightNumber: string;
  airline: string;
  aircraft: string;
  fromIATA: string;
  fromCity: string;
  toIATA: string;
  toCity: string;
  scheduledDeparture: string;
  actualDeparture: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: 'Scheduled' | 'On Time' | 'Boarding' | 'Departed' | 'In Flight' | 'Delayed' | 'Landed';
  gate: string;
  terminal: string;
  baggageBelt: string;
  altitudeFt: number;
  speedKts: number;
  progressPercent: number;
  delayMinutes: number;
  lastUpdated: string;
  reservationCode: string;
  passengerName: string;
  seat: string;
  class: 'Economy' | 'Premium' | 'Business';
}

export interface ReservationItem {
  id: string;
  type: 'Flight' | 'Hotel' | 'Attraction' | 'Cab' | 'Activity';
  title: string;
  provider: string;
  confirmationCode: string;
  date: string;
  time?: string;
  status: 'Confirmed' | 'Pending Verification' | 'Voucher Issued' | 'Cancelled';
  price: number;
  currency: CurrencyCode;
  details: Record<string, string>;
  cancellationAllowedUntil?: string;
  qrData?: string;
}

export interface AgentStatus {
  agentId: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'completed' | 'optimized';
  message: string;
  iconName: string;
}

export interface TripPlan {
  id: string;
  title: string;
  createdAt: string;
  startingLocation: string;
  destination: string;
  destinationRegion: 'India' | 'World';
  startDate: string;
  endDate: string;
  durationDays: number;
  travellers: TravellersCount;
  travelStyles: TravelStyle[];
  interests: TravelInterest[];
  budget: BudgetBreakdown;
  transportOptions: TransportOption[];
  selectedTransportId?: string;
  accommodations: AccommodationOption[];
  selectedAccommodationId?: string;
  restaurants: RestaurantOption[];
  attractions: AttractionOption[];
  activities: ActivityOption[];
  itinerary: DayItinerary[];
  localTransportOptions: LocalTransportOption[];
  weather: WeatherForecast;
  visaAndDocs: VisaDocumentInfo;
  emergency: EmergencyInfo;
  culture: CultureGuide;
  checklist: ChecklistItem[];
  flightTracking?: FlightTrackingRecord[];
  reservations?: ReservationItem[];
  isOptimized?: boolean;
  savingsBreakdown?: {
    originalCost: number;
    optimizedCost: number;
    savedAmount: number;
    changes: { category: string; description: string; amountSaved: number }[];
  };
}

export interface DestinationCardData {
  id: string;
  name: string;
  subtitle: string;
  stateOrCountry: string;
  region: 'India' | 'World';
  heroImage: string;
  bestTimeToVisit: string;
  avgCostPerDay: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  popularFor: string[];
  weatherSnippet: string;
  idealDays: number;
  highlightDescription: string;
  coordinates: Coordinates;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'agent-transport' | 'agent-budget' | 'agent-itinerary';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionType: string; payload?: any }[];
  isStreaming?: boolean;
}
