import { TimerIcon, Clock, Settings, HomeIcon, Sun, Moon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Heading } from "../../components/Heading";
import { Footer } from "../../components/Footer";
import styles from "./styles.module.css";
import { Navbar } from "../../components/Navbar";
import { Logo } from "../../components/Logo";

type AvailableThemes = "dark" | "light";

export function DefaultLayout() {
  useDocumentTitle()
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState<AvailableThemes>(localStorage.getItem("theme") as AvailableThemes || "dark");

  function handleThemeToggle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setCurrentTheme((prevTheme) => {
      return prevTheme === "dark" ? "light" : "dark";
    });
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") as AvailableThemes;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }, [currentTheme]);

  return (
    <div className={styles.container}>
      <Heading>
        <Logo />
        <Navbar>
          <Link
            to="/"
            className={`${styles.link} ${location.pathname === "/" ? styles.active : ""}`}
            title="Home"
            aria-label="Ir para Home"
          >
            <HomeIcon size={20} />
          </Link>
          <Link
            to="/history"
            className={`${styles.link} ${location.pathname === "/history" ? styles.active : ""}`}
            title="History"
            aria-label="Ir para Histórico"
          >
            <Clock size={20} />
          </Link>
          <Link
            to="/settings"
            className={`${styles.link} ${location.pathname === "/settings" ? styles.active : ""}`}
            title="Settings"
            aria-label="Ir para Configurações"
          >
            <Settings size={20} />
          </Link>

          <button
            className={styles.themeToggle}
            title="Toggle theme"
            onClick={(e) => handleThemeToggle(e)}
            aria-label="Mudar tema"
          >
            {currentTheme === "light"
              ? <Sun size={20} />
              : <Moon size={20} />
            }
          </button>
        </Navbar>
      </Heading>

      <Outlet />

      <Footer />
    </div>
  )
}