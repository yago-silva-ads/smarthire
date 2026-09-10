/**
 * scorer.js
 * Motor de pontuação — replica fiel do algoritmo Java (Candidato.calcularPontuacao)
 * Otimizado para vaga de Estágio em Tech.
 */

export const VAGA = {
  id: "V001",
  titulo: "Estágio em Desenvolvimento de Software",
  empresa: "SmartHire Tech",
  departamento: "Engenharia de Software",
  tipo: "Estágio",
  bolsaBase: 1500,
  carga: "30h/semana",
  modalidade: "Híbrido",
  local: "São Paulo – SP",
  descricao: "Buscamos estagiários apaixonados por tecnologia para integrar nosso time de engenharia. Você participará de projetos reais, com mentoria e crescimento acelerado.",
  obrigatorias: ["JavaScript", "HTML/CSS", "Git", "Lógica de Programação"],
  desejaveis: ["React", "Python", "Java", "SQL", "Node.js", "APIs REST", "TypeScript", "Docker"],
  beneficios: ["Vale Transporte", "Vale Refeição", "Mentoria 1:1", "Auxílio Internet", "Certificações pagas"],
}

/**
 * Calcula o score de compatibilidade (0–100).
 * Componentes:
 *   A) Semestre do candidato    → até 40 pts (peso: experiência)
 *   B) Total de habilidades     → até 30 pts (peso: amplitude de skills)
 *   C) Compatibilidade técnica  → até 30 pts (peso: match com vaga)
 *      C1) Skills obrigatórias  → 60% do C
 *      C2) Skills desejáveis    → 20% do C
 *      C3) Pretensão de bolsa   → 20% do C
 */
export function calcularScore(candidato) {
  const { semestre, bolsaPretendida, habilidades } = candidato

  // ── A. Score por semestre (máx 40 pts) ────────────────────────────────────
  const semestreMap = { 1: 10, 2: 18, 3: 25, 4: 30, 5: 34, 6: 37, 7: 40, 8: 40, 9: 40, 10: 40 }
  const scoreA = semestreMap[Math.min(semestre, 10)] || 10

  // ── B. Quantidade de habilidades (máx 30 pts) ─────────────────────────────
  const maxSkills = 10
  const scoreB = Math.min(habilidades.length, maxSkills) / maxSkills * 30

  // ── C. Compatibilidade com a vaga (máx 30 pts) ────────────────────────────
  // C1: Skills obrigatórias (60% de 30 = 18 pts máx)
  const totalObrig = VAGA.obrigatorias.length
  const matchObrig = VAGA.obrigatorias.filter(s =>
    habilidades.some(h => h.toLowerCase() === s.toLowerCase())
  ).length
  const scoreC1 = totalObrig > 0 ? (matchObrig / totalObrig) * 18 : 18

  // C2: Skills desejáveis (20% de 30 = 6 pts máx)
  const totalDesej = VAGA.desejaveis.length
  const matchDesej = VAGA.desejaveis.filter(s =>
    habilidades.some(h => h.toLowerCase() === s.toLowerCase())
  ).length
  const scoreC2 = totalDesej > 0 ? (matchDesej / totalDesej) * 6 : 6

  // C3: Pretensão de bolsa (6 pts máx)
  const margem = VAGA.bolsaBase * 0.25
  let scoreC3 = 0
  if (bolsaPretendida <= VAGA.bolsaBase + margem) scoreC3 = 6
  else if (bolsaPretendida <= VAGA.bolsaBase + margem * 2) scoreC3 = 3

  const scoreC = scoreC1 + scoreC2 + scoreC3

  const total = Math.round((scoreA + scoreB + scoreC) * 10) / 10

  return {
    total: Math.min(100, total),
    breakdown: {
      experiencia: { pts: Math.round(scoreA * 10) / 10, max: 40, label: "Semestre / Experiência" },
      habilidades: { pts: Math.round(scoreB * 10) / 10, max: 30, label: "Amplitude de Skills" },
      compatibilidade: {
        pts: Math.round(scoreC * 10) / 10, max: 30, label: "Match com a Vaga",
        sub: {
          obrigatorias: { pts: Math.round(scoreC1 * 10) / 10, max: 18, matched: matchObrig, total: totalObrig },
          desejaveis:   { pts: Math.round(scoreC2 * 10) / 10, max: 6,  matched: matchDesej, total: totalDesej },
          bolsa:        { pts: scoreC3, max: 6 },
        }
      }
    },
    status: total >= 65 ? "APROVADO" : total >= 30 ? "EM_ANALISE" : "DESCARTADO",
    matchedObrig: VAGA.obrigatorias.filter(s =>
      habilidades.some(h => h.toLowerCase() === s.toLowerCase())
    ),
    matchedDesej: VAGA.desejaveis.filter(s =>
      habilidades.some(h => h.toLowerCase() === s.toLowerCase())
    ),
    missingObrig: VAGA.obrigatorias.filter(s =>
      !habilidades.some(h => h.toLowerCase() === s.toLowerCase())
    ),
  }
}

export function getStatusConfig(status) {
  const map = {
    APROVADO:    { label: "Aprovado para Entrevista", color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.35)", icon: "✅", emoji: "🎉" },
    EM_ANALISE:  { label: "Em Análise pelo RH",       color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.35)", icon: "🔵", emoji: "📋" },
    DESCARTADO:  { label: "Não selecionado",           color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.35)",  icon: "⛔", emoji: "😔" },
  }
  return map[status] || map.EM_ANALISE
}