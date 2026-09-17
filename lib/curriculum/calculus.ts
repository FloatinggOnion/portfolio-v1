import { Module } from "./types";

export const calculus: Module = {
  id: "calculus",
  title: "Calculus & Optimization",
  tagline: "How things change — and how to control change",
  color: "amber",
  lessons: [
    {
      id: "derivatives",
      title: "Derivatives — The Algebra of Change",
      anime: {
        series: "Demon Slayer",
        character: "Tanjiro Kamado",
        analogy:
          "Total Concentration Breathing isn't just about raw power — it's about the rate at which you push oxygen through your body. Tanjiro's strength at any instant is its derivative with respect to time. The difference between Tanjiro in episode 1 and Tanjiro at the end of Mugen Train arc isn't the total air he's breathed — it's how fast his breathing rate is changing moment to moment. A derivative captures that 'rate of change at a single instant' precisely.",
      },
      mlConnection:
        "Loss functions in neural networks are functions of millions of parameters. The derivative of the loss with respect to each weight tells us: 'if I nudge this weight slightly, how much does the loss change?' That's the gradient — the foundation of all gradient-based optimization.",
      conceptHtml: `
        <p>The <strong>derivative</strong> of a function f at point x measures the instantaneous rate of change — the slope of the tangent line at that exact point:</p>
        <p>Equivalently, it's the limit of the slope of the secant line as the two points get infinitely close.</p>
        <p>Key rules you'll use constantly:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Power rule:</strong> d/dx [xⁿ] = nxⁿ⁻¹</li>
          <li><strong>Product rule:</strong> d/dx [fg] = f'g + fg'</li>
          <li><strong>Chain rule:</strong> d/dx [f(g(x))] = f'(g(x)) · g'(x)</li>
          <li><strong>exp/log:</strong> d/dx [eˣ] = eˣ, d/dx [ln x] = 1/x</li>
        </ul>
        <p class="mt-2">The chain rule is the most important one in ML — it's what makes backpropagation possible.</p>
      `,
      mathBlocks: [
        {
          label: "Derivative definition",
          latex: "f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
        },
        {
          label: "Chain rule",
          latex: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x) \\quad \\Leftrightarrow \\quad \\frac{dz}{dx} = \\frac{dz}{dy}\\frac{dy}{dx}",
        },
        {
          label: "Common derivatives",
          latex: "\\frac{d}{dx}[\\sigma(x)] = \\sigma(x)(1-\\sigma(x)), \\quad \\sigma(x)=\\frac{1}{1+e^{-x}}",
        },
      ],
      workedExample: {
        problem:
          "Differentiate f(x) = ln(1 + eˣ) (the softplus function, common in ML). Find f'(x) and simplify.",
        solutionLatex:
          "f(x) = \\ln(1 + e^x) \\\\[8pt] f'(x) = \\frac{1}{1+e^x} \\cdot e^x \\quad\\text{(chain rule: outer = ln, inner = 1+eˣ)} \\\\[8pt] f'(x) = \\frac{e^x}{1+e^x} = \\frac{1}{1+e^{-x}} = \\sigma(x)",
        solutionExplanation:
          "The derivative of softplus is exactly the sigmoid function σ(x). This is why softplus is called the 'soft' version of ReLU — its derivative (sigmoid) is a smooth approximation of the step function (ReLU's derivative).",
      },
      exercises: [
        {
          id: "deriv-1",
          prompt:
            "Differentiate the ReLU function: f(x) = max(0, x). What is f'(x) for x > 0? For x < 0? At x = 0?",
          hint: "Consider the two regions separately. At x = 0, the derivative technically doesn't exist — but ML practitioners use a 'subgradient' of 0 or 1 there.",
          solution:
            "f'(x) = 1 for x > 0, f'(x) = 0 for x < 0.\nAt x = 0: f is not differentiable (corner/kink). In practice, we define f'(0) = 0 (or sometimes 1) as a subgradient. This is fine for gradient descent because x = 0 is a measure-zero set.",
        },
        {
          id: "deriv-2",
          prompt:
            "The cross-entropy loss for binary classification is L(ŷ, y) = −y·ln(ŷ) − (1−y)·ln(1−ŷ), where ŷ = σ(z) and z is the logit. Compute dL/dz using the chain rule.",
          hint: "Use dL/dz = (dL/dŷ) · (dŷ/dz). You computed dσ/dz = σ(z)(1-σ(z)) above. Simplify the full expression.",
          solution:
            "dL/dŷ = −y/ŷ + (1−y)/(1−ŷ)\ndŷ/dz = σ(z)(1−σ(z)) = ŷ(1−ŷ)\ndL/dz = [−y/ŷ + (1−y)/(1−ŷ)] · ŷ(1−ŷ)\n= −y(1−ŷ) + (1−y)ŷ\n= ŷ − y\n\nThe gradient of cross-entropy loss w.r.t. the logit is simply (prediction − label). This beautiful result is why logistic regression is so clean.",
        },
        {
          id: "deriv-3",
          prompt:
            "Verify the sigmoid derivative: if σ(x) = 1/(1+e^{-x}), show that σ'(x) = σ(x)(1−σ(x)).",
          hint: "Write σ(x) = (1+e^{-x})^{-1} and use the chain rule. Or use the quotient rule.",
          solution:
            "σ(x) = (1+e^{-x})^{-1}\nσ'(x) = −(1+e^{-x})^{-2} · (−e^{-x}) = e^{-x}/(1+e^{-x})²\n\nNote: e^{-x}/(1+e^{-x})² = [1/(1+e^{-x})] · [e^{-x}/(1+e^{-x})] = σ(x) · [1 − 1/(1+e^{-x})]\n= σ(x)(1 − σ(x)). ∎",
        },
      ],
    },
    {
      id: "gradients",
      title: "Gradients & Partial Derivatives — Multidimensional Change",
      anime: {
        series: "Naruto",
        character: "Naruto Uzumaki",
        analogy:
          "Shadow Clone Jutsu: Naruto creates hundreds of clones to train simultaneously in different directions. At the end, all the training and experience flows back to the original. Gradient computation is exactly this: partial derivatives send a 'clone' to probe each direction of the loss landscape independently, then the gradient aggregates all that directional information back into one vector pointing toward steepest ascent.",
      },
      mlConnection:
        "Neural networks have millions of parameters. Computing the gradient means finding how the loss changes with respect to every single weight — simultaneously. Automatic differentiation (autograd in PyTorch) does exactly this, efficiently, using the chain rule across the computation graph.",
      conceptHtml: `
        <p>For a function of multiple variables f(x₁, x₂, ..., xₙ), the <strong>partial derivative</strong> ∂f/∂xᵢ measures how f changes when only xᵢ changes, holding all others fixed.</p>
        <p>The <strong>gradient</strong> ∇f packs all partials into a vector — it points in the direction of steepest ascent:</p>
        <p>Key properties:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li>∇f always points perpendicular to the level curves of f</li>
          <li>−∇f points downhill (used in gradient descent)</li>
          <li>‖∇f‖ measures how steep the slope is at that point</li>
          <li>∇f = 0 at a critical point (potential min/max/saddle)</li>
        </ul>
        <p class="mt-2">The <strong>Jacobian</strong> generalizes gradients: for a vector-valued function f: ℝⁿ→ℝᵐ, J ∈ ℝᵐˣⁿ where Jᵢⱼ = ∂fᵢ/∂xⱼ.</p>
      `,
      mathBlocks: [
        {
          label: "Gradient definition",
          latex: "\\nabla f(\\mathbf{x}) = \\begin{pmatrix} \\partial f/\\partial x_1 \\\\ \\partial f/\\partial x_2 \\\\ \\vdots \\\\ \\partial f/\\partial x_n \\end{pmatrix}",
        },
        {
          label: "Directional derivative",
          latex: "D_{\\mathbf{u}}f(\\mathbf{x}) = \\nabla f(\\mathbf{x}) \\cdot \\mathbf{u}, \\quad \\|\\mathbf{u}\\|=1",
        },
        {
          label: "Gradient descent update",
          latex: "\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\eta \\nabla f(\\mathbf{x}_t)",
        },
      ],
      workedExample: {
        problem:
          "Let L(w₁, w₂) = (w₁ − 2)² + (w₂ + 1)². This is a loss function with parameters w₁, w₂. Find ∇L and find the minimum.",
        solutionLatex:
          "\\frac{\\partial L}{\\partial w_1} = 2(w_1 - 2), \\quad \\frac{\\partial L}{\\partial w_2} = 2(w_2 + 1) \\\\[8pt] \\nabla L = \\begin{pmatrix} 2(w_1-2) \\\\ 2(w_2+1) \\end{pmatrix} \\\\[8pt] \\nabla L = \\mathbf{0} \\Rightarrow w_1 = 2,\\ w_2 = -1 \\\\[6pt] L(2,-1) = 0 \\quad \\text{(global minimum)}",
        solutionExplanation:
          "This is a bowl-shaped quadratic — one global minimum at (2, -1) where L = 0. Gradient descent starting anywhere will converge here. Real neural network loss functions are far from this clean, but the same principle applies.",
      },
      exercises: [
        {
          id: "grad-1",
          prompt:
            "Compute ∇f for f(x, y) = x²y + eˣ sin(y). What is ∇f at the point (0, π/2)?",
          hint: "Treat each partial derivative as a 1D derivative, holding the other variable constant.",
          solution:
            "∂f/∂x = 2xy + eˣsin(y)\n∂f/∂y = x² + eˣcos(y)\n∇f = (2xy + eˣsin(y), x² + eˣcos(y))\n\nAt (0, π/2): ∂f/∂x = 0 + e⁰·sin(π/2) = 1\n∂f/∂y = 0 + e⁰·cos(π/2) = 0\n∇f(0, π/2) = (1, 0)",
        },
        {
          id: "grad-2",
          prompt:
            "A neural network loss is L(w) = ‖Xw − y‖² for data X ∈ ℝⁿˣᵈ, labels y ∈ ℝⁿ, weights w ∈ ℝᵈ. Compute ∇_w L. Set it to zero to find the optimal w (this is the Normal Equation).",
          hint: "Expand ‖Xw − y‖² = (Xw − y)ᵀ(Xw − y) and differentiate. Use the matrix calculus rule: ∇_w(wᵀAw) = (A + Aᵀ)w and ∇_w(bᵀw) = b.",
          solution:
            "L = (Xw − y)ᵀ(Xw − y) = wᵀXᵀXw − 2yᵀXw + yᵀy\n∇_w L = 2XᵀXw − 2Xᵀy\n\nSetting to 0: XᵀXw = Xᵀy\nw* = (XᵀX)⁻¹Xᵀy\n\nThis is the closed-form solution to linear regression (the Normal Equation). Gradient descent approximates this for high-dimensional cases where computing the inverse is too expensive.",
        },
      ],
    },
    {
      id: "gradient-descent",
      title: "Gradient Descent — Navigating the Loss Landscape",
      anime: {
        series: "Vinland Saga",
        character: "Thorfinn",
        analogy:
          "Thorfinn's journey is brutal: every step forward costs something, and the terrain is unknown. He navigates by local information — what's immediately in front of him — and slowly descends from revenge toward peace. Gradient descent works the same way: you don't know the global shape of the loss landscape, only the slope at your current position. You take a step downhill, reassess, repeat — trusting that local steps eventually lead somewhere good.",
      },
      mlConnection:
        "Every modern neural network is trained with some variant of gradient descent: SGD (Stochastic Gradient Descent), Adam, AdaGrad, RMSProp. The differences are in how they adapt the step size (learning rate) and handle noise in gradient estimates.",
      conceptHtml: `
        <p><strong>Gradient descent</strong> is an iterative optimization algorithm: starting from a random point, repeatedly step in the direction of steepest descent.</p>
        <p>The <strong>learning rate</strong> η controls step size — too large and you overshoot (diverge); too small and you converge slowly or get stuck. This is the most important hyperparameter to tune.</p>
        <p>Variants:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Batch GD:</strong> Use all data to compute gradient — accurate but slow for large datasets</li>
          <li><strong>Stochastic GD (SGD):</strong> Use one sample at a time — noisy but fast; noise helps escape local minima</li>
          <li><strong>Mini-batch GD:</strong> Use a small batch (32–512) — best of both worlds; standard in deep learning</li>
          <li><strong>Adam:</strong> Adaptive moment estimation — maintains per-parameter learning rates using gradient history. Default choice in most deep learning.</li>
        </ul>
        <p class="mt-2"><strong>Convergence intuition:</strong> For a convex loss (bowl shape), GD with small enough η always converges to the global minimum. Neural networks are non-convex, but in practice SGD + momentum finds good solutions due to overparameterization.</p>
      `,
      mathBlocks: [
        {
          label: "Gradient descent update",
          latex: "\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta L(\\theta_t)",
        },
        {
          label: "Adam update rule",
          latex: "m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t \\\\[4pt] v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2 \\\\[4pt] \\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t}+\\epsilon}\\hat{m}_t",
        },
        {
          label: "Convergence condition (convex, L-smooth)",
          latex: "L(\\theta_t) - L^* \\leq \\frac{\\|\\theta_0 - \\theta^*\\|^2}{2\\eta t}",
        },
      ],
      workedExample: {
        problem:
          "Run 3 steps of gradient descent on f(x) = x² − 4x + 5, starting at x₀ = 0 with learning rate η = 0.3. What is the true minimum?",
        solutionLatex:
          "f'(x) = 2x - 4 \\\\[6pt] x_1 = 0 - 0.3(2(0)-4) = 0 + 1.2 = 1.2 \\\\[4pt] x_2 = 1.2 - 0.3(2(1.2)-4) = 1.2 - 0.3(-1.6) = 1.2 + 0.48 = 1.68 \\\\[4pt] x_3 = 1.68 - 0.3(2(1.68)-4) = 1.68 - 0.3(-0.64) = 1.68 + 0.192 = 1.872 \\\\[8pt] \\text{True minimum: } f'(x^*)=0 \\Rightarrow x^*=2,\\ f(2)=1",
        solutionExplanation:
          "We're converging toward x* = 2 from below. After 3 steps we're at 1.872 — close but not there. More steps (or larger η) would get closer. The 'bouncing' pattern you'd see with η too large is the classic gradient descent instability.",
      },
      exercises: [
        {
          id: "gd-1",
          prompt:
            "For f(x) = x², starting at x₀ = 5 with learning rate η, derive a closed-form expression for xₙ after n steps. For what values of η does GD converge?",
          hint: "f'(x) = 2x. The update is xₙ₊₁ = xₙ − η·2xₙ = (1−2η)xₙ. This is a geometric sequence.",
          solution:
            "xₙ₊₁ = (1−2η)xₙ, so xₙ = (1−2η)ⁿ · x₀ = 5(1−2η)ⁿ.\n\nConvergence: xₙ → 0 iff |1−2η| < 1 iff 0 < η < 1.\nFor η > 1: diverges (oscillates with increasing magnitude).\nFor η = 0.5: xₙ₊₁ = 0 (one step to minimum — perfect step size for this quadratic).\nFor η = 1: xₙ₊₁ = −xₙ (oscillates forever, never converges).",
        },
        {
          id: "gd-2",
          prompt:
            "SGD uses noisy gradient estimates ĝₜ = ∇L(θₜ; xᵢ) (gradient on one sample). Explain: (a) why this noise is sometimes beneficial (not just a nuisance), (b) what 'learning rate decay' (reducing η over time) accomplishes.",
          hint: "Think about saddle points and local minima. What would a zero-noise optimizer do at a saddle point?",
          solution:
            "(a) Noise is beneficial because: (1) Saddle points — gradient is 0 but it's not a minimum; noisy gradients perturb the optimizer off saddle points that batch GD would get stuck at. (2) Sharp local minima — noise tends to push toward 'flat' minima that generalize better (Keskar et al. 2017 finding: large-batch SGD finds sharp minima that overfit more).\n\n(b) Learning rate decay: At the start, large η lets us move quickly through the landscape. As we approach a minimum, large η causes oscillation (we overshoot). Decaying η gradually lets us make finer adjustments. Common schedules: step decay, cosine annealing (used in transformers), linear warmup + decay.",
        },
      ],
      hasViz: true,
    },
    {
      id: "backprop",
      title: "Backpropagation — The Chain Rule at Scale",
      anime: {
        series: "Fullmetal Alchemist: Brotherhood",
        character: "Roy Mustang",
        analogy:
          "Colonel Mustang's Flame Alchemy works by controlling oxygen in the air — a chain of chemical reactions where each step depends on the one before. Backpropagation is the reverse: you know the final explosion was too big (high loss), and you trace backward through the chain to find which early adjustments (weights) caused it. Equivalent Exchange again: the error at the output exchanges information with every layer on the way back.",
      },
      mlConnection:
        "Backpropagation is THE algorithm that makes deep learning work. It's just the chain rule applied systematically to a computation graph. PyTorch's autograd, JAX's grad(), and TensorFlow's GradientTape all implement this automatically.",
      conceptHtml: `
        <p><strong>Backpropagation</strong> computes ∂L/∂θ for every parameter θ in a network efficiently by reusing intermediate results.</p>
        <p><strong>Forward pass:</strong> compute the output layer by layer, caching intermediate values.</p>
        <p><strong>Backward pass:</strong> starting from the loss, apply the chain rule in reverse, propagating gradients from output to input.</p>
        <p>For a single neuron: z = w·x + b, a = σ(z), L = some_loss(a):</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li>∂L/∂a = local gradient from the loss</li>
          <li>∂L/∂z = (∂L/∂a) · σ'(z)</li>
          <li>∂L/∂w = (∂L/∂z) · x — gradient of loss w.r.t. weight</li>
          <li>∂L/∂b = ∂L/∂z — gradient of loss w.r.t. bias</li>
        </ul>
        <p class="mt-2">The key insight: every operation in the computation graph only needs to know its own local gradient, and the chain rule handles the rest. This is why automatic differentiation (autograd) works.</p>
      `,
      mathBlocks: [
        {
          label: "Chain rule through a network layer",
          latex: "\\frac{\\partial L}{\\partial \\mathbf{W}^{(l)}} = \\frac{\\partial L}{\\partial \\mathbf{a}^{(l)}} \\cdot \\frac{\\partial \\mathbf{a}^{(l)}}{\\partial \\mathbf{z}^{(l)}} \\cdot \\frac{\\partial \\mathbf{z}^{(l)}}{\\partial \\mathbf{W}^{(l)}}",
        },
        {
          label: "Backprop update for weight matrix",
          latex: "\\frac{\\partial L}{\\partial W^{(l)}} = \\delta^{(l)} (\\mathbf{a}^{(l-1)})^\\top, \\quad \\delta^{(l)} = \\delta^{(l+1)} (W^{(l+1)})^\\top \\odot \\sigma'(\\mathbf{z}^{(l)})",
        },
      ],
      workedExample: {
        problem:
          "A tiny 1-layer network: z = wx + b, ŷ = σ(z), L = (ŷ − y)². Given x = 2, y = 1, w = 0.5, b = 0: compute the forward pass, then backpropagate to find ∂L/∂w and ∂L/∂b.",
        solutionLatex:
          "\\textbf{Forward:} \\\\[4pt] z = 0.5(2) + 0 = 1.0 \\\\[2pt] \\hat{y} = \\sigma(1.0) = \\frac{1}{1+e^{-1}} \\approx 0.731 \\\\[2pt] L = (0.731 - 1)^2 \\approx 0.0724 \\\\[10pt] \\textbf{Backward (chain rule):} \\\\[4pt] \\frac{\\partial L}{\\partial \\hat{y}} = 2(\\hat{y}-y) = 2(-0.269) = -0.538 \\\\[4pt] \\frac{\\partial \\hat{y}}{\\partial z} = \\sigma(z)(1-\\sigma(z)) \\approx 0.731 \\times 0.269 \\approx 0.197 \\\\[4pt] \\frac{\\partial L}{\\partial z} = -0.538 \\times 0.197 \\approx -0.106 \\\\[4pt] \\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial z} \\cdot x = -0.106 \\times 2 = -0.212 \\\\[4pt] \\frac{\\partial L}{\\partial b} = \\frac{\\partial L}{\\partial z} \\cdot 1 = -0.106",
        solutionExplanation:
          "∂L/∂w = −0.212 means: increasing w slightly decreases the loss. With learning rate η = 0.1, the update would be: w ← 0.5 − 0.1(−0.212) = 0.521. The weight grows, pushing ŷ toward 1.",
      },
      exercises: [
        {
          id: "bp-1",
          prompt:
            "Explain the 'vanishing gradient' problem in your own words. Why does it occur in deep networks with sigmoid activations? What activation functions were introduced to mitigate it?",
          hint: "Look at σ'(z) = σ(z)(1-σ(z)). What is its maximum value? What happens when you multiply many such values together in a deep chain?",
          solution:
            "σ'(z) = σ(z)(1-σ(z)) ≤ 0.25 for all z. In a 10-layer network, the gradient at the first layer involves a product of 10 such terms: (0.25)^10 ≈ 10^{-6}. This extremely small gradient means early layers barely update — they stop learning.\n\nFixes: (1) ReLU: f'(x) = 1 for x > 0, no squashing. (2) Residual connections (ResNets): bypass layers give gradients a 'highway' back. (3) Careful initialization (Xavier/He init). (4) Batch normalization: keeps activations in a range where σ' isn't saturated.",
        },
      ],
    },
  ],
};
