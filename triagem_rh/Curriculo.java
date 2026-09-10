import java.util.ArrayList;
import java.util.List;

/**
 * Representa o Currículo (CV) de um candidato.
 *
 * Esta classe é central no sistema de triagem: contém as informações
 * profissionais do candidato e fornece o método {@link #calcularCompatibilidade}
 * que faz o cruzamento automático com os requisitos de uma vaga.
 */
public class Curriculo {

    // ── Atributos ──────────────────────────────────────────────────────────────
    private String       id;
    private String       resumoProfissional;
    private String       formacaoAcademica;
    private List<String> habilidadesTecnicas;
    private List<String> certificacoes;
    private List<String> idiomas;
    private double       pretensaoSalarial;

    // ── Construtores ───────────────────────────────────────────────────────────
    public Curriculo() {
        this.habilidadesTecnicas = new ArrayList<>();
        this.certificacoes       = new ArrayList<>();
        this.idiomas             = new ArrayList<>();
    }

    public Curriculo(String id, String resumoProfissional, String formacaoAcademica, double pretensaoSalarial) {
        this();
        this.id                  = id;
        this.resumoProfissional  = resumoProfissional;
        this.formacaoAcademica   = formacaoAcademica;
        this.pretensaoSalarial   = pretensaoSalarial;
    }

    // ── Método de cálculo: compatibilidade com a vaga ─────────────────────────
    /**
     * Calcula o percentual de compatibilidade deste currículo com uma Vaga.
     *
     * Critérios avaliados:
     *   1. Habilidades obrigatórias encontradas (peso 60%)
     *   2. Habilidades desejáveis encontradas   (peso 20%)
     *   3. Pretensão salarial dentro do range   (peso 20%)
     *
     * @param vaga vaga a ser comparada
     * @return valor de 0.0 a 100.0 representando a compatibilidade percentual
     */
    public double calcularCompatibilidade(Vaga vaga) {
        if (vaga == null) return 0.0;

        // ── 1. Habilidades obrigatórias (60 pts) ─────────────────────────────
        List<String> obrigatorias = vaga.getHabilidadesObrigatorias();
        double scoreObrigatorio = 0.0;
        if (!obrigatorias.isEmpty()) {
            long encontradas = habilidadesTecnicas.stream()
                .filter(h -> obrigatorias.stream()
                    .anyMatch(req -> req.equalsIgnoreCase(h)))
                .count();
            scoreObrigatorio = (encontradas / (double) obrigatorias.size()) * 60.0;
        } else {
            scoreObrigatorio = 60.0; // sem requisitos = 100% nesse critério
        }

        // ── 2. Habilidades desejáveis (20 pts) ───────────────────────────────
        List<String> desejaveis = vaga.getHabilidadesDesejaveis();
        double scoreDesejavel = 0.0;
        if (!desejaveis.isEmpty()) {
            long encontradas = habilidadesTecnicas.stream()
                .filter(h -> desejaveis.stream()
                    .anyMatch(req -> req.equalsIgnoreCase(h)))
                .count();
            scoreDesejavel = (encontradas / (double) desejaveis.size()) * 20.0;
        } else {
            scoreDesejavel = 20.0;
        }

        // ── 3. Pretensão salarial (20 pts) ───────────────────────────────────
        double salarioBase = vaga.getSalarioBase();
        double margem      = salarioBase * 0.20; // tolerância de 20%
        double scoreSalario = 0.0;
        if (pretensaoSalarial <= salarioBase + margem) {
            scoreSalario = 20.0;
        } else if (pretensaoSalarial <= salarioBase + margem * 2) {
            scoreSalario = 10.0; // aceitável com negociação
        }

        double total = scoreObrigatorio + scoreDesejavel + scoreSalario;
        return Math.round(total * 100.0) / 100.0;
    }

    // ── Getters & Setters ──────────────────────────────────────────────────────
    public String       getId()                  { return id; }
    public String       getResumoProfissional()  { return resumoProfissional; }
    public String       getFormacaoAcademica()   { return formacaoAcademica; }
    public List<String> getHabilidadesTecnicas() { return habilidadesTecnicas; }
    public List<String> getCertificacoes()       { return certificacoes; }
    public List<String> getIdiomas()             { return idiomas; }
    public double       getPretensaoSalarial()   { return pretensaoSalarial; }

    public void setId(String id)                                   { this.id = id; }
    public void setResumoProfissional(String resumo)               { this.resumoProfissional = resumo; }
    public void setFormacaoAcademica(String formacao)              { this.formacaoAcademica = formacao; }
    public void setPretensaoSalarial(double pretensao)             { this.pretensaoSalarial = pretensao; }
    public void setHabilidadesTecnicas(List<String> habilidades)   { this.habilidadesTecnicas = habilidades; }
    public void setCertificacoes(List<String> certificacoes)       { this.certificacoes = certificacoes; }
    public void setIdiomas(List<String> idiomas)                   { this.idiomas = idiomas; }

    public void adicionarHabilidade(String h)    { this.habilidadesTecnicas.add(h); }
    public void adicionarCertificacao(String c)  { this.certificacoes.add(c); }
    public void adicionarIdioma(String i)        { this.idiomas.add(i); }

    // ── toString ───────────────────────────────────────────────────────────────
    @Override
    public String toString() {
        return String.format(
            "┌─────────────────────────────────────────────┐%n" +
            "│ CURRÍCULO                                   │%n" +
            "├─────────────────────────────────────────────┤%n" +
            "│ ID         : %-31s│%n" +
            "│ Formação   : %-31s│%n" +
            "│ Skills     : %-31d│%n" +
            "│ Cert.      : %-31d│%n" +
            "│ Idiomas    : %-31d│%n" +
            "│ Pretensão  : R$ %-28.2f│%n" +
            "└─────────────────────────────────────────────┘",
            id, formacaoAcademica,
            habilidadesTecnicas.size(),
            certificacoes.size(),
            idiomas.size(),
            pretensaoSalarial
        );
    }
}
