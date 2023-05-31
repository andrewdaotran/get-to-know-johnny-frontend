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
import { hobbyInput, hobbyInputWithId } from "zodTypings";

export type HobbyContextType = {
  mainDataArray: Hobby[];
  setMainDataArray: Dispatch<SetStateAction<Hobby[]>>;
  editHobby: ({ id, icon, hobby }: Hobby) => boolean;
  createHobby: ({ icon, hobby }: Hobby) => boolean;
  removeHobby: (id: string) => void;
};

const HobbyContext = createContext<HobbyContextType | null>(null);

export const HobbyProvider = ({ children }: ChildrenNodeType) => {
  const [mainDataArray, setMainDataArray] = useState<Hobby[]>([
    {
      id: "",
      icon: "",
      hobby: "",
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

  // Edit hobby mutation
  const { mutate: edit } = api.hobby.editHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const editHobby = ({ id, icon, hobby }: Hobby) => {
    if (id) edit({ icon, hobby, id });

    const result = hobbyInputWithId.safeParse({
      icon,
      hobby,
      id,
    });
    if (!result.success) {
      if (
        result.error.issues[0]?.path[0] === "icon" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Must have one emoji`);
      if (
        result.error.issues[0]?.path[0] === "icon" &&
        result.error.issues[0]?.code === "too_big"
      )
        toast.error(`You can only have one emoji`);

      if (
        result.error.issues[0]?.path[0] === "hobby" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Hobby must contain at least one character`);
      if (
        result.error.issues[0]?.path[0] === "hobby" &&
        result.error.issues[0]?.code === "too_big"
      )
        toast.error(`Hobby cannot contain more than 50 characters`);
      return false;
    }
    return true;
  };

  // Create hobby mutation
  const { mutate: create } = api.hobby.createHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const createHobby = ({ icon, hobby }: Hobby) => {
    create({
      hobby,
      icon,
    });
    const result = hobbyInput.safeParse({
      icon,
      hobby,
    });
    if (!result.success) {
      if (
        result.error.issues[0]?.path[0] === "icon" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Must have one emoji`);

      if (
        result.error.issues[0]?.path[0] === "icon" &&
        result.error.issues[0]?.code === "too_big"
      )
        toast.error(`You can only have one emoji`);

      if (
        result.error.issues[0]?.path[0] === "hobby" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Hobby must contain at least one character`);
      if (
        result.error.issues[0]?.path[0] === "hobby" &&
        result.error.issues[0]?.code === "too_big"
      )
        toast.error(`Hobby cannot contain more than 50 characters`);

      return false;
    }
    return true;
  };

  // Remove hobby mutation
  const { mutate: remove } = api.hobby.removeHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const removeHobby = (id: string) => {
    if (id) remove(id);
  };

  return (
    <HobbyContext.Provider
      value={{
        mainDataArray,
        setMainDataArray,
        editHobby,
        createHobby,
        removeHobby,
      }}
    >
      {children}
    </HobbyContext.Provider>
  );
};

export default HobbyContext;
