import { johnnyGalleryImages } from "andrewdaotran/utils/johnnyInfo";
import GalleryImage from "./GalleryComponents/GalleryImage";
import { useContext, useEffect } from "react";
import MobileMenuContext, {
  GALLERY_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";

const Gallery = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  useEffect(() => {
    changeMenu(GALLERY_ACTION);
  }, []);
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
