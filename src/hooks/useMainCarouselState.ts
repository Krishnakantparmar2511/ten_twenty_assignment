"use client";

import { IUseMainCarouselState } from "@/interface/common";
import { mainCarouselImages } from "core/utils/constants/constants";
import { useEffect, useState, useRef, useCallback } from "react";

export const useMainCarouselState = () => {
  // Initialize state for main carousel functionality
  const [state, setState] = useState<IUseMainCarouselState>({
    currentIndex: 0,        
    progress: 0,            
    isTransitioning: false, 
    nextImageIndex: 1,      
    isLoaded: false,        
  });

  // references 
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateState = useCallback((updates: Partial<IUseMainCarouselState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Calculate next image index
  const nextIndex = (state.currentIndex + 1) % mainCarouselImages.length;

  // Clear existing timers
  const clearTimers = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  // Start progress interval
  const startProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.progress >= 100) {
          const nextIdx = (prev.currentIndex + 1) % mainCarouselImages.length;

          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
          }

          transitionTimeoutRef.current = setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              isTransitioning: false,
            }));
          }, 3500);

          return {
            ...prev,
            currentIndex: nextIdx,
            nextImageIndex: nextIdx,
            isTransitioning: true,
            progress: 100 / 70,
          };
        }

        return {
          ...prev,
          progress: prev.progress + (100 / 70),
        };
      });
    }, 100);
  }, []);

  // Trigger initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ isLoaded: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [updateState]);

  // Start the progress interval when component mounts
  useEffect(() => {
    startProgressInterval();

    return () => {
      clearTimers();
    };
  }, [startProgressInterval, clearTimers]);

  // Manually triggering next image
  const nextImage = useCallback(() => {
    const nextIdx = (state.currentIndex + 1) % mainCarouselImages.length;
    
    clearTimers();
    
    setState((prev) => ({
      ...prev,
      currentIndex: nextIdx,
      nextImageIndex: nextIdx,
      isTransitioning: true,
      progress: 100 / 70, 
    }));

    transitionTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTransitioning: false,
      }));
      
      startProgressInterval();
    }, 3500);
  }, [state.currentIndex, clearTimers, startProgressInterval]);

  return { state, updateState, nextIndex, nextImage };
};