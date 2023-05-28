import BasicDescriptionBox from "andrewdaotran/components/BasicDescriptionBox";

import { api } from "andrewdaotran/utils/api";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Description } from "typings";
import { descriptionInput, descriptionInputWithId } from "zodTypings";
import StandardButton from "./ButtonWidthFull";
import DescriptionContext, {
  DescriptionContextType,
} from "andrewdaotran/context/DescriptionContext";

const EditDescriptions = () => {
  const [isNewDescription, setIsNewDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const trpc = api.useContext();

  const { mainDataArray, setMainDataArray } = useContext(
    DescriptionContext
  ) as DescriptionContextType;

  // Create Description
  const { mutate: create } =
    api.description.createBasicDescriptionBox.useMutation({
      onSettled: async () => {
        await trpc.description.invalidate();
      },
    });
  const { mutate: edit } = api.description.editDescription.useMutation({
    onSettled: async () => {
      await trpc.description.invalidate();
    },
  });

  // Remove Description
  const { mutate: remove } =
    api.description.removeBasicDescriptionBox.useMutation({
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
          toast.error(`Title cannot contain more than 50 characters`);

        if (
          result.error.issues[0]?.path[0] === "description" &&
          result.error.issues[0]?.code === "too_small"
        )
          toast.error(`Description must contain at least one character`);
        return;
      }
    }
  };

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
        toast.error(`Title cannot contain more than 50 characters`);

      if (
        result.error.issues[0]?.path[0] === "description" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return;
    }
    setIsNewDescription(false);
  };

  // Remove Descriptions
  const removeDescription = (id: string) => {
    remove(id);
  };

  return (
    <>
      {/* Descriptions */}
      <div className="grid  ">
        <h2 className="mx-6 my-4  border border-red-500 text-center">
          Description
        </h2>
        {/* Descriptions Mapped */}
        {mainDataArray?.map((description, index) => (
          <BasicDescriptionBox
            key={description.id}
            id={description.id}
            isEditing={isEditing}
            onSubmit={editDescription}
            onDelete={removeDescription}
            isNewDescription={false}
            mainData={description}
            setMainDataArray={setMainDataArray}
            mainDataArray={mainDataArray}
            index={index}
          />
        ))}
        {/* Descriptions Mapped End */}

        {/* New Description Box */}
        {isNewDescription && (
          <BasicDescriptionBox
            isEditing={isNewDescription}
            onSubmit={createDescription}
            isNewDescription={isNewDescription}
            setIsNewDescription={setIsNewDescription}
            mainData={{ title: "", description: "" }}
          />
        )}
        {/* New Description Box End */}

        {/* Edit or Add Description Button */}
        <StandardButton
          buttonText={
            !isEditing
              ? "Edit"
              : !isNewDescription
              ? "Add Description Box"
              : "Cancel"
          }
          onClick={() => {
            if (isEditing) {
              setIsNewDescription(!isNewDescription);
            } else {
              setIsEditing(!isEditing);
            }
          }}
        />

        {/* Edit or Add Description Button End */}

        {/* Cancel Edit Button */}
        {isEditing && !isNewDescription && (
          <StandardButton
            buttonText={"Cancel"}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        )}
        {/* Cancel Edit Button End */}
      </div>
      {/* Descriptions End */}
    </>
  );
};

export default EditDescriptions;
