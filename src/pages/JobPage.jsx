import { VAGA } from "../utils/scorer"
import "./JobPage.css"

export default function JobPage({ onApply, onDashboard }) {
  return (
    <div className="job-page page">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <main className="job-main container">
        {/* Hero */}
        <div className="job-hero anim-fade-up">
          <div className="job-hero__badge">
            <span className="job-live-dot" /> Vaga aberta · Candidaturas ativas
          </div>
          <h1 className="job-hero__title">
            {VAGA.titulo}<br />
            <span className="grad-text">para Estagiários Tech</span>
          </h1>
          <p className="job-hero__sub">
            Faça parte do nosso time de engenharia. Análise inteligente de currículos
            em tempo real — saiba seu resultado em segundos.
          </p>
          <div className="job-hero__meta">
            {[
              { icon: "", text: VAGA.empresa },
              { icon: "", text: VAGA.local },
              { icon: "", text: VAGA.carga },
              { icon: "", text: VAGA.modalidade },
            ].map(m => (
              <span key={m.text} className="job-meta-pill">
                {m.icon} {m.text}
              </span>
            ))}
          </div>
        </div>

        <div className="job-grid">
          {/* Left: Details */}
          <div className="job-details anim-fade-up">

            {/* About */}
            <div className="card job-card">
              <h3>Sobre a Vaga</h3>
              <p className="job-card__text">{VAGA.descricao}</p>
            </div>

            {/* Required skills */}
            <div className="card job-card">
              <h3>Habilidades Obrigatórias</h3>
              <p className="job-card__hint">Candidatos sem essas skills terão pontuação reduzida</p>
              <div className="skills-grid">
                {VAGA.obrigatorias.map(s => (
                  <span key={s} className="skill-tag skill-tag--required">{s}</span>
                ))}
              </div>
            </div>

            {/* Desired skills */}
            <div className="card job-card">
              <h3>Habilidades Desejáveis</h3>
              <p className="job-card__hint">Aumentam significativamente sua pontuação</p>
              <div className="skills-grid">
                {VAGA.desejaveis.map(s => (
                  <span key={s} className="skill-tag skill-tag--desired">{s}</span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="card job-card">
              <h3>Benefícios</h3>
              <div className="benefits-list">
                {VAGA.beneficios.map(b => (
                  <div key={b} className="benefit-item">
                    <span className="benefit-check">✓</span>{b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Apply card */}
          <div className="job-apply-col anim-fade-up">
            <div className="card job-apply-card">
              <div className="job-apply-card__salary">
                <span className="job-apply-card__label">Bolsa</span>
                <span className="job-apply-card__value grad-text">
                  R$ {VAGA.bolsaBase.toLocaleString("pt-BR")}<span>/mês</span>
                </span>
              </div>

              <div className="job-apply-card__info">
                {[
                  { l: "Tipo", v: VAGA.tipo },
                  { l: "Carga horária", v: VAGA.carga },
                  { l: "Modalidade", v: VAGA.modalidade },
                  { l: "Área", v: VAGA.departamento },
                ].map(i => (
                  <div key={i.l} className="job-apply-card__row">
                    <span>{i.l}</span><strong>{i.v}</strong>
                  </div>
                ))}
              </div>

              <button onClick={onApply} className="btn btn-primary btn-lg" style={{width:"100%", justifyContent:"center"}}>
                Candidatar-se agora
              </button>
              <p className="job-apply-card__note">
                Análise automática — resultado imediato
              </p>

              <div className="job-apply-card__divider" />

              <div className="job-algo-preview">
                <p className="job-algo-preview__title">Como o score é calculado</p>
                {[
                  { label: "Semestre / Exp.", pts: 40, color: "#6366f1" },
                  { label: "Amplitude de Skills", pts: 30, color: "#06b6d4" },
                  { label: "Match com a Vaga", pts: 30, color: "#10b981" },
                ].map(c => (
                  <div key={c.label} className="job-algo-row">
                    <span>{c.label}</span>
                    <div style={{flex:1, height:4, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden"}}>
                      <div style={{height:"100%", width: c.pts + "%", background: c.color, borderRadius:2}} />
                    </div>
                    <span style={{color: c.color, fontWeight:700, fontSize:13}}>{c.pts}pts</span>
                  </div>
                ))}
                <div className="job-thresholds">
                  {[
                    { range:"≥ 65", label:"Aprovado", c:"#10b981" },
                    { range:"30–64", label:"Em Análise", c:"#6366f1" },
                    { range:"< 30", label:"Descartado", c:"#ef4444" },
                  ].map(t => (
                    <div key={t.range} className="job-threshold" style={{borderColor: t.c + "40", background: t.c + "12"}}>
                      <span style={{color:t.c, fontWeight:700}}>{t.range}</span>
                      <span style={{fontSize:11, color: t.c}}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={onDashboard} className="btn btn-ghost" style={{width:"100%", justifyContent:"center"}}>
              Painel do Recrutador
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}