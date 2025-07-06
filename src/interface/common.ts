export interface MainCarouselImageProps {
  id: number;
  image: string;
  alt: string;
}

export interface DraggableCarouselItemProps {
  id: number;
  image: string;
  title?: string;
  location?: string;
}

export interface IUseMainCarouselState {
  currentIndex: number;
  progress: number;
  isTransitioning: boolean;
  nextImageIndex: number;
  isLoaded: boolean;
}
export interface IUseDragCarouselStateProps {
  currentClientSlide: number;
  isDragging: boolean;
  startX: number;
  currentX: number;
  dragOffset: number;
  showDragIndicator: boolean;
  isMobile: boolean;
  isHeadingVisible: boolean;
  isParagraphVisible: boolean;
}
