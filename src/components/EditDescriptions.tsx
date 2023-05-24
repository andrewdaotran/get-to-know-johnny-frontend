import BasicDescriptionBox from "andrewdaotran/components/BasicDescriptionBox";

import { api } from "andrewdaotran/utils/api";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Description } from "typings";
import { descriptionInput } from "zodTypings";
import StandardButton from "./ButtonWidthFull";

const EditDescriptions = () => {
  const [isNewDescription, setIsNewDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const trpc = api.useContext();

  // Get Descriptions
  const { data, isLoading, isError } = api.description.getAll.useQuery();

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
    if (id) edit({ description, title, id });
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
        {data?.map((description) => (
          <BasicDescriptionBox
            key={description.id}
            id={description.id}
            title={description.title}
            description={description.description}
            isEditing={isEditing}
            onSubmit={editDescription}
            onDelete={removeDescription}
            isNewDescription={false}
          />
        ))}
        {/* Descriptions Mapped End */}

        {/* New Description Box */}
        {isNewDescription && (
          <BasicDescriptionBox
            title=""
            description=""
            isEditing={isNewDescription}
            onSubmit={createDescription}
            isNewDescription={isNewDescription}
            setIsNewDescription={setIsNewDescription}
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
