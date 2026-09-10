import { useEffect, useState } from "react"
import "./AnalyzingPage.css"

const STEPS_MSGS = [
  { msg: "Recebendo currículo...", icon: "📥", pct: 5 },
  { msg: "Extraindo habilidades técnicas...", icon: "🔍", pct: 20 },
  { msg: "Verificando skills obrigatórias...", icon: "✅", pct: 38 },
  { msg: "Calculando score de experiência...", icon: "💼", pct: 54 },
  { msg: "Analisando compatibilidade salarial...", icon: "💰", pct: 68 },
  { msg: "Computando score final...", icon: "🧮", pct: 82 },
  { msg: "Tomando decisão automática...", icon: "🤖", pct: 94 },
  { msg: "Análise concluída!", icon: "⚡", pct: 100 },
]

export default function AnalyzingPage({ candidato, onDone }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < STEPS_MSGS.length - 1) {
        i++
        setStepIdx(i)
        setPct(STEPS_MSGS[i].pct)
      } else {
        clearInterval(interval)
        setTimeout(onDone, 600)
      }
    }, 420)
    return () => clearInterval(interval)
  }, [onDone])

  const current = STEPS_MSGS[stepIdx]

  return (
    <div className="analyzing-page page">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <div className="analyzing-center container">
        {/* Animated AI Brain */}
        <div className="ai-brain">
          <div className="ai-brain__ring ai-brain__ring--1" />
          <div className="ai-brain__ring ai-brain__ring--2" />
          <div className="ai-brain__ring ai-brain__ring--3" />
          <div className="ai-brain__core">
            <span className="ai-brain__icon">{current.icon}</span>
          </div>
        </div>

        <h2 className="analyzing-title">
          Analisando currículo de<br />
          <span className="grad-text">{candidato.nome}</span>
        </h2>

        <p className="analyzing-msg">{current.msg}</p>

        {/* Progress */}
        <div className="analyzing-progress">
          <div className="analyzing-progress__bar">
            <div className="analyzing-progress__fill" style={{width: pct + "%"}} />
          </div>
          <span className="analyzing-progress__pct">{pct}%</span>
        </div>

        {/* Step log */}
        <div className="analyzing-log">
          {STEPS_MSGS.slice(0, stepIdx + 1).map((s, i) => (
            <div key={i} className={`analyzing-log__item ${i === stepIdx ? "active" : "done"}`}>
              <span className="analyzing-log__icon">{i < stepIdx ? "✓" : "●"}</span>
              <span>{s.msg}</span>
            </div>
          ))}
        </div>

        {/* Skill preview */}
        <div className="analyzing-skills">
          {candidato.habilidades.slice(0, 8).map((h, i) => (
            <span
              key={h}
              className="analyzing-skill-pill"
              style={{ animationDelay: (i * 0.08) + "s" }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}