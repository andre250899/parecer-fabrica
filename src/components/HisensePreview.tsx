import type { HisenseData } from "@/lib/parecer-extras";

const TEAL = "#00A79D";
const TEAL_DARK = "#008E86";

const cellStyle: React.CSSProperties = {
  border: "1px solid #000",
  padding: "6px 8px",
  fontSize: 11,
  verticalAlign: "top",
  color: "#000",
};
const labelStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 700,
  background: TEAL,
  color: "#000",
  whiteSpace: "normal",
};
const photoCaptionStyle: React.CSSProperties = {
  background: TEAL,
  color: "#000",
  border: "1px solid #000",
  padding: "6px 8px",
  textAlign: "center",
  fontStyle: "italic",
  fontWeight: 700,
  fontSize: 11,
};

export default function HisensePreview({ data }: { data: HisenseData }) {
  return (
    <div
      id="parecer-print"
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Calibri', 'Arial', sans-serif",
        padding: "0 15mm 15mm",
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
    >
      {/* Hisense-style header */}
      <div style={{ margin: "0 -15mm" }}>
        <div style={{ padding: "14px 24px 8px", background: "#fff" }}>
          <span
            style={{
              fontFamily: "'Arial Black', 'Arial', sans-serif",
              fontWeight: 900,
              fontSize: 42,
              letterSpacing: "-1px",
              color: TEAL,
              lineHeight: 1,
            }}
          >
            Hisense
          </span>
        </div>
        <div style={{ height: 10, background: TEAL }} />
        <div style={{ height: 3, background: "#fff" }} />
        <div style={{ height: 3, background: TEAL_DARK }} />
      </div>

      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          margin: "12px 0 10px",
          textAlign: "center",
          color: TEAL_DARK,
        }}
      >
        Relatório de Atendimento ao Cliente
      </h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ ...labelStyle, width: "18%" }}>NÚMERO OS</td>
            <td style={cellStyle}>{data.numeroOS}</td>
            <td style={{ ...labelStyle, width: "20%" }}>ASSISTÊNCIA TÉC.</td>
            <td style={cellStyle}>{data.assistenciaTec}</td>
          </tr>
          <tr>
            <td style={labelStyle}>NOME DO CLIENTE</td>
            <td style={cellStyle} colSpan={3}>{data.clienteNome}</td>
          </tr>
          <tr>
            <td style={labelStyle}>MODELO DO PROD.</td>
            <td style={cellStyle}>{data.modeloProduto}</td>
            <td style={labelStyle}>Nº DE SERIE</td>
            <td style={cellStyle}>{data.numeroSerie}</td>
          </tr>
          <tr>
            <td style={labelStyle}>ART ou Batch</td>
            <td style={cellStyle}>{data.artBatch}</td>
            <td style={{ ...cellStyle, textAlign: "center", fontWeight: 700 }}>
              Produto Gorenje{" "}
              <span style={{ display: "inline-block", width: 28, borderBottom: "1px solid #000", textAlign: "center" }}>
                {data.marcaProduto === "gorenje" ? "X" : "\u00A0"}
              </span>
            </td>
            <td style={{ ...cellStyle, textAlign: "center", fontWeight: 700 }}>
              Produto Hisense{" "}
              <span style={{ display: "inline-block", width: 28, borderBottom: "1px solid #000", textAlign: "center" }}>
                {data.marcaProduto === "hisense" ? "X" : "\u00A0"}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
        <tbody>
          <tr>
            <td style={{ ...labelStyle, width: "28%", height: 48 }}>DEFEITO RELATADO PELO CLIENTE</td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.defeitoRelatado}</td>
          </tr>
          <tr>
            <td style={{ ...labelStyle, height: 48 }}>DIAGNÓSTICO TÉC.</td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.diagnosticoTec}</td>
          </tr>
          <tr>
            <td style={{ ...labelStyle, height: 56 }}>
              INSTAÇÃO CORRETA?
              <br />
              <span style={{ fontWeight: 400, fontSize: 9 }}>(Relatar as Inregularidades Encontradas na Instalação)</span>
            </td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.instalacaoCorreta}</td>
          </tr>
          <tr>
            <td style={{ ...labelStyle, height: 48 }}>
              PEÇAS NECESSARIAS
              <br />
              <span style={{ fontWeight: 700, fontSize: 11 }}>PARA REPARO *</span>
            </td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.pecasNecessarias}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: 9, fontStyle: "italic", margin: "4px 0 10px" }}>
        *** Consultar a vista explodida no sistema para inserir o código correto da peça. ***
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 12px" }}>
        {data.fotos.map((f, i) => (
          <div key={i} data-avoid-break>
            <div style={photoCaptionStyle}>{f.legenda}</div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #000",
                borderTop: "none",
                height: 130,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {f.dataUrl ? (
                <img src={f.dataUrl} alt={f.legenda} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : (
                <span style={{ color: "#bbb", fontSize: 10 }}>&nbsp;</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, fontStyle: "italic", marginTop: 12, marginBottom: 4 }}>
        Detalhamento da Tensão de Alimentação do Produto:
      </p>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        {/* Plug diagram */}
        <div
          style={{
            width: 130,
            height: 90,
            border: "1px solid #888",
            borderRadius: 10,
            background: "#e8e8e8",
            position: "relative",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <div style={{ position: "absolute", top: 24, left: 18, fontSize: 11, color: "#c00", fontWeight: 700 }}>F1</div>
          <div style={{ position: "absolute", top: 24, right: 18, fontSize: 11, color: "#c00", fontWeight: 700 }}>F2</div>
          <div style={{ position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <div style={{ position: "absolute", top: 30, left: 32, width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          <div style={{ position: "absolute", top: 30, right: 32, width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#c00", fontWeight: 700 }}>▲ Terra</div>
        </div>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th colSpan={2} style={{ ...cellStyle, fontWeight: 700, textAlign: "center", background: "#fff" }}>
                Leitura de Tensão na Tomada
              </th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ ...cellStyle, textAlign: "center", width: 110 }}>F1 + F2</td><td style={{ ...cellStyle, width: 90 }}>{data.tensaoF1F2}</td></tr>
            <tr><td style={{ ...cellStyle, textAlign: "center" }}>F1 + Terra</td><td style={cellStyle}>{data.tensaoF1Terra}</td></tr>
            <tr><td style={{ ...cellStyle, textAlign: "center" }}>F2 + Terra</td><td style={cellStyle}>{data.tensaoF2Terra}</td></tr>
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 11, fontStyle: "italic", fontWeight: 700, marginTop: 12, marginBottom: 4 }}>Anotações Técnicas:</p>
      <div style={{ border: "1px solid #000", minHeight: 70, padding: 8, fontSize: 11, whiteSpace: "pre-wrap" }}>{data.anotacoes}</div>

      <div style={{ marginTop: 24, fontStyle: "italic" }}>
        <div style={{ fontSize: 11 }}>{data.cidade}, {data.dataParecer || "___/___/______"}</div>
        <div style={{ marginTop: 20, textAlign: "right", paddingRight: 40 }}>
          <div style={{ fontWeight: 700, textDecoration: "underline", fontSize: 13 }}>{data.responsavel}</div>
          <div style={{ fontSize: 11 }}>Técnico Responsável</div>
        </div>
      </div>
    </div>
  );
}