type IValidaTensaoDeOperacaoNoMppts = {
  numeroModuloMppt: number;
  tensaoDoModuloEmCircuitoAberto: number;
  tensaoMaximaMppt: number;
  tensaoMinimaMppt: number;
};

export function validaTensaoDeOperacaoNoMppts(
  dto: IValidaTensaoDeOperacaoNoMppts
) {
  if (
    dto.numeroModuloMppt * dto.tensaoDoModuloEmCircuitoAberto >
    dto.tensaoMaximaMppt
  ) {
    return {
      valido: false,
      mensagem: "REDUZIR MÓDULOS POR STRING",
    };
  } else if (
    dto.tensaoDoModuloEmCircuitoAberto * dto.numeroModuloMppt <
    dto.tensaoMinimaMppt
  ) {
    return {
      valido: false,
      mensagem: "ADICIONAR MAIS MÓDULOS POR STRING",
    };
  }

  return {
    valido: true,
    mensagem: null,
  };
}
