const $ = id => document.getElementById(id);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Curated Cohort Datasets for Gaussian Distribution Modeling
const datasets = {
  standard: [
    ["STU001", 44.5], ["STU002", 45.0], ["STU003", 46.8], ["STU004", 47.3], ["STU005", 50.3],
    ["STU006", 50.9], ["STU007", 51.1], ["STU008", 52.1], ["STU009", 53.3], ["STU010", 54.2],
    ["STU011", 55.3], ["STU012", 55.8], ["STU013", 57.1], ["STU014", 57.9], ["STU015", 59.4],
    ["STU016", 59.9], ["STU017", 60.8], ["STU018", 60.8], ["STU019", 61.3], ["STU020", 61.5],
    ["STU021", 62.4], ["STU022", 62.4], ["STU023", 62.4], ["STU024", 62.5], ["STU025", 63.4],
    ["STU026", 64.3], ["STU027", 64.4], ["STU028", 64.5], ["STU029", 65.2], ["STU030", 65.2],
    ["STU031", 65.3], ["STU032", 66.3], ["STU033", 66.6], ["STU034", 67.8], ["STU035", 68.8],
    ["STU036", 69.3], ["STU037", 70.1], ["STU038", 70.4], ["STU039", 70.5], ["STU040", 70.9],
    ["STU041", 71.8], ["STU042", 71.9], ["STU043", 72.0], ["STU044", 72.1], ["STU045", 72.5],
    ["STU046", 74.0], ["STU047", 74.5], ["STU048", 75.3], ["STU049", 75.8], ["STU050", 76.9],
    ["STU051", 77.2], ["STU052", 77.9], ["STU053", 79.2], ["STU054", 79.7], ["STU055", 80.4],
    ["STU056", 80.7], ["STU057", 85.6], ["STU058", 86.3], ["STU059", 87.0], ["STU060", 90.2]
  ],
  large: [
    ["UNI001", 30.0], ["UNI002", 32.7], ["UNI003", 36.8], ["UNI004", 41.6], ["UNI005", 42.2],
    ["UNI006", 43.8], ["UNI007", 45.2], ["UNI008", 46.2], ["UNI009", 47.1], ["UNI010", 47.6],
    ["UNI011", 48.0], ["UNI012", 48.4], ["UNI013", 48.6], ["UNI014", 49.1], ["UNI015", 49.3],
    ["UNI016", 50.7], ["UNI017", 50.8], ["UNI018", 50.8], ["UNI019", 50.9], ["UNI020", 51.5],
    ["UNI021", 52.9], ["UNI022", 53.6], ["UNI023", 53.8], ["UNI024", 53.9], ["UNI025", 54.2],
    ["UNI026", 54.3], ["UNI027", 54.6], ["UNI028", 54.7], ["UNI029", 55.1], ["UNI030", 55.6],
    ["UNI031", 56.1], ["UNI032", 56.2], ["UNI033", 56.3], ["UNI034", 56.9], ["UNI035", 56.9],
    ["UNI036", 57.7], ["UNI037", 59.5], ["UNI038", 59.6], ["UNI039", 59.7], ["UNI040", 60.1],
    ["UNI041", 60.2], ["UNI042", 60.4], ["UNI043", 61.0], ["UNI044", 61.3], ["UNI045", 62.0],
    ["UNI046", 62.4], ["UNI047", 63.2], ["UNI048", 63.6], ["UNI049", 63.8], ["UNI050", 64.2],
    ["UNI051", 65.3], ["UNI052", 65.5], ["UNI053", 65.9], ["UNI054", 66.1], ["UNI055", 67.7],
    ["UNI056", 67.9], ["UNI057", 68.2], ["UNI058", 69.3], ["UNI059", 69.3], ["UNI060", 69.7],
    ["UNI061", 70.1], ["UNI062", 70.6], ["UNI063", 70.7], ["UNI064", 71.1], ["UNI065", 71.8],
    ["UNI066", 73.2], ["UNI067", 74.8], ["UNI068", 75.5], ["UNI069", 76.2], ["UNI070", 76.4],
    ["UNI071", 76.4], ["UNI072", 77.5], ["UNI073", 77.7], ["UNI074", 78.0], ["UNI075", 78.7],
    ["UNI076", 79.0], ["UNI077", 79.1], ["UNI078", 79.4], ["UNI079", 79.5], ["UNI080", 79.9],
    ["UNI081", 79.9], ["UNI082", 81.0], ["UNI083", 81.2], ["UNI084", 81.4], ["UNI085", 81.4],
    ["UNI086", 82.4], ["UNI087", 82.6], ["UNI088", 84.6], ["UNI089", 85.6], ["UNI090", 85.6],
    ["UNI091", 85.7], ["UNI092", 87.8], ["UNI093", 87.9], ["UNI094", 89.0], ["UNI095", 89.2],
    ["UNI096", 93.7], ["UNI097", 95.0], ["UNI098", 95.3], ["UNI099", 95.7], ["UNI100", 97.8]
  ],
  honors: [
    ["HON001", 61.4], ["HON002", 63.3], ["HON003", 63.4], ["HON004", 64.7], ["HON005", 64.7],
    ["HON006", 64.9], ["HON007", 65.4], ["HON008", 66.2], ["HON009", 66.3], ["HON010", 70.2],
    ["HON011", 70.7], ["HON012", 71.1], ["HON013", 71.2], ["HON014", 71.6], ["HON015", 72.0],
    ["HON016", 72.7], ["HON017", 73.6], ["HON018", 73.6], ["HON019", 73.8], ["HON020", 73.8],
    ["HON021", 73.8], ["HON022", 75.0], ["HON023", 75.3], ["HON024", 76.7], ["HON025", 77.4],
    ["HON026", 77.6], ["HON027", 78.2], ["HON028", 78.6], ["HON029", 78.9], ["HON030", 80.5],
    ["HON031", 81.0], ["HON032", 81.3], ["HON033", 82.3], ["HON034", 82.3], ["HON035", 83.2],
    ["HON036", 83.6], ["HON037", 84.5], ["HON038", 85.3], ["HON039", 85.8], ["HON040", 86.0],
    ["HON041", 86.6], ["HON042", 86.7], ["HON043", 87.1], ["HON044", 87.5], ["HON045", 91.8],
    ["HON046", 94.6], ["HON047", 95.1], ["HON048", 96.0], ["HON049", 97.5], ["HON050", 99.0]
  ],
  challenging: [
    ["CHL001", 29.9], ["CHL002", 32.8], ["CHL003", 34.4], ["CHL004", 36.6], ["CHL005", 39.0],
    ["CHL006", 41.2], ["CHL007", 44.1], ["CHL008", 44.1], ["CHL009", 44.4], ["CHL010", 45.3],
    ["CHL011", 45.9], ["CHL012", 46.5], ["CHL013", 47.3], ["CHL014", 48.3], ["CHL015", 48.6],
    ["CHL016", 49.3], ["CHL017", 49.4], ["CHL018", 49.9], ["CHL019", 50.9], ["CHL020", 51.1],
    ["CHL021", 51.8], ["CHL022", 51.9], ["CHL023", 52.1], ["CHL024", 54.0], ["CHL025", 54.1],
    ["CHL026", 54.8], ["CHL027", 54.8], ["CHL028", 55.5], ["CHL029", 57.5], ["CHL030", 57.6],
    ["CHL031", 57.6], ["CHL032", 58.9], ["CHL033", 59.5], ["CHL034", 59.5], ["CHL035", 60.4],
    ["CHL036", 60.4], ["CHL037", 61.0], ["CHL038", 61.6], ["CHL039", 63.3], ["CHL040", 63.7],
    ["CHL041", 64.9], ["CHL042", 65.3], ["CHL043", 66.3], ["CHL044", 67.3], ["CHL045", 70.1],
    ["CHL046", 70.7], ["CHL047", 72.0], ["CHL048", 72.4], ["CHL049", 74.1], ["CHL050", 78.5]
  ]
};

