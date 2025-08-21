import { Settings as SettingsIcon, Volume2, Bell, Palette } from 'lucide-react'

export function Settings() {
  return (
    <main>
      <div className="settings-container">
        <h2>Settings</h2>

        <div className="settings-section">
          <h3>Timer Settings</h3>
          <div className="setting-item">
            <label>Focus Duration (minutes)</label>
            <input type="number" defaultValue={25} min={1} max={60} />
          </div>
          <div className="setting-item">
            <label>Break Duration (minutes)</label>
            <input type="number" defaultValue={5} min={1} max={30} />
          </div>
          <div className="setting-item">
            <label>Long Break Duration (minutes)</label>
            <input type="number" defaultValue={15} min={1} max={60} />
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>
              <Bell size={16} />
              Sound notifications
            </label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>
              <Volume2 size={16} />
              Desktop notifications
            </label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label>
              <Palette size={16} />
              Theme
            </label>
            <select defaultValue="dark">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  )
}

