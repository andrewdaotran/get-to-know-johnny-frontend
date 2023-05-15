import { johnnyGalleryImages } from "andrewdaotran/utils/johnnyInfo";
import GalleryImage from "./GalleryImage";

const Gallery = () => {
  return (
    <>
      <main className="grid w-full gap-1 overflow-auto rounded-lg  bg-white px-1 py-2">
        {johnnyGalleryImages.map((image) => {
          return (
            <GalleryImage
              image={image.image}
              key={image.image}
              alt={image.alt}
            />
          );
        })}
      </main>
    </>
  );
};

export default Gallery;
