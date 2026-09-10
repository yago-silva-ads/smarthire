/**
 * Enum que representa os possíveis status de um candidato
 * durante o processo de triagem de RH.
 */
public enum StatusCandidato {

    EM_ANALISE("Em Análise", "🔵"),
    APROVADO("Aprovado", "🟢"),
    REPROVADO("Reprovado", "🔴"),
    DESCARTADO("Descartado pela IA", "⛔"),
    AGUARDANDO_ENTREVISTA("Aguardando Entrevista", "🟡"),
    CONTRATADO("Contratado", "⭐");

    private final String descricao;
    private final String icone;

    StatusCandidato(String descricao, String icone) {
        this.descricao = descricao;
        this.icone     = icone;
    }

    public String getDescricao() { return descricao; }
    public String getIcone()     { return icone; }

    @Override
    public String toString() {
        return icone + " " + descricao;
    }
}
