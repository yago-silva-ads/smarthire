import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Motor de triagem automática do sistema de RH.
 *
 * Responsável por:
 * - Cruzar candidatos com vagas usando o score calculado;
 * - Descartar automaticamente candidatos abaixo do limiar mínimo;
 * - Gerar relatório do processo seletivo.
 */
public class TriagemAutomatica {

    // ── Constantes de limiar ───────────────────────────────────────────────────
    private static final double LIMIAR_DESCARTE = 30.0;  // abaixo disso = descartado pela IA
    private static final double LIMIAR_APROVADO = 65.0;  // acima disso = pré-aprovado

    // ── Atributos ──────────────────────────────────────────────────────────────
    private String          id;
    private Vaga            vaga;
    private List<Candidato> candidatos;
    private Recrutador      recrutadorResponsavel;

    // ── Construtores ───────────────────────────────────────────────────────────
    public TriagemAutomatica() {
        this.candidatos = new ArrayList<>();
    }

    public TriagemAutomatica(String id, Vaga vaga, Recrutador recrutador) {
        this();
        this.id                   = id;
        this.vaga                 = vaga;
        this.recrutadorResponsavel = recrutador;
    }

    // ── Métodos principais ─────────────────────────────────────────────────────

    /**
     * Registra um candidato na triagem.
     *
     * @param candidato candidato a ser adicionado
     */
    public void adicionarCandidato(Candidato candidato) {
        if (candidato != null) {
            candidatos.add(candidato);
        }
    }

    /**
     * Executa a triagem automática em todos os candidatos registrados.
     *
     * Para cada candidato:
     *   - Calcula a pontuação usando {@link Candidato#calcularPontuacao}
     *   - Atualiza o status conforme os limiares definidos
     *   - Imprime o resultado no console
     */
    public void executarTriagem() {
        System.out.println("══════════════════════════════════════════════════════");
        System.out.println("  🤖 TRIAGEM AUTOMÁTICA DE RH — " + (vaga != null ? vaga.getTitulo() : "VAGA SEM TÍTULO"));
        System.out.println("══════════════════════════════════════════════════════");

        if (candidatos.isEmpty()) {
            System.out.println("  ⚠️  Nenhum candidato registrado para triagem.");
            return;
        }

        for (Candidato c : candidatos) {
            double pontuacao = c.calcularPontuacao(vaga);

            if (pontuacao < LIMIAR_DESCARTE) {
                c.setStatus(StatusCandidato.DESCARTADO);
            } else if (pontuacao >= LIMIAR_APROVADO) {
                c.setStatus(StatusCandidato.APROVADO);
            } else {
                c.setStatus(StatusCandidato.EM_ANALISE);
            }

            System.out.printf("  %-28s | Score: %5.1f pts | %s%n",
                c.getNome(), pontuacao, c.getStatus());
        }

        System.out.println("══════════════════════════════════════════════════════");
        gerarResumo();
    }

    /**
     * Retorna os candidatos aprovados, ordenados por pontuação (maior primeiro).
     *
     * @return lista de candidatos aprovados ordenada
     */
    public List<Candidato> obterAprovados() {
        List<Candidato> aprovados = new ArrayList<>();
        for (Candidato c : candidatos) {
            if (c.getStatus() == StatusCandidato.APROVADO) {
                aprovados.add(c);
            }
        }
        aprovados.sort(Comparator.comparingDouble(
            (Candidato c) -> c.calcularPontuacao(vaga)).reversed());
        return aprovados;
    }

    /**
     * Gera e imprime um resumo estatístico da triagem.
     */
    private void gerarResumo() {
        long aprovados   = candidatos.stream().filter(c -> c.getStatus() == StatusCandidato.APROVADO).count();
        long emAnalise   = candidatos.stream().filter(c -> c.getStatus() == StatusCandidato.EM_ANALISE).count();
        long descartados = candidatos.stream().filter(c -> c.getStatus() == StatusCandidato.DESCARTADO).count();

        System.out.println("  📊 RESUMO DA TRIAGEM:");
        System.out.printf("     Total analisados : %d%n", candidatos.size());
        System.out.printf("     ✅ Aprovados      : %d%n", aprovados);
        System.out.printf("     🔵 Em análise     : %d%n", emAnalise);
        System.out.printf("     ⛔ Descartados    : %d%n", descartados);
        System.out.println("══════════════════════════════════════════════════════");
    }

    // ── Getters & Setters ──────────────────────────────────────────────────────
    public String          getId()                     { return id; }
    public Vaga            getVaga()                   { return vaga; }
    public List<Candidato> getCandidatos()             { return candidatos; }
    public Recrutador      getRecrutadorResponsavel()  { return recrutadorResponsavel; }

    public void setId(String id)                              { this.id = id; }
    public void setVaga(Vaga vaga)                            { this.vaga = vaga; }
    public void setCandidatos(List<Candidato> candidatos)     { this.candidatos = candidatos; }
    public void setRecrutadorResponsavel(Recrutador r)        { this.recrutadorResponsavel = r; }

    @Override
    public String toString() {
        return String.format("TriagemAutomatica[id=%s, vaga=%s, candidatos=%d]",
            id, vaga != null ? vaga.getTitulo() : "N/A", candidatos.size());
    }
}
