"use client";

import { IUseDragCarouselStateProps } from "@/interface/common";
import { draggableCarouselImages } from "core/utils/constants/constants";
import { useEffect, useRef, useState } from "react";

export const useDragCarouselState = () => {
  // Initialize state for carousel functionality
  const [state, setState] = useState<IUseDragCarouselStateProps>({
    currentClientSlide: 0,
    isDragging: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,
    showDragIndicator: true,
    isMobile: false,
    isHeadingVisible: false,
    isParagraphVisible: false,
  });

  // Refs for DOM elements
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  
  // Helper function to update state
  const updateState = (updates: Partial<IUseDragCarouselStateProps>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Auto-hide drag indicator after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ showDragIndicator: false });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateState({ isHeadingVisible: true });

          setTimeout(() => {
            updateState({ isParagraphVisible: true });
          }, 300);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      updateState({ isMobile: window.innerWidth <= 700 });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigate to next slide
  const nextClientSlide = () => {
    updateState({
      currentClientSlide:
        (state.currentClientSlide + 1) % draggableCarouselImages.length,
    });
  };

  // Navigate to previous slide
  const prevClientSlide = () => {
    updateState({
      currentClientSlide:
        (state.currentClientSlide - 1 + draggableCarouselImages.length) %
        draggableCarouselImages.length,
    });
  };

  // Handle mouse drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    updateState({ isDragging: true, startX: e.clientX, currentX: e.clientX });
  };

  // Handle mouse drag movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!state.isDragging) return;

    const deltaX = e.clientX - state.startX;

    updateState({ currentX: e.clientX, dragOffset: deltaX });
  };

  // Handle mouse drag end
  const handleMouseUp = () => {
    if (!state.isDragging) return;

    updateState({ isDragging: false });
    const threshold = 100;

    if (Math.abs(state.dragOffset) > threshold) {
      if (state.dragOffset > 0) {
        prevClientSlide();
      } else {
        nextClientSlide();
      }
    }

    updateState({ dragOffset: 0 });
  };

  // Handle touch drag start
  const handleTouchStart = (e: React.TouchEvent) => {
    updateState({
      isDragging: true,
      startX: e.touches[0].clientX,
      currentX: e.touches[0].clientX,
    });
  };

  // Handle touch drag movement
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!state.isDragging) return;

    const deltaX = e.touches[0].clientX - state.startX;

    updateState({ currentX: e.touches[0].clientX, dragOffset: deltaX });
  };

  // Handle touch drag end
  const handleTouchEnd = () => {
    if (!state.isDragging) return;

    updateState({ isDragging: false });
    const threshold = 100;

    if (Math.abs(state.dragOffset) > threshold) {
      if (state.dragOffset > 0) {
        prevClientSlide();
      } else {
        nextClientSlide();
      }
    }

    updateState({ dragOffset: 0 });
  };

  // Calculate card transform styles based on position
  const getCardTransform = (index: number) => {
    let position = index - state.currentClientSlide;

    if (position > 2) position -= draggableCarouselImages.length;
    if (position < -2) position += draggableCarouselImages.length;

    if (Math.abs(position) > 1) {
      return {
        transform: `translate3d(${
          position > 0 ? 1000 : -1000
        }px, 0px, -400px) scale(0.3)`,
        opacity: 0,
        zIndex: 1,
      };
    }

    let x = 0;
    let y = 0;
    let rotationZ = 0;
    let scale = 1;
    let zIndex = 10;

    if (position === 0) {
      x = 0;
      y = 0;
      rotationZ = 0;
      scale = 1;
      zIndex = 20;
    } else if (position === -1) {
      x = state.isMobile ? -250 : -600;
      y = state.isMobile ? 30 : 50;
      rotationZ = state.isMobile ? -10 : -15;
      scale = state.isMobile ? 0.75 : 0.85;
      zIndex = 15;
    } else if (position === 1) {
      x = state.isMobile ? 250 : 600;
      y = state.isMobile ? 30 : 50;
      rotationZ = state.isMobile ? 10 : 15;
      scale = state.isMobile ? 0.75 : 0.85;
      zIndex = 15;
    }

    const maxDragOffset = state.isMobile ? 80 : 150;
    const limitedDragOffset = Math.max(
      -maxDragOffset,
      Math.min(maxDragOffset, state.dragOffset)
    );
    x += limitedDragOffset;

    return {
      transform: `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotationZ}deg) scale(${scale})`,
      opacity: 1,
      zIndex: zIndex,
    };
  };

  return {
    state,
    updateState,
    carouselRef,
    sectionRef,
    getCardTransform,
    handleMouseDown,
    handleTouchEnd,
    handleTouchMove,
    handleMouseUp,
    handleTouchStart,
    handleMouseMove,
  };
};