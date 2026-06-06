# P2 FullStack — React + Laravel + Docker

Aplicação fullstack com frontend React (Tailwind CSS) integrado a backend Laravel via API REST, executada com Docker Compose.

---

## Arquitetura

```
p2fullstack/
├── backend/      Laravel 12 — API REST (PHP + Apache)
├── frontend/     React + Tailwind CSS (build servido via nginx)
└── docker-compose.yml
```

| Serviço  | Porta exposta | Descrição                          |
|----------|---------------|------------------------------------|
| frontend | 3000          | React SPA servida pelo nginx       |
| backend  | 8080          | Laravel API (também acessível diretamente) |
| mysql    | —             | MySQL 8 (somente rede interna)     |

O frontend acessa a API via `/api/` — o nginx do container frontend faz proxy para `http://backend/api/`.

---

## Como subir a aplicação

### Pré-requisitos
- Docker ≥ 24
- Docker Compose v2

### 1. Clone e entre no diretório

```bash
git clone <url-do-repositorio>
cd p2fullstack
```

### 2. Suba os containers

```bash
docker compose up --build
```

O comando irá:
- Fazer build da imagem do frontend (React → nginx)
- Fazer build da imagem do backend (Laravel + Apache)
- Iniciar o MySQL e aguardar ele ficar saudável
- Executar migrations e seeders automaticamente
- Iniciar todos os serviços

### 3. Acesse a aplicação

- **Frontend:** http://localhost:3000
- **API:** http://localhost:8080/api

### Credenciais padrão

| Perfil         | E-mail                 | Senha    |
|----------------|------------------------|----------|
| Administrador  | admin@example.com      | password |
| Usuário padrão | user@example.com       | password |

---

## Funcionalidades

- **Login** com autenticação via token JWT (Bearer)
- **Dashboard** com resumo de categorias e usuários
- **Categorias** — CRUD completo (acessível a todos os usuários autenticados)
- **Usuários** — CRUD completo (somente administradores)
- Controle de acesso por perfil (admin / user)
- Mensagens de sucesso e erro em todas as operações
- Interface responsiva para desktop e mobile

---

## Rotas da API

| Método | Endpoint              | Acesso       | Descrição               |
|--------|-----------------------|--------------|-------------------------|
| POST   | /api/login            | Público      | Autenticação            |
| POST   | /api/logout           | Autenticado  | Encerrar sessão         |
| GET    | /api/me               | Autenticado  | Usuário atual           |
| GET    | /api/categorias       | Autenticado  | Listar categorias       |
| POST   | /api/categorias       | Autenticado  | Criar categoria         |
| GET    | /api/categorias/{id}  | Autenticado  | Detalhes de categoria   |
| PUT    | /api/categorias/{id}  | Autenticado  | Atualizar categoria     |
| DELETE | /api/categorias/{id}  | Autenticado  | Remover categoria       |
| GET    | /api/users            | Admin        | Listar usuários         |
| POST   | /api/users            | Admin        | Criar usuário           |
| GET    | /api/users/{id}       | Admin        | Detalhes de usuário     |
| PUT    | /api/users/{id}       | Admin        | Atualizar usuário       |
| DELETE | /api/users/{id}       | Admin        | Remover usuário         |

---

## Parar a aplicação

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```
