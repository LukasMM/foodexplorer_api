### Food Explorer - Api

## Tecnologia utilizada
 - Node.js
 - SQLite
 - JavaScript
 - Git e Github
 - JWT

## Projeto descrição

Backend do desafio final dado pela Rocketseat para conclusão do curso FullStack

O Projeto desenvolvido de ponta a ponta se baseia em um cardápio online de um restaurante onde o admin, organiza o cardápio, adicionando pratos, excluindo e editando-os. Já a parte do cliente visualizar o prato com os detalhes do mesmo.

## Tabela utilizada

são 3 tabelas: Usuário, Prato e Ingrediente.

users (Usuário): id, name, email, password, admin, created_at e updated_at

dishes (Prato): id, user_id, name, img, type, price, description, created_at e updated_at

ingredients (Ingrediente): id, dish_id, created_at e updated_at

## Links da api

'/users': <br />
  post.'/users': criação do usuário enviando - name, email, password

'/sessions': <br />
  post.'/sessions': autenticidade do usuário identificado, informando - email, password

'/dishes' <br />
  get.'/dishes?search=': busca todos os pratos criados ou todos os pratos e ingrediente informado pelo search <br />
  get.'/dishes/:id': busca os detalhes do prato informado pelo id <br />
  post.'/dishes': Criação do prato informando - name, type, price, description, ingredients <br />
  put.'/dishes/:id': Edição do prato informado pelo id - name, type, price, description, ingredients <br />
  delete.'/dishes/:id': Deleta o prato informado <br />
  patch.'/dishes/:id': Insere a imagem no prato informado

## Instalação do Projeto

`https://github.com/LukasMM/foodexplorer_api.git` <br />
or <br />
`git@github.com:LukasMM/foodexplorer_api.git` <br />
or <br />
`gh repo clone LukasMM/foodexplorer_api`

Acesse a pasta <br />
`cd foodexplorer_api`

instale e execute com os comandos <br />
`npm install` <br />
`npm run dev` <br />

usuários já pre-definidos <br />
`Client:` - `user - teste@gmail.com` - `password: 123` <br />
`ADMIN: ` - `user - teste@admin.com` - `password: 123`

Link utilizado no Deploy - https://foodexplorer-api-p3ph.onrender.com

Backend desenvolvido por Lucas Mazini Martins <br />
Layout desenvolvido por [Rocketseat](https://www.rocketseat.com.br/)