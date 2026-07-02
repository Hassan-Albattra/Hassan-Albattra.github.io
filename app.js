// ============================================================
//  Hassan AlBattra — DevOps Portfolio JS
// ============================================================

// ---- Scroll Progress Bar ----
const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";

  // Navbar background on scroll
  const nb = document.getElementById("navbar");
  nb.style.background = scrollTop > 20
    ? "rgba(13,17,23,0.97)"
    : "rgba(13,17,23,0.88)";

  // Nav active link
  let sy = scrollTop + 100;
  document.querySelectorAll("section[id]").forEach(sec => {
    if (sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      const a = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (a) a.classList.add("active");
    }
  });
});

// ---- Typed Text ----
const roles = [
  "DevOps Engineer",
  "Cloud Architect",
  "MLOps Specialist",
  "MSc Researcher @ Queen's",
  "CI/CD Pipeline Builder",
  "Kubernetes Engineer",
  "Security-First Developer"
];
let ri = 0, ci = 0, del = false;
const el = document.getElementById("typedText");

function type() {
  const cur = roles[ri];
  if (!del) {
    el.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { setTimeout(() => { del = true; type(); }, 2000); return; }
  } else {
    el.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 40 : 75);
}
type();

// ---- Matrix Rain Background ----
const matrixBg = document.getElementById("matrixBg");
const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]//\\;:";
const cols  = Math.floor(window.innerWidth / 20);

for (let i = 0; i < Math.min(cols, 60); i++) {
  const col = document.createElement("div");
  col.classList.add("matrix-col");
  // Random string of chars
  let str = "";
  for (let j = 0; j < Math.floor(Math.random() * 20 + 10); j++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  col.textContent = str;
  col.style.cssText = `
    left: ${(i / cols) * 100}%;
    animation-duration: ${Math.random() * 15 + 8}s;
    animation-delay: ${Math.random() * 10}s;
    font-size: ${Math.random() * 4 + 10}px;
    opacity: ${Math.random() * 0.06 + 0.02};
  `;
  matrixBg.appendChild(col);
}

// ---- Mobile Nav ----
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger.addEventListener("click", () => mobileNav.classList.toggle("open"));
document.querySelectorAll(".mob-link").forEach(l =>
  l.addEventListener("click", () => mobileNav.classList.remove("open"))
);

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});

