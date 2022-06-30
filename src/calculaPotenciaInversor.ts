
export function calculaPotenciaInversor(dto: any) {
    return {
        minimo: dto.numeroTotalDeModulos * dto.potenciaMaximaDoModulo * 0.8,
        presente: dto.potenciaMaximaInversor * dto.quantidadeInversoresDeFrequencia,
        maximo: dto.numeroTotalDeModulos * dto.potenciaMaximaDoModulo * 1.2
    }
}