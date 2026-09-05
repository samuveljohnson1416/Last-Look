import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppShell from './components/AppShell';
import TopBar from './components/TopBar';
import { useTheme } from './hooks/useTheme';

// Page Views
import OverviewPage from './pages/OverviewPage';
import CreateCasePage from './pages/CreateCasePage';
import UploadPackagePage from './pages/UploadPackagePage';
import PackageReviewPage from './pages/PackageReviewPage';
import ControlRoomPage from './pages/ControlRoomPage';
import IncidentsPage from './pages/IncidentsPage';
import CalendarPage from './pages/CalendarPage';
import AuditTrailPage from './pages/AuditTrailPage';
import SettingsPage from './pages/SettingsPage';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function App() {
  // Theme State (Default: light/white background, toggleable)
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  // Navigation Route
  const [currentRoute, setCurrentRoute] = useState('control-room');

  // Case Data State (Passed across wizard and views)
  const [caseData, setCaseData] = useState({
    filmTitle: 'The Last Harvest',
    filmVersion: 'Theatrical Premiere Master v2.4 (DCI 4K)',
    destination: 'Festival de Cannes 2026 — Grand Théâtre Lumière',
    deadline: '2026-05-18T14:00',
    timezone: 'CET (UTC+1) — Central European Time',
    decisionMakerName: 'Elena Rostova',
    decisionMakerEmail: 'elena.rostova@premierepost.com',
    distributor: 'Pathé International',
    deliveryContact: 'tech-ingest@festival-cannes.fr',
    dcpStandard: 'SMPTE 428/429 (DCI Specification)',
    screeningFormat: 'Flat 1.85 (3996 × 2160)',
    subtitleRequirements: 'French Subtitles (SMPTE-TT XML Timed Text)',
    rushBudgetLimit: '$15,000 USD',
  });

  // Demo Mode State
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [demoSecondsRemaining, setDemoSecondsRemaining] = useState(120);
  const [isDemoPaused, setIsDemoPaused] = useState(false);

  // Backend Connectivity
  const [isConnected, setIsConnected] = useState(true);

  // Backend health polling
  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/metrics`, { method: 'GET' });
        if (isMounted) setIsConnected(res.ok);
      } catch {
        if (isMounted) setIsConnected(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Demo countdown timer
  const handleResetDemo = useCallback(() => {
    setDemoSecondsRemaining(120);
  }, []);

  const demoIntervalRef = useRef(null);

  useEffect(() => {
    if (!isDemoMode || isDemoPaused) {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
      return;
    }

    demoIntervalRef.current = setInterval(() => {
      setDemoSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleResetDemo();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(demoIntervalRef.current);
  }, [isDemoMode, isDemoPaused, handleResetDemo]);

  // Navigate handler
  const handleNavigate = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppShell theme={theme}>
      {/* 1. Quiet Top Bar with Theme Toggle */}
      <TopBar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        demoState={{ timeRemaining: demoSecondsRemaining }}
        isPaused={isDemoPaused}
        togglePause={() => setIsDemoPaused(!isDemoPaused)}
        resetDemo={handleResetDemo}
        connected={isConnected}
        isCritical={true}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Main Responsive Canvas Container */}
      <main
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '36px 36px 90px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {currentRoute === 'overview' && (
          <OverviewPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'create-case' && (
          <CreateCasePage
            onNavigate={handleNavigate}
            initialData={caseData}
            onSaveCase={(data) => setCaseData(data)}
          />
        )}

        {currentRoute === 'upload' && (
          <UploadPackagePage
            onNavigate={handleNavigate}
            caseData={caseData}
          />
        )}

        {currentRoute === 'package-review' && (
          <PackageReviewPage
            onNavigate={handleNavigate}
            caseData={caseData}
          />
        )}

        {currentRoute === 'control-room' && (
          <ControlRoomPage
            onNavigate={handleNavigate}
            isDemoMode={isDemoMode}
            demoSecondsRemaining={demoSecondsRemaining}
            setDemoSecondsRemaining={setDemoSecondsRemaining}
            isDemoPaused={isDemoPaused}
            onResetDemo={handleResetDemo}
          />
        )}

        {currentRoute === 'incidents' && (
          <IncidentsPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'calendar' && (
          <CalendarPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'audit-trail' && (
          <AuditTrailPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'settings' && (
          <SettingsPage
            onNavigate={handleNavigate}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </main>
    </AppShell>
  );
}
