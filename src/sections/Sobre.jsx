import "./Sobre.css"

export default function Sobre() {
  return (
    <section id="sobre" className="section sobre">
      <div className="container">
        <div className="sobre__grid">
          <div className="sobre__text">
            <p className="section-label">O Sistema</p>
            <h2 className="section-title">
              Triagem de RH{" "}
              <span className="gradient-text">inteligente e automatizada</span>
            </h2>
            <p className="sobre__desc">
              O <strong>SmartHire</strong> é um sistema moderno de triagem de Recursos Humanos
              que automatiza a análise e o descarte de currículos utilizando critérios objetivos
              e pontuação inteligente. Desenvolvido como projeto acadêmico de Estrutura de Dados no SENAC-SP.
            </p>
            <p className="sobre__desc">
              O motor de triagem automática cruza os dados dos candidatos com os requisitos das vagas,
              calculando um <strong>score de 0 a 100 pontos</strong> com pesos distribuídos em experiência,
              habilidades técnicas e compatibilidade salarial.
            </p>
            <div className="sobre__highlights">
              {[
                { icon: "", text: "Descarte automático abaixo de 30 pts" },
                { icon: "", text: "Pré-aprovação acima de 65 pts" },
                { icon: "", text: "Intervenção manual do recrutador" },
                { icon: "", text: "Relatório estatístico por triagem" },
              ].map(h => (
                <div key={h.text} className="sobre__highlight">
                  <span>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sobre__card glass-card">
            <div className="sobre__card-header">
              <div className="sobre__dots">
                <span style={{background:"#ff5f57"}} />
                <span style={{background:"#ffbd2e"}} />
                <span style={{background:"#28c840"}} />
              </div>
              <span className="sobre__card-title">triagem_output.log</span>
            </div>
            <pre className="sobre__code">
{`════════════════════════════════════
    TRIAGEM DE RH — Java Pleno
════════════════════════════════════
  Carlos Mendes   | Score: 59.3 | 🔵 Em Análise
  Bianca Torres   | Score: 40.7 | 🔵 Em Análise
  Roberto Faria   | Score: 12.0 | ⛔ Descartado
  Fernanda Cruz   | Score: 72.7 | ✅ Aprovado

    RESUMO:
     Total    : 4
     Aprovados: 1
     Análise  : 2
     Descarte : 1
════════════════════════════════════`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
