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

export type User = {
  email: string;
  id: string;
  image: string;
  name: string;
  status: string;
};

export type Contact = {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  instagramHandle: string;
  age: string;
  horoscope: string;
  funFact: string;
};
