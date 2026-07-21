import voxLogo from "@/assets/vox-logo.png";
import {
  formatBRL,
  totalOrcamento,
  type ParecerData,
  type ThemeDef,
} from "@/lib/parecer-types";

interface Props {
  data: ParecerData;
  theme: ThemeDef;
}

function SectionHeader({
  theme,
  icon,
  title,
}: {
  theme: ThemeDef;
  icon: string;
  title: string;
}) {
  const isDark = theme.id === "tech";
  const iconBg =
    theme.iconStyle === "none"
      ? "transparent"
      : theme.iconStyle === "outline"
      ? "transparent"
      : theme.primary;
  const iconColor =
    theme.iconStyle === "outline" ? theme.primary : "#ffffff";
  const iconBorder =
    theme.iconStyle === "outline" ? `2px solid ${theme.primary}` : "none";
  const iconRadius = theme.iconStyle === "square" ? "6px" : "999px";

  if (theme.headerStyle === "pill") {
    return (
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        {theme.iconStyle !== "none" && (
          <div
            style={{
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
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {icon}
          </div>
        )}
        <div
          style={{
            background: theme.primary,
            color: "#ffffff",
            padding: "8px 22px 8px 28px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 0.6,
            fontFamily: theme.headingFont,
          }}
        >
          {title}
        </div>
      </div>
    );
  }
  if (theme.headerStyle === "bar") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: theme.primary,
          color: "#fff",
          padding: "10px 14px",
          borderRadius: theme.radius,
          marginBottom: 10,
        }}
      >
        {theme.iconStyle !== "none" && <span style={{ fontSize: 16 }}>{icon}</span>}
        <span
          style={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 0.6,
            fontFamily: theme.headingFont,
          }}
        >
          {title}
        </span>
      </div>
    );
  }
  if (theme.headerStyle === "underline") {
    return (
      <div
        style={{
          borderBottom: `2px solid ${theme.primary}`,
          paddingBottom: 6,
          marginBottom: 12,
          fontFamily: theme.headingFont,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 1.2,
          color: theme.primary,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
    );
  }
  if (theme.headerStyle === "square") {
    return (
      <div
        style={{
          background: theme.primarySoft,
          color: theme.primary,
          padding: "8px 12px",
          borderLeft: `4px solid ${theme.primary}`,
          fontFamily: theme.headingFont,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
    );
  }
  if (theme.headerStyle === "ribbon") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 4,
            height: 22,
            background: theme.accent,
            borderRadius: 2,
          }}
        />
        {theme.iconStyle !== "none" && (
          <span style={{ color: theme.accent, fontSize: 16 }}>{icon}</span>
        )}
        <span
          style={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1,
            color: isDark ? theme.text : theme.primary,
            fontFamily: theme.headingFont,
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>
    );
  }
  // serif
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.primary}`,
        paddingBottom: 6,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontFamily: theme.headingFont,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 16,
          color: theme.primary,
        }}
      >
        {title}
      </div>
      {theme.iconStyle !== "none" && (
        <span style={{ color: theme.primary, fontSize: 16 }}>{icon}</span>
      )}
    </div>
  );
}

function Field({
  theme,
  label,
  value,
  icon,
}: {
  theme: ThemeDef;
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      {icon && theme.iconStyle !== "none" && (
        <span style={{ color: theme.primary, fontSize: 14, width: 18 }}>{icon}</span>
      )}
      <span
        style={{
          fontWeight: 700,
          color: theme.primary,
          fontSize: 11,
          letterSpacing: 0.5,
          minWidth: 110,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span style={{ color: theme.text, fontSize: 12 }}>{value || "—"}</span>
    </div>
  );
}

export default function ParecerPreview({ data, theme }: Props) {
  const isDark = theme.id === "tech";
  const total = totalOrcamento(data.itens);

  return (
    <div
      id="parecer-print"
      style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: theme.fontFamily,
        padding: "24px 28px",
        minHeight: "297mm",
        width: "210mm",
        margin: "0 auto",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          paddingBottom: 12,
          borderBottom: `2px solid ${theme.primary}`,
          marginBottom: 8,
        }}
      >
        <img
          src={voxLogo}
          alt="Vox Grupo"
          style={{
            height: 60,
            filter: isDark ? "brightness(0) invert(1)" : "none",
          }}
        />
        <div style={{ fontSize: 10.5, color: theme.muted, textAlign: "right", lineHeight: 1.5 }}>
          <div><strong style={{ color: theme.primary }}>CNPJ:</strong> 61.422.882/0001-78</div>
          <div>Av. Des. Mario Da Silva Nunes, 611</div>
          <div>Jardim Limoeiro, Serra - ES · CEP: 29.164-044</div>
          <div><strong style={{ color: theme.primary }}>Tel:</strong> (27) 3227-1288 · (27) 3227-1028</div>
        </div>
      </div>

      {/* Title band */}
      <div
        style={{
          background: theme.primary,
          color: "#fff",
          borderRadius: theme.radius,
          padding: "14px 20px",
          margin: "14px 0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: theme.headingFont,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          PARECER TÉCNICO
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
          <div>
            <div style={{ opacity: 0.75, fontSize: 10, letterSpacing: 0.8 }}>Nº OS</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{data.numeroOS || "—"}</div>
          </div>
          <div>
            <div style={{ opacity: 0.75, fontSize: 10, letterSpacing: 0.8 }}>DATA DE ENTRADA</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{data.dataEntrada || "—"}</div>
          </div>
        </div>
      </div>

      {/* Cliente */}
      <section style={{ marginBottom: 18 }}>
        <SectionHeader theme={theme} icon="👤" title="DADOS DO CLIENTE" />
        <div style={{ background: theme.surface, padding: 12, borderRadius: theme.radius, border: `1px solid ${theme.border}` }}>
          <Field theme={theme} label="Nome" value={data.clienteNome} icon="👤" />
          <Field theme={theme} label="CPF" value={data.clienteCPF} icon="🪪" />
          <Field theme={theme} label="Endereço" value={data.clienteEndereco} icon="📍" />
          <Field theme={theme} label="Telefone" value={data.clienteTelefone} icon="📞" />
        </div>
      </section>

      {/* Equipamento */}
      <section style={{ marginBottom: 18 }}>
        <SectionHeader theme={theme} icon="🖥" title="DADOS DO EQUIPAMENTO" />
        <div style={{ background: theme.surface, padding: 12, borderRadius: theme.radius, border: `1px solid ${theme.border}` }}>
          <Field theme={theme} label="Produto" value={data.equipProduto} icon="📦" />
          <Field theme={theme} label="Marca" value={data.equipMarca} icon="🖥" />
          <Field theme={theme} label="Modelo" value={data.equipModelo} icon="🏷" />
          <Field theme={theme} label="Nº de Série" value={data.equipSerie} icon="||||" />
        </div>
      </section>

      {/* Defeito */}
      <section style={{ marginBottom: 14 }}>
        <SectionHeader theme={theme} icon="⚠" title="DEFEITO ALEGADO PELO CLIENTE" />
        <div style={{ background: theme.surface, padding: 12, minHeight: 60, borderRadius: theme.radius, border: `1px solid ${theme.border}`, fontSize: 12, whiteSpace: "pre-wrap" }}>
          {data.defeito || "—"}
        </div>
      </section>

      {/* Parecer */}
      <section style={{ marginBottom: 18 }}>
        <SectionHeader theme={theme} icon="🔍" title="PARECER TÉCNICO" />
        <div style={{ background: theme.surface, padding: 12, minHeight: 80, borderRadius: theme.radius, border: `1px solid ${theme.border}`, fontSize: 12, whiteSpace: "pre-wrap" }}>
          {data.parecer || "—"}
          {data.servico && (
            <div style={{ marginTop: 8 }}>
              <strong style={{ color: theme.primary }}>SERVIÇO: </strong>
              {data.servico}
            </div>
          )}
        </div>
      </section>

      {/* Orçamento */}
      <section style={{ marginBottom: 18 }}>
        <SectionHeader theme={theme} icon="$" title="ORÇAMENTO" />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ background: theme.primary, color: "#fff" }}>
              <th style={{ padding: 6, textAlign: "center", width: 36 }}>ITEM</th>
              <th style={{ padding: 6, textAlign: "left" }}>CÓDIGO</th>
              <th style={{ padding: 6, textAlign: "left" }}>DESCRIÇÃO</th>
              <th style={{ padding: 6, textAlign: "center", width: 50 }}>QTDE.</th>
              <th style={{ padding: 6, textAlign: "right", width: 90 }}>VALOR UNIT.</th>
              <th style={{ padding: 6, textAlign: "right", width: 90 }}>VALOR TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.itens.map((it, idx) => {
              const q = parseFloat(it.qtde.replace(",", ".")) || 0;
              const v = parseFloat(it.valorUnit.replace(",", ".")) || 0;
              return (
                <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: 6, textAlign: "center" }}>{idx + 1}</td>
                  <td style={{ padding: 6 }}>{it.codigo}</td>
                  <td style={{ padding: 6 }}>{it.descricao}</td>
                  <td style={{ padding: 6, textAlign: "center" }}>{it.qtde}</td>
                  <td style={{ padding: 6, textAlign: "right" }}>{it.valorUnit ? formatBRL(it.valorUnit) : ""}</td>
                  <td style={{ padding: 6, textAlign: "right" }}>{q && v ? formatBRL(String(q * v)) : ""}</td>
                </tr>
              );
            })}
            <tr style={{ background: theme.primary, color: "#fff" }}>
              <td colSpan={4}></td>
              <td style={{ padding: 8, textAlign: "right", fontWeight: 700 }}>TOTAL GERAL</td>
              <td style={{ padding: 8, textAlign: "right", fontWeight: 700 }}>
                {formatBRL(String(total))}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Observações */}
      <section style={{ marginBottom: 18 }}>
        <SectionHeader theme={theme} icon="📝" title="OBSERVAÇÕES" />
        <div style={{ padding: "8px 12px", fontSize: 11.5, whiteSpace: "pre-wrap", color: theme.muted }}>
          {data.observacoes}
        </div>
      </section>

      {/* Rodapé com 3 blocos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginTop: 20,
          paddingTop: 14,
          borderTop: `1px solid ${theme.border}`,
          fontSize: 11,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: theme.primary, marginBottom: 4 }}>
            📅 VALIDADE DO ORÇAMENTO
          </div>
          <div style={{ padding: "4px 8px", border: `1px solid ${theme.primary}`, borderRadius: 999, display: "inline-block", fontSize: 10 }}>
            {data.validadeDias}
          </div>
          <div style={{ marginTop: 6, color: theme.muted }}>Data: {data.dataParecer || "___/___/______"}</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: theme.primary, marginBottom: 4 }}>
            🛡 GARANTIA DO SERVIÇO
          </div>
          <div style={{ color: theme.muted, fontSize: 10.5 }}>{data.garantia}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, color: theme.primary, marginBottom: 4 }}>
            ✍ RESPONSÁVEL TÉCNICO
          </div>
          <div style={{ borderBottom: `1px solid ${theme.text}`, margin: "18px 10px 4px", height: 1 }} />
          <div style={{ fontWeight: 700 }}>{data.responsavel}</div>
          <div style={{ color: theme.muted, fontSize: 10 }}>Técnico Responsável</div>
        </div>
      </div>
    </div>
  );
}