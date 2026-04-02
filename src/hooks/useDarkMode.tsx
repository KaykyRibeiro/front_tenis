import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica se há um tema salvo no localStorage (asyncStore web)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        return true;
    } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        return false;
    }
    // Fallback: Verifica a classe inicial ao carregar
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
      // Persiste o tema atual no momento que houver alteração
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Observa mudanças de classe no <html>
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};
