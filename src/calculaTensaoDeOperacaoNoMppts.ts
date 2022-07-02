export function calculaTensaoDeOperacaoNoMppts(dto: any) {
    return {
        minima: dto.tensaoMinimaMppt,
        presente: ((dto.tensaoModuloCircuitoAberto * dto.potenciaMaximaDoModulo * 30 * 4.38 * 0.8)/1)*12,
        maximo: dto.consumoTotalEnergiaAnual * 1.2
    }
}