"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "jp-learn-progress";

type Progress = Record<string, boolean>;

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(JSON.parse(stored));
    } catch {
      // localStorage not available
    }
  }, []);

  const markComplete = useCallback((exerciseId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [exerciseId]: true };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (exerciseId: string) => progress[exerciseId] === true,
    [progress]
  );

  const completedCount = Object.values(progress).filter(Boolean).length;

  const resetProgress = useCallback(() => {
    setProgress({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return { markComplete, isComplete, completedCount, resetProgress };
}
