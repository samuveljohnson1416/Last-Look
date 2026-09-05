import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Clock, AlertTriangle, Play, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ImpactBlock from '../components/ImpactBlock';
import EvidenceSummary from '../components/EvidenceSummary';
import AgentTrace from '../components/AgentTrace';
import DecisionBlocks from '../components/DecisionBlocks';
import ExecutionRecord from '../components/ExecutionRecord';
import IncidentTimeline from '../components/IncidentTimeline';
import EvidenceDrawer from '../components/EvidenceDrawer';
import CalculationModal from '../components/CalculationModal';
import ApprovalDialog from '../components/ApprovalDialog';
import StatusDot from '../components/StatusDot';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8080';

const TIMELINE_STAGES = [
  { id: 'normal', label: 'NORMAL', time: '14:20' },
  { id: 'anomaly', label: 'ANOMALY', time: '14:22' },
  { id: 'detected', label: 'DETECTED', time: '14:22' },
  { id: 'investigated', label: 'INVESTIGATED', time: '14:22' },
  { id: 'impacted', label: 'IMPACTED', time: '14:22' },
  { id: 'decision', label: 'DECISION', time: '14:23' },
  { id: 'executed', label: 'EXECUTED', time: '14:23' },
  { id: 'recovered', label: 'RECOVERED', time: '14:24' },
];

