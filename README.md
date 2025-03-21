# BONDE - React + Next.js

Este repositório contém uma aplicação desenvolvida com React e Next.js.  
Para garantir o funcionamento correto, **é obrigatório utilizar as versões especificadas de ferramentas como pnpm e Node.js.**

---

## Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:

1. **Node.js**: Utilize a versão `14`.  
   Recomendamos o uso do [nvm](https://github.com/nvm-sh/nvm) para gerenciar as versões do Node.js.  
   Após instalar o nvm, você pode selecionar a versão correta com os comandos:
   ```bash
   nvm install 14
   nvm use 14
   ```

2. **pnpm**: Utilize a versão `7.33.7`.
   Caso não tenha o pnpm instalado ou precise de outra versão, instale ou altere com o comando:  
   ```bash
   npm install -g pnpm@7.33.7
   ```

---

## Instalação

Para instalar as dependências do projeto, execute:
```bash
pnpm i
```

**NOTE:** Confira `NODE_ENV=development` está configurado para resolver problemas com o build das libs.

---

## Comandos Disponíveis

### Build da Aplicação

Para realizar o build de toda a aplicação, execute os seguintes comandos:  
1. Build das bibliotecas:  
   ```bash
   pnpm --filter "./libs/**" m run build
   ```
2. Build do cliente da página web:  
   ```bash
   pnpm --filter "./packages/webpage-client" m run build
   ```

---

### Desenvolvimento

Para iniciar o ambiente de desenvolvimento, utilize o comando:
```bash
pnpm --filter webpage-client m run dev
```

**Variáveis de ambiente**
```
REACT_APP_DOMAIN_PUBLIC=
REACT_APP_DOMAIN_API_GRAPHQL=
REACT_APP_DOMAIN_API_REST=
REACT_APP_DOMAIN_IMAGINARY=
REACT_APP_PAGARME_KEY=
ACTION_SECRET_KEY=
```

---

## Estrutura do Projeto

- **`libs/`**: Contém as bibliotecas compartilhadas entre diferentes partes do projeto.
- **`packages/webpage-client`**: Diretório principal da aplicação Next.js.

---

## Observações

- Utilize apenas os comandos descritos neste README para evitar problemas de compatibilidade.
- Em caso de dúvidas ou problemas, verifique se está usando as versões corretas de pnpm e Node.js.
