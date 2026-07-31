"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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
  status?: string;
};

const games: Project[] = [
  { id: "sub-teste", name: "Sub Teste()", url: "https://pptgamespt.wixsite.com/crate/projetos/wBnWW", status: "novo" },
  { id: "trauma-center", name: "Salve a Pátria Matheus Primagi: Trauma Center", url: "https://pptgamespt.wixsite.com/crate/projetos/XhFxR", status: "ainda não lançado" },
  { id: "futbobo", name: "Futbobo", url: "https://erereck.github.io/futbobo/" },
  { id: "mimica-quente", name: "Mímica Quente", url: "https://mimicaquente.vercel.app" },
  { id: "project-legacy", name: "Project Legacy [2.5.5]", url: "https://www.mediafire.com/file/wym0h4pdojgaxsf/ProjectLegacy.rar/file" },
  { id: "distext", name: "Distext", url: "https://www.mediafire.com/file/1xsddtmvxveqwla/EriLab_DisText.rar/file" },
  { id: "amitext", name: "Amitext", url: "https://www.mediafire.com/file/zjfx57tvdh9lk1e/AmiText.ppsm/file" },
  { id: "juninho-unlimited", name: "Juninho Unlimited", url: "https://www.mediafire.com/file/fsvyrbowvqr0pj4/JuninhoUnlimited.ppsm/file" },
  { id: "gerador-de-ideias", name: "Gerador de ideias", url: "https://www.mediafire.com/file/n81jv97itx5es4s/Gerador_De_Ideias_-_EriLab.ppsm/file" },
  { id: "powerpoint-heroes", name: "PowerPoint Heroes", url: "https://www.mediafire.com/file/8s0rc0likjhzr6p/PowerPoint_Heroes.zip/file" },
  { id: "pokecatch", name: "PokéCatch", url: "https://pptgamespt.wixsite.com/crate/projetos/0rytJ" },
  { id: "cao-the-game", name: "Cão: The Game", url: "https://pptgamespt.wixsite.com/crate/projetos/jKPzf" },
  { id: "reciclagem-simulator", name: "RECICLAGEM SIMULATOR", url: "https://pptgamespt.wixsite.com/crate/projetos/8Jc5d" },
  { id: "esquerdista-maker", name: "Esquerdista Maker", url: "https://www.mediafire.com/file/ytoq8vu1syugh05/Esquerdista+Maker.ppsm/file" },
];

const oldGames: Project[] = [
  { id: "churrasqueira-maker", name: "Churrasqueira Maker (ANTIGO)", url: "https://www.mediafire.com/file/s1e0iswk4sz9dbv/Churrasqueira_Maker.pptm/file" },
  { id: "muito-minimalista", name: "Muito, Muito Minimalista", url: "https://www.mediafire.com/file/7ffwmav2ut33xlb/Muito%252C_MUITO_MINIMALISTA.pptx/file" },
  { id: "muito-minimalista-2", name: "Muito, Muito Minimalista 2", url: "https://www.mediafire.com/file/16mzpme19l5liak/Jos%25C3%25A9.pptm/file" },
  { id: "namorico-simulator-dx", name: "Namorico Simulator DX", url: "https://www.mediafire.com/file/kq6ro22fk8pp2c1/NSDX.pptm/file" },
];

