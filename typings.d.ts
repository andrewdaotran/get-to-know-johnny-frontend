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
  isFocused: boolean;
  isMakingNewPuck: boolean;
  isHobbySubmitted: boolean;
};

export type BasicInformation = {
  id?: string;
  title: string;
  description: string;
};

export type InformationBox = {
  id?: string;
  title: string;
  description: string;
  basicInformationId?: string;
};
