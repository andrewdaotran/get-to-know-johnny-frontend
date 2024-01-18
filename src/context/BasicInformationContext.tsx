import { api } from "../utils/api";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import {
  BasicInformation,
  ChildrenNodeType,
  InformationBox,
} from "../../typings";
import { basicInformationInput, informationBoxInput } from "../../zodTypings";

export type BasicInformationContextType = {
  mainData: BasicInformation;
  setMainData: Dispatch<
    SetStateAction<{
      title: string;
      description: string;
      id?: string;
    }>
  >;
  informationBoxes: InformationBox[];
  setInformationBoxes: Dispatch<SetStateAction<InformationBox[]>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  resetMainData: () => void;
  resetInformationBoxes: () => void | null | undefined;
  editBasicInformation: () => boolean;
  editInformationBoxes: () => boolean;
};

const BasicInformationContext =
  createContext<BasicInformationContextType | null>(null);

export const BasicInforomationProvider = ({ children }: ChildrenNodeType) => {
  const [mainData, setMainData] = useState<BasicInformation>({
    title: "",
    description: "",
    id: "",
  });
  const [informationBoxes, setInformationBoxes] = useState<InformationBox[]>([
    { title: "", description: "", basicInformationId: "" },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const trpc = api.useContext();
  const { data: basicInformation } = api.basicInformation.get.useQuery();
  const { data: informationBoxesQuery } =
    api.basicInformation.getInformationBoxes.useQuery();

  const resetMainData = () => {
    basicInformation &&
      setMainData({
        title: basicInformation.title,
        description: basicInformation.description,
        id: basicInformation.id,
      });
  };

  const resetInformationBoxes = () =>
    informationBoxesQuery && setInformationBoxes(informationBoxesQuery);

  useEffect(() => {
    resetMainData();
    resetInformationBoxes();
  }, [basicInformation, informationBoxesQuery]);

  // Edit Basic Information Mutation
  const { mutate: edit } =
    api.basicInformation.editBasicInformation.useMutation({
      onSettled: async () => {
        await trpc.basicInformation.invalidate();
      },
    });

  // Edit Basic Information
  const editBasicInformation = () => {
    edit({
      title: mainData.title,
      description: mainData.description,
    });

    const result = basicInformationInput.safeParse({
      title: mainData.title,
      description: mainData.description,
    });
    if (!result.success) {
      if (
        result.error.issues[0]?.path[0] === "title" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Title must contain at least one character`);
      if (
        result.error.issues[0]?.path[0] === "title" &&
        result.error.issues[0]?.code === "too_big"
      )
        toast.error(`Title cannot exceed 75 characters`);

      if (
        result.error.issues[0]?.path[0] === "description" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return false;
    }
    return true;
  };

  // Edit Information Box Mutation

  const { mutate: edit2 } = api.basicInformation.editInformationBox.useMutation(
    {
      onSettled: async () => {
        await trpc.basicInformation.invalidate();
      },
    }
  );

  const editInformationBoxes = () => {
    const successArray = informationBoxes.map((box, index) => {
      if (box.id) {
        edit2({
          title: box.title,
          description: box.description,
          id: box.id,
        });
        const result = informationBoxInput.safeParse({
          title: box.title,
          description: box.description,
          id: box.id,
          basicInformationId: "cli3ggh2z0000v5najtojhykc",
        });

        console.log("info", result);
        if (!result.success) {
          if (
            result.error.issues[0]?.path[0] === "title" &&
            result.error.issues[0]?.code === "too_small"
          )
            toast.error(`Title must contain at least one character`);
          if (
            result.error.issues[0]?.path[0] === "title" &&
            result.error.issues[0]?.code === "too_big"
          )
            toast.error(`Title cannot exceed 75 characters`);
          if (
            result.error.issues[0]?.path[0] === "description" &&
            result.error.issues[0]?.code === "too_small"
          )
            toast.error(`Description must contain at least one character`);
          if (
            result.error.issues[0]?.path[0] === "description" &&
            result.error.issues[0]?.code === "too_big"
          )
            toast.error(`Description cannot exceed 20 characters`);
          return false;
        }
      }
    });
    if (successArray.includes(false)) return false;
    return true;
  };

  return (
    <BasicInformationContext.Provider
      value={{
        mainData,
        informationBoxes,
        setInformationBoxes,
        isEditing,
        setIsEditing,
        resetMainData,
        resetInformationBoxes,
        setMainData,
        editBasicInformation,
        editInformationBoxes,
      }}
    >
      {children}
    </BasicInformationContext.Provider>
  );
};

export default BasicInformationContext;
