const CONFIG = {
  ABA_COLABORADORES: 'Colaboradores',
  ABA_RESPOSTAS: 'Respostas',
  LINHA_CABECALHO: 1,
  API_KEY: PropertiesService.getScriptProperties().getProperty('API_KEY'),

  COL_COLABORADORES: {

    CPF: 1,
    NOME: 4,
    TELEFONE: 7,
    ADMISSAO: 8,
    FUNCAO: 11,
    STATUS: 45

  },

  COL_RESPOSTAS: {
    DATA: 1,
    CPF: 2,
    NOME: 3,
    TELEFONE: 4,
    FUNCAO: 5,
    STATUS: 6,
    TENTATIVA: 7,
    CPF_VALIDADO: 8,
    RESP_1: 9,
    RESP_2: 10,
    RESP_3: 11,
    RESP_4: 12,
    RESP_5: 13,
    RESP_6: 14,
    RESP_7: 15,
    RESP_8: 16,
    OBS: 17,
  },
  STATUS_COLAB: { 
    CONVIDADO: 'CONVIDADO',
    INICIADA: 'INICIADA',
    COMPLETA: 'COMPLETA',
    RECUSADA: 'RECUSADA',
    EXPIRADA: 'EXPIRADA',
    },
    STATUS_RESPOSTA: {
      INICIADA: 'INICIADA',
      COMPLETA: 'COMPLETA',
    },
    PERGUNTAS: {
      1: {
        numero: 1,
        tipo: 'sim_nao',
        col: 9,
        texto: 'Vamos começar pelo posto de trabalho. Você está satisfeito em seu posto atual?\n\n' +
        '1- Sim, estou satisfeito\n' +
        '2- Não, não estou satisfeito',
        reacaoSim: 'Obrigado pela resposta',
        reacaoNao: 'Que pena que você não está gostando do seu posto atual😔, Jaja você me conta mais sobre essa questão...'
      },
      2: {
        numero: 2,
        tipo: 'sim_nao',
        col: 10,
        texto: 'Agora quero saber como está o deslocamento diário até o trabalho. Você está satisfeito com o deslocamento até o seu local de trabalho?\n\n' +
        '1- Sim\n' +
        '2- Não',
        reacaoSim: 'Que bom!',
        reacaoNao: 'Entendo. O ideal é ter equilíbrio entre distância e deslocamento até o posto de trabalho. Jajá vamos falar mais sobre isso...'
      },
      3: {
        numero: 3,
        tipo: 'sim_nao',
        col: 11,
        texto: 'Sobre a escala e os horários do posto, conseguiu se adaptar?\n\n' +
        '1- Sim\n' +
        '2- Não',
        reacaoSim: 'Obrigado pela resposta!',
        reacaoNao: 'Obrigado por compartilhar. Jajá você me conta mais sobre esse ponto...'
      },
      4: {
        numero: 4,
        tipo: 'sim_nao',
        col: 12,
        texto: 'E em relação à carga diária de trabalho, é compatível com o tempo disponível para a execução das atividades?\n\n' +
        '1- Sim\n' +
        '2- Não',
        reacaoSim: 'Obrigado pela resposta!',
        reacaoNao: '🤔 No final de nosso papo, você me conta mais sobre esse ponto...'
    },
      5: {
        numero: 5,
        tipo: 'sim_nao',
        col: 13,
        texto: 'Agora, me conta sobre uma questão muito importante! Sua liderança imediata, oferece apoio e suporte adequados no seu dia a dia de trabalho?\n\n' +
        '1- Sim\n' +
        '2- Não',
        reacaoSim: 'Que bom que tudo está caminhando bem com seu líder!',
        reacaoNao: 'Sinto muito por sua experiência. Aqui na GR, valorizamos muito as relações. No final do nosso papo, você me conta mais sobre esse ponto...'
      },
      6: {
        numero: 6,
        tipo: 'sim_nao',
        col: 14,
        texto: 'E quanto aos benefícios, estão atendendo suas necessidades básicas (exemplo: transporte e alimentação)??\n\n' +
        '1- Sim\n' +
        '2- Não',
        reacaoSim: 'Perfeito!',
        reacaoNao: 'Entendi. Vamos entender melhor essa questão no final de nossa conversa' 
  },
      7: {
        numero: 7,
        tipo: 'sim_nao',
        col: 15,
        texto: 'Depois de conhecer mais sobre a GR, você entende que pode crescer e continuar na empresa?\n\n' +
        '1- Sim\n' +
        '2- Não',
        reacaoSim: 'Que boa notícia! Na GR, queremos construir um ambiente em que as pessoas possam evoluir sempre!',
        reacaoNao: 'Poxa, essa não é a experiência que desejamos aos nossos colaboradores.'
      },
      8: {
        numero: 8,
        tipo: 'aberta',
        col: 16,
        texto: 'Para encerrar nossa conversa, poderia me dar mais detalhes de alguma questão sobre sua experiência, especialmente os pontos que não estão bem? Você pode enviar um áudio ou enviar por texto',
        reacaoAberta: 'Obrigado pela participação! Suas respostas são fundamentais para oferecermos a melhor experiência de desenvolvimento aos nossos colaboradores.  \n\n' + 
        'Ah… se quiser, falar mais sobre o tema, procure pelo de time de Recursos Humanos\n\n' + 
        'Por último, reforço que suas resposta são confidenciais e serão tratadas de forma consolidada com o objetivo específico de gerar sugestões para melhorarmos a experiência de nossos colaboradores\n' + 
        'Obrigada e um abraço!'
      },
  },
  MENSAGENS: {
    INTRO_COM_CPF: 'Para garantir a confidencialidade das suas respostas, preciso primeiro confirmar sua identidade. Poderia me informar seu CPF?', 
    CPF_INVALIDO: 'Hmm, esse CPF não bateu com o que tenho aqui 🤔 Pode conferir e me enviar novamente?', //cof invalido na validação
    CPF_CONFIRMADO: 'Ótimo, {primeiroNome}, vamos começar nossa conversa! 😊', //cpf confirmado da validação
    RESPOSTA_INVALIDA_SIM_NAO: 'Ops, não entendi sua resposta. Pode responder apenas com sim ou não? 😊', //caso o usuario responda algo alem de sim ou nao
    CONTINUAR: 'Oi de novo {primeiroNome}! Aqui é a sarha novamente, Vamos continuar de onde paramos? 😊\n\n {proximaPergunta}', // Continuação caso pare de responder
    NAO_LOCALIZADO: 'Poxa, não consegui localizar seu CPF na minha base de dados. Você pode conferir e me enviar novamente?', //cpf nao localizado na validação
    JA_RESPONDEU: 'Você já respondeu esse questionario. Muito obrigado!', // Resposta para quando o colaborador responde a pergunta
  },

}

