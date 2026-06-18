/* =========================================================
   Sherlin S — Portfolio Logic
   No login gate — data loads straight in. Uses window.storage
   (persistent key-value storage) so edits survive across visits.
   ========================================================= */

const STORAGE_KEY = "portfolio:sherlin_24104082";

const DEFAULT_SKILLS = [
  { id: "blk-skill-1", name: "C", level: 70 },
  { id: "blk-skill-2", name: "C++", level: 70 },
  { id: "blk-skill-3", name: "Java", level: 65 },
  { id: "blk-skill-4", name: "HTML", level: 90 },
  { id: "blk-skill-5", name: "CSS", level: 85 },
  { id: "blk-skill-6", name: "JavaScript", level: 80 },
  { id: "blk-skill-7", name: "Remote Sensing", level: 60 },
];

const DEFAULT_INTERNSHIPS = [
  {
    id: "blk-intern-1",
    title: "Web Development Intern",
    org: "Prodigy InfoTech",
    mode: "Remote / Online",
    desc: "Worked on real-world web development tasks as part of a remote internship program, building and refining front-end features while strengthening practical HTML, CSS, and JavaScript skills outside the classroom.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: ""
  },
  {
    id: "blk-intern-2",
    title: "Software Development Intern",
    org: "Hinelix Technologies, Bangalore",
    mode: "Remote / Online",
    desc: "Contributed to ongoing software projects remotely with the Hinelix Technologies team, getting hands-on exposure to professional development workflows, collaborative coding practices, and problem-solving on live tasks.",
    tags: ["Software Development"],
    link: ""
  },
  {
    id: "blk-intern-3",
    title: "Remote Sensing & GIS Intern",
    org: "Thazal Geospatial Analytics",
    mode: "On-site / Offline",
    desc: "Worked on-site with geospatial datasets, applying remote sensing techniques and GIS tools to analyse and map real terrain and infrastructure data — direct, hands-on experience that fed into later geospatial project work.",
    tags: ["Remote Sensing", "GIS"],
    link: ""
  },
];

const DEFAULT_CERTIFICATES = [
  {
    id: "blk-cert-1",
    name: "Introduction to Internet of Things",
    issuer: "NPTEL — IIT Kharagpur",
    badge: "Elite+Silver, Top 5% Topper",
    meta: ["85% score", "Jul–Oct 2025", "12-week course"],
  },
  {
    id: "blk-cert-2",
    name: "The Joy of Computing using Python",
    issuer: "NPTEL — IIT Madras",
    badge: "Elite+Silver",
    meta: ["75% score", "Jan–Apr 2025", "12-week course"],
  },
  {
    id: "blk-cert-3",
    name: "Technical English for Engineers",
    issuer: "NPTEL — IIT Madras",
    badge: "Elite+Silver",
    meta: ["82% score", "Aug–Oct 2024", "8-week course"],
  },
  {
    id: "blk-cert-4",
    name: "IIT Bombay FOSSEE-AAI Geospatial Mapathon 2025",
    issuer: "IIT Bombay FOSSEE / NMEICT",
    badge: "Notable Participant",
    meta: ["Edition V", "Mar–Jul 2025"],
  },
  {
    id: "blk-cert-5",
    name: "VishwaNova — National Level Weboreel AI Hackathon",
    issuer: "MIT World Peace University, Pune (via Unstop)",
    badge: "Participation",
    meta: ["National Level"],
  },
  {
    id: "blk-cert-6",
    name: "Cluster 2K25 — Technical & Non-Technical Events",
    issuer: "K.L.N. College of Engineering",
    badge: "Achievement-3rd Place",
    meta: ["Mar 19, 2025"],
  },
];

