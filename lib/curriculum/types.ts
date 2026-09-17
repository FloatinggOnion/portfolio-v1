export type Exercise = {
  id: string;
  prompt: string;
  hint?: string;
  solution: string;
};

export type Lesson = {
  id: string;
  title: string;
  anime: {
    series: string;
    character?: string;
    analogy: string;
  };
  mlConnection: string;
  conceptHtml: string;
  mathBlocks: Array<{ label?: string; latex: string }>;
  workedExample: {
    problem: string;
    solutionLatex: string;
    solutionExplanation: string;
  };
  exercises: Exercise[];
  hasViz?: boolean;
};

export type Module = {
  id: string;
  title: string;
  tagline: string;
  color: string;
  lessons: Lesson[];
};
