import { Module } from "./types";

export const probability: Module = {
  id: "probability",
  title: "Probability & Statistics",
  tagline: "Reasoning under uncertainty",
  color: "emerald",
  lessons: [
    {
      id: "probability-basics",
      title: "Probability — Quantifying Uncertainty",
      anime: {
        series: "Death Note",
        character: "L Lawliet",
        analogy:
          "L never says 'Kira is Light Yagami.' He says 'there is a 98% probability that Kira is this individual.' Every deduction is probabilistic — he updates his belief as new evidence arrives, never committing absolutely until the evidence is overwhelming. This is Bayesian reasoning avant la lettre: probability as degree of belief, not just frequency.",
      },
      mlConnection:
        "Probabilistic thinking pervades ML: uncertainty quantification, Bayesian neural networks, generative models (VAEs, diffusion models), reinforcement learning (policy as probability distribution), and calibration of classifier confidence.",
      conceptHtml: `
        <p>Probability assigns a number in [0, 1] to events, measuring how likely they are. There are two main interpretations:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Frequentist:</strong> probability = long-run frequency (flip a coin many times; heads appears ~50%)</li>
          <li><strong>Bayesian:</strong> probability = degree of belief (L is 98% sure about Kira)</li>
        </ul>
        <p class="mt-3">Core axioms (Kolmogorov):</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li>P(A) ≥ 0 for all events A</li>
          <li>P(Ω) = 1 (probability of anything happening is 1)</li>
          <li>P(A ∪ B) = P(A) + P(B) if A, B are mutually exclusive</li>
        </ul>
        <p class="mt-3">From these, everything else derives. Key rules:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Complement:</strong> P(Aᶜ) = 1 − P(A)</li>
          <li><strong>Conditional probability:</strong> P(A|B) = P(A∩B) / P(B)</li>
          <li><strong>Independence:</strong> P(A∩B) = P(A)P(B) iff A and B are independent</li>
          <li><strong>Total probability:</strong> P(A) = Σ P(A|Bₖ)P(Bₖ)</li>
        </ul>
      `,
      mathBlocks: [
        {
          label: "Conditional probability",
          latex: "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0",
        },
        {
          label: "Law of total probability",
          latex: "P(A) = \\sum_{k} P(A \\mid B_k) P(B_k)",
        },
        {
          label: "Expectation (discrete)",
          latex: "\\mathbb{E}[X] = \\sum_{x} x \\cdot P(X = x)",
        },
        {
          label: "Variance",
          latex: "\\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2",
        },
      ],
      workedExample: {
        problem:
          "A spam classifier flags an email as spam. 1% of all emails are spam. The classifier has 95% true positive rate and 2% false positive rate. Given a flagged email, what's the probability it's actually spam?",
        solutionLatex:
          "P(\\text{spam}) = 0.01, \\quad P(\\text{flag}|\\text{spam}) = 0.95, \\quad P(\\text{flag}|\\text{not spam}) = 0.02 \\\\[8pt] P(\\text{flag}) = 0.95(0.01) + 0.02(0.99) = 0.0095 + 0.0198 = 0.0293 \\\\[8pt] P(\\text{spam}|\\text{flag}) = \\frac{0.95 \\times 0.01}{0.0293} \\approx 0.324",
        solutionExplanation:
          "Only 32% chance of being spam even after being flagged! This is the base rate fallacy — spam is rare (1%), so most flagged emails are false positives. This is why precision matters: your classifier is right only 1/3 of the time despite 95% sensitivity.",
      },
      exercises: [
        {
          id: "prob-1",
          prompt:
            "Two events A and B have P(A) = 0.4, P(B) = 0.3, P(A ∩ B) = 0.12. Are A and B independent? Compute P(A|B) and P(B|A).",
          hint: "For independence, check if P(A∩B) = P(A)·P(B). Conditional probability: P(A|B) = P(A∩B)/P(B).",
          solution:
            "Check independence: P(A)·P(B) = 0.4 × 0.3 = 0.12 = P(A∩B). ✓ Yes, A and B are independent.\nP(A|B) = P(A∩B)/P(B) = 0.12/0.3 = 0.4 = P(A). (Independence means conditioning doesn't change anything.)\nP(B|A) = P(A∩B)/P(A) = 0.12/0.4 = 0.3 = P(B). ✓",
        },
        {
          id: "prob-2",
          prompt:
            "A neural network classifier's output is a probability p ∈ [0,1]. 'Calibration' means P(Y=1 | network outputs p) = p. If a poorly calibrated network always outputs 0.9 for positive examples, is it calibrated? What problem does this cause?",
          hint: "Think about what the model is claiming vs. what the actual error rate would be.",
          solution:
            "If the model always outputs 0.9 and the true accuracy is, say, 70%, then P(Y=1 | model outputs 0.9) = 0.7 ≠ 0.9 — miscalibrated.\n\nProblems: (1) The model expresses more confidence than warranted. (2) Downstream decisions (e.g., medical diagnosis thresholds) will be wrong — you'd set a threshold of 0.95 thinking 95% confident, but actual precision is much lower. (3) Expected Calibration Error (ECE) measures this gap. Techniques: temperature scaling (divide logits by T > 1 to 'spread' the distribution and reduce overconfidence).",
        },
      ],
    },
    {
      id: "distributions",
      title: "Distributions — The Shape of Randomness",
      anime: {
        series: "One Piece",
        character: "Various",
        analogy:
          "Devil Fruits are rare, and their power level varies wildly — but there's a pattern. Common fruits (Paramecia) are numerous; rarer ones (Logia, Zoan subtypes like Ancient or Mythical) appear far less frequently. If you plotted 'number of devil fruit users' vs. 'power level,' you'd see something like a normal distribution: most users cluster around average, extreme powerhouses are rare. The Central Limit Theorem says that whenever you average many random effects together, a normal distribution emerges — regardless of the original distribution.",
      },
      mlConnection:
        "Probability distributions are the language of generative models. VAEs model data as Gaussian distributions in latent space. Diffusion models use Gaussian noise schedules. Categorical distributions are the output of every classifier. Understanding distributions = understanding what your model is actually computing.",
      conceptHtml: `
        <p>A <strong>probability distribution</strong> describes how probability is spread over outcomes. Key distributions in ML:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Bernoulli(p):</strong> Single binary outcome. Used for binary classification.</li>
          <li><strong>Categorical(p₁,...,pₖ):</strong> Single outcome from k classes. Softmax outputs this.</li>
          <li><strong>Gaussian N(μ, σ²):</strong> Continuous, bell-shaped. Ubiquitous via CLT. Used in VAEs, Bayesian networks.</li>
          <li><strong>Uniform(a,b):</strong> Equal probability everywhere. Used for initialization, random search.</li>
          <li><strong>Exponential(λ):</strong> Time between events. Used in survival analysis, RL reward modeling.</li>
        </ul>
        <p class="mt-3">For continuous distributions, probability is defined via the <strong>probability density function (PDF)</strong> p(x): P(a ≤ X ≤ b) = ∫_a^b p(x)dx. The PDF integrates to 1 over its support.</p>
      `,
      mathBlocks: [
        {
          label: "Gaussian PDF",
          latex: "\\mathcal{N}(x; \\mu, \\sigma^2) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)",
        },
        {
          label: "KL divergence (measures 'distance' between distributions)",
          latex: "D_{\\text{KL}}(P \\| Q) = \\sum_x P(x) \\log \\frac{P(x)}{Q(x)} \\geq 0",
        },
        {
          label: "Central Limit Theorem",
          latex: "\\sqrt{n}\\left(\\bar{X}_n - \\mu\\right) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2) \\quad \\text{as } n \\to \\infty",
        },
      ],
      workedExample: {
        problem:
          "X ~ N(μ=0, σ²=1) (standard normal). What is P(−1 ≤ X ≤ 1)? What is E[X²]? What is Var(X²)?",
        solutionLatex:
          "P(-1 \\leq X \\leq 1) \\approx 0.6827 \\quad \\text{(the 68-95-99.7 rule: 1 std dev)} \\\\[8pt] \\mathbb{E}[X^2] = \\text{Var}(X) + (\\mathbb{E}[X])^2 = 1 + 0 = 1 \\\\[8pt] \\text{Var}(X^2) = \\mathbb{E}[X^4] - (\\mathbb{E}[X^2])^2 = 3 - 1 = 2 \\quad (\\mathbb{E}[X^4]=3 \\text{ for std normal})",
        solutionExplanation:
          "The 68-95-99.7 rule is essential: ~68% of data within 1σ, ~95% within 2σ, ~99.7% within 3σ. E[X²] = 1 means a standard normal random variable has average squared value 1 — this is the basis for why Xavier initialization divides weights by √(fan_in).",
      },
      exercises: [
        {
          id: "dist-1",
          prompt:
            "For two probability distributions P and Q, the KL divergence D_KL(P‖Q) ≥ 0 (non-negative). Explain: (a) what D_KL(P‖Q) = 0 means, (b) why D_KL(P‖Q) ≠ D_KL(Q‖P) in general (not symmetric), (c) where KL divergence appears in VAE training.",
          hint: "For (a): when can log(P/Q) average to zero? For (c): the VAE ELBO loss has two terms.",
          solution:
            "(a) D_KL(P‖Q) = 0 iff P = Q (distributions are identical). When P=Q, log(P/Q) = log(1) = 0 everywhere.\n\n(b) D_KL(P‖Q) penalizes places where P > 0 but Q ≈ 0 heavily (log P/Q → ∞). D_KL(Q‖P) penalizes where Q > 0 but P ≈ 0. These are different 'directions' of mismatch.\n\n(c) VAE loss = reconstruction loss + D_KL(q(z|x) ‖ p(z)). The KL term pushes the encoder's posterior q(z|x) toward the standard normal prior p(z) = N(0,I). This regularizes the latent space to be smooth and well-organized.",
        },
        {
          id: "dist-2",
          prompt:
            "The softmax function converts logits z = (z₁, ..., zₖ) into a probability distribution. Show that softmax outputs always sum to 1 and are all positive — i.e., softmax defines a valid categorical distribution.",
          hint: "Write out the definition of softmax(z)_i and check both properties algebraically.",
          solution:
            "softmax(z)_i = exp(z_i) / Σⱼ exp(z_j)\n\n(1) Positivity: exp(z_i) > 0 for all z_i ∈ ℝ, and dividing by a positive sum gives a positive result. ✓\n\n(2) Sums to 1: Σᵢ softmax(z)_i = Σᵢ [exp(z_i) / Σⱼ exp(z_j)] = [Σᵢ exp(z_i)] / [Σⱼ exp(z_j)] = 1. ✓\n\nSo softmax always outputs a valid probability vector (all positive, sums to 1).",
        },
      ],
    },
    {
      id: "bayes",
      title: "Bayes' Theorem — Updating Beliefs with Evidence",
      anime: {
        series: "Steins;Gate",
        character: "Rintaro Okabe",
        analogy:
          "Okabe has a prior belief about which world line he's in. Each phone microwave experiment updates that belief — new evidence shifts the probability mass between world lines. This is Bayesian updating: start with a prior belief, observe data, update to a posterior. Every scientific hypothesis, every medical diagnosis, every ML model trained on data is doing some version of this.",
      },
      mlConnection:
        "Bayesian inference is the theoretical foundation of probabilistic ML. Maximum Likelihood Estimation (MLE) is Bayesian inference with a uniform prior. MAP estimation adds a regularizing prior. Bayesian deep learning extends this to neural networks with uncertainty quantification. Even standard L2 regularization (weight decay) corresponds to a Gaussian prior on weights.",
      conceptHtml: `
        <p><strong>Bayes' theorem</strong> tells you how to update a prior belief P(H) after observing evidence E:</p>
        <ul class="list-disc ml-5 space-y-1 mt-3">
          <li><strong>Prior P(H):</strong> belief before seeing data</li>
          <li><strong>Likelihood P(E|H):</strong> how probable is this evidence given the hypothesis</li>
          <li><strong>Evidence P(E):</strong> total probability of this evidence (normalizing constant)</li>
          <li><strong>Posterior P(H|E):</strong> updated belief after seeing data</li>
        </ul>
        <p class="mt-3">In ML terms: H = model parameters θ, E = training data D.</p>
        <p class="mt-1"><strong>MLE</strong> finds θ that maximizes P(D|θ) (the likelihood) — ignores prior.</p>
        <p><strong>MAP</strong> finds θ that maximizes P(θ|D) = P(D|θ)P(θ)/P(D) — uses a prior.</p>
        <p><strong>Full Bayesian:</strong> maintains the entire posterior distribution P(θ|D) — computationally expensive, but gives uncertainty estimates.</p>
      `,
      mathBlocks: [
        {
          label: "Bayes' theorem",
          latex: "P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}",
        },
        {
          label: "Posterior ∝ likelihood × prior",
          latex: "P(\\theta \\mid \\mathcal{D}) \\propto P(\\mathcal{D} \\mid \\theta) \\cdot P(\\theta)",
        },
        {
          label: "MLE objective",
          latex: "\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\log P(\\mathcal{D} \\mid \\theta) = \\arg\\max_\\theta \\sum_{i=1}^n \\log p(x_i \\mid \\theta)",
        },
        {
          label: "MAP with Gaussian prior = L2 regularization",
          latex: "\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta \\left[\\log P(\\mathcal{D}|\\theta) - \\frac{\\lambda}{2}\\|\\theta\\|^2\\right]",
        },
      ],
      workedExample: {
        problem:
          "You observe n = 10 coin flips and get k = 7 heads. (a) Find the MLE for p (probability of heads). (b) Now use a Beta(α=3, β=3) prior (encoding a belief the coin is fair). Find the MAP estimate.",
        solutionLatex:
          "\\textbf{(a) MLE:} \\\\[4pt] \\log P(k|p) = k\\log p + (n-k)\\log(1-p) \\\\[4pt] \\frac{d}{dp}\\log P = \\frac{k}{p} - \\frac{n-k}{1-p} = 0 \\Rightarrow \\hat{p}_{\\text{MLE}} = \\frac{k}{n} = \\frac{7}{10} = 0.7 \\\\[12pt] \\textbf{(b) MAP with Beta(3,3) prior:} \\\\[4pt] \\text{Beta prior: } P(p) \\propto p^{\\alpha-1}(1-p)^{\\beta-1} \\\\[4pt] \\hat{p}_{\\text{MAP}} = \\frac{k + \\alpha - 1}{n + \\alpha + \\beta - 2} = \\frac{7+2}{10+4} = \\frac{9}{14} \\approx 0.643",
        solutionExplanation:
          "MAP pulls the estimate toward 0.5 (the prior's mean) compared to MLE's 0.7. With more data, MAP and MLE converge. The Beta prior is 'conjugate' to the Binomial likelihood — the posterior is also Beta, which makes the math clean.",
      },
      exercises: [
        {
          id: "bayes-1",
          prompt:
            "Show that L2 regularization in linear regression (minimizing ‖Xw − y‖² + λ‖w‖²) corresponds exactly to MAP estimation with a Gaussian prior w ~ N(0, σ²I). What is the relationship between λ and σ?",
          hint: "Write out log P(w|D) = log P(D|w) + log P(w) and identify each term. For a Gaussian prior, log P(w) = −‖w‖²/(2σ²) + const.",
          solution:
            "log P(w|D) ∝ log P(D|w) + log P(w)\n= −‖Xw−y‖²/(2σ²_noise) + log N(w; 0, σ²I)\n= −‖Xw−y‖²/(2σ²_noise) − ‖w‖²/(2σ²) + const\n\nMaximizing this is equivalent to minimizing:\n‖Xw−y‖²/σ²_noise + ‖w‖²/σ²\n\nSo λ = σ²_noise / σ² — the regularization strength is the ratio of noise variance to prior variance. Large σ² (weak prior, weights can be large) → small λ (weak regularization). Small σ² (strong prior toward zero) → large λ (strong regularization).",
        },
        {
          id: "bayes-2",
          prompt:
            "Cross-entropy loss for classification is −Σᵢ yᵢ log p̂ᵢ. Show this is equivalent to negative log-likelihood (MLE) for a categorical distribution. What does minimizing cross-entropy mean probabilistically?",
          hint: "The categorical likelihood for a single example with true label y (one-hot) and model output p̂ (softmax) is: P(y|x, θ) = Π p̂ᵢ^yᵢ.",
          solution:
            "For one-hot label y and softmax output p̂:\nP(y|x, θ) = ∏ᵢ p̂ᵢ^yᵢ\nlog P(y|x, θ) = Σᵢ yᵢ log p̂ᵢ\n−log P(y|x, θ) = −Σᵢ yᵢ log p̂ᵢ = cross-entropy\n\nMLE = maximize Σₙ log P(yₙ|xₙ, θ) = minimize Σₙ cross-entropy(yₙ, p̂ₙ).\n\nSo minimizing cross-entropy IS maximum likelihood estimation for a categorical distribution. The model is learning the parameters of the data-generating categorical distribution — it's saying 'the category probabilities that best explain this training data are...'",
        },
      ],
    },
    {
      id: "information-theory",
      title: "Information Theory — The Math of Surprise",
      anime: {
        series: "Steins;Gate",
        character: "Kurisu Makise",
        analogy:
          "In Steins;Gate, divergence meter readings quantify how different one world line is from another — a precise measure of 'how much things changed.' Shannon entropy does something similar: it measures how uncertain (surprising, information-rich) a random variable is. A fair coin has maximum entropy — every outcome is a surprise. A biased coin you know will land heads gives you little information. Entropy is the physics of surprise.",
      },
      mlConnection:
        "Information theory underpins cross-entropy loss, KL divergence, mutual information (used in ICA and infoNCE contrastive loss), the capacity of neural networks, and the compression view of learning. 'Training a model' can be framed as compression: learning a compact code for the data.",
      conceptHtml: `
        <p><strong>Shannon entropy</strong> H(X) measures the average surprise (information content) of a random variable X. High entropy = high uncertainty = lots of information when you observe a value.</p>
        <p>Intuitions:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li>Fair coin: H = 1 bit (maximum for binary — equally surprised either way)</li>
          <li>Biased coin (p=0.99): H ≈ 0.08 bits (you already know it's heads)</li>
          <li>Uniform over k classes: H = log k (maximum entropy for k outcomes)</li>
        </ul>
        <p class="mt-3"><strong>Cross-entropy</strong> H(P, Q) = −Σ P(x) log Q(x) measures how many bits you need to encode events from distribution P using a code optimized for Q. Cross-entropy = entropy H(P) + KL divergence D_KL(P‖Q).</p>
        <p class="mt-3"><strong>Mutual information</strong> I(X;Y) measures how much knowing X reduces uncertainty about Y. Used in feature selection, contrastive learning (SimCLR, CLIP).</p>
      `,
      mathBlocks: [
        {
          label: "Shannon entropy",
          latex: "H(X) = -\\sum_x P(x) \\log_2 P(x) = \\mathbb{E}[-\\log P(X)]",
        },
        {
          label: "Cross-entropy",
          latex: "H(P, Q) = -\\sum_x P(x) \\log Q(x) = H(P) + D_{\\text{KL}}(P \\| Q)",
        },
        {
          label: "Mutual information",
          latex: "I(X;Y) = \\sum_{x,y} P(x,y) \\log \\frac{P(x,y)}{P(x)P(y)} = H(X) - H(X|Y)",
        },
      ],
      workedExample: {
        problem:
          "A 4-class classifier has true distribution P = (0.5, 0.25, 0.125, 0.125). Model A predicts Q_A = (0.5, 0.25, 0.125, 0.125). Model B predicts Q_B = (0.25, 0.25, 0.25, 0.25). Compute H(P), H(P, Q_A), H(P, Q_B), and D_KL(P‖Q_A) and D_KL(P‖Q_B).",
        solutionLatex:
          "H(P) = -(0.5\\log_2 0.5 + 0.25\\log_2 0.25 + 0.125\\log_2 0.125 + 0.125\\log_2 0.125) \\\\[4pt] = -(0.5(-1) + 0.25(-2) + 0.125(-3) + 0.125(-3)) = 0.5+0.5+0.375+0.375 = 1.75 \\text{ bits} \\\\[10pt] H(P, Q_A) = H(P) = 1.75 \\text{ bits}, \\quad D_{\\text{KL}}(P\\|Q_A) = 0 \\\\[6pt] H(P, Q_B) = -(0.5\\log_2 0.25 + 0.25\\log_2 0.25 + 2 \\times 0.125\\log_2 0.25) \\\\[4pt] = -(0.5(-2) + 0.25(-2) + 0.25(-2)) = 2 \\text{ bits} \\\\[4pt] D_{\\text{KL}}(P\\|Q_B) = H(P,Q_B) - H(P) = 2 - 1.75 = 0.25 \\text{ bits}",
        solutionExplanation:
          "Model A perfectly matches P → zero KL divergence, minimum cross-entropy. Model B (uniform guess) adds 0.25 bits of extra cost — it's 'paying' for not knowing the structure of P. This is exactly what cross-entropy training minimizes: the cost of using Q (model) to encode P (data).",
      },
      exercises: [
        {
          id: "info-1",
          prompt:
            "Prove that for a binary random variable X with P(X=1) = p, the entropy H(X) = −p log p − (1−p)log(1−p) is maximized at p = 0.5. (You can use any log base.)",
          hint: "Take the derivative of H with respect to p and set it to 0.",
          solution:
            "dH/dp = −log p − 1 + log(1−p) + 1 = log((1−p)/p)\nSetting dH/dp = 0: log((1-p)/p) = 0 ⟹ (1-p)/p = 1 ⟹ p = 0.5.\n\nSecond derivative: d²H/dp² = −1/(p(1-p)) < 0 for p ∈ (0,1) — confirms maximum.\nH(0.5) = −0.5 log₂(0.5) − 0.5 log₂(0.5) = 1 bit (maximum). ∎",
        },
        {
          id: "info-2",
          prompt:
            "Contrastive learning (used in CLIP, SimCLR) is often described as 'maximizing mutual information between augmented views.' Given the definition I(X;Y) = H(X) − H(X|Y), explain intuitively what maximizing I(X;Y) means: what does the model learn to do?",
          hint: "H(X|Y) is the uncertainty about X that remains after observing Y. What does it mean for this to be small?",
          solution:
            "Maximizing I(X;Y) = H(X) − H(X|Y) means minimizing H(X|Y) (since H(X) depends only on the data, not the model).\n\nH(X|Y) = uncertainty about view X after seeing view Y. Minimizing this means: once you see one augmented view of an image, you should be able to predict the other view's embedding with low uncertainty.\n\nIn other words: the model learns embeddings where two views of the same image are close together and views of different images are far apart. The model captures 'what's consistent across augmentations' — the semantic content, not the noise. This is why CLIP can zero-shot generalize: it's learned the mutual information between image and text, not superficial pixel patterns.",
        },
      ],
    },
  ],
};