const DEFAULT_PROJECTS = [
  {
    id: "blk-proj-1",
    title: "Fortune Whisperer Magic",
    desc: "An interactive web experience that delivers playful, mystic-style fortunes and predictions to users.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Sherlin414/fortune-whisperer-magic.git"
  },
  {
    id: "blk-proj-2",
    title: "Mafia-Detective",
    desc: "An interactive mystery game where players take on the role of a detective investigating mafia activities, gathering clues, questioning suspects, solving puzzles, and uncovering the culprit through strategic decision-making.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Sherlin414/Mafia-Detective.git"
  },
  {
    id: "blk-proj-3",
    title: "AI Resume Analyzer",
    desc: "An AI-powered system that evaluates resumes, identifies strengths and weaknesses, checks ATS compatibility, suggests improvements, and provides personalized feedback to enhance job application success.",
    tags: ["Python"],
    link: "https://github.com/Sherlin414/week3_AI.resumer.git"
  },
  {
    id: "blk-proj-4",
    title: "Raw Mill Procurement and Management System",
    desc: "A system that manages raw material purchasing, supplier details, inventory tracking, stock monitoring, and procurement processes to ensure efficient production and cost control.",
    tags: ["HTML", "CSS", "JavaScript", "Java"],
    link: "https://github.com/Sherlin414/Raw-Mill-Material-Procurement-and-Management-System-Application.git"
  },
  {
    id: "blk-proj-5",
    title: "Stopwatch",
    desc: "A simple, responsive stopwatch/timer web app for tracking elapsed time.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Sherlin414/stopwatch.git"
  },
  {
    id: "blk-proj-6",
    title: "Tic Tac Toe",
    desc: "A classic two-player Tic Tac Toe game built for the browser.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Sherlin414/Tic-tac-toe.git"
  },
  {
    id: "blk-proj-7",
    title: "Weather App",
    desc: "Analyse weather using API — a web app that fetches and displays live weather data for any location.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Sherlin414/Weather.git"
  },
  {
    id: "blk-proj-8",
    title: "Responsive Landing Page",
    desc: "An interactive, responsive landing page for ordering and viewing ice creams.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Sherlin414/Landing-page-.git"
  },
  {
    id: "blk-proj-9",
    title: "Space Habitat Layout Creator",
    desc: "A software tool that designs and organizes space habitat layouts by optimizing living, research, storage, and life-support modules, ensuring efficient space utilization, safety, and sustainability for astronauts. Built for NASA Space Apps Challenge.",
    tags: ["3D Visualization Tool"],
    link: "https://www.linkedin.com/posts/sherlins_nasaspaceapps-innovation-spacetech-activity-7389682373837221888-Sqtu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFGCnpMB2cjb1083m29Jlcx4934GOX6BPNc"
  },
  {
    id: "blk-proj-10",
    title: "Road Information System & Highway Asset Mapping — Tirunelveli District",
    desc: "A GIS-based system that maps roads and highway assets, monitors road conditions, identifies infrastructure issues, and provides accurate spatial data to support maintenance, planning, and transportation management in Tirunelveli District.",
    tags: ["Remote Sensing", "QGIS", "Google Earth Engine", "Python"],
    link: ""
  }
];

let state = {
  about: "",
  skills: [],
  projects: [],
  internships: [],
  certificates: [],
  messages: [],
};

let editMode = false;

/* ------------------ UTIL ------------------ */
function hashId(len = 7) {
  let s = "";
  const chars = "0123456789abcdef";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * 16)];
  return "#" + s;
}

function genId(prefix) {
  return prefix + "-" + Math.random().toString(36).slice(2, 9);
}

function updateFooterHeight() {
  const el = document.getElementById("footer-height");
  if (!el) return;
  el.textContent = 8 + state.skills.length + state.projects.length + state.internships.length + state.certificates.length;
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function escapeHTML(str = "") {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* ------------------ STORAGE LAYER ------------------ */
// All portfolio data is stored under a single key in localStorage.
// This works when index.html is opened directly in any browser
// (double-click the file) and persists across sessions on that
// same browser/device — but not across different browsers or computers.
async function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.log("No saved data yet, using defaults:", e);
  }
  return null;
}

