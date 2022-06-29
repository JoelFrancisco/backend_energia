type IValidaPotenciaInversor = {
  numeroTotalDeModulos: number;
  potenciaMaximaDoModulo: number;
  potenciaMaximaCaInversor: number;
  quantidadeInversoresDeFrequencia: number;
};

export function validaPotenciaInversor(dto: IValidaPotenciaInversor) {
  if (
    dto.potenciaMaximaDoModulo * dto.numeroTotalDeModulos * 0.8 >
    dto.potenciaMaximaCaInversor * dto.quantidadeInversoresDeFrequencia
  ) {
    return {
      valido: false,
      mensagem: "Dimensionar inversor de maior potência",
    };
  }

  if (
    dto.potenciaMaximaCaInversor * dto.quantidadeInversoresDeFrequencia * 0.8 >
    dto.potenciaMaximaCaInversor * dto.numeroTotalDeModulos
  ) {
    return {
      valido: false,
      mensagem: "Dimensionar inversor de menor potência",
    };
  }

  return { valido: true, mensagem: null };
}
