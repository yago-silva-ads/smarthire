/**
 * Representa o recrutador responsável por gerenciar vagas e
 * realizar a triagem manual ou revisão dos candidatos aprovados
 * pela análise automática da IA.
 */
public class Recrutador {

    // ── Atributos ──────────────────────────────────────────────────────────────
    private String id;
    private String nome;
    private String email;
    private String departamento;
    private int    totalTriagensRealizadas;

    // ── Construtores ───────────────────────────────────────────────────────────
    public Recrutador() {}

    public Recrutador(String id, String nome, String email, String departamento) {
        this.id                    = id;
        this.nome                  = nome;
        this.email                 = email;
        this.departamento          = departamento;
        this.totalTriagensRealizadas = 0;
    }

    // ── Métodos de negócio ─────────────────────────────────────────────────────
    /**
     * Aprova manualmente um candidato para a etapa de entrevista.
     *
     * @param candidato candidato a ser aprovado
     */
    public void aprovarCandidato(Candidato candidato) {
        if (candidato != null) {
            candidato.setStatus(StatusCandidato.AGUARDANDO_ENTREVISTA);
            totalTriagensRealizadas++;
            System.out.printf("[Recrutador %s] ✅ Candidato '%s' aprovado para entrevista.%n",
                nome, candidato.getNome());
        }
    }

    /**
     * Rejeita manualmente um candidato, atribuindo status REPROVADO.
     *
     * @param candidato candidato a ser reprovado
     * @param motivo    justificativa da reprovação
     */
    public void reprovarCandidato(Candidato candidato, String motivo) {
        if (candidato != null) {
            candidato.setStatus(StatusCandidato.REPROVADO);
            totalTriagensRealizadas++;
            System.out.printf("[Recrutador %s] ❌ Candidato '%s' reprovado. Motivo: %s%n",
                nome, candidato.getNome(), motivo);
        }
    }

    // ── Getters & Setters ──────────────────────────────────────────────────────
    public String getId()                      { return id; }
    public String getNome()                    { return nome; }
    public String getEmail()                   { return email; }
    public String getDepartamento()            { return departamento; }
    public int    getTotalTriagensRealizadas() { return totalTriagensRealizadas; }

    public void setId(String id)                              { this.id = id; }
    public void setNome(String nome)                          { this.nome = nome; }
    public void setEmail(String email)                        { this.email = email; }
    public void setDepartamento(String departamento)          { this.departamento = departamento; }
    public void setTotalTriagensRealizadas(int total)         { this.totalTriagensRealizadas = total; }

    // ── toString ───────────────────────────────────────────────────────────────
    @Override
    public String toString() {
        return String.format(
            "┌─────────────────────────────────────────────┐%n" +
            "│ RECRUTADOR                                  │%n" +
            "├─────────────────────────────────────────────┤%n" +
            "│ ID        : %-31s│%n" +
            "│ Nome      : %-31s│%n" +
            "│ Email     : %-31s│%n" +
            "│ Depto     : %-31s│%n" +
            "│ Triagens  : %-31d│%n" +
            "└─────────────────────────────────────────────┘",
            id, nome, email, departamento, totalTriagensRealizadas
        );
    }
}
