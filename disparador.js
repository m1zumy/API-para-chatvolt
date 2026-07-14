function enviarTemplateWhatsApp_(telefone, nomeTemplate, nomeColaborador) {
    const url = 'https://graph.facebook.com/v25.0/' + CONFIG.META_PHONE_NUMBER_ID + '/messages';
    const template = {
        name: nomeTemplate,
        language: { code: CONFIG.META_TEMPLATE_LANGUAGE }
    };
    if (nomeColaborador) {
        template.components = [{
            type: 'body',
            parameters: [{ type: 'text', text: nomeColaborador}]
        }]
    }
    const payload = {
        messaging_product: 'whatsapp',
        to: telefone,
        type: 'template',
        template: template
    };
    const options = {
        method: 'post',
        contentType: 'application/json',
        headers: { Authorization: 'Bearer ' + CONFIG.META_TOKEN },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };
    const resposta = UrlFetchApp.fetch(url, options);
    const codigo = resposta.getResponseCode();
    Logger.log('Disparo (' + nomeTemplate + ') para ' + telefone + ' - HTTP ' + codigo);
    if (codigo !== 200) {
      Logger.log('Resposta de erro da Meta: ' + resposta.getContentText());
    }
    return codigo === 200;
}

function buscarLinhaRespostaParaDisparo_(dadosResp, cpfNormalizado) {
        for(let i = CONFIG.LINHA_CABECALHO; i < dadosResp.length; i++) {
            const cpfLinha = normalizarCPF_(String(dadosResp[i][CONFIG.COL_RESPOSTAS.CPF - 1] || ''));
            const status = String(dadosResp[i][CONFIG.COL_RESPOSTAS.STATUS - 1] || '').trim().toUpperCase();
            if(cpfLinha === cpfNormalizado && status === CONFIG.STATUS_RESPOSTA.INICIADA) {
                return {
                linha: i + 1,
                cpfValidado: dadosResp[i][CONFIG.COL_RESPOSTAS.CPF_VALIDADO - 1] === true,
                disparos: Number(dadosResp[i][CONFIG.COL_RESPOSTAS.DISPAROS - 1] || 0),
                dataDisparo: dadosResp[i][CONFIG.COL_RESPOSTAS.DATA_DISPARO - 1] || null,
                dados: dadosResp[i],
            }
        }
        }
        return null;
}

function registrarDisparo_(abaResp, linhaResp, novoColab) {
    if (linhaResp) {
        abaResp.getRange(linhaResp.linha, CONFIG.COL_RESPOSTAS.DISPAROS).setValue(linhaResp.disparos + 1)
        abaResp.getRange(linhaResp.linha, CONFIG.COL_RESPOSTAS.DATA_DISPARO) .setValue(new Date())
    }
    else {
        const nova = new Array (23).fill ('');
        nova[CONFIG.COL_RESPOSTAS.DATA - 1] = new Date()
        nova[CONFIG.COL_RESPOSTAS.CPF - 1] = novoColab.cpf;
        nova[CONFIG.COL_RESPOSTAS.NOME - 1] = novoColab.nome
        nova[CONFIG.COL_RESPOSTAS.TELEFONE - 1] = novoColab.telefone
        nova[CONFIG.COL_RESPOSTAS.FUNCAO - 1] = novoColab.funcao
        nova[CONFIG.COL_RESPOSTAS.STATUS - 1] = CONFIG.STATUS_RESPOSTA.INICIADA
        nova[CONFIG.COL_RESPOSTAS.TENTATIVA - 1] = 1;
        nova[CONFIG.COL_RESPOSTAS.CPF_VALIDADO - 1] = false;
        nova[CONFIG.COL_RESPOSTAS.DISPAROS - 1] = 1;
        nova[CONFIG.COL_RESPOSTAS.DATA_DISPARO - 1] = new Date();
        abaResp.appendRow(nova)
    }
}

