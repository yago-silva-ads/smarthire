public enum NivelExperiencia {

    ESTAGIARIO("Estagiário",  0,  1, 0.6),
    JUNIOR("Júnior",          1,  3, 1.0),
    PLENO("Pleno",            3,  6, 1.5),
    SENIOR("Sênior",          6, 10, 2.0),
    ESPECIALISTA("Especialista", 10, Integer.MAX_VALUE, 2.8);

    private final String descricao;
    private final int    anosMin;
    private final int    anosMax;

    private final double multiplicadorSalarial;

    NivelExperiencia(String descricao, int anosMin, int anosMax, double multiplicadorSalarial) {
        this.descricao             = descricao;
        this.anosMin               = anosMin;
        this.anosMax               = anosMax;
        this.multiplicadorSalarial = multiplicadorSalarial;
    }

    public String getDescricao()             { return descricao; }
    public int    getAnosMin()               { return anosMin; }
    public int    getAnosMax()               { return anosMax; }
    public double getMultiplicadorSalarial() { return multiplicadorSalarial; }

    public static NivelExperiencia detectarNivel(int anos) {
        for (NivelExperiencia nivel : values()) {
            if (anos >= nivel.anosMin && anos < nivel.anosMax) {
                return nivel;
            }
        }
        return ESPECIALISTA;
    }

    @Override
    public String toString() {
        return descricao + " (" + anosMin + "–"
                + (anosMax == Integer.MAX_VALUE ? "∞" : anosMax) + " anos)";
    }
}
