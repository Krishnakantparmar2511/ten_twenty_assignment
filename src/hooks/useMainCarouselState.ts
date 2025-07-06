"use client";


import { IUseMainCarouselState } from "@/interface/common";
import { mainCarouselImages } from "core/utils/constants/constants";
import { useEffect, useState } from "react";

export const useMainCarouselState = () => {
  // Initialize state for main carousel functionality
  const [state, setState] = useState<IUseMainCarouselState>({
    currentIndex: 0,        
    progress: 0,            
    isTransitioning: false, 
    nextImageIndex: 1,      
    isLoaded: false,        
  });

  const updateState = (updates: Partial<IUseMainCarouselState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Calculate next image index
  const nextIndex = (state.currentIndex + 1) % mainCarouselImages.length;

  // Trigger initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ isLoaded: true });
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const progressInterval = setInterval(() => {
      setState((prev) => {
        if (prev.progress >= 100) {
          const nextIdx = (prev.currentIndex + 1) % mainCarouselImages.length;


          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              currentIndex: nextIdx,
              isTransitioning: false,
              progress: 0,
            }));
          }, 3500);

          return {
            ...prev,
            nextImageIndex: nextIdx,
            isTransitioning: true,
            progress: 0,
          };
        }

        return {
          ...prev,
          progress: prev.progress + 100 / 70,
        };
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [mainCarouselImages.length]);

  // Manually triggering next image
  const nextImage = () => {
    const nextIdx = (state.currentIndex + 1) % mainCarouselImages.length;
    updateState({ nextImageIndex: nextIdx, isTransitioning: true });

    setTimeout(() => {
      updateState({
        currentIndex: nextIdx,
        progress: 0,
        isTransitioning: false,
      });
    }, 3500);
  };

  return { state, updateState, nextIndex, nextImage };
};