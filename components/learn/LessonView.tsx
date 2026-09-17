"use client";

import { useState, useEffect } from "react";
import { MathDisplay } from "./MathDisplay";
import { ExerciseBlock } from "./ExerciseBlock";
import { VectorViz } from "./VectorViz";
import { GradientViz } from "./GradientViz";
import { ProbabilityViz } from "./ProbabilityViz";
import type { Lesson } from "@/lib/curriculum/types";

type Props = {
  lesson: Lesson;
  moduleId: string;
  onComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
};

function VizForLesson({ lessonId, moduleId }: { lessonId: string; moduleId: string }) {
  if (moduleId === "linear-algebra" && lessonId === "vectors") return <VectorViz />;
  if (moduleId === "calculus" && lessonId === "gradient-descent") return <GradientViz />;
  if (moduleId === "probability" && lessonId === "distributions") return <ProbabilityViz />;
  return null;
}

export function LessonView({ lesson, moduleId, onComplete, isComplete }: Props) {
  const [exOpen, setExOpen] = useState(false);
  // Sanitize client-side only — dompurify needs window/document (not available on server).
  // conceptHtml is hardcoded TypeScript curriculum; this is belt-and-suspenders.
  const [safeConcept, setSafeConcept] = useState(lesson.conceptHtml);
  useEffect(() => {
    import("dompurify").then(({ default: DOMPurify }) => {
      setSafeConcept(
        DOMPurify.sanitize(lesson.conceptHtml, {
          ALLOWED_TAGS: ["p", "ul", "ol", "li", "strong", "em", "span", "br"],
          ALLOWED_ATTR: ["class"],
        })
      );
    });
  }, [lesson.conceptHtml]);

  const totalExercises = lesson.exercises.length;
  const completedExercises = lesson.exercises.filter((e) => isComplete(e.id)).length;

  return (
    <div className="space-y-6">
      {/* Anime analogy */}
      <div className="border-l-2 border-neutral-200 pl-4 space-y-1">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          {lesson.anime.series}
          {lesson.anime.character ? ` · ${lesson.anime.character}` : ""}
        </span>
        <p className="text-sm text-neutral-600 leading-relaxed italic">
          {lesson.anime.analogy}
        </p>
      </div>

      {/* ML Connection */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-1">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          ML connection
        </span>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {lesson.mlConnection}
        </p>
      </div>

      {/* Concept */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
          Concept
        </span>
        <div
          className="text-sm text-neutral-700 leading-loose space-y-2 [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_ul]:mt-2 [&_li]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: safeConcept }}
        />
      </div>

      {/* Math blocks */}
      {lesson.mathBlocks.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
            Key equations
          </span>
          <div className="space-y-2">
            {lesson.mathBlocks.map((block, i) => (
              <div key={i} className="border border-neutral-200 rounded-lg p-3 space-y-1">
                {block.label && (
                  <span className="text-xs text-neutral-400 font-mono">{block.label}</span>
                )}
                <MathDisplay latex={block.latex} display />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visualization */}
      {lesson.hasViz && (
        <div className="space-y-2">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
            Interactive
          </span>
          <VizForLesson lessonId={lesson.id} moduleId={moduleId} />
        </div>
      )}

      {/* Worked Example */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
          Worked example
        </span>
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <div className="bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            <strong className="text-xs font-mono text-neutral-400 block mb-1 uppercase">Problem</strong>
            {lesson.workedExample.problem}
          </div>
          <div className="px-4 py-3 space-y-3">
            <MathDisplay latex={lesson.workedExample.solutionLatex} display />
            <p className="text-xs text-neutral-500 leading-relaxed border-t border-neutral-100 pt-2">
              {lesson.workedExample.solutionExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-3">
        <button
          onClick={() => setExOpen((o) => !o)}
          className="flex items-center gap-2 w-full text-left"
        >
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Exercises
          </span>
          <span className="text-xs font-mono text-neutral-500 ml-auto">
            {completedExercises}/{totalExercises} done
          </span>
          <span className="text-neutral-400 text-sm">{exOpen ? "▲" : "▼"}</span>
        </button>

        {exOpen && (
          <div className="space-y-3">
            {lesson.exercises.map((exercise, i) => (
              <ExerciseBlock
                key={exercise.id}
                exercise={exercise}
                index={i}
                onComplete={onComplete}
                isCompleted={isComplete(exercise.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