//helper para normalizar respostas de sim ou não, considerando variações comuns e acentos

function normalizarSimNao_(resposta) {
  if (resposta === null || resposta === undefined) return resposta;
  let s = String(resposta)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // o LLM as vezes duplica a resposta (ex: "1 1", "sim sim") -> reduz pra uma palavra so
  const partes = s.split(/\s+/);
  if (partes.length > 1 && partes.every(p => p === partes[0])) {
    s = partes[0];
  }

    if (['sim', 's', '1', 'yes', 'y', 'si'].includes(s)) return '1';
    if (['nao', 'não', 'n', '2', 'no', 'na'].includes(s)) return '0';
    return null;
}

 //helper para extrair o primeiro nome do colaborador a partir do nome completo(2)    

 function extrairPrimeiroNome_(nomeCompleto) {
  if(!nomeCompleto) return '';
  return String(nomeCompleto).trim().split(/\s+/)[0];
 }

 //helper para aplicar o template de mensagem, substituindo as chaves pelos valores correspondentes do objeto de dados(3)

 function aplicarTemplate_(template, valores) {
  let out = String(template || '');
  Object.keys(valores || {}).forEach(k => {
    out = out.split ('{' + k + '}').join(valores[k] || '');
  })
  return out;
 }

// helper montaer a mensagem de continuacao depois de responder sim ou nao, buscando a proxima pergunta com base no numero da pergunta atual(4)

function montarMensagem_(reacao, ProximoNumero) {
  const proxima = CONFIG.PERGUNTAS[ProximoNumero];
  if (!proxima) return reacao || '';
  if (!reacao) return proxima.texto;
  return reacao + '\n' + proxima.texto; 
}

// jsonResponse

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data, null, 2))
  .setMimeType(ContentService.MimeType.JSON);
}

function normalizarTelefone_(numero) {
  if (!numero) return null;
  let limpo = String(numero).replace(/\D/g, '');

  if (limpo.length === 13 && limpo.startsWith('55')) return limpo; // já tem código do país
  if (limpo.length === 12 && limpo.startsWith('55')) return limpo; // já tem código do país, mas falta um dígito
  if (limpo.length === 11) return  '55' +limpo; // tem código do país e o número completo
  if (limpo.length === 10) {
    const numero8 = limpo.substring(2);
    if (['6', '7', '8', '9'].includes(numero8.charAt(0))) {
      return '55' + limpo.substring(0, 2) + '9' + limpo.substring(2); // adicionar código do país
    }
    return '55' + limpo; // adicionar código do país
  }
  return null;
}

