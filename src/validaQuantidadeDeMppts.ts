import { PrismaClient, DadosArranjo } from '@prisma/client';

type IValidaQuantidadeDeMppts = {
    quantidadeInversoresDeFrequencia: number;
    dadosArranjo: DadosArranjo
};

export function validaQuantidadeDeMppts(prisma: PrismaClient, dto: IValidaQuantidadeDeMppts) {
    let notas_mppts;

    const dadosArranjo = prisma.dadosArranjo.findUnique({
        where: { 
            id: dto.dadosArranjo.id,
        },
        include: {
            mppts: true
        }
    });

    if (dto.dadosArranjo.numero_total_modulos != dto.quantidadeInversoresDeFrequencia * (*numero_modulo_mppt1+numero_strings_mppt2*numero_modulo_mppt2+numero_strings_mppt3*numero_modulo_mppt3+numero_strings_mppt4*numero_modulo_mppt4)
        return { valido: false, mensagem: 'NÚMERO DE MÓDULOS NOS ARRANJOS DIFERENTE DO NÚMERO DE MÓDULOS DEFINIDO PARA O SISTEMA'}
    else if (numero_mppt == 1):
        if numero_strings_mppt2*numero_modulo_mppt2+numero_strings_mppt3*numero_modulo_mppt3+numero_strings_mppt4*numero_modulo_mppt4 == 0 and numero_strings_mppt1*numero_modulo_mppt1 > 0:
            notas_mppts = 'VÁLIDA'
        else:
            notas_mppts = 'MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs'
    elif numero_mppt == 2:
        if numero_strings_mppt3*numero_modulo_mppt3+numero_strings_mppt4*numero_modulo_mppt4 == 0 and numero_strings_mppt1*numero_modulo_mppt1 > 0 and numero_strings_mppt2*numero_modulo_mppt2 > 0:
            notas_mppts = 'VÁLIDA'
        else:
            notas_mppts = 'MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs'
    elif numero_mppt == 3:
        if numero_strings_mppt4*numero_modulo_mppt4 == 0 and numero_strings_mppt1*numero_modulo_mppt1 > 0 and numero_strings_mppt2*numero_modulo_mppt2 > 0 and numero_strings_mppt3*numero_modulo_mppt3 > 0:
            notas_mppts = 'VÁLIDA'
        else:
            notas_mppts = 'MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs'
    elif numero_strings_mppt1*numero_modulo_mppt1 != 0 and numero_strings_mppt3*numero_modulo_mppt3 != 0 and numero_strings_mppt3*numero_modulo_mppt3 != 0 and numero_strings_mppt4*numero_modulo_mppt4 != 0:
        notas_mppts = 'VÁLIDA'
    else:
        notas_mppts = 'MÓDULOS DISPOSTOS INCORRETAMENTE NOS MPPTs'
}
