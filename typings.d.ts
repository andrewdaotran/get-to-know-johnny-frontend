import { ReactNode } from "react";

export type ChildrenNodeType = {
  children: ReactNode;
};
export type Description = {
  id?: string;
  title: string;
  description: string;
};

export type Hobby = {
  id?: string;
  icon: string;
  hobby: string;
};
