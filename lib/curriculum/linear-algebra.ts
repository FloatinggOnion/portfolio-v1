import { Module } from "./types";

export const linearAlgebra: Module = {
  id: "linear-algebra",
  title: "Linear Algebra",
  tagline: "The geometry of intelligence",
  color: "indigo",
  lessons: [
    {
      id: "vectors",
      title: "Vectors — Direction, Magnitude, Meaning",
      anime: {
        series: "Attack on Titan",
        character: "Scout Regiment",
        analogy:
          "ODM gear shoots a wire in a direction with a force — that's a vector. The direction tells you where you're going; the magnitude (tension on the wire) tells you how hard you're pulling. Change either and you end up somewhere completely different. In ML, every data point — a pixel image, a user embedding, a sentence — is just a very long ODM wire pointing somewhere in high-dimensional space.",
      },
      mlConnection:
        "Word2Vec, sentence embeddings, and neural network activations are all vectors. When GPT says two words are 'semantically similar,' it means their vectors point in nearly the same direction. Cosine similarity measures exactly that angle.",
      conceptHtml: `
        <p>A <strong>vector</strong> is an ordered list of numbers that simultaneously encodes a direction and a magnitude. In 2D:</p>
        <p>A vector <strong>v</strong> = (3, 4) means: go 3 units right, 4 units up. Its magnitude (length) is √(3² + 4²) = 5.</p>
        <p>Vectors can be added — tip-to-tail — and scaled. These two operations, addition and scalar multiplication, are the heartbeat of all of linear algebra.</p>
        <p>Key operations:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Addition:</strong> u + v — combine directions</li>
          <li><strong>Scalar multiplication:</strong> αv — scale magnitude, preserve direction</li>
          <li><strong>Dot product:</strong> u·v — measures alignment (how much u points in v's direction)</li>
          <li><strong>Norm (magnitude):</strong> ‖v‖ = √(v·v)</li>
        </ul>
      `,
      mathBlocks: [
        {
          label: "Vector notation",
          latex: "\\mathbf{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{pmatrix} \\in \\mathbb{R}^n",
        },
        {
          label: "Euclidean norm (L2 norm)",
          latex: "\\|\\mathbf{v}\\| = \\sqrt{v_1^2 + v_2^2 + \\cdots + v_n^2} = \\sqrt{\\mathbf{v} \\cdot \\mathbf{v}}",
        },
        {
          label: "Dot product",
          latex: "\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^{n} u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta",
        },
        {
          label: "Cosine similarity (ML workhorse)",
          latex: "\\text{sim}(\\mathbf{u}, \\mathbf{v}) = \\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}",
        },
      ],
      workedExample: {
        problem:
          "Given u = (1, 2, 3) and v = (4, 0, -1), find: (a) u + v, (b) ‖u‖, (c) the cosine similarity between u and v.",
        solutionLatex:
          "\\mathbf{u} + \\mathbf{v} = (5, 2, 2) \\\\[8pt] \\|\\mathbf{u}\\| = \\sqrt{1+4+9} = \\sqrt{14} \\\\[8pt] \\mathbf{u} \\cdot \\mathbf{v} = 4 + 0 - 3 = 1 \\\\[8pt] \\|\\mathbf{v}\\| = \\sqrt{16+0+1} = \\sqrt{17} \\\\[8pt] \\cos\\theta = \\frac{1}{\\sqrt{14}\\cdot\\sqrt{17}} = \\frac{1}{\\sqrt{238}} \\approx 0.065",
        solutionExplanation:
          "The cosine similarity ≈ 0.065 means these vectors are nearly orthogonal (perpendicular) — almost no alignment. In NLP, this would mean the two words/sentences are semantically unrelated.",
      },
      exercises: [
        {
          id: "vec-1",
          prompt:
            "Let a = (2, -1, 4) and b = (0, 3, -2). Compute: (a) a + b, (b) 3a − 2b, (c) a · b.",
          hint: "For the dot product, multiply corresponding components and sum. For scalar multiples, distribute the scalar to each component.",
          solution:
            "(a) a + b = (2, 2, 2)\n(b) 3a − 2b = (6, −3, 12) − (0, 6, −4) = (6, −9, 16)\n(c) a · b = (2)(0) + (−1)(3) + (4)(−2) = 0 − 3 − 8 = −11",
        },
        {
          id: "vec-2",
          prompt:
            "A sentence embedding model outputs u = (0.6, 0.8) for 'king' and v = (0.8, 0.6) for 'queen'. What is the cosine similarity? What does this value tell you?",
          hint: "Normalize each vector first. Both happen to already be unit vectors (‖u‖ = 1, ‖v‖ = 1) — verify this first.",
          solution:
            "‖u‖ = √(0.36 + 0.64) = 1, ‖v‖ = 1.\ncos θ = u · v = (0.6)(0.8) + (0.8)(0.6) = 0.48 + 0.48 = 0.96.\nVery high similarity (close to 1) — the model has learned that 'king' and 'queen' are semantically close.",
        },
        {
          id: "vec-3",
          prompt:
            "Prove that for any non-zero vector v, the vector v / ‖v‖ has magnitude 1. This operation is called 'unit normalization' and is done constantly in ML.",
          hint: "Compute ‖v / ‖v‖‖ using the definition of norm and the scalar multiplication property ‖αv‖ = |α| · ‖v‖.",
          solution:
            "Let u = v / ‖v‖. Then:\n‖u‖ = ‖v / ‖v‖‖ = (1 / ‖v‖) · ‖v‖ = 1. ∎\nThis works because ‖αv‖ = |α| · ‖v‖ for any scalar α, and here α = 1/‖v‖ > 0.",
        },
      ],
      hasViz: true,
    },
    {
      id: "matrices",
      title: "Matrices — Transformations in Disguise",
      anime: {
        series: "Fullmetal Alchemist: Brotherhood",
        character: "Edward Elric",
        analogy:
          "Alchemy's law of Equivalent Exchange: 'To obtain something of equal value must be lost.' A matrix is the alchemist's circle — it transforms input into output by rearranging, rotating, stretching, and squashing. Multiply a vector by a matrix and you're transmuting it: same underlying 'stuff', totally different shape. And just like alchemy, not all matrices are reversible — some transmutations destroy information forever (singular matrices).",
      },
      mlConnection:
        "Every layer of a neural network is a matrix multiplication followed by a non-linearity. The 'weights' of a network are matrix entries. Attention in transformers is three matrices (Q, K, V) doing simultaneous transformations to find which parts of a sequence to attend to.",
      conceptHtml: `
        <p>A <strong>matrix</strong> A ∈ ℝ^(m×n) is a rectangular array of numbers with m rows and n columns. It defines a <strong>linear transformation</strong> from ℝⁿ → ℝᵐ: feed it a vector, get a transformed vector out.</p>
        <p>Key intuitions:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>Matrix × vector:</strong> Each output component is a weighted sum of input components</li>
          <li><strong>Matrix × matrix:</strong> Composing two transformations (apply A, then B = multiply BA)</li>
          <li><strong>Transpose Aᵀ:</strong> Flip rows and columns — also flips the transformation direction</li>
          <li><strong>Inverse A⁻¹:</strong> The "undo" operation — only exists if A doesn't collapse dimensions (det A ≠ 0)</li>
          <li><strong>Rank:</strong> How many dimensions of information the matrix preserves</li>
        </ul>
      `,
      mathBlocks: [
        {
          label: "Matrix-vector product",
          latex: "(A\\mathbf{x})_i = \\sum_{j=1}^{n} A_{ij} x_j",
        },
        {
          label: "Matrix multiplication",
          latex: "(AB)_{ij} = \\sum_{k=1}^{p} A_{ik} B_{kj}",
        },
        {
          label: "Determinant (2×2)",
          latex: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
        },
        {
          label: "Invertibility condition",
          latex: "A^{-1} \\text{ exists} \\iff \\det(A) \\neq 0 \\iff \\text{rank}(A) = n",
        },
      ],
      workedExample: {
        problem:
          "Let A = [[2, 1], [0, 3]] and x = (1, 2). Compute Ax. Interpret geometrically: what transformation does A apply?",
        solutionLatex:
          "A\\mathbf{x} = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 2(1) + 1(2) \\\\ 0(1) + 3(2) \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 6 \\end{pmatrix}",
        solutionExplanation:
          "A stretches the x-axis by 2, the y-axis by 3, and shears (tilts) horizontally by 1. det(A) = 6 ≠ 0, so it's invertible — the transformation doesn't collapse any dimension.",
      },
      exercises: [
        {
          id: "mat-1",
          prompt:
            "Compute the matrix product AB where A = [[1,2],[3,4]] and B = [[5,6],[7,8]]. Then check: does BA = AB? Why does this matter in neural networks?",
          hint: "Matrix multiplication is not commutative in general. (AB)_ij = sum over k of A_ik * B_kj.",
          solution:
            "AB = [[1·5+2·7, 1·6+2·8],[3·5+4·7, 3·6+4·8]] = [[19, 22],[43, 50]]\nBA = [[5·1+6·3, 5·2+6·4],[7·1+8·3, 7·2+8·4]] = [[23, 34],[31, 46]]\nAB ≠ BA. This matters because in neural networks, the order of weight matrices determines the transformation sequence — you cannot swap layers.",
        },
        {
          id: "mat-2",
          prompt:
            "A 2D rotation by angle θ is given by R = [[cos θ, -sin θ],[sin θ, cos θ]]. What is det(R)? What is R⁻¹? Verify by computing R · R⁻¹.",
          hint: "Use the 2×2 determinant formula. For the inverse, think geometrically: what undoes a rotation by θ?",
          solution:
            "det(R) = cos²θ + sin²θ = 1 (Pythagorean identity).\nR⁻¹ = R(-θ) = [[cos θ, sin θ],[-sin θ, cos θ]] = Rᵀ.\nR·Rᵀ = [[cos²θ+sin²θ, cosθsinθ-sinθcosθ],[-sinθcosθ+cosθsinθ, sin²θ+cos²θ]] = I. ✓\nRotation matrices are orthogonal (Rᵀ=R⁻¹) — they preserve length and angles.",
        },
      ],
    },
    {
      id: "eigenvalues",
      title: "Eigenvalues & Eigenvectors — A Matrix's True Nature",
      anime: {
        series: "Hunter × Hunter",
        character: "Gon Freecss",
        analogy:
          "In HxH, every person's Nen has a natural 'type' — Enhancement, Emission, Manipulation, etc. — that their aura flows most naturally toward. No matter what they do, that underlying type pulls them back. Eigenvectors are a matrix's natural types: directions it doesn't rotate, only stretches or squishes. Feed the matrix an eigenvector, and it just scales it — no turning. The eigenvalue is how much it scales. PCA in ML finds the 'Nen type' of your data's variance.",
      },
      mlConnection:
        "PCA (Principal Component Analysis) finds eigenvectors of the covariance matrix to identify the directions of maximum variance in data. PageRank, the original Google algorithm, finds the dominant eigenvector of the web's link matrix. Transformer attention patterns can be analyzed through their eigenstructure.",
      conceptHtml: `
        <p>For a square matrix A, a non-zero vector <strong>v</strong> is an <strong>eigenvector</strong> if multiplying by A only scales it — doesn't rotate it:</p>
        <p>The scalar λ is the corresponding <strong>eigenvalue</strong> — the stretch factor. If λ > 1: stretch. If 0 < λ < 1: compress. If λ < 0: flip direction.</p>
        <p>To find eigenvalues: solve det(A − λI) = 0. This gives a polynomial in λ whose roots are the eigenvalues. Then substitute each λ back to find the eigenvector directions.</p>
        <p>Why care? The eigenvectors form a natural coordinate system for the transformation — the axes where the matrix behaves most simply.</p>
      `,
      mathBlocks: [
        {
          label: "Eigenvalue equation",
          latex: "A\\mathbf{v} = \\lambda\\mathbf{v} \\quad (\\mathbf{v} \\neq \\mathbf{0})",
        },
        {
          label: "Characteristic polynomial",
          latex: "\\det(A - \\lambda I) = 0",
        },
        {
          label: "Eigendecomposition (diagonalizable A)",
          latex: "A = Q\\Lambda Q^{-1}, \\quad \\Lambda = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)",
        },
        {
          label: "PCA: covariance eigenvectors",
          latex: "\\Sigma \\mathbf{v}_k = \\lambda_k \\mathbf{v}_k, \\quad \\Sigma = \\frac{1}{n}X^\\top X",
        },
      ],
      workedExample: {
        problem: "Find the eigenvalues and eigenvectors of A = [[3, 1], [0, 2]].",
        solutionLatex:
          "\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) - 0 = 0 \\\\[6pt] \\lambda_1 = 3, \\quad \\lambda_2 = 2 \\\\[8pt] \\text{For } \\lambda_1=3: (A-3I)\\mathbf{v}=0 \\Rightarrow \\begin{pmatrix}0&1\\\\0&-1\\end{pmatrix}\\mathbf{v}=0 \\Rightarrow \\mathbf{v}_1=\\begin{pmatrix}1\\\\0\\end{pmatrix} \\\\[8pt] \\text{For } \\lambda_2=2: (A-2I)\\mathbf{v}=0 \\Rightarrow \\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}\\mathbf{v}=0 \\Rightarrow \\mathbf{v}_2=\\begin{pmatrix}-1\\\\1\\end{pmatrix}",
        solutionExplanation:
          "The matrix stretches the x-axis by factor 3 (eigenvector [1,0]) and stretches the direction [-1,1] by factor 2. These are the 'natural axes' of A.",
      },
      exercises: [
        {
          id: "eig-1",
          prompt:
            "Find the eigenvalues of the 2×2 identity matrix I = [[1,0],[0,1]]. What are the eigenvectors? Does this make geometric sense?",
          hint: "det(I - λI) = det((1-λ)I). Every non-zero vector is an eigenvector of I — why?",
          solution:
            "det(I - λI) = (1-λ)² = 0 ⟹ λ = 1 (repeated).\nEvery non-zero vector v is an eigenvector since Iv = v = 1·v.\nGeometrically: the identity does nothing (no rotation, no stretch), so every direction is preserved — all are eigenvectors with eigenvalue 1.",
        },
        {
          id: "eig-2",
          prompt:
            "In PCA, we say the first principal component 'explains the most variance.' Given that the covariance matrix Σ has eigenvalues λ₁ ≥ λ₂ ≥ ... ≥ λₙ, explain in your own words why the eigenvector corresponding to λ₁ is the 'most important' direction.",
          hint: "Think about what an eigenvalue means geometrically. Larger eigenvalue = larger stretch factor. What does 'stretch' correspond to in the context of data variance?",
          solution:
            "The covariance matrix Σ encodes how much the data varies in each direction. When Σ acts on its eigenvector v₁, it scales it by λ₁ — the largest scaling factor means v₁ is the direction where data varies the most (highest spread). Projecting data onto v₁ gives the maximum variance, so it captures more 'information' than any other single direction. The first PC is the axis where the data cloud is longest.",
        },
      ],
    },
    {
      id: "svd",
      title: "SVD — The Swiss Army Knife",
      anime: {
        series: "Demon Slayer",
        character: "Tanjiro Kamado",
        analogy:
          "Water Breathing has multiple forms — each adapted for a different situation. SVD similarly decomposes any matrix into three clean pieces: rotate, stretch, rotate back. It's the Swiss Army knife of linear algebra, adapting to compression, noise reduction, recommendation systems, and more. And like Tanjiro always finding the most efficient angle of attack, SVD finds the most efficient representation of any transformation.",
      },
      mlConnection:
        "SVD underlies PCA, collaborative filtering (Netflix-style recommendation), latent semantic analysis (old-school NLP), low-rank matrix approximation, and the theoretical analysis of why deep networks generalize.",
      conceptHtml: `
        <p>The <strong>Singular Value Decomposition</strong> factorizes any m×n matrix A into three matrices:</p>
        <ul class="list-disc ml-5 space-y-1 mt-2">
          <li><strong>U</strong> (m×m): orthogonal matrix — 'output rotation'</li>
          <li><strong>Σ</strong> (m×n): diagonal matrix with non-negative values σ₁ ≥ σ₂ ≥ ... ≥ 0 — the 'stretch factors' (singular values)</li>
          <li><strong>Vᵀ</strong> (n×n): orthogonal matrix — 'input rotation'</li>
        </ul>
        <p class="mt-2">Read it as: first rotate input (Vᵀ), then stretch/squash each axis independently (Σ), then rotate into output space (U).</p>
        <p class="mt-2"><strong>Low-rank approximation:</strong> Keep only the k largest singular values. The result Aₖ = U_k Σ_k V_kᵀ is the best rank-k approximation to A — maximum information, minimum parameters.</p>
      `,
      mathBlocks: [
        {
          label: "SVD factorization",
          latex: "A = U\\Sigma V^\\top",
        },
        {
          label: "Singular values and rank",
          latex: "\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq \\sigma_r > 0 = \\sigma_{r+1} = \\cdots, \\quad \\text{rank}(A) = r",
        },
        {
          label: "Best rank-k approximation (Eckart-Young)",
          latex: "A_k = \\sum_{i=1}^{k} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^\\top = \\arg\\min_{\\text{rank}(B)\\leq k} \\|A - B\\|_F",
        },
      ],
      workedExample: {
        problem:
          "A movie rating matrix A has singular values σ₁ = 10, σ₂ = 5, σ₃ = 1, σ₄ = 0.1. If you keep only the top-2 singular values for a recommendation system, what fraction of the 'energy' (Frobenius norm squared) does your approximation capture?",
        solutionLatex:
          "\\|A\\|_F^2 = \\sum_i \\sigma_i^2 = 100 + 25 + 1 + 0.01 = 126.01 \\\\[8pt] \\|A_2\\|_F^2 = \\sigma_1^2 + \\sigma_2^2 = 100 + 25 = 125 \\\\[8pt] \\text{Fraction} = \\frac{125}{126.01} \\approx 99.2\\%",
        solutionExplanation:
          "Keeping only 2 of 4 singular values captures 99.2% of the 'energy' in the matrix. This is why low-rank decomposition is so powerful — most real-world matrices have rapidly decaying singular values.",
      },
      exercises: [
        {
          id: "svd-1",
          prompt:
            "Explain in your own words why keeping the top-k singular values gives the best rank-k approximation (don't just state the Eckart-Young theorem — explain the intuition).",
          hint: "Think about what singular values represent: the 'stretch factors' in each direction. Which directions carry the most information about the data?",
          solution:
            "Singular values measure how much the matrix 'amplifies' each direction. A large σ₁ means the matrix has a dominant direction that explains a lot of the structure. Dropping small singular values removes directions where there's barely any signal — they mostly represent noise or minor variation. The Frobenius norm of A − Aₖ is exactly √(σ_{k+1}² + ... + σᵣ²), so removing the smallest σᵢ minimizes the approximation error. It's like compressing an image: remove the fine details (small singular values) and the big picture (large singular values) remains.",
        },
      ],
    },
  ],
};
