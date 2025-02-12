import { useState, useEffect, useRef } from "react";

const themes = {
    system: { icon: "bi-circle-half", label: "Auto" },
    dark: { icon: "bi-moon-stars-fill", label: "Dark" },
    light: { icon: "bi-sun-fill", label: "Light" }
};

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateTheme = (preference: string) => {
            const resolvedTheme = preference === "system" ? getSystemTheme() : preference;
            document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
        };
        updateTheme(theme);

        const handleSystemChange = () => {
            if (theme === "system") {
                updateTheme("system");
            }
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", handleSystemChange);

        return () => {
            mediaQuery.removeEventListener("change", handleSystemChange);
        };
    }, [theme]);

    const handleThemeChange = (value: string) => {
        localStorage.setItem("theme", value);
        setTheme(value);
        setMenuVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisible(false);
            }
        };

        if (menuVisible) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuVisible]);

    return (
        <div className="relative inline-block">
            <button
                className="theme-toggle p-2 bg-gray-200 rounded"
                onClick={() => setMenuVisible(!menuVisible)}
            >
                <i className={`bi ${themes[theme as keyof typeof themes].icon}`} />
            </button>
            {menuVisible && (
                <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
                    {Object.entries(themes).map(([value, { icon, label }]) => (
                        <button
                            key={value}
                            className="theme-menu-item flex items-center p-2 w-full hover:bg-gray-100"
                            onClick={() => handleThemeChange(value)}
                        >
                            <i className={`bi ${icon} mr-2`} /> {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeToggle;