let chart = null, running = false, lastAnalysis = null;

function loadDataset(name, btnEl) {
  const data = datasets[name];
  if (!data) return;

  $("studentBody").innerHTML = "";
  data.forEach(([reg, mark]) => addRow(reg, mark));
  
  document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  setMessage(`Dataset loaded: ${data.length} student records (${name.toUpperCase()}). Click "Run grading process" to analyze.`);
  $("resultStatus").textContent = "Awaiting Execution";
  clearStages();
}

function generateCustomGaussian() {
  const nStr = prompt("Enter cohort size N (e.g., 50 to 150):", "75");
  if (!nStr) return;
  const n = parseInt(nStr, 10);
  if (isNaN(n) || n < 5 || n > 500) {
    alert("Please enter a valid sample size between 5 and 500.");
    return;
  }

  const meanStr = prompt("Enter target population mean μ (e.g. 68.0):", "68.0");
  if (!meanStr) return;
  const mean = parseFloat(meanStr);
  if (isNaN(mean) || mean < 20 || mean > 85) {
    alert("Please enter a valid mean between 20 and 85.");
    return;
  }

  const stdStr = prompt("Enter target standard deviation σ (e.g. 12.0):", "12.0");
  if (!stdStr) return;
  const std = parseFloat(stdStr);
  if (isNaN(std) || std < 2 || std > 25) {
    alert("Please enter a standard deviation between 2 and 25.");
    return;
  }

  // Box-Muller transformation for exact Gaussian variates
  const scores = [];
  for (let i = 0; i < n; i++) {
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    let score = mean + z * std;
    score = Math.max(15, Math.min(100, Math.round(score * 10) / 10));
    scores.push(score);
  }
  scores.sort((a, b) => a - b);

  $("studentBody").innerHTML = "";
  scores.forEach((s, idx) => {
    const reg = `SYN${String(idx + 1).padStart(3, '0')}`;
    addRow(reg, s);
  });

  document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
  $("presetCustom").classList.add("active");
  setMessage(`Synthesized Gaussian dataset: N = ${n}, Target μ = ${mean}, Target σ = ${std}. Click "Run grading process".`);
  clearStages();
}

