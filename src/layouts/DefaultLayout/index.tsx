import { Clock, Settings, HomeIcon, Sun, Moon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Heading } from "../../components/Heading";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { Logo } from "../../components/Logo";
import styles from "./styles.module.css";

type Theme = "dark" | "light";

const NAVIGATION_ITEMS = [
  {
    path: "/",
    icon: HomeIcon,
    title: "Home",
    ariaLabel: "Ir para Home"
  },
  {
    path: "/history",
    icon: Clock,
    title: "History",
    ariaLabel: "Ir para Histórico"
  },
  {
    path: "/settings",
    icon: Settings,
    title: "Settings",
    ariaLabel: "Ir para Configurações"
  }
] as const;

export function DefaultLayout() {
  const { location } = useDocumentTitle();
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) || "dark"
  );

  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Heading>
        <Logo />
        <Navbar>
          {NAVIGATION_ITEMS.map(({ path, icon: Icon, title, ariaLabel }) => (
            <Link
              key={path}
              to={path}
              className={`${styles.link} ${location.pathname === path ? styles.active : ""}`}
              title={title}
              aria-label={ariaLabel}
            >
              <Icon size={20} />
            </Link>
          ))}

          <button
            className={styles.themeToggle}
            title="Toggle theme"
            onClick={handleToggleTheme}
            aria-label="Mudar tema"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </Navbar>
      </Heading>

      <Outlet />

      <Footer />
    </div>
  );
}