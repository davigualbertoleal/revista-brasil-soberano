# Flipbook da Revista

Site de uma página só que abre o PDF da pasta como livro folheável. A página 1 é a capa, a última é a contracapa, e o fundo pega a cor das páginas abertas (luz de cinema).

## Como usar

1. Coloque o PDF na raiz do projeto ou na pasta `pdf/`. Qualquer arquivo que comece com `revista` e termine em `.pdf` é reconhecido, por exemplo `revista...(1).pdf`.
2. Rode `node gerar-manifest.js`. Ele acha o PDF e grava o caminho em `manifest.json`.
3. Sirva a pasta e abra no navegador:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Abrir o `index.html` com duplo clique não carrega o PDF sozinho, porque o navegador bloqueia leitura de arquivos nesse modo. Nesse caso, solte o PDF na página.

Se o `manifest.json` não existir ou estiver vazio, a página ainda tenta `revista.pdf`, `revista (1).pdf`, `revista(1).pdf` e `revista...(1).pdf`. Também dá pra apontar um arquivo pela URL: `?pdf=pdf/outro.pdf`.

## Publicar

**GitHub Pages:** suba o repo, vá em Settings → Pages e escolha "GitHub Actions" como source. A cada push o workflow roda `gerar-manifest.js` e publica. Troque o PDF, dê push, pronto.

**Netlify ou Vercel:** build command `node gerar-manifest.js`, publish directory `.`.

## Controles

Setas do teclado, arrastar ou clicar na página. Home e End vão pra capa e contracapa. Botões de Luz, Tela cheia e Trocar PDF no topo.

Se o PDF tiver número ímpar de páginas, uma página em branco entra antes da contracapa pro livro fechar certinho.

## Arquivos

- `index.html`: a página inteira (CSS e JS dentro)
- `vendor/`: pdf.js 3.11.174 e page-flip 2.0.7, locais, sem depender de CDN
- `gerar-manifest.js`: acha o PDF
- `.github/workflows/pages.yml`: publica no GitHub Pages
