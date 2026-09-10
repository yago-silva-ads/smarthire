import "./Arquitetura.css"

const CLASSES = [
  { name: "Candidato", type: "class", color: "purple",
    attrs: ["id: String", "nome: String", "email: String", "anosExperiencia: int", "habilidades: List"],
    methods: ["calcularPontuacao(vaga): double"] },
  { name: "Curriculo", type: "class", color: "cyan",
    attrs: ["id: String", "formacaoAcademica: String", "habilidadesTecnicas: List", "pretensaoSalarial: double"],
    methods: ["calcularCompatibilidade(vaga): double"] },
  { name: "Vaga", type: "class", color: "green",
    attrs: ["id: String", "titulo: String", "nivelExigido: NivelExperiencia", "salarioBase: double"],
    methods: [] },
  { name: "Recrutador", type: "class", color: "pink",
    attrs: ["id: String", "nome: String", "totalTriagens: int"],
    methods: ["aprovarCandidato(c)", "reprovarCandidato(c, motivo)"] },
  { name: "TriagemAutomatica", type: "class", color: "orange",
    attrs: ["vaga: Vaga", "candidatos: List", "LIMIAR_DESCARTE: 30", "LIMIAR_APROVADO: 65"],
    methods: ["executarTriagem()", "obterAprovados()"] },
  { name: "StatusCandidato", type: "enum", color: "purple",
    attrs: ["EM_ANALISE", "APROVADO", "REPROVADO", "DESCARTADO", "CONTRATADO"],
    methods: [] },
  { name: "NivelExperiencia", type: "enum", color: "cyan",
    attrs: ["JUNIOR", "PLENO", "SENIOR", "ESPECIALISTA"],
    methods: ["detectarNivel(anos)"] },
  { name: "TipoContrato", type: "enum", color: "green",
    attrs: ["CLT", "PJ", "ESTAGIO", "FREELANCER"],
    methods: [] },
]

export default function Arquitetura() {
  return (
    <section id="arquitetura" className="section arquitetura">
      <div className="container">
        <div className="arquitetura__header">
          <p className="section-label">Diagrama de Classes</p>
          <h2 className="section-title">
            Arquitetura do{" "}
            <span className="gradient-text">Sistema</span>
          </h2>
          <p className="section-sub">
            5 classes + 3 enumerações modeladas com orientação a objetos em Java.
          </p>
        </div>

        <div className="arquitetura__grid">
          {CLASSES.map(c => (
            <div key={c.name} className={`glass-card arch-card arch-card--${c.color}`}>
              <div className="arch-card__header">
                <span className={`arch-card__badge arch-card__badge--${c.color}`}>
                  {c.type === "enum" ? "«enum»" : "«class»"}
                </span>
                <h3 className="arch-card__name">{c.name}</h3>
              </div>
              {c.attrs.length > 0 && (
                <div className="arch-card__section">
                  <div className="arch-card__section-label">Atributos</div>
                  {c.attrs.map(a => (
                    <div key={a} className="arch-card__item arch-card__item--attr">
                      <span className="arch-card__dot" />
                      <code>{a}</code>
                    </div>
                  ))}
                </div>
              )}
              {c.methods.length > 0 && (
                <div className="arch-card__section">
                  <div className="arch-card__section-label">Métodos</div>
                  {c.methods.map(m => (
                    <div key={m} className="arch-card__item arch-card__item--method">
                      <span className="arch-card__dot arch-card__dot--method" />
                      <code>{m}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
