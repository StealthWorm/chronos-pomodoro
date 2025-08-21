import { Clock, CheckCircle, XCircle, Pause } from 'lucide-react'

export function History() {
  return (
    <main>
      <div className="history-container">
        <h2>Session History</h2>

        <div className="history-stats">
          <div className="stat-card">
            <CheckCircle size={24} />
            <span>Completed: 12</span>
          </div>
          <div className="stat-card">
            <Pause size={24} />
            <span>Paused: 3</span>
          </div>
          <div className="stat-card">
            <XCircle size={24} />
            <span>Abandoned: 1</span>
          </div>
        </div>

        <div className="history-list">
          <div className="history-item completed">
            <Clock size={16} />
            <span>Focus Session - 25:00</span>
            <span>Today, 14:30</span>
          </div>
          <div className="history-item completed">
            <Clock size={16} />
            <span>Break Session - 05:00</span>
            <span>Today, 14:05</span>
          </div>
          <div className="history-item paused">
            <Clock size={16} />
            <span>Focus Session - 15:23</span>
            <span>Today, 13:45</span>
          </div>
        </div>
      </div>
    </main>
  )
}