function dispararPesquisas() {
    const abaColab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_COLABORADORES)
    const abaResp = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS)
    if (!abaColab || !abaResp) return;

    const dadosColab = abaColab.getDataRange().getValues();
    const dadosResp = abaResp.getDataRange().getValues();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    for(let i = CONFIG.LINHA_CABECALHO; i < dadosColab.length; i++) {
        const linha = dadosColab[i];
        const statusColab = String(linha[CONFIG.COL_COLABORADORES.STATUS - 1] || '').trim().toUpperCase()

        if (statusColab == CONFIG.STATUS_COLAB.COMPLETA || statusColab === CONFIG.STATUS_COLAB.EXPIRADA) continue

        const admissao = linha[CONFIG.COL_COLABORADORES.ADMISSAO - 1]
        const telefone = normalizarTelefone_(String(linha[CONFIG.COL_COLABORADORES.TELEFONE -1] || ''))
        if (!admissao || !telefone) continue

        const dataAdmissao = new Date(admissao);
        dataAdmissao.setHours( 0, 0, 0, 0);
        const diasDeEmpresa = Math.round((hoje - dataAdmissao) / (1000 * 60 *60 * 24));
        const cpf = normalizarCPF_(String(linha[CONFIG.COL_COLABORADORES.CPF - 1] || ''))
        const linhaResp = buscarLinhaRespostaParaDisparo_(dadosResp, cpf)

        // 1 disparo dia 30 para quem nunca mandou nenhuma mensagem

        if (diasDeEmpresa >= 30 && diasDeEmpresa <= 35 && !statusColab) {
            const enviou = enviarTemplateWhatsApp_(telefone, CONFIG.META_TEMPLATE_NAME, null)
            if (enviou) {
                registrarDisparo_(abaResp, null, {
                    cpf,
                    nome: linha[CONFIG.COL_COLABORADORES.NOME - 1],
                    telefone,
                    funcao: linha[CONFIG.COL_COLABORADORES.FUNCAO - 1]
                });
                abaColab.getRange(i + 1, CONFIG.COL_COLABORADORES.STATUS).setValue(CONFIG.STATUS_COLAB.CONVIDADO)
            }
            continue;
        }

        // re disparo 2 ou expiraçaõ

        if (statusColab === CONFIG.STATUS_COLAB.CONVIDADO && linhaResp && !linhaResp.cpfValidado) {
            if (linhaResp.disparos >= 3) {
                abaResp.getRange(linhaResp.linha, CONFIG.COL_RESPOSTAS.STATUS).setValue(CONFIG.STATUS_RESPOSTA.EXPIRADA);
                abaColab.getRange(i + 1, CONFIG.COL_COLABORADORES.STATUS).setValue(CONFIG.STATUS_COLAB.EXPIRADA)
                continue
            }
              const dataUltimo = linhaResp.dataDisparo ? new Date(linhaResp.dataDisparo) : null;
      if (dataUltimo) dataUltimo.setHours(0, 0, 0, 0);
      const diasDesdeUltimo = dataUltimo ? Math.round((hoje - dataUltimo) / (1000 * 60 * 60 * 24)) : 999;

      if (diasDesdeUltimo >= 1) {
        const nomeTemplate = linhaResp.disparos === 1 ? CONFIG.META_TEMPLATE_NAME_REFORCO1 : CONFIG.META_TEMPLATE_NAME_REFORCO2
        const primeiroNome = extrairPrimeiroNome_(linha[CONFIG.COL_COLABORADORES.NOME - 1])
        const enviou = enviarTemplateWhatsApp_(telefone, nomeTemplate, primeiroNome);
        if (enviou) registrarDisparo_(abaResp, linhaResp, null);
      }
        }
        // travou em alguma pergunta depois de validar o CPF: reforça e, se continuar sem resposta,
        // marca como completo (travou na P8) ou incompleto (travou antes da P8)
if (linhaResp && linhaResp.cpfValidado) {
    const proximaPergunta = identificarProximaPergunta_({ dados: linhaResp.dados });
    if (proximaPergunta) {
        const statusFinal = proximaPergunta.numero === 8 ? CONFIG.STATUS_RESPOSTA.COMPLETA : CONFIG.STATUS_RESPOSTA.INCOMPLETA;

        if (linhaResp.disparos >= 3) {
            abaResp.getRange(linhaResp.linha, CONFIG.COL_RESPOSTAS.STATUS).setValue(statusFinal);
            if (statusFinal === CONFIG.STATUS_RESPOSTA.COMPLETA) {
                abaColab.getRange(i + 1, CONFIG.COL_COLABORADORES.STATUS).setValue(CONFIG.STATUS_COLAB.COMPLETA)
            }
            continue
        }
        const dataUltimo = linhaResp.dataDisparo ? new Date(linhaResp.dataDisparo) : null;
        if (dataUltimo) dataUltimo.setHours(0, 0, 0, 0);
        const diasDesdeUltimo = dataUltimo ? Math.round((hoje - dataUltimo) / (1000 * 60 * 60 * 24)) : 999;

        if (diasDesdeUltimo >= 1) {
            const nomeTemplate = linhaResp.disparos === 1 ? CONFIG.META_TEMPLATE_NAME_REFORCO1 : CONFIG.META_TEMPLATE_NAME_REFORCO2
            const primeiroNome = extrairPrimeiroNome_(linha[CONFIG.COL_COLABORADORES.NOME - 1])
            const enviou = enviarTemplateWhatsApp_(telefone, nomeTemplate, primeiroNome);
            if (enviou) registrarDisparo_(abaResp, linhaResp, null);
        }
    }
}

    }
}