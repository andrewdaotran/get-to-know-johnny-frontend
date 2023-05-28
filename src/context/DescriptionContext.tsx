import { api } from "andrewdaotran/utils/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { ChildrenNodeType, Description } from "typings";

export type DescriptionContextType = {
  mainDataArray: Description[];
  setMainDataArray: Dispatch<SetStateAction<Description[]>>;
};

const DescriptionContext = createContext<DescriptionContextType | null>(null);

export const DescriptionProvider = ({ children }: ChildrenNodeType) => {
  const [mainDataArray, setMainDataArray] = useState<Description[]>([
    { title: "", description: "", id: "" },
  ]);

  const { data } = api.description.getAll.useQuery();

  useEffect(() => {
    if (data) {
      setMainDataArray(data);
    }
  }, [data]);

  return (
    <DescriptionContext.Provider value={{ mainDataArray, setMainDataArray }}>
      {children}
    </DescriptionContext.Provider>
  );
};

export default DescriptionContext;
