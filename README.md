# ✅ API RESTful - Gerenciador de Tarefas

Este é um projeto de API RESTful desenvolvido com **Node.js**, **TypeScript**, **Express** e **Prisma ORM**, com autenticação via **JWT**, validação com **Zod**, e persistência em **SQLite**.

## 🛠 Tecnologias utilizadas

- Node.js + TypeScript
- Express
- Prisma ORM
- SQLite
- JSON Web Token (JWT)
- Zod (validação)

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/henriqmguima/rest-api-project.git
cd rest-api-project
```

2. **Instalar as dependências**
```
npm install
```

3. **Configure o banco de dados SQLite e Prisma:**
```npx prisma init --datasource-provider sqlite```

4. **Crie o arquivo .env com:**
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-super-secreta"
```

5. **Gere o banco de dados:**
```bash
npx prisma migrate dev --name init
npx prisma migrate dev --name add_tasks
```

6. **Inicie o servidor em modo desenvolvimento:**
```npm run dev```

---

## 👥 Usuários e Permissões

Ao se registrar pela rota ```/api/register```, o usuário é criado com perfil user

O usuário admin tem acesso exclusivo à rota ```/api/users```

---

## 🛠 Como criar um admin
Você pode criar manualmente um admin de duas formas:

1. Temporariamente, editando o código no UserController e adicionando role: 'admin' na criação.
2. Usando o Prisma Studio:

```npx prisma studio```

Edite o campo role do usuário desejado para ```"admin"```.

---

## 🔐 Autenticação JWT
Após login, você receberá um token:

```bash
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Use esse token nas requisições protegidas adicionando o header:

```Authorization: Bearer SEU_TOKEN_AQUI```

---

## 🔁 Rotas da API

### 🧍 Usuários

| Método | Rota            | Descrição                       | Permissão         |
|--------|------------------|----------------------------------|-------------------|
| POST   | `/api/register`  | Cria um novo usuário (user)     | Pública           |
| POST   | `/api/login`     | Login e geração de token JWT    | Pública           |
| GET    | `/api/users`     | Lista todos os usuários         | Somente admin     |

---

### ✅ Tarefas

| Método | Rota              | Descrição                       | Permissão         |
|--------|-------------------|----------------------------------|-------------------|
| POST   | `/api/tasks`      | Cria uma nova tarefa            | Autenticado       |
| GET    | `/api/tasks`      | Lista tarefas do usuário logado | Autenticado       |
| GET    | `/api/tasks/:id`  | Consulta tarefa pelo ID         | Somente dono      |
| PUT    | `/api/tasks/:id`  | Atualiza uma tarefa             | Somente dono      |
| DELETE | `/api/tasks/:id`  | Deleta uma tarefa               | Somente dono      |

---

## ✅ Validação com Zod

Todos os dados de entrada (login, registro, tarefas) são validados com **Zod**, retornando mensagens claras em caso de erro.

---

## 🧾 Exemplo de Requisição

### 🔐 Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "..."
}
```

---

## 🗃️ .gitignore

Este projeto já possui `.gitignore` configurado com:

```
node_modules
.env
dist
.prisma
```

---

## 🙌 Autor

Desenvolvido por Henrique Machado Guimarães – Serviços Web
