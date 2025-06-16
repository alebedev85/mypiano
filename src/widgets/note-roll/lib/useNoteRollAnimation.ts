import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeOldNotes, stopRoll } from "../model/noteRollSlice";
import type { VisualNote } from "../model/types";

export const useNoteRollAnimation = (
  isRolling: boolean,
  visualNotes: VisualNote[]
): number => {
  const dispatch = useDispatch();
  const animationRef = useRef<number | null>(null);
  const [now, setNow] = useState<number>(performance.now());

  const animate = () => {
    const newNow = performance.now();
    setNow(newNow);
    dispatch(removeOldNotes(newNow));
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRolling && animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }

    if (!isRolling && animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (visualNotes.length === 0 && isRolling) {
      dispatch(stopRoll());
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRolling, visualNotes]);

  return now;
};
