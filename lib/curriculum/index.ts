export { linearAlgebra } from "./linear-algebra";
export { calculus } from "./calculus";
export { probability } from "./probability";
export type { Module, Lesson, Exercise } from "./types";

import { linearAlgebra } from "./linear-algebra";
import { calculus } from "./calculus";
import { probability } from "./probability";
import type { Module } from "./types";

export const curriculum: Module[] = [linearAlgebra, calculus, probability];
