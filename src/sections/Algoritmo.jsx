import { useState } from "react"
import "./Algoritmo.css"

const WEIGHTS = [
  { label: "Anos de Experiência", pct: 40, color: "#6366f1", icon: "💼", max: "15 anos = 40 pts" },
  { label: "Habilidades Cadastradas", pct: 30, color: "#06b6d4", icon: "🛠️", max: "10 skills = 30 pts" },
  { label: "Compatibilidade Técnica", pct: 30, color: "#10b981", icon: "🎯", max: "100% = 30 pts" },
]

const THRESHOLDS = [
  { range: "0 – 29 pts", label: "Descartado", color: "#ef4444", icon: "⛔", desc: "Descarte automático pela IA" },
  { range: "30 – 64 pts", label: "Em Análise", color: "#6366f1", icon: "🔵", desc: "Revisão manual pelo recrutador" },
  { range: "65 – 100 pts", label: "Aprovado", color: "#10b981", icon: "✅", desc: "Pré-aprovado para entrevista" },
]

export default function Algoritmo() {
  const [anos, setAnos] = useState(5)
  const [skills, setSkills] = useState(6)
  const [compat, setCompat] = useState(75)

  const scoreExp = Math.min(anos, 15) / 15 * 40
  const scoreSkill = Math.min(skills, 10) / 10 * 30
  const scoreCompat = compat * 0.30
  const total = Math.min(100, Math.round((scoreExp + scoreSkill + scoreCompat) * 10) / 10)

  const getStatus = (s) => {
    if (s < 30) return { label: "Descartado pela IA", color: "#ef4444", icon: "⛔" }
    if (s < 65) return { label: "Em Análise", color: "#6366f1", icon: "🔵" }
    return { label: "Pré-Aprovado", color: "#10b981", icon: "✅" }
  }
  const st = getStatus(total)

  return (
    <section id="algoritmo" className="section algoritmo">
      <div className="container">
        <div className="algoritmo__grid">
          <div className="algoritmo__info">
            <p className="section-label">Algoritmo</p>
            <h2 className="section-title">
              Como o <span className="gradient-text">Score é calculado</span>
            </h2>

            <div className="algo__weights">
              {WEIGHTS.map(w => (
                <div key={w.label} className="algo__weight">
                  <div className="algo__weight-head">
                    <span>{w.icon} {w.label}</span>
                    <strong style={{color: w.color}}>{w.pct}%</strong>
                  </div>
                  <div className="algo__bar-bg">
                    <div className="algo__bar-fill" style={{width: w.pct + "%", background: w.color}} />
                  </div>
                  <span className="algo__weight-max">{w.max}</span>
                </div>
              ))}
            </div>

            <div className="algo__thresholds">
              <h4 className="algo__thresholds-title">Limiares de decisão</h4>
              {THRESHOLDS.map(t => (
                <div key={t.label} className="algo__threshold">
                  <span className="algo__threshold-icon">{t.icon}</span>
                  <div>
                    <div className="algo__threshold-range" style={{color: t.color}}>{t.range}</div>
                    <div className="algo__threshold-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card algoritmo__simulator">
            <h3 className="sim__title">🧮 Simulador de Score</h3>
            <p className="sim__sub">Arraste os sliders para simular a pontuação</p>

            {[
              { label: "Anos de experiência", value: anos, set: setAnos, min: 0, max: 20, suffix: " anos" },
              { label: "Nº de habilidades", value: skills, set: setSkills, min: 0, max: 10, suffix: " skills" },
              { label: "Compatibilidade (%)", value: compat, set: setCompat, min: 0, max: 100, suffix: "%" },
            ].map(sl => (
              <div key={sl.label} className="sim__slider">
                <div className="sim__slider-head">
                  <span>{sl.label}</span>
                  <strong>{sl.value}{sl.suffix}</strong>
                </div>
                <input
                  type="range" min={sl.min} max={sl.max}
                  value={sl.value} onChange={e => sl.set(Number(e.target.value))}
                  className="sim__range"
                />
              </div>
            ))}

            <div className="sim__result">
              <div className="sim__score-ring" style={{"--pct": total + "%", "--color": st.color}}>
                <div className="sim__score-inner">
                  <span className="sim__score-value">{total}</span>
                  <span className="sim__score-label">pts</span>
                </div>
              </div>
              <div className="sim__status">
                <span className="sim__status-icon">{st.icon}</span>
                <span className="sim__status-label" style={{color: st.color}}>{st.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
