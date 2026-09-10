import { useState } from "react"
import { VAGA } from "../utils/scorer"
import "./FormPage.css"

const ALL_SKILLS = [
  "JavaScript", "HTML/CSS", "Git", "Lógica de Programação",
  "React", "Python", "Java", "SQL", "Node.js", "APIs REST",
  "TypeScript", "Docker", "C/C++", "PHP", "Vue.js",
  "Angular", "PostgreSQL", "MongoDB", "Linux", "Figma",
]
const CURSOS = [
  "Análise e Desenvolvimento de Sistemas",
  "Ciência da Computação",
  "Engenharia de Computação",
  "Engenharia de Software",
  "Sistemas de Informação",
  "Tecnologia da Informação",
  "Outro",
]

export default function FormPage({ onSubmit, onBack }) {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", linkedin: "", github: "",
    curso: "", semestre: "", bolsaPretendida: "",
    habilidades: [], projetos: "",
  })

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }))
  }

  const toggleSkill = (s) => {
    set("habilidades", form.habilidades.includes(s)
      ? form.habilidades.filter(h => h !== s)
      : [...form.habilidades, s])
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.nome.trim())  e.nome  = "Nome obrigatório"
    if (!form.email.includes("@")) e.email = "Email inválido"
    if (!form.telefone.trim()) e.telefone = "Telefone obrigatório"
    if (!form.curso) e.curso = "Selecione o curso"
    if (!form.semestre) e.semestre = "Informe o semestre"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (form.habilidades.length === 0) e.habilidades = "Selecione pelo menos 1 habilidade"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep3 = () => {
    const e = {}
    const b = Number(form.bolsaPretendida)
    if (!b || b < 500) e.bolsaPretendida = "Informe uma pretensão válida (mín R$ 500)"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    const valid = step === 1 ? validateStep1() : step === 2 ? validateStep2() : validateStep3()
    if (valid) {
      if (step < 3) setStep(s => s + 1)
      else onSubmit({ ...form, semestre: Number(form.semestre), bolsaPretendida: Number(form.bolsaPretendida) })
    }
  }

  const STEPS = ["Dados Pessoais", "Habilidades", "Experiência"]
  const pct = (step / 3) * 100

  return (
    <div className="form-page page">
      <div className="bg-orb bg-orb-1" />

      <main className="form-main container">
        <button onClick={onBack} className="btn btn-ghost btn-sm form-back">← Voltar para a vaga</button>

        {/* Progress */}
        <div className="form-progress">
          <div className="form-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`form-step ${step > i + 1 ? "done" : ""} ${step === i + 1 ? "active" : ""}`}>
                <div className="form-step__dot">{step > i + 1 ? "✓" : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div className="progress-bar"><div className="progress-bar__fill" style={{width: pct + "%", background: "var(--grad)"}} /></div>
        </div>

        <div className="card form-card anim-fade-up">
          <div className="form-card__header">
            <h2>{STEPS[step - 1]}</h2>
            <span className="form-card__step">Passo {step} de 3</span>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="form-body">
              <div className="form-row">
                <div className="field">
                  <label>Nome completo *</label>
                  <input value={form.nome} onChange={e => set("nome", e.target.value)} placeholder="Seu nome completo" />
                  {errors.nome && <span className="field-error">{errors.nome}</span>}
                </div>
                <div className="field">
                  <label>E-mail *</label>
                  <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="seu@email.com" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Telefone *</label>
                  <input value={form.telefone} onChange={e => set("telefone", e.target.value)} placeholder="(11) 99999-9999" />
                  {errors.telefone && <span className="field-error">{errors.telefone}</span>}
                </div>
                <div className="field">
                  <label>LinkedIn (opcional)</label>
                  <input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="linkedin.com/in/seuperfil" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Curso *</label>
                  <select value={form.curso} onChange={e => set("curso", e.target.value)}>
                    <option value="">Selecione seu curso...</option>
                    {CURSOS.map(c => <option key={c}>{c}</option>)}
                  </select>
                  {errors.curso && <span className="field-error">{errors.curso}</span>}
                </div>
                <div className="field">
                  <label>Semestre atual *</label>
                  <select value={form.semestre} onChange={e => set("semestre", e.target.value)}>
                    <option value="">Selecione...</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}º Semestre</option>
                    ))}
                  </select>
                  {errors.semestre && <span className="field-error">{errors.semestre}</span>}
                </div>
              </div>
              <div className="field">
                <label>GitHub (opcional)</label>
                <input value={form.github} onChange={e => set("github", e.target.value)} placeholder="github.com/seuperfil" />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="form-body">
              <div className="skills-header">
                <p>Selecione <strong>todas</strong> as tecnologias que você domina ou conhece:</p>
                <span className="skills-count">{form.habilidades.length} selecionada(s)</span>
              </div>

              <div className="skills-section">
                <p className="skills-section-title">🔴 Obrigatórias para a vaga</p>
                <div className="skills-checkgrid">
                  {VAGA.obrigatorias.map(s => (
                    <label key={s} className={`skill-check ${form.habilidades.includes(s) ? "checked" : ""} required`}>
                      <input type="checkbox" checked={form.habilidades.includes(s)} onChange={() => toggleSkill(s)} />
                      <span className="skill-check__box">{form.habilidades.includes(s) ? "✓" : ""}</span>
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="skills-section">
                <p className="skills-section-title">🟡 Desejáveis</p>
                <div className="skills-checkgrid">
                  {VAGA.desejaveis.map(s => (
                    <label key={s} className={`skill-check ${form.habilidades.includes(s) ? "checked" : ""}`}>
                      <input type="checkbox" checked={form.habilidades.includes(s)} onChange={() => toggleSkill(s)} />
                      <span className="skill-check__box">{form.habilidades.includes(s) ? "✓" : ""}</span>
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="skills-section">
                <p className="skills-section-title">➕ Outras tecnologias</p>
                <div className="skills-checkgrid">
                  {ALL_SKILLS.filter(s => !VAGA.obrigatorias.includes(s) && !VAGA.desejaveis.includes(s)).map(s => (
                    <label key={s} className={`skill-check ${form.habilidades.includes(s) ? "checked" : ""} other`}>
                      <input type="checkbox" checked={form.habilidades.includes(s)} onChange={() => toggleSkill(s)} />
                      <span className="skill-check__box">{form.habilidades.includes(s) ? "✓" : ""}</span>
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              {errors.habilidades && <span className="field-error">{errors.habilidades}</span>}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="form-body">
              <div className="field">
                <label>Pretensão de bolsa (R$/mês) *</label>
                <input
                  type="number" min="500" max="5000" step="100"
                  value={form.bolsaPretendida}
                  onChange={e => set("bolsaPretendida", e.target.value)}
                  placeholder="Ex: 1500"
                />
                <span className="field-hint">Bolsa base da vaga: R$ {VAGA.bolsaBase.toLocaleString("pt-BR")}/mês</span>
                {errors.bolsaPretendida && <span className="field-error">{errors.bolsaPretendida}</span>}
              </div>
              <div className="field">
                <label>Projetos / Portfólio (opcional)</label>
                <textarea
                  rows={4} value={form.projetos}
                  onChange={e => set("projetos", e.target.value)}
                  placeholder="Descreva projetos pessoais, repositórios GitHub, trabalhos acadêmicos..."
                />
              </div>
              <div className="form-summary card">
                <p className="form-summary__title">📋 Resumo do seu currículo</p>
                <div className="form-summary__rows">
                  <div className="form-summary__row"><span>Candidato</span><strong>{form.nome}</strong></div>
                  <div className="form-summary__row"><span>Curso</span><strong>{form.curso}</strong></div>
                  <div className="form-summary__row"><span>Semestre</span><strong>{form.semestre}º semestre</strong></div>
                  <div className="form-summary__row"><span>Habilidades</span><strong>{form.habilidades.length} selecionadas</strong></div>
                </div>
                <div className="form-summary__skills">
                  {form.habilidades.map(h => <span key={h} className="badge badge-purple">{h}</span>)}
                </div>
              </div>
            </div>
          )}

          <div className="form-card__footer">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="btn btn-outline">← Anterior</button>
            )}
            <button onClick={nextStep} className="btn btn-primary">
              {step < 3 ? "Próximo →" : "🤖 Analisar meu currículo"}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}