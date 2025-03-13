import { useEffect, useState } from "react";

export default function ModeToggleBtn() {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkMode, setDarkMode] = useState(
    storedTheme ? storedTheme === "dark" : prefersDark
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="cursor-pointer p-2 rounded-full bg-gray-100 dark:bg-gray-700"
    >
      {darkMode ? (
        <img
          src="./icons/light-mode.svg"
          alt="light"
          className="w-6 aspect-square"
        />
      ) : (
        <img
          src="./icons/dark-mode.svg"
          alt="dark"
          className="w-6 aspect-square"
        />
      )}
    </button>
  );
}
