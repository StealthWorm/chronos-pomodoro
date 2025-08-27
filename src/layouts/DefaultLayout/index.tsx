import { TimerIcon, Clock, Settings, HomeIcon, Sun, Moon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Heading } from "../../components/Heading";
import { Footer } from "../../components/Footer";
import styles from "./styles.module.css";
import { Navbar } from "../../components/Navbar";
import { Logo } from "../../components/Logo";

export function DefaultLayout() {
  useDocumentTitle()
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
        <Logo />
      </Heading>

      <Navbar>
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
      </Navbar>

      <Outlet />

      <Footer />
    </div>
  )
}