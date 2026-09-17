"use client";

import { curriculum } from "@/lib/curriculum";
import { ModuleAccordion } from "@/components/learn/ModuleAccordion";
import { useProgress } from "@/components/learn/ProgressTracker";

export default function LearnPage() {
  const { markComplete, isComplete, completedCount, resetProgress } = useProgress();

  const totalExercises = curriculum.flatMap((m) => m.lessons.flatMap((l) => l.exercises)).length;
  const totalLessons = curriculum.flatMap((m) => m.lessons).length;

  return (
    <div className="mt-10 space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-extrabold uppercase border border-dashed border-black rounded-xl px-4 py-1 inline-block">
              Learn
            </h1>
            <p className="text-neutral-500 mt-3 text-sm max-w-lg leading-relaxed">
              Math, CS, and AI fundamentals — built on intuition, grounded in rigor. The ML-critical path:
              linear algebra, calculus, probability. Analogies from across anime, connections to real ML practice.
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="text-xs font-mono text-neutral-400">
              {completedCount}/{totalExercises} exercises
            </div>
            <div className="text-xs font-mono text-neutral-400">
              {totalLessons} lessons · {curriculum.length} modules
            </div>
            {completedCount > 0 && (
              <button
                onClick={resetProgress}
                className="text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-600 transition-colors"
              >
                reset progress
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-neutral-100 rounded-full max-w-sm">
          <div
            className="h-full bg-black rounded-full transition-all duration-700"
            style={{ width: `${totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0}%` }}
          />
        </div>

        {/* Note on approach */}
        <div className="border border-dashed border-neutral-300 rounded-lg px-4 py-3 text-xs text-neutral-500 leading-relaxed max-w-lg">
          <strong className="text-neutral-700">How this works:</strong> Read the concept and anime analogy.
          Absorb the equations. Study the worked example. Then solve exercises on paper — mark attempted,
          then reveal the solution to check your reasoning.
        </div>
      </div>

      {/* Curriculum */}
      <div className="space-y-4">
        {curriculum.map((module, i) => (
          <ModuleAccordion
            key={module.id}
            module={module}
            index={i}
            onComplete={markComplete}
            isComplete={isComplete}
          />
        ))}
      </div>

      {/* Footer note */}
      <div className="text-xs text-neutral-400 border-t border-neutral-100 pt-6 space-y-1">
        <p>Progress is saved locally in your browser. No account needed.</p>
        <p>
          Inspired by the{" "}
          <a
            href="https://tomrocksmaths.com/wp-content/uploads/2026/06/achmad-roykhan-sabiq_essay_competition_2026-achmad-roykhan-sabiq.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-neutral-600 transition-colors"
          >
            mathematical foundations of Gojo&apos;s Infinity
          </a>{" "}
          and Henry Ndubuaku&apos;s{" "}
          <a
            href="https://henryndubuaku.github.io/maths-cs-ai-compendium/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-neutral-600 transition-colors"
          >
            Maths, CS &amp; AI Compendium
          </a>
          .
        </p>
      </div>
    </div>
  );
}