export default function ControlRoomPage({
  onNavigate,
  isDemoMode,
  demoSecondsRemaining,
  setDemoSecondsRemaining,
  isDemoPaused,
  onResetDemo,
}) {
  // Lifecycle state: 'normal' | 'anomaly' | 'analysis' | 'decision' | 'authorized' | 'recovery'
  const [lifecycleState, setLifecycleState] = useState('decision');
  const [currentStageIndex, setCurrentStageIndex] = useState(5); // 0 to 7

  // Selected & Authorized Decision Options
  const [selectedOptionId, setSelectedOptionId] = useState(1);
  const [authorizedOptionId, setAuthorizedOptionId] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  // Modals & Drawers
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);
  const [evidenceTab, setEvidenceTab] = useState('evidence');
  const [isCalculationOpen, setIsCalculationOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  // Synchronize Demo Timer with Lifecycle States if Demo Mode is on
  useEffect(() => {
    if (!isDemoMode || isDemoPaused) return;

    const elapsed = 120 - demoSecondsRemaining;

    if (elapsed < 15 && lifecycleState !== 'normal' && lifecycleState !== 'recovery') {
      setLifecycleState('normal');
      setCurrentStageIndex(0);
    } else if (elapsed >= 15 && elapsed < 30 && lifecycleState !== 'anomaly' && lifecycleState !== 'recovery') {
      setLifecycleState('anomaly');
      setCurrentStageIndex(1);
    } else if (elapsed >= 30 && elapsed < 45 && currentStageIndex !== 2 && lifecycleState !== 'recovery') {
      setLifecycleState('analysis');
      setCurrentStageIndex(2);
    } else if (elapsed >= 45 && elapsed < 60 && currentStageIndex !== 3 && lifecycleState !== 'recovery') {
      setLifecycleState('analysis');
      setCurrentStageIndex(3);
    } else if (elapsed >= 60 && elapsed < 75 && currentStageIndex !== 4 && lifecycleState !== 'recovery') {
      setLifecycleState('analysis');
      setCurrentStageIndex(4);
    } else if (elapsed >= 75 && lifecycleState === 'analysis' && lifecycleState !== 'recovery') {
      setLifecycleState('decision');
      setCurrentStageIndex(5);
    }
  }, [demoSecondsRemaining, isDemoMode, isDemoPaused, lifecycleState, currentStageIndex]);

  // Handle stage jump via Timeline
  const handleSelectStage = (index) => {
    setCurrentStageIndex(index);
    if (index === 0) {
      setLifecycleState('normal');
      setAuthorizedOptionId(null);
      setExecutionResult(null);
    } else if (index === 1) {
      setLifecycleState('anomaly');
    } else if (index >= 2 && index <= 4) {
      setLifecycleState('analysis');
    } else if (index === 5) {
      setLifecycleState('decision');
      setAuthorizedOptionId(null);
      setExecutionResult(null);
    } else if (index >= 6) {
      setLifecycleState('recovery');
      setAuthorizedOptionId(1);
    }
  };

  const handleTriggerIncident = () => {
    setLifecycleState('decision');
    setCurrentStageIndex(5);
    setAuthorizedOptionId(null);
    setExecutionResult(null);
  };

  const handleResetToNormal = () => {
    setLifecycleState('normal');
    setCurrentStageIndex(0);
    setAuthorizedOptionId(null);
    setExecutionResult(null);
  };

  const handleOpenEvidenceTab = (tab) => {
    setEvidenceTab(tab);
    setIsEvidenceDrawerOpen(true);
  };

  const handleOpenApproval = (optionId) => {
    setSelectedOptionId(optionId);
    setIsApprovalOpen(true);
  };

  const handleConfirmApproval = async () => {
    setIsExecuting(true);
    setIsApprovalOpen(false);

    try {
      const res = await fetch(`${BACKEND_URL}/authorize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          option_id: selectedOptionId,
          approver: 'Elena Rostova · Head of Post-Production',
          timestamp: new Date().toISOString(),
          decision: selectedOptionId === 1 ? 'repackage_rush' : selectedOptionId === 2 ? 'request_extension' : 'submit_current',
        }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        setExecutionResult(data);
      }
    } catch {
      // Fallback gracefully
    }

    setTimeout(() => {
      setIsExecuting(false);
      setAuthorizedOptionId(selectedOptionId);
      setLifecycleState('recovery');
      setCurrentStageIndex(7);
    }, 1200);
  };

  const isNormal = lifecycleState === 'normal';
  const isCritical = lifecycleState !== 'normal' && lifecycleState !== 'recovery';
  const isRecovered = lifecycleState === 'recovery';

  const currentOption = {
    1: { action: 'Repackage and rush-deliver the DCP', cost: '$8,500', result: 'Protect the Cannes screening window' },
    2: { action: 'Request a delivery extension from Cannes technical committee', cost: '$0', result: 'Petition for 12h ingest delay' },
    3: { action: 'Submit the current package with manual Dolby CP950 override', cost: '$0', result: 'Proceed with current package' },
  }[selectedOptionId];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px 0',
      }}>
        {/* Top Operational Status Header */}
        <section style={{
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <SectionLabel text={
            isNormal
              ? 'LIVE DELIVERY MONITORING · CANNES 2026'
              : isRecovered
              ? 'DELIVERY RECOVERY VERIFIED'
              : 'DELIVERY INCIDENT / HUMAN DECISION REQUIRED'
          } />

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--foreground)',
            marginBottom: '12px',
            maxWidth: '1000px',
          }}>
            {isNormal
              ? 'Your Cannes delivery is on track.'
              : isRecovered
              ? 'Delivery risk cleared.'
              : 'Your DCP may miss the Cannes screening window.'}
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--muted)',
            lineHeight: 1.5,
            maxWidth: '720px',
          }}>
            {isNormal
              ? 'Package integrity, technical compliance, and delivery timing are within tolerance.'
              : isRecovered
              ? 'The updated package passed delivery validation and is ready for transfer.'
              : 'QC detected audio clock drift linked to an incompatible export preset.'}
          </p>
        </section>

        {/* 1. NORMAL MONITORING STATE */}
        {isNormal && (
          <section style={{
            padding: '36px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}>
              <div style={{ padding: '20px 24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Delivery cutoff
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)', marginTop: '6px' }}>
                  71h 45m remaining
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-deep)', marginTop: '2px' }}>
                  Jan 28 · 14:00 CET
                </div>
              </div>

              <div style={{ padding: '20px 24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--success)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <StatusDot status="success" size={5} />
                  <span>Package integrity</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)', marginTop: '6px' }}>
                  Verified
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-deep)', marginTop: '2px' }}>
                  SHA-1 checksum match
                </div>
              </div>

              <div style={{ padding: '20px 24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--success)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <StatusDot status="success" size={5} />
                  <span>QC Status</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)', marginTop: '6px' }}>
                  Passing
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-deep)', marginTop: '2px' }}>
                  Within ±0.5 ms tolerance
                </div>
              </div>

              <div style={{ padding: '20px 24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Exposure
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)', marginTop: '6px' }}>
                  $0
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-deep)', marginTop: '2px' }}>
                  Slot protected
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '12px' }}>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusDot status="success" size={6} />
                <span>Active background monitoring across DCP package streams and festival delivery requirements.</span>
              </div>

              <button
                type="button"
                className="btn-pill-secondary"
                onClick={handleTriggerIncident}
                style={{ height: '40px', padding: '0 20px', fontSize: '13px' }}
              >
                <AlertTriangle size={13} style={{ color: 'var(--warning)' }} />
                <span>Simulate QC incident</span>
              </button>
            </div>
          </section>
        )}

        {/* 2. RECOVERY STATE */}
        {isRecovered && (
          <ExecutionRecord
            onNavigate={onNavigate}
            onReset={handleResetToNormal}
            record={{
              action: selectedOptionId === 1 ? 'Repackage and rush-deliver the DCP' : selectedOptionId === 2 ? 'Request delivery extension' : 'Submit current package with override',
              approver: 'Elena Rostova · Head of Post-Production',
              timestamp: new Date().toLocaleTimeString() + ' CET',
              eta: '4 hours (Jan 26 · 18:30 CET)',
              auditStatus: 'Immutable Record Signed',
              grafanaAnnotation: 'UID annot_cannes26_8fa134d1',
            }}
          />
        )}

        {/* 3. CRITICAL / ANOMALY INCIDENT STATE */}
        {!isNormal && !isRecovered && (
          <>
            {/* Dominant Consequence / Financial Exposure */}
            <ImpactBlock
              exposureAmount={12000}
              countdownText="71h 45m until delivery cutoff"
              riskExplanation="The package risks technical rejection, rush repackaging costs, and a distributor delivery penalty."
              onOpenCalculation={() => setIsCalculationOpen(true)}
              isCritical={isCritical}
              isRecovered={isRecovered}
            />

            {/* 3-Column Evidence Summary */}
            <EvidenceSummary
              rootCause="24.000 fps export preset used for a 23.976 fps package"
              evidence="Three matching QC incidents found in delivery history"
              confidence="99.2%"
              onOpenEvidenceTab={handleOpenEvidenceTab}
            />

            {/* Stacked 01 / 02 / 03 Decision Blocks */}
            <DecisionBlocks
              selectedOptionId={selectedOptionId}
              onSelectOption={(id) => setSelectedOptionId(id)}
              onOpenApproval={handleOpenApproval}
              isExecuting={isExecuting}
              isExecuted={isRecovered}
              authorizedOptionId={authorizedOptionId}
            />

            {/* Horizontal Agent Analysis Trace */}
            <AgentTrace
              currentStepIndex={isRecovered ? 4 : 3}
              onOpenTraceDrawer={() => handleOpenEvidenceTab('trace')}
              isAuthorized={isRecovered}
            />
          </>
        )}
      </div>

      {/* Interactive Lifecycle Timeline */}
      <IncidentTimeline
        stages={TIMELINE_STAGES}
        currentStageIndex={currentStageIndex}
        onSelectStage={handleSelectStage}
      />

      {/* Sliding Evidence & Telemetry Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={() => setIsEvidenceDrawerOpen(false)}
        activeTab={evidenceTab}
        setActiveTab={setEvidenceTab}
      />

      {/* Exposure Calculation Breakdown Modal */}
      <CalculationModal
        isOpen={isCalculationOpen}
        onClose={() => setIsCalculationOpen(false)}
        totalExposure={12000}
      />

      {/* Human Authorization Dialog */}
      <ApprovalDialog
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        onConfirm={handleConfirmApproval}
        selectedOption={currentOption}
        isSubmitting={isExecuting}
      />
    </div>
  );
}
