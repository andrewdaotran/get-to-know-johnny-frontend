import Image from "next/image";

type Props = {
  image: string;
  index: number;
};

const GalleryImage = ({ image, index }: Props) => {
  return (
    <div
      className="relative  min-h-[33rem]  w-full max-w-4xl self-center rounded-md"
      key={image}
    >
      <Image
        fill
        className="rounded-md object-cover object-top"
        src={image}
        alt={`Jungkook in place of Johnny gallery image ${index + 1}`}
        priority
      />
    </div>
  );
};

export default GalleryImage;
