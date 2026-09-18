import { ShipmentData, DepotInfo, BulletinItem } from '../types';

export const SAMPLE_SHIPMENTS: Record<string, ShipmentData> = {
  'OMI-UKNG-2026-00124': {
    waybillNumber: 'OMI-UKNG-2026-00124',
    serviceType: 'Priority Air Freight Express (Direct LHR ➔ LOS)',
    transitMode: 'air',
    origin: {
      city: 'London',
      country: 'United Kingdom',
      hub: 'London Consolidation Depot (Acton)',
    },
    destination: {
      city: 'Lagos',
      country: 'Nigeria',
      address: 'Plot 14B Admiralty Way, Lekki Phase 1, Lagos',
    },
    sender: 'Adeyemi Engineering Ltd (London UK)',
    receiver: 'Chinedu Okonkwo / Lekki Global Ent.',
    pieces: 2,
    weightKg: 18.5,
    volumetricWeightKg: 14.2,
    dimensions: '45 x 35 x 30 cm (x2)',
    contents: 'Industrial telemetry components & commercial documents',
    estimatedDelivery: 'Tomorrow, 14:00 GMT+1',
    currentStatus: 'Customs Cleared — Out for Dispatch to Destination Hub',
    statusPercent: 80,
    events: [
      {
        id: 'evt-1',
        timestamp: '15 Sep 2026, 11:20 GMT',
        location: 'London Acton Depot, UK',
        status: 'Shipment Received & Weighed',
        description: 'Package accepted, barcode scanned, bilateral export documentation verified.',
        completed: true,
      },
      {
        id: 'evt-2',
        timestamp: '15 Sep 2026, 18:45 GMT',
        location: 'London Heathrow (LHR) Cargo Center',
        status: 'Consolidated into ULD Container',
        description: 'Transferred to airside apron for security x-ray screening and palletizing.',
        completed: true,
      },
      {
        id: 'evt-3',
        timestamp: '16 Sep 2026, 04:30 GMT',
        location: 'Flight OM-814 (Boeing 777-200F)',
        status: 'Departed London Heathrow to Lagos LOS',
        description: 'Flight en route crossing Sahara corridor. Telemetry live on transponder OM-814.',
        completed: true,
      },
      {
        id: 'evt-4',
        timestamp: '16 Sep 2026, 11:15 GMT+1',
        location: 'Murtala Muhammed Airport (LOS), Cargo Terminal 2',
        status: 'Flight Arrived & Offloaded',
        description: 'Received at bonded warehouse apron. Unit de-consolidated.',
        completed: true,
      },
      {
        id: 'evt-5',
        timestamp: '17 Sep 2026, 09:30 GMT+1',
        location: 'Nigeria Customs Service Bonded Desk, Ikeja',
        status: 'Customs Assessment & Single Window Pre-Cleared',
        description: 'Duty assessed, zero discrepancies. Expedited green-lane customs release granted.',
        completed: true,
        isCurrent: true,
      },
      {
        id: 'evt-6',
        timestamp: 'Estimated 18 Sep 2026, 14:00 GMT+1',
        location: 'Lekki Dispatch Network, Lagos',
        status: 'Final Mile Delivery to Consignee',
        description: 'Assigned to Omisore Express van route with WhatsApp live OTP and photo POD.',
        completed: false,
      },
    ],
  },
  'OMI-SEANG-2026-00045': {
    waybillNumber: 'OMI-SEANG-2026-00045',
    serviceType: 'Ocean Freight LCL Shared Groupage',
    transitMode: 'sea',
    origin: {
      city: 'Tilbury Port',
      country: 'United Kingdom',
      hub: 'Tilbury Docks Consolidation Bay 4',
    },
    destination: {
      city: 'Apapa Port, Lagos',
      country: 'Nigeria',
      address: 'Commercial Warehouse, Wharf Road, Apapa',
    },
    sender: 'British Auto-Spares Consortium',
    receiver: 'Balogun Trading Co, Lagos Island',
    pieces: 6,
    weightKg: 420.0,
    volumetricWeightKg: 510.0,
    dimensions: '120 x 80 x 140 cm palletized',
    contents: 'Automotive replacement spares & machinery gears',
    estimatedDelivery: '28 Sep 2026, 16:00 GMT+1',
    currentStatus: 'Vessel in Transit - Atlantic Equatorial Passage',
    statusPercent: 55,
    events: [
      {
        id: 'sea-1',
        timestamp: '08 Sep 2026',
        location: 'Tilbury Maritime Terminal, UK',
        status: 'Container Stuffed & Sealed',
        description: '40ft High Cube Container #MSKU948192 sealed under customs supervision.',
        completed: true,
      },
      {
        id: 'sea-2',
        timestamp: '10 Sep 2026',
        location: 'Vessel MSC Calypso',
        status: 'Cast Off from Port of Tilbury',
        description: 'Sea voyage commenced toward West Africa coast.',
        completed: true,
        isCurrent: true,
      },
      {
        id: 'sea-3',
        timestamp: 'Expected 24 Sep 2026',
        location: 'Apapa Port Container Terminal (APMT)',
        status: 'Berthing & Gantry Crane Discharge',
        description: 'Discharge into bonded terminal container yard.',
        completed: false,
      },
    ],
  },
};

