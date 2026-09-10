const STORAGE_KEY = "smarthire_candidatos"

export function saveCandidato(candidato) {
  const lista = getCandidatos()
  lista.push({ ...candidato, id: Date.now(), criadoEm: new Date().toISOString() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
  return lista
}

export function getCandidatos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  } catch {
    return []
  }
}

export function clearCandidatos() {
  localStorage.removeItem(STORAGE_KEY)
}