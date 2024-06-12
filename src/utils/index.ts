import { FaLinkedin } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { title } from "process";

export const time = () => {
  const today = new Date();
  const time = `${today.getHours()}: ${today.getMinutes()} `;
  return time;
};

export const defaultIcon = "📲";
export const defaultHobby = "Add New Hobby";

export const creatorIcons = [
  {
    name: "portfolio",
    link: "https://andrewdaotran.com/",
    icon: CgWebsite,
    title: "Website",
  },
  {
    name: "linkedIn",
    link: "https://www.linkedin.com/in/ndru/",
    icon: FaLinkedin,
    title: "LinkedIn",
  },
  {
    name: "github",
    link: "https://github.com/andrewdaotran",
    icon: FaGithub,
    title: "GitHub",
  },
  {
    name: "source code",
    link: "https://github.com/andrewdaotran/get-to-know-johnny-frontend/",
    icon: FaCode,
    title: "Code",
  },
];
export const truncate = (str: string) => {
  return str.substring(0, 40);
};
