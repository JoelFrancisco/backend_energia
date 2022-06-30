import express from "express";
import { PrismaClient } from "@prisma/client";
import { validaGeracaoFotovotaica } from "./validaGeracaoFotovotaica";
import { validaPotenciaInversor } from "./validaPotenciaInversor";
import { calculaGeracaoFotovotaica } from "./calculaGeracaoFotovotaica";
import { calculaPotenciaInversor } from "./calculaPotenciaInversor";
import { validaQuantidadeDeMppts } from "./validaQuantidadeDeMppts";
import { validaTensaoDeOperacaoNoMppts } from "./validaTensaoDeOperacaoNoMppts";
import { validaCorrenteDeOperacaoNoMppts } from "./validaCorrenteDeOperacaoNoMppts";

const PORT = 8080;
const app = express();

const prisma = new PrismaClient();

app.post("/salvar", async (req, res) => {
  const erros = [];

  const dtoGeracaoFotovotaica = {
    consumoTotalEnergiaAnual: 0,
    numeroTotalDeModulos: req.body.DadosArranjo.numero_total_modulos,
    potenciaMaximaDoModulo: req.body.DadosModulos.potencia_maxima_modulo,
    irradiacaoDoLocal: 4.38,
    taxaDeDesempenhoDoSistema: 0.8,
    constanteGstc: 1,
  };

  const {
    mensagem: mensagemGeracaoFotovotaica,
    valido: validoGeracaoFotovotaica,
  } = validaGeracaoFotovotaica(dtoGeracaoFotovotaica);

  if (!validoGeracaoFotovotaica) {
    erros.push(mensagemGeracaoFotovotaica);
  }

  const dtoPotenciaInversor = {
    numeroTotalDeModulos: req.body.DadosArranjo.numero_total_modulos,
    potenciaMaximaDoModulo: req.body.DadosModulos.potencia_maxima_modulo,
    potenciaMaximaCaInversor:
      req.body.DadosInversor.potencia_maxima_ca_inversor,
    quantidadeInversoresDeFrequencia:
      req.body.DadosInversor.quantidade_inversores_frequencia,
  };

  const { mensagem: mensagemPotenciaInversor, valido: validoPotenciaInversor } =
    validaPotenciaInversor(dtoPotenciaInversor);

  if (!validoPotenciaInversor) {
    erros.push(mensagemPotenciaInversor);
  }

  const dtoQuantidadeDeMppts = {
    dadosArranjo: req.body.DadosArranjo,
    numeroDeMppts: req.body.DadosInversor.numero_mppts,
    quantidadeInversoresDeFrequencia:
      req.body.DadosInversor.quantidade_inversores_frequencia,
  };

  const {
    mensagem: mensagemQuantidadeDeMppts,
    valido: validoQuantidadeDeMppts,
  } = await validaQuantidadeDeMppts(prisma, dtoQuantidadeDeMppts);

  if (!validoQuantidadeDeMppts) {
    erros.push(mensagemQuantidadeDeMppts);
  }

  for (const mppt of req.body.DadosArranjo.mppts) {
    const {
      mensagem: mensagemTensaoDeOperacaoNoMppts,
      valido: validoTensaoDeOperacaoNoMppts,
    } = validaTensaoDeOperacaoNoMppts({
      numeroModuloMppt: 0,
      tensaoDoModuloEmCircuitoAberto: 0,
      tensaoMaximaMppt: 0,
      tensaoMinimaMppt: 0,
    });

    if (!validoTensaoDeOperacaoNoMppts) {
      erros.push(mensagemTensaoDeOperacaoNoMppts);
    }

    const {
      mensagem: mensagemCorrenteDeOperacaoNoMppts,
      valido: validoCorrenteDeOperacaoNoMppts,
    } = validaCorrenteDeOperacaoNoMppts({
      correnteDeCurtoCircuito: req.body.DadosModulos.corrente_curto_circuito,
      numeroStringsMppt: mppt.numero_strings,
      correnteMaximaDoMppt: req.body.DadosInversor.corrente_maxima_mppt,
    });

    if (!validoCorrenteDeOperacaoNoMppts) {
      erros.push(mensagemCorrenteDeOperacaoNoMppts);
    }
  }

  if (erros.length > 0) {
    return res.status(400).json({
      valido: false,
      mensagem: erros.reduce((x, y) => `${x}, ${y}`),
    });
  }
  const [dadosGerais, dadosModulos, dadosInversor, dadosArranjo] =
    await prisma.$transaction([
      prisma.dadosGerais.create({
        data: {
          consumo_total_energia_anual:
            req.body.dados_gerais.consumo_total_energia_anual,
        },
      }),

      prisma.dadosModulos.create({
        data: {
          potencia_maxima_modulo: req.body.dados_modulos.potencia_maxima_modulo,
          tensao_modulo_circuito_aberto:
            req.body.dados_modulos.tensao_modulo_circuito_aberto,
          corrente_curto_circuito:
            req.body.dados_modulos.corrente_curto_circuito,
        },
      }),

      prisma.dadosInversor.create({
        data: {
          corrente_maxima_mppt: req.body.dados_inversor.corrente_maxima_mppt,
          numero_mppts: req.body.dados_inversor.numero_mppts,
          potencia_maxima_ca_inversor:
            req.body.dados_inversor.potencia_maxima_ca_inversor,
          quantidade_inversores_frequencia:
            req.body.dados_inversor.quantidade_inversores_frequencia,
          tensao_maxima_mppt: req.body.dados_inversor.tensao_maxima_mppt,
          tensao_minima_mppt: req.body.dados_inversor.tensao_minima_mppt,
        },
      }),

      prisma.dadosArranjo.create({
        data: {
          numero_total_modulos: req.body.dados_arranjo.numero_total_modulos,
          mppts: req.body.dados_arranjo.mppts,
        },
      }),
    ]);

  res.status(200).json({
    valido: true,
    mensagem: null,
    data: {
      DadosGerais: dadosGerais,
      DadosModulos: dadosModulos,
      DadosInversor: dadosInversor,
      dadosArranjo: dadosArranjo,
    },
  });
});

app.get("/relatorio", (req, res) => {
  const {
    minimo: minimoGeracaoEnergia,
    presente: presenteGeracaoEnergia,
    maximo: maximoGeracaoEnergia,
  } = calculaGeracaoFotovotaica({
    consumoTotalEnergiaAnual: req.body.consumo_total_energia_anual,
    numeroTotalDeModulos: req.body.numero_total_modulos,
    potenciaMaximaDoModulo: req.body.potencia_maxima_do_modulo,
  });

  const {
    minimo: minimoPotenciaInversor,
    presente: presentePotenciaInversor,
    maximo: maximoPotenciaInversor,
  } = calculaPotenciaInversor({
    numeroTotalDeModulos: req.body.numero_total_modulos,
    potenciaMaximaDoModulo: req.body.potencia_maxima_do_modulo,
    potenciaMaximaInversor: req.body.potencia_maxima_inversor,
    quantidadeInversoresDeFrequencia:
      req.body.quantidade_inversores_de_frequencia,
  });
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
