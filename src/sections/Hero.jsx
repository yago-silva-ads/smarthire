import { useEffect, useState } from "react"
import "./Hero.css"

const WORDS = ["Currículos", "Candidatos", "Talentos", "Perfis"]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = WORDS[wordIndex]
    let timeout

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIndex((wordIndex + 1) % WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  return (
    <section id="home" className="hero">
      <div className="hero__bg-grid" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Sistema em funcionamento — Java + React
        </div>

        <h1 className="hero__title">
          Triagem Inteligente de{" "}
          <span className="hero__typewriter">
            {displayed}
            <span className="hero__cursor">|</span>
          </span>
          <br />
          <span className="gradient-text">Automatizada e Inteligente</span>
        </h1>

        <p className="hero__sub">
          O <strong>SmartHire</strong> automatiza a análise de currículos, calcula scores de compatibilidade
          e descarta candidatos fora do perfil — tudo em segundos, com critérios transparentes.
        </p>

        <div className="hero__actions">
          <a
            href="https://github.com/yago-silva-ads/smarthire"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.29 3.46.99.1-.77.41-1.29.75-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Ver no GitHub
          </a>
          <a href="#sobre" className="btn btn-outline">Saiba mais →</a>
        </div>

        <div className="hero__stats">
          {[
            { value: "5", label: "Classes Java" },
            { value: "3", label: "Enumerações" },
            { value: "100", label: "Pts de Score" },
            { value: "Auto", label: "Triagem" },
          ].map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value gradient-text">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>Role para explorar</span>
        <div className="hero__scroll-arrow" />
      </div>
    </section>
  )
}
