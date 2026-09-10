import java.util.ArrayList;
import java.util.List;

/**
 * Representa um candidato no sistema de triagem de RH.
 * Armazena dados pessoais, profissionais e o status atual
 * dentro do processo seletivo.
 */
public class Candidato {

    // ── Atributos ──────────────────────────────────────────────────────────────
    private String           id;
    private String           nome;
    private String           email;
    private String           telefone;
    private int              anosExperiencia;
    private NivelExperiencia nivel;
    private StatusCandidato  status;
    private Curriculo        curriculo;
    private List<String>     habilidades;

    // ── Construtores ───────────────────────────────────────────────────────────
    public Candidato() {
        this.habilidades = new ArrayList<>();
        this.status      = StatusCandidato.EM_ANALISE;
    }

    public Candidato(String id, String nome, String email, String telefone, int anosExperiencia) {
        this();
        this.id              = id;
        this.nome            = nome;
        this.email           = email;
        this.telefone        = telefone;
        this.anosExperiencia = anosExperiencia;
        this.nivel           = NivelExperiencia.detectarNivel(anosExperiencia);
    }

    // ── Método de cálculo: pontuação geral do candidato ────────────────────────
    /**
     * Calcula a pontuação geral (score) do candidato com base em:
     * - Anos de experiência (peso 40%)
     * - Quantidade de habilidades cadastradas (peso 30%)
     * - Nível de compatibilidade do currículo, se existir (peso 30%)
     *
     * Retorna um valor de 0.0 a 100.0.
     *
     * @param vagaReferencia vaga para cruzar compatibilidade
     * @return pontuação de 0 a 100
     */
    public double calcularPontuacao(Vaga vagaReferencia) {
        // Componente 1 – Experiência (máx 40 pts)
        int anosMaximos = 15; // referência de saturação
        double scoreExperiencia = Math.min(anosExperiencia, anosMaximos) / (double) anosMaximos * 40.0;

        // Componente 2 – Habilidades (máx 30 pts)
        int habilidadesMax = 10;
        double scoreHabilidades = Math.min(habilidades.size(), habilidadesMax) / (double) habilidadesMax * 30.0;

        // Componente 3 – Compatibilidade com a vaga via currículo (máx 30 pts)
        double scoreCompatibilidade = 0.0;
        if (curriculo != null && vagaReferencia != null) {
            scoreCompatibilidade = curriculo.calcularCompatibilidade(vagaReferencia) * 0.30;
        }

        double total = scoreExperiencia + scoreHabilidades + scoreCompatibilidade;
        return Math.round(total * 100.0) / 100.0; // arredonda 2 casas
    }

    // ── Getters & Setters ──────────────────────────────────────────────────────
    public String           getId()              { return id; }
    public String           getNome()            { return nome; }
    public String           getEmail()           { return email; }
    public String           getTelefone()        { return telefone; }
    public int              getAnosExperiencia() { return anosExperiencia; }
    public NivelExperiencia getNivel()           { return nivel; }
    public StatusCandidato  getStatus()          { return status; }
    public Curriculo        getCurriculo()       { return curriculo; }
    public List<String>     getHabilidades()     { return habilidades; }

    public void setId(String id)                          { this.id = id; }
    public void setNome(String nome)                      { this.nome = nome; }
    public void setEmail(String email)                    { this.email = email; }
    public void setTelefone(String telefone)              { this.telefone = telefone; }
    public void setStatus(StatusCandidato status)         { this.status = status; }
    public void setCurriculo(Curriculo curriculo)         { this.curriculo = curriculo; }
    public void setHabilidades(List<String> habilidades)  { this.habilidades = habilidades; }
    public void adicionarHabilidade(String habilidade)    { this.habilidades.add(habilidade); }

    public void setAnosExperiencia(int anos) {
        this.anosExperiencia = anos;
        this.nivel = NivelExperiencia.detectarNivel(anos); // recalcula nível
    }

    // ── toString ───────────────────────────────────────────────────────────────
    @Override
    public String toString() {
        return String.format(
            "┌─────────────────────────────────────────────┐%n" +
            "│ CANDIDATO                                   │%n" +
            "├─────────────────────────────────────────────┤%n" +
            "│ ID       : %-33s│%n" +
            "│ Nome     : %-33s│%n" +
            "│ Email    : %-33s│%n" +
            "│ Telefone : %-33s│%n" +
            "│ Exp.     : %-2d anos | Nível: %-16s│%n" +
            "│ Status   : %-33s│%n" +
            "│ Skills   : %-33d│%n" +
            "└─────────────────────────────────────────────┘",
            id, nome, email, telefone,
            anosExperiencia, nivel != null ? nivel.getDescricao() : "N/A",
            status != null ? status.toString() : "—",
            habilidades.size()
        );
    }
}
