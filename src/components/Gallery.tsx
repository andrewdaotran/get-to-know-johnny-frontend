import { johnnyGalleryImages } from "andrewdaotran/utils/johnnyInfo";
import GalleryImage from "./GalleryComponents/GalleryImage";
import { useContext, useEffect } from "react";
import MobileMenuContext, {
  GALLERY_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";

const Gallery = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  // useEffect(() => {
  //   changeMenu(GALLERY_ACTION);
  // }, []);
  return (
    <>
      <main
        className="  flex  w-full flex-col gap-1      rounded-lg bg-white px-1 py-2 "
        style={
          screenWidth === "mobile" ? { height: "100vh", overflow: "auto" } : {}
        }
        // flex-wrap
        id="gallery"
      >
        {johnnyGalleryImages.map((image) => {
          return (
            <GalleryImage
              image={image.image}
              key={image.image}
              alt={image.alt}
              orientation={image.orientation}
            />
          );
        })}
      </main>
    </>
  );
};

export default Gallery;
