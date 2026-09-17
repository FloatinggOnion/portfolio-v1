"use client";

import { useState } from "react";
import { LessonView } from "./LessonView";
import type { Module } from "@/lib/curriculum/types";

const MODULE_COLORS: Record<string, string> = {
  indigo: "border-indigo-200 bg-indigo-50",
  amber: "border-amber-200 bg-amber-50",
  emerald: "border-emerald-200 bg-emerald-50",
};

const MODULE_TAG_COLORS: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

type Props = {
  module: Module;
  index: number;
  onComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
};

export function ModuleAccordion({ module, index, onComplete, isComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const totalExercises = module.lessons.flatMap((l) => l.exercises).length;
  const completedExercises = module.lessons
    .flatMap((l) => l.exercises)
    .filter((e) => isComplete(e.id)).length;

  const progress = totalExercises > 0 ? completedExercises / totalExercises : 0;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? MODULE_COLORS[module.color] : "border-neutral-200"}`}>
      {/* Module header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="text-xs font-mono text-neutral-400 w-5 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-bold text-neutral-900 text-base">{module.title}</h2>
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${MODULE_TAG_COLORS[module.color]}`}>
              {module.lessons.length} lessons
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">{module.tagline}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs font-mono text-neutral-400">
              {completedExercises}/{totalExercises}
            </div>
            <div className="w-16 h-1 bg-neutral-200 rounded-full mt-1">
              <div
                className="h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
          <span className="text-neutral-400">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* Lessons */}
      {open && (
        <div className="border-t border-neutral-200">
          {module.lessons.map((lesson, li) => {
            const lessonComplete = lesson.exercises.every((e) => isComplete(e.id));
            const isActive = activeLesson === lesson.id;
            return (
              <div key={lesson.id} className="border-b border-neutral-200 last:border-0">
                <button
                  onClick={() => setActiveLesson(isActive ? null : lesson.id)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-white/70 transition-colors"
                >
                  <span className="text-xs font-mono text-neutral-300 w-5 shrink-0">
                    {li + 1}.
                  </span>
                  <span className={`flex-1 text-sm ${isActive ? "font-semibold text-neutral-900" : "text-neutral-700"}`}>
                    {lesson.title}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {lessonComplete && lesson.exercises.length > 0 && (
                      <span className="text-xs font-mono text-neutral-400">✓</span>
                    )}
                    <span className="text-xs text-neutral-300">
                      {lesson.exercises.length > 0 ? `${lesson.exercises.filter((e) => isComplete(e.id)).length}/${lesson.exercises.length} ex` : "read"}
                    </span>
                    <span className="text-neutral-300 text-xs">{isActive ? "▲" : "▼"}</span>
                  </div>
                </button>

                {isActive && (
                  <div className="px-5 pb-6 pt-2 bg-white/60">
                    <LessonView
                      lesson={lesson}
                      moduleId={module.id}
                      onComplete={onComplete}
                      isComplete={isComplete}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
