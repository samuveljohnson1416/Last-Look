import React from 'react';
import DecisionBlock from './DecisionBlock';
import SectionLabel from './SectionLabel';

export default function DecisionBlocks({
  options: optionsProp = null,
  selectedOptionId = 1,
  onSelectOption = () => {},
  onOpenApproval = () => {},
  isExecuting = false,
  isExecuted = false,
  authorizedOptionId = null,
}) {
  const defaultOptions = [
    {
      id: 1,
      indexStr: '01',
      rank: 'RECOMMENDED',
      action: 'Repackage and rush-deliver',
      intent: 'Fastest path to protect the Cannes screening window.',
      cost: '$8,500',
      time: '4 hours',
      residualRisk: 'Lowest residual risk',
      confidence: '94%',
      expectedBenefit: 'Guaranteed Palais Grand Lumière Gala slot preservation with clean 24.000 fps audio clock alignment.',
      whatCouldGoWrong: 'Requires immediate supervisor authorization; delay beyond 60 minutes reduces buffer margin to 2 hours.',
      evidenceBasis: 'Audio clock drift (+35.2 ms) detected in Center channel; resolved previously via standard 4h re-wrap.',
      executorAction: 'Dispatch Aspera 10Gbps re-wrap order #ASP-8842-CA and log Grafana Cloud audit annotation.',
    },
    {
      id: 2,
      indexStr: '02',
      rank: 'BALANCED',
      action: 'Request a delivery extension',
      intent: 'Avoids immediate rush cost, but depends on festival approval.',
      cost: '$0',
      time: 'Up to 24 hours',
      residualRisk: 'Medium residual risk',
      confidence: '61%',
      expectedBenefit: 'Avoids $8,500 rush fee if technical committee approves a 12-hour ingest delay window.',
      whatCouldGoWrong: 'Festival committee may reassign prime Palais screening slot to the backup gala title.',
      evidenceBasis: 'Cannes regulations permit emergency petitions up to 48 hours prior to opening night.',
      executorAction: 'Generate official Cannes ingest petition draft and record non-rush status in audit log.',
    },
    {
      id: 3,
      indexStr: '03',
      rank: 'MINIMAL',
      action: 'Submit the current package',
      intent: 'No immediate cost, but the package may fail technical QC.',
      cost: '$0',
      time: 'Immediate',
      residualRisk: 'High residual risk',
      confidence: '18%',
      expectedBenefit: 'Zero immediate cost; attempts playback using projectionist manual CP950 matrix override.',
      whatCouldGoWrong: 'Severe audio phase cancellation in Center channel; high probability of rejection at theater ingest.',
      evidenceBasis: 'SMPTE 428-7 automated conformance check failed phase alignment rule.',
      executorAction: 'Flag package as non-standard in festival registry and record supervisor disclaimer.',
    },
  ];

  return (
    <section style={{
      padding: '36px 0',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <div>
        <SectionLabel text="RESPONSE DECISION" />
        <h2 style={{
          fontSize: '26px',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.02em',
          color: 'var(--foreground)',
          marginBottom: '6px',
        }}>
          Choose a response.
        </h2>
        <p style={{
          fontSize: '15px',
          color: 'var(--muted)',
          lineHeight: 1.5,
          maxWidth: '680px',
        }}>
          The analysis is complete. DCP Sentinel will not take action until you authorize one response.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {(optionsProp && optionsProp.length ? optionsProp : defaultOptions).map((opt) => (
          <DecisionBlock
            key={opt.id}
            option={opt}
            isSelected={selectedOptionId === opt.id}
            onSelect={onSelectOption}
            onOpenApproval={onOpenApproval}
            isExecuting={isExecuting}
            isExecuted={isExecuted}
            isApproved={isExecuted && authorizedOptionId === opt.id}
          />
        ))}
      </div>
    </section>
  );
}
