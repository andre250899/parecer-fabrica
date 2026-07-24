import type { WhirlpoolData } from "@/lib/parecer-extras";

function T({ children }: { children?: React.ReactNode }) {
  return <>{children || "\u00A0"}</>;
}

export default function WhirlpoolPreview({ data }: { data: WhirlpoolData }) {
  const telefones = [
    data.foneResidencia && `FONE RESIDÊNCIA: ${data.foneResidencia}`,
    data.foneComercial && `FONE COMERCIAL: ${data.foneComercial}`,
    data.foneOutros && `FONE (OUTROS): ${data.foneOutros}`,
  ]
    .filter(Boolean)
    .join("   ");

  return (
    <div id="parecer-print" className="whirlpool-preview print-only">
      <div className="whirlpool-a4">
        {/* Cabeçalho autorizada + central */}
        <table className="wp-t wp-header">
          <tbody>
            <tr>
              <td className="wp-half">
                <div>AUTORIZADA:</div>
                <div>{data.autorizada}</div>
                <div>
                  {data.enderecoAutorizada}
                  {data.cnpjAutorizada ? `  CNPJ: ${data.cnpjAutorizada}` : ""}
                </div>
                <div>
                  FONE: {data.foneAutorizada}
                  {data.inscEstadualAutorizada
                    ? `      Insc.Estadual: ${data.inscEstadualAutorizada}`
                    : ""}
                </div>
              </td>
              <td className="wp-half">
                <div>Central de Atendimento</div>
                <div>{data.centralAtendimento}</div>
                <div>FONE: {data.foneCentral1}</div>
                <div>FONE: {data.foneCentral2}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* OS / Técnico / Etiqueta / Datas */}
        <table className="wp-t">
          <tbody>
            <tr>
              <td style={{ width: "14%", textAlign: "center", verticalAlign: "middle" }}>
                <div className="wp-lbl">NÚMERO DA OS</div>
                <div className="wp-strong" style={{ border: "none", padding: "2px 0" }}><T>{data.numeroOS}</T></div>
              </td>
              <td style={{ width: "12%", textAlign: "center", verticalAlign: "middle" }}>
                <div className="wp-lbl">TÉCNICO</div>
                <div className="wp-strong" style={{ border: "none", padding: "2px 0" }}><T>{data.tecnico}</T></div>
              </td>
              <td style={{ width: "44%", textAlign: "center", fontFamily: "'Courier New', monospace", verticalAlign: "middle" }}>
                COLE AQUI A ETIQUETA DO PRODUTO
              </td>
              <td style={{ width: "30%", verticalAlign: "middle", lineHeight: 1.35 }}>
                <div>DATA AGENDA: {data.dataAgenda}</div>
                <div>DATA CHAMADO: {data.dataChamado}</div>
                <div>PÉRIODO: {data.periodo}</div>
                <div>TIPO AGENDA: {data.tipoAgenda}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Consumidor */}
        <table className="wp-t">
          <tbody>
            <tr>
              <td colSpan={2}>CONSUMIDOR: {data.consumidor}</td>
              <td>CEP: {data.cep}</td>
              <td>REGIÃO: {data.regiao}</td>
            </tr>
            <tr>
              <td colSpan={2}>ENDEREÇO: {data.endereco}</td>
              <td colSpan={2}>BAIRRO: {data.bairro}</td>
            </tr>
            <tr>
              <td colSpan={2}>COMPLEMENTO: {data.complemento}</td>
              <td>CIDADE: {data.cidade}</td>
              <td>UF: {data.uf}</td>
            </tr>
            <tr>
              <td colSpan={2}>CNPJ/CPF: {data.cnpjCpf}</td>
              <td colSpan={2}>ENDEREÇO ELETRÔNICO: {data.enderecoEletronico}</td>
            </tr>
            <tr>
              <td colSpan={4}>{telefones || "\u00A0"}</td>
            </tr>
            <tr>
              <td colSpan={4}>LOCALIZAÇÃO: {data.localizacao}</td>
            </tr>
          </tbody>
        </table>

        {/* Produto */}
        <table className="wp-t">
          <tbody>
            <tr>
              <td colSpan={2}>PRODUTO: {data.produto}</td>
              <td colSpan={2}>MARCA: {data.marca}</td>
            </tr>
            <tr>
              <td colSpan={2}>PRODUTO CONSUMIDOR: {data.produtoConsumidor}</td>
              <td colSpan={2}>LINHA: {data.linha}</td>
            </tr>
            <tr>
              <td>SÉRIE: {data.serie}</td>
              <td>NOME COMERCIAL: {data.nomeComercial}</td>
              <td colSpan={2}>TEMPO DE USO: {data.tempoUso}</td>
            </tr>
            <tr>
              <td colSpan={4}>TIPO DE OS: {data.tipoOS}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                NR NOTA FISCAL: {data.nrNotaFiscal}   DATA COMPRA: {data.dataCompra}   COR: {data.cor}   VOLTAGEM: {data.voltagem}   CAPACIDADE: {data.capacidade}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Defeitos */}
        <table className="wp-t">
          <tbody>
            <tr>
              <td className="wp-lbl" style={{ width: "14%" }}>DEFEITO<br />RECLAMADO</td>
              <td style={{ width: "36%" }}>
                <div>1&nbsp;&nbsp;<T>{data.defeitoReclamado}</T></div>
                <div>2&nbsp;&nbsp;<T>{data.defeitoReclamado2}</T></div>
              </td>
              <td className="wp-lbl" style={{ width: "14%" }}>DEFEITO<br />CONSTATADO</td>
              <td style={{ width: "36%" }}>
                <div>1&nbsp;&nbsp;<T>{data.defeitoConstatado}</T></div>
                <div>2&nbsp;&nbsp;<T>{data.defeitoConstatado2}</T></div>
              </td>
            </tr>
            <tr>
              <td className="wp-lbl">RECLAMAÇÃO<br />ATENDIMENTO</td>
              <td colSpan={3} className="wp-multi"><T>{data.reclamacaoAtendimento}</T></td>
            </tr>
            <tr>
              <td className="wp-lbl">LAUDO<br />TÉCNICO</td>
              <td colSpan={3} className="wp-multi" style={{ minHeight: "40px" }}><T>{data.laudoTecnico}</T></td>
            </tr>
          </tbody>
        </table>

        {/* Peças */}
        <table className="wp-t wp-parts">
          <thead>
            <tr>
              <th style={{ width: "14%" }}>QUANTIDADE</th>
              <th style={{ width: "12%" }}>CÓDIGO</th>
              <th style={{ width: "46%" }}>DESCRIÇÃO DA PEÇA</th>
              <th style={{ width: "8%" }}>FCTA</th>
              <th style={{ width: "7%" }}>OCOR.</th>
              <th style={{ width: "13%" }}>VALOR EM R$</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(8, data.pecas.length) }).map((_, i) => {
              const p = data.pecas[i];
              return (
                <tr key={i}>
                  <td>{p?.quantidade || "\u00A0"}</td>
                  <td>{p?.codigo || "\u00A0"}</td>
                  <td>{p?.descricao || "\u00A0"}</td>
                  <td>{p?.fcta || "\u00A0"}</td>
                  <td>{p?.ocor || "\u00A0"}</td>
                  <td>{p?.valor || "\u00A0"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Observação + Totais */}
        <table className="wp-t">
          <tbody>
            <tr>
              <td rowSpan={3} style={{ width: "65%" }}>
                <div className="wp-lbl-inline">OBSERVAÇÃO</div>
                <div className="wp-obs"><T>{data.observacao}</T></div>
              </td>
              <td style={{ width: "20%" }}>TOTAL DE PEÇAS</td>
              <td style={{ width: "15%" }}>{data.totalPecas}</td>
            </tr>
            <tr>
              <td>MÃO DE OBRA</td>
              <td>{data.maoDeObra}</td>
            </tr>
            <tr>
              <td>TOTAL DE ORÇAMENTO</td>
              <td>{data.totalOrcamento}</td>
            </tr>
          </tbody>
        </table>

        {/* Orçamento */}
        <table className="wp-t">
          <tbody>
            <tr>
              <td rowSpan={4} style={{ width: "40%", textAlign: "center" }}>
                <div className="wp-title-inline">ORÇAMENTO</div>
                <div style={{ fontSize: "8pt" }}>
                  {data.validadeOrcamento}
                </div>
              </td>
              <td style={{ width: "12%", textAlign: "center" }}>PARCELAS</td>
              <td style={{ width: "14%", textAlign: "center" }}>VENCIMENTO</td>
              <td style={{ width: "12%", textAlign: "center" }}>VALOR</td>
              <td style={{ width: "22%", textAlign: "center" }}>CONDIÇÃO DE PAGAMENTO</td>
            </tr>
            <tr>
              <td>{data.parcelas || "\u00A0"}</td>
              <td>{data.vencimento || "\u00A0"}</td>
              <td>{data.valorOrcamento || "\u00A0"}</td>
              <td>{data.condicaoPagamento || "\u00A0"}</td>
            </tr>
            <tr>
              <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        {/* Autorização */}
        <div className="wp-box">
          <div className="wp-title-inline" style={{ textAlign: "center" }}>AUTORIZAÇÃO</div>
          <p style={{ margin: "4px 0" }}>
            EU ________________________________________________________________ AUTORIZO A REALIZAÇÃO DO SERVIÇO, BEM COMO A TROCA DE PEÇAS, CONFORME O PRESENTE DIAGNÓSTICO E/OU ORÇAMENTO TÉCNICO, TENDO RECEBIDO ORIENTAÇÕES NECESSÁRIAS.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "18px" }}>
            <div>
              {data.dataAprovacao || "____/____/__________"}<br />
              <strong>DATA DA APROVAÇÃO</strong>
            </div>
            <div style={{ textAlign: "right", marginRight: "20mm" }}>
              {data.assinaturaConsumidor ? (
                <img
                  src={data.assinaturaConsumidor}
                  alt="Assinatura"
                  style={{ height: "80px", maxWidth: "320px", display: "inline-block", borderBottom: "1px solid #000" }}
                />
              ) : (
                <>_________________________________________</>
              )}
              <br />
              <strong>ASSINATURA DO CONSUMIDOR</strong>
            </div>
          </div>
        </div>

        {/* Termo de garantia */}
        <div className="wp-box">
          <div className="wp-title-inline" style={{ textAlign: "center" }}>TERMO DE GARANTIA DO SERVIÇO AUTORIZADO</div>
          <p style={{ margin: "4px 0", fontSize: "8.5pt", textAlign: "justify" }}>
            CONFORME DESCRITO NO ORÇAMENTO JÁ APROVADO, FIRMAMOS A GARANTIA DO SERVIÇO (MÃO DE OBRA) DE ASSISTÊNCIA TÉCNICA POR UM PERÍODO DE _______(___) MESES E DAS PEÇAS APLICADAS POR UM PERÍODO DE _______(___) MESES, A PARTIR DE ________________ (DATA DE CONCLUSÃO), QUANDO O SERVIÇO FOI DEVIDAMENTE EXECUTADO, ESTANDO EM PERFEITAS CONDIÇÕES DE UTILIZAÇÃO, TENDO RECEBIDO AS ORIENTAÇÕES NECESSÁRIAS PARA A CORRETA UTILIZAÇÃO DO PRODUTO.
          </p>
          <p style={{ margin: "4px 0", fontSize: "8.5pt", textAlign: "justify" }}>
            EXCLUEM-SE DA GARANTIA OS DEFEITOS CAUSADOS POR USO IMPRÓPRIO OU INADEQUADO DO PRODUTO E PROBLEMAS DECORRENTES DE ACIDENTES NATURAIS, COMO POR EXEMPLO: RAIO, INCÊNCIO, INUMDAÇÕES E ETC.
          </p>
          <p style={{ margin: "4px 0", fontSize: "8.5pt", textAlign: "justify" }}>
            DENTRO DO PRAZO DE GARANTIA DO SERVIÇO E DAS PEÇAS SUBSTITUÍDAS, A TROCA DESSAS PEÇAS E COMPONENTES EVENTUALMENTE DEFEITUOSAS SERÁ GRATUIDA, ASSIM COMO A MÃO DE OBRA APLICADA.
          </p>
          <p style={{ margin: "4px 0", fontSize: "8.5pt" }}>DE ACORDO.</p>
        </div>
      </div>
    </div>
  );
}
