import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTheme-Q7qsdOBh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "parecer-theme";
function applyTheme(theme) {
	const root = document.documentElement;
	if (theme === "dark") root.classList.add("dark");
	else root.classList.remove("dark");
}
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "light";
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) return saved;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	});
	(0, import_react.useEffect)(() => {
		applyTheme(theme);
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);
	const toggle = () => setTheme((t) => t === "dark" ? "light" : "dark");
	return {
		theme,
		toggle,
		isDark: theme === "dark"
	};
}
//#endregion
export { useTheme as t };
