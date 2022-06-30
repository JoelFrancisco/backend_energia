-- CreateTable
CREATE TABLE "DadosGerais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consumo_total_energia_anual" REAL NOT NULL,
    "irradiacao_local" REAL NOT NULL DEFAULT 4.38,
    "temperatura_minima_ambiente" REAL NOT NULL DEFAULT 0,
    "constante_gstc" REAL NOT NULL DEFAULT 1,
    "taxa_desempenho_sistema" REAL NOT NULL DEFAULT 0.8
);

-- CreateTable
CREATE TABLE "DadosModulos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "potencia_maxima_modulo" REAL NOT NULL,
    "tensao_modulo_circuito_aberto" REAL NOT NULL,
    "corrente_curto_circuito" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "DadosInversor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "potencia_maxima_ca_inversor" REAL NOT NULL,
    "tensao_maxima_mppt" REAL NOT NULL,
    "tensao_minima_mppt" REAL NOT NULL,
    "corrente_maxima_mppt" REAL NOT NULL,
    "numero_mppts" INTEGER NOT NULL,
    "quantidade_inversores_frequencia" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Mppt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_strings" INTEGER NOT NULL,
    "modulos_string" INTEGER NOT NULL,
    "azimute" INTEGER NOT NULL,
    "inclinacao" INTEGER NOT NULL,
    "dadosArranjoId" INTEGER NOT NULL,
    CONSTRAINT "Mppt_dadosArranjoId_fkey" FOREIGN KEY ("dadosArranjoId") REFERENCES "DadosArranjo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DadosArranjo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_total_modulos" INTEGER NOT NULL
);
