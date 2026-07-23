import type { AssurantData } from "@/lib/parecer-extras";

const cellStyle: React.CSSProperties = {
  border: "1px solid #333",
  padding: "6px 8px",
  fontSize: 11,
  verticalAlign: "top",
  height: 22,
};
const labelStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 700,
  background: "#dbeafe",
  whiteSpace: "nowrap",
  width: "22%",
};
const headerBar: React.CSSProperties = {
  background: "#1e3a8a",
  color: "#fff",
  fontWeight: 700,
  fontSize: 12,
  padding: "6px 10px",
  textAlign: "center",
  letterSpacing: 1,
};

function PhotoBox({ src, label }: { src: string; label: string }) {
  return (
    <div data-avoid-break style={{ border: "1px solid #333" }}>
      <div style={headerBar}>{label}</div>
      <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", overflow: "hidden" }}>
        {src ? (
          <img src={src} alt={label} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{ color: "#94a3b8", fontSize: 10 }}>[sem foto]</span>
        )}
      </div>
    </div>
  );
}

export default function AssurantPreview({ data }: { data: AssurantData }) {
  return (
    <div
      id="parecer-print"
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Calibri', 'Arial', sans-serif",
        padding: "15mm",
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: 2, textAlign: "center" }}>
          ANALISE TÉCNICA
        </h1>
      </div>

      <div style={headerBar}>ASSISTÊNCIA TÉCNICA</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 6, tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td style={labelStyle}>Assistência:</td>
            <td style={cellStyle}>{data.assistencia || "\u00A0"}</td>
            <td style={labelStyle}>CNPJ:</td>
            <td style={cellStyle}>{data.cnpj || "\u00A0"}</td>
          </tr>
        </tbody>
      </table>

      <div style={headerBar}>CONSUMIDOR</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 6, tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td style={labelStyle}>Serial:</td>
            <td style={cellStyle}>{data.serial || "\u00A0"}</td>
            <td style={labelStyle}>Sinistro:</td>
            <td style={cellStyle}>{data.sinistro || "\u00A0"}</td>
          </tr>
        </tbody>
      </table>

      <div style={headerBar}>PRODUTO</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 6, tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td style={labelStyle}>Marca:</td>
            <td style={cellStyle}>{data.produtoMarca || "\u00A0"}</td>
            <td style={labelStyle}>Modelo:</td>
            <td style={cellStyle}>{data.produtoModelo || "\u00A0"}</td>
          </tr>
        </tbody>
      </table>

      <div style={headerBar}>PARECER TÉCNICO APÓS ANALISE DO PRODUTO:</div>
      <div style={{ border: "1px solid #333", borderTop: "none", padding: 8, fontSize: 11, minHeight: 50, whiteSpace: "pre-wrap" }}>{data.parecerTecnico}</div>

      <div style={{ ...headerBar, marginTop: 6 }}>PEÇA QUE NECESSITA SER TROCADA E MOTIVO?</div>
      <div style={{ border: "1px solid #333", borderTop: "none", padding: 8, fontSize: 11, minHeight: 40, whiteSpace: "pre-wrap" }}>{data.pecaTrocar}</div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 6, tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "44%" }} />
          <col style={{ width: "56%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td style={{ ...labelStyle, width: "44%" }}>MOTIVO:</td>
            <td style={cellStyle}>{data.motivo || "\u00A0"}</td>
          </tr>
          <tr>
            <td style={{ ...labelStyle, width: "44%" }}>QUAL FOI A FORMA DE ATENDIMENTO?</td>
            <td style={cellStyle}>{data.formaAtendimento || "\u00A0"}</td>
          </tr>
          <tr>
            <td style={{ ...labelStyle, width: "44%" }}>PRODUTO FOI COLETADO?</td>
            <td style={cellStyle}>{data.produtoColetado || "\u00A0"}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        {data.fotos.map((f, i) => (
          <PhotoBox key={i} src={f.dataUrl} label={f.legenda} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <PhotoBox src={data.cotacaoImgs[0] ?? ""} label="COTAÇÃO DO ORÇAMENTO DA PEÇA ATÉ 30 DIAS" />
        <PhotoBox src={data.cotacaoImgs[1] ?? ""} label="COTAÇÃO DO ORÇAMENTO DA PEÇA ATÉ 30 DIAS" />
      </div>

      <div style={{ marginTop: 8 }}>
        <PhotoBox src={data.residenciaImg} label="FOTO RESIDÊNCIA DO SEGURADO" />
      </div>

      <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderTop: "1px solid #000", paddingTop: 4, fontSize: 11, fontWeight: 700 }}>{data.responsavel}</div>
          <div style={{ fontSize: 10 }}>Assinatura Técnico Responsàvel</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderTop: "1px solid #000", paddingTop: 4, fontSize: 11 }}>{data.cidade} - {data.dataParecer || "___/___/______"}</div>
          <div style={{ fontSize: 10 }}>Local e Data</div>
        </div>
      </div>
    </div>
  );
}