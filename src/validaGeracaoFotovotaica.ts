type IValidaGeracaoFotovotaica = {
  consumoTotalEnergiaAnual: number;
  numeroTotalDeModulos: number;
  potenciaMaximaDoModulo: number;
  irradiacaoDoLocal: number;
  taxaDeDesempenhoDoSistema: number;
  constanteGstc: number;
};

export function validaGeracaoFotovotaica(dto: IValidaGeracaoFotovotaica) {
  if (
    dto.consumoTotalEnergiaAnual / 12 >
    (dto.numeroTotalDeModulos *
      dto.potenciaMaximaDoModulo *
      30 *
      dto.irradiacaoDoLocal *
      dto.taxaDeDesempenhoDoSistema) /
      (dto.constanteGstc * 1000)
  ) {
    return { valido: false, mensagem: "Adicionar mais módulos" };
  }

  if (
    (dto.numeroTotalDeModulos *
      dto.potenciaMaximaDoModulo *
      30 *
      dto.irradiacaoDoLocal *
      dto.taxaDeDesempenhoDoSistema) /
      (dto.constanteGstc * 1000) >
    (1.2 * dto.consumoTotalEnergiaAnual) / 12
  ) {
    return { valido: false, mensagem: "Reduzir número de módulos" };
  }

  return { valido: true, mensagem: null };
}
