import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RegulatoryBanner } from './components/RegulatoryBanner';
import { DocumentParcelSection } from './components/DocumentParcelSection';
import { CargoShippingSection } from './components/CargoShippingSection';
import { ServiceUpdatesSection } from './components/ServiceUpdatesSection';
import { BilateralCorridorSection } from './components/BilateralCorridorSection';
import { Footer } from './components/Footer';

// Modals
import { TrackingModal } from './components/TrackingModal';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { ShipNowModal } from './components/ShipNowModal';
import { DepotLocatorModal } from './components/DepotLocatorModal';
import { CorridorSolutionsModal } from './components/CorridorSolutionsModal';
import { CustomerPortalModal } from './components/CustomerPortalModal';

export default function App() {
  // Modal States
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [activeWaybill, setActiveWaybill] = useState('OMI-UKNG-2026-00124');

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [shipOpen, setShipOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<any>(null);

  const [depotOpen, setDepotOpen] = useState(false);
  const [activeDepotId, setActiveDepotId] = useState('london-acton');

  const [corridorOpen, setCorridorOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  // Handlers
  const handleOpenTracking = (waybill?: string) => {
    if (waybill) {
      setActiveWaybill(waybill);
    }
    setTrackingOpen(true);
  };

  const handleProceedToShipFromQuote = (quoteData: any) => {
    setPrefillData(quoteData);
    setQuoteOpen(false);
    setShipOpen(true);
  };

  const handleBookingSuccess = (newWaybill: string) => {
    setShipOpen(false);
    setActiveWaybill(newWaybill);
    setTrackingOpen(true);
  };

  const handleOpenDepot = (depotId?: string) => {
    if (depotId) {
      setActiveDepotId(depotId);
    }
    setDepotOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F6] text-[#15110F] font-sans selection:bg-[#5C0F1E] selection:text-white">
      {/* Top Header */}
      <Header
        onOpenTrack={() => handleOpenTracking()}
        onOpenQuote={() => setQuoteOpen(true)}
        onOpenShip={() => setShipOpen(true)}
        onOpenDepot={() => handleOpenDepot()}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenCorridor={() => setCorridorOpen(true)}
      />

      {/* Main Page Flow mirroring the exact design */}
      <main className="grow">
        {/* 1. Hero Section with Live Tracking Gateway & Quick Actions */}
        <HeroSection
          onTrack={(wb) => handleOpenTracking(wb)}
          onOpenShip={() => setShipOpen(true)}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenBusiness={() => setCorridorOpen(true)}
          onSelectTransitMode={(mode) => {
            if (mode === 'sea') {
              const el = document.getElementById('freight-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            } else if (mode === 'road' || mode === 'air') {
              const el = document.getElementById('parcels-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            } else if (mode === 'depot') {
              handleOpenDepot('london-acton');
            } else if (mode === 'tarmac') {
              handleOpenDepot('lagos-airport');
            }
          }}
        />

        {/* 2. Regulatory Trade Notice (Gold Banner) */}
        <RegulatoryBanner
          onExplore={() => setCorridorOpen(true)}
        />

        {/* 3. Document and Parcel Shipping Section (with Van Image Card) */}
        <DocumentParcelSection
          onExploreExpress={() => setQuoteOpen(true)}
          onOpenShip={() => setShipOpen(true)}
        />

        {/* 4. Cargo Shipping Section (with Ocean Container Ship Image Card) */}
        <CargoShippingSection
          onExploreCargo={() => setCorridorOpen(true)}
          onOpenQuote={() => setQuoteOpen(true)}
        />

        {/* 5. Important Service Updates & Bulletin Advisories */}
        <ServiceUpdatesSection
          onSelectBulletin={() => {}}
        />

        {/* 6. Bilateral Corridor Presence (London Depot & Lagos Terminal Cards) */}
        <BilateralCorridorSection
          onOpenDepotModal={(id) => handleOpenDepot(id)}
          onOpenCorridorInfo={() => setCorridorOpen(true)}
        />
      </main>

      {/* Corporate Logistics Footer */}
      <Footer
        onOpenTrack={() => handleOpenTracking()}
        onOpenQuote={() => setQuoteOpen(true)}
        onOpenShip={() => setShipOpen(true)}
        onOpenDepot={() => handleOpenDepot()}
        onOpenCorridor={() => setCorridorOpen(true)}
      />

      {/* Interactive Modals */}
      {trackingOpen && (
        <TrackingModal
          isOpen={trackingOpen}
          initialWaybill={activeWaybill}
          onClose={() => setTrackingOpen(false)}
          onOpenShip={() => { setTrackingOpen(false); setShipOpen(true); }}
        />
      )}

      {quoteOpen && (
        <QuoteCalculatorModal
          isOpen={quoteOpen}
          onClose={() => setQuoteOpen(false)}
          onProceedToShip={handleProceedToShipFromQuote}
        />
      )}

      {shipOpen && (
        <ShipNowModal
          isOpen={shipOpen}
          prefillData={prefillData}
          onClose={() => setShipOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {depotOpen && (
        <DepotLocatorModal
          isOpen={depotOpen}
          initialDepotId={activeDepotId}
          onClose={() => setDepotOpen(false)}
        />
      )}

      {corridorOpen && (
        <CorridorSolutionsModal
          isOpen={corridorOpen}
          onClose={() => setCorridorOpen(false)}
          onOpenShip={() => setShipOpen(true)}
        />
      )}

      {portalOpen && (
        <CustomerPortalModal
          isOpen={portalOpen}
          onClose={() => setPortalOpen(false)}
          onTrackShipment={(waybill) => {
            setPortalOpen(false);
            setActiveWaybill(waybill);
            setTrackingOpen(true);
          }}
        />
      )}
    </div>
  );
}