// ---- Skill Bars on Scroll ----
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll(".bar-fill").forEach(b => {
        b.style.width = b.dataset.w + "%";
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const skillSec = document.querySelector("#skills");
if (skillSec) barObserver.observe(skillSec);

// ---- Reveal on Scroll ----
document.querySelectorAll(".edu-card, .proj-card, .skill-cat, .cert-card, .contact-item, .publication, .about-card").forEach(el => {
  el.classList.add("reveal");
});
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 70);
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

// ---- Modal Data ----
const modals = {
  m1: {
    title: "DevOps Sentiment K8s GitOps",
    tag: "CI/CD · GitOps · Kubernetes",
    desc: "Built a complete Gitea Actions CI pipeline for a FastAPI/TextBlob ML microservice: automated linting (ruff), static type checking (mypy), pytest with coverage, multi-stage Docker build (non-root, python:3.11-slim), image push to private registry, and SBOM generation (CycloneDX).",
    bullets: [
      "Deployed to k3d Kubernetes via ArgoCD GitOps with canary release strategy",
      "Configured Prometheus + Grafana observability dashboard",
      "OpenTelemetry instrumentation for distributed tracing",
      "SBOM generation with CycloneDX for supply chain security"
    ],
    tech: ["k3d", "ArgoCD", "Prometheus", "Grafana", "Docker", "FastAPI", "CycloneDX", "OpenTelemetry", "GitHub Actions"],
    links: [
      { url: "https://github.com/Hassan-Albattra/devops-sentiment-k8s-gitops", icon: "fab fa-github", label: "View on GitHub", cls: "" }
    ]
  },
  m2: {
    title: "Cyber-SOC-Chatbot",
    tag: "Cloud · LLM · AWS · Terraform",
    desc: "End-to-end AWS cloud LLM system for cybersecurity operations. Provisioned full AWS infrastructure with Terraform following the Well-Architected Framework. Processed 20M+ cybersecurity events with PySpark on AWS EMR, then fine-tuned TinyLlama-1.1B with QLoRA/PEFT.",
    bullets: [
      "Provisioned VPC, public/private subnets, IGW, security groups, IAM roles, S3, EMR with Terraform",
      "Preprocessed 20M+ cybersecurity events using PySpark on AWS EMR",
      "Fine-tuned TinyLlama-1.1B with QLoRA/PEFT, exported to GGUF, deployed via Ollama on EC2 g4dn.xlarge",
      "Served model through OpenWebUI (Docker) with browser chat interface"
    ],
    tech: ["AWS", "Terraform", "EMR", "PySpark", "TinyLlama", "QLoRA", "PEFT", "GGUF", "Ollama", "OpenWebUI", "EC2", "S3", "VPC", "IAM"],
    links: [
      { url: "https://github.com/Hassan-Albattra/Cyber-SOC-Chatbot", icon: "fab fa-github", label: "View on GitHub", cls: "" }
    ]
  },
  m3: {
    title: "EdgePhish-5G — Dockerized ML Security Pipeline",
    tag: "ML · Docker · ONNX · Published",
    desc: "Containerized a hybrid BERT–TF-IDF phishing detection pipeline designed for real-time 5G Edge deployment. ONNX Runtime optimization reduced P99 latency from 17.2ms to 7.3ms (2.36×), meeting ≤10ms SLA requirements.",
    bullets: [
      "Hybrid BERT–TF-IDF model for phishing URL detection",
      "ONNX Runtime optimization: P99 latency 17.2ms → 7.3ms (2.36× improvement)",
      "Single-command reproducible deployment with environment-variable config",
      "Published dataset of 339K URLs on Zenodo",
      "Paper submitted to ITC 2026 — H. AlBattra, R. Abul Seoud, D. A. Salem"
    ],
    tech: ["BERT", "TF-IDF", "ONNX Runtime", "Docker", "Python", "HuggingFace", "Zenodo"],
    links: [
      { url: "https://zenodo.org/records/19916344", icon: "fa fa-database", label: "Dataset on Zenodo (339K URLs)", cls: "data" }
    ]
  },
  m4: {
    title: "GuardedRAG — Safe Retrieval-Augmented Generation",
    tag: "RAG · GenAI · Safety Pipeline",
    desc: "Built a secure 5-stage RAG pipeline with content moderation at every layer. Ingests PDF documents, chunks with LangChain, creates Sentence Transformer embeddings, and stores in ChromaDB for semantic retrieval. Orchestrates Gemini 2.5 Flash with OpenAI Moderation API.",
    bullets: [
      "5-stage safety pipeline: scope check → moderation → retrieval → generation → output check",
      "PDF ingestion, LangChain chunking, Sentence Transformer embeddings",
      "Semantic retrieval from ChromaDB vector store",
      "Orchestrates Gemini 2.5 Flash + OpenAI Moderation API",
      "Deployed via Gradio with live demo"
    ],
    tech: ["LangChain", "ChromaDB", "Gemini 2.5", "OpenAI Moderation", "Sentence Transformers", "Gradio", "RAG"],
    links: [
      { url: "https://github.com/Hassan-Albattra/GuardedRAG_Tutor", icon: "fab fa-github", label: "View on GitHub", cls: "" },
      { url: "https://huggingface.co/spaces/hassanalbattra/GuardedRAG_Tutor", icon: "fa fa-rocket", label: "Live Demo — HuggingFace", cls: "demo" }
    ]
  },
  m5: {
    title: "Crime Type Classification — ML for Police Resource Allocation",
    tag: "ML · XGBoost · Time Series",
    desc: "Built a leakage-aware, chronological ML pipeline on 241K Toronto crime records with 393 features. Compared 8 model configurations under severe class imbalance across 5 crime types.",
    bullets: [
      "241K Toronto crime records, 393 engineered features",
      "XGBoost with inverse-frequency class weighting achieved best macro F1 (0.426)",
      "Engineered cyclical temporal features and one-hot spatial encoding",
      "Evaluated SMOTE resampling and MLP baselines",
      "GridSearchCV + TimeSeriesSplit for leakage-aware validation"
    ],
    tech: ["XGBoost", "SMOTE", "scikit-learn", "GridSearchCV", "TimeSeriesSplit", "MLP", "Python", "Pandas"],
    links: [
      { url: "https://github.com/Hassan-Albattra/crime-type-classification", icon: "fab fa-github", label: "View on GitHub", cls: "" }
    ]
  }
};

// Modal open/close
const overlay   = document.getElementById("modalOverlay");
const mClose    = document.getElementById("modalClose");
const mContent  = document.getElementById("modalContent");

document.querySelectorAll(".proj-card[data-modal]").forEach(card => {
  card.addEventListener("click", () => {
    const d = modals[card.dataset.modal];
    if (!d) return;
    const bullets = d.bullets.map(b => `<li>${b}</li>`).join("");
    const tech    = d.tech.map(t => `<span>${t}</span>`).join("");
    const links   = d.links
      ? `<div class="m-links">${d.links.map(l =>
          `<a href="${l.url}" target="_blank" class="m-link-btn ${l.cls}"><i class="${l.icon}"></i> ${l.label}</a>`
        ).join("")}</div>`
      : "";
    mContent.innerHTML = `
      <h3>${d.title}</h3>
      <span class="m-tag">${d.tag}</span>
      <p>${d.desc}</p>
      <ul>${bullets}</ul>
      <div class="m-tech">${tech}</div>
      ${links}
    `;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

mClose.addEventListener("click", closeModal);
overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ---- Contact Form ----
document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const btn  = document.getElementById("submitBtn");

  const name    = document.getElementById("formName").value.trim();
  const email   = document.getElementById("formEmail").value.trim();
  const subject = document.getElementById("formSubject").value.trim() || "Portfolio Contact — Hassan AlBattra";
  const message = document.getElementById("formMessage").value.trim();

  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
  btn.disabled  = true;

  const openMailto = () => {
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href =
      `mailto:hassan.albattra@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    btn.innerHTML = '<i class="fa fa-envelope"></i> Opening Email App...';
    btn.style.background = "rgba(167,139,250,0.3)";
    form.reset();
  };

  // If opened as a local file, go straight to email app (CORS blocks FormSubmit)
  if (window.location.protocol === "file:") {
    openMailto();
    setTimeout(() => {
      btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      btn.disabled = false;
    }, 3500);
    return;
  }

  // Deployed: try FormSubmit.co
  try {
    const res = await fetch(form.action, {
      method:  "POST",
      body:    new FormData(form),
      headers: { "Accept": "application/json" }
    });
    if (res.ok) {
      btn.innerHTML = '<i class="fa fa-check"></i> Message Sent!';
      btn.style.background = "#238636";
      btn.style.color = "#fff";
      form.reset();
    } else {
      throw new Error("server");
    }
  } catch {
    openMailto();
  }

  setTimeout(() => {
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
    btn.style.background = "";
    btn.style.color = "";
    btn.disabled = false;
  }, 4000);
});