async function saveData() {
  const payload = {
    about: state.about,
    skills: state.skills,
    projects: state.projects,
    internships: state.internships,
    certificates: state.certificates,
    messages: state.messages,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (e) {
    console.error("Storage error:", e);
    toast("⚠ Save failed");
    return false;
  }
}

/* ------------------ INIT ------------------ */
function defaultAbout() {
  return document.getElementById("about-text").innerHTML;
}

async function init() {
  const data = await loadData();

  if (data) {
    state.about = data.about || defaultAbout();
    state.skills = data.skills || [];
    state.projects = data.projects || [];
    state.internships = data.internships || DEFAULT_INTERNSHIPS.map(s => ({ ...s, hash: hashId() }));
    state.certificates = data.certificates || DEFAULT_CERTIFICATES.map(s => ({ ...s, hash: hashId() }));
    state.messages = data.messages || [];
  } else {
    state.about = defaultAbout();
    state.skills = DEFAULT_SKILLS.map(s => ({ ...s, hash: hashId() }));
    state.projects = DEFAULT_PROJECTS.map(p => ({ ...p, hash: hashId() }));
    state.internships = DEFAULT_INTERNSHIPS.map(s => ({ ...s, hash: hashId() }));
    state.certificates = DEFAULT_CERTIFICATES.map(s => ({ ...s, hash: hashId() }));
    state.messages = [];
    await saveData();
  }

  document.getElementById("about-text").innerHTML = state.about;

  renderSkills();
  renderProjects();
  renderInternships();
  renderCertificates();
  renderMessages();
}

init();

/* ------------------ EDIT MODE ------------------ */
const editToggle = document.getElementById("edit-toggle");
editToggle.addEventListener("click", () => setEditMode(!editMode));

function setEditMode(on) {
  editMode = on;
  document.querySelectorAll(".edit-only").forEach(el => el.classList.toggle("hidden", !on));
  document.getElementById("about-text").setAttribute("contenteditable", on ? "true" : "false");
  editToggle.querySelector("span").textContent = on ? "Editing…" : "Edit mode";
  editToggle.classList.toggle("btn-primary", on);
  editToggle.classList.toggle("btn-ghost", !on);
  renderSkills();
  renderProjects();
  renderInternships();
  renderCertificates();

  if (!on) {
    // save about text on exiting edit mode
    state.about = document.getElementById("about-text").innerHTML;
    saveData();
  }
}

/* ------------------ SKILLS ------------------ */
const skillsGrid = document.getElementById("skills-grid");
const skillsEmpty = document.getElementById("skills-empty");

function renderSkills() {
  skillsGrid.innerHTML = "";
  if (state.skills.length === 0) {
    skillsEmpty.classList.remove("hidden");
  } else {
    skillsEmpty.classList.add("hidden");
  }

  state.skills.forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-block";
    card.innerHTML = `
      <div class="skill-block-top">
        <span class="skill-hash">${skill.hash || hashId()}</span>
      </div>
      <div class="skill-name">${escapeHTML(skill.name)}</div>
      <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${skill.level}%"></div></div>
      <div class="skill-level-label">${skill.level}% proficiency</div>
      <div class="block-actions edit-only ${editMode ? "" : "hidden"}">
        <button class="icon-btn" data-action="edit-skill" data-id="${skill.id}" title="Update">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </button>
        <button class="icon-btn danger" data-action="delete-skill" data-id="${skill.id}" title="Delete">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M6 7.5v4M10 7.5v4M3.5 4l.7 9a1 1 0 001 .9h5.6a1 1 0 001-.9l.7-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
    skillsGrid.appendChild(card);
  });

  document.getElementById("stat-skills").textContent = state.skills.length;
  updateFooterHeight();
}

skillsGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "delete-skill") deleteSkill(id);
  if (btn.dataset.action === "edit-skill") openSkillModal(state.skills.find(s => s.id === id));
});

document.getElementById("add-skill-btn").addEventListener("click", () => openSkillModal(null));

async function deleteSkill(id) {
  state.skills = state.skills.filter(s => s.id !== id);
  renderSkills();
  await saveData();
  toast("Skill block removed");
}

function openSkillModal(skill) {
  const isEdit = !!skill;
  openModal(isEdit ? "Update skill block" : "Add skill block", `
    <div>
      <label for="m-skill-name">Skill name</label>
      <input type="text" id="m-skill-name" required value="${skill ? escapeHTML(skill.name) : ""}" placeholder="e.g. Smart Contracts">
    </div>
    <div>
      <label for="m-skill-level">Proficiency (%)</label>
      <input type="number" id="m-skill-level" required min="0" max="100" value="${skill ? skill.level : 50}">
    </div>
    <button type="submit" class="btn btn-primary btn-block">${isEdit ? "Save changes" : "Add block"}</button>
  `, async () => {
    const name = document.getElementById("m-skill-name").value.trim();
    const level = Math.min(100, Math.max(0, parseInt(document.getElementById("m-skill-level").value, 10)));
    if (!name) return false;

    if (isEdit) {
      skill.name = name;
      skill.level = level;
    } else {
      state.skills.push({ id: genId("skill"), name, level, hash: hashId() });
    }
    renderSkills();
    await saveData();
    toast(isEdit ? "Skill block updated" : "Skill block added");
    return true;
  });
}

/* ------------------ PROJECTS ------------------ */
const projectsGrid = document.getElementById("projects-grid");
const projectsEmpty = document.getElementById("projects-empty");

function renderProjects() {
  projectsGrid.innerHTML = "";
  if (state.projects.length === 0) {
    projectsEmpty.classList.remove("hidden");
  } else {
    projectsEmpty.classList.add("hidden");
  }

  state.projects.forEach((proj) => {
    const row = document.createElement("div");
    row.className = "project-block";
    row.innerHTML = `
      <div class="project-link-col">
        <div class="project-node"></div>
        <div class="project-link-line"></div>
      </div>
      <div class="project-content">
        <div class="project-top">
          <h3 class="project-title">${escapeHTML(proj.title)}</h3>
          <span class="project-hash">${proj.hash || hashId()}</span>
        </div>
        <p class="project-desc">${escapeHTML(proj.desc)}</p>
        <div class="project-tags">
          ${(proj.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("")}
        </div>
        ${proj.link ? `<a href="${escapeHTML(proj.link)}" target="_blank" rel="noopener" class="project-link">View project →</a>` : ""}
        <div class="block-actions edit-only ${editMode ? "" : "hidden"}">
          <button class="icon-btn" data-action="edit-project" data-id="${proj.id}" title="Update">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          </button>
          <button class="icon-btn danger" data-action="delete-project" data-id="${proj.id}" title="Delete">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M6 7.5v4M10 7.5v4M3.5 4l.7 9a1 1 0 001 .9h5.6a1 1 0 001-.9l.7-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    `;
    projectsGrid.appendChild(row);
  });

  // remove trailing connector line on last item
  const lastLine = projectsGrid.querySelector(".project-block:last-child .project-link-line");
  if (lastLine) lastLine.style.display = "none";

  document.getElementById("stat-projects").textContent = state.projects.length;
  updateFooterHeight();
}

projectsGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "delete-project") deleteProject(id);
  if (btn.dataset.action === "edit-project") openProjectModal(state.projects.find(p => p.id === id));
});

document.getElementById("add-project-btn").addEventListener("click", () => openProjectModal(null));

async function deleteProject(id) {
  state.projects = state.projects.filter(p => p.id !== id);
  renderProjects();
  await saveData();
  toast("Project block removed");
}

function openProjectModal(proj) {
  const isEdit = !!proj;
  openModal(isEdit ? "Update project block" : "Add project block", `
    <div>
      <label for="m-proj-title">Project title</label>
      <input type="text" id="m-proj-title" required value="${proj ? escapeHTML(proj.title) : ""}" placeholder="e.g. NFT Marketplace">
    </div>
    <div>
      <label for="m-proj-desc">Description</label>
      <textarea id="m-proj-desc" rows="3" required placeholder="What does this project do?">${proj ? escapeHTML(proj.desc) : ""}</textarea>
    </div>
    <div>
      <label for="m-proj-tags">Tech tags (comma separated)</label>
      <input type="text" id="m-proj-tags" value="${proj ? escapeHTML((proj.tags || []).join(", ")) : ""}" placeholder="e.g. Solidity, React, IPFS">
    </div>
    <div>
      <label for="m-proj-link">Link (optional)</label>
      <input type="url" id="m-proj-link" value="${proj && proj.link ? escapeHTML(proj.link) : ""}" placeholder="https://github.com/...">
    </div>
    <button type="submit" class="btn btn-primary btn-block">${isEdit ? "Save changes" : "Add block"}</button>
  `, async () => {
    const title = document.getElementById("m-proj-title").value.trim();
    const desc = document.getElementById("m-proj-desc").value.trim();
    const tags = document.getElementById("m-proj-tags").value.split(",").map(t => t.trim()).filter(Boolean);
    const link = document.getElementById("m-proj-link").value.trim();
    if (!title || !desc) return false;

    if (isEdit) {
      proj.title = title;
      proj.desc = desc;
      proj.tags = tags;
      proj.link = link;
    } else {
      state.projects.push({ id: genId("proj"), title, desc, tags, link, hash: hashId() });
    }
    renderProjects();
    await saveData();
    toast(isEdit ? "Project block updated" : "Project block added");
    return true;
  });
}

/* ------------------ INTERNSHIPS ------------------ */
const internshipsGrid = document.getElementById("internships-grid");
const internshipsEmpty = document.getElementById("internships-empty");

function renderInternships() {
  internshipsGrid.innerHTML = "";
  if (state.internships.length === 0) {
    internshipsEmpty.classList.remove("hidden");
  } else {
    internshipsEmpty.classList.add("hidden");
  }

  state.internships.forEach((intern) => {
    const row = document.createElement("div");
    row.className = "project-block";
    row.innerHTML = `
      <div class="project-link-col">
        <div class="project-node"></div>
        <div class="project-link-line"></div>
      </div>
      <div class="project-content">
        <div class="project-top">
          <h3 class="project-title">${escapeHTML(intern.title)}</h3>
          <span class="project-hash">${intern.hash || hashId()}</span>
        </div>
        <p class="cert-issuer" style="margin-bottom:8px;">${escapeHTML(intern.org)}${intern.mode ? " &middot; " + escapeHTML(intern.mode) : ""}</p>
        <p class="project-desc">${escapeHTML(intern.desc)}</p>
        <div class="project-tags">
          ${(intern.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("")}
        </div>
        ${intern.link ? `<a href="${escapeHTML(intern.link)}" target="_blank" rel="noopener" class="project-link">View details →</a>` : ""}
        <div class="block-actions edit-only ${editMode ? "" : "hidden"}">
          <button class="icon-btn" data-action="edit-internship" data-id="${intern.id}" title="Update">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          </button>
          <button class="icon-btn danger" data-action="delete-internship" data-id="${intern.id}" title="Delete">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M6 7.5v4M10 7.5v4M3.5 4l.7 9a1 1 0 001 .9h5.6a1 1 0 001-.9l.7-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    `;
    internshipsGrid.appendChild(row);
  });

  const lastLine = internshipsGrid.querySelector(".project-block:last-child .project-link-line");
  if (lastLine) lastLine.style.display = "none";

  updateFooterHeight();
}

internshipsGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "delete-internship") deleteInternship(id);
  if (btn.dataset.action === "edit-internship") openInternshipModal(state.internships.find(i => i.id === id));
});

document.getElementById("add-internship-btn").addEventListener("click", () => openInternshipModal(null));

async function deleteInternship(id) {
  state.internships = state.internships.filter(i => i.id !== id);
  renderInternships();
  await saveData();
  toast("Internship block removed");
}

function openInternshipModal(intern) {
  const isEdit = !!intern;
  openModal(isEdit ? "Update internship block" : "Add internship block", `
    <div>
      <label for="m-int-title">Role / title</label>
      <input type="text" id="m-int-title" required value="${intern ? escapeHTML(intern.title) : ""}" placeholder="e.g. Web Development Intern">
    </div>
    <div>
      <label for="m-int-org">Organisation</label>
      <input type="text" id="m-int-org" required value="${intern ? escapeHTML(intern.org) : ""}" placeholder="e.g. Prodigy InfoTech">
    </div>
    <div>
      <label for="m-int-mode">Mode (remote / on-site)</label>
      <input type="text" id="m-int-mode" value="${intern ? escapeHTML(intern.mode || "") : ""}" placeholder="e.g. Remote / Online">
    </div>
    <div>
      <label for="m-int-desc">Description</label>
      <textarea id="m-int-desc" rows="3" required placeholder="What did you work on?">${intern ? escapeHTML(intern.desc) : ""}</textarea>
    </div>
    <div>
      <label for="m-int-tags">Tech / skill tags (comma separated)</label>
      <input type="text" id="m-int-tags" value="${intern ? escapeHTML((intern.tags || []).join(", ")) : ""}" placeholder="e.g. HTML, CSS, JavaScript">
    </div>
    <div>
      <label for="m-int-link">Link (optional)</label>
      <input type="url" id="m-int-link" value="${intern && intern.link ? escapeHTML(intern.link) : ""}" placeholder="https://...">
    </div>
    <button type="submit" class="btn btn-primary btn-block">${isEdit ? "Save changes" : "Add block"}</button>
  `, async () => {
    const title = document.getElementById("m-int-title").value.trim();
    const org = document.getElementById("m-int-org").value.trim();
    const mode = document.getElementById("m-int-mode").value.trim();
    const desc = document.getElementById("m-int-desc").value.trim();
    const tags = document.getElementById("m-int-tags").value.split(",").map(t => t.trim()).filter(Boolean);
    const link = document.getElementById("m-int-link").value.trim();
    if (!title || !org || !desc) return false;

    if (isEdit) {
      intern.title = title;
      intern.org = org;
      intern.mode = mode;
      intern.desc = desc;
      intern.tags = tags;
      intern.link = link;
    } else {
      state.internships.push({ id: genId("intern"), title, org, mode, desc, tags, link, hash: hashId() });
    }
    renderInternships();
    await saveData();
    toast(isEdit ? "Internship block updated" : "Internship block added");
    return true;
  });
}

/* ------------------ CERTIFICATES ------------------ */
const certificatesGrid = document.getElementById("certificates-grid");
const certificatesEmpty = document.getElementById("certificates-empty");

function renderCertificates() {
  certificatesGrid.innerHTML = "";
  if (state.certificates.length === 0) {
    certificatesEmpty.classList.remove("hidden");
  } else {
    certificatesEmpty.classList.add("hidden");
  }

  state.certificates.forEach((cert) => {
    const card = document.createElement("div");
    card.className = "cert-block";
    card.innerHTML = `
      <div class="cert-block-top">
        <span class="cert-hash">${cert.hash || hashId()}</span>
        ${cert.badge ? `<span class="cert-badge">${escapeHTML(cert.badge)}</span>` : ""}
      </div>
      <div class="cert-name">${escapeHTML(cert.name)}</div>
      <div class="cert-issuer">${escapeHTML(cert.issuer)}</div>
      <div class="cert-meta">
        ${(cert.meta || []).map(m => `<span class="cert-meta-item">${escapeHTML(m)}</span>`).join("")}
      </div>
      <div class="block-actions edit-only ${editMode ? "" : "hidden"}">
        <button class="icon-btn" data-action="edit-certificate" data-id="${cert.id}" title="Update">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </button>
        <button class="icon-btn danger" data-action="delete-certificate" data-id="${cert.id}" title="Delete">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M6 7.5v4M10 7.5v4M3.5 4l.7 9a1 1 0 001 .9h5.6a1 1 0 001-.9l.7-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
    certificatesGrid.appendChild(card);
  });

  updateFooterHeight();
}

certificatesGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "delete-certificate") deleteCertificate(id);
  if (btn.dataset.action === "edit-certificate") openCertificateModal(state.certificates.find(c => c.id === id));
});

