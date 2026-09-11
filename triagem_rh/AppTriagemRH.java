public class AppTriagemRH {

    public static void main(String[] args) {

        System.out.println("╔══════════════════════════════════════════════════════╗");
        System.out.println("║   SISTEMA DE TRIAGEM DE RH                                   ║");
        System.out.println("╚══════════════════════════════════════════════════════╝");
        System.out.println();

        Vaga vaga = new Vaga(
            "V001",
            "Desenvolvedor Java Pleno",
            "Engenharia de Software",
            NivelExperiencia.PLENO,
            TipoContrato.CLT,
            8000.00,
            2
        );
        vaga.adicionarHabilidadeObrigatoria("Java");
        vaga.adicionarHabilidadeObrigatoria("Spring Boot");
        vaga.adicionarHabilidadeObrigatoria("SQL");
        vaga.adicionarHabilidadeDesejavel("Docker");
        vaga.adicionarHabilidadeDesejavel("Kubernetes");
        vaga.adicionarHabilidadeDesejavel("React");

        System.out.println(vaga);
        System.out.println();

        Recrutador recrutador = new Recrutador("R001", "Ana Lima", "ana.lima@empresa.com", "RH");

        Curriculo cv1 = new Curriculo("CV001", "Desenvolvedor backend com foco em Java EE", "Ciência da Computação", 7500.00);
        cv1.adicionarHabilidade("Java");
        cv1.adicionarHabilidade("Spring Boot");
        cv1.adicionarHabilidade("SQL");
        cv1.adicionarHabilidade("Docker");
        cv1.adicionarHabilidade("Kubernetes");
        cv1.adicionarCertificacao("Oracle Certified Java SE");
        cv1.adicionarIdioma("Inglês – Avançado");

        Candidato c1 = new Candidato("C001", "Carlos Mendes", "carlos@email.com", "(11) 98000-0001", 5);
        c1.adicionarHabilidade("Java"); c1.adicionarHabilidade("Spring Boot");
        c1.adicionarHabilidade("SQL");  c1.adicionarHabilidade("Docker");
        c1.adicionarHabilidade("Git");  c1.adicionarHabilidade("REST API");
        c1.setCurriculo(cv1);

        Curriculo cv2 = new Curriculo("CV002", "Desenvolvedor com experiência em sistemas web", "Sistemas de Informação", 8500.00);
        cv2.adicionarHabilidade("Java");
        cv2.adicionarHabilidade("Python");
        cv2.adicionarHabilidade("SQL");
        cv2.adicionarIdioma("Inglês – Básico");

        Candidato c2 = new Candidato("C002", "Bianca Torres", "bianca@email.com", "(11) 98000-0002", 4);
        c2.adicionarHabilidade("Java"); c2.adicionarHabilidade("Python");
        c2.adicionarHabilidade("SQL");  c2.adicionarHabilidade("HTML");
        c2.setCurriculo(cv2);

        Curriculo cv3 = new Curriculo("CV003", "Estudante em transição de carreira", "Marketing", 4000.00);
        cv3.adicionarHabilidade("Excel");
        cv3.adicionarHabilidade("Word");
        cv3.adicionarIdioma("Espanhol – Intermediário");

        Candidato c3 = new Candidato("C003", "Roberto Faria", "roberto@email.com", "(11) 98000-0003", 0);
        c3.adicionarHabilidade("Excel"); c3.adicionarHabilidade("Canva");
        c3.setCurriculo(cv3);

        Curriculo cv4 = new Curriculo("CV004", "Arquiteto de software com larga experiência", "Engenharia de Computação", 15000.00);
        cv4.adicionarHabilidade("Java");
        cv4.adicionarHabilidade("Spring Boot");
        cv4.adicionarHabilidade("SQL");
        cv4.adicionarHabilidade("Docker");
        cv4.adicionarHabilidade("React");
        cv4.adicionarHabilidade("AWS");
        cv4.adicionarCertificacao("AWS Solutions Architect");
        cv4.adicionarIdioma("Inglês – Fluente");

        Candidato c4 = new Candidato("C004", "Fernanda Cruz", "fernanda@email.com", "(11) 98000-0004", 10);
        c4.adicionarHabilidade("Java");   c4.adicionarHabilidade("Spring Boot");
        c4.adicionarHabilidade("SQL");    c4.adicionarHabilidade("Docker");
        c4.adicionarHabilidade("React");  c4.adicionarHabilidade("AWS");
        c4.adicionarHabilidade("Kafka");  c4.adicionarHabilidade("CI/CD");
        c4.setCurriculo(cv4);

        System.out.println();
        TriagemAutomatica triagem = new TriagemAutomatica("T001", vaga, recrutador);
        triagem.adicionarCandidato(c1);
        triagem.adicionarCandidato(c2);
        triagem.adicionarCandidato(c3);
        triagem.adicionarCandidato(c4);
        triagem.executarTriagem();

        System.out.println();
        System.out.println("  CANDIDATOS PRÉ-APROVADOS (por pontuação):");
        System.out.println("  ─────────────────────────────────────────────");
        int pos = 1;
        for (Candidato aprovado : triagem.obterAprovados()) {
            double score = aprovado.calcularPontuacao(vaga);
            System.out.printf("  %dº %-25s | Score: %.1f | %s%n",
                pos++, aprovado.getNome(), score, aprovado.getNivel().getDescricao());
            System.out.println(aprovado.getCurriculo());
        }

        System.out.println();
        System.out.println("  AÇÃO DO RECRUTADOR:");
        System.out.println("  ─────────────────────────────────────────────");
        recrutador.aprovarCandidato(c2);
        recrutador.reprovarCandidato(c3, "Perfil incompatível com a área técnica");

        System.out.println();
        System.out.println(recrutador);

        System.out.println();
        System.out.println("╔══════════════════════════════════════════════════════╗");
        System.out.println("║   ✅ Triagem concluída com sucesso!                  ║");
        System.out.println("╚══════════════════════════════════════════════════════╝");
    }
}
