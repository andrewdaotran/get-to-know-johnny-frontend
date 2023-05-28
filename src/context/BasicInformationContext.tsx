import { api } from "andrewdaotran/utils/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { BasicInformation, ChildrenNodeType, InformationBox } from "typings";

type Message = {
  user: string;
  answer: string;
  createdAt: string;
};

export type BasicInformationContextType = {
  mainData: BasicInformation;
  // sendMessage: (message: Message) => void;
  informationBoxes: InformationBox[];

  setMainData: Dispatch<
    SetStateAction<{
      title: string;
      description: string;
      id?: string;
    }>
  >;
};

const BasicInformationContext =
  createContext<BasicInformationContextType | null>(null);

export const BasicInforomationProvider = ({ children }: ChildrenNodeType) => {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [mainData, setMainData] = useState<BasicInformation>({
    title: "",
    description: "",
    id: "",
  });
  const [informationBoxes, setInformationBoxes] = useState<InformationBox[]>([
    { title: "", description: "", basicInformationId: "" },
  ]);

  const trpc = api.useContext();
  const { data, isLoading } = api.basicInformation.get.useQuery();

  useEffect(() => {
    if (data) {
      setMainData({
        title: data.title,
        description: data.description,
        id: data.id,
      });
      setInformationBoxes(data.InformationArray);
    }
  }, [data]);

  return (
    <BasicInformationContext.Provider
      value={{
        mainData,
        informationBoxes,
        setMainData,
      }}
    >
      {children}
    </BasicInformationContext.Provider>
  );
};

export default BasicInformationContext;