document.getElementById("add-certificate-btn").addEventListener("click", () => openCertificateModal(null));

async function deleteCertificate(id) {
  state.certificates = state.certificates.filter(c => c.id !== id);
  renderCertificates();
  await saveData();
  toast("Certificate block removed");
}

function openCertificateModal(cert) {
  const isEdit = !!cert;
  openModal(isEdit ? "Update certificate block" : "Add certificate block", `
    <div>
      <label for="m-cert-name">Certificate name</label>
      <input type="text" id="m-cert-name" required value="${cert ? escapeHTML(cert.name) : ""}" placeholder="e.g. Introduction to IoT">
    </div>
    <div>
      <label for="m-cert-issuer">Issued by</label>
      <input type="text" id="m-cert-issuer" required value="${cert ? escapeHTML(cert.issuer) : ""}" placeholder="e.g. NPTEL — IIT Kharagpur">
    </div>
    <div>
      <label for="m-cert-badge">Badge / honor (optional)</label>
      <input type="text" id="m-cert-badge" value="${cert ? escapeHTML(cert.badge || "") : ""}" placeholder="e.g. Elite, Top 5% Topper">
    </div>
    <div>
      <label for="m-cert-meta">Details (comma separated: score, date, duration...)</label>
      <input type="text" id="m-cert-meta" value="${cert ? escapeHTML((cert.meta || []).join(", ")) : ""}" placeholder="e.g. 85% score, Jul–Oct 2025, 12-week course">
    </div>
    <button type="submit" class="btn btn-primary btn-block">${isEdit ? "Save changes" : "Add block"}</button>
  `, async () => {
    const name = document.getElementById("m-cert-name").value.trim();
    const issuer = document.getElementById("m-cert-issuer").value.trim();
    const badge = document.getElementById("m-cert-badge").value.trim();
    const meta = document.getElementById("m-cert-meta").value.split(",").map(t => t.trim()).filter(Boolean);
    if (!name || !issuer) return false;

    if (isEdit) {
      cert.name = name;
      cert.issuer = issuer;
      cert.badge = badge;
      cert.meta = meta;
    } else {
      state.certificates.push({ id: genId("cert"), name, issuer, badge, meta, hash: hashId() });
    }
    renderCertificates();
    await saveData();
    toast(isEdit ? "Certificate block updated" : "Certificate block added");
    return true;
  });
}

