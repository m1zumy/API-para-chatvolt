const CONFIG_BUSCA = {
    NOME_PLANILHA: 'Colaboradores',
    ORIG_PLANILHA_ID: '1hYQBkiz1r_4ZZPfU8bKfNXo63UF0N5XQSKZj3WzD2RQ',
    ORIG_NOME_ABA: 'Colaboradores',
    CABECALHO_ADMISSAO: 'ADMISSAO_RM',
    CABECALHO_DE_CONTROLE: 'SaRHa - Controle',
    DIAS_MIN: 30,
    DIAS_MAX: 35,
    HORARIO_DISPARO: 10,
}

function enviarAdmissoes() {
    const ssOrigem = SpreadsheetApp.openById(CONFIG_BUSCA.ORIG_PLANILHA_ID)
    const abaOrigem = ssOrigem.getSheetByName(CONFIG_BUSCA.ORIG_NOME_ABA)

    if(!abaOrigem) {
        Logger.log(`Aba ${CONFIG_BUSCA.ORIG_NOME_ABA} não encontrada na planilha de origem.`)
        return;
    }

    const ssDestino = SpreadsheetApp.getActiveSpreadsheet()
    const abaDestino = ssDestino.getSheetByName(CONFIG_BUSCA.NOME_PLANILHA)

    if(!abaDestino) {
        Logger.log(`Aba ${CONFIG_BUSCA.NOME_PLANILHA} não encontrada na planilha de destino.`)
        return;
    }

    const dadosOrigem = abaOrigem.getDataRange().getValues();
    const cabecalhoOrigem = dadosOrigem[0];
    const cabecalhoDestino = abaDestino.getRange(1, 1, 1, abaDestino.getLastColumn()).getValues()[0];

    const indexAdmissaoOrigem = cabecalhoOrigem.indexOf(CONFIG_BUSCA.CABECALHO_ADMISSAO);
    if (indexAdmissaoOrigem === -1) {
        Logger.log(`Coluna ${CONFIG_BUSCA.CABECALHO_ADMISSAO} não encontrada na aba de origem.`)
        return;
    }

    let indexDeControleDestino = cabecalhoDestino.indexOf(CONFIG_BUSCA.CABECALHO_DE_CONTROLE); // fix 1: const → let
    if (indexDeControleDestino === -1) {
        indexDeControleDestino = cabecalhoDestino.length;
        abaDestino.getRange(1, indexDeControleDestino + 1).setValue(CONFIG_BUSCA.CABECALHO_DE_CONTROLE); // fix 2: abaOrigem → abaDestino
        return;
    }

    const hoje = zerarHora_(new Date());
    const linhasParaEnviar = [];
    const linhasParaAtualizar = [];

    for (let i = 1; i < dadosOrigem.length; i++) {
        const linha = dadosOrigem[i];
        if (linha[indexDeControleDestino]) continue;

        const dataAdmissao = parseDate_(linha[indexAdmissaoOrigem]); // fix 8: parseData → parseDate_
        if (!dataAdmissao) continue;

        const diasAdmissao = Math.floor((hoje - zerarHora_(dataAdmissao)) / 86400000); // fix 3: zerarHora → zerarHora_
        if (diasAdmissao < CONFIG_BUSCA.DIAS_MIN || diasAdmissao > CONFIG_BUSCA.DIAS_MAX) continue; // fix 4: lógica invertida

        const linhaParaDestino = cabecalhoDestino.map((header) => {
            const indexOrigem = cabecalhoOrigem.indexOf(header);
            return indexOrigem === -1 ? '' : linha[indexOrigem];
        });

        linhasParaEnviar.push(linhaParaDestino);
        linhasParaAtualizar.push(i + 1);
    }

    if (linhasParaEnviar.length === 0) {
        Logger.log('Nenhuma linha para enviar.');
        return;
    }
    abaDestino.getRange(abaDestino.getLastRow() + 1, 1, linhasParaEnviar.length, cabecalhoDestino.length).setValues(linhasParaEnviar);

    linhasParaAtualizar.forEach((linha) => abaOrigem.getRange(linha, indexDeControleDestino + 1).setValue('TRUE')); // fix 5: linhasParaMarcar → linhasParaAtualizar

    Logger.log(`Enviadas ${linhasParaEnviar.length} linhas para a aba de destino.`);
}

function zerarHora_(data) {
    const novaData = new Date(data.getFullYear(), data.getMonth(), data.getDate()); // fix 6: getfullYear → getFullYear
    return novaData; // fix 7: faltava return
}

function parseDate_(valor) { // fix 8: parseData → parseDate_
    if (valor instanceof Date) return valor;
    if (typeof valor === 'string' && valor.trim() !== '') {
        const data = new Date(valor);
        if (!isNaN(data.getTime())) return data;
    }
    return null;
}
