import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class TriagemAutomatica {


    private static final double LIMIAR_DESCARTE = 30.0;
    private static final double LIMIAR_APROVADO = 65.0;


    private String          id;
    private Vaga            vaga;
    private List<Candidato> candidatos;
    private Recrutador      recrutadorResponsavel;

    public TriagemAutomatica() {
        this.candidatos = new ArrayList<>();
    }

    public TriagemAutomatica(String id, Vaga vaga, Recrutador recrutador) {
        this();
        this.id                   = id;
        this.vaga                 = vaga;
        this.recrutadorResponsavel = recrutador;
    }

    public void adicionarCandidato(Candidato candidato) {
        if (candidato != null) {
            candidatos.add(candidato);
        }
    }

    public void executarTriagem() {
        System.out.println("══════════════════════════════════════════════════════");
        System.out.println("  TRIAGEM DE RH — " + (vaga != null ? vaga.getTitulo() : "VAGA SEM TÍTULO"));
        System.out.println("══════════════════════════════════════════════════════");

        if (candidatos.isEmpty()) {
            System.out.println("  Nenhum candidato registrado para triagem.");
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

    private void gerarResumo() {
        long aprovados   = candidatos.stream().filter(c -> c.getStatus() == StatusCandidato.APROVADO).count();
        long emAnalise   = candidatos.stream().filter(c -> c.getStatus() == StatusCandidato.EM_ANALISE).count();
        long descartados = candidatos.stream().filter(c -> c.getStatus() == StatusCandidato.DESCARTADO).count();

        System.out.println("  RESUMO DA TRIAGEM:");
        System.out.printf("     Total analisados : %d%n", candidatos.size());
        System.out.printf("     ✅ Aprovados      : %d%n", aprovados);
        System.out.printf("     🔵 Em análise     : %d%n", emAnalise);
        System.out.printf("     ⛔ Descartados    : %d%n", descartados);
        System.out.println("══════════════════════════════════════════════════════");
    }

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