/* ------------------ CONTACT / MESSAGES ------------------ */
const messagesList = document.getElementById("messages-list");
const messagesEmpty = document.getElementById("messages-empty");

function renderMessages() {
  messagesList.innerHTML = "";
  if (state.messages.length === 0) {
    messagesEmpty.classList.remove("hidden");
  } else {
    messagesEmpty.classList.add("hidden");
  }
  // newest first
  [...state.messages].reverse().forEach((m) => {
    const item = document.createElement("div");
    item.className = "message-item";
    item.innerHTML = `
      <div class="message-item-top">
        <strong>${escapeHTML(m.name)}</strong>
        <span>${hashId(6)}</span>
      </div>
      <p>${escapeHTML(m.message)}</p>
      <p style="margin-top:6px;font-size:11px;">${escapeHTML(m.email)}</p>
    `;
    messagesList.appendChild(item);
  });
}

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const message = document.getElementById("cf-message").value.trim();
  if (!name || !email || !message) return;

  state.messages.push({ id: genId("msg"), name, email, message, ts: Date.now() });
  renderMessages();
  await saveData();

  document.getElementById("contact-note").textContent = "✓ Message added to ledger.";
  e.target.reset();
  setTimeout(() => { document.getElementById("contact-note").textContent = ""; }, 3000);
});

