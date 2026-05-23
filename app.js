const PASSWORD = "inula";

const agents = [
  {
    id: "margine-cinghiale",
    name: "Margine Cinghiale",
    role: "CFO Unit Economics",
    accent: "#f2a01f",
    station: "Lavagna margini",
    status: "working",
    x: 18,
    y: 34,
    mission: "Protegge la cassa. Calcola se reward, SKU e B2B fanno guadagnare, perdere o bloccare liquidita.",
    controls: ["costi vivi", "fee", "quota ATA", "manodopera", "break-even"],
    kpis: ["margine netto per reward", "tempo assemblaggio", "cassa prima produzione"],
    tasks: [
      { title: "Tabella dei 5 reward PDB", status: "working" },
      { title: "Scenario 100 / 500 / 2500 unita", status: "todo" }
    ]
  },
  {
    id: "claim-guardiano",
    name: "Claim Guardiano",
    role: "Claim & Compliance",
    accent: "#c6374a",
    station: "Desk timbri rossi",
    status: "review",
    x: 36,
    y: 22,
    mission: "Trasforma claim fragili in testi pubblicabili. Divide pubblico, tecnico e interno.",
    controls: ["biostimolante", "repellente", "fitosanitario", "efficacia", "prove"],
    kpis: ["claim corretti", "parole vietate rimosse", "testi pubblicabili"],
    tasks: [
      { title: "Ripulire copy reward CIGNULA", status: "review" },
      { title: "Lista parole vietate", status: "todo" }
    ]
  },
  {
    id: "operatore-campagna",
    name: "Operatore Campagna",
    role: "PDB Campaign Operator",
    accent: "#5f8fd6",
    station: "Bacheca PDB",
    status: "todo",
    x: 58,
    y: 21,
    mission: "Costruisce la pagina Produzioni dal Basso: chiara, credibile, convertibile e prudente.",
    controls: ["problema", "reward", "uso fondi", "timeline", "rischi"],
    kpis: ["chiarezza pagina", "reward comprensibili", "promesse sostenibili"],
    tasks: [
      { title: "Pagina PDB in 5 sezioni", status: "todo" },
      { title: "FAQ consegna entro 3 mesi", status: "todo" }
    ]
  },
  {
    id: "kit-fornitori",
    name: "Kit & Fornitori",
    role: "Packaging & Supplier Ops",
    accent: "#31206c",
    station: "Banco packaging",
    status: "working",
    x: 81,
    y: 36,
    mission: "Rende i kit belli ma fisicamente producibili: BOM, Tinware, misure, pesi, assemblaggio.",
    controls: ["BOM", "Tinware", "misure", "peso", "MOQ"],
    kpis: ["costo packaging", "fornitori per kit", "tempo assemblaggio"],
    tasks: [
      { title: "Email Stefano Koffi / Tinware", status: "working" },
      { title: "Packing list 500 unita", status: "todo" }
    ]
  },
  {
    id: "dossier-trasubbie",
    name: "Dossier Trasubbie",
    role: "ATA / Dossier Agent",
    accent: "#49785b",
    station: "Tavolo mappe",
    status: "todo",
    x: 72,
    y: 67,
    mission: "Trasforma ATA in asset credibile: dossier, co-firma, prove territoriali e interlocuzione Comuni.",
    controls: ["SIR", "BioBlitz", "co-firma", "biodiversita", "Comuni"],
    kpis: ["prove archiviate", "co-firme", "documenti pronti"],
    tasks: [
      { title: "Indice dossier ATA", status: "todo" },
      { title: "Pagina pubblica uso 30%", status: "todo" }
    ]
  },
  {
    id: "vendite-agricole",
    name: "Vendite Agricole",
    role: "B2B Revenue Agent",
    accent: "#2258b8",
    station: "Telefono e listino",
    status: "blocked",
    x: 48,
    y: 74,
    mission: "Crea offerte B2B per aziende agricole, frantoi, vivai, agriturismi e consorzi.",
    controls: ["listino", "prospect", "outreach", "pacchetti", "riordini"],
    kpis: ["prospect qualificati", "appuntamenti", "margine medio ordine"],
    tasks: [
      { title: "3 pacchetti B2B", status: "blocked" },
      { title: "Lista prospect locali", status: "todo" }
    ]
  },
  {
    id: "prove-campo",
    name: "Prove di Campo",
    role: "Proof & Field Data Agent",
    accent: "#8a315d",
    station: "Mini serra",
    status: "working",
    x: 22,
    y: 68,
    mission: "Genera prove osservabili senza claim illegali: schede, foto, controlli, report 7/14/30.",
    controls: ["protocolli", "foto", "controlli", "feedback", "report"],
    kpis: ["test completati", "foto comparabili", "schede complete"],
    tasks: [
      { title: "Scheda test CIGNULA Mini", status: "working" },
      { title: "Template foto prima/dopo", status: "todo" }
    ]
  }
];

const pipeline = [
  { id: "idea", title: "Idea", tasks: ["Reward nuovo", "Offerta frantoio", "Pagina ATA"] },
  { id: "margin", title: "Margine", tasks: ["Prezzo minimo", "Cashflow PDB"] },
  { id: "claim", title: "Claim", tasks: ["Copy CIGNULA", "Etichette INBRUMA"] },
  { id: "kit", title: "Kit", tasks: ["BOM Tinware", "Test scatola 1:1"] },
  { id: "campaign", title: "Campagna / B2B", tasks: ["PDB draft", "Email prospect"] },
  { id: "proof", title: "Prove", tasks: ["Scheda 7/14/30", "Foto controllo"] },
  { id: "publish", title: "Pubblica", tasks: ["Pagina protetta", "Update sostenitori"] }
];

