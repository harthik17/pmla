from flask import Flask, render_template, request, jsonify, send_file
import pandas as pd
import numpy as np
from pathlib import Path
from io import BytesIO
import csv
import math

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "students.csv"
OUTPUT_DIR = BASE_DIR / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

def load_students():
    if DATA_FILE.exists():
        df = pd.read_csv(DATA_FILE, dtype={"Register_No": str})
        if {"Register_No", "Marks"}.issubset(df.columns):
            return df[["Register_No", "Marks"]].to_dict(orient="records")
    return []

def normal_cdf(z: float) -> float:
    """Standard normal cumulative distribution function Phi(z)."""
    return 0.5 * (1.0 + math.erf(z / math.sqrt(2.0)))

def analyze_records(records):
    """
    Performs comprehensive parametric statistical analysis on examination marks
    assuming a Gaussian (Normal) Distribution N(mu, sigma^2).
    """
    if not isinstance(records, list) or len(records) < 2:
        raise ValueError("Enter at least two student records for statistical inference.")
    
    clean = []
    seen = set()
    for row in records:
        reg = str(row.get("register_no", "")).strip()
        if not reg:
            raise ValueError("Every student record requires a valid register number.")
        if reg in seen:
            raise ValueError(f"Duplicate register number detected: {reg}")
        seen.add(reg)
        try:
            mark = float(row.get("marks"))
        except (TypeError, ValueError):
            raise ValueError(f"Score for {reg} must be numeric.")
        if not (0 <= mark <= 100):
            raise ValueError(f"Score for {reg} ({mark}) violates domain bounds [0, 100].")
        clean.append({"Register_No": reg, "Marks": mark})

    N = len(clean)
    marks = np.array([r["Marks"] for r in clean], dtype=float)
    
    # First moment: Sample Arithmetic Mean (mu)
    mean = float(np.mean(marks))
    
    # Second moment: Population & Sample Variance and Standard Deviation
    var_pop = float(np.var(marks, ddof=0))
    std_pop = float(np.std(marks, ddof=0))
    if std_pop == 0:
        raise ValueError("All marks are invariant (population variance σ² = 0). Normal distribution cannot partition identical scores.")

    deg_freedom = N - 1
    var_sample = float(np.var(marks, ddof=1)) if deg_freedom > 0 else var_pop
    std_sample = float(np.std(marks, ddof=1)) if deg_freedom > 0 else std_pop

    # Median and Quartiles
    median = float(np.median(marks))
    q1 = float(np.percentile(marks, 25))
    q3 = float(np.percentile(marks, 75))
    iqr = float(q3 - q1)

    # Standard Error of the Mean (SEM)
    sem = float(std_sample / np.sqrt(N)) if N > 0 else 0.0

    # Relative Dispersion: Coefficient of Variation (CV %)
    cv = float((std_pop / mean) * 100.0) if mean != 0 else 0.0

    # Range and Extrema
    highest = float(np.max(marks))
    lowest = float(np.min(marks))
    score_range = float(highest - lowest)

    # Third and Fourth Central Moments: Skewness (gamma_1) and Excess Kurtosis (gamma_2)
    deviations = marks - mean
    m2 = float(np.mean(deviations ** 2))
    m3 = float(np.mean(deviations ** 3))
    m4 = float(np.mean(deviations ** 4))
    
    skewness = float(m3 / (m2 ** 1.5)) if m2 > 0 else 0.0
    kurtosis_excess = float((m4 / (m2 ** 2)) - 3.0) if m2 > 0 else 0.0

    # Parametric Gaussian Grade Cutoff Thresholds (mu +/- k*sigma)
    bounds = {
        "A+": mean + 1.5 * std_pop,
        "A":  mean + 0.5 * std_pop,
        "B":  mean - 0.5 * std_pop,
        "C":  mean - 1.5 * std_pop,
    }

    def assign_grade(mark: float) -> str:
        if mark >= bounds["A+"]:
            return "A+"
        if mark >= bounds["A"]:
            return "A"
        if mark >= bounds["B"]:
            return "B"
        if mark >= bounds["C"]:
            return "C"
        return "D"

    # Compute individual student metrics: Deviation, Z-Score, Gaussian Percentile Phi(z)
    results = []
    for r in clean:
        x = r["Marks"]
        dev = x - mean
        z = dev / std_pop
        phi_z = normal_cdf(z) * 100.0
        results.append({
            "register_no": r["Register_No"],
            "marks": round(x, 2),
            "deviation": round(dev, 2),
            "z_score": round(z, 3),
            "percentile": round(phi_z, 1),
            "grade": assign_grade(x)
        })

    # Theoretical Normal Probabilities for each partition
    # A+ (z >= 1.5): 1 - Phi(1.5) = 6.68%
    # A  (0.5 <= z < 1.5): Phi(1.5) - Phi(0.5) = 24.17%
    # B  (-0.5 <= z < 0.5): Phi(0.5) - Phi(-0.5) = 38.29%
    # C  (-1.5 <= z < -0.5): Phi(-0.5) - Phi(-1.5) = 24.17%
    # D  (z < -1.5): Phi(-1.5) = 6.68%
    theoretical_pcts = {
        "A+": 6.68,
        "A":  24.17,
        "B":  38.29,
        "C":  24.17,
        "D":  6.68
    }

    grade_analysis = {}
    for g in ["A+", "A", "B", "C", "D"]:
        cnt = sum(1 for r in results if r["grade"] == g)
        emp_pct = round((cnt / N) * 100.0, 1)
        grade_analysis[g] = {
            "count": cnt,
            "empirical_pct": emp_pct,
            "theoretical_pct": theoretical_pcts[g]
        }

    return {
        "total": N,
        "degrees_of_freedom": deg_freedom,
        "mean": round(mean, 2),
        "median": round(median, 2),
        "std_pop": round(std_pop, 2),
        "std_sample": round(std_sample, 2),
        "var_pop": round(var_pop, 2),
        "var_sample": round(var_sample, 2),
        "q1": round(q1, 2),
        "q3": round(q3, 2),
        "iqr": round(iqr, 2),
        "sem": round(sem, 3),
        "cv": round(cv, 2),
        "skewness": round(skewness, 3),
        "kurtosis": round(kurtosis_excess, 3),
        "highest": round(highest, 2),
        "lowest": round(lowest, 2),
        "range": round(score_range, 2),
        "std": round(std_pop, 2), # legacy compatibility
        "boundaries": {k: round(v, 2) for k, v in bounds.items()},
        "results": results,
        "grade_counts": {g: grade_analysis[g]["count"] for g in grade_analysis},
        "grade_analysis": grade_analysis,
        "marks": marks.tolist()
    }