function normalizarCPF_(cpf) { 
  if (!cpf) return '';
  return String(cpf).replace(/\D/g, '').substring(0, 11);
}


function buscarColaboradorPorTelefone_(telefoneNormalizado) {
    const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_COLABORADORES);
    if (!aba) return null;

    const dados = aba.getDataRange().getValues();

    for (let i = CONFIG.LINHA_CABECALHO; i < dados.length; i++) {
      const linha = dados[i];
      const telLinha = normalizarTelefone_(linha[CONFIG.COL_COLABORADORES.TELEFONE - 1]);

      if (telLinha && telLinha === telefoneNormalizado) {
        return {
          cpf: normalizarCPF_(linha[CONFIG.COL_COLABORADORES.CPF - 1] || ''),
          nome: linha[CONFIG.COL_COLABORADORES.NOME - 1] || '',
          telefone: telefoneNormalizado,
          funcao: linha[CONFIG.COL_COLABORADORES.FUNCAO - 1] || '',
        };
      }
    }
    
    return null;
}

function lerAbaRespostas_() {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS);
  if (!aba) return [];

  const dados = aba.getDataRange().getValues();
  const lista = [];

  for (let i = CONFIG.LINHA_CABECALHO; i < dados.length; i++) {
    lista.push({
      linha: i + 1,
      cpf: dados[i][CONFIG.COL_RESPOSTAS.CPF - 1],
      status: String(dados[i][CONFIG.COL_RESPOSTAS.STATUS - 1] || '').trim().toUpperCase(),
      tentativa: dados[i][CONFIG.COL_RESPOSTAS.TENTATIVA - 1],
      cpfValidado: dados[i][CONFIG.COL_RESPOSTAS.CPF_VALIDADO - 1] === true,
      dados: dados[i]
    });
  }

  return lista;
}

// helper que recebe uma linha da aba Respostas e descobre qual é a próxima
// pergunta sem resposta, percorrendo P1 a P8 na ordem e olhando a coluna
// correspondente (RESP_1...RESP_8) de cada uma
function identificarProximaPergunta_(linhaResposta) {
  const dados = linhaResposta.dados;

  for (let num = 1; num <= 8; num++) {
    const col = CONFIG.PERGUNTAS[num].col;
    if (!dados[col - 1]) {
      return CONFIG.PERGUNTAS[num]; // achou a primeira pergunta sem resposta
    }
  }

  return null; // todas as 8 perguntas já foram respondidas
}

