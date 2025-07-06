"use client"
import { useDragCarouselState } from "@/hooks/useDragCarouselState";
import { draggableCarouselImages } from "core/utils/constants/constants";

export const DragCarousel = () => {
  const {
    carouselRef,
    sectionRef,
    state,
    getCardTransform,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  } = useDragCarouselState();

  return (
    <section
      ref={sectionRef}
      className="py-[82px] md:py-[153px] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden"
    >
      <div className="w-full">
        <div className="text-center mb-4 md:mb-[30px] px-4">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-normal font-worksans text-black mb-4 md:mb-6 transform transition-all duration-1000 ease-out ${
              state.isHeadingVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            Quality Products
          </h2>
        </div>

        <div className="text-center mb-8 md:mb-16 px-4">
          <p
            className={`text-textcolor max-w-2xl mx-auto px-10 text-base md:text-lg leading-relaxed font-normal font-worksans transform transition-all duration-1000 ease-out ${
              state.isParagraphVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="relative w-full h-[428px] md:h-[800px] flex items-center justify-center">
          <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={carouselRef}
          >
            <div
              className="w-full h-full"
              style={{
                transition: state.isDragging
                  ? "none"
                  : "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {draggableCarouselImages.map((item, index) => {
                const cardTransform = getCardTransform(index);
                const isCenter = index === state.currentClientSlide;
                const isMobile = state.isMobile;
                return (
                  <div
                    key={item.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      width: isMobile ? "280px" : "439px",
                      height: isMobile ? "400px" : "619px",
                      marginLeft: isMobile ? "-140px" : "-219.5px",
                      marginTop: isMobile ? "-200px" : "-309.5px",
                      transformOrigin: "center bottom",
                      ...cardTransform,
                      transition: state.isDragging
                        ? "none"
                        : "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="relative w-full h-full group">
                      <div className="absolute inset-0 bg-white shadow-xl transform transition-all duration-300 hover:shadow-2xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>

                      {isCenter && state.showDragIndicator && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div
                            className={`bg-white backdrop-blur-sm ${
                              isMobile
                                ? "h-[70px] w-[70px] text-xs"
                                : "h-[99px] w-[99px] text-sm"
                            } flex items-center justify-center rounded-full font-semibold font-worksans shadow-lg border border-gray-200 animate-pulse`}
                          >
                            Drag
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-2 px-4">
          <h3 className="text-2xl md:text-4xl font-normal font-worksans text-black mb-2 md:mb-3">
            {draggableCarouselImages[state.currentClientSlide].title}
          </h3>
          <p className="text-textcolor font-worksans font-normal text-lg md:text-2xl">
            {draggableCarouselImages[state.currentClientSlide].location}
          </p>
        </div>
      </div>
    </section>
  );
};
