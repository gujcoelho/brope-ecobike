// Gerador de propostas Brope: preenche template.html com dados de clients/<slug>.json
// Uso: node gen.mjs <slug>       ex.: node gen.mjs ecobike
// Saida: dist/<slug>/index.html  (pronto pra deploy)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const slug = process.argv[2];
if (!slug) {
  console.error('Uso: node gen.mjs <slug>   (ex.: node gen.mjs ecobike)');
  process.exit(1);
}

const template = readFileSync('template.html', 'utf8');
const data = JSON.parse(readFileSync(`clients/${slug}.json`, 'utf8'));

// substitui todos {{chave}} pelos valores do JSON
let out = template.replace(/\{\{([a-zA-Z]+)\}\}/g, (m, key) => {
  if (data[key] === undefined) {
    console.warn(`AVISO: token {{${key}}} sem valor no JSON`);
    return m;
  }
  return String(data[key]);
});

// checa se sobrou algum token nao resolvido
const left = out.match(/\{\{[a-zA-Z]+\}\}/g);
if (left) console.warn('Tokens nao resolvidos:', [...new Set(left)].join(', '));

mkdirSync(`dist/${slug}`, { recursive: true });
writeFileSync(`dist/${slug}/index.html`, out);
console.log(`OK -> dist/${slug}/index.html  (${(out.length / 1024 / 1024).toFixed(2)} MB)`);
