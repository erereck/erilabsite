"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const ASCII_LOGO = String.raw`                 @@@@@@@@@@@@@@@@                 
             @@@@@@@@@@@@@@@@@@@@@@@@             
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          
       @@@@@@@@@@@@            @@@@@@@@@@@@       
      @@@@@@@@@                    @@@@@@@@@      
    @@@@@@@@@      @@@@@@@@@@@@      @@@@@@@@@    
   @@@@@@@@    @@@@@@@@@@@@@@@@@@@@    @@@@@@@@   
  @@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@  
 @@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@ 
 @@@@@@    @@@@@@@@@@@       @@@@@@@@@@    @@@@@@@
@@@@@@    @@@@@@@@@            @@@@@@@@@    @@@@@@
@@@@@@    @@@@@@@@              @@@@@@@@    @@@@@@
@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@
@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@
@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@
@@@@@@    @@@@@@@@                                
@@@@@@    @@@@@@@@@@            @@@               
@@@@@@@    @@@@@@@@@@@        @@@@@@@             
 @@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@           
  @@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@   @        
   @@@@@@@      @@@@@@@@@@@@@@@@@@@@    @@@@@     
    @@@@@@@@       @@@@@@@@@@@@@@     @@@@@@@@    
      @@@@@@@@@                    @@@@@@@@@      
       @@@@@@@@@@@@            @@@@@@@@@@@@       
          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          
             @@@@@@@@@@@@@@@@@@@@@@@@             
                 @@@@@@@@@@@@@@@@                  `;

type Project = {
  id: string;
  name: string;
  url: string;
  description?: string;
  status?: string;
};

const games: Project[] = [
  { id: "sub-teste", name: "Sub Teste()", url: "https://pptgamespt.wixsite.com/crate/projetos/wBnWW", description: "página do projeto", status: "novo" },
  { id: "trauma-center", name: "Salve a Pátria Matheus Primagi: Trauma Center", url: "https://pptgamespt.wixsite.com/crate/projetos/XhFxR", description: "página do projeto", status: "ainda não lançado" },
  { id: "futbobo", name: "Futbobo", url: "https://erereck.github.io/futbobo/", description: "carreira de futebol, dos 12 anos à aposentadoria" },
  { id: "mimica-quente", name: "Mímica Quente", url: "https://mimicaquente.vercel.app", description: "batata quente de mímica para jogar com os amigos" },
  { id: "mmm-fes", name: "Muito, Muito Minimalista: FES", url: "https://erickssen.itch.io/mmm" },
  { id: "project-legacy", name: "Project Legacy [2.5.5]", url: "https://www.mediafire.com/file/wym0h4pdojgaxsf/ProjectLegacy.rar/file", description: "download" },
  { id: "distext", name: "Distext", url: "https://www.mediafire.com/file/1xsddtmvxveqwla/EriLab_DisText.rar/file", description: "download" },
  { id: "amitext", name: "Amitext", url: "https://www.mediafire.com/file/zjfx57tvdh9lk1e/AmiText.ppsm/file", description: "download" },
  { id: "juninho-unlimited", name: "Juninho Unlimited", url: "https://www.mediafire.com/file/fsvyrbowvqr0pj4/JuninhoUnlimited.ppsm/file", description: "download" },
  { id: "gerador-de-ideias", name: "Gerador de ideias", url: "https://www.mediafire.com/file/n81jv97itx5es4s/Gerador_De_Ideias_-_EriLab.ppsm/file", description: "download" },
  { id: "powerpoint-heroes", name: "PowerPoint Heroes", url: "https://www.mediafire.com/file/8s0rc0likjhzr6p/PowerPoint_Heroes.zip/file", description: "download" },
  { id: "pokecatch", name: "PokéCatch", url: "https://pptgamespt.wixsite.com/crate/projetos/0rytJ", description: "página do projeto" },
  { id: "cao-the-game", name: "Cão: The Game", url: "https://pptgamespt.wixsite.com/crate/projetos/jKPzf", description: "página do projeto" },
  { id: "reciclagem-simulator", name: "RECICLAGEM SIMULATOR", url: "https://pptgamespt.wixsite.com/crate/projetos/8Jc5d", description: "página do projeto" },
  { id: "esquerdista-maker", name: "Esquerdista Maker", url: "https://www.mediafire.com/file/ytoq8vu1syugh05/Esquerdista+Maker.ppsm/file", description: "download" },
];

const oldGames: Project[] = [
  { id: "churrasqueira-maker", name: "Churrasqueira Maker (ANTIGO)", url: "https://www.mediafire.com/file/s1e0iswk4sz9dbv/Churrasqueira_Maker.pptm/file" },
  { id: "muito-minimalista", name: "Muito, Muito Minimalista", url: "https://www.mediafire.com/file/7ffwmav2ut33xlb/Muito%252C_MUITO_MINIMALISTA.pptx/file" },
  { id: "muito-minimalista-2", name: "Muito, Muito Minimalista 2", url: "https://www.mediafire.com/file/16mzpme19l5liak/Jos%25C3%25A9.pptm/file" },
  { id: "namorico-simulator-dx", name: "Namorico Simulator DX", url: "https://www.mediafire.com/file/kq6ro22fk8pp2c1/NSDX.pptm/file" },
];

const otherProjects: Project[] = [
  { id: "superlotador-de-json", name: "Superlotador de JSON", url: "https://superlotadordejson.vercel.app/" },
  { id: "animetier", name: "AnimeTier", url: "https://animetier.vercel.app/" },
  { id: "o-plano-maker", name: "O Plano Maker", url: "https://oplanomaker.vercel.app/" },
  { id: "play-line", name: "play.line", url: "https://theplayline.vercel.app/" },
];

const team = [
  ["Erickssen", "Fundador e Programador principal"],
  ["Etwo", "Artista principal e Roteirista"],
  ["Ethree", "Idealista, Roteirista e Programador"],
  ["eFour", "Artista e Analista de Marketing"],
  ["Piñata", "Testador profissional"],
  ["Ceñora", "Líder de Torcida Profissional"],
  ["Placeño", "Divulgador de trailers e pequenos teasers"],
  ["Griñvog", "Testador e Editor de trailers"],
];

const allProjects = [...games, ...oldGames, ...otherProjects];
const commandNames = ["help", "jogos", "projetos", "equipe", "sobre", "logo", "limpar"];
type OutputKind = "help" | "games" | "projects" | "team" | "about" | "logo" | "message";
type HistoryEntry = { command: string; kind: OutputKind; message?: string };

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function openUrl(url: string) {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}

function ProjectList({ items, compact = false, showHint = true }: { items: Project[]; compact?: boolean; showHint?: boolean }) {
  return (
    <div className={compact ? "project-list compact-project-list" : "project-list"}>
      {items.map((project) => (
        <button key={project.id} className={`terminal-link project-line${compact ? " compact" : ""}`} onClick={() => openUrl(project.url)}>
          {compact ? <span className="project-id">{project.id}</span> : null}
          <span className="project-name">{project.name}</span>
          {!compact ? <span className="project-description">{project.description ?? ""}</span> : null}
          {!compact ? <span className="project-meta">{project.id}</span> : null}
        </button>
      ))}
      {showHint ? <p className="hint">use “abrir &lt;id&gt;” ou clique em uma linha</p> : null}
    </div>
  );
}

function CommandButton({ command, children, run }: { command: string; children?: React.ReactNode; run: (command: string) => void }) {
  return <button className="terminal-link command-button" onClick={() => run(command)}>{children ?? command}</button>;
}

function Output({ entry, run }: { entry: HistoryEntry; run: (command: string) => void }) {
  if (entry.kind === "help") {
    const rows = [
      ["jogos", "lista os jogos atuais e antigos"],
      ["projetos", "lista os projetos fora da categoria jogos"],
      ["equipe", "mostra a equipe"],
      ["sobre", "mostra as informações da EriLab"],
      ["logo", "mostra a logo novamente"],
      ["abrir <id>", "abre um jogo ou projeto"],
      ["limpar", "limpa a tela"],
    ];
    return (
      <div className="output-block">
        <p className="section-title">comandos disponíveis</p>
        <div className="help-table">
          {rows.map(([command, description]) => (
            <div className="help-row" key={command}>
              {command.includes("<") ? <span className="amber">{command}</span> : <CommandButton command={command} run={run} />}
              <span>{description}</span>
            </div>
          ))}
        </div>
        <p className="hint">atalhos: ↑/↓ histórico · Tab completa · Ctrl+L limpa</p>
      </div>
    );
  }
  if (entry.kind === "games") return <div className="output-block"><p className="section-title">jogos — {games.length} no catálogo</p><ProjectList items={games} compact showHint={false} /><p className="section-title old-section">jogos antigos — {oldGames.length}</p><ProjectList items={oldGames} compact showHint={false} /><p className="hint">use “abrir &lt;id&gt;” ou clique em uma linha</p></div>;
  if (entry.kind === "projects") return <><p className="section-title">outros projetos</p><ProjectList items={otherProjects} /></>;
  if (entry.kind === "logo") return <pre className="ascii-logo compact">{ASCII_LOGO}</pre>;
  if (entry.kind === "team") {
    return (
      <div className="output-block">
        <p className="section-title">equipe erilab</p>
        <div className="team-list">
          {team.map(([name, role]) => <p key={name}><span>{name}</span><small>{role}</small></p>)}
        </div>
      </div>
    );
  }
  if (entry.kind === "about") {
    return (
      <div className="output-block">
        <p className="section-title">sobre a erilab</p>
        <p>A EriLab é uma equipe de jogos.</p>
        <button className="terminal-link archive-link" onClick={() => openUrl("https://erickssenlvb.wixsite.com/erilab")}>site antigo (arquivado): erickssenlvb.wixsite.com/erilab</button>
      </div>
    );
  }
  return <p className="message">{entry.message}</p>;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [caretIndex, setCaretIndex] = useState(0);
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPosition, setHistoryPosition] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = screenRef.current.scrollHeight;
  }, [entries, showIntro]);

  useEffect(() => {
    function focusOnTyping(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, button, a") || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.length === 1) inputRef.current?.focus();
    }
    window.addEventListener("keydown", focusOnTyping);
    return () => window.removeEventListener("keydown", focusOnTyping);
  }, []);

  function syncCaret() {
    window.requestAnimationFrame(() => setCaretIndex(inputRef.current?.selectionStart ?? input.length));
  }

  function remember(command: string) {
    setCommandHistory((current) => {
      const next = [...current, command];
      setHistoryPosition(next.length);
      return next;
    });
  }

  function runCommand(rawCommand: string) {
    const typed = rawCommand.trim();
    if (!typed) return;
    const normalized = normalize(typed);
    const [command, ...args] = normalized.split(/\s+/);
    remember(typed);

    if (["limpar", "clear", "cls"].includes(command)) {
      setEntries([]);
      setShowIntro(false);
      setInput("");
      setCaretIndex(0);
      return;
    }

    let entry: HistoryEntry;
    if (["ajuda", "help", "?"].includes(command)) entry = { command: typed, kind: "help" };
    else if (["jogos", "games"].includes(command)) entry = { command: typed, kind: "games" };
    else if (["projetos", "outros", "outros-projetos", "projects"].includes(normalized)) entry = { command: typed, kind: "projects" };
    else if (["antigos", "projetos-antigos", "old"].includes(normalized)) entry = { command: typed, kind: "games" };
    else if (["equipe", "team", "crew"].includes(command)) entry = { command: typed, kind: "team" };
    else if (["sobre", "about"].includes(command)) entry = { command: typed, kind: "about" };
    else if (command === "logo") entry = { command: typed, kind: "logo" };
    else if (["abrir", "open"].includes(command)) {
      const id = args.join("-");
      const project = allProjects.find((item) => normalize(item.id) === id || normalize(item.name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === id);
      if (project) {
        openUrl(project.url);
        entry = { command: typed, kind: "message", message: `abrindo ${project.name}...` };
      } else entry = { command: typed, kind: "message", message: `projeto não encontrado: ${args.join(" ") || "<id>"}` };
    } else entry = { command: typed, kind: "message", message: `comando não reconhecido: “${typed}”. tente “help”.` };

    setEntries((current) => [...current, entry]);
    setInput("");
    setCaretIndex(0);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    runCommand(input);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      runCommand("limpar");
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!commandHistory.length) return;
      const next = Math.max(0, historyPosition - 1);
      setHistoryPosition(next);
      setInput(commandHistory[next] ?? "");
      setCaretIndex((commandHistory[next] ?? "").length);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = Math.min(commandHistory.length, historyPosition + 1);
      setHistoryPosition(next);
      setInput(next === commandHistory.length ? "" : commandHistory[next]);
      setCaretIndex(next === commandHistory.length ? 0 : commandHistory[next].length);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const value = normalize(input);
      const match = commandNames.find((name) => name.startsWith(value));
      if (value && match) {
        setInput(match);
        setCaretIndex(match.length);
      }
    }
  }

  return (
    <main className="terminal-shell" onClick={(event) => {
      const selection = window.getSelection()?.toString();
      if (!(event.target as HTMLElement).closest("button") && !selection) inputRef.current?.focus();
    }}>
      <div className="crt" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <section className="terminal" aria-label="Terminal da EriLab">
        <header className="terminal-bar">
          <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>erickssen@erilab:~$</span>
        </header>

        <div className="terminal-screen" ref={screenRef} aria-live="polite">
          {showIntro ? (
            <div className="intro">
              <pre className="ascii-logo" aria-label="Logo da EriLab em ASCII">{ASCII_LOGO}</pre>
              <p className="brand-name">EriLab</p>
              <nav className="intro-commands" aria-label="Comandos rápidos">
                {commandNames.map((command) => <CommandButton key={command} command={command} run={runCommand}>{command}</CommandButton>)}
              </nav>
            </div>
          ) : null}

          {entries.map((entry, index) => (
            <div className="history-entry" key={`${entry.command}-${index}`}>
              <p className="command-echo"><span>erilab&gt;</span> {entry.command}</p>
              <Output entry={entry} run={runCommand} />
            </div>
          ))}
        </div>

        <form className="prompt" onSubmit={submit}>
          <label htmlFor="terminal-input">erilab&gt;</label>
          <div className="input-wrap">
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              onChange={(event) => { setInput(event.target.value); setCaretIndex(event.target.selectionStart ?? event.target.value.length); }}
              onKeyDown={handleInputKeyDown}
              onKeyUp={syncCaret}
              onClick={syncCaret}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Digite um comando"
              placeholder="digite um comando… (help)"
            />
            <span className="cursor-track" aria-hidden="true"><span className="caret-measure">{input.slice(0, caretIndex)}</span><i /></span>
          </div>
        </form>
      </section>
    </main>
  );
}
