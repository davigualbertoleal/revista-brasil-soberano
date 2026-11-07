// Procura o PDF da revista na pasta e grava o caminho em manifest.json.
// Procura na raiz e em pdf/. Prefere arquivo que começa com "revista"
// (ex.: "revista...(1).pdf"); se não tiver, usa o primeiro PDF que achar.
const fs = require('fs');
const path = require('path');

const raiz = __dirname;
const pastas = ['', 'pdf'];

const achados = [];
for (const pasta of pastas) {
  const dir = path.join(raiz, pasta);
  if (!fs.existsSync(dir)) continue;
  for (const nome of fs.readdirSync(dir)) {
    if (/\.pdf$/i.test(nome)) achados.push(pasta ? pasta + '/' + nome : nome);
  }
}

const revista = achados.find((p) => /^revista/i.test(path.basename(p)));
const escolhido = revista || achados[0] || null;

fs.writeFileSync(path.join(raiz, 'manifest.json'), JSON.stringify({ pdf: escolhido }, null, 2) + '\n');

if (escolhido) console.log('PDF encontrado: ' + escolhido);
else console.log('Nenhum PDF encontrado. Coloca o arquivo na raiz ou na pasta pdf/.');
