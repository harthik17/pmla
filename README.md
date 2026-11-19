# Gaussian Distribution-Based University Grading System

A Flask-based statistical application demonstrating a rigorous mathematical workflow for proposing university examination grade boundaries using the Gaussian (normal) probability distribution \(\mathcal{N}(\mu, \sigma^2)\).

## Features
- **Flask Web Server & Analytics Dashboard**
- **Expanded Empirical Dataset Presets**:
  - *Standard Cohort (60 students)*: Realistic examination distribution (\(\mu \approx 66.2, \sigma \approx 10.8\))
  - *Large University Cohort (100 students)*: Full-cohort distribution testing
  - *Honors Class (50 students)*: High-average cohort (\(\mu \approx 78.0\))
  - *Challenging Exam (50 students)*: Low-average cohort (\(\mu \approx 54.0\))
  - *Box-Muller Gaussian Synthesizer*: Generate arbitrary-sized normal cohorts (\(N, \mu, \sigma\)) on demand
  - *CSV Ingestion*: Import external examination CSV datasets with custom register numbers and marks
- **Responsive, Overlap-Free Layout**: Clean CSS grid with dynamic auto-fit columns, sticky table headers, and dedicated overflow handling for KaTeX equations
- **Animated 6-Stage Mathematical Pipeline**:
  1. *Discrete Sample Vector Ingestion*: \(\mathbf{x} = (x_1, \dots, x_N)^T \in \mathbb{R}^N\)
  2. *Domain Support Verification*: \(\forall i, x_i \in [0, 100]\) and identifier uniqueness
  3. *Sample Moments Estimation*: Arithmetic mean \(\mu\), population variance \(\sigma^2\), sample standard deviation \(s\), standard error \(\text{SE}_\mu\), Fisher-Pearson skewness \(\gamma_1\), and excess kurtosis \(\gamma_2\)
  4. *Continuous Gaussian PDF Fitting*: \(f(x; \mu, \sigma) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)\)
  5. *Standardized \(z\)-Score Partitioning*: Mapping \(z_i = \frac{x_i - \mu}{\sigma}\) to normative \(k\sigma\) intervals
  6. *Cumulative Distribution \(\Phi(z)\) Synthesis*: Tabulation of percentiles and empirical vs. theoretical allocations
- **Norm-Referenced Grade Cutoffs**: Proposed \(k\)-sigma thresholds for grades A+, A, B, C, D
- **Student-Wise Standardized Metrics**: Raw scores (\(x_i\)), central deviations (\(x_i - \mu\)), standard scores (\(z_i\)), and Gaussian percentiles (\(\Phi(z_i)\))
- **Histogram & Scaled PDF Curve Superimposition**: Built with Chart.js
- **Comprehensive CSV Export**: Downloadable full statistical report

## Project Structure
```text
Gaussian_Grading_Capstone/
├── app.py
├── requirements.txt
├── README.md
├── data/
│   └── students.csv
├── outputs/
│   └── grade_results.csv
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

## Mathematical & Statistical Formulation

### 1. Measures of Central Tendency & Dispersion
For a sample vector of marks \(\mathbf{x} = [x_1, x_2, \dots, x_N]^T\):
- **Arithmetic Mean**:
  $$\mu = \frac{1}{N} \sum_{i=1}^N x_i$$
- **Population Variance & Standard Deviation**:
  $$\sigma^2 = \frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2, \quad \sigma = \sqrt{\sigma^2}$$
- **Sample Standard Deviation (Bessel's Correction, \(\text{ddof}=1\))**:
  $$s = \sqrt{\frac{1}{N-1} \sum_{i=1}^N (x_i - \mu)^2}$$
- **Standard Error of the Mean (SEM)**:
  $$\text{SE}_\mu = \frac{s}{\sqrt{N}}$$
- **Coefficient of Variation (Relative Dispersion)**:
  $$\text{CV} = \frac{\sigma}{\mu} \times 100\%$$

### 2. Higher Central Moments (Normality Diagnostics)
- **Fisher-Pearson Skewness (\(\gamma_1\))**:
  $$\gamma_1 = \frac{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^3}{\sigma^3}$$
- **Excess Kurtosis (\(\gamma_2\))**:
  $$\gamma_2 = \frac{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^4}{\sigma^4} - 3$$
  *(Where \(\gamma_2 = 0\) designates a mesokurtic Gaussian distribution)*

### 3. Standardized Variable (\(z\)-Score) & Cumulative Probability (\(\Phi\))
- **Standard Score**:
  $$z_i = \frac{x_i - \mu}{\sigma} \sim \mathcal{N}(0, 1)$$
- **Cumulative Distribution Function (CDF)**:
  $$\Phi(z) = P(Z \le z) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^z e^{-t^2/2} dt = \frac{1}{2}\left[1 + \text{erf}\left(\frac{z}{\sqrt{2}}\right)\right]$$

### 4. Norm-Referenced Grade Cutoff Boundaries
| Grade | Algebraic Formula | Standard Score Condition | Theoretical Probability \(P(Z)\) |
|---|---|---|---|
| **A+** | \(X \ge \mu + 1.5\sigma\) | \(z \ge +1.50\) | Top \(\approx 6.68\%\) |
| **A**  | \(\mu + 0.5\sigma \le X < \mu + 1.5\sigma\) | \(+0.50 \le z < +1.50\) | \(\approx 24.17\%\) |
| **B**  | \(\mu - 0.5\sigma \le X < \mu + 0.5\sigma\) | \(-0.50 \le z < +0.50\) | \(\approx 38.29\%\) |
| **C**  | \(\mu - 1.5\sigma \le X < \mu - 0.5\sigma\) | \(-1.50 \le z < -0.50\) | \(\approx 24.17\%\) |
| **D**  | \(X < \mu - 1.5\sigma\) | \(z < -1.50\) | Bottom \(\approx 6.68\%\) |

## Quick Start on Windows
1. Open terminal in the project directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
4. Navigate to `http://127.0.0.1:5000` in your web browser.
