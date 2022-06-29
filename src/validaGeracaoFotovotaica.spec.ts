import { validaGeracaoFotovotaica } from "./validaGeracaoFotovotaica";

describe("validaGeracaoFotovotaica", () => {
  it("Deve retornar false pois possui menos módulos do que o exigido", () => {
    const { mensagem } = validaGeracaoFotovotaica({
      consumoTotalEnergiaAnual: 12,
      constanteGstc: 1,
      irradiacaoDoLocal: 4.38,
      numeroTotalDeModulos: 0,
      potenciaMaximaDoModulo: 0,
      taxaDeDesempenhoDoSistema: 0.8,
    });
    expect(mensagem).toEqual("Adicionar mais módulos");
  });

  it("Deve retornar false pois possui mais módulos do que o exigido", () => {
    const { mensagem } = validaGeracaoFotovotaica({
      consumoTotalEnergiaAnual: 0,
      constanteGstc: 1,
      irradiacaoDoLocal: 4.38,
      numeroTotalDeModulos: 1,
      potenciaMaximaDoModulo: 1,
      taxaDeDesempenhoDoSistema: 0.8,
    });
    expect(mensagem).toEqual("Reduzir número de módulos");
  });

  it("Deve retornar true pois possui o número exigido de módulos", () => {
    const { valido } = validaGeracaoFotovotaica({
      consumoTotalEnergiaAnual: 24967,
      constanteGstc: 1,
      irradiacaoDoLocal: 4.38,
      numeroTotalDeModulos: 48,
      potenciaMaximaDoModulo: 455,
      taxaDeDesempenhoDoSistema: 0.8,
    });
    expect(valido).toBe(true);
  });
});