// cria uma nova linha na aba Respostas pra um colaborador que está
// começando a pesquisa agora (status iniciada, CPF ainda não validado)
function criarNovaPesquisa_(colaborador, tentativa) {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS);
  if (!aba) throw new Error('Aba Respostas não encontrada');

  const novaLinha = new Array(17).fill('');
  novaLinha[CONFIG.COL_RESPOSTAS.DATA - 1] = new Date();
  novaLinha[CONFIG.COL_RESPOSTAS.CPF - 1] = colaborador.cpf;
  novaLinha[CONFIG.COL_RESPOSTAS.NOME - 1] = colaborador.nome;
  novaLinha[CONFIG.COL_RESPOSTAS.TELEFONE - 1] = colaborador.telefone;
  novaLinha[CONFIG.COL_RESPOSTAS.FUNCAO - 1] = colaborador.funcao;
  novaLinha[CONFIG.COL_RESPOSTAS.STATUS - 1] = CONFIG.STATUS_RESPOSTA.INICIADA;
  novaLinha[CONFIG.COL_RESPOSTAS.TENTATIVA - 1] = tentativa;
  novaLinha[CONFIG.COL_RESPOSTAS.CPF_VALIDADO - 1] = false;

  aba.appendRow(novaLinha);
}
// -------------------------------------------------------------------------
// TOOL — primeiro contato: acha o colaborador pelo telefone e decide o que
// responder (não localizado / já respondeu / continuar de onde parou / pedir CPF)
function identificarColaborador(telefone) {
  if (!telefone) return jsonResponse({ sucesso: false, erro: 'Parâmetro "telefone" obrigatório' });

  const telefoneNormalizado = normalizarTelefone_(telefone);
  if (!telefoneNormalizado) return jsonResponse({ sucesso: false, erro: 'Telefone em formato inválido', telefone_recebido: telefone });

  const colaborador = buscarColaboradorPorTelefone_(telefoneNormalizado);
  if (!colaborador) {
    return jsonResponse({
      sucesso: true,
      encontrado: false,
      mensagem_para_enviar: CONFIG.MENSAGENS.NAO_LOCALIZADO
    });
  }

  const cpfColaborador = normalizarCPF_(colaborador.cpf);
  const respostas = lerAbaRespostas_();
  const linhasDoColaborador = respostas.filter(r => normalizarCPF_(r.cpf) === cpfColaborador);

  // já completou a pesquisa antes? não deixa responder de novo
  if (linhasDoColaborador.some(r => r.status === CONFIG.STATUS_RESPOSTA.COMPLETA)) {
    return jsonResponse({
      sucesso: true,
      encontrado: true,
      pesquisa_concluida: true,
      mensagem_para_enviar: CONFIG.MENSAGENS.JA_RESPONDEU
    });
  }

  const emAndamento = linhasDoColaborador.find(r => r.status === CONFIG.STATUS_RESPOSTA.INICIADA);

  // já validou o CPF antes e parou no meio -> retoma na próxima pergunta pendente
  if (emAndamento && emAndamento.cpfValidado) {
    const proxima = identificarProximaPergunta_(emAndamento);
    const mensagem = aplicarTemplate_(CONFIG.MENSAGENS.CONTINUAR, {
      primeiroNome: extrairPrimeiroNome_(colaborador.nome),
      proximaPergunta: proxima ? proxima.texto : ''
    });

    return jsonResponse({
      sucesso: true,
      encontrado: true,
      pesquisa_concluida: false,
      estado: 'continuar',
      mensagem_para_enviar: mensagem
    });
  }

  // não tem pesquisa em andamento ainda -> cria uma nova linha
  if (!emAndamento) {
    criarNovaPesquisa_(colaborador, linhasDoColaborador.length + 1);
  }

  // tem pesquisa (nova ou existente) mas o CPF ainda não foi validado -> pede o CPF
  return jsonResponse({
    sucesso: true,
    encontrado: true,
    pesquisa_concluida: false,
    estado: 'aguardando_cpf',
    mensagem_para_enviar: CONFIG.MENSAGENS.INTRO_COM_CPF
  });
}

function doGet(e) {
  Logger.log('Parâmetros recebidos: ' + JSON.stringify(e.parameter));
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS   ).getRange('S1').setValue(JSON.stringify(e.parameter));

  const apiKey = e.parameter.key;
  if (apiKey !== CONFIG.API_KEY) {
    return jsonResponse({ sucesso: false, erro: 'API key inválida' });
  }

  const acao = e.parameter.acao;

  switch (acao) {
    case 'identificar':
      return identificarColaborador(e.parameter.telefone);
    case 'validar_cpf':
      return validarCPF(e.parameter.telefone, e.parameter.cpf_digitado);
    case 'salvar_resposta':
      return salvarRespostaEAvancar(e.parameter.telefone, e.parameter.resposta);
    default:
      return jsonResponse({ sucesso: false, erro: 'Ação desconhecida: ' + acao });
  }
}


function marcarCpfValidado_(cpfNormalizado) {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS);
  const dados = aba.getDataRange().getValues();

  for (let i = CONFIG.LINHA_CABECALHO; i < dados.length; i++) {
      const cpfLinha = normalizarCPF_(dados[i][CONFIG.COL_RESPOSTAS.CPF - 1]);
      const status = String(dados[i][CONFIG.COL_RESPOSTAS.STATUS - 1] || '').trim().toUpperCase();

      if (cpfLinha === cpfNormalizado && status === CONFIG.STATUS_RESPOSTA.INICIADA) {
          aba.getRange(i + 1, CONFIG.COL_RESPOSTAS.CPF_VALIDADO).setValue(true);
          return true; // marcou como validado
      }
  }
}

