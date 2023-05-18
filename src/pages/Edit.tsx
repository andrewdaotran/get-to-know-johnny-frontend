import BasicDescriptionBox from "andrewdaotran/components/BasicDescriptionBox";
import MobileMenu from "andrewdaotran/components/MobileMenu";
import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { api } from "andrewdaotran/utils/api";
import { useContext, useEffect, useState } from "react";

export type Description = {
  id?: string;
  title: string;
  description: string;
};

const Edit = () => {
  const [isNewDescription, setIsNewDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  useEffect(() => {
    changeMenu(EDIT_ACTION);
  }, []);

  const { data, isLoading, isError } = api.description.getAll.useQuery();
  const { mutate: create } =
    api.description.addBasicDescriptionBox.useMutation();
  const { mutate: edit } = api.description.editDescription.useMutation();

  const editDescription = ({ description, title, id }: Description) => {
    if (id) edit({ description, title, id });
  };

  const createDescription = ({ description, title }: Description) => {
    create({ description, title });
  };
  return (
    <>
      {/* Descriptions */}
      <div className="grid py-4 ">
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
          />
        )}
        {/* New Description Box End */}

        {/* Start Edit or Add Description Button */}
        <button
          className="mx-6 my-4 grid gap-2 self-center rounded-md border border-secondary bg-secondary px-6 py-4"
          onClick={() => {
            if (isEditing) {
              setIsNewDescription(!isNewDescription);
            } else {
              setIsEditing(!isEditing);
            }
          }}
        >
          {!isEditing
            ? "Edit"
            : !isNewDescription
            ? "Add Description Box"
            : "Cancel"}
        </button>
        {/* Start Edit or Add Description Button End */}

        {/* Cancel Edit Button */}
        {isEditing && !isNewDescription && (
          <button
            className="mx-6 my-4 grid gap-2 self-center rounded-md border border-secondary bg-secondary px-6 py-4"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Cancel
          </button>
        )}
        {/* Cancel Edit Button End */}
      </div>
      {/* Descriptions End */}
      <MobileMenu />
    </>
  );
};

export default Edit;
