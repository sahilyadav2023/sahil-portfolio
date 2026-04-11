import { motion } from 'framer-motion';
import { PERSONAL } from '../../data/personal';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="home" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <div className="status-chip">
              <span className="status-dot" />
              Open to Opportunities
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-greeting">
            Hi there, I'm
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-name">
            {PERSONAL.firstName}
            <br />
            <span className="hero-name-last">{PERSONAL.lastName}</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="hero-role" aria-live="polite">
            <span className="role-prefix" aria-hidden="true">{'>'}&nbsp;</span>
            <span className="role-text">{PERSONAL.title}</span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-tagline">
            {PERSONAL.tagline}
          </motion.p>

          <motion.div variants={itemVariants} className="hero-ctas">
            <a
              className="btn btn-primary"
              href={`mailto:${PERSONAL.email}`}
              id="hero-contact-btn"
            >
              Contact Me
            </a>

            <button
              className="btn btn-outline"
              onClick={scrollToProjects}
              id="hero-view-projects"
            >
              View Projects
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-socials">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>

            {PERSONAL.linkedin && (
              <>
                <span className="social-sep" aria-hidden="true" />
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
              </>
            )}

            <span className="social-sep" aria-hidden="true" />
            <a href={`mailto:${PERSONAL.email}`} className="social-link">
              Email
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="scroll-line" />
        <span className="scroll-label">scroll</span>
      </motion.div>
    </section>
  );
}