import { PrismaClient, DadosArranjo } from "@prisma/client";

type IValidaQuantidadeDeMppts = {
  quantidadeInversoresDeFrequencia: number;
  numeroDeMppts: number;
  dadosArranjo: DadosArranjo;
};

export async function validaQuantidadeDeMppts(
  prisma: PrismaClient,
  dto: IValidaQuantidadeDeMppts
) {
  const dadosArranjo = await prisma.dadosArranjo
    .findUnique({
      where: {
        id: dto.dadosArranjo.id,
      },
      include: {
        mppts: true,
      },
    })
    .catch(() => console.log("Erro ao recuperar dados arranjo"));

  if (
    dadosArranjo?.numero_total_modulos !=
    dto.quantidadeInversoresDeFrequencia *
      (dadosArranjo?.mppts[0].numero_strings! *
        dadosArranjo?.mppts[0].modulos_string! +
        dadosArranjo?.mppts[1].numero_strings! *
          dadosArranjo?.mppts[1].modulos_string! +
        dadosArranjo?.mppts[2].numero_strings! *
          dadosArranjo?.mppts[2].modulos_string! +
        dadosArranjo?.mppts[3].numero_strings! *
          dadosArranjo?.mppts[3].modulos_string!)
  ) {
    return {
      valido: false,
      mensagem:
        "NÚMERO DE MÓDULOS NOS ARRANJOS DIFERENTE DO NÚMERO DE MÓDULOS DEFINIDO PARA O SISTEMA",
    };
  } else if (dto.numeroDeMppts == 1) {
    if (
      dadosArranjo?.mppts[1].numero_strings *
        dadosArranjo?.mppts[1].modulos_string +
        dadosArranjo?.mppts[2].numero_strings *
          dadosArranjo?.mppts[2].modulos_string +
        dadosArranjo?.mppts[3].numero_strings *
          dadosArranjo?.mppts[3].modulos_string ===
        0 &&
      dadosArranjo?.mppts[0].numero_strings *
        dadosArranjo?.mppts[0].modulos_string >
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
      dadosArranjo?.mppts[2].numero_strings *
        dadosArranjo?.mppts[2].modulos_string +
        dadosArranjo?.mppts[3].numero_strings *
          dadosArranjo?.mppts[3].modulos_string ===
        0 &&
      dadosArranjo?.mppts[0].numero_strings *
        dadosArranjo?.mppts[0].modulos_string >
        0 &&
      dadosArranjo?.mppts[1].numero_strings *
        dadosArranjo?.mppts[1].modulos_string >
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
      dadosArranjo?.mppts[3].numero_strings *
        dadosArranjo?.mppts[3].modulos_string ===
        0 &&
      dadosArranjo?.mppts[0].numero_strings *
        dadosArranjo?.mppts[0].modulos_string >
        0 &&
      dadosArranjo?.mppts[1].numero_strings *
        dadosArranjo?.mppts[1].modulos_string >
        0 &&
      dadosArranjo?.mppts[2].numero_strings *
        dadosArranjo?.mppts[2].modulos_string >
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
    dadosArranjo?.mppts[0].numero_strings *
      dadosArranjo?.mppts[0].modulos_string !==
      0 &&
    dadosArranjo?.mppts[1].numero_strings *
      dadosArranjo?.mppts[1].modulos_string !==
      0 &&
    dadosArranjo?.mppts[2].numero_strings *
      dadosArranjo?.mppts[2].modulos_string !==
      0 &&
    dadosArranjo?.mppts[3].numero_strings *
      dadosArranjo?.mppts[3].modulos_string !==
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
