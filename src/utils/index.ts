import { FaLinkedin } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

export const time = () => {
  const today = new Date();
  const time = `${today.getHours()}: ${today.getMinutes()} `;
  return time;
};

export const defaultIcon = "📲";
export const defaultHobby = "Add New Hobby";

export const creatorIcons = [
  {
    title: "portfolio",
    link: "https://andrewdaotran.com/",
    icon: CgWebsite,
  },
  {
    title: "linkedIn",
    link: "https://www.linkedin.com/in/ndru/",
    icon: FaLinkedin,
  },
  {
    title: "github",
    link: "https://github.com/andrewdaotran",
    icon: FaGithub,
  },
  {
    title: "source code",
    link: "https://github.com/andrewdaotran/get-to-know-johnny-frontend/",
    icon: FaCode,
  },
];
export const truncate = (str: string) => {
  return str.substring(0, 40);
};
