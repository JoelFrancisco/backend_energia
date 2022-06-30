import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validaGeracaoFotovotaica } from './validaGeracaoFotovotaica';
import { validaPotenciaInversor } from './validaPotenciaInversor';
import { calculaGeracaoFotovotaica } from './calculaGeracaoFotovotaica';
import { calculaPotenciaInversor } from './calculaPotenciaInversor';

const PORT = 3000;
const app = express();

const prisma = new PrismaClient();

app.get('/salvar', (req, res) => {
    const erros = []

    const dtoGeracaoFotovotaica = {
        consumoTotalEnergiaAnual: 0,
        numeroTotalDeModulos: 0,
        potenciaMaximaDoModulo: 0,
        irradiacaoDoLocal: 0,
        taxaDeDesempenhoDoSistema: 0,
        constanteGstc: 0,
    };

    const {
        mensagem: mensagemGeracaoFotovotaica, 
        valido: validoGeracaoFotovotaica 
    } = validaGeracaoFotovotaica(dtoGeracaoFotovotaica);

    if (!validoGeracaoFotovotaica) {
        erros.push(mensagemGeracaoFotovotaica);
    }


    const dtoPotenciaInversor = {
        numeroTotalDeModulos: 0,
        potenciaMaximaDoModulo: 0,
        potenciaMaximaCaInversor: 0,
        quantidadeInversoresDeFrequencia: 0,
    };

    const {
        mensagem: mensagemPotenciaInversor,
        valido: validoPotenciaInversor
    } = validaPotenciaInversor(dtoPotenciaInversor);

    if (!validoPotenciaInversor) {
        erros.push(mensagemPotenciaInversor);
    }

    if (erros.length > 0) {
        res.status(400).json({
            valido: false, 
            mensagem: erros.reduce((x, y) => `${x}, ${y}`)
        })
    }


    prisma.dadosGerais.create({
        data: {
            consumo_total_energia_anual: req.body.dados_gerais.consumo_total_energia_anual
        }
    });

    prisma.dadosModulos.create({
        data: {
            potencia_maxima_modulo: req.body.dados_modulos.potencia_maxima_modulo,
            tensao_modulo_circuito_aberto: req.body.dados_modulos.tensao_modulo_circuito_aberto,
            corrente_curto_circuito: req.body.dados_modulos.corrente_curto_circuito,
        }
    });

    prisma.dadosInversor.create({
        data: {
            corrente_maxima_mppt: req.body.dados_inversor.corrente_maxima_mppt,
            numero_mppts: req.body.dados_inversor.numero_mppts,
            potencia_maxima_ca_inversor: req.body.dados_inversor.potencia_maxima_ca_inversor,
            quantidade_inversores_frequencia: req.body.dados_inversor.quantidade_inversores_frequencia,
            tensao_maxima_mppt: req.body.dados_inversor.tensao_maxima_mppt,
            tensao_minima_mppt: req.body.dados_inversor.tensao_minima_mppt,
        }
    });

    prisma.dadosArranjo.create({
        data: {
            numero_total_modulos: req.body.dados_arranjo.numero_total_modulos,
            mppts: req.body.dados_arranjo.mppts
        }
    });

    res.status(200).json({
        valido: true, 
        mensagem: null
    })
});

app.get('/relatorio', (req, res) => {
    const { 
        minimo: minimoGeracaoEnergia,
        presente: presenteGeracaoEnergia,
        maximo: maximoGeracaoEnergia
    } = calculaGeracaoFotovotaica({
        consumoTotalEnergiaAnual: req.body.consumo_total_energia_anual,
        numeroTotalDeModulos: req.body.numero_total_modulos,
        potenciaMaximaDoModulo: req.body.potencia_maxima_do_modulo,
    });

    const {
        minimo: minimoPotenciaInversor,
        presente: presentePotenciaInversor,
        maximo: maximoPotenciaInversor
    } = calculaPotenciaInversor({
        numeroTotalDeModulos: req.body.numero_total_modulos,
        potenciaMaximaDoModulo: req.body.potencia_maxima_do_modulo,
        potenciaMaximaInversor: req.body.potencia_maxima_inversor,
        quantidadeInversoresDeFrequencia: req.body.quantidade_inversores_de_frequencia,
    });

});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));