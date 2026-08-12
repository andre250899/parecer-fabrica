import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useTheme } from "./useTheme-Q7qsdOBh.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ChevronDown, C as FileDown, D as CircleCheck, E as Clock, M as Calendar, N as Boxes, O as ChevronRight, P as ArrowLeft, S as FileText, T as Download, _ as Moon, a as Trash2, b as History, c as Sparkles, d as Printer, f as Plus, g as PackageMinus, h as PackagePlus, i as Upload, j as Camera, k as ChevronLeft, l as Search, m as Package, n as X, o as Tag, p as Pencil, r as WandSparkles, s as Sun, u as Save, v as LogOut, w as ExternalLink, x as FolderOpen, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { P as isRedirect, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-BWhwvx9r.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { a as fileToCompressedDataUrl, i as downloadDataUrl, n as defaultHisense, r as defaultWhirlpool, t as defaultAssurant } from "./parecer-extras-BH44_VuI.mjs";
import { t as supabase } from "./client-Dac0f1nd.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Slot } from "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BzUKJSsS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var vox_logo_default = "/assets/vox-logo-yeuns534.png";
var emptyItem = () => ({
	codigo: "",
	descricao: "",
	qtde: "",
	valorUnit: ""
});
var defaultParecer = {
	numeroOS: "",
	dataEntrada: "",
	clienteNome: "",
	clienteCPF: "",
	clienteEndereco: "",
	clienteTelefone: "",
	equipProduto: "",
	equipMarca: "",
	equipModelo: "",
	equipSerie: "",
	defeito: "",
	parecer: "",
	servico: "",
	itens: [emptyItem()],
	observacoes: "Orçamento válido por 15 (quinze) dias.\nApós aprovado o orçamento, o prazo para execução do serviço será informado.",
	validadeDias: "15 (QUINZE) DIAS",
	garantia: "Garantia conforme legislação vigente e políticas internas da empresa.",
	responsavel: "Jefferson Hoffmann",
	dataParecer: ""
};
var formatBRL = (v) => {
	const n = parseFloat(String(v).replace(",", "."));
	if (isNaN(n)) return "R$ 0,00";
	return n.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
};
var totalOrcamento = (itens) => {
	return itens.reduce((sum, it) => {
		return sum + (parseFloat(it.qtde.replace(",", ".")) || 0) * (parseFloat(it.valorUnit.replace(",", ".")) || 0);
	}, 0);
};
var THEMES = [
	{
		id: "vox",
		name: "Vox Original (Azul Corporativo)",
		description: "Design do modelo enviado — azul-marinho com pílulas e ícones em círculos.",
		primary: "#0d1b3d",
		primarySoft: "#e8edf5",
		accent: "#2a6fdb",
		bg: "#ffffff",
		surface: "#ffffff",
		text: "#0d1b3d",
		muted: "#5b6b85",
		border: "#d4dbe8",
		fontFamily: "'Inter', system-ui, sans-serif",
		headingFont: "'Inter', system-ui, sans-serif",
		radius: "14px",
		headerStyle: "pill",
		iconStyle: "circle"
	},
	{
		id: "minimal",
		name: "Minimal Preto & Branco",
		description: "Preto e branco, tipografia limpa, sem ornamentos.",
		primary: "#000000",
		primarySoft: "#f4f4f4",
		accent: "#000000",
		bg: "#ffffff",
		surface: "#ffffff",
		text: "#0a0a0a",
		muted: "#666666",
		border: "#dcdcdc",
		fontFamily: "'Inter', system-ui, sans-serif",
		headingFont: "'Inter', system-ui, sans-serif",
		radius: "0px",
		headerStyle: "underline",
		iconStyle: "none"
	},
	{
		id: "emerald",
		name: "Moderno Verde Esmeralda",
		description: "Verde esmeralda com cartões suaves — vibe moderna e tecnológica.",
		primary: "#065f46",
		primarySoft: "#ecfdf5",
		accent: "#10b981",
		bg: "#f8fafb",
		surface: "#ffffff",
		text: "#0f2419",
		muted: "#4b6b5c",
		border: "#d1e7dc",
		fontFamily: "'Inter', system-ui, sans-serif",
		headingFont: "'Inter', system-ui, sans-serif",
		radius: "12px",
		headerStyle: "bar",
		iconStyle: "square"
	},
	{
		id: "bordo",
		name: "Elegante Bordô",
		description: "Bordô + creme com serifada editorial — feel formal e sofisticado.",
		primary: "#6d2e46",
		primarySoft: "#f7ede8",
		accent: "#a26769",
		bg: "#faf6f1",
		surface: "#ffffff",
		text: "#2c1a1f",
		muted: "#7a5a60",
		border: "#e6d6cf",
		fontFamily: "'Inter', system-ui, sans-serif",
		headingFont: "'Georgia', 'Times New Roman', serif",
		radius: "6px",
		headerStyle: "serif",
		iconStyle: "outline"
	},
	{
		id: "tech",
		name: "Tech Escuro (Ciano)",
		description: "Fundo escuro com acentos ciano — para OS mais tecnológicas.",
		primary: "#0ea5b7",
		primarySoft: "#0a1720",
		accent: "#22d3ee",
		bg: "#0b1220",
		surface: "#111a2c",
		text: "#e6f1ff",
		muted: "#8aa0bd",
		border: "#1e2c47",
		fontFamily: "'Inter', system-ui, sans-serif",
		headingFont: "'Inter', system-ui, sans-serif",
		radius: "10px",
		headerStyle: "ribbon",
		iconStyle: "square"
	},
	{
		id: "classico",
		name: "Clássico Cinza (Formal)",
		description: "Documento oficial em tons de cinza — sóbrio e neutro.",
		primary: "#374151",
		primarySoft: "#f3f4f6",
		accent: "#6b7280",
		bg: "#ffffff",
		surface: "#ffffff",
		text: "#111827",
		muted: "#6b7280",
		border: "#d1d5db",
		fontFamily: "'Inter', system-ui, sans-serif",
		headingFont: "'Inter', system-ui, sans-serif",
		radius: "2px",
		headerStyle: "square",
		iconStyle: "none"
	}
];
function SectionHeader({ theme, icon, title }) {
	const isDark = theme.id === "tech";
	const iconBg = theme.iconStyle === "none" ? "transparent" : theme.iconStyle === "outline" ? "transparent" : theme.primary;
	const iconColor = theme.iconStyle === "outline" ? theme.primary : "#ffffff";
	const iconBorder = theme.iconStyle === "outline" ? `2px solid ${theme.primary}` : "none";
	const iconRadius = theme.iconStyle === "square" ? "6px" : "999px";
	if (theme.headerStyle === "pill") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			marginBottom: 10
		},
		children: [theme.iconStyle !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 40,
				height: 40,
				borderRadius: iconRadius,
				background: iconBg,
				color: iconColor,
				border: iconBorder,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: 18,
				marginRight: -14,
				zIndex: 2,
				boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
			},
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: theme.primary,
				color: "#ffffff",
				padding: "8px 22px 8px 28px",
				borderRadius: 999,
				fontWeight: 700,
				fontSize: 13,
				letterSpacing: .6,
				fontFamily: theme.headingFont
			},
			children: title
		})]
	});
	if (theme.headerStyle === "bar") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 10,
			background: theme.primary,
			color: "#fff",
			padding: "10px 14px",
			borderRadius: theme.radius,
			marginBottom: 10
		},
		children: [theme.iconStyle !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: { fontSize: 16 },
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontWeight: 700,
				fontSize: 13,
				letterSpacing: .6,
				fontFamily: theme.headingFont
			},
			children: title
		})]
	});
	if (theme.headerStyle === "underline") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			borderBottom: `2px solid ${theme.primary}`,
			paddingBottom: 6,
			marginBottom: 12,
			fontFamily: theme.headingFont,
			fontWeight: 700,
			fontSize: 13,
			letterSpacing: 1.2,
			color: theme.primary,
			textTransform: "uppercase"
		},
		children: title
	});
	if (theme.headerStyle === "square") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			background: theme.primarySoft,
			color: theme.primary,
			padding: "8px 12px",
			borderLeft: `4px solid ${theme.primary}`,
			fontFamily: theme.headingFont,
			fontWeight: 700,
			fontSize: 13,
			letterSpacing: .6,
			textTransform: "uppercase",
			marginBottom: 10
		},
		children: title
	});
	if (theme.headerStyle === "ribbon") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 10,
			marginBottom: 10
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: 4,
				height: 22,
				background: theme.accent,
				borderRadius: 2
			} }),
			theme.iconStyle !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: theme.accent,
					fontSize: 16
				},
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 700,
					fontSize: 13,
					letterSpacing: 1,
					color: isDark ? theme.text : theme.primary,
					fontFamily: theme.headingFont,
					textTransform: "uppercase"
				},
				children: title
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			borderBottom: `1px solid ${theme.primary}`,
			paddingBottom: 6,
			marginBottom: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				fontFamily: theme.headingFont,
				fontStyle: "italic",
				fontWeight: 600,
				fontSize: 16,
				color: theme.primary
			},
			children: title
		}), theme.iconStyle !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				color: theme.primary,
				fontSize: 16
			},
			children: icon
		})]
	});
}
function Field$1({ theme, label, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 10,
			padding: "6px 0",
			borderBottom: `1px solid ${theme.border}`
		},
		children: [
			icon && theme.iconStyle !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: theme.primary,
					fontSize: 14,
					width: 18
				},
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 700,
					color: theme.primary,
					fontSize: 11,
					letterSpacing: .5,
					minWidth: 110,
					textTransform: "uppercase"
				},
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: theme.text,
					fontSize: 12
				},
				children: value || "—"
			})
		]
	});
}
function ParecerPreview({ data, theme }) {
	const isDark = theme.id === "tech";
	const total = totalOrcamento(data.itens);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "parecer-print",
		style: {
			background: theme.bg,
			color: theme.text,
			fontFamily: theme.fontFamily,
			padding: "24px 28px",
			minHeight: "297mm",
			width: "210mm",
			margin: "0 auto",
			boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 20,
					paddingBottom: 12,
					borderBottom: `2px solid ${theme.primary}`,
					marginBottom: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: vox_logo_default,
					alt: "Vox Grupo",
					style: {
						height: 60,
						filter: isDark ? "brightness(0) invert(1)" : "none"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						fontSize: 10.5,
						color: theme.muted,
						textAlign: "right",
						lineHeight: 1.5
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { color: theme.primary },
							children: "CNPJ:"
						}), " 61.422.882/0001-78"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Av. Des. Mario Da Silva Nunes, 611" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Jardim Limoeiro, Serra - ES · CEP: 29.164-044" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { color: theme.primary },
							children: "Tel:"
						}), " (27) 3227-1288 · (27) 3227-1028"] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: theme.primary,
					color: "#fff",
					borderRadius: theme.radius,
					padding: "14px 20px",
					margin: "14px 0 20px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 20,
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontFamily: theme.headingFont,
						fontSize: 22,
						fontWeight: 800,
						letterSpacing: 1.5
					},
					children: "PARECER TÉCNICO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 16,
						fontSize: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							opacity: .75,
							fontSize: 10,
							letterSpacing: .8
						},
						children: "Nº OS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 700,
							fontSize: 14
						},
						children: data.numeroOS || "—"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							opacity: .75,
							fontSize: 10,
							letterSpacing: .8
						},
						children: "DATA DE ENTRADA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 700,
							fontSize: 14
						},
						children: data.dataEntrada || "—"
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 12,
					marginBottom: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					theme,
					icon: "👤",
					title: "DADOS DO CLIENTE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: theme.surface,
						padding: 10,
						borderRadius: theme.radius,
						border: `1px solid ${theme.border}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Nome",
							value: data.clienteNome,
							icon: "👤"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "CPF",
							value: data.clienteCPF,
							icon: "🪪"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Endereço",
							value: data.clienteEndereco,
							icon: "📍"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Telefone",
							value: data.clienteTelefone,
							icon: "📞"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					theme,
					icon: "🖥",
					title: "DADOS DO EQUIPAMENTO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: theme.surface,
						padding: 10,
						borderRadius: theme.radius,
						border: `1px solid ${theme.border}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Produto",
							value: data.equipProduto,
							icon: "📦"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Marca",
							value: data.equipMarca,
							icon: "🖥"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Modelo",
							value: data.equipModelo,
							icon: "🏷"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							theme,
							label: "Nº de Série",
							value: data.equipSerie,
							icon: "||||"
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 12,
					marginBottom: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					theme,
					icon: "⚠",
					title: "DEFEITO ALEGADO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						background: theme.surface,
						padding: 10,
						minHeight: 60,
						borderRadius: theme.radius,
						border: `1px solid ${theme.border}`,
						fontSize: 11.5,
						whiteSpace: "pre-wrap"
					},
					children: data.defeito || "—"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					theme,
					icon: "🔍",
					title: "PARECER TÉCNICO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: theme.surface,
						padding: 10,
						minHeight: 60,
						borderRadius: theme.radius,
						border: `1px solid ${theme.border}`,
						fontSize: 11.5,
						whiteSpace: "pre-wrap"
					},
					children: [data.parecer || "—", data.servico && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginTop: 6 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { color: theme.primary },
							children: "SERVIÇO: "
						}), data.servico]
					})]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: { marginBottom: 12 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					theme,
					icon: "$",
					title: "ORÇAMENTO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse",
						fontSize: 11
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							background: theme.primary,
							color: "#fff"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: {
									padding: 6,
									textAlign: "center",
									width: 36
								},
								children: "ITEM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: {
									padding: 6,
									textAlign: "left"
								},
								children: "CÓDIGO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: {
									padding: 6,
									textAlign: "left"
								},
								children: "DESCRIÇÃO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: {
									padding: 6,
									textAlign: "center",
									width: 50
								},
								children: "QTDE."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: {
									padding: 6,
									textAlign: "right",
									width: 90
								},
								children: "VALOR UNIT."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: {
									padding: 6,
									textAlign: "right",
									width: 90
								},
								children: "VALOR TOTAL"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [data.itens.map((it, idx) => {
						const q = parseFloat(it.qtde.replace(",", ".")) || 0;
						const v = parseFloat(it.valorUnit.replace(",", ".")) || 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: { borderBottom: `1px solid ${theme.border}` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: 6,
										textAlign: "center"
									},
									children: idx + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: 6 },
									children: it.codigo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: 6 },
									children: it.descricao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: 6,
										textAlign: "center"
									},
									children: it.qtde
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: 6,
										textAlign: "right"
									},
									children: it.valorUnit ? formatBRL(it.valorUnit) : ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: 6,
										textAlign: "right"
									},
									children: q && v ? formatBRL(String(q * v)) : ""
								})
							]
						}, idx);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							background: theme.primary,
							color: "#fff"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: 4 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: 8,
									textAlign: "right",
									fontWeight: 700
								},
								children: "TOTAL GERAL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: 8,
									textAlign: "right",
									fontWeight: 700
								},
								children: formatBRL(String(total))
							})
						]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: { marginBottom: 10 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					theme,
					icon: "📝",
					title: "OBSERVAÇÕES"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						padding: "6px 10px",
						fontSize: 10.5,
						whiteSpace: "pre-wrap",
						color: theme.muted,
						columnCount: 2,
						columnGap: 16
					},
					children: data.observacoes
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gap: 12,
					marginTop: 20,
					paddingTop: 14,
					borderTop: `1px solid ${theme.border}`,
					fontSize: 11
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 700,
								color: theme.primary,
								marginBottom: 4
							},
							children: "📅 VALIDADE DO ORÇAMENTO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: "4px 8px",
								border: `1px solid ${theme.primary}`,
								borderRadius: 999,
								display: "inline-block",
								fontSize: 10
							},
							children: data.validadeDias
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginTop: 6,
								color: theme.muted
							},
							children: ["Data: ", data.dataParecer || "___/___/______"]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 700,
							color: theme.primary,
							marginBottom: 4
						},
						children: "🛡 GARANTIA DO SERVIÇO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: theme.muted,
							fontSize: 10.5
						},
						children: data.garantia
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { textAlign: "center" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 700,
									color: theme.primary,
									marginBottom: 4
								},
								children: "✍ RESPONSÁVEL TÉCNICO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								borderBottom: `1px solid ${theme.text}`,
								margin: "18px 10px 4px",
								height: 1
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { fontWeight: 700 },
								children: data.responsavel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: theme.muted,
									fontSize: 10
								},
								children: "Técnico Responsável"
							})
						]
					})
				]
			})
		]
	});
}
var TEAL = "#00A79D";
var TEAL_DARK = "#008E86";
var cellStyle$1 = {
	border: "1px solid #000",
	padding: "6px 8px",
	fontSize: 11,
	verticalAlign: "top",
	color: "#000"
};
var labelStyle$1 = {
	...cellStyle$1,
	fontWeight: 700,
	background: TEAL,
	color: "#000",
	whiteSpace: "normal"
};
var photoCaptionStyle = {
	background: TEAL,
	color: "#000",
	border: "1px solid #000",
	padding: "6px 8px",
	textAlign: "center",
	fontStyle: "italic",
	fontWeight: 700,
	fontSize: 11
};
function HisensePreview({ data }) {
	const Header = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-avoid-break": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { margin: "0 -15mm" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						padding: "14px 24px 8px",
						background: "#fff"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Arial Black', 'Arial', sans-serif",
							fontWeight: 900,
							fontSize: 42,
							letterSpacing: "-1px",
							color: TEAL,
							lineHeight: 1
						},
						children: "Hisense"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 10,
					background: TEAL
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					background: "#fff"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					background: TEAL_DARK
				} })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			style: {
				fontSize: 22,
				fontWeight: 700,
				margin: "12px 0 10px",
				textAlign: "center",
				color: TEAL_DARK
			},
			children: "Relatório de Atendimento ao Cliente"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "parecer-print",
		style: {
			background: "#fff",
			color: "#000",
			fontFamily: "'Calibri', 'Arial', sans-serif",
			padding: "0 15mm 15mm",
			width: "210mm",
			minHeight: "297mm",
			margin: "0 auto",
			boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
		},
		children: [
			Header,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...labelStyle$1,
								width: "18%"
							},
							children: "NÚMERO OS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.numeroOS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...labelStyle$1,
								width: "20%"
							},
							children: "ASSISTÊNCIA TÉC."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.assistenciaTec
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle$1,
						children: "NOME DO CLIENTE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle$1,
						colSpan: 3,
						children: data.clienteNome
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: labelStyle$1,
							children: "MODELO DO PROD."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.modeloProduto
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: labelStyle$1,
							children: "Nº DE SERIE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.numeroSerie
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: labelStyle$1,
							children: "ART ou Batch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.artBatch
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								...cellStyle$1,
								textAlign: "center",
								fontWeight: 700
							},
							children: [
								"Produto Gorenje",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										display: "inline-block",
										width: 28,
										borderBottom: "1px solid #000",
										textAlign: "center"
									},
									children: data.marcaProduto === "gorenje" ? "X" : "\xA0"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								...cellStyle$1,
								textAlign: "center",
								fontWeight: 700
							},
							children: [
								"Produto Hisense",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										display: "inline-block",
										width: 28,
										borderBottom: "1px solid #000",
										textAlign: "center"
									},
									children: data.marcaProduto === "hisense" ? "X" : "\xA0"
								})
							]
						})
					] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginTop: 10
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...labelStyle$1,
							width: "28%",
							height: 48
						},
						children: "DEFEITO RELATADO PELO CLIENTE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cellStyle$1,
							whiteSpace: "pre-wrap"
						},
						children: data.defeitoRelatado
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...labelStyle$1,
							height: 48
						},
						children: "DIAGNÓSTICO TÉC."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cellStyle$1,
							whiteSpace: "pre-wrap"
						},
						children: data.diagnosticoTec
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						style: {
							...labelStyle$1,
							height: 56
						},
						children: [
							"INSTAÇÃO CORRETA?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontWeight: 400,
									fontSize: 9
								},
								children: "(Relatar as Inregularidades Encontradas na Instalação)"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cellStyle$1,
							whiteSpace: "pre-wrap"
						},
						children: data.instalacaoCorreta
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						style: {
							...labelStyle$1,
							height: 48
						},
						children: [
							"PEÇAS NECESSARIAS",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontWeight: 700,
									fontSize: 11
								},
								children: "PARA REPARO *"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cellStyle$1,
							whiteSpace: "pre-wrap"
						},
						children: data.pecasNecessarias
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: 9,
					fontStyle: "italic",
					margin: "4px 0 10px"
				},
				children: "*** Consultar a vista explodida no sistema para inserir o código correto da peça. ***"
			}),
			[0, 4].map((start) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [start === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					pageBreakBefore: "always",
					breakBefore: "page",
					marginTop: 0
				},
				children: Header
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "10px 12px",
					marginTop: start === 0 ? 0 : 10
				},
				children: data.fotos.slice(start, start + 4).map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-avoid-break": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: photoCaptionStyle,
						children: f.legenda
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							background: "#fff",
							border: "1px solid #000",
							borderTop: "none",
							height: 220,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							overflow: "hidden"
						},
						children: f.dataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: f.dataUrl,
							alt: f.legenda,
							style: {
								maxWidth: "100%",
								maxHeight: "100%",
								objectFit: "contain"
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "#bbb",
								fontSize: 10
							},
							children: "\xA0"
						})
					})]
				}, i))
			})] }, start)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: 11,
					fontStyle: "italic",
					marginTop: 12,
					marginBottom: 4
				},
				children: "Detalhamento da Tensão de Alimentação do Produto:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					gap: 16
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						width: 130,
						height: 90,
						border: "1px solid #888",
						borderRadius: 10,
						background: "#e8e8e8",
						position: "relative",
						flexShrink: 0
					},
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: 24,
								left: 18,
								fontSize: 11,
								color: "#c00",
								fontWeight: 700
							},
							children: "F1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: 24,
								right: 18,
								fontSize: 11,
								color: "#c00",
								fontWeight: 700
							},
							children: "F2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							position: "absolute",
							top: 30,
							left: "50%",
							transform: "translateX(-50%)",
							width: 10,
							height: 10,
							borderRadius: "50%",
							background: "#333"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							position: "absolute",
							top: 30,
							left: 32,
							width: 8,
							height: 8,
							borderRadius: "50%",
							background: "#333"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							position: "absolute",
							top: 30,
							right: 32,
							width: 8,
							height: 8,
							borderRadius: "50%",
							background: "#333"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								bottom: 12,
								left: "50%",
								transform: "translateX(-50%)",
								fontSize: 10,
								color: "#c00",
								fontWeight: 700
							},
							children: "▲ Terra"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: { borderCollapse: "collapse" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						colSpan: 2,
						style: {
							...cellStyle$1,
							fontWeight: 700,
							textAlign: "center",
							background: "#fff"
						},
						children: "Leitura de Tensão na Tomada"
					}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cellStyle$1,
								textAlign: "center",
								width: 110
							},
							children: "F1 + F2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cellStyle$1,
								width: 90
							},
							children: data.tensaoF1F2
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cellStyle$1,
								textAlign: "center"
							},
							children: "F1 + Terra"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.tensaoF1Terra
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cellStyle$1,
								textAlign: "center"
							},
							children: "F2 + Terra"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: cellStyle$1,
							children: data.tensaoF2Terra
						})] })
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: 11,
					fontStyle: "italic",
					fontWeight: 700,
					marginTop: 12,
					marginBottom: 4
				},
				children: "Anotações Técnicas:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					border: "1px solid #000",
					minHeight: 70,
					padding: 8,
					fontSize: 11,
					whiteSpace: "pre-wrap"
				},
				children: data.anotacoes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: 24,
					fontStyle: "italic"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { fontSize: 11 },
					children: [
						data.cidade,
						", ",
						data.dataParecer || "___/___/______"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: 20,
						textAlign: "right",
						paddingRight: 40
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 700,
							textDecoration: "underline",
							fontSize: 13
						},
						children: data.responsavel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { fontSize: 11 },
						children: "Técnico Responsável"
					})]
				})]
			})
		]
	});
}
var cellStyle = {
	border: "1px solid #333",
	padding: "6px 8px",
	fontSize: 11,
	verticalAlign: "top",
	height: 22
};
var labelStyle = {
	...cellStyle,
	fontWeight: 700,
	background: "#dbeafe",
	whiteSpace: "nowrap",
	width: "22%"
};
var headerBar = {
	background: "#1e3a8a",
	color: "#fff",
	fontWeight: 700,
	fontSize: 12,
	padding: "6px 10px",
	textAlign: "center",
	letterSpacing: 1
};
function PhotoBox({ src, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "assurant-photo-box",
		"data-avoid-break": true,
		style: {
			border: "1px solid #333",
			breakInside: "avoid",
			pageBreakInside: "avoid"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: headerBar,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				height: 150,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#f8fafc",
				overflow: "hidden"
			},
			children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: label,
				style: {
					maxWidth: "100%",
					maxHeight: "100%",
					objectFit: "contain"
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: "#94a3b8",
					fontSize: 10
				},
				children: "[sem foto]"
			})
		})]
	});
}
function AssurantPreview({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "parecer-print",
		className: "assurant-preview",
		style: {
			background: "#fff",
			color: "#000",
			fontFamily: "'Calibri', 'Arial', sans-serif",
			padding: "15mm",
			width: "210mm",
			minHeight: "297mm",
			margin: "0 auto",
			boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginBottom: 8 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontSize: 22,
						fontWeight: 800,
						margin: 0,
						letterSpacing: 2,
						textAlign: "center"
					},
					children: "ANALISE TÉCNICA"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: headerBar,
				children: "ASSISTÊNCIA TÉCNICA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginBottom: 6,
					tableLayout: "fixed"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "22%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "28%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "22%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "28%" } })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle,
						children: "Assistência:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.assistencia || "\xA0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle,
						children: "CNPJ:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.cnpj || "\xA0"
					})
				] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: headerBar,
				children: "CONSUMIDOR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginBottom: 6,
					tableLayout: "fixed"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "22%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "28%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "22%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "28%" } })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle,
						children: "Serial:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.serial || "\xA0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle,
						children: "Sinistro:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.sinistro || "\xA0"
					})
				] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: headerBar,
				children: "PRODUTO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginBottom: 6,
					tableLayout: "fixed"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "22%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "28%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "22%" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "28%" } })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle,
						children: "Marca:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.produtoMarca || "\xA0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: labelStyle,
						children: "Modelo:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.produtoModelo || "\xA0"
					})
				] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: headerBar,
				children: "PARECER TÉCNICO APÓS ANALISE DO PRODUTO:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					border: "1px solid #333",
					borderTop: "none",
					padding: 8,
					fontSize: 11,
					minHeight: 50,
					whiteSpace: "pre-wrap"
				},
				children: data.parecerTecnico
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					...headerBar,
					marginTop: 6
				},
				children: "PEÇA QUE NECESSITA SER TROCADA E MOTIVO?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					border: "1px solid #333",
					borderTop: "none",
					padding: 8,
					fontSize: 11,
					minHeight: 40,
					whiteSpace: "pre-wrap"
				},
				children: data.pecaTrocar
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginTop: 6,
					tableLayout: "fixed"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "44%" } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "56%" } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...labelStyle,
							width: "44%"
						},
						children: "MOTIVO:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.motivo || "\xA0"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...labelStyle,
							width: "44%"
						},
						children: "QUAL FOI A FORMA DE ATENDIMENTO?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.formaAtendimento || "\xA0"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...labelStyle,
							width: "44%"
						},
						children: "PRODUTO FOI COLETADO?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cellStyle,
						children: data.produtoColetado || "\xA0"
					})] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "assurant-photo-grid",
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 8,
					marginTop: 10
				},
				children: data.fotos.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoBox, {
					src: f.dataUrl,
					label: f.legenda
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "assurant-photo-grid",
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 8,
					marginTop: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoBox, {
					src: data.cotacaoImgs[0] ?? "",
					label: "COTAÇÃO DO ORÇAMENTO DA PEÇA ATÉ 30 DIAS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoBox, {
					src: data.cotacaoImgs[1] ?? "",
					label: "COTAÇÃO DO ORÇAMENTO DA PEÇA ATÉ 30 DIAS"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 8 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoBox, {
					src: data.residenciaImg,
					label: "FOTO RESIDÊNCIA DO SEGURADO"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: 30,
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 30
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "center" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "relative",
							borderTop: "1px solid #000",
							paddingTop: 4,
							fontSize: 11,
							fontWeight: 700
						},
						children: [data.responsavel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								position: "absolute",
								left: "50%",
								bottom: "100%",
								transform: "translate(-50%, 20%) rotate(-4deg)",
								fontFamily: "\"Jennifer Lynne Bold\", \"Jennifer Lynne\", \"Kristabelle\", \"Great Vibes\", \"Segoe Script\", cursive",
								fontSize: 20,
								fontWeight: 400,
								color: "#1d4ed8",
								whiteSpace: "nowrap",
								pointerEvents: "none"
							},
							children: data.responsavel
						}), data.responsavel]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { fontSize: 10 },
						children: "Assinatura Técnico Responsàvel"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "center" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							borderTop: "1px solid #000",
							paddingTop: 4,
							fontSize: 11
						},
						children: [
							data.cidade,
							" - ",
							data.dataParecer || "___/___/______"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { fontSize: 10 },
						children: "Local e Data"
					})]
				})]
			})
		]
	});
}
function T({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children || "\xA0" });
}
function WhirlpoolPreview({ data }) {
	const telefones = [
		data.foneResidencia && `FONE RESIDÊNCIA: ${data.foneResidencia}`,
		data.foneComercial && `FONE COMERCIAL: ${data.foneComercial}`,
		data.foneOutros && `FONE (OUTROS): ${data.foneOutros}`
	].filter(Boolean).join("   ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "parecer-print",
		className: "whirlpool-preview print-only",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "whirlpool-a4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t wp-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "wp-half",
						style: { width: "70%" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "AUTORIZADA:" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data.autorizada }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [data.enderecoAutorizada, data.cnpjAutorizada ? `  CNPJ: ${data.cnpjAutorizada}` : ""] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"FONE: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { fontSize: "10pt" },
									children: data.foneAutorizada
								}),
								data.inscEstadualAutorizada ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { marginLeft: "40mm" },
									children: ["Insc.Estadual: ", data.inscEstadualAutorizada]
								}) : null
							] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "wp-half",
						style: { width: "30%" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Central de Atendimento" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data.centralAtendimento }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["FONE: ", data.foneCentral1] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["FONE: ", data.foneCentral2] })
						]
					})] }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								width: "14%",
								textAlign: "center",
								verticalAlign: "middle"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "wp-lbl",
								children: "NÚMERO DA OS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "wp-strong",
								style: {
									border: "none",
									padding: "2px 0"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.numeroOS })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								width: "12%",
								textAlign: "center",
								verticalAlign: "middle"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "wp-lbl",
								children: "TÉCNICO"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "wp-strong",
								style: {
									border: "none",
									padding: "2px 0"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.tecnico })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								width: "44%",
								textAlign: "center",
								fontFamily: "'Courier New', monospace",
								verticalAlign: "middle"
							},
							children: "COLE AQUI A ETIQUETA DO PRODUTO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								width: "30%",
								verticalAlign: "middle",
								lineHeight: 1.35
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["DATA AGENDA: ", data.dataAgenda] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["DATA CHAMADO: ", data.dataChamado] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["PÉRIODO: ", data.periodo] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["TIPO AGENDA: ", data.tipoAgenda] })
							]
						})
					] }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t wp-noinner",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 2,
								children: ["CONSUMIDOR: ", data.consumidor]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["CEP: ", data.cep] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["REGIÃO: ", data.regiao] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["ENDEREÇO: ", data.endereco]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["BAIRRO: ", data.bairro]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 2,
								children: ["COMPLEMENTO: ", data.complemento]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["CIDADE: ", data.cidade] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["UF: ", data.uf] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["CNPJ/CPF: ", data.cnpjCpf]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["ENDEREÇO ELETRÔNICO: ", data.enderecoEletronico]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 4,
							children: telefones || "\xA0"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 4,
							children: ["LOCALIZAÇÃO: ", data.localizacao]
						}) })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t wp-noinner",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["PRODUTO: ", data.produto]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["MARCA: ", data.marca]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["PRODUTO CONSUMIDOR: ", data.produtoConsumidor]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 2,
							children: ["LINHA: ", data.linha]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["SÉRIE: ", data.serie] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["NOME COMERCIAL: ", data.nomeComercial] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 2,
								children: ["TEMPO DE USO: ", data.tempoUso]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 4,
							children: ["TIPO DE OS: ", data.tipoOS]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 4,
							children: [
								"NR NOTA FISCAL: ",
								data.nrNotaFiscal,
								"   DATA COMPRA: ",
								data.dataCompra,
								"   COR: ",
								data.cor,
								"   VOLTAGEM: ",
								data.voltagem,
								"   CAPACIDADE: ",
								data.capacidade
							]
						}) })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "wp-lbl",
								style: { width: "14%" },
								children: [
									"DEFEITO",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"RECLAMADO"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								style: { width: "36%" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["1\xA0\xA0", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.defeitoReclamado })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["2\xA0\xA0", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.defeitoReclamado2 })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "wp-lbl",
								style: { width: "14%" },
								children: [
									"DEFEITO",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"CONSTATADO"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								style: { width: "36%" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["1\xA0\xA0", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.defeitoConstatado })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["2\xA0\xA0", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.defeitoConstatado2 })] })]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "wp-lbl",
							children: [
								"RECLAMAÇÃO",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"ATENDIMENTO"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 3,
							className: "wp-multi",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.reclamacaoAtendimento })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "wp-lbl",
							children: [
								"LAUDO",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"TÉCNICO"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 3,
							className: "wp-multi",
							style: {
								height: "60px",
								verticalAlign: "top"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.laudoTecnico })
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "wp-t wp-parts",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { width: "14%" },
							children: "QUANTIDADE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { width: "12%" },
							children: "CÓDIGO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { width: "46%" },
							children: "DESCRIÇÃO DA PEÇA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { width: "8%" },
							children: "FCTA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { width: "7%" },
							children: "OCOR."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { width: "13%" },
							children: "VALOR EM R$"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Array.from({ length: Math.max(8, data.pecas.length) }).map((_, i) => {
						const p = data.pecas[i];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p?.quantidade || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p?.codigo || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p?.descricao || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p?.fcta || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p?.ocor || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p?.valor || "\xA0" })
						] }, i);
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								rowSpan: 3,
								style: { width: "72%" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "wp-lbl-inline",
									children: "OBSERVAÇÃO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "wp-obs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { children: data.observacao })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									width: "16%",
									borderRight: "none",
									whiteSpace: "nowrap",
									paddingRight: "4px"
								},
								children: "TOTAL DE PEÇAS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									width: "12%",
									borderLeft: "none",
									textAlign: "right",
									paddingRight: "4px",
									whiteSpace: "nowrap"
								},
								children: data.totalPecas
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								borderRight: "none",
								whiteSpace: "nowrap",
								paddingRight: "4px"
							},
							children: "MÃO DE OBRA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								borderLeft: "none",
								textAlign: "right",
								paddingRight: "4px",
								whiteSpace: "nowrap"
							},
							children: data.maoDeObra
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								borderRight: "none",
								whiteSpace: "nowrap",
								paddingRight: "4px"
							},
							children: "TOTAL DE ORÇAMENTO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								borderLeft: "none",
								textAlign: "right",
								paddingRight: "4px",
								whiteSpace: "nowrap"
							},
							children: data.totalOrcamento
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "wp-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								rowSpan: 4,
								style: {
									width: "40%",
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "wp-title-inline",
									children: "ORÇAMENTO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontSize: "8pt" },
									children: data.validadeOrcamento
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									width: "12%",
									textAlign: "center"
								},
								children: "PARCELAS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									width: "14%",
									textAlign: "center"
								},
								children: "VENCIMENTO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									width: "12%",
									textAlign: "center"
								},
								children: "VALOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									width: "22%",
									textAlign: "center"
								},
								children: "CONDIÇÃO DE PAGAMENTO"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: data.parcelas || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: data.vencimento || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: data.valorOrcamento || "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: data.condicaoPagamento || "\xA0" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "\xA0" })
						] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wp-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wp-title-inline",
							style: { textAlign: "center" },
							children: "AUTORIZAÇÃO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { margin: "4px 0" },
							children: "EU ________________________________________________________________ AUTORIZO A REALIZAÇÃO DO SERVIÇO, BEM COMO A TROCA DE PEÇAS, CONFORME O PRESENTE DIAGNÓSTICO E/OU ORÇAMENTO TÉCNICO, TENDO RECEBIDO ORIENTAÇÕES NECESSÁRIAS."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								marginTop: "18px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								data.dataAprovacao || "____/____/__________",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "DATA DA APROVAÇÃO" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									textAlign: "right",
									marginRight: "20mm"
								},
								children: [
									data.assinaturaConsumidor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: data.assinaturaConsumidor,
										alt: "Assinatura",
										style: {
											height: "80px",
											maxWidth: "320px",
											display: "inline-block",
											borderBottom: "1px solid #000"
										}
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "_________________________________________" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ASSINATURA DO CONSUMIDOR" })
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wp-box",
					style: { fontWeight: "bold" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wp-title-inline",
							style: { textAlign: "center" },
							children: "TERMO DE GARANTIA DO SERVIÇO AUTORIZADO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: "4px 0",
								fontSize: "7.5pt",
								textAlign: "justify"
							},
							children: "CONFORME DESCRITO NO ORÇAMENTO JÁ APROVADO, FIRMAMOS A GARANTIA DO SERVIÇO (MÃO DE OBRA) DE ASSISTÊNCIA TÉCNICA POR UM PERÍODO DE _______(___) MESES E DAS PEÇAS APLICADAS POR UM PERÍODO DE _______(___) MESES, A PARTIR DE ________________ (DATA DE CONCLUSÃO), QUANDO O SERVIÇO FOI DEVIDAMENTE EXECUTADO, ESTANDO EM PERFEITAS CONDIÇÕES DE UTILIZAÇÃO, TENDO RECEBIDO AS ORIENTAÇÕES NECESSÁRIAS PARA A CORRETA UTILIZAÇÃO DO PRODUTO."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: "4px 0",
								fontSize: "7.5pt",
								textAlign: "justify"
							},
							children: "EXCLUEM-SE DA GARANTIA OS DEFEITOS CAUSADOS POR USO IMPRÓPRIO OU INADEQUADO DO PRODUTO E PROBLEMAS DECORRENTES DE ACIDENTES NATURAIS, COMO POR EXEMPLO: RAIO, INCÊNCIO, INUMDAÇÕES E ETC."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: "4px 0",
								fontSize: "7.5pt",
								textAlign: "justify"
							},
							children: "DENTRO DO PRAZO DE GARANTIA DO SERVIÇO E DAS PEÇAS SUBSTITUÍDAS, A TROCA DESSAS PEÇAS E COMPONENTES EVENTUALMENTE DEFEITUOSAS SERÁ GRATUIDA, ASSIM COMO A MÃO DE OBRA APLICADA."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: "4px 0",
								fontSize: "7.5pt"
							},
							children: "DE ACORDO."
						})
					]
				})
			]
		})
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = objectType({
	mimeType: stringType().default("image/jpeg"),
	base64: stringType()
});
var identificarPecaFoto = createServerFn({ method: "POST" }).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("e64168893f005e5031b250a47ffee0051c3fad4cb259180c3e6b4be700ce7a85"));
var EnrichInput = objectType({
	codigo: stringType().min(1),
	descricao: stringType().optional().default("")
});
var enriquecerPecaEletrolux = createServerFn({ method: "POST" }).inputValidator((input) => EnrichInput.parse(input)).handler(createSsrRpc("3ee9ced25757c75e2ce1cfdb88162dac84e9e93162ad5de4792ad084e8bea1b9"));
var rowToItem = (r) => ({
	id: r.id,
	codigo: r.codigo,
	descricao: r.descricao ?? "",
	quantidade: r.quantidade,
	localizacao: r.localizacao ?? "",
	criadoEm: r.created_at,
	codigoBarras: r.codigo_barras ?? void 0,
	marca: r.marca ?? void 0,
	modelosAplicados: r.modelos_aplicados ?? void 0,
	categoria: r.categoria ?? void 0,
	fonte: r.fonte ?? void 0,
	foto: r.foto ?? void 0
});
var rowToMov = (r) => ({
	id: r.id,
	itemId: r.item_id ?? "",
	codigo: r.codigo,
	descricao: r.descricao ?? "",
	quantidade: r.quantidade,
	tecnico: r.tecnico ?? "",
	os: r.os ?? "",
	data: r.data
});
function EstoqueScreen({ onBack }) {
	const { isDark, toggle: toggleTheme } = useTheme();
	const [view, setView] = (0, import_react.useState)("menu");
	const [itens, setItens] = (0, import_react.useState)([]);
	const [movs, setMovs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const reload = async () => {
		try {
			let iData = [];
			const iRes = await supabase.from("estoque_itens").select("id, codigo, descricao, quantidade, localizacao, codigo_barras, marca, modelos_aplicados, categoria, fonte, created_at").order("created_at", { ascending: false }).limit(300);
			if (iRes.error) {
				console.warn("Tentando carregar estoque_itens sem ordem:", iRes.error.message);
				const iFallback = await supabase.from("estoque_itens").select("id, codigo, descricao, quantidade, localizacao, codigo_barras, marca, modelos_aplicados, categoria, fonte, created_at").limit(300);
				if (!iFallback.error && iFallback.data) iData = iFallback.data;
				else toast.error(`Aviso estoque_itens: ${iRes.error.message}`);
			} else if (iRes.data) iData = iRes.data;
			let mData = [];
			const mRes = await supabase.from("estoque_movimentos").select("*").order("data", { ascending: false }).limit(200);
			if (!mRes.error && mRes.data) mData = mRes.data;
			setItens(iData.map(rowToItem));
			setMovs(mData.map(rowToMov));
		} catch (err) {
			console.error("Erro ao carregar estoque:", err);
			toast.error(err instanceof Error ? err.message : "Falha ao carregar estoque.");
		} finally {
			setLoading(false);
		}
	};
	const changeView = (v) => {
		if (v !== view) {
			if (v !== "menu") window.history.pushState({ estoqueView: v }, "");
			setView(v);
		}
	};
	(0, import_react.useEffect)(() => {
		window.scrollTo(0, 0);
		reload();
	}, []);
	(0, import_react.useEffect)(() => {
		window.scrollTo(0, 0);
		const handlePop = (e) => {
			const state = e.state;
			if (state && state.estoqueView) setView(state.estoqueView);
			else if (view !== "menu") setView("menu");
		};
		window.addEventListener("popstate", handlePop);
		return () => window.removeEventListener("popstate", handlePop);
	}, [view]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen min-h-[100dvh] bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-2.5 sm:px-6 sm:py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => view === "menu" ? onBack() : changeView("menu"),
						className: "inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2.5 sm:px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition shrink-0",
						title: "Voltar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Voltar" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-1.5 sm:p-2 shadow-lg shadow-fuchsia-500/20 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "h-4 w-4 sm:h-5 sm:w-5 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-sm font-black sm:text-lg truncate text-slate-900 dark:text-slate-100",
								children: "Estoque"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-500 dark:text-slate-400 truncate",
								children: loading ? "carregando…" : `${itens.length} item(s) · ${movs.length} saída(s)`
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: toggleTheme,
						className: "flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition",
						title: "Alternar tema",
						children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
							className: "h-4 w-4",
							strokeWidth: 2.5
						})
					}), view !== "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-slate-200 dark:bg-white/10 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-white/80",
						children: view === "consulta" ? "Consulta" : view === "cadastro" ? "Cadastro" : "Retirada"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-10",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-20 text-slate-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }), " Carregando estoque…"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				view === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGrid, {
					setView: changeView,
					itens,
					movs
				}),
				view === "consulta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultaView, {
					itens,
					onReload: reload
				}),
				view === "cadastro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CadastroView, {
					itens,
					onReload: reload
				}),
				view === "retirada" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetiradaView, {
					itens,
					movs,
					onReload: reload
				})
			] })
		})]
	});
}
function MenuGrid({ setView, itens, movs }) {
	const totalUnidades = itens.reduce((sum, it) => sum + (Number(it.quantidade) || 0), 0);
	const cards = [
		{
			id: "consulta",
			title: "Consulta",
			desc: "Pesquise itens em estoque por código, descrição ou localização.",
			icon: Search,
			gradient: "from-sky-500 via-cyan-500 to-teal-400",
			stat: `${itens.length} itens`
		},
		{
			id: "cadastro",
			title: "Cadastro",
			desc: "Adicione novos itens e atualize quantidades disponíveis.",
			icon: PackagePlus,
			gradient: "from-emerald-500 via-green-500 to-lime-400",
			stat: `${totalUnidades} un.`
		},
		{
			id: "retirada",
			title: "Retirada",
			desc: "Registre saída de peças vinculadas ao técnico e à OS.",
			icon: PackageMinus,
			gradient: "from-rose-500 via-fuchsia-500 to-purple-500",
			stat: `${movs.length} saídas`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100",
			children: "Controle de Estoque"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-slate-500 dark:text-slate-400",
			children: "Escolha uma operação. Os dados são compartilhados entre todos os usuários da equipe."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-6 md:grid-cols-3",
		children: cards.map((c) => {
			const Icon = c.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setView(c.id),
				className: "group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 text-left shadow-2xs transition hover:-translate-y-1 hover:shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.gradient} opacity-20 dark:opacity-30 blur-3xl transition group-hover:opacity-50` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `relative inline-flex rounded-xl bg-gradient-to-br ${c.gradient} p-3 shadow-lg`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-white" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "relative mt-5 text-xl font-bold text-slate-900 dark:text-slate-100",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative mt-2 text-sm text-slate-600 dark:text-slate-300",
						children: c.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-slate-100 dark:bg-white/10 px-3 py-1 text-xs font-bold text-slate-700 dark:text-white/90",
							children: c.stat
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 group-hover:underline",
							children: "Abrir →"
						})]
					})
				]
			}, c.id);
		})
	})] });
}
function ConsultaView({ itens, onReload }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [modo, setModo] = (0, import_react.useState)("dados");
	const [analisandoFoto, setAnalisandoFoto] = (0, import_react.useState)(false);
	const [fotoPreview, setFotoPreview] = (0, import_react.useState)("");
	const [ultimaIdent, setUltimaIdent] = (0, import_react.useState)("");
	const identificar = useServerFn(identificarPecaFoto);
	const filtered = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		if (!t) return itens;
		return itens.filter((it) => it.codigo.toLowerCase().includes(t) || it.descricao.toLowerCase().includes(t) || it.localizacao.toLowerCase().includes(t) || (it.codigoBarras || "").toLowerCase().includes(t) || (it.marca || "").toLowerCase().includes(t));
	}, [q, itens]);
	const handleFotoConsulta = async (file) => {
		if (!file) return;
		if (file.size > 8388608) {
			toast.error("Imagem muito grande (máx. 8 MB).");
			return;
		}
		const reader = new FileReader();
		reader.onload = async () => {
			const dataUrl = String(reader.result || "");
			setFotoPreview(dataUrl);
			const base64 = dataUrl.split(",")[1] || "";
			const mimeType = file.type || "image/jpeg";
			setAnalisandoFoto(true);
			try {
				const r = await identificar({ data: {
					base64,
					mimeType
				} });
				const codigoRef = (r.codigo || "").toUpperCase().trim();
				const barrasRef = (r.codigoBarras || "").trim();
				setUltimaIdent([
					codigoRef,
					barrasRef,
					r.descricao
				].filter(Boolean).join(" · "));
				const match = itens.find((it) => {
					const c = it.codigo.toUpperCase();
					const b = (it.codigoBarras || "").trim();
					return codigoRef && c === codigoRef || barrasRef && b && b === barrasRef;
				});
				if (match) {
					setSelected(match);
					toast.success(`Peça localizada: ${match.codigo}`);
				} else {
					const query = codigoRef || barrasRef || r.descricao || "";
					setQ(query);
					setModo("dados");
					toast.warning("Peça não encontrada no estoque. Confira os resultados.");
				}
			} catch (err) {
				console.error(err);
				toast.error(err instanceof Error ? err.message : "Falha ao analisar a foto.");
			} finally {
				setAnalisandoFoto(false);
			}
		};
		reader.readAsDataURL(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/60 dark:bg-slate-950/40 p-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setModo("dados"),
				className: `flex-1 rounded-lg px-3 py-2 text-xs font-bold transition ${modo === "dados" ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/5"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-1 inline h-3.5 w-3.5" }), " Por dados"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setModo("foto"),
				className: `flex-1 rounded-lg px-3 py-2 text-xs font-bold transition ${modo === "foto" ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/5"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "mr-1 inline h-3.5 w-3.5" }), " Por foto"]
			})]
		}),
		modo === "dados" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-4 py-3 shadow-2xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-slate-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar por código, descrição, barras, marca ou localização…",
					className: "w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
				}),
				q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setQ(""),
					className: "text-slate-400 hover:text-slate-700 dark:hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 shadow-2xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-cyan-500/40 bg-cyan-500/5 px-4 py-6 text-center text-xs text-slate-700 dark:text-slate-300 hover:bg-cyan-500/10",
					children: [analisandoFoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-cyan-600 dark:text-cyan-300" }), "Analisando…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-6 w-6 text-cyan-600 dark:text-cyan-300" }), "Tirar foto ou selecionar imagem da peça"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) handleFotoConsulta(f);
							e.target.value = "";
						},
						className: "hidden"
					})]
				}),
				fotoPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: fotoPreview,
					alt: "",
					className: "mt-3 max-h-40 w-full rounded-md border border-slate-200 dark:border-slate-800 object-contain bg-slate-100 dark:bg-black/40"
				}),
				ultimaIdent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[11px] text-slate-500 dark:text-slate-400",
					children: ["Identificado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-slate-800 dark:text-slate-200",
						children: ultimaIdent
					})]
				})
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-10 text-center text-slate-500 dark:text-slate-400 shadow-2xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto mb-3 h-10 w-10 opacity-50" }), "Nenhum item encontrado."]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
			children: filtered.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setSelected(it),
				className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 text-left shadow-2xs transition hover:border-cyan-500/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-mono font-bold uppercase text-indigo-600 dark:text-cyan-300",
							children: it.codigo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `rounded-full px-2 py-0.5 text-[10px] font-bold ${it.quantidade > 5 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300" : it.quantidade > 0 ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300" : "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"}`,
							children: [it.quantidade, " un."]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-semibold text-slate-900 dark:text-white",
						children: it.descricao
					}),
					it.localizacao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 text-xs text-slate-500 dark:text-slate-400",
						children: ["📍 ", it.localizacao]
					})
				]
			}, it.id))
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDetailModal, {
			item: selected,
			onClose: () => setSelected(null),
			onReload
		})
	] });
}
function ItemDetailModal({ item, onClose, onReload }) {
	const [editando, setEditando] = (0, import_react.useState)(false);
	const [descricao, setDescricao] = (0, import_react.useState)(item.descricao);
	const [localizacao, setLocalizacao] = (0, import_react.useState)(item.localizacao);
	const [salvando, setSalvando] = (0, import_react.useState)(false);
	const [fotoUrl, setFotoUrl] = (0, import_react.useState)(item.foto || "");
	(0, import_react.useEffect)(() => {
		if (item.foto) {
			setFotoUrl(item.foto);
			return;
		}
		supabase.from("estoque_itens").select("foto").eq("id", item.id).maybeSingle().then(({ data }) => {
			if (data?.foto) setFotoUrl(data.foto);
		});
	}, [item]);
	const salvar = async () => {
		if (!descricao.trim()) {
			toast.error("Informe a descrição.");
			return;
		}
		setSalvando(true);
		try {
			const { error } = await supabase.from("estoque_itens").update({
				descricao: descricao.trim(),
				localizacao: localizacao.trim()
			}).eq("id", item.id);
			if (error) throw error;
			toast.success("Dados atualizados.");
			setEditando(false);
			await onReload();
			onClose();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Falha ao salvar.");
		} finally {
			setSalvando(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-xs animate-fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-2xl animate-slide-up text-slate-900 dark:text-slate-100",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-mono font-bold uppercase text-indigo-600 dark:text-cyan-300",
						children: item.codigo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-slate-900 dark:text-white",
						children: "Ficha do item"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				fotoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 overflow-hidden rounded-xl border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: fotoUrl,
						alt: `Foto de ${item.descricao}`,
						className: "max-h-52 w-full object-contain bg-black/40"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => downloadDataUrl(fotoUrl, `${item.codigo}-${item.descricao}`),
						className: "w-full bg-white/10 py-2 text-xs font-semibold text-white hover:bg-white/20",
						children: "⬇ Baixar foto"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Código",
							value: item.codigo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Código de barras",
							value: item.codigoBarras || "—"
						}),
						editando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableField, {
							label: "Descrição",
							value: descricao,
							onChange: setDescricao
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Descrição",
							value: item.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Marca",
							value: item.marca || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Categoria",
							value: item.categoria || "—"
						}),
						editando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableField, {
							label: "Localização",
							value: localizacao,
							onChange: setLocalizacao
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Localização",
							value: item.localizacao || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Quantidade em estoque",
							value: String(item.quantidade)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
							label: "Cadastrado em",
							value: new Date(item.criadoEm).toLocaleString("pt-BR")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
						label: "Modelos aplicados",
						value: item.modelosAplicados && item.modelosAplicados.length > 0 ? item.modelosAplicados.join(", ") : "—",
						fullWidth: true
					})
				}),
				item.fonte && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: item.fonte,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-2 text-xs font-semibold text-fuchsia-100 hover:bg-fuchsia-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), " Abrir Compra Parceiros"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: editando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setDescricao(item.descricao);
							setLocalizacao(item.localizacao);
							setEditando(false);
						},
						className: "rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void salvar(),
						disabled: salvando,
						className: "inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 disabled:opacity-60",
						children: [salvando && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Salvar alterações"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setEditando(true),
						className: "inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), " Editar dados"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20",
						children: "Fechar"
					})] })
				})
			]
		})
	});
}
function EditableField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-cyan-300",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-500"
		})]
	});
}
function ReadOnlyField({ label, value, fullWidth }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `block ${fullWidth ? "md:col-span-2" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-3 py-2 text-sm text-slate-900 dark:text-slate-200 font-medium",
			children: value
		})]
	});
}
function CadastroView({ itens, onReload }) {
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [descricao, setDescricao] = (0, import_react.useState)("");
	const [localizacao, setLocalizacao] = (0, import_react.useState)("");
	const [codigoBarras, setCodigoBarras] = (0, import_react.useState)("");
	const [marca, setMarca] = (0, import_react.useState)("");
	const [modelosAplicados, setModelosAplicados] = (0, import_react.useState)([]);
	const [categoria, setCategoria] = (0, import_react.useState)("");
	const [fonte, setFonte] = (0, import_react.useState)("");
	const [foto, setFoto] = (0, import_react.useState)("");
	const [analisando, setAnalisando] = (0, import_react.useState)(false);
	const [enriquecendo, setEnriquecendo] = (0, import_react.useState)(false);
	const [quantidadeTemp, setQuantidadeTemp] = (0, import_react.useState)("0");
	const [mostrarTeclado, setMostrarTeclado] = (0, import_react.useState)(false);
	const identificar = useServerFn(identificarPecaFoto);
	const enriquecer = useServerFn(enriquecerPecaEletrolux);
	const limparCampos = () => {
		setCodigo("");
		setDescricao("");
		setLocalizacao("");
		setCodigoBarras("");
		setMarca("");
		setModelosAplicados([]);
		setCategoria("");
		setFonte("");
		setFoto("");
		setQuantidadeTemp("0");
	};
	const handleFoto = async (file) => {
		if (!file) return;
		if (file.size > 8388608) {
			toast.error("Imagem muito grande (máx. 8 MB).");
			return;
		}
		const reader = new FileReader();
		reader.onload = async () => {
			const dataUrl = String(reader.result || "");
			setFoto(dataUrl);
			const base64 = dataUrl.split(",")[1] || "";
			const mimeType = file.type || "image/jpeg";
			setAnalisando(true);
			try {
				const r = await identificar({ data: {
					base64,
					mimeType
				} });
				if (r.codigo) setCodigo(r.codigo);
				if (r.codigoBarras) setCodigoBarras(r.codigoBarras);
				if (r.descricao) setDescricao(r.descricao);
				if (r.marca) setMarca(r.marca);
				if (r.modelosAplicados?.length) setModelosAplicados(r.modelosAplicados);
				toast.success("Peça identificada pela foto.");
				if (r.codigo) {
					setEnriquecendo(true);
					try {
						const e = await enriquecer({ data: {
							codigo: r.codigo,
							descricao: r.descricao || ""
						} });
						if (e.descricao && !r.descricao) setDescricao(e.descricao);
						if (e.modelosAplicados?.length) setModelosAplicados((prev) => Array.from(/* @__PURE__ */ new Set([...prev, ...e.modelosAplicados])));
						if (e.categoria) setCategoria(e.categoria);
						if (e.fonte) setFonte(e.fonte);
					} catch (err) {
						console.error(err);
					} finally {
						setEnriquecendo(false);
					}
				}
			} catch (err) {
				console.error(err);
				toast.error(err instanceof Error ? err.message : "Falha ao analisar a foto.");
			} finally {
				setAnalisando(false);
			}
		};
		reader.readAsDataURL(file);
	};
	const buscarNoSiteParceiros = async () => {
		if (!codigo.trim()) {
			toast.error("Informe o código antes de buscar.");
			return;
		}
		setEnriquecendo(true);
		try {
			const e = await enriquecer({ data: {
				codigo: codigo.trim(),
				descricao: descricao.trim()
			} });
			if (e.descricao) setDescricao(e.descricao);
			if (e.modelosAplicados?.length) setModelosAplicados((prev) => Array.from(/* @__PURE__ */ new Set([...prev, ...e.modelosAplicados])));
			if (e.categoria) setCategoria(e.categoria);
			if (e.fonte) setFonte(e.fonte);
			toast.success("Informações complementares carregadas.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Falha na busca.");
		} finally {
			setEnriquecendo(false);
		}
	};
	const abrirTecladoQuantidade = (e) => {
		e.preventDefault();
		if (!codigo.trim() || !descricao.trim()) {
			toast.error("Informe código e descrição.");
			return;
		}
		setQuantidadeTemp("0");
		setMostrarTeclado(true);
	};
	const salvar = async (qtdInformada) => {
		const q = qtdInformada || 0;
		if (q <= 0) {
			toast.error("Informe uma quantidade maior que zero.");
			return;
		}
		const existing = itens.find((it) => it.codigo.toLowerCase() === codigo.trim().toLowerCase());
		try {
			if (existing) {
				const { error } = await supabase.from("estoque_itens").update({
					descricao: descricao.trim() || existing.descricao,
					localizacao: localizacao.trim() || existing.localizacao,
					quantidade: existing.quantidade + q,
					codigo_barras: codigoBarras.trim() || existing.codigoBarras || null,
					marca: marca.trim() || existing.marca || null,
					modelos_aplicados: modelosAplicados.length ? modelosAplicados : existing.modelosAplicados || null,
					categoria: categoria.trim() || existing.categoria || null,
					fonte: fonte.trim() || existing.fonte || null,
					foto: foto || existing.foto || null
				}).eq("id", existing.id);
				if (error) throw error;
				toast.success(`Quantidade somada! Novo total: ${existing.quantidade + q} un.`);
			} else {
				const { error } = await supabase.from("estoque_itens").insert({
					codigo: codigo.trim().toUpperCase(),
					descricao: descricao.trim(),
					localizacao: localizacao.trim(),
					quantidade: q,
					codigo_barras: codigoBarras.trim() || null,
					marca: marca.trim() || null,
					modelos_aplicados: modelosAplicados.length ? modelosAplicados : null,
					categoria: categoria.trim() || null,
					fonte: fonte.trim() || null,
					foto: foto || null
				});
				if (error) throw error;
				toast.success(`Peça ${codigo.toUpperCase()} cadastrada com ${q} un.`);
			}
			limparCampos();
			setMostrarTeclado(false);
			await onReload();
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Falha ao salvar peça.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-6 lg:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: abrirTecladoQuantidade,
				className: "lg:col-span-3 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 sm:p-6 shadow-2xs text-slate-900 dark:text-slate-100",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-slate-900 dark:text-white",
							children: "Novo cadastro de peça"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: limparCampos,
							className: "text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200",
							children: "Limpar formulário"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 shadow-2xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-fuchsia-600 dark:text-fuchsia-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Leitura Inteligente por Foto (IA)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-slate-600 dark:text-slate-300",
								children: "Tire uma foto da etiqueta, embalagem ou código de barras. Vamos identificar o código e buscar modelos aplicados."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fuchsia-600 dark:bg-fuchsia-500/20 px-3 py-2 text-xs font-semibold text-white dark:text-fuchsia-100 hover:opacity-90",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-4 w-4" }),
											" Tirar foto ou galeria",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												className: "hidden",
												onChange: (e) => {
													const f = e.target.files?.[0];
													if (f) handleFoto(f);
													e.currentTarget.value = "";
												}
											})
										]
									}),
									foto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFoto(""),
										className: "rounded-lg bg-rose-100 dark:bg-rose-500/20 px-2 py-2 text-xs font-semibold text-rose-700 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-500/30",
										title: "Remover foto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									}),
									(analisando || enriquecendo) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-xs text-fuchsia-600 dark:text-fuchsia-200 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), analisando ? "Analisando foto…" : "Buscando dados…"]
									})
								]
							}),
							foto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: foto,
									alt: "Peça",
									className: "max-h-40 w-full object-contain bg-slate-100 dark:bg-black/40"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Código",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: codigo,
							onChange: (e) => setCodigo(e.target.value.toUpperCase()),
							className: inputCls,
							placeholder: "Ex.: W10820038"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Código de barras",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: codigoBarras,
								onChange: (e) => setCodigoBarras(e.target.value),
								className: inputCls,
								placeholder: "EAN/GTIN"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Marca",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: marca,
								onChange: (e) => setMarca(e.target.value),
								className: inputCls,
								placeholder: "Electrolux"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Descrição",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: descricao,
							onChange: (e) => setDescricao(e.target.value),
							className: inputCls,
							placeholder: "Ex.: Placa de potência"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Localização",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: localizacao,
							onChange: (e) => setLocalizacao(e.target.value),
							className: inputCls,
							placeholder: "Ex.: Prateleira A3"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Categoria",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: categoria,
							onChange: (e) => setCategoria(e.target.value),
							className: inputCls,
							placeholder: "Refrigeração…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Modelos aplicados",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: modelosAplicados.join(", "),
							onChange: (e) => setModelosAplicados(e.target.value.split(",").map((s) => s.trim()).filter(Boolean)),
							className: `${inputCls} min-h-16`,
							placeholder: "Modelo A, Modelo B…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void buscarNoSiteParceiros(),
							disabled: enriquecendo || !codigo.trim(),
							className: "inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition",
							children: [enriquecendo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-4 w-4 text-cyan-600 dark:text-cyan-300" }), "Buscar informações online"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-md hover:brightness-110 active:scale-[0.99] transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Continuar para informar quantidade →"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 sm:p-6 shadow-2xs text-slate-900 dark:text-slate-100",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-slate-900 dark:text-white",
						children: "Resumo e visualização"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 dark:text-slate-400",
						children: "Verifique os dados antes de definir a quantidade que entrará no estoque."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
								label: "Código",
								value: codigo || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
								label: "Descrição",
								value: descricao || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
								label: "Localização",
								value: localizacao || "—"
							}),
							marca && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
								label: "Marca",
								value: marca
							}),
							categoria && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
								label: "Categoria",
								value: categoria
							}),
							modelosAplicados.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnlyField, {
								label: "Modelos aplicados",
								value: modelosAplicados.join(", "),
								fullWidth: true
							}),
							fonte && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-slate-500 dark:text-slate-400",
								children: ["Fonte dos dados: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-slate-700 dark:text-slate-300",
									children: fonte
								})]
							})
						]
					})
				]
			}),
			mostrarTeclado && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-fade-in",
				onClick: () => setMostrarTeclado(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xl animate-slide-up text-slate-900 dark:text-slate-100",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-mono font-bold uppercase text-indigo-600 dark:text-cyan-300",
									children: codigo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-slate-900 dark:text-white",
									children: descricao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs text-slate-500 dark:text-slate-400",
									children: "Digite a quantidade de entrada:"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-center text-3xl font-black tracking-wider text-indigo-600 dark:text-cyan-300",
							children: [
								quantidadeTemp || "0",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-normal text-slate-500 dark:text-slate-400",
									children: "un"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								[
									"1",
									"2",
									"3",
									"4",
									"5",
									"6",
									"7",
									"8",
									"9"
								].map((num) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuantidadeTemp((prev) => prev === "0" ? num : prev + num),
									className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 py-3 text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition",
									children: num
								}, num)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuantidadeTemp("0"),
									className: "rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 py-3 text-xs font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 active:scale-95 transition",
									children: "Limpar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuantidadeTemp((prev) => prev === "0" ? "0" : prev + "0"),
									className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 py-3 text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition",
									children: "0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuantidadeTemp((prev) => prev.length > 1 ? prev.slice(0, -1) : "0"),
									className: "rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 py-3 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 active:scale-95 transition",
									children: "⌫ Apagar"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMostrarTeclado(false),
								className: "flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void salvar(parseInt(quantidadeTemp, 10) || 0),
								className: "flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110",
								children: "Confirmar"
							})]
						})
					]
				})
			})
		]
	});
}
function RetiradaView({ itens, movs, onReload }) {
	const [modo, setModo] = (0, import_react.useState)("dados");
	const [busca, setBusca] = (0, import_react.useState)("");
	const [itemId, setItemId] = (0, import_react.useState)("");
	const [qtd, setQtd] = (0, import_react.useState)("");
	const [tecnico, setTecnico] = (0, import_react.useState)("");
	const [os, setOs] = (0, import_react.useState)("");
	const [analisandoFoto, setAnalisandoFoto] = (0, import_react.useState)(false);
	const [fotoPreview, setFotoPreview] = (0, import_react.useState)("");
	const [ultimaIdent, setUltimaIdent] = (0, import_react.useState)("");
	const identificar = useServerFn(identificarPecaFoto);
	const item = (0, import_react.useMemo)(() => itens.find((it) => it.id === itemId), [itens, itemId]);
	const resultados = (0, import_react.useMemo)(() => {
		const t = busca.trim().toLowerCase();
		if (!t) return [];
		return itens.filter((it) => it.codigo.toLowerCase().includes(t) || it.descricao.toLowerCase().includes(t) || (it.codigoBarras || "").toLowerCase().includes(t) || (it.marca || "").toLowerCase().includes(t));
	}, [busca, itens]);
	const handleFotoRetirada = async (file) => {
		if (!file) return;
		if (file.size > 8388608) {
			toast.error("Imagem muito grande (máx. 8 MB).");
			return;
		}
		const reader = new FileReader();
		reader.onload = async () => {
			const dataUrl = String(reader.result || "");
			setFotoPreview(dataUrl);
			const base64 = dataUrl.split(",")[1] || "";
			const mimeType = file.type || "image/jpeg";
			setAnalisandoFoto(true);
			try {
				const r = await identificar({ data: {
					base64,
					mimeType
				} });
				const codigoRef = (r.codigo || "").toUpperCase().trim();
				const barrasRef = (r.codigoBarras || "").trim();
				setUltimaIdent([
					codigoRef,
					barrasRef,
					r.descricao
				].filter(Boolean).join(" · "));
				const match = itens.find((it) => {
					const c = it.codigo.toUpperCase();
					const b = (it.codigoBarras || "").trim();
					return codigoRef && c === codigoRef || barrasRef && b && b === barrasRef;
				});
				if (match) {
					setItemId(match.id);
					setQtd("1");
					toast.success(`Peça localizada: ${match.codigo}`);
				} else toast.warning("Peça não encontrada no estoque. Confira os resultados.");
			} catch (err) {
				console.error(err);
				toast.error(err instanceof Error ? err.message : "Falha ao analisar a foto.");
			} finally {
				setAnalisandoFoto(false);
			}
		};
		reader.readAsDataURL(file);
	};
	const submit = async (e) => {
		e.preventDefault();
		if (!item) {
			toast.error("Selecione uma peça.");
			return;
		}
		const q = parseInt(qtd, 10) || 0;
		if (q <= 0) {
			toast.error("Informe uma quantidade válida.");
			return;
		}
		if (q > item.quantidade) {
			toast.error(`Estoque insuficiente. Disponível: ${item.quantidade}.`);
			return;
		}
		if (modo === "dados" && !tecnico.trim()) {
			toast.error("Informe o técnico responsável.");
			return;
		}
		try {
			const { error: upErr } = await supabase.from("estoque_itens").update({ quantidade: item.quantidade - q }).eq("id", item.id);
			if (upErr) throw upErr;
			const { error: movErr } = await supabase.from("estoque_movimentos").insert({
				item_id: item.id,
				codigo: item.codigo,
				descricao: item.descricao,
				quantidade: q,
				tecnico: tecnico.trim() || (modo === "foto" ? "Retirada por foto" : ""),
				os: os.trim()
			});
			if (movErr) throw movErr;
			await onReload();
			toast.success(`Retirada registrada: ${q} × ${item.codigo}.`);
			setItemId("");
			setQtd("");
			setOs("");
			setBusca("");
			setFotoPreview("");
			setUltimaIdent("");
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Falha ao registrar retirada.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-6 lg:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void submit(e),
			className: "lg:col-span-2 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 sm:p-6 shadow-2xs text-slate-900 dark:text-slate-100",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold text-slate-900 dark:text-white",
					children: "Registrar retirada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/60 dark:bg-slate-950/40 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setModo("dados"),
						className: `flex-1 rounded-lg px-3 py-2 text-xs font-bold transition ${modo === "dados" ? "bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-1 inline h-3.5 w-3.5" }), " Por dados"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setModo("foto"),
						className: `flex-1 rounded-lg px-3 py-2 text-xs font-bold transition ${modo === "foto" ? "bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "mr-1 inline h-3.5 w-3.5" }), " Por foto"]
					})]
				}),
				modo === "dados" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Buscar peça",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: busca,
							onChange: (e) => {
								setBusca(e.target.value);
								setItemId("");
							},
							placeholder: "Código, descrição, barras, marca…",
							className: `${inputCls} pl-9`
						})]
					}), busca && !item && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 max-h-56 space-y-1 overflow-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 p-1 shadow-lg",
						children: resultados.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 text-center text-xs text-slate-500 dark:text-slate-400",
							children: "Nenhuma peça encontrada."
						}) : resultados.slice(0, 20).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setItemId(it.id);
								setBusca("");
							},
							disabled: it.quantidade <= 0,
							className: "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1 truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-indigo-600 dark:text-cyan-300",
										children: it.codigo
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate-900 dark:text-white",
										children: ["— ", it.descricao]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-slate-100 dark:bg-white/10 px-2 py-0.5 font-bold text-slate-700 dark:text-slate-200",
								children: it.quantidade
							})]
						}, it.id))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Localizar por foto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-fuchsia-500/40 bg-fuchsia-500/5 px-4 py-6 text-center text-xs text-slate-700 dark:text-slate-300 hover:bg-fuchsia-500/10",
							children: [analisandoFoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-fuchsia-600 dark:text-fuchsia-300" }), "Analisando…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-6 w-6 text-fuchsia-600 dark:text-fuchsia-300" }), "Tirar foto ou selecionar imagem"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (f) handleFotoRetirada(f);
									e.target.value = "";
								},
								className: "hidden"
							})]
						}),
						fotoPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: fotoPreview,
							alt: "",
							className: "mt-2 max-h-32 w-full rounded-md border border-slate-200 dark:border-slate-800 object-contain bg-slate-100 dark:bg-black/40"
						}),
						ultimaIdent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] text-slate-500 dark:text-slate-400",
							children: ["Identificado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-slate-800 dark:text-slate-200",
								children: ultimaIdent
							})]
						})
					]
				}),
				item && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-indigo-600 dark:text-cyan-300",
								children: item.codigo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setItemId(""),
								className: "text-slate-400 hover:text-slate-800 dark:hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 font-bold text-slate-900 dark:text-white",
							children: item.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-[11px] text-slate-600 dark:text-slate-300",
							children: [
								"Disponível:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-emerald-600 dark:text-emerald-300",
									children: item.quantidade
								}),
								item.localizacao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · 📍 ", item.localizacao] })
							]
						})
					]
				}),
				modo === "foto" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Quantidade retirada",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						value: qtd,
						onChange: (e) => setQtd(e.target.value),
						className: `${inputCls} text-lg font-bold`
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Quantidade",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: qtd,
							onChange: (e) => setQtd(e.target.value),
							className: inputCls
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nº OS",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: os,
							onChange: (e) => setOs(e.target.value),
							className: inputCls,
							placeholder: "opcional"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Técnico responsável",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: tecnico,
						onChange: (e) => setTecnico(e.target.value),
						className: inputCls
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:brightness-110",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageMinus, { className: "h-4 w-4" }), " Confirmar retirada"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 sm:p-6 shadow-2xs text-slate-900 dark:text-slate-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4 text-fuchsia-600 dark:text-fuchsia-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold text-slate-900 dark:text-white",
					children: "Histórico de retiradas"
				})]
			}), movs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 dark:text-slate-400",
				children: "Nenhuma retirada registrada ainda."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[60vh] space-y-2 overflow-auto pr-1",
				children: movs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-3 shadow-2xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-slate-500 dark:text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-indigo-600 dark:text-fuchsia-300",
								children: m.codigo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(m.data).toLocaleString("pt-BR") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-semibold text-slate-900 dark:text-white",
							children: m.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Qtd: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-rose-600 dark:text-rose-300",
									children: m.quantidade
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Técnico: ", m.tecnico] }),
								m.os && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["OS: ", m.os] })
							]
						})
					]
				}, m.id))
			})]
		})]
	});
}
var inputCls = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/80 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400",
			children: label
		}), children]
	});
}
function AppHeader({ title, subtitle, isDark, onToggleTheme, onOpenList, onSignOut, onBack, isInstalled, onInstall, extraActions, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors print:hidden shadow-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center justify-between gap-2 sm:justify-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [onBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onBack,
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition",
							title: "Voltar",
							"aria-label": "Voltar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg",
								children: title
							}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs",
								children: subtitle
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:hidden",
						children: [
							!isInstalled && onInstall && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onInstall,
								title: "Instalar App no dispositivo",
								"aria-label": "Instalar App",
								className: "flex h-9 w-9 items-center justify-center rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 active:scale-95 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onToggleTheme,
								title: isDark ? "Modo claro" : "Modo escuro",
								"aria-label": isDark ? "Modo claro" : "Modo escuro",
								className: "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-95 transition",
								children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-amber-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4 text-indigo-600" })
							}),
							onSignOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onSignOut,
								title: "Sair",
								"aria-label": "Sair",
								className: "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-95 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
							})
						]
					}),
					children
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1.5 sm:gap-2",
				children: [
					extraActions,
					!isInstalled && onInstall && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onInstall,
						title: "Instalar App no dispositivo",
						className: "hidden sm:inline-flex h-10 items-center gap-1.5 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50 dark:bg-purple-950/40 px-3 text-xs font-bold text-purple-700 dark:text-purple-300 shadow-2xs hover:bg-purple-100 dark:hover:bg-purple-900/60 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Instalar App" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onToggleTheme,
						title: isDark ? "Modo claro" : "Modo escuro",
						"aria-label": isDark ? "Modo claro" : "Modo escuro",
						className: "hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition",
						children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Claro" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Escuro" })] })
					}),
					onOpenList && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onOpenList,
						className: "inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-4 w-4 text-indigo-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden xs:inline",
								children: "Atendimentos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "xs:hidden",
								children: "Salvos"
							})
						]
					}),
					onSignOut && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onSignOut,
						className: "hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sair" })]
					})
				]
			})]
		})
	});
}
var SITUACAO_STYLE$3 = {
	em_aberto: {
		badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
		dot: "bg-amber-500",
		label: "Em aberto"
	},
	concluido: {
		badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
		dot: "bg-emerald-500",
		label: "Concluído"
	},
	realizar_pedido: {
		badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
		dot: "bg-sky-500",
		label: "Realizar pedido"
	},
	cancelado: {
		badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
		dot: "bg-rose-500",
		label: "Cancelado"
	}
};
function tipoBadge(t) {
	if (t === "vox") return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
	if (t === "hisense") return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
	if (t === "assurant") return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
	if (t === "whirlpool") return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300";
	return "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
}
function SavedListModal({ rows, searchTerm, situacaoFilter, onSearch, onSituacaoFilter, onOpen, onDelete, onClose }) {
	const situacaoCounts = {
		concluido: rows.filter((r) => (r.situacao ?? "em_aberto") === "concluido").length,
		em_aberto: rows.filter((r) => (r.situacao ?? "em_aberto") === "em_aberto").length,
		realizar_pedido: rows.filter((r) => (r.situacao ?? "em_aberto") === "realizar_pedido").length,
		cancelado: rows.filter((r) => (r.situacao ?? "em_aberto") === "cancelado").length
	};
	const situacaoFiltered = situacaoFilter ? rows.filter((r) => (r.situacao ?? "em_aberto") === situacaoFilter) : rows;
	const filteredList = searchTerm.trim() ? situacaoFiltered.filter((r) => [
		r.numero_os,
		r.cliente_nome ?? "",
		r.tipo
	].join(" ").toLowerCase().includes(searchTerm.trim().toLowerCase())) : situacaoFiltered;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 p-0 sm:p-4 backdrop-blur-sm print:hidden animate-fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[92vh] sm:max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 animate-slide-up",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-white/10 p-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Atendimentos salvos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-white/70",
							children: [
								filteredList.length,
								" ",
								filteredList.length === 1 ? "parecer" : "pareceres",
								" no total"
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white",
						title: "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: searchTerm,
							onChange: (e) => onSearch(e.target.value),
							placeholder: "Buscar por Nº OS, Sinistro, cliente ou tipo...",
							className: "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 pl-12 pr-4 text-sm shadow-sm placeholder:text-slate-400 dark:text-slate-100 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onSituacaoFilter(""),
							className: `rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${situacaoFilter === "" ? "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 shadow" : "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"}`,
							children: ["Todos ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 opacity-70",
								children: [
									"(",
									rows.length,
									")"
								]
							})]
						}), [
							"concluido",
							"em_aberto",
							"realizar_pedido",
							"cancelado"
						].map((s) => {
							const st = SITUACAO_STYLE$3[s];
							const active = situacaoFilter === s;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onSituacaoFilter(active ? "" : s),
								className: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${active ? `${st.badge} ring-2 ring-offset-1 ring-slate-400` : "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${st.dot}` }),
									st.label,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "opacity-70",
										children: [
											"(",
											situacaoCounts[s],
											")"
										]
									})
								]
							}, s);
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6 py-5",
					children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 rounded-full bg-slate-100 dark:bg-slate-700 p-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-10 w-10 text-slate-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold text-slate-700 dark:text-slate-300",
								children: "Nenhum parecer salvo ainda"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-500",
								children: "Salve seu primeiro parecer para vê-lo listado aqui."
							})
						]
					}) : filteredList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 rounded-full bg-slate-100 dark:bg-slate-700 p-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-10 w-10 text-slate-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold text-slate-700 dark:text-slate-300",
								children: "Nenhum resultado encontrado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-slate-500",
								children: [
									"Não encontramos pareceres para \"",
									searchTerm,
									"\"."
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 stagger",
						children: filteredList.map((row) => {
							const st = SITUACAO_STYLE$3[row.situacao ?? "em_aberto"];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-4 shadow-sm transition animate-slide-up hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tipoBadge(row.tipo)}`,
											children: row.tipo
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-medium text-slate-400",
											children: new Date(row.updated_at).toLocaleDateString("pt-BR")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-base font-bold text-slate-900 dark:text-slate-100",
										children: [
											row.tipo === "assurant" ? "Sinistro" : "OS",
											" ",
											row.numero_os
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-1 text-sm text-slate-600 dark:text-slate-300",
										children: row.cliente_nome ?? "Sem cliente informado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${st.badge}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${st.dot}` }), st.label]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-slate-400",
										children: ["Atualizado ", new Date(row.updated_at).toLocaleString("pt-BR")]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onOpen(row.id),
										className: "flex-1 rounded-lg bg-slate-900 dark:bg-slate-200 px-3 py-2 text-xs font-semibold text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-300",
										children: "Abrir"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onDelete(row.id),
										className: "rounded-lg border border-red-200 dark:border-red-800 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/30",
										title: "Excluir",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									})]
								})]
							}, row.id);
						})
					})
				})
			]
		})
	});
}
function LeaveGuardModal({ message, hasOS, onSave, onDiscard, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm print:hidden animate-fade-in",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 animate-scale-in",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-white/20 p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold",
					children: "Alterações não salvas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-white/85",
					children: "Proteja seu trabalho antes de sair"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-700 dark:text-slate-200",
					children: message
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								if (!hasOS) return;
								onSave();
							},
							disabled: !hasOS,
							className: "inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar agora"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onDiscard,
							className: "inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white dark:bg-slate-700 dark:border-red-800 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), " Descartar alterações e sair"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onCancel,
							className: "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600",
							children: "Continuar editando"
						})
					]
				})]
			})]
		})
	});
}
var SITUACAO_STYLE$2 = {
	em_aberto: {
		border: "border-amber-400",
		bg: "bg-amber-50 dark:bg-amber-950/30",
		dot: "bg-amber-500",
		label: "Em aberto"
	},
	concluido: {
		border: "border-emerald-500",
		bg: "bg-emerald-50 dark:bg-emerald-950/30",
		dot: "bg-emerald-500",
		label: "Concluído"
	},
	realizar_pedido: {
		border: "border-sky-500",
		bg: "bg-sky-50 dark:bg-sky-950/30",
		dot: "bg-sky-500",
		label: "Realizar pedido"
	},
	cancelado: {
		border: "border-rose-500",
		bg: "bg-rose-50 dark:bg-rose-950/30",
		dot: "bg-rose-500",
		label: "Cancelado"
	}
};
function SaveSituacaoModal({ numeroOS, onSave, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-slate-900 dark:text-slate-100",
						children: "Salvar atendimento como…"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-slate-500 dark:text-slate-400",
						children: [
							"Escolha a situação do atendimento OS ",
							numeroOS,
							"."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-2",
					children: [
						"concluido",
						"em_aberto",
						"realizar_pedido",
						"cancelado"
					].map((s) => {
						const st = SITUACAO_STYLE$2[s];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onSave(s),
							className: `flex min-h-14 w-full items-center justify-between rounded-lg border-2 ${st.border} ${st.bg} px-4 py-3 text-left transition hover:brightness-95 active:brightness-90`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pointer-events-none flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-3 w-3 rounded-full ${st.dot}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-slate-900 dark:text-slate-100",
									children: st.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "pointer-events-none h-4 w-4 text-slate-500" })]
						}, s);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onCancel,
					className: "mt-4 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600",
					children: "Cancelar"
				})
			]
		})
	});
}
function ProgressOverlay({ visible, isPrinting, progressLabel }) {
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm print:hidden animate-fade-in",
		role: "status",
		"aria-live": "polite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-[min(92vw,340px)] overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 animate-scale-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-white/20 p-2",
					children: isPrinting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate text-base font-bold",
						children: isPrinting ? "Gerando arquivo…" : "Lendo arquivo…"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[11px] text-white/85",
						children: isPrinting ? progressLabel || "Preparando PDF para download / impressão" : "Extraindo dados do PDF"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-6 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 shrink-0 animate-spin text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-slate-600 dark:text-slate-300",
						children: "Por favor aguarde, isso leva apenas alguns segundos."
					})]
				})]
			})]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Calendar$1({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var SITUACAO_STYLE$1 = {
	em_aberto: {
		border: "border-amber-400 dark:border-amber-500",
		bg: "bg-amber-50/80 dark:bg-amber-950/25",
		badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
		dot: "bg-amber-500",
		label: "Em aberto"
	},
	concluido: {
		border: "border-emerald-500",
		bg: "bg-emerald-50/80 dark:bg-emerald-950/25",
		badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
		dot: "bg-emerald-500",
		label: "Concluído"
	},
	realizar_pedido: {
		border: "border-sky-500",
		bg: "bg-sky-50/80 dark:bg-sky-950/25",
		badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",
		dot: "bg-sky-500",
		label: "Realizar pedido"
	},
	cancelado: {
		border: "border-rose-500",
		bg: "bg-rose-50/80 dark:bg-rose-950/25",
		badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
		dot: "bg-rose-500",
		label: "Cancelado"
	}
};
function AgendaCard({ row, onEdit, onDelete, onUnschedule, onMoveToDate, onUpdateTag }) {
	const dados = row.dados ?? {};
	const st = SITUACAO_STYLE$1[row.situacao || "em_aberto"] ?? SITUACAO_STYLE$1.em_aberto;
	const [dateOpen, setDateOpen] = (0, import_react.useState)(false);
	const [tagOpen, setTagOpen] = (0, import_react.useState)(false);
	const [tagDraft, setTagDraft] = (0, import_react.useState)(dados.tagAgenda ?? "");
	const tagAtual = (dados.tagAgenda ?? "").trim();
	const currentDate = row.data_agenda ? (() => {
		const [y, m, d] = row.data_agenda.split("-").map(Number);
		return new Date(y, (m || 1) - 1, d || 1);
	})() : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group rounded-xl border-l-4 ${st.border} border-y border-r border-slate-200/80 dark:border-slate-700/80 ${st.bg} p-3.5 shadow-2xs transition-all hover:shadow-md active:scale-[0.99] animate-slide-up`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						draggable: false,
						onMouseDown: (e) => e.stopPropagation(),
						onPointerDown: (e) => e.stopPropagation(),
						onClick: (e) => {
							e.stopPropagation();
							e.preventDefault();
							onEdit();
						},
						title: "Abrir para edição",
						className: "inline-flex cursor-pointer items-center gap-1 rounded-lg bg-slate-900 dark:bg-slate-200 px-2 py-1 text-[11px] font-extrabold text-white dark:text-slate-900 shadow-2xs transition hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-slate-950 active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["OS ", row.numero_os] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-wider ${st.badge}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${st.dot}` }), st.label]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-0.5 shrink-0",
					children: [
						onUpdateTag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							open: tagOpen,
							onOpenChange: (o) => {
								setTagOpen(o);
								if (o) setTagDraft(dados.tagAgenda ?? "");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									draggable: false,
									onMouseDown: (e) => e.stopPropagation(),
									onPointerDown: (e) => e.stopPropagation(),
									onClick: (e) => e.stopPropagation(),
									title: tagAtual ? `Observação: ${tagAtual}` : "Adicionar observação",
									"aria-label": "Adicionar observação",
									className: `flex h-8 w-8 items-center justify-center rounded-lg ${tagAtual ? "text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/40" : "text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800"} active:scale-95 transition`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
								align: "end",
								className: "w-72 p-3.5 pointer-events-auto shadow-xl rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
										children: "Observação da agenda"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: tagDraft,
										onChange: (e) => setTagDraft(e.target.value),
										placeholder: "Ex.: Atendimento prioritário, ligar antes...",
										rows: 3,
										className: "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2.5 flex justify-between gap-2",
										children: [tagAtual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setTagOpen(false);
												onUpdateTag("");
											},
											className: "rounded-lg px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
											children: "Remover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setTagOpen(false);
												onUpdateTag(tagDraft.trim());
											},
											className: "rounded-lg bg-amber-500 px-3.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-amber-600 active:scale-95",
											children: "Salvar"
										})]
									})
								]
							})]
						}),
						onMoveToDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							open: dateOpen,
							onOpenChange: setDateOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									draggable: false,
									onMouseDown: (e) => e.stopPropagation(),
									onPointerDown: (e) => e.stopPropagation(),
									onClick: (e) => e.stopPropagation(),
									title: "Transferir para outra data",
									"aria-label": "Transferir para outra data",
									className: "flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 active:scale-95 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
								align: "end",
								className: "w-auto p-0 pointer-events-auto shadow-xl rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-b border-slate-100 dark:border-slate-700 px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
										children: "Transferir atendimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
										mode: "single",
										selected: currentDate,
										onSelect: (d) => {
											if (!d) return;
											const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
											setDateOpen(false);
											onMoveToDate(iso);
										},
										initialFocus: true,
										className: "p-3 pointer-events-auto"
									}),
									onUnschedule && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setDateOpen(false);
											onUnschedule();
										},
										className: "w-full border-t border-slate-100 dark:border-slate-700 px-3.5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition",
										children: "Mover para Não agendados"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onDelete,
							title: "Excluir",
							"aria-label": "Excluir",
							className: "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 active:scale-95 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-slate-900 dark:text-slate-100",
				children: dados.consumidor || row.cliente_nome || "Sem consumidor"
			}),
			tagAtual && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1.5 flex items-start gap-1 rounded-md border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 text-[10.5px] font-bold uppercase leading-tight tracking-wide text-amber-800 dark:text-amber-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "mt-0.5 h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "break-words",
					children: tagAtual
				})]
			}),
			dados.endereco && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-1",
				children: dados.endereco
			}),
			(dados.bairro || dados.cidade) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1",
				children: [
					dados.bairro,
					" ",
					dados.cidade && `· ${dados.cidade}`
				]
			}),
			dados.produto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-[10.5px] font-bold uppercase text-indigo-600 dark:text-indigo-400 line-clamp-1",
				children: dados.produto
			})
		]
	});
}
function AgendaDropZone({ title, icon, count, children, onDrop, onPdfDrop }) {
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		onDragOver: (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
			setDragOver(true);
		},
		onDragLeave: () => setDragOver(false),
		onDrop: (e) => {
			e.preventDefault();
			setDragOver(false);
			const file = Array.from(e.dataTransfer.files || []).find((f) => f.type.includes("pdf") || f.name.toLowerCase().endsWith(".pdf"));
			if (file) {
				onPdfDrop?.(file);
				return;
			}
			const raw = e.dataTransfer.getData("text/plain");
			const id = raw.startsWith("atendimento:") ? raw.slice(12) : "";
			if (id) onDrop(id);
		},
		className: `rounded-xl border-2 p-4 shadow-sm transition ${dragOver ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
					children: [
						icon,
						" ",
						title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300",
					children: count
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children
			}),
			onPdfDrop && count === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600 p-3 text-xs text-slate-400 transition hover:border-slate-400 dark:hover:border-slate-400 hover:text-slate-600",
				onDragOver: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Solte um PDF de OS aqui" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "application/pdf,.pdf",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onPdfDrop(f);
							e.target.value = "";
						}
					})
				]
			})
		]
	});
}
function VoxForm({ data, setData, inputCls, labelCls, formatDate }) {
	const upd = (k, v) => setData((d) => ({
		...d,
		[k]: v
	}));
	const updDate = (k, raw) => upd(k, formatDate(raw));
	const updItem = (i, k, v) => setData((d) => {
		const itens = [...d.itens];
		itens[i] = {
			...itens[i],
			[k]: v
		};
		return {
			...d,
			itens
		};
	});
	const addItem = () => setData((d) => ({
		...d,
		itens: [...d.itens, {
			codigo: "",
			descricao: "",
			qtde: "",
			valorUnit: ""
		}]
	}));
	const removeItem = (i) => setData((d) => ({
		...d,
		itens: d.itens.filter((_, idx) => idx !== i)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Ordem de Serviço"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Nº OS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.numeroOS,
						onChange: (e) => upd("numeroOS", e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Data de Entrada"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.dataEntrada,
						onChange: (e) => updDate("dataEntrada", e.target.value),
						placeholder: "DD/MM/AAAA",
						inputMode: "numeric"
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.clienteNome,
							onChange: (e) => upd("clienteNome", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "CPF"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: data.clienteCPF,
								onChange: (e) => upd("clienteCPF", e.target.value)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "Telefone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: data.clienteTelefone,
								onChange: (e) => upd("clienteTelefone", e.target.value)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Endereço"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.clienteEndereco,
							onChange: (e) => upd("clienteEndereco", e.target.value)
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Equipamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Produto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.equipProduto,
							onChange: (e) => upd("equipProduto", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Marca"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.equipMarca,
							onChange: (e) => upd("equipMarca", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Modelo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.equipModelo,
							onChange: (e) => upd("equipModelo", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Nº de Série"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.equipSerie,
							onChange: (e) => upd("equipSerie", e.target.value)
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Defeito Alegado pelo Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 3,
					className: inputCls,
					value: data.defeito,
					onChange: (e) => upd("defeito", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Parecer Técnico & Serviço"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 4,
						className: inputCls,
						value: data.parecer,
						onChange: (e) => upd("parecer", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Serviço"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.servico,
						onChange: (e) => upd("servico", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Orçamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: addItem,
						className: "rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white px-2.5 py-1 text-xs font-bold shadow-2xs hover:bg-indigo-700 active:scale-95 transition",
						children: "+ Item"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: data.itens.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold text-slate-600 dark:text-slate-400",
								children: ["Item #", i + 1]
							}), data.itens.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeItem(i),
								className: "text-xs font-bold text-rose-600 hover:underline",
								children: "Remover"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Código",
									className: inputCls,
									value: it.codigo,
									onChange: (e) => updItem(i, "codigo", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Qtde",
									className: inputCls,
									value: it.qtde,
									onChange: (e) => updItem(i, "qtde", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Descrição",
									className: inputCls + " col-span-2",
									value: it.descricao,
									onChange: (e) => updItem(i, "descricao", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Valor unitário",
									className: inputCls + " col-span-2",
									value: it.valorUnit,
									onChange: (e) => updItem(i, "valorUnit", e.target.value)
								})
							]
						})]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Observações & Condições"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						className: inputCls,
						value: data.observacoes,
						onChange: (e) => upd("observacoes", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Validade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.validadeDias,
							onChange: (e) => upd("validadeDias", e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.dataParecer,
							onChange: (e) => updDate("dataParecer", e.target.value),
							placeholder: "DD/MM/AAAA",
							inputMode: "numeric"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Garantia"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.garantia,
						onChange: (e) => upd("garantia", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Responsável Técnico"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.responsavel,
						onChange: (e) => upd("responsavel", e.target.value)
					})
				]
			})
		]
	});
}
function PhotoField({ label, value, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const handleFile = async (f) => {
		if (!f) return;
		setBusy(true);
		try {
			onChange(await fileToCompressedDataUrl(f));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 p-2.5 shadow-2xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-[10.5px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
				children: label
			}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => downloadDataUrl(value, label),
					className: "flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 transition",
					title: "Baixar foto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(""),
					className: "flex h-6 w-6 items-center justify-center rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition",
					title: "Remover foto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
				})]
			})]
		}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-lg group",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: label,
				className: "h-24 w-full rounded-lg object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trocar foto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: (e) => {
						const f = e.target.files?.[0];
						if (f) handleFile(f);
						e.target.value = "";
					}
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-indigo-300 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 px-3 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 active:scale-[0.99] transition",
			children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "animate-pulse text-indigo-600 dark:text-indigo-400",
				children: "Processando foto..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: "Adicionar foto (Câmera / Galeria)"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				className: "hidden",
				disabled: busy,
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (f) handleFile(f);
					e.target.value = "";
				}
			})]
		})]
	});
}
function HisenseForm({ data, setData, inputCls, labelCls, formatDate }) {
	const upd = (k, v) => setData((d) => ({
		...d,
		[k]: v
	}));
	const updFoto = (i, v) => setData((d) => ({
		...d,
		fotos: d.fotos.map((f, idx) => idx === i ? {
			...f,
			dataUrl: v
		} : f)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Identificação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Nº OS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.numeroOS,
							onChange: (e) => upd("numeroOS", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Assistência Téc."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.assistenciaTec,
							onChange: (e) => upd("assistenciaTec", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "Nome do Cliente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: data.clienteNome,
								onChange: (e) => upd("clienteNome", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Modelo do Prod."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.modeloProduto,
							onChange: (e) => upd("modeloProduto", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Nº de Série"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.numeroSerie,
							onChange: (e) => upd("numeroSerie", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "ART ou Batch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.artBatch,
							onChange: (e) => upd("artBatch", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Marca"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: inputCls,
							value: data.marcaProduto,
							onChange: (e) => upd("marcaProduto", e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "hisense",
								children: "Hisense"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "gorenje",
								children: "Gorenje"
							})]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Análise Técnica"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Defeito Relatado pelo Cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						className: inputCls,
						value: data.defeitoRelatado,
						onChange: (e) => upd("defeitoRelatado", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Diagnóstico Técnico"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						className: inputCls,
						value: data.diagnosticoTec,
						onChange: (e) => upd("diagnosticoTec", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Instalação Correta? (irregularidades)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						className: inputCls,
						value: data.instalacaoCorreta,
						onChange: (e) => upd("instalacaoCorreta", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Peças Necessárias para Reparo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						className: inputCls,
						value: data.pecasNecessarias,
						onChange: (e) => upd("pecasNecessarias", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Fotos (8)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: data.fotos.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
						label: f.legenda,
						value: f.dataUrl,
						onChange: (v) => updFoto(i, v)
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Tensão (Volts)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "F1+F2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: data.tensaoF1F2,
								onChange: (e) => upd("tensaoF1F2", e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "F1+Terra"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: data.tensaoF1Terra,
								onChange: (e) => upd("tensaoF1Terra", e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "F2+Terra"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: data.tensaoF2Terra,
								onChange: (e) => upd("tensaoF2Terra", e.target.value)
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Anotações Técnicas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						className: inputCls,
						value: data.anotacoes,
						onChange: (e) => upd("anotacoes", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Encerramento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Cidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.cidade,
							onChange: (e) => upd("cidade", e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							placeholder: "DD/MM/AAAA",
							inputMode: "numeric",
							value: data.dataParecer,
							onChange: (e) => upd("dataParecer", formatDate(e.target.value))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Técnico Responsável"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.responsavel,
						onChange: (e) => upd("responsavel", e.target.value)
					})
				]
			})
		]
	});
}
function AssurantForm({ data, setData, inputCls, labelCls, formatDate }) {
	const upd = (k, v) => setData((d) => ({
		...d,
		[k]: v
	}));
	const updFoto = (i, v) => setData((d) => ({
		...d,
		fotos: d.fotos.map((f, idx) => idx === i ? {
			...f,
			dataUrl: v
		} : f)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Ordem de Serviço"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Sinistro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.sinistro,
							onChange: (e) => upd("sinistro", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Assistência"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.assistencia,
							onChange: (e) => upd("assistencia", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "CNPJ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.cnpj,
							onChange: (e) => upd("cnpj", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Serial"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.serial,
							onChange: (e) => upd("serial", e.target.value)
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
					children: "Produto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Marca"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.produtoMarca,
						onChange: (e) => upd("produtoMarca", e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Modelo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.produtoModelo,
						onChange: (e) => upd("produtoModelo", e.target.value)
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Parecer Técnico após Análise"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 4,
						className: inputCls,
						value: data.parecerTecnico,
						onChange: (e) => upd("parecerTecnico", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Peça que Necessita ser Trocada e Motivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						className: inputCls,
						value: data.pecaTrocar,
						onChange: (e) => upd("pecaTrocar", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Motivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.motivo,
						onChange: (e) => upd("motivo", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Forma de Atendimento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.formaAtendimento,
							onChange: (e) => upd("formaAtendimento", e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Produto Coletado?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.produtoColetado,
							onChange: (e) => upd("produtoColetado", e.target.value)
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Fotos do Defeito (4) & Cotações"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: data.fotos.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
							label: f.legenda,
							value: f.dataUrl,
							onChange: (v) => updFoto(i, v)
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
							label: "Cotação 1 (30 dias)",
							value: data.cotacaoImgs[0] ?? "",
							onChange: (v) => upd("cotacaoImgs", [v, data.cotacaoImgs[1] ?? ""])
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
							label: "Cotação 2 (30 dias)",
							value: data.cotacaoImgs[1] ?? "",
							onChange: (v) => upd("cotacaoImgs", [data.cotacaoImgs[0] ?? "", v])
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
							label: "Foto Residência do Segurado",
							value: data.residenciaImg,
							onChange: (v) => upd("residenciaImg", v)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400",
						children: "Encerramento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Cidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: data.cidade,
							onChange: (e) => upd("cidade", e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							placeholder: "DD/MM/AAAA",
							inputMode: "numeric",
							value: data.dataParecer,
							onChange: (e) => upd("dataParecer", formatDate(e.target.value))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls + " mt-3",
						children: "Técnico Responsável"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						value: data.responsavel,
						onChange: (e) => upd("responsavel", e.target.value)
					})
				]
			})
		]
	});
}
function AttachmentField({ label, value, onChange, accent = "emerald" }) {
	const cameraRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const accentBorder = accent === "blue" ? "border-blue-400 dark:border-blue-700" : "border-emerald-400 dark:border-emerald-700";
	const accentBg = accent === "blue" ? "bg-blue-50 dark:bg-blue-950/20" : "bg-emerald-50 dark:bg-emerald-950/20";
	const accentText = accent === "blue" ? "text-blue-700 dark:text-blue-400" : "text-emerald-700 dark:text-emerald-400";
	const accentBtn = accent === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700";
	const load = async (file) => {
		if (!file) return;
		setBusy(true);
		try {
			if (file.type.startsWith("image/")) onChange(await fileToCompressedDataUrl(file, 1400, .78));
			else {
				const reader = new FileReader();
				onChange(await new Promise((res, rej) => {
					reader.onload = () => res(reader.result);
					reader.onerror = () => rej(reader.error);
					reader.readAsDataURL(file);
				}));
			}
		} finally {
			setBusy(false);
		}
	};
	const onDrop = (e) => {
		e.preventDefault();
		setDrag(false);
		const file = e.dataTransfer.files?.[0];
		if (file) load(file);
	};
	const isImage = value.startsWith("data:image/");
	const isPdf = value.startsWith("data:application/pdf");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-lg border-2 border-dashed ${accentBorder} ${accentBg} p-3`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-xs font-bold uppercase tracking-wide ${accentText}`,
					children: label
				}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => downloadDataUrl(value, label),
						className: "text-xs font-semibold text-blue-700 hover:underline",
						children: "⬇ Baixar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange(""),
						className: "text-xs font-semibold text-red-600 hover:underline",
						children: "Remover"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDrag(true);
				},
				onDragLeave: () => setDrag(false),
				onDrop,
				className: `relative flex min-h-32 items-center justify-center rounded-md bg-white dark:bg-slate-800 p-2 text-center text-xs text-slate-500 dark:text-slate-400 transition ${drag ? "ring-2 ring-offset-1 " + (accent === "blue" ? "ring-blue-500" : "ring-emerald-500") : ""}`,
				children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Processando arquivo..." }) : value ? isImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: label,
					className: "max-h-48 rounded object-contain"
				}) : isPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: value,
					target: "_blank",
					rel: "noreferrer",
					className: "font-semibold text-blue-700 underline",
					children: "Abrir PDF anexado"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: value,
					target: "_blank",
					rel: "noreferrer",
					className: "font-semibold text-slate-700 underline",
					children: "Abrir arquivo anexado"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Arraste um arquivo aqui, tire uma foto ou escolha do dispositivo" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => cameraRef.current?.click(),
						className: `rounded-md px-3 py-1 text-xs font-semibold text-white ${accentBtn}`,
						children: "📷 Câmera"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => fileRef.current?.click(),
						className: "rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100",
						children: "📎 Escolher arquivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: cameraRef,
						type: "file",
						accept: "image/*",
						capture: "environment",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) load(f);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*,application/pdf",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) load(f);
							e.target.value = "";
						}
					})
				]
			})
		]
	});
}
function SignaturePad({ value, onChange }) {
	const canvasRef = (0, import_react.useRef)(null);
	const drawing = (0, import_react.useRef)(false);
	const last = (0, import_react.useRef)(null);
	const [empty, setEmpty] = (0, import_react.useState)(!value);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [locked, setLocked] = (0, import_react.useState)(!!value);
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ratio = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * ratio;
		canvas.height = rect.height * ratio;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.scale(ratio, ratio);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#1d4ed8";
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, rect.width, rect.height);
		if (value) {
			const img = new Image();
			img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
			img.src = value;
			setEmpty(false);
		} else setEmpty(true);
	}, []);
	const pos = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	};
	const start = (e) => {
		if (locked || !enabled) return;
		e.preventDefault();
		e.currentTarget.setPointerCapture(e.pointerId);
		drawing.current = true;
		last.current = pos(e);
	};
	const move = (e) => {
		if (!drawing.current) return;
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx || !last.current) return;
		const p = pos(e);
		ctx.beginPath();
		ctx.moveTo(last.current.x, last.current.y);
		ctx.lineTo(p.x, p.y);
		ctx.stroke();
		last.current = p;
		if (empty) setEmpty(false);
	};
	const end = () => {
		if (!drawing.current) return;
		drawing.current = false;
		last.current = null;
		const canvas = canvasRef.current;
		if (!canvas) return;
		onChange(canvas.toDataURL("image/png"));
	};
	const clear = () => {
		if (locked) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, rect.width, rect.height);
		setEmpty(true);
		setSaved(false);
		onChange("");
	};
	const save = () => {
		const canvas = canvasRef.current;
		if (!canvas || empty) return;
		onChange(canvas.toDataURL("image/png"));
		setSaved(true);
		setLocked(true);
		window.setTimeout(() => setSaved(false), 2e3);
	};
	const edit = () => {
		setLocked(false);
		setSaved(false);
		setEnabled(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative rounded-md border border-slate-300 bg-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				onPointerDown: start,
				onPointerMove: move,
				onPointerUp: end,
				onPointerLeave: end,
				onPointerCancel: end,
				className: `block h-40 w-full touch-none rounded-md ${locked || !enabled ? "cursor-not-allowed" : ""}`,
				style: { touchAction: "none" }
			}),
			locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute right-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white",
				children: "Bloqueada"
			}),
			empty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-slate-400",
				children: enabled ? "Assine aqui usando o dedo ou o mouse" : "Clique em \"Habilitar assinatura\" para assinar"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex items-center justify-end gap-2",
		children: [saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-emerald-600",
			children: "Assinatura salva"
		}), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: edit,
			className: "rounded bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-blue-700",
			children: "Editar assinatura"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setEnabled(true),
			className: "rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-600",
			children: "Habilitar assinatura"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: save,
			disabled: empty,
			className: "rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50",
			children: "Salvar assinatura"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: clear,
			disabled: !enabled,
			className: "rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50",
			children: "Limpar assinatura"
		})] })]
	})] });
}
function parseBRLNumber(raw) {
	if (!raw) return 0;
	const cleaned = String(raw).replace(/[^\d,.-]/g, "").trim();
	if (!cleaned) return 0;
	let normalized = cleaned;
	if (cleaned.includes(",") && cleaned.includes(".")) normalized = cleaned.replace(/\./g, "").replace(",", ".");
	else if (cleaned.includes(",")) normalized = cleaned.replace(",", ".");
	const n = parseFloat(normalized);
	return isNaN(n) ? 0 : n;
}
function toBRL(n) {
	return n.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function formatBRLLive(raw) {
	const digits = String(raw || "").replace(/\D/g, "");
	if (!digits) return "";
	return (parseInt(digits, 10) / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function formatBRLInput(raw) {
	if (!raw) return "";
	const cleaned = String(raw).replace(/[^\d,.-]/g, "").trim();
	if (!cleaned) return "";
	let normalized = cleaned;
	if (cleaned.includes(",") && cleaned.includes(".")) normalized = cleaned.replace(/\./g, "").replace(",", ".");
	else if (cleaned.includes(",")) normalized = cleaned.replace(",", ".");
	const n = parseFloat(normalized);
	if (isNaN(n)) return raw;
	return n.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function calcularTotaisWhirlpool(data) {
	const totalPecasNum = (Array.isArray(data.pecas) ? data.pecas : []).reduce((sum, p) => sum + parseBRLNumber(p.valor), 0);
	const totalOrc = totalPecasNum + parseBRLNumber(data.maoDeObra);
	return {
		...data,
		totalPecas: totalPecasNum > 0 ? toBRL(totalPecasNum) : "",
		totalOrcamento: totalOrc > 0 ? toBRL(totalOrc) : "",
		valorOrcamento: totalOrc > 0 ? toBRL(totalOrc) : ""
	};
}
var ADMIN_PASSWORD = "V271088";
function WhirlpoolForm({ data, setData, inputCls, labelCls, formatDate }) {
	const [advanced, setAdvanced] = (0, import_react.useState)(false);
	const upd = (k, v) => setData((d) => calcularTotaisWhirlpool({
		...d,
		[k]: v
	}));
	const updPeca = (i, k, v) => setData((d) => {
		const pecas = [...d.pecas];
		pecas[i] = {
			...pecas[i],
			[k]: v
		};
		return calcularTotaisWhirlpool({
			...d,
			pecas
		});
	});
	const addPeca = () => setData((d) => calcularTotaisWhirlpool({
		...d,
		pecas: [...d.pecas, {
			quantidade: "",
			codigo: "",
			descricao: "",
			fcta: "",
			ocor: "",
			valor: ""
		}]
	}));
	const removePeca = (i) => setData((d) => calcularTotaisWhirlpool({
		...d,
		pecas: d.pecas.filter((_, idx) => idx !== i)
	}));
	(0, import_react.useEffect)(() => {
		const calculated = calcularTotaisWhirlpool(data);
		if (data.totalPecas !== calculated.totalPecas || data.totalOrcamento !== calculated.totalOrcamento || data.valorOrcamento !== calculated.valorOrcamento) setData((d) => calcularTotaisWhirlpool(d));
	}, [data.pecas, data.maoDeObra]);
	const toggleAdvanced = () => {
		if (advanced) {
			setAdvanced(false);
			toast.info("Edição avançada bloqueada.");
			return;
		}
		const pwd = window.prompt("Digite a senha de administrador:");
		if (pwd === null) return;
		if (pwd === ADMIN_PASSWORD) {
			setAdvanced(true);
			toast.success("Edição avançada liberada.");
		} else toast.error("Senha incorreta.");
	};
	const lockCls = advanced ? inputCls : `${inputCls} bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-amber-900 dark:text-amber-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Modo:" }),
					" ",
					advanced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-emerald-700 dark:text-emerald-400",
						children: "Edição avançada (todos os campos)"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edição básica (campos limitados)" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: toggleAdvanced,
				className: `rounded-md px-3 py-1 text-xs font-semibold ${advanced ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-amber-600 text-white hover:bg-amber-700"}`,
				children: advanced ? "Bloquear edição" : "Edição avançada"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
			children: "Ordem de Serviço"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Nº OS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.numeroOS,
					onChange: (e) => upd("numeroOS", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Técnico"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.tecnico,
					onChange: (e) => upd("tecnico", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Data Agenda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					placeholder: "DD/MM/AAAA",
					inputMode: "numeric",
					value: data.dataAgenda,
					onChange: (e) => upd("dataAgenda", formatDate(e.target.value))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Data Chamado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					placeholder: "DD/MM/AAAA",
					inputMode: "numeric",
					value: data.dataChamado,
					onChange: (e) => upd("dataChamado", formatDate(e.target.value))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Período"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					disabled: !advanced,
					className: lockCls,
					value: data.periodo,
					onChange: (e) => upd("periodo", e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Selecionar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "MANHÃ",
							children: "Manhã"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "TARDE",
							children: "Tarde"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Tipo Agenda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.tipoAgenda,
					onChange: (e) => upd("tipoAgenda", e.target.value)
				})] })
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
			children: "Consumidor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Nome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: !advanced,
						className: lockCls,
						value: data.consumidor,
						onChange: (e) => upd("consumidor", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "CPF/CNPJ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.cnpjCpf,
					onChange: (e) => upd("cnpjCpf", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "CEP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.cep,
					onChange: (e) => upd("cep", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Endereço"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: !advanced,
						className: lockCls,
						value: data.endereco,
						onChange: (e) => upd("endereco", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Complemento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.complemento,
					onChange: (e) => upd("complemento", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Bairro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.bairro,
					onChange: (e) => upd("bairro", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Cidade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.cidade,
					onChange: (e) => upd("cidade", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "UF"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.uf,
					onChange: (e) => upd("uf", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Telefones"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: !advanced,
						className: lockCls,
						value: `${data.foneResidencia} ${data.foneComercial} ${data.foneOutros}`.trim(),
						onChange: (e) => upd("foneOutros", e.target.value)
					})]
				})
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
			children: "Produto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Produto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.produto,
					onChange: (e) => upd("produto", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Marca"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.marca,
					onChange: (e) => setData((d) => ({
						...d,
						marca: e.target.value,
						centralAtendimento: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Linha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.linha,
					onChange: (e) => upd("linha", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Série"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.serie,
					onChange: (e) => upd("serie", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Nº Nota Fiscal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.nrNotaFiscal,
					onChange: (e) => upd("nrNotaFiscal", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Data Compra"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					placeholder: "DD/MM/AAAA",
					inputMode: "numeric",
					value: data.dataCompra,
					onChange: (e) => upd("dataCompra", formatDate(e.target.value))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Cor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: data.cor,
					onChange: (e) => upd("cor", e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Voltagem"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					value: data.voltagem,
					onChange: (e) => upd("voltagem", e.target.value)
				})] })
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls,
				children: "Defeito Reclamado 1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 2,
				className: inputCls,
				value: data.defeitoReclamado,
				onChange: (e) => upd("defeitoReclamado", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Defeito Reclamado 2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 2,
				className: inputCls,
				value: data.defeitoReclamado2,
				onChange: (e) => upd("defeitoReclamado2", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Defeito Constatado 1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 2,
				className: inputCls,
				value: data.defeitoConstatado,
				onChange: (e) => upd("defeitoConstatado", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Defeito Constatado 2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 2,
				className: inputCls,
				value: data.defeitoConstatado2,
				onChange: (e) => upd("defeitoConstatado2", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Reclamação Atendimento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 3,
				disabled: !advanced,
				className: lockCls,
				value: data.reclamacaoAtendimento,
				onChange: (e) => upd("reclamacaoAtendimento", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Laudo Técnico"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 3,
				className: inputCls,
				value: data.laudoTecnico,
				onChange: (e) => upd("laudoTecnico", e.target.value)
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
			children: "Anexos do Atendimento"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentField, {
				label: "Nota Fiscal",
				value: data.anexoNotaFiscal,
				onChange: (v) => upd("anexoNotaFiscal", v),
				accent: "emerald"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentField, {
				label: "Etiqueta",
				value: data.anexoEtiqueta,
				onChange: (v) => upd("anexoEtiqueta", v),
				accent: "blue"
			})]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
					children: "Peças / Orçamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: addPeca,
					className: "rounded-md border border-slate-300 dark:border-slate-600 px-2 py-1 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition",
					children: "+ Peça"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.pecas.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-slate-200 dark:border-slate-700 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold text-slate-600 dark:text-slate-400",
								children: ["Peça #", i + 1]
							}), data.pecas.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removePeca(i),
								className: "text-xs text-red-600 hover:underline",
								children: "Remover"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Qtd",
									className: inputCls,
									inputMode: "decimal",
									value: p.quantidade,
									onChange: (e) => updPeca(i, "quantidade", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Código",
									className: inputCls,
									value: p.codigo,
									onChange: (e) => updPeca(i, "codigo", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Valor em R$",
									className: inputCls,
									inputMode: "decimal",
									value: p.valor,
									onChange: (e) => updPeca(i, "valor", e.target.value),
									onBlur: (e) => updPeca(i, "valor", formatBRLInput(e.target.value))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "FCTA",
									className: inputCls,
									value: p.fcta,
									onChange: (e) => updPeca(i, "fcta", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "OCOR",
									className: inputCls,
									value: p.ocor,
									onChange: (e) => updPeca(i, "ocor", e.target.value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Descrição",
							className: `${inputCls} mt-2 w-full`,
							value: p.descricao,
							onChange: (e) => updPeca(i, "descricao", e.target.value)
						})
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: ["Total Peças ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-normal text-slate-500",
							children: "(auto)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						className: `${inputCls} bg-slate-100 dark:bg-slate-700 font-semibold`,
						value: toBRL((data.pecas || []).reduce((s, p) => s + parseBRLNumber(p.valor), 0))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Mão de Obra"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						inputMode: "numeric",
						value: data.maoDeObra,
						onChange: (e) => upd("maoDeObra", formatBRLLive(e.target.value))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: ["Total Orçamento ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-normal text-slate-500",
							children: "(auto)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						className: `${inputCls} bg-slate-100 dark:bg-slate-700 font-semibold`,
						value: toBRL((data.pecas || []).reduce((s, p) => s + parseBRLNumber(p.valor), 0) + parseBRLNumber(data.maoDeObra))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelCls,
						children: ["Valor Orçamento ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-normal text-slate-500",
							children: "(auto)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						className: `${inputCls} bg-slate-100 dark:bg-slate-700`,
						value: toBRL((data.pecas || []).reduce((s, p) => s + parseBRLNumber(p.valor), 0) + parseBRLNumber(data.maoDeObra))
					})] })
				]
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Data da Aprovação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					placeholder: "DD/MM/AAAA",
					inputMode: "numeric",
					value: data.dataAprovacao,
					onChange: (e) => upd("dataAprovacao", formatDate(e.target.value))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Data Parecer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !advanced,
					className: lockCls,
					placeholder: "DD/MM/AAAA",
					inputMode: "numeric",
					value: data.dataParecer,
					onChange: (e) => upd("dataParecer", formatDate(e.target.value))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelCls,
					children: "Assinatura do Consumidor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignaturePad, {
					value: data.assinaturaConsumidor,
					onChange: (v) => upd("assinaturaConsumidor", v)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Observação"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 2,
				disabled: !advanced,
				className: lockCls,
				value: data.observacao,
				onChange: (e) => upd("observacao", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Validade Orçamento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 2,
				disabled: !advanced,
				className: lockCls,
				value: data.validadeOrcamento,
				onChange: (e) => upd("validadeOrcamento", e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Garantia Serviço (meses)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: !advanced,
						className: lockCls,
						value: data.garantiaServicoMeses,
						onChange: (e) => upd("garantiaServicoMeses", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Garantia Peças (meses)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: !advanced,
						className: lockCls,
						value: data.garantiaPecasMeses,
						onChange: (e) => upd("garantiaPecasMeses", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelCls,
						children: "Data Conclusão"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled: !advanced,
						className: lockCls,
						placeholder: "DD/MM/AAAA",
						inputMode: "numeric",
						value: data.dataConclusao,
						onChange: (e) => upd("dataConclusao", formatDate(e.target.value))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls + " mt-3",
				children: "Responsável"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				disabled: !advanced,
				className: lockCls,
				value: data.responsavel,
				onChange: (e) => upd("responsavel", e.target.value)
			})
		] })
	] });
}
/**
* supabase-queries.ts
* Cliente Supabase direto para operações CRUD simples.
* Segurança via RLS (Row Level Security) no Supabase — user_id é validado pelo banco.
* Server functions são mantidas apenas para PDF extraction e AI vision.
*/
async function fetchAtendimentos() {
	const { data, error } = await supabase.from("atendimentos").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data;
}
async function saveAtendimentoCliente(input) {
	const { data: userData } = await supabase.auth.getUser();
	if (!userData.user) throw new Error("Usuário não autenticado");
	const payload = {
		user_id: userData.user.id,
		numero_os: input.numero_os,
		tipo: input.tipo,
		cliente_nome: input.cliente_nome ?? null,
		dados: input.dados,
		data_agenda: input.data_agenda || null,
		periodo: input.periodo || null,
		status: input.status ?? "nao_agendado",
		...input.situacao ? { situacao: input.situacao } : {}
	};
	if (input.id) {
		const { data, error } = await supabase.from("atendimentos").update(payload).eq("id", input.id).select().single();
		if (error) throw error;
		return data;
	}
	const { data, error } = await supabase.from("atendimentos").insert(payload).select().single();
	if (error) throw error;
	return data;
}
async function updateAtendimentoStatus(input) {
	const update = { status: input.status };
	if (input.data_agenda !== void 0) update.data_agenda = input.data_agenda || null;
	if (input.periodo !== void 0) update.periodo = input.periodo || null;
	if (input.situacao !== void 0) update.situacao = input.situacao;
	const { data, error } = await supabase.from("atendimentos").update(update).eq("id", input.id).select().single();
	if (error) throw error;
	return data;
}
async function deleteAtendimentoCliente(id) {
	const { error } = await supabase.from("atendimentos").delete().eq("id", id);
	if (error) throw error;
}
async function fetchSavedList(tipo) {
	let parecerQuery = supabase.from("pareceres").select("id, numero_os, cliente_nome, updated_at, tipo").order("updated_at", { ascending: false });
	let atendimentoQuery = supabase.from("atendimentos").select("id, numero_os, cliente_nome, updated_at, tipo, data_agenda, periodo, status, situacao, dados").order("updated_at", { ascending: false });
	if (tipo) {
		parecerQuery = parecerQuery.eq("tipo", tipo);
		atendimentoQuery = atendimentoQuery.eq("tipo", tipo);
	}
	const [parecerResult, atendimentoResult] = await Promise.all([parecerQuery, atendimentoQuery]);
	const parecerRows = (parecerResult.data ?? []).map((row) => ({
		...row,
		source: "parecer"
	}));
	return [...(atendimentoResult.data ?? []).map((row) => ({
		...row,
		source: "atendimento"
	})), ...parecerRows].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}
async function saveParecerCliente(input) {
	const { data: userData } = await supabase.auth.getUser();
	if (!userData.user) throw new Error("Usuário não autenticado");
	const { error } = await supabase.from("pareceres").upsert({
		user_id: userData.user.id,
		numero_os: input.numero_os.trim(),
		cliente_nome: input.cliente_nome ?? null,
		tipo: input.tipo,
		data: input.data
	}, { onConflict: "user_id,tipo,numero_os" });
	if (error) throw error;
}
async function deleteParecerCliente(id) {
	const { error } = await supabase.from("pareceres").delete().eq("id", id);
	if (error) throw error;
}
async function fetchParecerById(id) {
	const { data, error } = await supabase.from("pareceres").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data;
}
async function fetchAtendimentoById(id) {
	const { data, error } = await supabase.from("atendimentos").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data;
}
/**
* Gerencia sessão Supabase e redireciona para /auth se não autenticado.
* Exporta signOut que aceita um callback para verificar "dirty state" antes de sair.
*/
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [authChecked, setAuthChecked] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) navigate({ to: "/auth" });
			else {
				setUser(data.session.user);
				setAuthChecked(true);
			}
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
			if (!session) {
				navigate({ to: "/auth" });
				setUser(null);
			} else setUser(session.user);
		});
		return () => sub.subscription.unsubscribe();
	}, [navigate]);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}, [navigate]);
	return {
		user,
		userEmail: user?.email ?? null,
		authChecked,
		signOut
	};
}
var ATENDIMENTOS_KEY = ["atendimentos"];
/**
* Hook React Query para gerenciar atendimentos via Supabase cliente direto.
* Elimina a necessidade de server functions para CRUD simples.
*/
function useAtendimentos(enabled = true) {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ATENDIMENTOS_KEY,
		queryFn: fetchAtendimentos,
		enabled,
		staleTime: 3e4
	});
	const saveMutation = useMutation({
		mutationFn: saveAtendimentoCliente,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY });
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar atendimento.");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: deleteAtendimentoCliente,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY });
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Erro ao excluir atendimento.");
		}
	});
	const statusMutation = useMutation({
		mutationFn: updateAtendimentoStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY });
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Erro ao atualizar status.");
		}
	});
	return {
		atendimentos: query.data ?? [],
		isLoading: query.isLoading,
		isError: query.isError,
		refetch: query.refetch,
		save: (input) => saveMutation.mutateAsync(input),
		isSaving: saveMutation.isPending,
		remove: (id) => deleteMutation.mutateAsync(id),
		isDeleting: deleteMutation.isPending,
		updateStatus: (input) => statusMutation.mutateAsync(input),
		invalidate: () => queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY })
	};
}
function usePwaInstall() {
	const [installPrompt, setInstallPrompt] = (0, import_react.useState)(null);
	const [installMessage, setInstallMessage] = (0, import_react.useState)("");
	const [isInstalled, setIsInstalled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(display-mode: standalone)").matches || "standalone" in window.navigator && window.navigator.standalone === true) {
			setIsInstalled(true);
			setInstallMessage("App já instalado neste dispositivo.");
		}
		const onBeforeInstallPrompt = (event) => {
			event.preventDefault();
			setInstallPrompt(event);
			setInstallMessage("Pronto para instalar neste navegador.");
		};
		const onInstalled = () => {
			setInstallPrompt(null);
			setIsInstalled(true);
			setInstallMessage("App instalado com sucesso.");
		};
		window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
		window.addEventListener("appinstalled", onInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	const handleInstall = async () => {
		if (isInstalled) {
			setInstallMessage("App já instalado neste dispositivo.");
			return;
		}
		if (installPrompt) {
			await installPrompt.prompt();
			if ((await installPrompt.userChoice).outcome === "accepted") {
				setInstallMessage("Instalação iniciada.");
				setInstallPrompt(null);
			} else setInstallMessage("Instalação cancelada. Você pode tentar novamente pelo botão.");
			return;
		}
		const isAppleMobile = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
		setInstallMessage(isAppleMobile ? "No iPhone/iPad: toque em Compartilhar e depois em Adicionar à Tela de Início." : "Se o aviso não abrir, publique/abra o link público e use o menu do navegador em Instalar app.");
	};
	return {
		isInstalled,
		installMessage,
		handleInstall
	};
}
var ExtractInput = objectType({
	filename: stringType(),
	mimeType: stringType().default("application/pdf"),
	base64: stringType()
});
objectType({
	numeroOS: stringType().nullable().optional().default(""),
	tecnico: stringType().nullable().optional().default(""),
	dataAgenda: stringType().nullable().optional().default(""),
	dataChamado: stringType().nullable().optional().default(""),
	periodo: enumType([
		"MANHÃ",
		"TARDE",
		""
	]).optional().default(""),
	tipoAgenda: stringType().nullable().optional().default(""),
	consumidor: stringType().nullable().optional().default(""),
	cep: stringType().nullable().optional().default(""),
	regiao: stringType().nullable().optional().default(""),
	endereco: stringType().nullable().optional().default(""),
	bairro: stringType().nullable().optional().default(""),
	complemento: stringType().nullable().optional().default(""),
	cidade: stringType().nullable().optional().default(""),
	uf: stringType().nullable().optional().default(""),
	cnpjCpf: stringType().nullable().optional().default(""),
	enderecoEletronico: stringType().nullable().optional().default(""),
	foneResidencia: stringType().nullable().optional().default(""),
	foneComercial: stringType().nullable().optional().default(""),
	foneOutros: stringType().nullable().optional().default(""),
	localizacao: stringType().nullable().optional().default(""),
	produto: stringType().nullable().optional().default(""),
	marca: stringType().nullable().optional().default(""),
	produtoConsumidor: stringType().nullable().optional().default(""),
	linha: stringType().nullable().optional().default(""),
	serie: stringType().nullable().optional().default(""),
	nomeComercial: stringType().nullable().optional().default(""),
	tempoUso: stringType().nullable().optional().default(""),
	tipoOS: stringType().nullable().optional().default(""),
	nrNotaFiscal: stringType().nullable().optional().default(""),
	dataCompra: stringType().nullable().optional().default(""),
	cor: stringType().nullable().optional().default(""),
	voltagem: stringType().nullable().optional().default(""),
	capacidade: stringType().nullable().optional().default(""),
	defeitoReclamado: stringType().nullable().optional().default(""),
	defeitoConstatado: stringType().nullable().optional().default(""),
	reclamacaoAtendimento: stringType().nullable().optional().default(""),
	laudoTecnico: stringType().nullable().optional().default(""),
	pecas: arrayType(objectType({
		quantidade: stringType().nullable().optional().default(""),
		codigo: stringType().nullable().optional().default(""),
		descricao: stringType().nullable().optional().default(""),
		fcta: stringType().nullable().optional().default(""),
		ocor: stringType().nullable().optional().default(""),
		valor: stringType().nullable().optional().default("")
	})).nullable().optional().default([]),
	observacao: stringType().nullable().optional().default(""),
	totalPecas: stringType().nullable().optional().default(""),
	maoDeObra: stringType().nullable().optional().default(""),
	totalOrcamento: stringType().nullable().optional().default(""),
	validadeOrcamento: stringType().nullable().optional().default(""),
	parcelas: stringType().nullable().optional().default(""),
	vencimento: stringType().nullable().optional().default(""),
	valorOrcamento: stringType().nullable().optional().default(""),
	condicaoPagamento: stringType().nullable().optional().default(""),
	dataAprovacao: stringType().nullable().optional().default(""),
	garantiaServicoMeses: stringType().nullable().optional().default(""),
	garantiaPecasMeses: stringType().nullable().optional().default(""),
	dataConclusao: stringType().nullable().optional().default(""),
	responsavel: stringType().nullable().optional().default("")
});
var extrairDadosWhirlpool = createServerFn({ method: "POST" }).inputValidator((input) => ExtractInput.parse(input)).handler(createSsrRpc("626708997dd39ec4506ae630c65907c8906e3da02e1c39bdacc503204e991533"));
var SITUACAO_LABEL = {
	em_aberto: "Em aberto",
	concluido: "Concluído",
	realizar_pedido: "Realizar pedido",
	cancelado: "Cancelado"
};
var SITUACAO_STYLE = {
	em_aberto: {
		border: "border-amber-400",
		bg: "bg-amber-50 dark:bg-amber-950/20",
		badge: "bg-amber-100 text-amber-800",
		dot: "bg-amber-500",
		label: "Em aberto"
	},
	concluido: {
		border: "border-emerald-500",
		bg: "bg-emerald-50 dark:bg-emerald-950/20",
		badge: "bg-emerald-100 text-emerald-800",
		dot: "bg-emerald-500",
		label: "Concluído"
	},
	realizar_pedido: {
		border: "border-sky-500",
		bg: "bg-sky-50 dark:bg-sky-950/20",
		badge: "bg-sky-100 text-sky-800",
		dot: "bg-sky-500",
		label: "Realizar pedido"
	},
	cancelado: {
		border: "border-rose-500",
		bg: "bg-rose-50 dark:bg-rose-950/20",
		badge: "bg-rose-100 text-rose-700",
		dot: "bg-rose-500",
		label: "Cancelado"
	}
};
function formatDate(raw) {
	const digits = raw.replace(/\D/g, "").slice(0, 8);
	if (digits.length <= 2) return digits;
	if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
	return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
function normalizeAgendaDate(value) {
	if (!value) return "";
	if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
	const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
	const day = match?.[1];
	const month = match?.[2];
	const year = match?.[3];
	return day && month && year ? `${year}-${month}-${day}` : value;
}
function normalizeAssurantData(raw) {
	const source = raw && typeof raw === "object" ? raw : {};
	const fotos = Array.isArray(source.fotos) && source.fotos.length > 0 ? defaultAssurant.fotos.map((fallback, index) => {
		const current = source.fotos?.[index];
		return {
			legenda: current?.legenda || fallback.legenda,
			dataUrl: current?.dataUrl || ""
		};
	}) : defaultAssurant.fotos;
	const legacyCotacao = [source.cotacaoImg, source.cotacaoOrcamento].filter((item) => typeof item === "string" && item.length > 0);
	const cotacaoImgs = Array.isArray(source.cotacaoImgs) ? [source.cotacaoImgs[0] ?? "", source.cotacaoImgs[1] ?? ""] : [legacyCotacao[0] ?? "", legacyCotacao[1] ?? ""];
	return {
		...defaultAssurant,
		...source,
		motivo: source.motivo || [source.motivo1, source.motivo2].filter(Boolean).join("\n"),
		fotos,
		cotacaoImgs,
		residenciaImg: source.residenciaImg || ""
	};
}
function Index() {
	const { userEmail, authChecked, signOut } = useAuth();
	const { theme, toggle: toggleTheme, isDark } = useTheme();
	const { isInstalled, handleInstall } = usePwaInstall();
	const [modo, setModo] = (0, import_react.useState)("home");
	const [tipo, setTipo] = (0, import_react.useState)(null);
	const [data, setData] = (0, import_react.useState)(defaultParecer);
	const [hisense, setHisense] = (0, import_react.useState)(defaultHisense);
	const [assurant, setAssurant] = (0, import_react.useState)(defaultAssurant);
	const [whirlpool, setWhirlpool] = (0, import_react.useState)(defaultWhirlpool);
	const [whirlpoolAtendimentoId, setWhirlpoolAtendimentoId] = (0, import_react.useState)(null);
	const [whirlpoolBaseline, setWhirlpoolBaseline] = (0, import_react.useState)(() => JSON.stringify(defaultWhirlpool));
	const [themeId, setThemeId] = (0, import_react.useState)(THEMES[0].id);
	const [savedList, setSavedList] = (0, import_react.useState)([]);
	const [showList, setShowList] = (0, import_react.useState)(false);
	const [saveMsg, setSaveMsg] = (0, import_react.useState)("");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [situacaoFilter, setSituacaoFilter] = (0, import_react.useState)("");
	const [agendaSearch, setAgendaSearch] = (0, import_react.useState)("");
	const [agendaDate, setAgendaDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [pdfUploading, setPdfUploading] = (0, import_react.useState)(false);
	const [printing, setPrinting] = (0, import_react.useState)(false);
	const [progressLabel, setProgressLabel] = (0, import_react.useState)("");
	const [saveSituacaoOpen, setSaveSituacaoOpen] = (0, import_react.useState)(false);
	const [leaveGuard, setLeaveGuard] = (0, import_react.useState)(null);
	const [postSaveAction, setPostSaveAction] = (0, import_react.useState)(null);
	const atendimentos = useAtendimentos(authChecked && modo === "whirlpool");
	const skipNextWhirlpoolTodayResetRef = (0, import_react.useRef)(false);
	const prevModoRef = (0, import_react.useRef)(modo);
	const extractPdf = useServerFn(extrairDadosWhirlpool);
	const theme_obj = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
	const inputCls = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 dark:text-slate-100 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition";
	const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5";
	const navigateToModo = (0, import_react.useCallback)((newModo, newTipo = null, pushHistory = true) => {
		setModo(newModo);
		setTipo(newTipo);
		if (pushHistory && (newModo !== modo || newTipo !== tipo)) window.history.pushState({
			modo: newModo,
			tipo: newTipo
		}, "");
	}, [modo, tipo]);
	(0, import_react.useEffect)(() => {
		if (!window.history.state) window.history.replaceState({
			modo: "home",
			tipo: null
		}, "");
		const onPopState = (e) => {
			const state = e.state;
			if (state && state.modo) {
				setModo(state.modo);
				setTipo(state.tipo ?? null);
			} else {
				setModo("home");
				setTipo(null);
			}
		};
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);
	const isWhirlpoolDirty = modo === "whirlpool" && tipo === "whirlpool" && JSON.stringify(whirlpool) !== whirlpoolBaseline;
	(0, import_react.useEffect)(() => {
		if (!isWhirlpoolDirty) return;
		const handler = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [isWhirlpoolDirty]);
	const requestLeave = (0, import_react.useCallback)((action, message) => {
		if (!isWhirlpoolDirty) {
			action();
			return;
		}
		setLeaveGuard({
			action,
			message: message ?? "Você tem alterações não salvas neste atendimento. O que deseja fazer?"
		});
	}, [isWhirlpoolDirty]);
	const discardWhirlpoolChanges = () => {
		try {
			const base = JSON.parse(whirlpoolBaseline);
			setWhirlpool(base);
		} catch {
			setWhirlpool(defaultWhirlpool);
		}
	};
	(0, import_react.useEffect)(() => {
		if (modo === "whirlpool" && prevModoRef.current !== "whirlpool") {
			if (skipNextWhirlpoolTodayResetRef.current) skipNextWhirlpoolTodayResetRef.current = false;
			else setAgendaDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
		}
		prevModoRef.current = modo;
	}, [modo]);
	(0, import_react.useEffect)(() => {
		const done = () => setPrinting(false);
		window.addEventListener("afterprint", done);
		return () => window.removeEventListener("afterprint", done);
	}, []);
	const handlePrint = (label = "Preparando documento para impressão…") => {
		const printable = document.getElementById("parecer-print");
		if (!printable) {
			toast.error("Nenhum parecer foi encontrado para impressão.");
			return;
		}
		setProgressLabel(label);
		setPrinting(true);
		document.getElementById("parecer-print-root")?.remove();
		const printRoot = document.createElement("div");
		printRoot.id = "parecer-print-root";
		printRoot.className = "parecer-print-root";
		const printableClone = printable.cloneNode(true);
		if (printableClone instanceof HTMLElement) {
			if (printableClone.querySelector(".whirlpool-a4")) printRoot.classList.add("whirlpool-print-root");
			if (printableClone.classList.contains("assurant-preview")) printRoot.classList.add("assurant-print-root");
		}
		printRoot.appendChild(printableClone);
		document.body.appendChild(printRoot);
		document.body.classList.add("parecer-printing");
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;
			document.body.classList.remove("parecer-printing");
			if (document.body.contains(printRoot)) document.body.removeChild(printRoot);
			setPrinting(false);
			window.removeEventListener("afterprint", cleanup);
		};
		window.addEventListener("afterprint", cleanup, { once: true });
		try {
			window.print();
			window.setTimeout(cleanup, 3e4);
		} catch {
			cleanup();
			toast.error("Não foi possível abrir a janela de impressão.");
		}
	};
	const loadList = (0, import_react.useCallback)(async () => {
		try {
			const list = await fetchSavedList(tipo);
			setSavedList(list);
		} catch {
			toast.error("Erro ao carregar atendimentos salvos.");
		}
	}, [tipo]);
	const openList = async () => {
		setSearchTerm("");
		await loadList();
		setShowList(true);
	};
	const atendimentosFallback = atendimentos.atendimentos.map((row) => ({
		id: row.id,
		numero_os: row.numero_os,
		cliente_nome: row.cliente_nome ?? null,
		updated_at: row.updated_at,
		tipo: row.tipo,
		source: "atendimento",
		data_agenda: row.data_agenda,
		periodo: row.periodo,
		status: row.status,
		situacao: row.situacao ?? null,
		dados: row.dados
	}));
	const mergedById = /* @__PURE__ */ new Map();
	for (const r of atendimentosFallback) mergedById.set(r.id, r);
	for (const r of savedList) mergedById.set(r.id, r);
	const mergedAll = Array.from(mergedById.values()).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
	const allSaved = tipo ? mergedAll.filter((r) => r.tipo === tipo) : mergedAll;
	const saveParecer = async () => {
		if (!tipo) return;
		const numeroOS = tipo === "vox" ? data.numeroOS : tipo === "hisense" ? hisense.numeroOS : tipo === "assurant" ? assurant.sinistro : whirlpool.numeroOS;
		const clienteNome = tipo === "vox" ? data.clienteNome : tipo === "hisense" ? hisense.clienteNome : tipo === "assurant" ? `Sinistro ${assurant.sinistro}` : whirlpool.consumidor;
		const payload = tipo === "vox" ? data : tipo === "hisense" ? hisense : tipo === "assurant" ? assurant : whirlpool;
		if (!numeroOS.trim()) {
			setSaveMsg("Informe o Nº OS antes de salvar.");
			return;
		}
		try {
			await saveParecerCliente({
				tipo,
				numero_os: numeroOS.trim(),
				cliente_nome: clienteNome || null,
				data: payload
			});
			setSaveMsg(`Parecer OS ${numeroOS} salvo com sucesso.`);
			setTimeout(() => setSaveMsg(""), 4e3);
		} catch (err) {
			setSaveMsg(`Erro: ${err instanceof Error ? err.message : "falha ao salvar"}`);
		}
	};
	const loadParecer = async (id) => {
		const cachedRow = allSaved.find((row) => row.id === id);
		if (cachedRow?.source === "atendimento") {
			const row = await fetchAtendimentoById(id) ?? cachedRow;
			const atendimentoTipo = row.tipo;
			const rawDados = row.dados ?? {};
			requestLeave(() => {
				if (atendimentoTipo !== "whirlpool") {
					setTipo(atendimentoTipo);
					setModo("parecer");
					if (atendimentoTipo === "vox") setData({
						...defaultParecer,
						...rawDados
					});
					else if (atendimentoTipo === "hisense") setHisense({
						...defaultHisense,
						...rawDados
					});
					else if (atendimentoTipo === "assurant") setAssurant(normalizeAssurantData(rawDados));
					setShowList(false);
					setSearchTerm("");
					return;
				}
				const raw = rawDados ?? {};
				const merged = {
					...defaultWhirlpool,
					...raw,
					pecas: Array.isArray(raw.pecas) && raw.pecas.length > 0 ? raw.pecas : defaultWhirlpool.pecas
				};
				const scheduledDate = normalizeAgendaDate(row.data_agenda);
				setWhirlpool(merged);
				setWhirlpoolBaseline(JSON.stringify(merged));
				setWhirlpoolAtendimentoId(row.id);
				setTipo("whirlpool");
				if (scheduledDate) {
					skipNextWhirlpoolTodayResetRef.current = true;
					setAgendaDate(scheduledDate);
				}
				setModo("whirlpool");
				setShowList(false);
				setSearchTerm("");
			}, "Abrir outro atendimento vai descartar as alterações não salvas do atual. O que deseja fazer?");
			return;
		}
		const row = await fetchParecerById(id);
		if (row) {
			const t = row.tipo;
			if (t === "whirlpool") {
				setWhirlpool(row.data);
				setWhirlpoolAtendimentoId(id);
				setWhirlpoolBaseline(JSON.stringify(row.data));
				setTipo("whirlpool");
				skipNextWhirlpoolTodayResetRef.current = true;
				setModo("whirlpool");
			} else {
				setTipo(t);
				setModo("parecer");
				if (t === "vox") setData(row.data);
				else if (t === "hisense") setHisense(row.data);
				else setAssurant(normalizeAssurantData(row.data));
			}
			setShowList(false);
		}
	};
	const deleteParecer = async (id) => {
		if (allSaved.find((row) => row.id === id)?.source === "atendimento") {
			await deleteAtendimentoHandler(id);
			await loadList();
			return;
		}
		if (!confirm("Excluir este parecer?")) return;
		await deleteParecerCliente(id);
		await loadList();
	};
	const openAtendimento = (id) => {
		const row = atendimentos.atendimentos.find((a) => a.id === id);
		if (!row) return;
		requestLeave(() => {
			const tipoRow = row.tipo;
			const rawAny = row.dados ?? {};
			if (tipoRow !== "whirlpool") {
				setTipo(tipoRow);
				setModo("parecer");
				if (tipoRow === "vox") setData(rawAny);
				else if (tipoRow === "hisense") setHisense({
					...defaultHisense,
					...rawAny
				});
				else if (tipoRow === "assurant") setAssurant(normalizeAssurantData(rawAny));
				setShowList(false);
				return;
			}
			const raw = rawAny ?? {};
			const merged = {
				...defaultWhirlpool,
				...raw,
				pecas: Array.isArray(raw.pecas) && raw.pecas.length > 0 ? raw.pecas : defaultWhirlpool.pecas
			};
			setWhirlpool(merged);
			setWhirlpoolBaseline(JSON.stringify(merged));
			setWhirlpoolAtendimentoId(row.id);
			setTipo("whirlpool");
			const scheduledDate = normalizeAgendaDate(row.data_agenda);
			if (scheduledDate) {
				skipNextWhirlpoolTodayResetRef.current = true;
				setAgendaDate(scheduledDate);
			}
			setModo("whirlpool");
		}, "Abrir outro atendimento vai descartar as alterações não salvas do atual. O que deseja fazer?");
	};
	const saveWhirlpoolAtendimento = async (situacao) => {
		if (!whirlpool.numeroOS.trim()) {
			toast.error("Informe o Nº OS antes de salvar.");
			return;
		}
		const osTrim = whirlpool.numeroOS.trim();
		let idAlvo = whirlpoolAtendimentoId ?? void 0;
		let existenteRow = idAlvo ? atendimentos.atendimentos.find((a) => a.id === idAlvo) : void 0;
		if (!idAlvo) {
			const existente = atendimentos.atendimentos.find((a) => a.tipo === "whirlpool" && a.numero_os.trim() === osTrim);
			if (existente) {
				if (!confirm(`Já existe um atendimento com a OS ${osTrim}. Deseja substituir?`)) {
					setSaveSituacaoOpen(false);
					return;
				}
				idAlvo = existente.id;
				existenteRow = existente;
			}
		}
		const preservedStatus = existenteRow?.status ?? "agendado";
		const preservedData = existenteRow?.data_agenda ?? (preservedStatus === "agendado" ? agendaDate : "");
		const preservedPeriodo = existenteRow?.periodo ?? (whirlpool.periodo === "MANHÃ" ? "manha" : whirlpool.periodo === "TARDE" ? "tarde" : "");
		const result = await atendimentos.save({
			id: idAlvo,
			numero_os: osTrim,
			tipo: "whirlpool",
			cliente_nome: whirlpool.consumidor || null,
			dados: whirlpool,
			status: preservedStatus,
			data_agenda: preservedData || "",
			periodo: preservedPeriodo || "",
			situacao
		});
		setWhirlpoolAtendimentoId(result.id);
		setWhirlpoolBaseline(JSON.stringify(whirlpool));
		setSaveSituacaoOpen(false);
		toast.success(`Atendimento ${whirlpool.numeroOS} salvo como ${SITUACAO_LABEL[situacao]}.`);
		if (postSaveAction) {
			const act = postSaveAction;
			setPostSaveAction(null);
			act();
		}
	};
	const novoAtendimentoAutoSave = async () => {
		const os = window.prompt("Informe o Nº da OS para o novo atendimento:")?.trim();
		if (!os) {
			toast.error("Nº OS obrigatório para criar o atendimento.");
			return;
		}
		const existente = atendimentos.atendimentos.find((a) => a.tipo === "whirlpool" && a.numero_os.trim() === os);
		if (existente) {
			toast.info(`Já existe um atendimento com a OS ${os}. Abrindo o existente.`);
			openAtendimento(existente.id);
			return;
		}
		const base = {
			...defaultWhirlpool,
			numeroOS: os
		};
		try {
			const result = await atendimentos.save({
				numero_os: os,
				tipo: "whirlpool",
				cliente_nome: null,
				dados: base,
				status: "nao_agendado",
				data_agenda: "",
				periodo: "",
				situacao: "em_aberto"
			});
			setWhirlpool(base);
			setWhirlpoolBaseline(JSON.stringify(base));
			setWhirlpoolAtendimentoId(result.id);
			setTipo("whirlpool");
			setModo("whirlpool");
			toast.success(`Atendimento ${os} criado e disponível na pesquisa.`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao criar atendimento.");
		}
	};
	const scheduleTo = async (id, periodo) => {
		const row = atendimentos.atendimentos.find((a) => a.id === id);
		const dadosAtuais = row?.dados ?? {};
		const [y, m, d] = agendaDate.split("-");
		const dataBR = y && m && d ? `${d}/${m}/${y}` : "";
		const periodoLabel = periodo === "manha" ? "MANHÃ" : "TARDE";
		const novosDados = {
			...dadosAtuais,
			dataAgenda: dataBR,
			periodo: periodoLabel
		};
		if (row) await atendimentos.save({
			id,
			numero_os: row.numero_os,
			tipo: row.tipo,
			cliente_nome: row.cliente_nome ?? null,
			dados: novosDados,
			status: "agendado",
			data_agenda: agendaDate,
			periodo
		});
		else await atendimentos.updateStatus({
			id,
			status: "agendado",
			data_agenda: agendaDate,
			periodo
		});
		if (whirlpoolAtendimentoId === id) setWhirlpool((d) => ({
			...d,
			dataAgenda: dataBR,
			periodo: periodoLabel
		}));
		toast.success("Atendimento agendado.");
	};
	const unschedule = async (id) => {
		const row = atendimentos.atendimentos.find((a) => a.id === id);
		const novosDados = {
			...row?.dados ?? {},
			dataAgenda: "",
			periodo: ""
		};
		if (row) await atendimentos.save({
			id,
			numero_os: row.numero_os,
			tipo: row.tipo,
			cliente_nome: row.cliente_nome ?? null,
			dados: novosDados,
			status: "nao_agendado",
			data_agenda: "",
			periodo: ""
		});
		else await atendimentos.updateStatus({
			id,
			status: "nao_agendado",
			data_agenda: "",
			periodo: ""
		});
		if (whirlpoolAtendimentoId === id) setWhirlpool((d) => ({
			...d,
			dataAgenda: "",
			periodo: ""
		}));
		toast.success("Atendimento movido para não agendados.");
	};
	const moveToDate = async (id, isoDate) => {
		const row = atendimentos.atendimentos.find((a) => a.id === id);
		if (!row) return;
		const dadosAtuais = row.dados ?? {};
		const [y, m, d] = isoDate.split("-");
		const dataBR = y && m && d ? `${d}/${m}/${y}` : "";
		const periodo = row.periodo === "manha" || row.periodo === "tarde" ? row.periodo : "manha";
		const periodoLabel = periodo === "manha" ? "MANHÃ" : "TARDE";
		const novosDados = {
			...dadosAtuais,
			dataAgenda: dataBR,
			periodo: periodoLabel
		};
		await atendimentos.save({
			id,
			numero_os: row.numero_os,
			tipo: row.tipo,
			cliente_nome: row.cliente_nome ?? null,
			dados: novosDados,
			status: "agendado",
			data_agenda: isoDate,
			periodo
		});
		if (whirlpoolAtendimentoId === id) setWhirlpool((data) => ({
			...data,
			dataAgenda: dataBR,
			periodo: periodoLabel
		}));
		toast.success(`Atendimento transferido para ${dataBR}.`);
	};
	const updateTagAgenda = async (id, tag) => {
		const row = atendimentos.atendimentos.find((a) => a.id === id);
		if (!row) return;
		const novosDados = {
			...row.dados ?? {},
			tagAgenda: tag
		};
		await atendimentos.save({
			id,
			numero_os: row.numero_os,
			tipo: row.tipo,
			cliente_nome: row.cliente_nome ?? null,
			dados: novosDados,
			status: row.status ?? "nao_agendado",
			data_agenda: row.data_agenda ?? "",
			periodo: row.periodo ?? ""
		});
		if (whirlpoolAtendimentoId === id) setWhirlpool((data) => ({
			...data,
			tagAgenda: tag
		}));
		toast.success(tag ? "Observação salva na agenda." : "Observação removida.");
	};
	const deleteAtendimentoHandler = async (id) => {
		const pwd = window.prompt("Exclusão protegida — informe a senha de administrador:");
		if (pwd === null) return;
		if (pwd !== "V271088") {
			toast.error("Senha incorreta. Exclusão cancelada.");
			return;
		}
		if (!confirm("Confirmar exclusão deste atendimento? Esta ação não pode ser desfeita.")) return;
		await atendimentos.remove(id);
		if (whirlpoolAtendimentoId === id) {
			setWhirlpool(defaultWhirlpool);
			setWhirlpoolAtendimentoId(null);
		}
		toast.success("Atendimento excluído.");
	};
	const handlePdfUpload = async (file, target) => {
		if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
			toast.error("Envie um arquivo PDF.");
			return;
		}
		setPdfUploading(true);
		try {
			const base64 = await new Promise((resolve, reject) => {
				const r = new FileReader();
				r.onload = () => resolve(String(r.result).split(",")[1]);
				r.onerror = reject;
				r.readAsDataURL(file);
			});
			const extracted = await extractPdf({ data: {
				filename: file.name,
				mimeType: "application/pdf",
				base64
			} });
			const status = target?.status ?? "nao_agendado";
			const periodo = target?.periodo ?? "";
			const dadosFinal = { ...extracted };
			if (status === "agendado") {
				const [y, m, d] = agendaDate.split("-");
				dadosFinal.dataAgenda = y && m && d ? `${d}/${m}/${y}` : dadosFinal.dataAgenda;
				dadosFinal.periodo = periodo === "manha" ? "MANHÃ" : periodo === "tarde" ? "TARDE" : dadosFinal.periodo;
			}
			const numeroOsNovo = (extracted.numeroOS || "SEM-OS").trim();
			const existente = atendimentos.atendimentos.find((a) => a.tipo === "whirlpool" && a.numero_os.trim() === numeroOsNovo);
			if (existente) {
				const [ay, am, ad] = agendaDate.split("-");
				const dataBR = ay && am && ad ? `${ad}/${am}/${ay}` : agendaDate;
				const destino = status === "agendado" ? `${dataBR} — ${periodo === "manha" ? "Manhã" : "Tarde"}` : "Não agendados";
				if (!confirm(`Já existe um atendimento com a OS ${numeroOsNovo}.\n\nDeseja atualizar para:\n${destino}?`)) {
					setPdfUploading(false);
					return;
				}
				await atendimentos.save({
					id: existente.id,
					numero_os: numeroOsNovo,
					tipo: "whirlpool",
					cliente_nome: extracted.consumidor || existente.cliente_nome || null,
					dados: dadosFinal,
					status,
					data_agenda: status === "agendado" ? agendaDate : "",
					periodo: status === "agendado" ? periodo : ""
				});
				toast.success(`OS ${numeroOsNovo} atualizada.`);
				return;
			}
			const novo = await atendimentos.save({
				numero_os: extracted.numeroOS || "SEM-OS",
				tipo: "whirlpool",
				cliente_nome: extracted.consumidor || null,
				dados: dadosFinal,
				status,
				data_agenda: status === "agendado" ? agendaDate : "",
				periodo: status === "agendado" ? periodo : ""
			});
			toast.success(status === "agendado" ? `OS ${extracted.numeroOS || novo.numero_os} agendada.` : `OS ${extracted.numeroOS || novo.numero_os} adicionada.`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao processar PDF.");
		} finally {
			setPdfUploading(false);
		}
	};
	if (!authChecked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-500",
				children: "Carregando..."
			})]
		})
	});
	const sharedOverlays = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressOverlay, {
			visible: pdfUploading || printing,
			isPrinting: printing,
			progressLabel
		}),
		leaveGuard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaveGuardModal, {
			message: leaveGuard.message,
			hasOS: !!whirlpool.numeroOS.trim(),
			onSave: () => {
				setPostSaveAction(() => leaveGuard.action);
				setLeaveGuard(null);
				setSaveSituacaoOpen(true);
			},
			onDiscard: () => {
				const act = leaveGuard.action;
				discardWhirlpoolChanges();
				setLeaveGuard(null);
				act();
			},
			onCancel: () => setLeaveGuard(null)
		}),
		showList && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedListModal, {
			rows: allSaved,
			searchTerm,
			situacaoFilter,
			onSearch: setSearchTerm,
			onSituacaoFilter: setSituacaoFilter,
			onOpen: loadParecer,
			onDelete: deleteParecer,
			onClose: () => setShowList(false)
		})
	] });
	if (modo === "estoque") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstoqueScreen, { onBack: () => setModo("home") });
	if (modo === "home") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors",
		children: [
			sharedOverlays,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: "Gerador de Parecer Técnico",
				subtitle: `Vox Grupo · ${userEmail ?? ""}`,
				isDark,
				onToggleTheme: toggleTheme,
				onOpenList: openList,
				onSignOut: () => requestLeave(() => {
					signOut();
				}, "Você tem alterações não salvas. Deseja sair mesmo assim?"),
				isInstalled,
				onInstall: handleInstall,
				extraActions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigateToModo("whirlpool"),
					className: "inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), " Agenda"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigateToModo("estoque"),
					className: "inline-flex items-center gap-2 rounded-md border border-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-110 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Estoque"]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 animate-slide-down",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100",
						children: "Escolha o modelo de parecer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400",
						children: "Cada fabricante possui layout oficial, regras de cálculo e galeria de fotos dedicadas."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger",
					children: [
						{
							id: "vox",
							name: "VOX",
							badge: "Corporativo",
							desc: "Parecer técnico com 6 temas visuais e impressão A4.",
							color: "from-blue-600 via-indigo-600 to-indigo-800",
							icon: "⚡"
						},
						{
							id: "hisense",
							name: "HISENSE",
							badge: "Gorenje",
							desc: "Relatório técnico com 8 fotos e medições elétricas.",
							color: "from-red-600 via-rose-600 to-rose-800",
							icon: "❄️"
						},
						{
							id: "assurant",
							name: "ASSURANT",
							badge: "Sinistros",
							desc: "Laudo para seguradora com fotos e cotações de peças.",
							color: "from-slate-800 via-slate-900 to-zinc-950",
							icon: "🛡️"
						},
						{
							id: "whirlpool",
							name: "WHIRLPOOL",
							badge: "Agenda OS",
							desc: "Agenda diária com importação automatizada de PDF.",
							color: "from-cyan-600 via-blue-600 to-indigo-700",
							icon: "📅"
						},
						{
							id: "estoque",
							name: "ESTOQUE",
							badge: "Peças",
							desc: "Controle de peças com busca visual e foto por IA.",
							color: "from-emerald-600 via-teal-600 to-teal-800",
							icon: "📦"
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (m.id === "whirlpool") navigateToModo("whirlpool");
							else if (m.id === "estoque") navigateToModo("estoque");
							else navigateToModo("parecer", m.id);
						},
						className: `group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${m.color} p-5 text-left text-white shadow-md transition-all duration-200 hover-lift active:scale-[0.98] animate-slide-up`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: m.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs",
										children: m.badge
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-black tracking-wide",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-white/85",
									children: m.desc
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Acessar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})
						]
					}, m.id))
				})]
			})
		]
	});
	if (modo === "whirlpool") {
		const rows = atendimentos.atendimentos;
		const shiftAgendaDate = (days) => {
			const [y, m, d] = (agendaDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).split("-").map(Number);
			const dt = new Date(y, (m || 1) - 1, d || 1);
			dt.setDate(dt.getDate() + days);
			setAgendaDate(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`);
		};
		const formatAgendaDateLong = (iso) => {
			if (!iso) return "";
			const [y, m, d] = iso.split("-").map(Number);
			const dt = new Date(y, (m || 1) - 1, d || 1);
			return `${[
				"Domingo",
				"Segunda",
				"Terça",
				"Quarta",
				"Quinta",
				"Sexta",
				"Sábado"
			][dt.getDay()]}, ${String(dt.getDate()).padStart(2, "0")} ${[
				"Jan",
				"Fev",
				"Mar",
				"Abr",
				"Mai",
				"Jun",
				"Jul",
				"Ago",
				"Set",
				"Out",
				"Nov",
				"Dez"
			][dt.getMonth()]} ${dt.getFullYear()}`;
		};
		const isToday = agendaDate === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const agendaDateObj = (() => {
			const [y, m, d] = (agendaDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).split("-").map(Number);
			return new Date(y, (m || 1) - 1, d || 1);
		})();
		const setAgendaDateFromObj = (dt) => {
			if (!dt) return;
			setAgendaDate(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`);
		};
		const q = agendaSearch.trim().toLowerCase();
		const filtered = q ? rows.filter((r) => [
			r.numero_os,
			r.cliente_nome ?? "",
			r.tipo,
			r.dados?.consumidor ?? ""
		].join(" ").toLowerCase().includes(q)) : rows;
		const naoAgendados = filtered.filter((r) => r.status === "nao_agendado");
		const agendadosManha = filtered.filter((r) => r.status === "agendado" && r.data_agenda === agendaDate && r.periodo === "manha");
		const agendadosTarde = filtered.filter((r) => r.status === "agendado" && r.data_agenda === agendaDate && r.periodo === "tarde");
		const concluidos = filtered.filter((r) => r.status === "concluido");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors",
			children: [
				sharedOverlays,
				saveSituacaoOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveSituacaoModal, {
					numeroOS: whirlpool.numeroOS,
					onSave: saveWhirlpoolAtendimento,
					onCancel: () => {
						setSaveSituacaoOpen(false);
						setPostSaveAction(null);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
					title: "Agenda Whirlpool",
					subtitle: `Vox Grupo · ${userEmail ?? ""}`,
					isDark,
					onToggleTheme: toggleTheme,
					onBack: () => requestLeave(() => setModo("home"), "Você tem alterações não salvas. Sair para o menu inicial?"),
					onOpenList: openList,
					onSignOut: () => requestLeave(() => {
						signOut();
					}, "Você tem alterações não salvas. Deseja sair mesmo assim?"),
					isInstalled,
					onInstall: handleInstall,
					extraActions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [pdfUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-600 dark:text-slate-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 animate-pulse" }), " Lendo PDF..."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => requestLeave(() => {
							novoAtendimentoAutoSave();
						}, "Criar novo atendimento vai descartar as alterações. Continuar?"),
						className: "inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo atendimento"]
					})] }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-3 hidden items-center gap-2 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-3 py-2 text-white shadow-lg ring-2 ring-amber-300/40 md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => shiftAgendaDate(-1),
								className: "rounded-lg bg-white/15 p-1.5 hover:bg-white/25",
								title: "Dia anterior",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex cursor-pointer flex-col items-center px-3 leading-tight text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] font-bold uppercase tracking-widest ${isToday ? "text-amber-300" : "text-white/80"}`,
										children: isToday ? "★ Hoje" : "Agenda"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whitespace-nowrap text-base font-extrabold tracking-tight md:text-lg drop-shadow",
										children: formatAgendaDateLong(agendaDate)
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								align: "center",
								className: "w-auto p-0 pointer-events-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
									mode: "single",
									selected: agendaDateObj,
									onSelect: setAgendaDateFromObj,
									initialFocus: true,
									className: "p-3 pointer-events-auto"
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => shiftAgendaDate(1),
								className: "rounded-lg bg-white/15 p-1.5 hover:bg-white/25",
								title: "Próximo dia",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "mx-auto max-w-[1600px] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-col gap-3 md:flex-row md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: agendaSearch,
									onChange: (e) => setAgendaSearch(e.target.value),
									placeholder: "Buscar atendimentos por OS, cliente, endereço...",
									className: "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm dark:text-slate-100 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 md:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => shiftAgendaDate(-1),
										className: "inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition",
										"aria-label": "Dia anterior",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex flex-1 items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition",
											"aria-label": "Escolher data",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1 text-left font-medium",
												children: formatAgendaDateLong(agendaDate)
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
										align: "start",
										className: "w-auto p-0 pointer-events-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
											mode: "single",
											selected: agendaDateObj,
											onSelect: setAgendaDateFromObj,
											initialFocus: true,
											className: "p-3 pointer-events-auto"
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => shiftAgendaDate(1),
										className: "inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition",
										"aria-label": "Próximo dia",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-slate-600 dark:text-slate-400",
										children: "Situação:"
									}), [
										"concluido",
										"em_aberto",
										"realizar_pedido",
										"cancelado"
									].map((s) => {
										const st = SITUACAO_STYLE[s];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${st.badge}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${st.dot}` }), st.label]
										}, s);
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => shiftAgendaDate(-1),
									className: "absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md transition hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-700 md:inline-flex",
									"aria-label": "Dia anterior",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => shiftAgendaDate(1),
									className: "absolute -right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md transition hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-700 md:inline-flex",
									"aria-label": "Próximo dia",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-6 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaDropZone, {
											title: "Não agendados",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 text-slate-500" }),
											count: naoAgendados.length,
											onDrop: (id) => void unschedule(id),
											onPdfDrop: (file) => void handlePdfUpload(file, { status: "nao_agendado" }),
											children: naoAgendados.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaCard, {
												row: r,
												onEdit: () => openAtendimento(r.id),
												onDelete: () => void deleteAtendimentoHandler(r.id),
												onMoveToDate: (iso) => void moveToDate(r.id, iso),
												onUpdateTag: (tag) => void updateTagAgenda(r.id, tag)
											}, r.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaDropZone, {
											title: "Manhã",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-amber-500" }),
											count: agendadosManha.length,
											onDrop: (id) => void scheduleTo(id, "manha"),
											onPdfDrop: (file) => void handlePdfUpload(file, {
												status: "agendado",
												periodo: "manha"
											}),
											children: agendadosManha.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaCard, {
												row: r,
												onEdit: () => openAtendimento(r.id),
												onDelete: () => void deleteAtendimentoHandler(r.id),
												onUnschedule: () => void unschedule(r.id),
												onMoveToDate: (iso) => void moveToDate(r.id, iso),
												onUpdateTag: (tag) => void updateTagAgenda(r.id, tag)
											}, r.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaDropZone, {
											title: "Tarde",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4 text-indigo-500" }),
											count: agendadosTarde.length,
											onDrop: (id) => void scheduleTo(id, "tarde"),
											onPdfDrop: (file) => void handlePdfUpload(file, {
												status: "agendado",
												periodo: "tarde"
											}),
											children: agendadosTarde.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaCard, {
												row: r,
												onEdit: () => openAtendimento(r.id),
												onDelete: () => void deleteAtendimentoHandler(r.id),
												onUnschedule: () => void unschedule(r.id),
												onMoveToDate: (iso) => void moveToDate(r.id, iso),
												onUpdateTag: (tag) => void updateTagAgenda(r.id, tag)
											}, r.id))
										})
									]
								})
							]
						}),
						concluidos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600" }), " Concluídos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
								children: concluidos.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaCard, {
									row: r,
									onEdit: () => openAtendimento(r.id),
									onDelete: () => void deleteAtendimentoHandler(r.id)
								}, r.id))
							})]
						}),
						tipo === "whirlpool" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
								className: "space-y-6 rounded-lg border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm print:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhirlpoolForm, {
										data: whirlpool,
										setData: setWhirlpool,
										inputCls,
										labelCls,
										formatDate
									}),
									isWhirlpoolDirty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-md border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" }),
											"Alterações não salvas — clique em ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "underline",
												children: "Salvar na agenda"
											}),
											" antes de sair."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												if (!whirlpool.numeroOS.trim()) {
													toast.error("Informe o Nº OS antes de salvar.");
													return;
												}
												setSaveSituacaoOpen(true);
											},
											className: "inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar na agenda"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handlePrint(),
											className: "inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-900 dark:bg-slate-200 dark:text-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-300 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Salvar PDF"]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhirlpoolPreview, { data: whirlpool })
							})]
						})
					]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				title: `Parecer ${tipo === "vox" ? "VOX" : tipo === "hisense" ? "HISENSE / GORENJE" : "ASSURANT"}`,
				subtitle: `Vox Grupo · ${userEmail ?? ""}`,
				isDark,
				onToggleTheme: toggleTheme,
				onBack: () => requestLeave(() => setModo("home"), "Você tem alterações não salvas. Trocar de modelo mesmo assim?"),
				onOpenList: openList,
				onSignOut: () => requestLeave(() => {
					signOut();
				}, "Você tem alterações não salvas. Deseja sair mesmo assim?"),
				isInstalled,
				onInstall: handleInstall,
				extraActions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:flex items-center gap-2",
					children: [
						tipo === "vox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: themeId,
							onChange: (e) => setThemeId(e.target.value),
							className: "h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 px-3 text-xs font-semibold",
							children: THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t.id,
								children: t.name
							}, t.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: saveParecer,
							className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handlePrint(),
							className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white px-4 text-xs font-bold shadow-2xs hover:bg-indigo-700 active:scale-95 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Salvar PDF"]
						})
					]
				})
			}),
			sharedOverlays,
			saveMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-slate-200 dark:border-slate-800 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 text-xs text-slate-700 dark:text-slate-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-emerald-700 dark:text-emerald-400",
					children: saveMsg
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-2 border-t border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3 backdrop-blur-md lg:hidden shadow-xl print:hidden",
				children: [
					tipo === "vox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: themeId,
						onChange: (e) => setThemeId(e.target.value),
						className: "h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 px-2.5 text-xs font-semibold shadow-2xs",
						children: THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t.id,
							children: t.name
						}, t.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: saveParecer,
						className: "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Salvar" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handlePrint(),
						className: "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white px-3 text-xs font-bold shadow-2xs hover:bg-indigo-700 active:scale-95 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Salvar PDF" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-3 sm:p-6 pb-20 lg:pb-6 lg:grid-cols-[420px_1fr] print:block print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-4 sm:p-5 shadow-2xs backdrop-blur-xs print:hidden",
					children: [
						tipo === "vox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoxForm, {
							data,
							setData,
							inputCls,
							labelCls,
							formatDate
						}),
						tipo === "hisense" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HisenseForm, {
							data: hisense,
							setData: setHisense,
							inputCls,
							labelCls,
							formatDate
						}),
						tipo === "assurant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssurantForm, {
							data: assurant,
							setData: setAssurant,
							inputCls,
							labelCls,
							formatDate
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "overflow-x-auto",
					children: [
						tipo === "vox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParecerPreview, {
							data,
							theme: theme_obj
						}),
						tipo === "hisense" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HisensePreview, { data: hisense }),
						tipo === "assurant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssurantPreview, { data: assurant })
					]
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
