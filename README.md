<div align="center">
  <img src=".\web\src\assets\images\logo.png" height="100px" alt="Be the hero"/>
</div>

<div align="center">

  # Teste Técnico Stefanini (Front-End React JR).
  Trata-se de uma aplicação que permite cadastrar usuários, perfis e funcionalidades para delimitar acessos para uma outra aplicação


  ![](https://img.shields.io/badge/autor-Maykon%20Sousa-brightgreen)
  ![](https://img.shields.io/badge/Language-Typescript-brightgreen)
  ![](https://img.shields.io/badge/Back--End-NodeJS-brightgreen)
  ![](https://img.shields.io/badge/Front--End-ReactJS-brightgreen)
  
</div> 

## Alguns recursos utilizados

- **Json Web Token** — recurso de autenticação que gera um token único a cada vez que o usuário faz login
- **SQLite** — banco de dados relacional 
- **Express** — Framework NodeJS
- **Styled Components** - Recurso de estilização css utilizando javascritpt 


## Iniciando

1. Clone este  reposítório usando `git clone https://github.com/maykonsousa/stefanini.git`
2. acesse a pasta do projeto via terminal com o comando: `cd stefanini`<br />



## Iniciando o Backend

1. Acesse a pasta do backend no terminal: `cd backend`
2. Utilize o comando  `yarn` para instalar todas as dependências necessárias<br />
3. Utilize o comando  `yarn dev:server` para iniciar o servidor

## Iniciando a plataforma Web

1. Em uma nova aba do terminal, acesse a pasta frontend: `cd web`
2. Utilize o comando  `yarn` para instalar as dependẽncias<br />
3. Utilize o comando `yarn start` para iniciar a aplicação no seu navegador

## Logando na aplicação:
O login pode ser feito usando os dados de email `admin@stafanini.com` e a senha `123456`, ou pode-se clicar em `Registrar ` e criar um novo usuário

## Sobre do cadastro
Um novo cadastro pode ser criado tanto pelo prório usuário na tela de registro quanto por outro usuário administrador no Dashboard com algumas ressalvas.

Usuário cadastrado direto na página de registro, pode informar os dados de nome, email e senha, e o seu perfil de usuário será automaticamente salvo como `Usuário`

Já um usuário cadastrado por um outro usuário logado, deverá informar Nome, email e perfil de usuário. Quanto a senha, será salva automaticamente com a sequência numérica `123456` que poderá ser alterada posteriormente pelo próprio usuário, quando este se logar na aplicação.

## Funcionalidades

1. O dashboard só é acessivel por um usuário autenticado
2. O usuário autenticado pode criar, atualizar ou deletar funcionalidades
3. O usuário autenticado pode criar, atualizar ou deletar Perfis de usuários 
3. O usuário autenticado pode criar, atualizar ou deletar outros usuários
4. O token de login, assim como dados de usuário são salvos no localStorage e se token existir, o usuário já é direcionado para o dashbord, mesmo fechando e reabrindo o navegagor
5. No topo da aplicação existe um botão de logout que elimina as informações do localStorage, e direciona o usuário para tela de login



***



## CONTATOS
**website**:[http://maykonsousa.github.io](http://maykonsousa.github.io/)  
**LinkedIn**: [https://www.linkedin.com/in/maykonsousa](https://www.linkedin.com/in/maykonsousa/)  
**Whatsapp**: 61 992943297
