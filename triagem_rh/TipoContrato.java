/**
 * Enum que representa as modalidades de contratação disponíveis no sistema.
 */
public enum TipoContrato {

    CLT("CLT - Carteira Assinada"),
    PJ("PJ - Pessoa Jurídica"),
    ESTAGIO("Estágio"),
    FREELANCER("Freelancer / Projeto"),
    TEMPORARIO("Contrato Temporário");

    private final String descricao;

    TipoContrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() { return descricao; }

    @Override
    public String toString() { return descricao; }
}
