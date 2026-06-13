# NotThereYet

> Ainda não cheguei lá. E é exatamente por isso que escrevo.

Blog pessoal hospedado no GitHub Pages. Um espaço para documentar aprendizados, recomeços e experiências de vida.

**Site:** https://notthereyet.github.io

---

## Como adicionar um novo artigo

Este blog usa uma estrutura dinâmica — você só precisa adicionar o conteúdo e ele aparece automaticamente.

**Passo 1:** Crie um arquivo Markdown em `posts/` (ex: `posts/meu-novo-artigo.md`)

**Passo 2:** Adicione a entrada correspondente em `data/posts.json`:

```json
{
  "slug": "meu-novo-artigo",
  "title": "Título do Artigo",
  "date": "2026-06-15",
  "description": "Breve descrição do artigo.",
  "tag": "aprendizado",
  "readingTime": "5 min de leitura"
}
```

**Passo 3:** Atualize `rss.xml` e `sitemap.xml` com o novo artigo

**Passo 4:** Faça commit e push — o GitHub Pages publica automaticamente

### Tags disponíveis

| Valor         | Exibição    |
|---------------|-------------|
| `reflexao`    | Reflexão    |
| `aprendizado` | Aprendizado |
| `recomeço`    | Recomeço    |
| `vida`        | Vida        |

---

## Estrutura do projeto

```
├── index.html          # Página inicial
├── post.html           # Template de artigo
├── css/style.css       # Estilos
├── js/
│   ├── home.js         # Lista de artigos
│   └── post.js         # Renderização de artigo
├── data/posts.json     # Metadados dos artigos
├── posts/              # Conteúdo Markdown
├── rss.xml             # Feed RSS
└── sitemap.xml         # Mapa do site
```

---

*"Progresso acima de perfeição."*
