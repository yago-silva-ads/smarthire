<div align="center">

<img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub%20Pages-Live-4078C8?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/SENAC--SP-2026-red?style=for-the-badge" />

# ⚡ SmartHire — Triagem de RH Automatizada

> **Sistema moderno de triagem automática de currículos com scoring inteligente, descarte automático e intervenção manual de recrutadores.**

🌐 **[Ver site ao vivo →](https://yago-silva-ads.github.io/smarthire)**

---

</div>

## 📌 Sobre o Projeto

O **SmartHire** é um sistema de triagem de Recursos Humanos desenvolvido como projeto acadêmico na disciplina de **Estrutura de Dados** do curso de Análise e Desenvolvimento de Sistemas no **SENAC-SP (2026)**.

O sistema automatiza a análise de currículos, calculando um **score de compatibilidade de 0 a 100 pontos** para cada candidato com base em critérios objetivos, e toma decisões automáticas de aprovação ou descarte.

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| ⚡ **Triagem Automática** | Score calculado automaticamente para cada candidato |
| 📊 **Score Multicritério** | 40% experiência + 30% habilidades + 30% compatibilidade técnica |
| ⛔ **Descarte Automático** | Candidatos < 30 pts descartados automaticamente |
| ✅ **Pré-aprovação** | Candidatos ≥ 65 pts marcados como pré-aprovados |
| 👩‍💼 **Ação do Recrutador** | Aprovação/reprovação manual com justificativa |
| 📈 **Relatório de Triagem** | Resumo estatístico automático por processo seletivo |

## 🏗️ Arquitetura — Diagrama de Classes

```
┌─────────────────────────────────────────────────────────┐
│                    SMARTHIRE SYSTEM                      │
├──────────────┬──────────────┬──────────────────────────┤
│  «class»     │  «class»     │  «class»                 │
│  Candidato   │  Curriculo   │  Vaga                    │
│  ─────────── │  ─────────── │  ──────────────────────  │
│  + id        │  + id        │  + id                    │
│  + nome      │  + formacao  │  + titulo                │
│  + email     │  + skills[]  │  + nivelExigido          │
│  + anosExp   │  + certs[]   │  + salarioBase           │
│  + skills[]  │  + idiomas[] │  + skillsObrigs[]        │
│  ─────────── │  + pretensao │  + skillsDesej[]         │
│  calcular    │  ─────────── │                          │
│  Pontuacao() │  calcular    │                          │
│              │  Compat()    │                          │
├──────────────┼──────────────┼──────────────────────────┤
│  «class»     │  «class»     │                          │
│  Recrutador  │  Triagem     │  ENUMS                   │
│  ─────────── │  Automatica  │  ──────────────────────  │
│  + id        │  ─────────── │  StatusCandidato         │
│  + nome      │  + vaga      │    EM_ANALISE            │
│  + email     │  + candidatos│    APROVADO              │
│  ─────────── │  + LIMIAR=30 │    REPROVADO             │
│  aprovar()   │  + LIMIAR=65 │    DESCARTADO            │
│  reprovar()  │  ─────────── │                          │
│              │  executar    │  NivelExperiencia        │
│              │  Triagem()   │    JUNIOR / PLENO        │
│              │  obterApro   │    SENIOR / ESPECIALISTA │
│              │  vados()     │                          │
│              │              │  TipoContrato            │
│              │              │    CLT / PJ / ESTAGIO    │
└──────────────┴──────────────┴──────────────────────────┘
```

## 🧮 Algoritmo de Scoring

```java
public double calcularPontuacao(Vaga vaga) {
    // Componente 1 — Experiência (máx 40 pts)
    double scoreExp = Math.min(anosExperiencia, 15) / 15.0 * 40.0;

    // Componente 2 — Habilidades cadastradas (máx 30 pts)
    double scoreSkills = Math.min(habilidades.size(), 10) / 10.0 * 30.0;

    // Componente 3 — Compatibilidade técnica/salarial (máx 30 pts)
    double scoreCompat = curriculo.calcularCompatibilidade(vaga) * 0.30;

    return Math.round((scoreExp + scoreSkills + scoreCompat) * 100.0) / 100.0;
}
```

### Limiares de decisão

| Score | Status | Ação |
|---|---|---|
| `0 – 29` | ⛔ Descartado | Eliminação automática pelo sistema |
| `30 – 64` | 🔵 Em Análise | Revisão manual pelo recrutador |
| `65 – 100` | ✅ Aprovado | Pré-aprovado para entrevista |

## 🗂️ Estrutura do Projeto

```
smarthire/
├── src/
│   ├── components/
│   │   └── Navbar.jsx        # Navegação com scroll detection
│   ├── sections/
│   │   ├── Hero.jsx          # Hero com typewriter effect
│   │   ├── Sobre.jsx         # Descrição + terminal mockup
│   │   ├── Funcionalidades.jsx # Grid de features
│   │   ├── Arquitetura.jsx   # Diagrama de classes visual
│   │   ├── Algoritmo.jsx     # Explicação + simulador interativo
│   │   ├── TechStack.jsx     # Tecnologias utilizadas
│   │   └── Footer.jsx        # Rodapé
│   ├── App.jsx
│   ├── index.css             # Design system + tokens CSS
│   └── main.jsx
├── triagem_rh/               # Código Java (backend)
│   ├── StatusCandidato.java  # enum
│   ├── NivelExperiencia.java # enum
│   ├── TipoContrato.java     # enum
│   ├── Candidato.java        # calcularPontuacao()
│   ├── Curriculo.java        # calcularCompatibilidade()
│   ├── Vaga.java
│   ├── Recrutador.java
│   ├── TriagemAutomatica.java
│   └── AppTriagemRH.java     # main()
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/yago-silva-ads/smarthire.git
cd smarthire

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Rodar o código Java

```bash
cd triagem_rh
javac *.java
java AppTriagemRH
```

### Deploy para GitHub Pages

```bash
npm run deploy
```

## 🛠️ Tech Stack

| Camada | Tecnologia |
|---|---|
| Backend | Java 21, OOP, Collections |
| Frontend | React 18, Vite 5 |
| Estilização | CSS Vanilla (glassmorphism, animações) |
| Tipografia | Inter + JetBrains Mono (Google Fonts) |
| Deploy | GitHub Pages + gh-pages |

## 📋 Requisitos atendidos

- [x] Mínimo 5 classes (`Candidato`, `Curriculo`, `Vaga`, `Recrutador`, `TriagemAutomatica`)
- [x] Mínimo 2 enumerações (`StatusCandidato`, `NivelExperiencia`, `TipoContrato`)
- [x] Diagrama sem getters/setters
- [x] Método de cálculo implementado (`calcularPontuacao()` e `calcularCompatibilidade()`)
- [x] Texto descritivo (2 parágrafos)
- [x] Frontend React hospedado no GitHub Pages

## 👤 Autor

**Yago Silva**
- GitHub: [@yago-silva-ads](https://github.com/yago-silva-ads)
- Curso: Análise e Desenvolvimento de Sistemas
- Instituição: SENAC-SP · 2026

---

<div align="center">

Feito com ☕ Java + ⚛️ React

⭐ Se este projeto te ajudou, deixa uma estrela!

</div>