// Helper function to dynamically retrieve or generate shipment data for any waybill
export const getShipmentByWaybill = (waybill: string): ShipmentData => {
  const normalized = waybill.trim().toUpperCase();
  if (SAMPLE_SHIPMENTS[normalized]) {
    return SAMPLE_SHIPMENTS[normalized];
  }

  // If waybill starts with OMI or has standard pattern, create a realistic active shipment record
  const isSea = normalized.includes('SEA') || normalized.includes('CONT') || normalized.includes('MSKU');
  const transitMode = isSea ? 'sea' : 'air';
  
  const simulated: ShipmentData = {
    waybillNumber: normalized,
    serviceType: isSea 
      ? 'Ocean Freight LCL Container Manifest (Tilbury ➔ Apapa)' 
      : 'Priority Air Freight Express (LHR ➔ LOS)',
    transitMode,
    origin: {
      city: isSea ? 'Tilbury Port' : 'London',
      country: 'United Kingdom',
      hub: isSea ? 'Port of Tilbury Container Terminal' : 'London Consolidation Depot (Acton)',
    },
    destination: {
      city: 'Lagos',
      country: 'Nigeria',
      address: 'Plot 22 Commercial Avenue, Ikeja Industrial Estate, Lagos',
    },
    sender: 'Corridor Shipper (United Kingdom)',
    receiver: 'Registered Consignee (Lagos, Nigeria)',
    pieces: isSea ? 4 : 2,
    weightKg: isSea ? 180.0 : 12.5,
    volumetricWeightKg: isSea ? 210.0 : 10.8,
    dimensions: isSea ? '100 x 80 x 120 cm' : '40 x 30 x 25 cm',
    contents: 'Consignment under customs electronic seal',
    estimatedDelivery: isSea ? '28 Sep 2026, 17:00 GMT+1' : 'Tomorrow, 16:00 GMT+1',
    currentStatus: isSea 
      ? 'Vessel Sailing - Equator Atlantic Passage' 
      : 'Customs Cleared — Out for Dispatch to Destination Hub',
    statusPercent: isSea ? 60 : 80,
    events: isSea ? [
      {
        id: 'sea-sim-1',
        timestamp: '10 Sep 2026, 09:00 GMT',
        location: 'Port of Tilbury, UK',
        status: 'Container Loaded & Customs Export Gate Pass Issued',
        description: 'Sealed container loaded onto vessel hold with HMRC export declaration filed.',
        completed: true,
      },
      {
        id: 'sea-sim-2',
        timestamp: '12 Sep 2026, 14:30 GMT',
        location: 'Vessel MSC Calypso',
        status: 'En Route to West Africa Coast',
        description: 'Vessel navigational position logged in Atlantic corridor.',
        completed: true,
        isCurrent: true,
      },
      {
        id: 'sea-sim-3',
        timestamp: 'Expected 26 Sep 2026',
        location: 'Apapa Port Container Terminal, Lagos',
        status: 'Berthing & Consignment De-Stuffing',
        description: 'Offloading into bonded terminal for Nigeria Customs PAAR verification.',
        completed: false,
      }
    ] : [
      {
        id: 'air-sim-1',
        timestamp: '16 Sep 2026, 09:40 GMT',
        location: 'London Acton Depot, UK',
        status: 'Shipment Received & Weighed',
        description: 'Consignment checked into manifest and barcode scanned.',
        completed: true,
      },
      {
        id: 'air-sim-2',
        timestamp: '16 Sep 2026, 19:15 GMT',
        location: 'London Heathrow (LHR) Cargo Apron',
        status: 'Loaded onto Boeing 777-200F (Flight OM-814)',
        description: 'Pre-flight security scan and customs declaration dispatched.',
        completed: true,
      },
      {
        id: 'air-sim-3',
        timestamp: '17 Sep 2026, 08:30 GMT+1',
        location: 'Murtala Muhammed Airport (LOS), Cargo Terminal 2',
        status: 'Flight Landed & Bonded Pre-Clearance Granted',
        description: 'Nigeria Customs Service Single Window green-lane clearance confirmed.',
        completed: true,
        isCurrent: true,
      },
      {
        id: 'air-sim-4',
        timestamp: 'Estimated 18 Sep 2026, 15:00 GMT+1',
        location: 'Lagos Metropolitan Delivery Hub',
        status: 'Doorstep Delivery to Consignee',
        description: 'Scheduled for courier dispatch with recipient OTP confirmation.',
        completed: false,
      },
    ],
  };

  // Cache in SAMPLE_SHIPMENTS so subsequent queries retain same state
  SAMPLE_SHIPMENTS[normalized] = simulated;
  return simulated;
};

// Register newly booked shipment into SAMPLE_SHIPMENTS
export const registerShipment = (newShipment: ShipmentData): void => {
  SAMPLE_SHIPMENTS[newShipment.waybillNumber] = newShipment;
};


