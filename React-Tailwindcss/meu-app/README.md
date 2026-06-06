# Aula de React + Tailwindcss

Crie um projeto react com vite
npm create vite@latest meu-app -- --template react

Entre na pasta do meu-app. cd meu-app

Instale as dependências

npm install -D tailwindcss @tailwindcss/vite

Configurar o plugin do tailwindcss no vite config.

Importar o tailwindcss direto no código. App.css ou no arquivo que for utilizar.

## Utilitários

Esse bloco ele não cria css visualmente.

Cria utilitários usando esses valores.

@theme {

    /* Cores — usam oklch (o novo padrão) */
  --color-brand:    oklch(62% 0.19 264);
  --color-brand-50: oklch(97% 0.03 264);
  --color-brand-900:oklch(25% 0.12 264);

  /* Fontes */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Breakpoint customizado */
  --breakpoint-3xl: 1920px;

  /* Sombra customizada */
  --shadow-card: 0 2px 8px oklch(0% 0 0 / 8%);
}

--color-brand-50: oklch(97% 0.03 264);
class="bg-brand-50"
Como que isso é interpretado?
color: categoria
brand-50: nome

A partir disso, o tailwindcss gera vários utilities relacionados a cor:
bg-brand-50 = background
text-brand-50 = cor do texto
border-brand-50 = cor da borda

HTML
bg-color-brand-50

bg-brand-50 -> aplica diretamente no background.

@theme {
    --color-sucess: green;
}

HTML
<div class="bg-sucess> </div>
<div class="text-sucess> </div>
<div class="border-sucess> </div>

@theme {
    --font-display: "Popins", sans-serif;
}
Tailwindcss Gera:
class="font-display"

## Criação de tokens acessíveis como variáveis

Uma vez declarada em @theme e linkada com o componente, posso utilizar como uma variável dentro do meu componente.

.meu-componente {
    border-color: var( --color-brand);
    font-family: var(--font-sans:);
}

## Utility-first - A forma como o tailwind trabalha

As classes utilizadas do v4 funcionam igual ao v3 no jsx. A mudança foi na parte estrutural.

Categorias essenciais.
- 1. Layout
- flex
- grid
- block
- hidden

- 2. Alinhamento
- items-center
- justify-between
- gap-4

- 3. Espaçamento
- p-4
- py-2
- mx-auto
- mt-6

- 4. Tipografia
- text-lg
- font-bold
- leading-tight

- 5. Cores
- bg-blue-500
- text-white

- 6. Bordas
- border
- rounded-xl
- ring-2

- 7. Tamanhos
- w-full
- k-12
- max-w-lg

- 8. Size(novo v4)
- size-10

- 9. Opacidade
- bg-blue-500/30
- text-black/60

Dica: Instale o Tailwind css intellisense no vscode. No v4 ele já mostra a variável css gerada ao lado de cada classe.

Quais são os breakpoints que vou querer pra prova.
sm: >= 640px
md: >= 780px
lg: >= 1024px
xl: >= 1280px
2xl: >= 1536px
max-md: <= 767px

Consigo breakpoints customizados

@theme {
    --breakpoint-xs: 428px;
    --breakpoint-3xl: 1920px;
}

Usando no JSX:
<nav className="hidden xs:block max-md:px-4">