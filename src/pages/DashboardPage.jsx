import { useState } from "react"
import { getStatusConfig } from "../utils/scorer"
import { getCandidatos, clearCandidatos } from "../utils/storage"
import "./DashboardPage.css"

const STATUS_FILTER = ["TODOS", "APROVADO", "EM_ANALISE", "DESCARTADO"]

export default function DashboardPage({ onBack, onNewCandidate }) {
  const [filter, setFilter] = useState("TODOS")
  const [candidatos, setCandidatos] = useState(getCandidatos())
  const [detail, setDetail] = useState(null)

  const filtered = filter === "TODOS"
    ? candidatos
    : candidatos.filter(c => c.resultado?.status === filter)

  const stats = {
    total: candidatos.length,
    aprovados:   candidatos.filter(c => c.resultado?.status === "APROVADO").length,
    em_analise:  candidatos.filter(c => c.resultado?.status === "EM_ANALISE").length,
    descartados: candidatos.filter(c => c.resultado?.status === "DESCARTADO").length,
    avgScore: candidatos.length
      ? Math.round(candidatos.reduce((a, c) => a + (c.resultado?.total || 0), 0) / candidatos.length * 10) / 10
      : 0,
  }

  const handleClear = () => {
    if (window.confirm("Limpar todos os candidatos? Esta ação não pode ser desfeita.")) {
      clearCandidatos()
      setCandidatos([])
    }
  }

  return (
    <div className="dash-page page">
      <div className="bg-orb bg-orb-1" />
      <main className="dash-main container">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h2>Painel do Recrutador</h2>
            <p className="dash-subtitle">Vaga: Estágio em Desenvolvimento de Software</p>
          </div>
          <div className="dash-header-actions">
            <button onClick={onNewCandidate} className="btn btn-primary btn-sm">Novo candidato</button>
            <button onClick={onBack} className="btn btn-ghost btn-sm">← Voltar</button>
          </div>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          {[
            { label: "Total Analisados", value: stats.total, color: "#6366f1", icon: "" },
            { label: "Aprovados",        value: stats.aprovados,   color: "#10b981", icon: "✅" },
            { label: "Em Análise",       value: stats.em_analise,  color: "#6366f1", icon: "🔵" },
            { label: "Descartados",      value: stats.descartados, color: "#ef4444", icon: "⛔" },
            { label: "Score Médio",      value: stats.avgScore + "pts", color: "#f59e0b", icon: "" },
          ].map(s => (
            <div key={s.label} className="card dash-stat">
              <span className="dash-stat__icon">{s.icon}</span>
              <span className="dash-stat__value" style={{color: s.color}}>{s.value}</span>
              <span className="dash-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="dash-filters">
          {STATUS_FILTER.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`}
            >
              {f === "TODOS" ? `Todos (${stats.total})` :
               f === "APROVADO" ? `✅ Aprovados (${stats.aprovados})` :
               f === "EM_ANALISE" ? `🔵 Em Análise (${stats.em_analise})` :
               `⛔ Descartados (${stats.descartados})`}
            </button>
          ))}
          {candidatos.length > 0 && (
            <button onClick={handleClear} className="btn btn-danger btn-sm" style={{marginLeft:"auto"}}>
              Limpar tudo
            </button>
          )}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="dash-empty card">
            <p className="dash-empty__icon">{candidatos.length === 0 ? "" : ""}</p>
            <p className="dash-empty__title">
              {candidatos.length === 0 ? "Nenhum candidato analisado ainda" : "Nenhum candidato nesse filtro"}
            </p>
            <p className="dash-empty__sub">
              {candidatos.length === 0 ? "Candidatos analisados aparecerão aqui em tempo real." : "Tente outro filtro."}
            </p>
            {candidatos.length === 0 && (
              <button onClick={onNewCandidate} className="btn btn-primary" style={{marginTop: 16}}>
                Analisar primeiro candidato
              </button>
            )}
          </div>
        ) : (
          <div className="dash-table card">
            <div className="dash-table__header">
              <span>Candidato</span>
              <span>Curso / Semestre</span>
              <span>Skills</span>
              <span>Score</span>
              <span>Status</span>
              <span>Ações</span>
            </div>
            {filtered.map(c => {
              const st = getStatusConfig(c.resultado?.status)
              const score = c.resultado?.total || 0
              return (
                <div key={c.id} className="dash-table__row">
                  <div className="dash-table__cell dash-candidate">
                    <div className="dash-avatar" style={{background: st.color + "22", color: st.color}}>
                      {c.nome?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <div className="dash-candidate__name">{c.nome}</div>
                      <div className="dash-candidate__email">{c.email}</div>
                    </div>
                  </div>
                  <div className="dash-table__cell">
                    <div style={{fontSize:13}}>{c.curso?.split(" ").slice(0,3).join(" ")}</div>
                    <div style={{fontSize:12, color:"var(--text3)"}}>{c.semestre}º sem.</div>
                  </div>
                  <div className="dash-table__cell">
                    <span className="badge badge-purple">{c.habilidades?.length || 0} skills</span>
                  </div>
                  <div className="dash-table__cell">
                    <div className="dash-score-bar">
                      <div className="dash-score-bar__fill" style={{width: score + "%", background: st.color}} />
                    </div>
                    <span style={{fontSize:14, fontWeight:700, fontFamily:"var(--mono)", color: st.color}}>
                      {score}
                    </span>
                  </div>
                  <div className="dash-table__cell">
                    <span className="dash-status-badge" style={{background: st.bg, border: `1px solid ${st.border}`, color: st.color}}>
                      {st.icon} {st.label.split(" ")[0]}
                    </span>
                  </div>
                  <div className="dash-table__cell">
                    <button onClick={() => setDetail(c)} className="btn btn-ghost btn-sm">Ver</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Detail Modal */}
        {detail && (
          <div className="dash-modal-overlay" onClick={() => setDetail(null)}>
            <div className="card dash-modal" onClick={e => e.stopPropagation()}>
              <div className="dash-modal__header">
                <h3>Detalhes — {detail.nome}</h3>
                <button onClick={() => setDetail(null)} className="btn btn-ghost btn-sm">✕</button>
              </div>
              <div className="dash-modal__body">
                {[
                  { l: "Email", v: detail.email },
                  { l: "Telefone", v: detail.telefone },
                  { l: "Curso", v: detail.curso },
                  { l: "Semestre", v: `${detail.semestre}º` },
                  { l: "Bolsa pretendida", v: `R$ ${Number(detail.bolsaPretendida).toLocaleString("pt-BR")}` },
                  { l: "Score", v: `${detail.resultado?.total} / 100 pts` },
                ].map(r => (
                  <div key={r.l} className="dash-modal__row">
                    <span>{r.l}</span><strong>{r.v}</strong>
                  </div>
                ))}
                <div className="dash-modal__skills">
                  <span style={{fontSize:12, color:"var(--text3)", fontWeight:700}}>HABILIDADES</span>
                  <div style={{display:"flex", flexWrap:"wrap", gap:6, marginTop:8}}>
                    {(detail.habilidades||[]).map(h => <span key={h} className="badge badge-purple">{h}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}