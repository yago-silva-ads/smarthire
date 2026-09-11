import "./Topbar.css"

export default function Topbar({ onHome, onDashboard, currentView }) {
  return (
    <nav className="topbar">
      <div className="container topbar__inner">
        <button onClick={onHome} className="topbar__logo">
          Smart<span className="grad-text">Hire</span>
        </button>
        <div className="topbar__center">
          <span className="topbar__vaga">Estágio em Desenvolvimento de Software · São Paulo</span>
        </div>
        <div className="topbar__actions">
          {currentView !== "job" && (
            <button onClick={onHome} className="btn btn-ghost btn-sm">Vaga</button>
          )}
          <button
            onClick={onDashboard}
            className={`btn btn-sm ${currentView === "dashboard" ? "btn-primary" : "btn-outline"}`}
          >
            RH
          </button>
        </div>
      </div>
    </nav>
  )
}