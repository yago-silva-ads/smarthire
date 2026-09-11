import { useEffect, useState } from "react"
import { getStatusConfig, VAGA } from "../utils/scorer"
import "./ResultPage.css"

function AnimatedScore({ target }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = target / 40
    const interval = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(Math.round(cur * 10) / 10)
      if (cur >= target) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [target])
  return val
}

export default function ResultPage({ resultado, candidato, onNewCandidate, onDashboard }) {
  const { total, breakdown, status, matchedObrig, matchedDesej, missingObrig } = resultado
  const st = getStatusConfig(status)
  const pct = (total / 100) * 100

  const ringStyle = {
    background: `conic-gradient(${st.color} ${pct}%, rgba(255,255,255,0.06) ${pct}%)`,
  }

  return (
    <div className="result-page page">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <main className="result-main container">
        {/* Hero result */}
        <div className="result-hero anim-fade-up">
          <div className="result-status-badge" style={{background: st.bg, border: `1px solid ${st.border}`}}>
            <span>{st.icon}</span>
            <span style={{color: st.color}}>{st.label}</span>
          </div>

          <div className="result-score-ring" style={ringStyle}>
            <div className="result-score-inner">
              <span className="result-score-value" style={{color: st.color}}>
                <AnimatedScore target={total} />
              </span>
              <span className="result-score-label">/ 100</span>
              <span className="result-score-pts">pontos</span>
            </div>
          </div>

          <h2 className="result-name">{st.emoji} {candidato.nome}</h2>
          <p className="result-subtitle">
            {status === "APROVADO"
              ? "Parabéns! Seu perfil foi selecionado para a próxima etapa. Nosso RH entrará em contato em breve."
              : status === "EM_ANALISE"
              ? "Seu perfil ficará em análise com nosso recrutador. Você receberá retorno em até 5 dias úteis."
              : "Infelizmente seu perfil não atende aos requisitos mínimos desta vaga no momento."}
          </p>
        </div>

        <div className="result-grid">
          {/* Score breakdown */}
          <div className="card result-card">
            <h3>Detalhamento do Score</h3>
            <div className="score-breakdown">
              {Object.values(breakdown).map(c => (
                <div key={c.label} className="score-component">
                  <div className="score-component__head">
                    <span>{c.label}</span>
                    <span className="score-component__pts">
                      <strong style={{color: st.color}}>{c.pts}</strong>/{c.max} pts
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar__fill"
                      style={{
                        width: (c.pts / c.max * 100) + "%",
                        background: c.pts / c.max >= 0.7 ? "#10b981" : c.pts / c.max >= 0.4 ? "#6366f1" : "#ef4444",
                        transition: "width 1.2s ease"
                      }}
                    />
                  </div>
                  {c.sub && (
                    <div className="score-sub-details">
                      <span>Skills obrig.: {c.sub.obrigatorias.matched}/{c.sub.obrigatorias.total} ({c.sub.obrigatorias.pts}pts)</span>
                      <span>Skills desej.: {c.sub.desejaveis.matched}/{c.sub.desejaveis.total} ({c.sub.desejaveis.pts}pts)</span>
                      <span>Bolsa: {c.sub.bolsa.pts}pts</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills analysis */}
          <div className="card result-card">
            <h3>Análise de Skills</h3>

            {matchedObrig.length > 0 && (
              <div className="skills-analysis-section">
                <p className="skills-analysis-label skills-ok">✅ Skills obrigatórias que você tem ({matchedObrig.length})</p>
                <div className="skills-pills">
                  {matchedObrig.map(s => <span key={s} className="badge badge-green">{s}</span>)}
                </div>
              </div>
            )}

            {missingObrig.length > 0 && (
              <div className="skills-analysis-section">
                <p className="skills-analysis-label skills-missing">Skills obrigatórias ausentes ({missingObrig.length})</p>
                <div className="skills-pills">
                  {missingObrig.map(s => <span key={s} className="badge badge-red">{s}</span>)}
                </div>
              </div>
            )}

            {matchedDesej.length > 0 && (
              <div className="skills-analysis-section">
                <p className="skills-analysis-label skills-desired">Skills desejáveis que você tem ({matchedDesej.length})</p>
                <div className="skills-pills">
                  {matchedDesej.map(s => <span key={s} className="badge badge-orange">{s}</span>)}
                </div>
              </div>
            )}

            <div className="candidate-summary">
              {[
                { l: "Curso", v: candidato.curso },
                { l: "Semestre", v: `${candidato.semestre}º semestre` },
                { l: "Total de skills", v: `${candidato.habilidades.length} tecnologias` },
                { l: "Pretensão", v: `R$ ${Number(candidato.bolsaPretendida).toLocaleString("pt-BR")}/mês` },
              ].map(r => (
                <div key={r.l} className="candidate-summary__row">
                  <span>{r.l}</span><strong>{r.v}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback message */}
        <div className="result-feedback card anim-fade-up" style={{borderColor: st.border, background: st.bg}}>
          <div className="result-feedback__icon">{st.emoji}</div>
          <div>
            <strong style={{color: st.color}}>Feedback do SmartHire</strong>
            <p>
              {status === "APROVADO"
                ? `Excelente perfil! Você atendeu ${matchedObrig.length} de ${VAGA.obrigatorias.length} skills obrigatórias e demonstrou ${matchedDesej.length} habilidades desejáveis. Seu ${candidato.semestre}º semestre combina perfeitamente com o nível da vaga.`
                : status === "EM_ANALISE"
                ? `Seu perfil é promissor! ${missingObrig.length > 0 ? `Faltaram as skills: ${missingObrig.join(", ")}. ` : ""}Recomendamos fortalecer suas habilidades técnicas e aguardar avaliação do recrutador.`
                : `Infelizmente, o score de ${total} pts ficou abaixo do mínimo de 30 pts. ${missingObrig.length > 0 ? `Skills obrigatórias faltantes: ${missingObrig.join(", ")}.` : ""} Continue estudando e tente novamente!`}
            </p>
          </div>
        </div>

        <div className="result-actions">
          <button onClick={onNewCandidate} className="btn btn-primary btn-lg">
            Novo candidato
          </button>
          <button onClick={onDashboard} className="btn btn-outline btn-lg">
            Ver painel do RH
          </button>
        </div>
      </main>
    </div>
  )
}