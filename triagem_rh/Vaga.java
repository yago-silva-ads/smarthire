import java.util.ArrayList;
import java.util.List;

/**
 * Representa uma vaga de emprego publicada no sistema de triagem de RH.
 * Contém requisitos obrigatórios e desejáveis usados para cruzamento
 * automático com os currículos dos candidatos.
 */
public class Vaga {

    // ── Atributos ──────────────────────────────────────────────────────────────
    private String           id;
    private String           titulo;
    private String           descricao;
    private String           departamento;
    private NivelExperiencia nivelExigido;
    private TipoContrato     tipoContrato;
    private double           salarioBase;
    private List<String>     habilidadesObrigatorias;
    private List<String>     habilidadesDesejaveis;
    private boolean          ativa;
    private int              vagasDisponiveis;

    // ── Construtores ───────────────────────────────────────────────────────────
    public Vaga() {
        this.habilidadesObrigatorias = new ArrayList<>();
        this.habilidadesDesejaveis   = new ArrayList<>();
        this.ativa                   = true;
    }

    public Vaga(String id, String titulo, String departamento,
                NivelExperiencia nivelExigido, TipoContrato tipoContrato,
                double salarioBase, int vagasDisponiveis) {
        this();
        this.id               = id;
        this.titulo           = titulo;
        this.departamento     = departamento;
        this.nivelExigido     = nivelExigido;
        this.tipoContrato     = tipoContrato;
        this.salarioBase      = salarioBase;
        this.vagasDisponiveis = vagasDisponiveis;
    }

    // ── Getters & Setters ──────────────────────────────────────────────────────
    public String           getId()                       { return id; }
    public String           getTitulo()                   { return titulo; }
    public String           getDescricao()                { return descricao; }
    public String           getDepartamento()             { return departamento; }
    public NivelExperiencia getNivelExigido()             { return nivelExigido; }
    public TipoContrato     getTipoContrato()             { return tipoContrato; }
    public double           getSalarioBase()              { return salarioBase; }
    public List<String>     getHabilidadesObrigatorias()  { return habilidadesObrigatorias; }
    public List<String>     getHabilidadesDesejaveis()    { return habilidadesDesejaveis; }
    public boolean          isAtiva()                     { return ativa; }
    public int              getVagasDisponiveis()         { return vagasDisponiveis; }

    public void setId(String id)                             { this.id = id; }
    public void setTitulo(String titulo)                     { this.titulo = titulo; }
    public void setDescricao(String descricao)               { this.descricao = descricao; }
    public void setDepartamento(String departamento)         { this.departamento = departamento; }
    public void setNivelExigido(NivelExperiencia nivel)      { this.nivelExigido = nivel; }
    public void setTipoContrato(TipoContrato tipoContrato)   { this.tipoContrato = tipoContrato; }
    public void setSalarioBase(double salarioBase)           { this.salarioBase = salarioBase; }
    public void setAtiva(boolean ativa)                      { this.ativa = ativa; }
    public void setVagasDisponiveis(int vagas)               { this.vagasDisponiveis = vagas; }

    public void adicionarHabilidadeObrigatoria(String h) { this.habilidadesObrigatorias.add(h); }
    public void adicionarHabilidadeDesejavel(String h)   { this.habilidadesDesejaveis.add(h); }

    // ── toString ───────────────────────────────────────────────────────────────
    @Override
    public String toString() {
        return String.format(
            "┌─────────────────────────────────────────────┐%n" +
            "│ VAGA                                        │%n" +
            "├─────────────────────────────────────────────┤%n" +
            "│ ID          : %-31s│%n" +
            "│ Título      : %-31s│%n" +
            "│ Depto       : %-31s│%n" +
            "│ Nível       : %-31s│%n" +
            "│ Contrato    : %-31s│%n" +
            "│ Salário Base: R$ %-28.2f│%n" +
            "│ Vagas       : %-31d│%n" +
            "│ Ativa       : %-31s│%n" +
            "└─────────────────────────────────────────────┘",
            id, titulo, departamento,
            nivelExigido != null ? nivelExigido.getDescricao() : "—",
            tipoContrato != null ? tipoContrato.getDescricao() : "—",
            salarioBase, vagasDisponiveis,
            ativa ? "Sim" : "Não"
        );
    }
}
