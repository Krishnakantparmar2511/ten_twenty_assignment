"use client";

import { IUseMainCarouselState } from "@/interface/common";
import { mainCarouselImages } from "core/utils/constants/constants";
import { useEffect, useState, useRef } from "react";

export const useMainCarouselState = () => {
  // Initialize state for main carousel functionality
  const [state, setState] = useState<IUseMainCarouselState>({
    currentIndex: 0,        
    progress: 0,            
    isTransitioning: false, 
    nextImageIndex: 1,      
    isLoaded: false,        
  });

  // Use refs to track intervals and prevent race conditions
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateState = (updates: Partial<IUseMainCarouselState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Calculate next image index
  const nextIndex = (state.currentIndex + 1) % mainCarouselImages.length;


  const clearTimers = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  };

  // Start progress timer
  const startProgressTimer = () => {
    clearTimers();
    
    progressIntervalRef.current = setInterval(() => {
      setState((prev) => {

        if (prev.isTransitioning) {
          return prev;
        }

        if (prev.progress >= 100) {
          const nextIdx = (prev.currentIndex + 1) % mainCarouselImages.length;


          const newState = {
            ...prev,
            nextImageIndex: nextIdx,
            isTransitioning: true,
            progress: 0,
          };


          transitionTimeoutRef.current = setTimeout(() => {
            setState((prev) => ({
              ...prev,
              currentIndex: nextIdx,
              isTransitioning: false,
            }));
          }, 3500);

          return newState;
        }

        return {
          ...prev,
          progress: prev.progress + 100 / 70, 
        };
      });
    }, 100);
  };

  // Trigger initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ isLoaded: true });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Start progress timer when component mounts or when transition completes
  useEffect(() => {
    if (!state.isTransitioning) {
      startProgressTimer();
    }

    return () => clearTimers();
  }, [state.isTransitioning, state.currentIndex]);

  const nextImage = () => {

    clearTimers();
    
    const nextIdx = (state.currentIndex + 1) % mainCarouselImages.length;
    
    setState((prev) => ({
      ...prev,
      nextImageIndex: nextIdx,
      isTransitioning: true,
      progress: 0,
    }));


    transitionTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentIndex: nextIdx,
        isTransitioning: false,
      }));
    }, 3500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  return { state, updateState, nextIndex, nextImage };
};