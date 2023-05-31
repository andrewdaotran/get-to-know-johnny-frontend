import { api } from "andrewdaotran/utils/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { ChildrenNodeType, Hobby } from "typings";

export type HobbyContextType = {
  mainDataArray: Hobby[];
  setMainDataArray: Dispatch<SetStateAction<Hobby[]>>;
};

const HobbyContext = createContext<HobbyContextType | null>(null);

export const HobbyProvider = ({ children }: ChildrenNodeType) => {
  const [mainDataArray, setMainDataArray] = useState<Hobby[]>([
    {
      id: "",
      icon: "",
      hobby: "",
      isFocused: false,
      isMakingNewPuck: false,
      isHobbySubmitted: false,
    },
  ]);
  const { data } = api.hobby.getAll.useQuery();
  const trpc = api.useContext();

  const resetHobbies = () => {
    if (data) setMainDataArray(data);
  };

  useEffect(() => {
    resetHobbies();
  }, [data]);

  const { mutate: edit } = api.hobby.editHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  //  const editHobby = () => {
  //    if (id) edit({ icon: iconText, hobby: hobbyText, id });

  //    const result = hobbyInputWithId.safeParse({
  //      icon,
  //      hobby
  //    });
  //    if (!result.success) {
  //      if (
  //        result.error.issues[1]?.path[0] === "icon" &&
  //        result.error.issues[1]?.code === "too_small"
  //      )
  //        toast.error(`Must have one emoji`);
  //      if (
  //        result.error.issues[1]?.path[0] === "icon" &&
  //        result.error.issues[1]?.code === "too_big"
  //      )
  //        toast.error(`You can only have one emoji`);

  //      if (
  //        result.error.issues[1]?.path[0] === "hobby" &&
  //        result.error.issues[1]?.code === "too_small"
  //      )
  //        toast.error(`Hobby must contain at least one character`);
  //      if (
  //        result.error.issues[1]?.path[0] === "hobby" &&
  //        result.error.issues[1]?.code === "too_big"
  //      )
  //        toast.error(`Hobby cannot contain more than 50 characters`);
  //      return;
  //    }
  //    setIsHobbySubmitted(true);
  //    setIsFocused(false);
  //    setTimeout(() => {
  //      setIsHobbySubmitted(false);
  //    }, 2000);
  //  };
  return (
    <HobbyContext.Provider value={{ mainDataArray, setMainDataArray }}>
      {children}
    </HobbyContext.Provider>
  );
};

export default HobbyContext;