const gate = document.getElementById("passwordGate");
const shell = document.getElementById("appShell");
const form = document.getElementById("passwordForm");
const input = document.getElementById("passwordInput");
const error = document.getElementById("passwordError");
const agentLayer = document.getElementById("agentLayer");
const panel = document.getElementById("agentPanel");
const pipelineBoard = document.getElementById("pipelineBoard");
const decisionLog = document.getElementById("decisionLog");

let selectedAgentId = agents[0].id;
let storedTasks = JSON.parse(localStorage.getItem("inulaTasks") || "{}");

if (localStorage.getItem("inulaOfficeUnlocked") === "true") {
  unlock();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.trim().toLowerCase() === PASSWORD) {
    localStorage.setItem("inulaOfficeUnlocked", "true");
    unlock();
  } else {
    error.textContent = "Password non corretta.";
  }
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
    tab.classList.add("active");
    document.getElementById(`${tab.dataset.view}View`).classList.add("active-view");
  });
});

function unlock() {
  gate.hidden = true;
  shell.hidden = false;
  renderOffice();
  renderAgentPanel(selectedAgentId);
  renderPipeline();
  renderDecisionLog();
}

function renderOffice() {
  agentLayer.innerHTML = "";
  agents.forEach((agent) => {
    const button = document.createElement("button");
    button.className = "agent-token";
    button.style.left = `${agent.x}%`;
    button.style.top = `${agent.y}%`;
    button.style.setProperty("--accent", agent.accent);
    button.setAttribute("aria-label", `${agent.name}, ${agent.role}`);
    button.innerHTML = `
      <span class="status-dot" title="${agent.status}"></span>
      <span class="avatar" aria-hidden="true"></span>
      <strong>${agent.name}</strong>
      <span>${agent.station}</span>
    `;
    button.addEventListener("click", () => {
      selectedAgentId = agent.id;
      renderAgentPanel(agent.id);
    });
    agentLayer.appendChild(button);
  });
}

function renderAgentPanel(agentId) {
  const agent = agents.find((item) => item.id === agentId);
  const extraTasks = storedTasks[agentId] || [];
  const tasks = [...agent.tasks, ...extraTasks];
  panel.innerHTML = `
    <div class="panel-head">
      <span class="avatar" style="--accent:${agent.accent}" aria-hidden="true"></span>
      <div>
        <p class="eyebrow">${agent.role}</p>
        <h2>${agent.name}</h2>
        <p class="agent-role">${agent.station}</p>
      </div>
    </div>
    <p>${agent.mission}</p>
    <h3>Controlla</h3>
    <ul class="tag-list">${agent.controls.map((item) => `<li>${item}</li>`).join("")}</ul>
    <h3>KPI</h3>
    <ul class="tag-list">${agent.kpis.map((item) => `<li>${item}</li>`).join("")}</ul>
    <h3>Task aperti</h3>
    <div class="task-list">
      ${tasks.map((task) => `
        <article class="task-card">
          <strong>${task.title}</strong>
          <small>Stato: ${task.status}</small>
        </article>
      `).join("")}
    </div>
    <form class="task-form" id="taskForm">
      <h3>Assegna task</h3>
      <input name="title" required placeholder="Es. calcola margine Radical Restorer" />
      <select name="status">
        <option value="todo">todo</option>
        <option value="working">working</option>
        <option value="blocked">blocked</option>
        <option value="review">review</option>
      </select>
      <textarea name="notes" rows="3" placeholder="Note, file o criterio di successo"></textarea>
      <button type="submit">Affida a ${agent.name}</button>
    </form>
  `;

  document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newTask = {
      title: data.get("title").toString(),
      status: data.get("status").toString(),
      notes: data.get("notes").toString()
    };
    storedTasks[agent.id] = [...(storedTasks[agent.id] || []), newTask];
    localStorage.setItem("inulaTasks", JSON.stringify(storedTasks));
    renderAgentPanel(agent.id);
    renderDecisionLog();
  });
}

function renderPipeline() {
  pipelineBoard.innerHTML = pipeline.map((column) => `
    <section class="pipeline-column">
      <h3>${column.title}</h3>
      ${column.tasks.map((task) => `<div class="pipeline-task">${task}</div>`).join("")}
    </section>
  `).join("");
}

function renderDecisionLog() {
  const totalCustomTasks = Object.values(storedTasks).reduce((count, tasks) => count + tasks.length, 0);
  const blocked = agents.flatMap((agent) => agent.tasks).filter((task) => task.status === "blocked").length;
  decisionLog.innerHTML = `
    <h3>Registro decisioni</h3>
    <ul class="tag-list">
      <li>Nessun reward va online senza Margine, Claim e Kit.</li>
      <li>Task assegnati da Serena in questa sessione: ${totalCustomTasks}.</li>
      <li>Blocchi strutturali aperti: ${blocked}. Primo sospetto: B2B senza numeri reali.</li>
      <li>Prossima decisione consigliata: compilare tabella costi reward prima dei testi finali.</li>
    </ul>
  `;
}
