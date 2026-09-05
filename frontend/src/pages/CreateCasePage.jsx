import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

export default function CreateCasePage({ onNavigate, initialData, onSaveCase }) {
  const [formData, setFormData] = useState({
    filmTitle: initialData?.filmTitle || 'The Last Harvest',
    filmVersion: initialData?.filmVersion || 'Theatrical Premiere Master v2.4 (DCI 4K)',
    destination: initialData?.destination || 'Festival de Cannes 2026 — Grand Théâtre Lumière',
    deadline: initialData?.deadline || '2026-05-18T14:00',
    timezone: initialData?.timezone || 'CET (UTC+1) — Central European Time',
    decisionMakerName: initialData?.decisionMakerName || 'Elena Rostova',
    decisionMakerEmail: initialData?.decisionMakerEmail || 'elena.rostova@premierepost.com',
    distributor: initialData?.distributor || 'Pathé International',
    deliveryContact: initialData?.deliveryContact || 'tech-ingest@festival-cannes.fr',
    dcpStandard: initialData?.dcpStandard || 'SMPTE 428/429 (DCI Specification)',
    screeningFormat: initialData?.screeningFormat || 'Flat 1.85 (3996 × 2160)',
    subtitleRequirements: initialData?.subtitleRequirements || 'French Subtitles (SMPTE-TT XML Timed Text)',
    rushBudgetLimit: initialData?.rushBudgetLimit || '$15,000 USD',
  });

  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveCase) onSaveCase(formData);
    onNavigate('upload');
  };

  return (
    <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <SectionLabel text="NEW DELIVERY CASE" />
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
          marginBottom: '8px',
        }}>
          Where does this film need to arrive?
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Add the delivery destination and deadline. DCP Sentinel will use this context to assess risk and calculate response options.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Core Fields Group */}
        <div style={{
          padding: '28px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Film Title *
            </label>
            <input
              type="text"
              required
              className="input-quiet"
              value={formData.filmTitle}
              onChange={(e) => handleChange('filmTitle', e.target.value)}
              placeholder="e.g. The Last Harvest"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Film Version / Master Label *
            </label>
            <input
              type="text"
              required
              className="input-quiet"
              value={formData.filmVersion}
              onChange={(e) => handleChange('filmVersion', e.target.value)}
              placeholder="e.g. Theatrical Premiere Master v2.4 (DCI 4K)"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Festival Destination *
            </label>
            <select
              className="input-quiet"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
            >
              <option value="Festival de Cannes 2026 — Grand Théâtre Lumière">Festival de Cannes 2026 — Grand Théâtre Lumière</option>
              <option value="Venice Film Festival 2026 — Sala Grande">Venice Film Festival 2026 — Sala Grande</option>
              <option value="Berlinale 2026 — Berlinale Palast">Berlinale 2026 — Berlinale Palast</option>
              <option value="Sundance 2026 — Eccles Theater">Sundance 2026 — Eccles Theater</option>
              <option value="Toronto International Film Festival (TIFF) — Princess of Wales">TIFF 2026 — Princess of Wales</option>
              <option value="SXSW 2026 — Paramount Theatre">SXSW 2026 — Paramount Theatre</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Delivery Cutoff *
              </label>
              <input
                type="datetime-local"
                required
                className="input-quiet"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Timezone *
              </label>
              <select
                className="input-quiet"
                value={formData.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
              >
                <option value="CET (UTC+1) — Central European Time">CET (UTC+1) — Central European</option>
                <option value="EST (UTC-5) — Eastern Time">EST (UTC-5) — Eastern Time</option>
                <option value="PST (UTC-8) — Pacific Time">PST (UTC-8) — Pacific Time</option>
                <option value="JST (UTC+9) — Tokyo Time">JST (UTC+9) — Tokyo Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authorized Decision Maker */}
        <div style={{
          padding: '28px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
              Authorized Decision-Maker
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
              This individual holds approval authority for rush remediation and financial exposure sign-off.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                className="input-quiet"
                value={formData.decisionMakerName}
                onChange={(e) => handleChange('decisionMakerName', e.target.value)}
                placeholder="e.g. Elena Rostova"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                className="input-quiet"
                value={formData.decisionMakerEmail}
                onChange={(e) => handleChange('decisionMakerEmail', e.target.value)}
                placeholder="e.g. elena@premierepost.com"
              />
            </div>
          </div>
        </div>

        {/* Optional Accordion */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--surface)',
        }}>
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: 'var(--muted)',
              fontSize: '13px',
            }}
          >
            <span>Add technical delivery details (Optional)</span>
            {showOptional ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showOptional && (
            <div style={{
              padding: '0 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Distributor / Sales Agent
                  </label>
                  <input
                    type="text"
                    className="input-quiet"
                    value={formData.distributor}
                    onChange={(e) => handleChange('distributor', e.target.value)}
                    placeholder="e.g. Pathé International"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Festival Ingest Contact
                  </label>
                  <input
                    type="text"
                    className="input-quiet"
                    value={formData.deliveryContact}
                    onChange={(e) => handleChange('deliveryContact', e.target.value)}
                    placeholder="e.g. tech@festival-cannes.fr"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    DCP Standard
                  </label>
                  <select
                    className="input-quiet"
                    value={formData.dcpStandard}
                    onChange={(e) => handleChange('dcpStandard', e.target.value)}
                  >
                    <option value="SMPTE 428/429 (DCI Specification)">SMPTE 428/429 (DCI Standard)</option>
                    <option value="Interop DCP (Legacy)">Interop DCP (Legacy)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Screening Format
                  </label>
                  <select
                    className="input-quiet"
                    value={formData.screeningFormat}
                    onChange={(e) => handleChange('screeningFormat', e.target.value)}
                  >
                    <option value="Flat 1.85 (3996 × 2160)">Flat 1.85 (3996 × 2160)</option>
                    <option value="Scope 2.39 (4096 × 1716)">Scope 2.39 (4096 × 1716)</option>
                    <option value="Full Container (4096 × 2160)">Full Container (4096 × 2160)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
          <button
            type="button"
            className="btn-pill-secondary"
            onClick={() => onNavigate('overview')}
            style={{ height: '46px', padding: '0 24px', fontSize: '13px' }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-pill-primary"
            style={{ height: '46px', padding: '0 32px', fontSize: '14px' }}
          >
            <span>Continue to package upload</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </form>
    </div>
  );
}
