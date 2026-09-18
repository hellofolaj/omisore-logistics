export interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
  completed: boolean;
  isCurrent?: boolean;
}

export interface ShipmentData {
  waybillNumber: string;
  serviceType: string;
  transitMode: 'air' | 'sea' | 'road';
  origin: {
    city: string;
    country: string;
    hub: string;
  };
  destination: {
    city: string;
    country: string;
    address: string;
  };
  sender: string;
  receiver: string;
  pieces: number;
  weightKg: number;
  volumetricWeightKg?: number;
  dimensions?: string;
  contents: string;
  estimatedDelivery: string;
  currentStatus: string;
  statusPercent: number;
  events: TrackingEvent[];
}

export interface DepotInfo {
  id: string;
  name: string;
  type: 'uk_hub' | 'nigeria_gateway' | 'partner_dropoff';
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  lat?: number;
  lng?: number;
}

export interface BulletinItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  details: string;
  date: string;
  category: 'flight' | 'maritime' | 'customs';
}