export const DEPOT_LOCATIONS: DepotInfo[] = [
  {
    id: 'london-acton',
    name: 'London Consolidation Depot',
    type: 'uk_hub',
    address: 'Mok Nails & Cosmetics, 60 Acton High Street',
    city: 'London',
    postcode: 'W3 6LE',
    country: 'United Kingdom',
    phone: '+44 7450 637361',
    email: 'london.depot@omisore-logistics.com',
    hours: 'Mon – Sat: 08:00 – 18:30 GMT | Sun: Closed',
    services: [
      'Express Parcel Drop-Off',
      'Commercial Baggage Weighed & Sealed',
      'Doorstep Collection Coordination',
      'Live Weighing & Volumetric Scanning',
      'Air Cargo Consolidation',
    ],
    lat: 51.5074,
    lng: -0.2678,
  },
  {
    id: 'lagos-airport',
    name: 'Lagos Air Cargo Terminal',
    type: 'nigeria_gateway',
    address: 'Cargo Terminal 2, Murtala Muhammed International Airport',
    city: 'Ikeja, Lagos',
    postcode: '100001',
    country: 'Nigeria',
    phone: '+234 1 888 9200',
    email: 'lagos.aircargo@omisore-logistics.com',
    hours: 'Mon – Sat: 07:30 – 19:00 GMT+1 | 24/7 Customs Operations',
    services: [
      'Flight Reception & Aircraft Offloading',
      'Bonded Customs Clearing & PAAR Desk',
      'De-Consolidation & Sorting Hub',
      'Nationwide 36-State Courier Interconnect',
      'Cold Chain / Temperature-Controlled Bay',
    ],
    lat: 6.5774,
    lng: 3.3211,
  },
  {
    id: 'manchester-partner',
    name: 'Manchester & Midlands Consolidation Hub',
    type: 'partner_dropoff',
    address: 'Unit 9, Trafford Park Freight Village',
    city: 'Manchester',
    postcode: 'M17 1EH',
    country: 'United Kingdom',
    phone: '+44 161 820 4490',
    email: 'midlands@omisore-logistics.com',
    hours: 'Mon – Fri: 08:30 – 17:30 GMT',
    services: [
      'Heavy Pallet Drop-Off',
      'Northern UK Commercial Cargo',
      'Bi-Weekly Van Shuttles to London Heathrow',
    ],
  },
  {
    id: 'abuja-central',
    name: 'Abuja Federal Capital Regional Hub',
    type: 'nigeria_gateway',
    address: 'Plot 310, Central Business District, Near Nnamdi Azikiwe Exp.',
    city: 'Abuja, FCT',
    postcode: '900001',
    country: 'Nigeria',
    phone: '+234 9 461 8820',
    email: 'abuja@omisore-logistics.com',
    hours: 'Mon – Sat: 08:00 – 18:00 GMT+1',
    services: [
      'Government & Diplomatic Bag Handling',
      'Doorstep Delivery across Northern Nigeria',
      'Same-Day Airport Transfer from LOS Flights',
    ],
  },
];

export const SERVICE_BULLETINS: BulletinItem[] = [
  {
    id: 'bulletin-1',
    tag: 'FLIGHT CONFIRMATION',
    title: 'London Heathrow Flight OM-814 Schedule Confirmed',
    subtitle: 'Departures every Monday & Thursday 04:30 GMT to Lagos Murtala Muhammed.',
    details: 'All air cargo manifested before 17:00 Sunday and Wednesday at our London Acton Depot is guaranteed loading on Flight OM-814. Direct non-stop flight duration of 6 hours 15 minutes, with immediate apron clearance upon touchdown in Lagos LOS.',
    date: '17 Sep 2026',
    category: 'flight',
  },
  {
    id: 'bulletin-2',
    tag: 'MARITIME ADVISORY',
    title: 'Sea Freight Apapa & Onne Berthing Advisory',
    subtitle: 'Container vessels berthing dwell times running normally without terminal congestion.',
    details: 'Terminal operating efficiency at APM Terminals Apapa and West Africa Container Terminal (WACT) Onne remains optimal with average vessel waiting times under 24 hours. Full Container Loads (FCL) and LCL groupage shipments are clearing demurrage-free within the standard 72-hour discharge window.',
    date: '16 Sep 2026',
    category: 'maritime',
  },
  {
    id: 'bulletin-3',
    tag: 'CUSTOMS & REGULATORY',
    title: 'UK HMRC & Nigeria Customs Single Window Pre-Clearance',
    subtitle: 'Ensure Commercial Invoices include HS tariff classifications for expedited release.',
    details: 'Importers and senders are reminded that mandatory Form M & PAAR processing for commercial tonnage over 250kg can be pre-lodged electronically prior to flight departure. This eliminates customs physical hold delays at Lagos Cargo Terminal 2 and ensures green-lane departure directly onto last-mile delivery vehicles.',
    date: '14 Sep 2026',
    category: 'customs',
  },
];
