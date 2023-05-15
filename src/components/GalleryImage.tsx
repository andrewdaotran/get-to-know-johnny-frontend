import Image from "next/image";

type Props = {
  image: string;
  alt: string;
};

const GalleryImage = ({ image, alt }: Props) => {
  return (
    <div
      className="relative  min-h-[33rem]  w-full max-w-4xl self-center rounded-md"
      key={image}
    >
      <Image
        fill
        className="rounded-md object-cover object-top"
        src={image}
        alt={alt}
        priority
      />
    </div>
  );
};

export default GalleryImage;
