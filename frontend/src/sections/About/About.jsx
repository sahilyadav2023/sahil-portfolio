import { motion } from 'framer-motion';
import heroImg from '../../assets/hero.jpeg';
import { PERSONAL } from '../../data/personal';
import './About.css';

const CERTIFICATIONS = [
  { name: 'Internship Certificate — Web Development', issuer: 'AIC-JKLU Foundation' },
  { name: 'GRiD Project Delivery', issuer: 'AIC-JKLU Foundation' },
  { name: 'Uni-verse ERP Collaboration', issuer: 'Team Project' },
  { name: 'Jaipur Health Club Development', issuer: 'Project Work' },
];

const STATS = [
  { value: '2', label: 'Months Internship' },
  { value: '3+', label: 'Projects Built' },
  { value: '1', label: 'Verified Certificate' },
];

const slideLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };
const slideRight = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } };
const transition = { duration: 0.65, ease: 'easeOut' };

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-photo-col"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <div className="photo-frame">
              <div className="photo-bg-box" aria-hidden="true" />
              <img
                src={heroImg}
                alt="Sahil Yadav"
                className="about-photo"
                loading="lazy"
              />
              <a href="https://jklu.edu.in" target="_blank" rel="noopener noreferrer">
                <div className="photo-badge">
                  <span>🎓</span>
                  <span>B.Tech · JKLU</span>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: 0.15 }}
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title">Hello, I'm Sahil 👋</h2>

            <div className="status-chip about-status">
              <span className="status-dot" />
              Open to Opportunities
            </div>

            <div className="about-bio">
              <p>
                I'm a B.Tech student at <strong>JK Lakshmipat University</strong>, Jaipur, and a
                full-stack developer focused on building practical web products with real-world use.
              </p>
              <p>
                My work includes career platforms, health and fitness applications, and university ERP
                systems. During my internship at <strong>AIC-JKLU Foundation</strong>, I worked on
                <strong> GRiD</strong>, a student-focused career advancement platform built with a
                full-stack approach.
              </p>
              <p>
                I enjoy turning ideas into scalable products using modern frontend frameworks,
                backend APIs, and database-driven systems.
              </p>
            </div>

            <div className="about-stats">
              {STATS.map(({ value, label }) => (
                <div className="stat-card" key={label}>
                  <span className="stat-num">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>

            <div className="cert-list">
              {CERTIFICATIONS.map(({ name, issuer }) => (
                <span className="cert-badge" key={name} title={`Issued by ${issuer}`}>
                  {name}
                </span>
              ))}
            </div>

            <div className="about-ctas">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                GitHub
              </a>

              {PERSONAL.linkedin && (
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}