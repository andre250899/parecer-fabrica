import voxLogo from "@/assets/vox-logo.png";
import type { HisenseData } from "@/lib/parecer-extras";

const cellStyle: React.CSSProperties = {
  border: "1px solid #333",
  padding: "6px 8px",
  fontSize: 11,
  verticalAlign: "top",
};
const labelStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 700,
  background: "#e6e6e6",
  whiteSpace: "nowrap",
};

export default function HisensePreview({ data }: { data: HisenseData }) {
  return (
    <div
      id="parecer-print"
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Calibri', 'Arial', sans-serif",
        padding: "18mm 15mm",
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <img src={voxLogo} alt="Vox" style={{ height: 50 }} />
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Relatório de Atendimento ao Cliente</h1>
        <div style={{ width: 80 }} />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={labelStyle}>NÚMERO OS</td>
            <td style={cellStyle}>{data.numeroOS}</td>
            <td style={labelStyle}>ASSISTÊNCIA TÉC.</td>
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
            <td style={{ ...cellStyle, textAlign: "center", background: data.marcaProduto === "gorenje" ? "#cfe8ff" : "#fff" }}>
              Produto Gorenje {data.marcaProduto === "gorenje" ? "☑" : "☐"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center", background: data.marcaProduto === "hisense" ? "#cfe8ff" : "#fff" }}>
              Produto Hisense {data.marcaProduto === "hisense" ? "☑" : "☐"}
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
        <tbody>
          <tr>
            <td style={{ ...labelStyle, width: 180 }}>DEFEITO RELATADO PELO CLIENTE</td>
            <td style={{ ...cellStyle, minHeight: 40, whiteSpace: "pre-wrap" }}>{data.defeitoRelatado}</td>
          </tr>
          <tr>
            <td style={labelStyle}>DIAGNÓSTICO TÉC.</td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.diagnosticoTec}</td>
          </tr>
          <tr>
            <td style={labelStyle}>INSTAÇÃO CORRETA?<br /><span style={{ fontWeight: 400, fontSize: 9 }}>(Relatar as Inregularidades Encontradas na Instalação)</span></td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.instalacaoCorreta}</td>
          </tr>
          <tr>
            <td style={labelStyle}>PEÇAS NECESSARIAS<br /><span style={{ fontWeight: 400, fontSize: 9 }}>PARA REPARO *</span></td>
            <td style={{ ...cellStyle, whiteSpace: "pre-wrap" }}>{data.pecasNecessarias}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: 9, fontStyle: "italic", margin: "4px 0 10px" }}>
        *** Consultar a vista explodida no sistema para inserir o código correto da peça. ***
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {data.fotos.map((f, i) => (
          <div key={i} style={{ border: "1px solid #333", padding: 4 }}>
            <div style={{ background: "#f2f2f2", height: 130, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {f.dataUrl ? (
                <img src={f.dataUrl} alt={f.legenda} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : (
                <span style={{ color: "#999", fontSize: 10 }}>[sem foto]</span>
              )}
            </div>
            <div style={{ textAlign: "center", fontSize: 10, fontStyle: "italic", fontWeight: 700, padding: "4px 0" }}>{f.legenda}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, fontStyle: "italic", marginTop: 12, marginBottom: 4 }}>
        Detalhamento da Tensão de Alimentação do Produto:
      </p>
      <table style={{ width: "60%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th colSpan={2} style={{ ...labelStyle, textAlign: "center" }}>Leitura de Tensão na Tomada</th></tr>
        </thead>
        <tbody>
          <tr><td style={cellStyle}>F1 + F2</td><td style={cellStyle}>{data.tensaoF1F2}</td></tr>
          <tr><td style={cellStyle}>F1 + Terra</td><td style={cellStyle}>{data.tensaoF1Terra}</td></tr>
          <tr><td style={cellStyle}>F2 + Terra</td><td style={cellStyle}>{data.tensaoF2Terra}</td></tr>
        </tbody>
      </table>

      <p style={{ fontSize: 11, fontStyle: "italic", fontWeight: 700, marginTop: 12, marginBottom: 4 }}>Anotações Técnicas:</p>
      <div style={{ border: "1px solid #333", minHeight: 50, padding: 8, fontSize: 11, whiteSpace: "pre-wrap" }}>{data.anotacoes}</div>

      <div style={{ marginTop: 30, textAlign: "center", fontStyle: "italic" }}>
        <div style={{ fontSize: 11 }}>{data.cidade}, {data.dataParecer || "___/___/______"}</div>
        <div style={{ marginTop: 30, borderTop: "1px solid #000", width: 250, margin: "30px auto 0", paddingTop: 4, fontWeight: 700, textDecoration: "underline" }}>
          {data.responsavel}
        </div>
        <div style={{ fontSize: 11 }}>Técnico Responsável</div>
      </div>
    </div>
  );
}