function validarCPF(telefone, cpfDigitado) {
  if (!telefone || !cpfDigitado) {
    return jsonResponse({ sucesso: false, erro: 'Parâmetros "telefone" e "cpf_digitado" obrigatórios' });
  }


  const telefoneNormalizado = normalizarTelefone_(telefone);
  const colaborador = buscarColaboradorPorTelefone_(telefoneNormalizado);

  if (!colaborador) {
    return jsonResponse({
      sucesso: false,
      erro: 'Colaborador não encontrado para o telefone fornecido'
    });
  }

  const cpfDigitadoNormalizado = normalizarCPF_(cpfDigitado);
  const cpfCadastrado = normalizarCPF_(colaborador.cpf);

  if (cpfDigitadoNormalizado !== cpfCadastrado) {
    return jsonResponse({ 
      sucesso: true,
      validado: false,
      mensagem_para_enviar: CONFIG.MENSAGENS.CPF_INVALIDO
    });
  }

  if (cpfDigitadoNormalizado === cpfCadastrado) {
    marcarCpfValidado_(cpfCadastrado);
  }

  const reacao = aplicarTemplate_(CONFIG.MENSAGENS.CPF_CONFIRMADO, {
    primeiroNome: extrairPrimeiroNome_(colaborador.nome)
  });
  return jsonResponse({
    sucesso: true,
    validado: true,
    mensagem_para_enviar: montarMensagem_(reacao, 1)
  });
}

function testarSprint() {
  const TELEFONE_TESTE = '5511970133267'; 
  const CPF_CORRETO = '23879589852';
  const CPF_ERRADO = '00000000000';

  Logger.log('=== CPF errado (deve dar CPF_INVALIDO) ===');
  const r1 = validarCPF(TELEFONE_TESTE, CPF_ERRADO);
  Logger.log(r1.getContent());

  Logger.log('=== CPF correto (deve confirmar + mandar P1) ===');
  const r2 = validarCPF(TELEFONE_TESTE, CPF_CORRETO);
  Logger.log(r2.getContent());
}

function encontrarLinhaResposta_(cpfNormalizado) {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS);
  const dados = aba.getDataRange().getValues();

  for (let i = CONFIG.LINHA_CABECALHO; i < dados.length; i++) {
    const cpfLinha = normalizarCPF_(dados[i][CONFIG.COL_RESPOSTAS.CPF - 1]);
    const statusLinha = String(dados[i][CONFIG.COL_RESPOSTAS.STATUS - 1] || '').trim().toUpperCase();

    if (cpfLinha === cpfNormalizado && statusLinha === CONFIG.STATUS_RESPOSTA.INICIADA) {
      return { linha: i + 1, dados: dados[i] };
    }
  }
  return null;
}


function salvarValorResposta_(numeroLinha, coluna, valor) {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS);
  aba.getRange(numeroLinha, coluna).setValue(valor);
}

function marcarRespostaCompleta_(numeroLinha) {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESPOSTAS);
  aba.getRange(numeroLinha, CONFIG.COL_RESPOSTAS.STATUS).setValue(CONFIG.STATUS_RESPOSTA.COMPLETA);
}

function salvarRespostaEAvancar(telefone, resposta) {
  if (!telefone || resposta === undefined) {
    return jsonResponse({ sucesso: false, erro: 'Parâmetros "telefone" e "resposta" obrigatórios' });
  }

  const telefoneNormalizado = normalizarTelefone_(telefone);
  const colaborador = buscarColaboradorPorTelefone_(telefoneNormalizado);

  if (!colaborador) {
    return jsonResponse({
      sucesso: false,
      erro: 'Colaborador não encontrado para o telefone fornecido'
    });
  }

  const cpfNormalizado = normalizarCPF_(colaborador.cpf);
  const linhaResposta = encontrarLinhaResposta_(cpfNormalizado);

  if (!linhaResposta) {
    return jsonResponse({
      sucesso: false,
      erro: 'Linha de resposta não encontrada para o colaborador'
    });
  }

  const proxima = identificarProximaPergunta_(linhaResposta);
  if (!proxima) {
    return jsonResponse({
      sucesso: false,
      erro: 'Não há próxima pergunta para responder'
    });
  }

  if (proxima.tipo === 'sim_nao') {
    const respostaNormalizada = normalizarSimNao_(resposta);
    if (!respostaNormalizada) {
      return jsonResponse({
        sucesso: false,
        erro: 'Resposta inválida para pergunta do tipo sim/não'
      });
    }
    salvarValorResposta_(linhaResposta.linha, proxima.col, respostaNormalizada);

    const reacao = respostaNormalizada === '1' ? proxima.reacaoSim : proxima.reacaoNao;
    return jsonResponse({ sucesso: true, mensagem_para_enviar : montarMensagem_(reacao, proxima.numero + 1) });
  }

  salvarValorResposta_(linhaResposta.linha, proxima.col, resposta);
  marcarRespostaCompleta_(linhaResposta.linha)

  return jsonResponse({ sucesso: true, mensagem_para_enviar : proxima.reacaoAberta })
}