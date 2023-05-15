export const johnnyAge = () => {
  const todayDay = new Date().getDate();
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().getFullYear();
  const johnnyDay = 1;
  const johnnyMonth = 9;
  const johnnyYear = 1995;

  const age = todayYear - johnnyYear - 1;
  if (
    todayMonth > johnnyMonth ||
    (todayMonth === johnnyMonth && todayDay >= johnnyDay)
  )
    return age + 1;

  return age;
};

export const johnnyNameAndAge = `Johnny, ${johnnyAge()}`;

export const johnnyGalleryImages = [
  {
    image: "/images/jungkook_gallery_1.webp",
    alt: "Jungkook in place of Johnny gallery image 1",
  },
  {
    image: "/images/jungkook_gallery_2.jpeg",
    alt: "Jungkook in place of Johnny gallery image 2",
  },
  {
    image: "/images/jungkook_gallery_3.webp",
    alt: "Jungkook in place of Johnny gallery image 3",
  },
  {
    image: "/images/jungkook_gallery_4.jpeg",
    alt: "Jungkook in place of Johnny gallery image 4",
  },
  {
    image: "/images/jungkook_gallery_5.jpeg",
    alt: "Jungkook in place of Johnny gallery image 5",
  },
  {
    image: "/images/jungkook_gallery_6.jpeg",
    alt: "Jungkook in place of Johnny gallery image 6",
  },
];
