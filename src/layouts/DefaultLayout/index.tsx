import { TimerIcon, Clock, Settings, HomeIcon, Sun, Moon } from "lucide-react";
import { Heading } from "../../components/Heading";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

export function DefaultLayout() {
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light");

  function handleThemeToggle() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      localStorage.setItem("theme", "dark");
      setCurrentTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
    }
  }

  return (
    <div className={styles.container}>
      <Heading>
        <button>
          <TimerIcon size={48} />
        </button>
        <span>Chronos Pomodoro</span>
      </Heading>

      <nav className={styles.navigation}>
        <Link
          to="/"
          className={`${styles.link} ${location.pathname === "/" ? styles.active : ""}`}
          title="Home"
        >
          <HomeIcon size={20} />
        </Link>
        <Link
          to="/history"
          className={`${styles.link} ${location.pathname === "/history" ? styles.active : ""}`}
          title="History"
        >
          <Clock size={20} />
        </Link>
        <Link
          to="/settings"
          className={`${styles.link} ${location.pathname === "/settings" ? styles.active : ""}`}
          title="Settings"
        >
          <Settings size={20} />
        </Link>

        <button className={styles.themeToggle} title="Toggle theme" onClick={handleThemeToggle}>
          {currentTheme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <Outlet />

      <footer className={styles.footer}>
        <span>
          <a
            href="https://pt.wikipedia.org/wiki/T%C3%A9cnica_pomodoro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Entenda a técnica Pomodoro 🍅
          </a>
        </span>
        <p>
          Chronos Pomodoro {new Date().getFullYear()} - 💚
        </p>
      </footer>
    </div>
  )
}