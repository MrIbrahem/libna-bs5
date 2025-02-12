import { useEffect, useState } from "react";

const themes = {
    system: { icon: "bi-circle-half", label: "Auto" },
    dark: { icon: "bi-moon-stars-fill", label: "Dark" },
    light: { icon: "bi-sun-fill", label: "Light" }
};

const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const updateTheme = (preference: string) => {
            const appliedTheme = preference === "system" ? getSystemTheme() : preference;
            document.documentElement.setAttribute("data-bs-theme", appliedTheme);
        };

        updateTheme(theme);
        localStorage.setItem("theme", theme);

        const systemThemeListener = (e: MediaQueryListEvent) => {
            if (localStorage.getItem("theme") === "system") {
                updateTheme("system");
            }
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", systemThemeListener);

        return () => mediaQuery.removeEventListener("change", systemThemeListener);
    }, [theme]);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    const selectTheme = (selectedTheme: string) => {
        setTheme(selectedTheme);
        setMenuOpen(false);
    };

    useEffect(() => {
        const closeMenu = () => setMenuOpen(false);
        if (menuOpen) {
            document.addEventListener("click", closeMenu);
        }
        return () => document.removeEventListener("click", closeMenu);
    }, [menuOpen]);

    return (
        <div className="relative">
            <button className="theme-toggle btn" aria-label="Toggle theme" onClick={toggleMenu}>
                <i className={`bi ${themes[theme as keyof typeof themes].icon}`}></i>
            </button>
            {menuOpen && (
                <div className="theme-menu absolute top-full mt-2 right-0 bg-white shadow-md rounded-lg p-2 w-36">
                    {Object.entries(themes).map(([value, { icon, label }]) => (
                        <button key={value} className="flex items-center w-full p-2 hover:bg-gray-200" onClick={() => selectTheme(value)}>
                            <i className={`bi ${icon} mr-2`}></i> {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeToggle;
