"use client";

import { useState } from "react";
import { MathDisplay } from "./MathDisplay";
import type { Exercise } from "@/lib/curriculum/types";

type Props = {
  exercise: Exercise;
  index: number;
  onComplete: (id: string) => void;
  isCompleted: boolean;
};

function hasLatex(text: string) {
  return text.includes("\\") || text.includes("$");
}

function renderText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {hasLatex(line) ? <MathDisplay latex={line} display={false} /> : line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

export function ExerciseBlock({ exercise, index, onComplete, isCompleted }: Props) {
  const [attempted, setAttempted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function handleAttempted() {
    setAttempted(true);
  }

  function handleReveal() {
    setRevealed(true);
    onComplete(exercise.id);
  }

  return (
    <div
      className={`border rounded-lg p-4 space-y-3 transition-all duration-300 ${
        isCompleted
          ? "border-neutral-300 bg-neutral-50"
          : "border-dashed border-neutral-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
              isCompleted
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-500 border-neutral-300"
            }`}
          >
            {isCompleted ? "✓" : `ex ${index + 1}`}
          </span>
          <span className="text-xs text-neutral-400 font-mono uppercase tracking-wide">
            Exercise
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-neutral-800">{exercise.prompt}</p>

      {!attempted && (
        <div className="pt-1">
          <p className="text-xs text-neutral-400 mb-3">
            Solve this on paper. When you have an answer, mark it as attempted.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleAttempted}
              className="text-sm px-4 py-1.5 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              I've attempted this
            </button>
            {exercise.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm px-4 py-1.5 border border-neutral-300 rounded-full hover:border-neutral-500 transition-colors text-neutral-600"
              >
                {showHint ? "Hide hint" : "Show hint"}
              </button>
            )}
          </div>
          {showHint && exercise.hint && (
            <div className="mt-3 text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-lg p-3 leading-relaxed">
              <span className="font-mono uppercase text-xs tracking-wide text-neutral-400 block mb-1">Hint</span>
              {exercise.hint}
            </div>
          )}
        </div>
      )}

      {attempted && !revealed && (
        <div className="pt-1 space-y-2">
          <p className="text-xs text-neutral-500">
            Good. Now compare your answer:
          </p>
          <button
            onClick={handleReveal}
            className="text-sm px-4 py-1.5 border border-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition-colors text-neutral-800"
          >
            Reveal solution
          </button>
        </div>
      )}

      {revealed && (
        <div className="mt-2 bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-2">
          <span className="font-mono uppercase text-xs tracking-wide text-neutral-400 block">
            Solution
          </span>
          <div className="text-sm leading-relaxed text-neutral-700 space-y-1">
            {renderText(exercise.solution)}
          </div>
        </div>
      )}
    </div>
  );
}
