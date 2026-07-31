import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza o terminal da EriLab", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>EriLab \/\/ Terminal<\/title>/i);
  assert.match(html, /EriLab/);
  assert.match(html, /equipe de jogos/);
  assert.match(html, /@@@@@@@@@@@@@@@@/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("mantém todo o catálogo solicitado", async () => {
  const [terminal, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/terminal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  for (const item of [
    "Sub Teste()",
    "Salve a Pátria Matheus Primagi: Trauma Center",
    "Futbobo",
    "Mímica Quente",
    "Project Legacy [2.5.5]",
    "PokéCatch",
    "Churrasqueira Maker (ANTIGO)",
    "Superlotador de JSON",
    "AnimeTier",
    "O Plano Maker",
    "play.line",
    "Erickssen",
    "Griñvog",
  ]) assert.match(terminal, new RegExp(item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  assert.match(layout, /EriLab \/\/ Terminal/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(terminal, /BetterVB|Player\.cls/i);
});
