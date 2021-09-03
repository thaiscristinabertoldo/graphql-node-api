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

Para rodar o projeto é preciso criar o arquivo .env na raiz do projeto e adicionar a uri de conexão do mongo.

```
DB_URI_CONNECTION = "mongodb+srv://<user>:<password>@<uri>/<collection>?retryWrites=true&w=majority"
```

## Exemplos execução queries e mutations

#### Listar Categorias

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

#### Obter uma Categoria por id

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

#### Criar uma Categoria

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

#### Atualizar uma Categoria

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

#### Deletar uma Categoria

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

#### Listar Vídeos

**Query:**

```
query VideosQuery {
  videos {
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
    "videos": [
      {
        "_id": "61318e8ebecc2c4569fea73d",
        "name": "Vídeo de Drama",
        "description": "Descrição vídeo de drama",
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

#### Obter um Vídeo por id

**Query:**

```
query VideoQuery($videoId: String!) {
  video(id: $videoId) {
    _id
    description
    name
    category {
      _id
      name
      description
    }
  }
}

variables: {
  "videoId": "61317f8ea3115d88b38f913f"
}
```

**Resultado:**

```
{
  "data": {
    "video": {
      "_id": "61318e8ebecc2c4569fea73d",
      "description": "Vídeo de drama",
      "name": "Descrição vídeo de drama",
      "category": {
        "_id": "61318a404063a4779b45276a",
        "name": "Drama",
        "description": "Categoria de drama"
      }
    }
  }
}
```

#### Criar um Vídeo

**Mutation:**

```
mutation CreateVideoMutation($createVideoVideoInput: VideoInput!) {
  createVideo(videoInput: $createVideoVideoInput) {
    _id
    name
    description
  }
}

variables: {
  "createVideoVideoInput": {
    "name": "Vídeo de Comédia",
    "description": "Descrição vídeo de comédia",
    "category": "61318a404063a4779b45276a"
  }
}
```

**Resultado:**

```
{
  "data": {
    "createVideo": {
      "_id": "61318e8ebecc2c4569fea73d",
      "name": "Vídeo de Comédia",
      "description": "Descrição vídeo de comédia"
    }
  }
}
```

#### Atualizar um Vídeo

**Mutation:**

```
mutation UpdateVideoMutation($updateVideoVideoInput: VideoInput!, $updateVideoId: String!) {
  updateVideo(videoInput: $updateVideoVideoInput, id: $updateVideoId) {
    _id
    description
    name
  }
}

variables: {
  "updateVideoId": "61318e8ebecc2c4569fea73d"
  "updateVideoVideoInput": {
    "name": "Vídeo de Drama",
    "description": "Descrição vídeo de drama",
    "category": "61318a404063a4779b45276a"
  }
}
```

**Resultado:**

```
{
  "data": {
    "updateVideo": {
      "_id": "61318e8ebecc2c4569fea73d",
      "description": "Vídeo de Drama",
      "name": "Descrição vídeo de drama"
    }
  }
}
```

#### Deletar um Vídeo

**Mutation:**

```
mutation DeleteVideoMutation($deleteVideoId: String!) {
  deleteVideo(id: $deleteVideoId)
}

variables: {
  "deleteCategoryId": "61318e8ebecc2c4569fea73d"
}
```

**Resultado:**

```
{
  "data": {
    "deleteVideo": true
  }
}
```
