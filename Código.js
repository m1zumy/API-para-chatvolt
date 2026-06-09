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
    RE_VALIDADO: 8,
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
        reacaoAberta: 'Obrigado pela participação! Suas respostas são fundamentais para oferecermos a melhor experiência de desenvolvimento aos nossos colaboradores\n\n' + 
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
    CONTINUAR: 'Oi de novo {primeiroNome}! Aqui é a sarha novamente, Vamos continuar de onde paramos? 😊', // Continuação caso pare de responder
  },

}