function addRow(reg = "", mark = "") {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input class="reg-input" aria-label="Register number" value="${escapeAttr(reg)}"></td>
    <td><input class="mark-input" type="number" min="0" max="100" step="0.01" aria-label="Marks" value="${mark}"></td>
    <td style="text-align: center;"><button class="remove-row" title="Remove student">×</button></td>
  `;
  $("studentBody").appendChild(tr);
  updateRecordCount();
}

function getStudents() {
  return [...$("studentBody").querySelectorAll("tr")].map(tr => ({
    register_no: tr.querySelector(".reg-input").value.trim(),
    marks: tr.querySelector(".mark-input").value
  }));
}

function updateRecordCount() {
  const count = $("studentBody").querySelectorAll("tr").length;
  $("recordCount").textContent = `${count} record${count === 1 ? '' : 's'} loaded`;
}

function setMessage(text) {
  $("processMessage").textContent = text;
}

function setStage(i) {
  document.querySelectorAll(".step").forEach((el, n) => {
    el.classList.toggle("active", n === i);
    if (n < i) el.classList.add("done");
    else el.classList.remove("done");
  });
  $("progressBar").style.width = `${(i / 6) * 100}%`;
}

function clearStages() {
  document.querySelectorAll(".step").forEach(el => el.classList.remove("active", "done"));
  $("progressBar").style.width = "0%";
}

async function runProject() {
  if (running) return;
  running = true;
  $("runBtn").disabled = true;
  $("runBtn").textContent = "Processing pipeline…";
  clearStages();
  lastAnalysis = null;

  const stages = [
    ["Stage 01: Discrete Sample Vector Ingestion", "Reading student records into observation vector x = [x₁, ..., xₙ]."],
    ["Stage 02: Support Domain Verification", "Testing bounds constraint xᵢ ∈ [0, 100] and injective register IDs."],
    ["Stage 03: Parametric Moment Estimation", "Computing central moments: sample mean μ, variance σ², standard deviation s, and skewness γ₁."],
    ["Stage 04: Continuous Gaussian PDF Fitting", "Fitting normal probability density curve f(x; μ, σ) to the empirical frequency distribution."],
    ["Stage 05: Standardized z-Score Partitioning", "Mapping standard score z = (x − μ)/σ against norm-referenced thresholds."],
    ["Stage 06: Cumulative Distribution Φ(z) Synthesis", "Tabulating Gaussian percentiles, empirical vs. theoretical allocations, and CSV output."]
  ];

  try {
    for (let i = 0; i < stages.length; i++) {
      setStage(i);
      setMessage(`${stages[i][0]} — ${stages[i][1]}`);
      await sleep(650);

      if (i === 1) {
        const rows = getStudents();
        if (rows.length < 2) {
          throw new Error("Sample size insufficient. Statistical inference requires at least N ≥ 2 records.");
        }
        if (rows.some(r => !r.register_no || r.marks === "" || !Number.isFinite(Number(r.marks)) || Number(r.marks) < 0 || Number(r.marks) > 100)) {
          throw new Error("Invalid score values: All marks must satisfy the support domain constraint 0 ≤ xᵢ ≤ 100.");
        }
        const ids = rows.map(r => r.register_no);
        if (new Set(ids).size !== ids.length) {
          throw new Error("Duplicate identifiers detected. Student register numbers must be injective (unique).");
        }
      }

      if (i === 2) {
        const marks = getStudents().map(r => Number(r.marks));
        const n = marks.length;
        const mean = marks.reduce((a, b) => a + b, 0) / n;
        const varPop = marks.reduce((a, x) => a + (x - mean) ** 2, 0) / n;
        const sdPop = Math.sqrt(varPop);
        if (sdPop === 0) {
          throw new Error("Sample variance is zero (σ² = 0). Invariant marks cannot form a Gaussian distribution.");
        }
        setMessage(`Parametric moments computed: Mean μ = ${mean.toFixed(2)}, Population Std Dev σ = ${sdPop.toFixed(2)}, Variance σ² = ${varPop.toFixed(2)}.`);
        await sleep(350);
      }

      if (i === 4) {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ students: getStudents() })
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Statistical analysis execution failed.");
        }
        lastAnalysis = data.analysis;
        await sleep(200);
      }

      document.querySelectorAll(".step")[i].classList.remove("active");
      document.querySelectorAll(".step")[i].classList.add("done");
      $("progressBar").style.width = `${((i + 1) / 6) * 100}%`;
    }

    displayAnalysis(lastAnalysis);
    setMessage(`✓ Pipeline complete: Analyzed N = ${lastAnalysis.total} students (Mean μ = ${lastAnalysis.mean}, Std Dev σ = ${lastAnalysis.std_pop}).`);
    $("resultStatus").textContent = "Evaluation Complete";
  } catch (err) {
    setMessage("Process halted: " + err.message);
    alert(err.message);
    document.querySelectorAll(".step.active").forEach(el => el.classList.remove("active"));
  } finally {
    running = false;
    $("runBtn").disabled = false;
    $("runBtn").textContent = "↻ Re-run mathematical pipeline";
  }
}

function displayAnalysis(a) {
  // Measures of Central Tendency
  $("totalStudents").textContent = a.total;
  $("meanValue").textContent = a.mean.toFixed(2);
  $("medianValue").textContent = a.median.toFixed(2);
  $("quartilesValue").textContent = `${a.q1.toFixed(1)} / ${a.q3.toFixed(1)} (IQR: ${a.iqr.toFixed(1)})`;

  // Measures of Dispersion
  $("stdValue").textContent = a.std_pop.toFixed(2);
  $("sampleStdValue").textContent = a.std_sample.toFixed(2);
  $("varianceValue").textContent = a.var_pop.toFixed(2);
  $("semValue").textContent = a.sem.toFixed(3);

  // Distribution Shape & Extrema
  $("skewnessValue").textContent = a.skewness.toFixed(3);
  $("kurtosisValue").textContent = a.kurtosis.toFixed(3);
  $("cvValue").textContent = `${a.cv.toFixed(2)}%`;
  $("rangeValue").textContent = `${a.range.toFixed(1)} [${a.lowest.toFixed(1)} – ${a.highest.toFixed(1)}]`;

  // Boundary Cutoff Cards
  const b = a.boundaries;
  const ga = a.grade_analysis;
  const gradeDefs = [
    { grade: "A+", rule: "x ≥ μ + 1.5σ", z: "z ≥ +1.50", cutoff: `≥ ${b["A+"]}`, th: "6.68%", tag: "Top Grade" },
    { grade: "A",  rule: "μ + 0.5σ ≤ x < μ + 1.5σ", z: "+0.50 ≤ z < +1.50", cutoff: `${b.A} to < ${b["A+"]}`, th: "24.17%", tag: "High Merit" },
    { grade: "B",  rule: "μ − 0.5σ ≤ x < μ + 0.5σ", z: "−0.50 ≤ z < +0.50", cutoff: `${b.B} to < ${b.A}`, th: "38.29%", tag: "Average" },
    { grade: "C",  rule: "μ − 1.5σ ≤ x < μ − 0.5σ", z: "−1.50 ≤ z < −0.50", cutoff: `${b.C} to < ${b.B}`, th: "24.17%", tag: "Low Pass" },
    { grade: "D",  rule: "x < μ − 1.5σ", z: "z < −1.50", cutoff: `< ${b.C}`, th: "6.68%", tag: "Remedial" }
  ];

  $("boundaryGrid").innerHTML = gradeDefs.map(item => {
    const stat = ga[item.grade] || { count: 0, empirical_pct: 0 };
    return `
      <div class="boundary">
        <div class="boundary-header"><b>${item.grade}</b><span class="badge">${item.tag}</span></div>
        <span class="math-rule">${item.rule}</span>
        <span class="z-rule">${item.z}</span>
        <strong class="cutoff">${item.cutoff}</strong>
        <small class="prob-tag">Theoretical: ${item.th}</small>
        <div class="emp-stat">Empirical: ${stat.count} (${stat.empirical_pct}%)</div>
      </div>
    `;
  }).join("");

  // Student Results Table with Detailed Metrics
  $("resultsBody").innerHTML = a.results.map(r => {
    const devSign = r.deviation >= 0 ? `+${r.deviation.toFixed(2)}` : r.deviation.toFixed(2);
    const zSign = r.z_score >= 0 ? `+${r.z_score.toFixed(3)}` : r.z_score.toFixed(3);
    const zClass = r.z_score >= 0 ? "z-pos" : "z-neg";
    return `
      <tr>
        <td><strong>${escapeText(r.register_no)}</strong></td>
        <td>${Number(r.marks).toFixed(2)}</td>
        <td>${devSign}</td>
        <td><span class="z-tag ${zClass}">${zSign}</span></td>
        <td>${r.percentile.toFixed(1)}%</td>
        <td><span class="grade-tag">${r.grade}</span></td>
      </tr>
    `;
  }).join("");

  // Grade Counts Chips
  $("gradeCounts").innerHTML = Object.entries(a.grade_analysis).map(([g, info]) => `
    <span class="count-chip">
      Grade ${g}: <b>${info.count}</b> (${info.empirical_pct}% actual vs ${info.theoretical_pct}% normal)
    </span>
  `).join("");

  $("downloadBtn").classList.remove("disabled");
  $("chartPlaceholder").style.display = "none";
  drawChart(a);
}

function escapeText(t) {
  return String(t).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function escapeAttr(t) {
  return String(t).replace(/"/g, "&quot;");
}

function drawChart(a) {
  const binCount = 10;
  const binWidth = 10;
  const bins = Array(binCount).fill(0);
  
  a.marks.forEach(m => {
    const idx = Math.min(binCount - 1, Math.floor(m / binWidth));
    bins[idx]++;
  });

  const labels = bins.map((_, i) => `${i * binWidth}–${i * binWidth + 9}`);
  const xVals = Array.from({ length: 101 }, (_, i) => i);
  const sd = a.std_pop, mu = a.mean;
  
  // Continuous Gaussian probability density f(x)
  // Scaled to match histogram frequency area: N * binWidth * f(x)
  const curve = xVals.map(v => {
    const pdf = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((v - mu) / sd) ** 2);
    return { x: v, y: pdf * a.total * binWidth };
  });

  if (chart) chart.destroy();

  chart = new Chart($("gaussianChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "Empirical Frequency H(x)",
          data: bins,
          backgroundColor: "rgba(59, 130, 246, 0.45)",
          borderColor: "#2563eb",
          borderWidth: 1.5,
          borderRadius: 4,
          yAxisID: "y"
        },
        {
          type: "line",
          label: "Gaussian Probability Density Curve N · Δx · f(x; μ, σ)",
          data: curve,
          borderColor: "#7c3aed",
          backgroundColor: "transparent",
          pointRadius: 0,
          borderWidth: 2.5,
          tension: 0.35,
          parsing: false,
          yAxisID: "y"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => {
              if (context.dataset.type === "line") {
                return `Theoretical Density Scaled: ${context.parsed.y.toFixed(2)}`;
              }
              return `Observed Frequency: ${context.parsed.y} students`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Score Intervals [0–100]",
            font: { size: 11, weight: "600" }
          },
          ticks: { maxRotation: 0 }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Frequency / Density Count",
            font: { size: 11, weight: "600" }
          }
        }
      }
    }
  });
}

// Preset Buttons Event Listeners
$("presetStandard").addEventListener("click", e => loadDataset("standard", e.target));
$("presetLarge").addEventListener("click", e => loadDataset("large", e.target));
$("presetHonors").addEventListener("click", e => loadDataset("honors", e.target));
$("presetChallenging").addEventListener("click", e => loadDataset("challenging", e.target));
$("presetCustom").addEventListener("click", generateCustomGaussian);

// Main Action Buttons
$("runBtn").addEventListener("click", runProject);

$("addStudent").addEventListener("click", () => {
  addRow("", "");
  setMessage("New student row appended to vector. Input register ID and marks, then execute pipeline.");
});

$("studentBody").addEventListener("click", e => {
  if (e.target.classList.contains("remove-row")) {
    e.target.closest("tr").remove();
    updateRecordCount();
  }
});

$("studentBody").addEventListener("input", () => {
  updateRecordCount();
});

$("resetSample").addEventListener("click", () => {
  loadDataset("standard", $("presetStandard"));
});

$("csvFile").addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "CSV upload failed.");
    }
    $("studentBody").innerHTML = "";
    data.students.forEach(s => addRow(s.register_no, s.marks));
    document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    setMessage(`CSV imported successfully: ${data.students.length} empirical records verified.`);
  } catch (err) {
    alert(err.message);
  } finally {
    e.target.value = "";
  }
});

$("toggleMathBtn").addEventListener("click", () => {
  const grid = $("mathGrid");
  const isHidden = grid.style.display === "none";
  grid.style.display = isHidden ? "grid" : "none";
  $("toggleMathBtn").textContent = isHidden ? "Hide Theory" : "Show Theory";
});

// Initialization
updateRecordCount();