const otherProjects: Project[] = [
  { id: "superlotador-de-json", name: "Monstrous JSON Generator", url: "https://superlotadordejson.vercel.app/" },
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
const commands = ["ajuda", "jogos", "projetos", "antigos", "equipe", "logo", "limpar"];

type OutputKind = "help" | "games" | "projects" | "old" | "team" | "logo" | "message";
type HistoryEntry = { command: string; kind: OutputKind; message?: string };

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function openProject(project: Project) {
  const newWindow = window.open(project.url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}

function ProjectList({ items }: { items: Project[] }) {
  return (
    <div className="project-list">
      {items.map((project) => (
        <button key={project.id} className="terminal-link project-line" onClick={() => openProject(project)}>
          <span className="project-id">{project.id}</span>
          <span className="project-name">{project.name}</span>
          {project.status ? <span className="project-status">[{project.status}]</span> : null}
        </button>
      ))}
      <p className="hint">use: abrir &lt;id&gt; — ou clique em uma linha</p>
    </div>
  );
}

function Output({ entry }: { entry: HistoryEntry }) {
  if (entry.kind === "help") {
    return (
      <div className="output-block">
        <p>comandos disponíveis:</p>
        <p>ajuda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mostra esta lista</p>
        <p>jogos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lista os jogos</p>
        <p>projetos&nbsp;&nbsp;&nbsp;lista os outros projetos</p>
        <p>antigos&nbsp;&nbsp;&nbsp;&nbsp;lista os jogos antigos</p>
        <p>equipe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mostra a equipe</p>
        <p>logo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mostra a logo</p>
        <p>abrir &lt;id&gt;&nbsp;abre um projeto</p>
        <p>limpar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;limpa o terminal</p>
      </div>
    );
  }

  if (entry.kind === "games") return <ProjectList items={games} />;
  if (entry.kind === "projects") return <ProjectList items={otherProjects} />;
  if (entry.kind === "old") return <ProjectList items={oldGames} />;
  if (entry.kind === "logo") return <pre className="ascii-logo compact">{ASCII_LOGO}</pre>;
  if (entry.kind === "team") {
    return (
      <div className="team-list">
        {team.map(([name, role]) => (
          <p key={name}><span>{name}</span> — {role}</p>
        ))}
      </div>
    );
  }
  return <p className="message">{entry.message}</p>;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  function runCommand(rawCommand: string) {
    const typed = rawCommand.trim();
    if (!typed) return;
    const normalized = normalize(typed);
    const [command, ...args] = normalized.split(/\s+/);

    if (command === "limpar" || command === "clear" || command === "cls") {
      setHistory([]);
      setInput("");
      return;
    }

    let entry: HistoryEntry;
    if (command === "ajuda" || command === "help") entry = { command: typed, kind: "help" };
    else if (command === "jogos" || command === "games") entry = { command: typed, kind: "games" };
    else if (command === "projetos" || command === "projects") entry = { command: typed, kind: "projects" };
    else if (command === "antigos" || command === "old") entry = { command: typed, kind: "old" };
    else if (command === "equipe" || command === "sobre" || command === "team") entry = { command: typed, kind: "team" };
    else if (command === "logo") entry = { command: typed, kind: "logo" };
    else if (command === "abrir" || command === "open") {
      const id = args.join("-");
      const project = allProjects.find((item) => normalize(item.id) === id || normalize(item.name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === id);
      if (project) {
        openProject(project);
        entry = { command: typed, kind: "message", message: `abrindo ${project.name}...` };
      } else {
        entry = { command: typed, kind: "message", message: `projeto não encontrado: ${args.join(" ") || "<id>"}` };
      }
    } else {
      entry = { command: typed, kind: "message", message: `comando não encontrado: ${typed}. digite ajuda.` };
    }

    setHistory((current) => [...current, entry]);
    setInput("");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <main className="screen" onClick={(event) => {
      if (!(event.target as HTMLElement).closest("button")) inputRef.current?.focus();
    }}>
      <section className="terminal" aria-label="Terminal da EriLab">
        <header className="terminal-bar">
          <span>ERILAB // TERMINAL</span>
          <span className="online"><i /> online</span>
        </header>

        <div className="terminal-body">
          <pre className="ascii-logo" aria-label="Logo da EriLab em ASCII">{ASCII_LOGO}</pre>
          <h1>ERILAB</h1>
          <p>equipe de jogos</p>
          <p className="boot-line">sistema iniciado. digite um comando ou clique nele:</p>

          <nav className="command-list" aria-label="Comandos rápidos">
            {commands.map((command) => (
              <button className="terminal-link" key={command} onClick={() => runCommand(command)}>[{command}]</button>
            ))}
          </nav>

          <div className="history" aria-live="polite">
            {history.map((entry, index) => (
              <div className="history-entry" key={`${entry.command}-${index}`}>
                <p className="command-echo"><span>visitante@erilab:~$</span> {entry.command}</p>
                <Output entry={entry} />
              </div>
            ))}
          </div>

          <form className="prompt" onSubmit={submit}>
            <label htmlFor="terminal-input">visitante@erilab:~$</label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Digite um comando"
              autoFocus
            />
            <span className="cursor" aria-hidden="true" />
          </form>
          <div ref={endRef} />
        </div>
      </section>
    </main>
  );
}
