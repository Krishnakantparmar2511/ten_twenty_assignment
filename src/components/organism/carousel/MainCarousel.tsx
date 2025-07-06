import React  from "react";
import { Navbar } from "../header/NavBar";
import { useMainCarouselState } from "@/hooks/useMainCarouselState";
import { mainCarouselImages } from "core/utils/constants/constants";

export const MainCarousel: React.FC = () => {
  const { state, nextIndex, nextImage } = useMainCarouselState();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      <div className="relative w-full h-full">
        <img
          src={mainCarouselImages[state.currentIndex].image}
          alt={mainCarouselImages[state.currentIndex].alt}
          className="w-full h-full object-cover"
        />
        {/* When New Image comes */}
        {state.isTransitioning && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              transformOrigin: "center center",
            }}
          >
            <img
              src={mainCarouselImages[state.nextImageIndex].image}
              alt={mainCarouselImages[state.nextImageIndex].alt}
              className="w-full h-full object-cover transform scale-y-0 animate-expand-vertical"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute inset-0 flex items-center justify-start text-center z-10 px-6 md:px-32">
          <div className="">
            <p
              className={`text-light text-start text-sm md:text-base mb-4 md:mb-6 font-worksans leading-tight transform transition-all duration-1000 ease-out delay-100 ${
                state.isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >
              Welcome To TenTwenty Farms
            </p>
            <h1
              className={`text-light text-start text-[46px] md:text-[64px] font-worksans leading-tight transform transition-all duration-1000 ease-out delay-200 ${
                state.isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >
              From Our Farms
            </h1>
            <h1
              className={`text-light text-start text-[46px] md:text-[64px] font-worksans leading-tight transform transition-all duration-1000 ease-out delay-300 ${
                state.isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >
              {" "}
              To Your Hands
            </h1>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes expand-vertical {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        .animate-expand-vertical {
          animation: expand-vertical 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
          transform-origin: center center;
        }
      `}</style>

      <div className="absolute bottom-[67px] z-20 px-6 md:px-[135px]">
        <div className="flex items-center">
          <div className="relative hover:cursor-pointer" onClick={nextImage}>
            <div className="relative flex items-center justify-center w-[115px] h-[115px] md:w-[138px] md:h-[138px]">
              <div className="w-[77px] h-[77px] md:w-[93px] md:h-[93px] relative z-10">
                <img
                  src={
                    mainCarouselImages[
                      state.isTransitioning
                        ? (state.nextImageIndex + 1) % mainCarouselImages.length
                        : nextIndex
                    ].image
                  }
                  alt={
                    mainCarouselImages[
                      state.isTransitioning
                        ? (state.nextImageIndex + 1) % mainCarouselImages.length
                        : nextIndex
                    ].alt
                  }
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-light text-xs md:text-base font-medium font-worksans rounded">
                    Next
                  </span>
                </div>
              </div>

              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 138 138">
                  <rect
                    x="5"
                    y="5"
                    width="128"
                    height="128"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />

                  <rect
                    x="5"
                    y="5"
                    width="128"
                    height="128"
                    fill="none"
                    stroke="white"
                    strokeWidth="10"
                    strokeDasharray="512"
                    strokeDashoffset={512 - (state.progress / 100) * 512}
                    className="transition-all duration-100 ease-linear"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-[17px] text-light ml-[33px]">
            <span className="text-xs md:text-sm font-light font-worksans">
              {String(state.currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-[100px] h-px bg-light"></div>
            <span className="text-xs md:text-sm">
              {String(mainCarouselImages.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
