import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import './Projects.css';

// GitHub SVG icon (inline — no external dependency)
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─── Single Project Card ───────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      className="project-card card"
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 45 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.14, ease: 'easeOut' }}
      aria-label={project.title}
    >
      {/* ── Top row: icon + category ────────────────────────────────── */}
      <div className="pc-top">
        <span className="pc-icon" aria-hidden="true">{project.icon}</span>
        <span className="tag pc-category">{project.category}</span>
      </div>

      {/* ── Title + description ──────────────────────────────────────── */}
      <div className="pc-body">
        <h3 className="pc-title">{project.title}</h3>
        <p className="pc-desc">{project.description}</p>

        {/* Highlight stat — the one cool fact about the project */}
        <div className="pc-highlight">
          <span className="pc-highlight-dot" aria-hidden="true" />
          <span>{project.highlight}</span>
        </div>
      </div>

      {/* ── Tech stack tags ──────────────────────────────────────────── */}
      <div className="pc-tech">
        {project.tech.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* ── Action buttons ──────────────────────────────────────────── */}
      <div className="pc-footer">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline pc-btn"
          id={`project-${project.id}-github`}
          aria-label={`View ${project.title} on GitHub`}
        >
          <GithubIcon />
          Source Code
        </a>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary pc-btn"
            id={`project-${project.id}-live`}
          >
            Live Demo
            <ExternalIcon />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-desc">
            A mix of cybersecurity tooling, cloud infrastructure, and DevOps automation — all real, all deployed.
          </p>
        </motion.div>

        {/* 3-column card grid */}
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Link to full GitHub profile */}
        <motion.div
          className="projects-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://github.com/NileshSharma71"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="projects-github-all"
          >
            <GithubIcon />
            View All on GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
