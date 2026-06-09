# Bot SaRHa — Pesquisa de Experiência 30 Dias

Bot de WhatsApp que conduz a pesquisa de experiência com colaboradores ao completarem 30 dias no GRUPO GR. A persona do bot é a **SaRHa**, especialista de RH.

## Stack

| Componente | Papel |
|---|---|
| **Chatvolt** | Agente LLM que conversa com o colaborador via WhatsApp |
| **Meta Cloud API** | WhatsApp Business (número dedicado) |
| **Google Apps Script** | Backend com as tools chamadas pelo Chatvolt |
| **Google Sheets** | Armazenamento das respostas e dados dos colaboradores |
| **clasp** | Desenvolvimento local do Apps Script |

## Como funciona

1. Colaborador recebe mensagem automática ao completar 30 dias (via `Disparador.gs`)
2. Chatvolt chama as tools do Apps Script via HTTP GET
3. O backend monta a mensagem completa e devolve em `mensagem_para_enviar`
4. Chatvolt apenas repassa — nunca improvisa ou encadeia chamadas

## Arquivos

```
Código.js       — backend principal (tools + helpers + CONFIG)
Disparador.js   — disparo automático diário (não alterar junto com as tools)
appsscript.json — manifesto do Apps Script
.clasp.json     — configuração do clasp (contém scriptId do projeto)
```

## Setup local com clasp

### Pré-requisitos

- Node.js instalado
- `npm install -g @google/clasp`
- Conta Google com acesso ao projeto

### Primeiros passos

```bash
# autenticar
clasp login

# clonar o projeto (já configurado no .clasp.json)
clasp clone

# enviar alterações locais pro Apps Script
clasp push

# abrir no editor online
clasp open
```

### Propriedades do script (segredos)

A API key **não fica no código**. Cadastre manualmente no painel do Apps Script:

> Configurações do projeto → Propriedades do script → Adicionar propriedade

| Nome | Valor |
|---|---|
| `API_KEY` | sua chave real |

## Estrutura das perguntas

São 8 perguntas no total:
- **P1–P7:** Sim/Não (com reações específicas por resposta)
- **P8:** aberta, aceita texto ou áudio (Chatvolt entrega transcrição)

## Notas

- `Logger.log` é usado no lugar de `console.log` (padrão Apps Script)
- Helpers privados terminam com underscore: `normalizarSimNao_`, `montarMensagem_`, etc.
- API key passada como query param: `?key=...` (formato que o Chatvolt usa)
