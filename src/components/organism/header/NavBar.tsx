
import { navigationItems } from "core/utils/constants/constants";
import Image from "next/image";
import React, { useState } from "react";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-30 bg-white backdrop-blur-sm border-b  md:m-5">
        <div className="w-full pl-[39px] pr-[33px] md:pl-[39px] md:pr-[33px] px-4">
          <div className="flex items-center justify-between h-[100px]">
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black font-normal text-sm transition-colors duration-200 hover:underline"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="md:hidden flex items-center justify-between w-full">
              <button className="flex items-center space-x-2 px-4 py-2 border border-black rounded hover:bg-lightbg transition-all duration-200 group">
                <span className="text-black font-normal font-worksans text-base">
                  Contact us
                </span>
                <Image
                  src={"/images/arrow-right.svg"}
                  alt="arrow"
                  height={14}
                  width={18}
                />
              </button>

              <button
                className="flex flex-col items-center justify-center w-8 h-8 relative bg-hamburgerbg"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 absolute ${
                    isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 absolute ${
                    isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </button>
            </div>

            <div className="hidden md:flex items-center justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 border border-black rounded hover:bg-lightbg transition-all duration-200 group">
                <span className="text-black font-normal font-worksans text-base">
                  Contact us
                </span>
                <Image
                  src={"/images/arrow-right.svg"}
                  alt="arrow"
                  height={14}
                  width={18}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute top-[120px] left-5 right-5 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black font-normal text-base py-2 transition-colors duration-200 hover:underline"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
