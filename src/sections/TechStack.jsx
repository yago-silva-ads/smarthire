import "./TechStack.css"

const STACK = [
  { name: "Java 21", desc: "Backend — classes, enums, OOP", icon: "", color: "orange" },
  { name: "React 18", desc: "Frontend — SPA moderna", icon: "", color: "cyan" },
  { name: "Vite", desc: "Build tool ultrarrápido", icon: "", color: "purple" },
  { name: "GitHub Pages", desc: "Hospedagem estática gratuita", icon: "", color: "green" },
  { name: "CSS Vanilla", desc: "Glassmorphism & animações", icon: "", color: "pink" },
  { name: "gh-pages", desc: "Deploy automatizado", icon: "", color: "orange" },
]

export default function TechStack() {
  return (
    <section id="techstack" className="section techstack">
      <div className="container">
        <div className="techstack__header">
          <p className="section-label">Tecnologias</p>
          <h2 className="section-title">
            <span className="gradient-text">Tech Stack</span> utilizado
          </h2>
          <p className="section-sub">Ferramentas modernas para um sistema acadêmico de alto nível.</p>
        </div>

        <div className="techstack__grid">
          {STACK.map(t => (
            <div key={t.name} className={`glass-card tech-card tech-card--${t.color}`}>
              <div className="tech-card__icon">{t.icon}</div>
              <h3 className="tech-card__name">{t.name}</h3>
              <p className="tech-card__desc">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="techstack__cta">
          <a
            href="https://github.com/yago-silva-ads/smarthire"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.29 3.46.99.1-.77.41-1.29.75-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Ver código no GitHub
          </a>
          <a
            href="https://github.com/yago-silva-ads/smarthire/tree/main/triagem_rh"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Código Java
          </a>
        </div>
      </div>
    </section>
  )
}
