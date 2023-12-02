import express from "express"

const servidorWeb = express()
servidorWeb.use(express.json())

const ROUTE_NAME = '/todo_list'
const SERVER_PORT = 3000

const exemplo = {
  id: 1,
  name: "Fazer compras",
  description: "Comprar pão, leite e ovos",
  done: false
}
const TODO_LIST_ITEMS = [exemplo]



// Requisição que pega os dados/ busca informaçoes
//  
servidorWeb.get(ROUTE_NAME, (requisicao, resposta) => {

  resposta.json(TODO_LIST_ITEMS)
})

// Cria informação
servidorWeb.post(ROUTE_NAME, (requisicao, resposta) => {

  const body = requisicao.body

  const name = body.name
  const description = body.description

  console.log(body, "REQUISICAO BODY")

  if (!name) {
    return resposta.status(400).json({ mensagem: "A propiedade name é nescessaria" })
  }

  if (!description) {
    return resposta.status(400).json({ messagem: "A propiedade description é nescessaria" })
  }


  const to_do_item = {
    id: TODO_LIST_ITEMS.length + 1,
    name,
    description,
    done: false
  }

  TODO_LIST_ITEMS.push(to_do_item)

  resposta.status(201).json(to_do_item)
})

// // Edita a informaçao 
// servidorWeb.patch()

// Deleta a informação
// DELETE - /todo_list/1 - > ID = 1
servidorWeb.delete(`${ROUTE_NAME}/:id`, (requisicao, resposta) => {
  const id = Number(requisicao.params.id)

  const oTalDoItem = TODO_LIST_ITEMS.find(
    (elemento) => {
      return elemento.id === id
    })


  if (!oTalDoItem) {
    return resposta.status(404).json({ mensagem: "Item não encontrado" })
  }


  const indice = TODO_LIST_ITEMS.indexOf(oTalDoItem)

  TODO_LIST_ITEMS.splice(indice, 1)

  resposta.status(204).send()
})

servidorWeb.listen(SERVER_PORT, () => {
  console.log(
    `Will be running in the http://localhost:${SERVER_PORT}${ROUTE_NAME}`
  );
});