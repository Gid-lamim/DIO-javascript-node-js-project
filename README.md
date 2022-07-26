# DIO-javascript-node-js-project
---
Este é um projeto desenvolvido durante algumas lives para dissiminação de conhecimento dentro da DIO, uma plataforma de cursos gratuíta que todo DEV deveria conhecer! 😉

Aplicando o Estilo Arquitetural REST com Node.js - Criando um projeto com API de CRUDE para usuários

foi usado como banco de dados o ElephantSQL. A partir de SQL e Express, foi criado um projeto q consegue visualizar , criar, deletar e modificar usuários

---
Composição do nosso projeto

Neste projeto Temos alguns Endpoints Base que podem ser extendidos da forma mais adequada para seu contexto.

São eles:
###Autenticação

    POST /token               --> cria um token com expiração de 10 minutos usando autenticação 'basic'.
    POST /token/validate      --> verifica se o token ainda é válido. e também verifica em quantos minutos ele irá expirar.
    

###Usuários (requer autenticação bearer com o token)

    GET /users                 --> obtém um lista com usuários
    GET /users/:uuid           --> encontra usuário por uuid
    POST /users                --> adiciona usuários 
    PUT /users/:uuid           --> modifica usuário
    DELETE /users/:uuid        --> deleta usuários


---
##instruções de autenticação
 
1 - para saber se está funcionando:
    use o método GET no end point  ./status

2 - se estiver ok, usando o basic auth, entre o username e password no end point ./token

3 - para saber se o token está válido, ese o Bearer auth no end point ./token/validate. isso mostrará se está álido e por quantos minutos.

4 - para utilizar o CRUD, deverá consumir os endpoints usando o Bearer auth com o toke válido

5 - para dar um refresh no token, refazer o passo 2.


## encontrar usuário pelo uuid (deverá estar autenticado)

Colocar o uuid no endpoint./users com o método GET. 

Ex: 
	
	./users/a78e1e7e-da12-435f-901d-9edbd8ac849b

## adicionar usuário (deverá estar autenticado)

Usando o método POST no end point ./users, colocar o novo usuário no corpo JSON. E retornará o uuid do novo usuário.
     
Ex:
           
	 {
	            "username":"Jalamina Dasilvs",
	            "password": "elephant"
         }

## editar usuário (deverá estar autenticado)

Usando o método PUT no end point ./users, colocar o usuário no corpo JSON. Ele modificará o usuário que tem o mesmo uuid do usuário do corpo JSON.

Ex:
            
	{
                "username": "Belarmino dasilvs",
                "uuid": "b147e93f-d6af-4c1b-903c-c2e0c4ca7381", 
                "password": "amonia"
	}

## Deletar usuário (deverá estar autenticado)

Usando o método DELETE no end point ./users, colocar o uuid no end point. 
    
Ex: 

	./users/a78e1e7e-da12-435f-901d-9edbd8ac849b
