import { api } from "andrewdaotran/utils/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { BasicInformation, ChildrenNodeType, InformationBox } from "typings";
import { basicInformationInput, informationBoxInputWithId } from "zodTypings";

export type BasicInformationContextType = {
  mainData: BasicInformation;
  informationBoxes: InformationBox[];
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  resetMainData: () => void;
  resetInformationBoxes: () => void | null | undefined;
  setMainData: Dispatch<
    SetStateAction<{
      title: string;
      description: string;
      id?: string;
    }>
  >;
  editBasicInformation: () => void;
  typeSingleInformationBox: ({
    id,
    description,
    title,
  }: InformationBox) => void;
  typeSingleInformationTitle: (id: string, title: string) => void;
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

  const typeSingleInformationBox = ({
    id,
    description,
    title,
  }: InformationBox) => {
    setInformationBoxes(
      informationBoxes.map((item) =>
        item.id === id ? { ...item, title, description } : item
      )
    );
  };
  const typeSingleInformationTitle = (id: string, title: string) => {
    setInformationBoxes(
      informationBoxes.map((item) =>
        item.id === id ? { ...item, title } : item
      )
    );
  };

  const trpc = api.useContext();
  const { data } = api.basicInformation.get.useQuery();

  const resetMainData = () => {
    data &&
      setMainData({
        title: data.title,
        description: data.description,
        id: data.id,
      });
  };

  const resetInformationBoxes = () =>
    data && setInformationBoxes(data.InformationArray);

  useEffect(() => {
    resetMainData();
    resetInformationBoxes();
  }, [data]);

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
        toast.error(`Title cannot exceed 50 characters`);

      if (
        result.error.issues[0]?.path[0] === "description" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return;
    }
    setIsEditing(false);
  };

  // Edit Information Box Mutation
  const { mutate: edit2 } =
    api.basicInformation.editInformationBoxes.useMutation({
      onSettled: async () => {
        await trpc.basicInformation.invalidate();
      },
    });

  // Edit Information Box
  const editInformationBox = ({ id, description, title }: InformationBox) => {
    if (id)
      edit2({
        title,
        description,
        id,
      });

    const result = informationBoxInputWithId.safeParse({
      title,
      description,
      id,
      basicInformationId: "cli3ggh2z0000v5najtojhykc",
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
        toast.error(`Title cannot exceed 50 characters`);

      if (
        result.error.issues[0]?.path[0] === "description" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return;
    }
    setIsEditing(false);
  };

  return (
    <BasicInformationContext.Provider
      value={{
        mainData,
        informationBoxes,
        isEditing,
        setIsEditing,
        resetMainData,
        resetInformationBoxes,
        setMainData,
        editBasicInformation,
        typeSingleInformationBox,
        typeSingleInformationTitle,
      }}
    >
      {children}
    </BasicInformationContext.Provider>
  );
};

export default BasicInformationContext;
