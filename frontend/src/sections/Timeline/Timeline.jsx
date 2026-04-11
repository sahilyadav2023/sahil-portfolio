import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE, TYPE_COLORS } from '../../data/timeline';
import './Timeline.css';

// External link icon — shown when org name is a clickable link
const LinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

// ─── Single Timeline Item ──────────────────────────────────────────────────────

function TimelineItem({ item, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const isLeft = index % 2 === 0;
  const color  = TYPE_COLORS[item.type];

  const cardVariant = {
    hidden: { opacity: 0, x: isLeft ? -40 : 40 },
    show:   { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={ref}
      className={`tl-item ${isLeft ? 'tl-left' : 'tl-right'}`}
      role="listitem"
      aria-label={`${item.title} at ${item.organization}`}
    >
      {/* ── Card ─────────────────────────────────────────────────── */}
      <motion.div
        className="tl-card card"
        variants={cardVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
        style={{ '--tl-color': color.bg }}
      >
        {/* Badge + period + active chip */}
        <div className="tl-meta">
          <span className="tl-badge" style={{ background: color.bg }}>
            {color.label}
          </span>
          <span className="tl-period">{item.period}</span>
          {item.current && <span className="tl-current">● Active</span>}
        </div>

        {/* Icon + Title + Org name (clickable if link exists) */}
        <div className="tl-header">
          <span className="tl-icon" aria-hidden="true">{item.icon}</span>
          <div>
            <h3 className="tl-title">{item.title}</h3>

            {/* Organization name — link if `item.link` is set, hover reveals link icon */}
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tl-org tl-org-link"
                title={`View ${item.organization} verification`}
              >
                {item.organization}
                <span className="tl-org-link-icon"><LinkIcon /></span>
              </a>
            ) : (
              <span className="tl-org">{item.organization}</span>
            )}
          </div>
        </div>

        {/* Bullet list (experience) OR paragraph description */}
        {item.bullets && item.bullets.length > 0 ? (
          <ul className="tl-bullets">
            {item.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : (
          item.description && <p className="tl-desc">{item.description}</p>
        )}

        {/* Tags */}
        <div className="tl-tags">
          {item.tags.map((t) => (
            <span key={t} className="tag tl-tag">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* ── Centre dot ────────────────────────────────────────────── */}
      <motion.div
        className="tl-dot-col"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="tl-dot" style={{ background: color.bg }}>
          <div className="tl-dot-inner" />
        </div>
      </motion.div>

      {/* ── Empty side ────────────────────────────────────────────── */}
      <div className="tl-empty" aria-hidden="true" />
    </div>
  );
}

// ─── Timeline Section ─────────────────────────────────────────────────────────

export default function Timeline() {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-title">Education & Experience</h2>
          <p className="section-desc">
            The path that built the skillset — from networking basics to cloud architecture.
          </p>
        </motion.div>

        {/* Type legend */}
        <div className="tl-legend" aria-label="Timeline legend">
          {Object.entries(TYPE_COLORS).map(([type, { bg, label }]) => (
            <div key={type} className="tl-legend-item">
              <span className="tl-legend-dot" style={{ background: bg }} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="tl-wrapper" role="list">
          <div className="tl-center-line" aria-hidden="true" />
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
