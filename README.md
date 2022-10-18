# Verbos HTTP

## Verbos HTTP - Definem o que está sendo feito pela API

* GET - Recupera dados do servidor
* POST - Enviar informações ao servidor (Usado para criar algo novo)
* PUT - Edita todas as infors de um dado
* PATCH - Edita informações parciais de um dado
* DELETE - Deleta o dado específico

* POST - localhost:3000/login/ (Exemplo de algo que não é criado, mas se usa verbo HTTP por segurança)

### Modo de criar rotas na API
* GET - localhost:3000/product/
* GET - localhost:3000/product/1
* POST - localhost:3000/product/
* PUT - localhost:3000/product/1
* PATCH - localhost:3000/product/1
* DELETE - localhost:3000/product/1

### Modo de criar rotas em uma aplicação HTTP Request
* GET - localhost:3000/get-products/
* GET - localhost:3000/get-product/1
* POST - localhost:3000/create-product/
* POST - localhost:3000/edit-total-product/1
* POST - localhost:3000/edit-partial-product/1
* POST - localhost:3000/delete-product/1