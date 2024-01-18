import { api } from "../utils/api";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { ChildrenNodeType, Description } from "../../typings";
import { descriptionInput, descriptionInputWithId } from "../../zodTypings";

export type DescriptionContextType = {
  mainDataArray: Description[];
  editRef: RefObject<HTMLButtonElement>;
  editComponent: string;
  makeEditRef: (id: string) => void;
  newDescription: Description;
  setNewDescription: Dispatch<SetStateAction<Description>>;
  isNewDescription: boolean;
  setIsNewDescription: Dispatch<SetStateAction<boolean>>;
  setMainDataArray: Dispatch<SetStateAction<Description[]>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  resetMainData: () => void;
  createDescription: ({ description, title }: Description) => void;
  editDescription: ({ description, title, id }: Description) => void;
  removeDescription: (id: string) => void;
};

const DescriptionContext = createContext<DescriptionContextType | null>(null);

export const DescriptionProvider = ({ children }: ChildrenNodeType) => {
  const [mainDataArray, setMainDataArray] = useState<Description[]>([
    { title: "", description: "", id: "" },
  ]);
  const [newDescription, setNewDescription] = useState<Description>({
    title: "",
    description: "",
  });
  const [isNewDescription, setIsNewDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const editRef = useRef<HTMLButtonElement>(null);

  const [editComponent, setEditComponent] = useState("");

  const makeEditRef = (id: string) => {
    if (editRef.current !== null) console.log(editRef);
    setEditComponent(id);
    setIsEditing(true);
  };

  const { data } = api.description.getAll.useQuery();

  const resetMainData = () => {
    if (data) {
      setMainDataArray(data);
    }
  };
  useEffect(() => {
    resetMainData();
  }, [data]);

  const trpc = api.useContext();

  // Create Description Mutation
  const { mutate: create } =
    api.description.createBasicDescriptionBox.useMutation({
      onSettled: async () => {
        await trpc.description.invalidate();
      },
    });

  // Create Descriptions
  const createDescription = ({ description, title }: Description) => {
    create({ description, title });
    const result = descriptionInput.safeParse({ description, title });
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
        toast.error(`Title cannot contain more than 75 characters`);

      if (
        result.error.issues[0]?.path[0] === "description" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return;
    }
    setIsNewDescription(false);
  };

  // Edit Description Mutation
  const { mutate: edit } = api.description.editDescription.useMutation({
    onSettled: async () => {
      await trpc.description.invalidate();
    },
  });

  // Edit Descriptions
  const editDescription = ({ description, title, id }: Description) => {
    if (id) {
      edit({ description, title, id });
      const result = descriptionInputWithId.safeParse({
        description,
        title,
        id,
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
          toast.error(`Title cannot contain more than 75 characters`);

        if (
          result.error.issues[0]?.path[0] === "description" &&
          result.error.issues[0]?.code === "too_small"
        )
          toast.error(`Description must contain at least one character`);
        return;
      }
    }
  };

  // Remove Description Mutation
  const { mutate: remove } =
    api.description.removeBasicDescriptionBox.useMutation({
      onSettled: async () => {
        await trpc.description.invalidate();
      },
    });

  // Remove Description
  const removeDescription = (id: string) => {
    remove(id);
  };

  return (
    <DescriptionContext.Provider
      value={{
        mainDataArray,
        editRef,
        editComponent,
        makeEditRef,
        newDescription,
        setNewDescription,
        isNewDescription,
        setIsNewDescription,
        isEditing,
        resetMainData,
        setIsEditing,
        setMainDataArray,
        createDescription,
        editDescription,
        removeDescription,
      }}
    >
      {children}
    </DescriptionContext.Provider>
  );
};

export default DescriptionContext;
