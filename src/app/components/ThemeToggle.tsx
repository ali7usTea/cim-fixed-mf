import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
    const [theme1, setTheme1] = useState("lara-light-indigo");

    useEffect(() => {
        const themeLink = document.getElementById("theme-css");
        if (themeLink) {
            themeLink.setAttribute("href", `/fixed/themes/${theme1}/theme.css`);
        }
    }, [theme1]);

    const toggleTheme = () => {
        setTheme1(
            theme1 === "lara-light-indigo"
                ? "lara-dark-indigo"
                : "lara-light-indigo"
        );
    };
    return (
        <>
            <link
                id="theme-css"
                href={`/fixed/themes/${theme1}/theme.css`}
                rel="stylesheet"
            />
            <button
                onClick={toggleTheme}
                className="flex px-4 py-2 bg-blue-500 dark:bg-gray-700 text-white dark:text-gray-200 rounded-md"
            >
                {theme1 === "lara-light-indigo" ? (
                    <FaSun size="24" className="top-navigation-icon" />
                ) : (
                    <FaMoon size="24" className="top-navigation-icon" />
                )}
            </button>
        </>
    );
};

export default ThemeToggle;
