import type { WhirlpoolData } from "@/lib/parecer-extras";

export default function WhirlpoolPreview({ data }: { data: WhirlpoolData }) {
  return (
    <div className="whirlpool-preview print-only">
      <div className="whirlpool-a4">
        {/* Header autorizada */}
        <div className="whirlpool-header">
          <div className="whirlpool-brand">VOX SERRA LTDA</div>
          <div className="whirlpool-sub">Assistência Técnica Autorizada Whirlpool</div>
        </div>

        <div className="whirlpool-section">
          <div className="whirlpool-title">LAUDO TÉCNICO / ORÇAMENTO</div>
        </div>

        {/* OS info */}
        <table className="whirlpool-table">
          <tbody>
            <tr>
              <td style={{ width: "16%" }}>NÚMERO DA OS</td>
              <td style={{ width: "34%" }}>{data.numeroOS}</td>
              <td style={{ width: "16%" }}>TÉCNICO</td>
              <td style={{ width: "34%" }}>{data.tecnico}</td>
            </tr>
            <tr>
              <td>DATA AGENDA</td>
              <td>{data.dataAgenda}</td>
              <td>DATA CHAMADO</td>
              <td>{data.dataChamado}</td>
            </tr>
            <tr>
              <td>PERÍODO</td>
              <td>{data.periodo}</td>
              <td>TIPO AGENDA</td>
              <td>{data.tipoAgenda}</td>
            </tr>
          </tbody>
        </table>

        {/* Consumidor */}
        <div className="whirlpool-section-title">DADOS DO CONSUMIDOR</div>
        <table className="whirlpool-table">
          <tbody>
            <tr>
              <td style={{ width: "16%" }}>CONSUMIDOR</td>
              <td style={{ width: "84%" }} colSpan={3}>
                {data.consumidor}
              </td>
            </tr>
            <tr>
              <td>CPF/CNPJ</td>
              <td>{data.cnpjCpf}</td>
              <td>CEP</td>
              <td>{data.cep}</td>
            </tr>
            <tr>
              <td>ENDEREÇO</td>
              <td>{data.endereco}</td>
              <td>COMPLEMENTO</td>
              <td>{data.complemento}</td>
            </tr>
            <tr>
              <td>BAIRRO</td>
              <td>{data.bairro}</td>
              <td>CIDADE/UF</td>
              <td>
                {data.cidade} / {data.uf}
              </td>
            </tr>
            <tr>
              <td>TELEFONES</td>
              <td colSpan={3}>
                {data.foneResidencia} {data.foneComercial} {data.foneOutros}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Produto */}
        <div className="whirlpool-section-title">DADOS DO PRODUTO</div>
        <table className="whirlpool-table">
          <tbody>
            <tr>
              <td style={{ width: "16%" }}>PRODUTO</td>
              <td style={{ width: "34%" }}>{data.produto}</td>
              <td style={{ width: "16%" }}>MARCA</td>
              <td style={{ width: "34%" }}>{data.marca}</td>
            </tr>
            <tr>
              <td>LINHA</td>
              <td>{data.linha}</td>
              <td>SÉRIE</td>
              <td>{data.serie}</td>
            </tr>
            <tr>
              <td>Nº NOTA FISCAL</td>
              <td>{data.nrNotaFiscal}</td>
              <td>DATA COMPRA</td>
              <td>{data.dataCompra}</td>
            </tr>
            <tr>
              <td>COR</td>
              <td>{data.cor}</td>
              <td>VOLTAGEM</td>
              <td>{data.voltagem}</td>
            </tr>
          </tbody>
        </table>

        {/* Defeitos / laudo */}
        <div className="whirlpool-section-title">DEFEITO E LAUDO</div>
        <div className="whirlpool-box">
          <strong>DEFEITO RECLAMADO:</strong>
          <p>{data.defeitoReclamado}</p>
        </div>
        <div className="whirlpool-box">
          <strong>DEFEITO CONSTATADO:</strong>
          <p>{data.defeitoConstatado}</p>
        </div>
        <div className="whirlpool-box">
          <strong>RECLAMAÇÃO ATENDIMENTO:</strong>
          <p>{data.reclamacaoAtendimento}</p>
        </div>
        <div className="whirlpool-box">
          <strong>LAUDO TÉCNICO:</strong>
          <p>{data.laudoTecnico}</p>
        </div>

        {/* Peças */}
        <div className="whirlpool-section-title">PEÇAS / ORÇAMENTO</div>
        <table className="whirlpool-table whirlpool-parts">
          <thead>
            <tr>
              <th>QTD</th>
              <th>CÓDIGO</th>
              <th>DESCRIÇÃO</th>
              <th>FCTA</th>
              <th>OCOR</th>
              <th>VALOR</th>
            </tr>
          </thead>
          <tbody>
            {data.pecas.map((p, i) => (
              <tr key={i}>
                <td>{p.quantidade}</td>
                <td>{p.codigo}</td>
                <td>{p.descricao}</td>
                <td>{p.fcta}</td>
                <td>{p.ocor}</td>
                <td>{p.valor}</td>
              </tr>
            ))}
            {data.pecas.length === 0 && (
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="whirlpool-totals">
          <div>
            <strong>TOTAL PEÇAS:</strong> {data.totalPecas}
          </div>
          <div>
            <strong>MÃO DE OBRA:</strong> {data.maoDeObra}
          </div>
          <div>
            <strong>TOTAL ORÇAMENTO:</strong> {data.totalOrcamento}
          </div>
        </div>

        <div className="whirlpool-obs">
          <strong>OBSERVAÇÃO:</strong>
          <p>{data.observacao}</p>
        </div>

        <div className="whirlpool-terms">
          <p>{data.validadeOrcamento}</p>
          <p>
            Garantia do serviço: <strong>{data.garantiaServicoMeses}</strong> meses. Garantia das peças: <strong>{data.garantiaPecasMeses}</strong> meses.
          </p>
        </div>

        <div className="whirlpool-footer">
          <div className="whirlpool-signature">
            <p>Assinatura do consumidor</p>
          </div>
          <div className="whirlpool-meta">
            <p>Data conclusão: {data.dataConclusao}</p>
            <p>Responsável: {data.responsavel}</p>
            <p>Data parecer: {data.dataParecer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
