import { PERSONAL } from '../../data/personal';

export default function Contact() {
  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let’s Build Something</h2>
          <p className="section-desc">
            I’m open to internships, freelance work, and full-stack development opportunities.
          </p>
        </div>

        <div style={{ marginTop: '20px', lineHeight: '2' }}>
          <p><strong>Email:</strong> <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a></p>
          <p><strong>GitHub:</strong> <a href={PERSONAL.github} target="_blank" rel="noreferrer">{PERSONAL.github}</a></p>
          <p><strong>Location:</strong> {PERSONAL.location}</p>
        </div>
      </div>
    </section>
  );
}