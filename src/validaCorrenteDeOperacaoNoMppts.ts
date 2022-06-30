type IValidaCorrenteDeOperacaoNoMppts = {
  correnteDeCurtoCircuito: number;
  numeroStringsMppt: number;
  correnteMaximaDoMppt: number;
};

export function validaCorrenteDeOperacaoNoMppts(
  dto: IValidaCorrenteDeOperacaoNoMppts
) {
  if (
    dto.correnteDeCurtoCircuito * dto.numeroStringsMppt >
    dto.correnteMaximaDoMppt
  ) {
    return {
      valido: false,
      mensagem: "CORRENTE ELEVADA - REDUZIR QUANTIDADE DE STRINGS",
    };
  }

  return {
    valido: true,
    mensagem: null,
  };
}