@app.route("/")
def index():
    return render_template("index.html", students=load_students())

@app.post("/api/analyze")
def api_analyze():
    payload = request.get_json(silent=True) or {}
    try:
        result = analyze_records(payload.get("students", []))
        # Export comprehensive statistical grade report
        df_export = pd.DataFrame(result["results"]).rename(
            columns={
                "register_no": "Register_No",
                "marks": "Raw_Score_X",
                "deviation": "Deviation_X_minus_Mu",
                "z_score": "Standard_Z_Score",
                "percentile": "Gaussian_Percentile_Phi_Z",
                "grade": "Assigned_Grade"
            }
        )
        df_export.to_csv(OUTPUT_DIR / "grade_results.csv", index=False)
        return jsonify({"success": True, "analysis": result})
    except ValueError as exc:
        return jsonify({"success": False, "error": str(exc)}), 400

@app.post("/api/upload")
def upload_csv():
    if "file" not in request.files:
        return jsonify({"success": False, "error": "Please provide a valid CSV file."}), 400
    file = request.files["file"]
    try:
        df = pd.read_csv(file, dtype={"Register_No": str})
        if not {"Register_No", "Marks"}.issubset(df.columns):
            raise ValueError("CSV header must contain 'Register_No' and 'Marks'.")
        records = df[["Register_No", "Marks"]].fillna("").to_dict(orient="records")
        for r in records:
            r["register_no"] = str(r.pop("Register_No"))
            r["marks"] = r.pop("Marks")
        analyze_records(records)
        return jsonify({"success": True, "students": records})
    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)}), 400

@app.get("/download/results")
def download_results():
    path = OUTPUT_DIR / "grade_results.csv"
    if not path.exists():
        return "Statistical analysis must be executed prior to report download.", 404
    return send_file(
        path,
        as_attachment=True,
        download_name="gaussian_grade_statistical_report.csv",
        mimetype="text/csv"
    )

if __name__ == "__main__":
    app.run(debug=True)
