# P2 FullStack — React + Laravel + Docker

Aplicação fullstack desenvolvida como entrega da **Atividade P2 de Desenvolvimento FullStack**.

Combina um frontend em **React + Tailwind CSS** com um backend em **Laravel 12** (API REST), tudo orquestrado via **Docker Compose**.

---

## Tecnologias

| Camada    | Tecnologia                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Tailwind CSS, Vite, Axios |
| Backend   | Laravel 12, PHP 8.3, Apache       |
| Banco     | MySQL 8.0                         |
| Infra     | Docker, Docker Compose, nginx     |

---

## Arquitetura

```
p2fullstack/
├── backend/        Laravel 12 — API REST (PHP + Apache)
├── frontend/       React + Tailwind CSS (nginx serve o build)
└── docker-compose.yml
```

### Comunicação entre containers

```
Navegador
    │
    ▼ :3000
┌─────────────┐
│  frontend   │  nginx — serve arquivos estáticos do React
│  (nginx)    │  proxy /api/* → backend:80
└──────┬──────┘
       │ rede interna Docker
       ▼
┌─────────────┐
│   backend   │  Laravel + Apache — responde /api/*
│  (Apache)   │
└──────┬──────┘
       │ rede interna Docker
       ▼
┌─────────────┐
│    mysql    │  MySQL 8.0 — dados persistidos em volume
└─────────────┘
```

| Serviço   | Porta exposta | Acesso                  |
|-----------|---------------|-------------------------|
| frontend  | **3000**      | http://localhost:3000   |
| backend   | 8080          | http://localhost:8080   |
| mysql     | —             | somente rede interna    |

---

## Como executar

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) v2

### 1. Clone o repositório

```bash
git clone https://github.com/sergionogueira/p2fullstack.git
cd p2fullstack
```

### 2. Suba todos os serviços

```bash
docker compose up --build
```

O comando vai:
- Fazer **build** da imagem do frontend (React → build estático → nginx)
- Fazer **build** da imagem do backend (Laravel + Apache + Composer)
- Iniciar o **MySQL** e aguardar estar saudável
- Executar **migrations** automaticamente
- Executar **seeders** (cria usuários e categorias de exemplo)
- Iniciar todos os serviços

> Para rodar em background: `docker compose up --build -d`

### 3. Acesse a aplicação

**http://localhost:3000**

### 4. Credenciais padrão

| Perfil        | E-mail                | Senha      |
|---------------|-----------------------|------------|
| Administrador | admin@example.com     | `password` |
| Usuário       | user@example.com      | `password` |

### 5. Parar a aplicação

```bash
docker compose down
```

Para remover também o volume do banco:

```bash
docker compose down -v
```

---

## Funcionalidades

### Autenticação
- Login com e-mail e senha
- Token JWT (Bearer) armazenado no `localStorage`
- Logout com invalidação do token no backend
- Redirecionamento automático para login em sessão expirada

### Controle de Acesso
| Recurso     | Usuário comum | Administrador |
|-------------|:---:|:---:|
| Dashboard   | ✅ | ✅ |
| Categorias  | ✅ | ✅ |
| Usuários    | ❌ | ✅ |

### CRUD de Categorias
- Listar todas as categorias
- Cadastrar nova categoria (nome + descrição)
- Editar categoria existente
- Remover categoria com confirmação

### CRUD de Usuários *(somente admin)*
- Listar todos os usuários com perfil (Admin / Usuário)
- Cadastrar novo usuário com e-mail, senha e perfil
- Editar dados e perfil de usuário
- Remover usuário (não é possível remover a própria conta)

### UX
- Mensagens de sucesso e erro em todas as operações
- Interface responsiva para **desktop e mobile**
- Indicadores de carregamento nos formulários

---

## Rotas da API

### Pública
| Método | Endpoint     | Descrição        |
|--------|--------------|------------------|
| POST   | /api/login   | Autenticação — retorna Bearer token |

### Autenticado *(header: `Authorization: Bearer {token}`)*
| Método | Endpoint              | Descrição               |
|--------|-----------------------|-------------------------|
| POST   | /api/logout           | Encerrar sessão         |
| GET    | /api/me               | Dados do usuário atual  |
| GET    | /api/categorias       | Listar categorias       |
| POST   | /api/categorias       | Criar categoria         |
| GET    | /api/categorias/{id}  | Detalhe de categoria    |
| PUT    | /api/categorias/{id}  | Atualizar categoria     |
| DELETE | /api/categorias/{id}  | Remover categoria       |

### Somente Admin
| Método | Endpoint        | Descrição            |
|--------|-----------------|----------------------|
| GET    | /api/users      | Listar usuários      |
| POST   | /api/users      | Criar usuário        |
| GET    | /api/users/{id} | Detalhe de usuário   |
| PUT    | /api/users/{id} | Atualizar usuário    |
| DELETE | /api/users/{id} | Remover usuário      |

---

## Estrutura do Projeto

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   │   ├── AuthController.php      # Login / Logout / Me
│   │   │   ├── CategoriaController.php # CRUD de categorias
│   │   │   └── UserController.php      # CRUD de usuários (admin)
│   │   └── Middleware/
│   │       └── HandleCors.php          # Cabeçalhos CORS
│   └── Models/
│       ├── User.php
│       └── Categoria.php
├── database/
│   ├── migrations/                     # Criação das tabelas
│   └── seeders/DatabaseSeeder.php      # Dados iniciais
├── routes/api.php                      # Rotas da API
├── Dockerfile
└── entrypoint.sh                       # Aguarda MySQL → migrate → seed

frontend/
├── src/
│   ├── components/
│   │   ├── Alert.jsx        # Mensagens de feedback
│   │   ├── Layout.jsx       # Estrutura com navbar
│   │   ├── Navbar.jsx       # Navegação principal
│   │   └── PrivateRoute.jsx # Guarda de rotas autenticadas
│   ├── context/
│   │   └── AuthContext.jsx  # Estado global de autenticação
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── categorias/
│   │   │   ├── Categorias.jsx     # Listagem
│   │   │   └── CategoriaForm.jsx  # Cadastro / Edição
│   │   └── usuarios/
│   │       ├── Usuarios.jsx       # Listagem
│   │       └── UsuarioForm.jsx    # Cadastro / Edição
│   ├── services/
│   │   └── api.js           # Axios com interceptors JWT
│   └── App.jsx              # Rotas da SPA
├── nginx.conf               # Proxy /api/ + SPA fallback
└── Dockerfile               # Multi-stage: build → nginx
```

---

## Variáveis de Ambiente

### Backend (`backend/.env.example`)

| Variável        | Descrição                    | Padrão         |
|-----------------|------------------------------|----------------|
| `APP_KEY`       | Chave de criptografia Laravel | gerada         |
| `DB_HOST`       | Host do MySQL                | `mysql`        |
| `DB_DATABASE`   | Nome do banco                | `p2_database`  |
| `DB_USERNAME`   | Usuário do banco             | `p2user`       |
| `DB_PASSWORD`   | Senha do banco               | `p2password`   |

### Frontend (`frontend/.env.example`)

| Variável         | Descrição            | Padrão |
|------------------|----------------------|--------|
| `VITE_API_URL`   | URL base da API      | `/api` |

> Em Docker, o nginx faz proxy de `/api/*` para o backend automaticamente. `VITE_API_URL` só é necessário em desenvolvimento local (`npm run dev`).
