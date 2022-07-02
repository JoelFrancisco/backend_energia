type IValidaQuantidadeDeMppts = {
  quantidadeInversoresDeFrequencia: number;
  numeroDeMppts: number;
  dadosArranjo: any;
};

export async function validaQuantidadeDeMppts(
  dto: IValidaQuantidadeDeMppts
) {
  if (
    dto.dadosArranjo?.numero_total_modulos !=
    dto.quantidadeInversoresDeFrequencia *
      (dto.dadosArranjo?.mppts[0].numero_strings! *
        dto.dadosArranjo?.mppts[0].modulos_string! +
        dto.dadosArranjo?.mppts[1].numero_strings! *
          dto.dadosArranjo?.mppts[1].modulos_string! +
        dto.dadosArranjo?.mppts[2].numero_strings! *
          dto.dadosArranjo?.mppts[2].modulos_string! +
        dto.dadosArranjo?.mppts[3].numero_strings! *
          dto.dadosArranjo?.mppts[3].modulos_string!)
  ) {
    return {
      valido: false,
      mensagem:
        "NÚMERO DE MÓDULOS NOS ARRANJOS DIFERENTE DO NÚMERO DE MÓDULOS DEFINIDO PARA O SISTEMA",
    };
  } else if (dto.numeroDeMppts == 1) {
    if (
      dto.dadosArranjo?.mppts[1].numero_strings *
        dto.dadosArranjo?.mppts[1].modulos_string +
        dto.dadosArranjo?.mppts[2].numero_strings *
          dto.dadosArranjo?.mppts[2].modulos_string +
        dto.dadosArranjo?.mppts[3].numero_strings *
          dto.dadosArranjo?.mppts[3].modulos_string ===
        0 &&
      dto.dadosArranjo?.mppts[0].numero_strings *
        dto.dadosArranjo?.mppts[0].modulos_string >
        0
    ) {
      return { valido: true, mensagem: null };
    } else {
      return {
        valido: false,
        mensagem: "MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs",
      };
    }
  } else if (dto.numeroDeMppts == 2) {
    if (
      dto.dadosArranjo?.mppts[2].numero_strings *
        dto.dadosArranjo?.mppts[2].modulos_string +
        dto.dadosArranjo?.mppts[3].numero_strings *
          dto.dadosArranjo?.mppts[3].modulos_string ===
        0 &&
      dto.dadosArranjo?.mppts[0].numero_strings *
        dto.dadosArranjo?.mppts[0].modulos_string >
        0 &&
      dto.dadosArranjo?.mppts[1].numero_strings *
        dto.dadosArranjo?.mppts[1].modulos_string >
        0
    ) {
      return { valido: true, mensagem: null };
    } else {
      return {
        valido: false,
        mensagem: "MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs",
      };
    }
  } else if (dto.numeroDeMppts == 3) {
    if (
      dto.dadosArranjo?.mppts[3].numero_strings *
        dto.dadosArranjo?.mppts[3].modulos_string ===
        0 &&
      dto.dadosArranjo?.mppts[0].numero_strings *
        dto.dadosArranjo?.mppts[0].modulos_string >
        0 &&
      dto.dadosArranjo?.mppts[1].numero_strings *
        dto.dadosArranjo?.mppts[1].modulos_string >
        0 &&
      dto.dadosArranjo?.mppts[2].numero_strings *
        dto.dadosArranjo?.mppts[2].modulos_string >
        0
    ) {
      return { valido: true, mensagem: null };
    } else {
      return {
        valido: false,
        mensagem: "MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs",
      };
    }
  } else if (
    dto.dadosArranjo?.mppts[0].numero_strings *
      dto.dadosArranjo?.mppts[0].modulos_string !==
      0 &&
    dto.dadosArranjo?.mppts[1].numero_strings *
      dto.dadosArranjo?.mppts[1].modulos_string !==
      0 &&
    dto.dadosArranjo?.mppts[2].numero_strings *
      dto.dadosArranjo?.mppts[2].modulos_string !==
      0 &&
    dto.dadosArranjo?.mppts[3].numero_strings *
      dto.dadosArranjo?.mppts[3].modulos_string !==
      0
  ) {
    return { valido: true, mensagem: null };
  } else {
    return {
      valido: false,
      mensagem: "MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs",
    };
  }
}
