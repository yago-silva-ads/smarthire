import "./Funcionalidades.css"

const FEATURES = [
  {
    icon: "",
    color: "purple",
    title: "Triagem Automática",
    desc: "O motor analisa cada candidato automaticamente, calculando score e aplicando limiares de aprovação e descarte sem intervenção humana.",
  },
  {
    icon: "",
    color: "cyan",
    title: "Score de Compatibilidade",
    desc: "Algoritmo multicritério com pesos calibrados: 40% experiência, 30% habilidades, 30% compatibilidade técnica e salarial.",
  },
  {
    icon: "",
    color: "green",
    title: "Gestão de Vagas",
    desc: "Cadastro completo com nível exigido, modalidade de contrato, habilidades obrigatórias e desejáveis, e salário base.",
  },
  {
    icon: "",
    color: "pink",
    title: "Perfil de Candidatos",
    desc: "Armazena dados profissionais, currículo detalhado, habilidades, certificações e idiomas de cada candidato.",
  },
  {
    icon: "",
    color: "orange",
    title: "Intervenção do Recrutador",
    desc: "Recrutadores podem aprovar ou reprovar manualmente candidatos em análise, complementando a triagem automática.",
  },
  {
    icon: "",
    color: "purple",
    title: "Relatório de Triagem",
    desc: "Geração automática de resumo estatístico com totais por status: aprovados, em análise e descartados.",
  },
]

export default function Funcionalidades() {
  return (
    <section id="funcionalidades" className="section funcionalidades">
      <div className="container">
        <div className="funcionalidades__header">
          <p className="section-label">Funcionalidades</p>
          <h2 className="section-title">
            Tudo que o{" "}
            <span className="gradient-text">SmartHire oferece</span>
          </h2>
          <p className="section-sub">
            Um sistema completo, do cadastro à decisão final — automatizado, transparente e eficiente.
          </p>
        </div>

        <div className="funcionalidades__grid">
          {FEATURES.map(f => (
            <div key={f.title} className={`glass-card feat-card feat-card--${f.color}`}>
              <div className={`feat-card__icon feat-card__icon--${f.color}`}>{f.icon}</div>
              <h3 className="feat-card__title">{f.title}</h3>
              <p className="feat-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
