import {
  DraggableCarouselItemProps,
  MainCarouselImageProps,
} from "@/interface/common";

export const mainCarouselImages: MainCarouselImageProps[] = [
  {
    id: 1,
    image: "/images/carousel-1.jpg",
    alt: "Farm fields with mountains",
  },
  {
    id: 2,
    image: "/images/carousel-2.jpg",
    alt: "Crop rows in farmland",
  },
  {
    id: 3,
    image: "/images/carousel-3.jpg",
    alt: "Greenhouse farming",
  },
  {
    id: 4,
    image: "/images/carousel-4.jpg",
    alt: "Pastoral farm landscape",
  },
];
export const draggableCarouselImages: DraggableCarouselItemProps[] = [
  {
    id: 1,
    image: "/images/clients/client-1.jpeg",
    title: "Client 1",
    location: "Dubai, United Arab Emirates",
  },
  {
    id: 2,
    image: "/images/clients/client-2.jpeg",
    title: "Client 2",
    location: "California, USA",
  },
  {
    id: 3,
    image: "/images/clients/client-3.jpeg",
    title: "Client 3",
    location: "Netherlands",
  },
  {
    id: 4,
    image: "/images/clients/client-4.jpeg",
    title: "Client 4",
    location: "Canada",
  },
  {
    id: 5,
    image: "/images/clients/client-5.jpeg",
    title: "Client 5",
    location: "Switzerland",
  },
];

export const navigationItems = [
  { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Services", href: "#services" },
  { name: "Our Team", href: "#team" },
  { name: "Make Enquiry", href: "#enquiry" },
];
