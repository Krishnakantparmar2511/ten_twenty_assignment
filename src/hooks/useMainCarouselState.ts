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
    counterIndex: 0
  });


  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateState = (updates: Partial<IUseMainCarouselState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ isLoaded: true });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setState((prev) => {

        if (prev.isTransitioning) {
          return prev;
        }

        if (prev.progress >= 100) {
          const nextIdx = (prev.currentIndex + 1) % mainCarouselImages.length;
          
          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
          }

          transitionTimeoutRef.current = setTimeout(() => {
            setState((current) => ({
              ...current,
              currentIndex: nextIdx, 
              isTransitioning: false,
            }));
          }, 3500);

          return {
            ...prev,
            nextImageIndex: nextIdx,
            isTransitioning: true,
            progress: 0, 
            counterIndex: nextIdx,
          };
        }

        return {
          ...prev,
          progress: prev.progress + 100 / 70,
        };
      });
    }, 100);

    progressIntervalRef.current = progressInterval;
    
    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  // Manually triggering next image
  const nextImage = () => {
    const nextIdx = (state.currentIndex + 1) % mainCarouselImages.length;
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    setState(prev => ({
      ...prev,
      nextImageIndex: nextIdx,
      isTransitioning: true,
      progress: 0, 
      counterIndex: nextIdx,
    }));

    transitionTimeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentIndex: nextIdx,
        isTransitioning: false,
      }));
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return { state, updateState, nextImage };
};