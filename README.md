# graphql-node-api

API GraphQL node usando [TypeGraphQL](https://typegraphql.com/) e [mongoose](https://mongoosejs.com/)

## Primeiros passos

Para instalar as dependencias é preciso executar o comando **yarn**:

```
$ yarn
```

## Comandos

No diretório do projeto, você pode executar:

### **dev**

Executa o aplicativo no modo de desenvolvimento. Que ficará exposto em: http://localhost:4100/graphql

```
$ yarn dev
```

## Configurações

Para rodar o projeto é preciso criar o arquivo .env na raiz do projeto, adicionar a uri de conexão do mongo e a porta que será executado.

```
DB_URI_CONNECTION = "mongodb+srv://<user>:<password>@<uri>/<collection>?retryWrites=true&w=majority"
PORT = 4100
```

## Exemplos execução queries e mutations

### Listar Categorias

**Query:**

```
query CategoriesQuery {
  categories {
    _id
    description
    name
  }
}
```

**Resultado:**

```
{
  "data": {
    "createCategory": {
      "_id": "61318a404063a4779b45276a",
      "name": "Comédia",
      "description": "Categoria de comédia"
    }
  }
}
```

### Obter uma Categoria por id

**Query:**

```
query CategoryQuery($categoryId: String!) {
  category(id: $categoryId) {
    _id
    description
    name
  }
}

variables: {
  "categoryId": "61318a404063a4779b45276a"
}
```

**Resultado:**

```
{
  "data": {
    "category": {
      "_id": "61318a404063a4779b45276a",
      "description": "Categoria de comédia",
      "name": "Comédia"
    }
  }
}
```

### Criar uma Categoria

**Mutation:**

```
mutation CreateCategoryMutation($createCategoryCategoryInput: CategoryInput!) {
  createCategory(categoryInput: $createCategoryCategoryInput) {
    _id
    name
    description
  }
}

variables: {
  "createCategoryCategoryInput": {
    "name": "Comédia",
    "description": "Categoria de comédia"
  }
}
```

**Resultado:**

```
{
  "data": {
    "createCategory": {
      "_id": "61318a404063a4779b45276a",
      "name": "Comédia",
      "description": "Categoria de comédia"
    }
  }
}
```

### Atualizar uma Categoria

**Mutation:**

```
mutation UpdateCategoryMutation($updateCategoryCategoryInput: CategoryInput!, $updateCategoryId: String!) {
  updateCategory(categoryInput: $updateCategoryCategoryInput, id: $updateCategoryId) {
    _id
    description
    name
  }
}

variables: {
  "updateCategoryId": "61318a404063a4779b45276a",
  "updateCategoryCategoryInput": {
    "name": "Drama",
    "description": "Categoria de Drama"
  }
}
```

**Resultado:**

```
{
  "data": {
    "updateCategory": {
      "_id": "61318a404063a4779b45276a",
      "description": "Categoria de Drama",
      "name": "Drama"
    }
  }
}
```

### Deletar uma Categoria

**Mutation:**

```
mutation DeleteCategoryMutation($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId)
}

variables: {
  "deleteCategoryId": "61318a404063a4779b45276a"
}
```

**Resultado:**

```
{
  "data": {
    "deleteCategory": true
  }
}
```

### Listar Filmes

**Query:**

```
query MoviesQuery {
  movies {
    _id
    name
    description
    category {
      _id
      name
      description
    }
  }
}
```

**Resultado:**

```
{
  "data": {
    "movies": [
      {
        "_id": "61318e8ebecc2c4569fea73d",
        "name": "Filme de Drama",
        "description": "Descrição filme de drama",
        "category": {
          "_id": "61318a404063a4779b45276a",
          "name": "Drama",
          "description": "Categoria de drama"
        }
      }
    ]
  }
}
```

### Obter um Filme por id

**Query:**

```
query Query($movieId: String!) {
  movie(id: $movieId) {
    _id
    name
    description
    category {
      _id
      name
      description
    }
  }
}

variables: {
  "movieId": "61317f8ea3115d88b38f913f"
}
```

**Resultado:**

```
{
  "data": {
    "video": {
      "_id": "61318e8ebecc2c4569fea73d",
      "name": "Vídeo de drama",
      "description": "Descrição vídeo de drama",
      "category": {
        "_id": "61318a404063a4779b45276a",
        "name": "Drama",
        "description": "Categoria de drama"
      }
    }
  }
}
```

### Criar um Filme

**Mutation:**

```
mutation CreateMovieMutation($createMovieMovieInput: MovieInput!) {
  createMovie(movieInput: $createMovieMovieInput) {
    _id
    name
    description
  }
}

variables: {
  "createMovieMovieInput": {
    "name": "Filme de Comédia",
    "description": "Descrição filme de comédia",
    "category": "61318a404063a4779b45276a"
  }
}
```

**Resultado:**

```
{
  "data": {
    "createMovie": {
      "_id": "61318e8ebecc2c4569fea73d",
      "name": "Filme de Comédia",
      "description": "Descrição filme de comédia"
    }
  }
}
```

### Atualizar um Filme

**Mutation:**

```
mutation UpdateMovieMutation($updateMovieMovieInput: MovieInput!, $updateMovieId: String!) {
  updateMovie(movieInput: $updateMovieMovieInput, id: $updateMovieId) {
    _id
    description
    name
  }
}

variables: {
  "updateMovieId": "61318e8ebecc2c4569fea73d"
  "updateMovieMovieInput": {
    "name": "Filme de Drama",
    "description": "Descrição filme de drama",
    "category": "61318a404063a4779b45276a"
  }
}
```

**Resultado:**

```
{
  "data": {
    "updateMovie": {
      "_id": "61318e8ebecc2c4569fea73d",
      "name": "Filme de Drama",
      "description": "Descrição filme de drama"
    }
  }
}
```

### Deletar um Filme

**Mutation:**

```
mutation DeleteMovieMutation($deleteMovieId: String!) {
  deleteMovie(id: $deleteMovieId)
}

variables: {
  "deleteMovieId": "61318e8ebecc2c4569fea73d"
}
```

**Resultado:**

```
{
  "data": {
    "deleteMovie": true
  }
}
```

### Subscriptions

**Subscription Filmes:** _Ao cadastrar, editar ou excluir um filme é enviado a atualização através da subscription_

```
subscription Subscription {
  movieNotification {
    date
    error
    result {
      type
      id
    }
  }
}
```

**Resultado:**

_Cadastrar filme com sucesso:_

```
{
  "data": {
    "movieNotification": {
      "date": "2021-09-04T15:43:15.085Z",
      "error": null,
      "result": {
        "type": "ADD",
        "id": "61339412fbaa5c6f55e6381f"
      }
    }
  }
}
```

_Cadastrar filme com erro:_

```
{
  "data": {
    "movieNotification": {
      "date": "2021-09-04T15:43:15.085Z",
      "error": "Falha ao incluir",
      "result": null
    }
  }
}
```

_Atualizar filme com sucesso:_

```
{
  "data": {
    "movieNotification": {
      "date": "2021-09-04T15:44:25.313Z",
      "error": null,
      "result": {
        "type": "UPDATE",
        "id": "61338d4abf6b707276b5c7d4"
      }
    }
  }
}
```

_Atualizar filme com erro:_

```
{
  "data": {
    "movieNotification": {
      "date": "2021-09-04T15:43:15.085Z",
      "error": "Falha ao editar",
      "result": null
    }
  }
}
```

_Excluir filme com sucesso:_

```
{
  "data": {
    "movieNotification": {
      "date": "2021-09-04T15:46:50.150Z",
      "error": null,
      "result": {
        "type": "DELETE",
        "id": "61338d4abf6b707276b5c7d4"
      }
    }
  }
}

```

_Excluir_ filme com erro:\_

```
{
  "data": {
    "movieNotification": {
      "date": "2021-09-04T15:47:21.023Z",
      "error": "Falha ao excluir",
      "result": null
    }
  }
}
```
