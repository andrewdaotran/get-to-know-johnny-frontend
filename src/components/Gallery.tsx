import { johnnyGalleryImages } from "andrewdaotran/utils/johnnyInfo";
import { useState, ChangeEvent, useRef, FormEvent } from "react";
import GalleryImage from "./GalleryImage";

const Gallery = () => {
  return (
    <>
      <main className="grid w-full gap-1 overflow-auto rounded-lg  bg-white px-1 py-2">
        {johnnyGalleryImages.map((image, index) => {
          return <GalleryImage image={image} index={index} key={image} />;
        })}
      </main>
    </>
  );
};

export default Gallery;