/* ------------------ MODAL ------------------ */
const modalBackdrop = document.getElementById("modal-backdrop");
const modalForm = document.getElementById("modal-form");
const modalTitle = document.getElementById("modal-title");

function openModal(title, formHTML, onSubmit) {
  modalTitle.textContent = title;
  modalForm.innerHTML = formHTML;
  modalBackdrop.classList.remove("hidden");

  const handler = async (e) => {
    e.preventDefault();
    const ok = await onSubmit();
    if (ok !== false) closeModal();
  };
  modalForm.onsubmit = handler;

  // focus first field
  const first = modalForm.querySelector("input, textarea");
  if (first) setTimeout(() => first.focus(), 50);
}

function closeModal() {
  modalBackdrop.classList.add("hidden");
  modalForm.innerHTML = "";
  modalForm.onsubmit = null;
}

document.getElementById("modal-close").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalBackdrop.classList.contains("hidden")) closeModal();
});

/* ------------------ MOBILE NAV ------------------ */
const navBurger = document.getElementById("nav-burger");
const navLinks = document.querySelector(".nav-links");
navBurger.addEventListener("click", () => {
  navLinks.classList.toggle("show-mobile");
  navLinks.style.display = navLinks.classList.contains("show-mobile") ? "flex" : "none";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "100%";
  navLinks.style.left = "0";
  navLinks.style.right = "0";
  navLinks.style.background = "var(--ink-soft)";
  navLinks.style.padding = "16px 24px";
  navLinks.style.borderBottom = "1px solid var(--card-border)";
});

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      navLinks.style.display = "none";
      navLinks.classList.remove("show-mobile");
    }
  });
});
