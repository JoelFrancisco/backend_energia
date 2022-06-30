export function calculaGeracaoFotovotaica(dto: any) {
    return {
        minimo: dto.consumoTotalEnergiaAnual,
        presente: ((dto.numeroTotalDeModulos * dto.potenciaMaximaDoModulo * 30 * 4.38 * 0.8)/1)*12,
        maximo: dto.consumoTotalEnergiaAnual * 1.2
    }
}