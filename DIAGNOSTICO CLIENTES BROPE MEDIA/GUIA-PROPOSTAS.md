# Gerar propostas personalizadas — Brope Media

Sistema: `template.html` (com tokens `{{}}`) + um JSON por cliente + `gen.mjs` (gerador).
Cada cliente vira um `index.html` próprio, pronto pra deploy = **link web personalizado**.

## Passo a passo (cliente novo)

1. **Copiar o modelo**
   ```bash
   cp clients/_modelo.json clients/nome-do-cliente.json
   ```

2. **Editar** `clients/nome-do-cliente.json` — preencher os campos (nome, concorrente, cidade, preços, @, validade, etc). O `slug` é o nome curto (vira a pasta/URL).

3. **Gerar**
   ```bash
   node gen.mjs nome-do-cliente
   ```
   Saída: `dist/nome-do-cliente/index.html`

4. **Deploy** (link personalizado): sobe a pasta `dist/nome-do-cliente/` na Vercel
   - Dashboard Vercel → **Add New → Project** → arrasta a pasta, OU
   - `cd dist/nome-do-cliente && vercel` (se tiver Vercel CLI)
   - URL sai tipo `brope-nome-do-cliente.vercel.app`

## O que o gerador troca sozinho (13 campos)

`cliente`, `clienteFull`, `handle`, `concorrente`, `cidadeBusca`, `cidades`,
`regiao`, `regiaoCurta`, `produto`, `precoEssencial`, `precoAvancado`, `validade`, `data`.

## ⚠️ O que É por cliente e NÃO é automático (editar à mão no dist/<slug>/index.html)

Cada proposta tem argumento próprio. Depois de gerar, personalizar:

- **Hero (título e texto)** — a chamada muda por cliente
- **Diagnóstico** — os 4 "vazamentos" são específicos de cada negócio
- **Tabela hoje/depois** — inclusive a linha "2 unidades" (só faz sentido pra quem tem 2 lojas)
- **Vídeo do mockup do Instagram** — hoje é o reel do EcoBike (`data:video/mp4;base64,...`). Trocar pelo vídeo do cliente OU remover a seção `<!-- CRIATIVO -->` se não tiver.
- **Avatar do mockup** — logo do EcoBike (classe `.ig-ava-img`). Trocar pela logo do cliente.
- **Preços** — já vêm do JSON, mas confirmar valores.

## Regenerar o EcoBike (referência)

```bash
node gen.mjs ecobike
```

## Não mexer

`template.html` é a base. Editar layout/design só nele (aí vale pra todos os clientes).
Não editar `dist/` esperando persistir — é gerado, sobrescreve.
