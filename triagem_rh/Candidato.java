import java.util.ArrayList;
import java.util.List;

public class Candidato {


    private String           id;
    private String           nome;
    private String           email;
    private String           telefone;
    private int              anosExperiencia;
    private NivelExperiencia nivel;
    private StatusCandidato  status;
    private Curriculo        curriculo;
    private List<String>     habilidades;

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

    public double calcularPontuacao(Vaga vagaReferencia) {
        int anosMaximos = 15;
        double scoreExperiencia = Math.min(anosExperiencia, anosMaximos) / (double) anosMaximos * 40.0;

        int habilidadesMax = 10;
        double scoreHabilidades = Math.min(habilidades.size(), habilidadesMax) / (double) habilidadesMax * 30.0;

        double scoreCompatibilidade = 0.0;
        if (curriculo != null && vagaReferencia != null) {
            scoreCompatibilidade = curriculo.calcularCompatibilidade(vagaReferencia) * 0.30;
        }

        double total = scoreExperiencia + scoreHabilidades + scoreCompatibilidade;
        return Math.round(total * 100.0) / 100.0;
    }

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

    public void setEmail(String email) {
        if (email == null || !email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("E-mail invalido: " + email);
        }
        this.email = email;
    }

    public void setTelefone(String telefone) {
        String digits = telefone.replaceAll("\\D", "");
        if (digits.length() < 10 || digits.length() > 11) {
            throw new IllegalArgumentException("Telefone invalido (esperado 10 ou 11 digitos): " + telefone);
        }
        this.telefone = telefone;
    }

    public void setStatus(StatusCandidato status)         { this.status = status; }
    public void setCurriculo(Curriculo curriculo)         { this.curriculo = curriculo; }
    public void setHabilidades(List<String> habilidades)  { this.habilidades = habilidades; }
    public void adicionarHabilidade(String habilidade)    { this.habilidades.add(habilidade); }

    public void setAnosExperiencia(int anos) {
        this.anosExperiencia = anos;
        this.nivel = NivelExperiencia.detectarNivel(anos);
    }

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
