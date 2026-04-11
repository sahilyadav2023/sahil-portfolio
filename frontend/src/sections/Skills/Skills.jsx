import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '../../data/skills';
import './Skills.css';

// ─── SkillCard ────────────────────────────────────────────────────────────────
// Uses framer-motion's useInView (which wraps IntersectionObserver internally).
//
// OPTIMIZATION: IntersectionObserver is async — it fires only when an element
// enters the viewport, not on every scroll tick. This is far more efficient
// than a scroll event listener calling getBoundingClientRect() 60x/sec.
//
// `once: true` means the observer disconnects after the first intersection,
// freeing up resources — no ongoing overhead after animation fires.

function SkillCard({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="skill-card card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      style={{ '--card-accent': category.accentColor }}
    >
      {/* Card header */}
      <div className="skill-card-header">
        <span className="skill-icon" aria-hidden="true">{category.icon}</span>
        <div>
          <h3 className="skill-category">{category.category}</h3>
          <p className="skill-desc">{category.description}</p>
        </div>
      </div>

      {/* Skill pills — each animates in with stagger after the card itself */}
      <div className="skill-tags">
        {category.items.map((item, i) => (
          <motion.span
            key={item}
            className="tag skill-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.25,
              delay: index * 0.1 + i * 0.045 + 0.2,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>

      {/* Accent line at top — uses the category's unique color */}
      <div className="skill-card-accent-line" aria-hidden="true" />
    </motion.div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-desc">
            A toolkit built for securing systems, deploying cloud infrastructure,
            and writing automation that actually runs.
          </p>
        </motion.div>

        <div className="skills-grid">
          {SKILLS.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
