import { useState, useCallback } from "react"
import { calcularScore } from "./utils/scorer"
import { saveCandidato } from "./utils/storage"
import JobPage from "./pages/JobPage"
import FormPage from "./pages/FormPage"
import AnalyzingPage from "./pages/AnalyzingPage"
import ResultPage from "./pages/ResultPage"
import DashboardPage from "./pages/DashboardPage"
import Topbar from "./components/Topbar"
import "./index.css"
import "./App.css"

// Views: job | form | analyzing | result | dashboard
export default function App() {
  const [view, setView] = useState("job")
  const [candidato, setCandidato] = useState(null)
  const [resultado, setResultado] = useState(null)

  const handleSubmitForm = useCallback((formData) => {
    setCandidato(formData)
    setView("analyzing")
  }, [])

  const handleAnalysisDone = useCallback(() => {
    const score = calcularScore(candidato)
    setResultado(score)
    const record = { ...candidato, resultado: score }
    saveCandidato(record)
    setView("result")
  }, [candidato])

  const handleNewCandidate = useCallback(() => {
    setCandidato(null)
    setResultado(null)
    setView("form")
  }, [])

  const PAGE_TITLES = {
    job: "Vaga · SmartHire",
    form: "Candidatura · SmartHire",
    analyzing: "Analisando · SmartHire",
    result: "Resultado · SmartHire",
    dashboard: "Painel RH · SmartHire",
  }

  return (
    <>
      <title>{PAGE_TITLES[view]}</title>
      <Topbar
        onHome={() => setView("job")}
        onDashboard={() => setView("dashboard")}
        currentView={view}
      />
      {view === "job"       && <JobPage onApply={() => setView("form")} onDashboard={() => setView("dashboard")} />}
      {view === "form"      && <FormPage onSubmit={handleSubmitForm} onBack={() => setView("job")} />}
      {view === "analyzing" && <AnalyzingPage candidato={candidato} onDone={handleAnalysisDone} />}
      {view === "result"    && <ResultPage resultado={resultado} candidato={candidato} onNewCandidate={handleNewCandidate} onDashboard={() => setView("dashboard")} />}
      {view === "dashboard" && <DashboardPage onBack={() => setView("job")} onNewCandidate={() => setView("form")} />}
    </>
  )
}