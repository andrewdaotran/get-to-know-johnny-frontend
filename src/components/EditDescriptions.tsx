import BasicDescriptionBox from "andrewdaotran/components/BasicDescriptionBox";
import { useContext } from "react";
import ButtonWidthFull from "./ButtonWidthFull";
import DescriptionContext, {
  DescriptionContextType,
} from "andrewdaotran/context/DescriptionContext";

const EditDescriptions = () => {
  const {
    mainDataArray,
    newDescription,
    setNewDescription,
    isNewDescription,
    setIsNewDescription,
    isEditing,
    setIsEditing,
    setMainDataArray,
    createDescription,
    editDescription,
    resetMainData,
    removeDescription,
  } = useContext(DescriptionContext) as DescriptionContextType;

  return (
    <>
      {/* Descriptions */}
      <div className="grid gap-4 ">
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
            mainData={newDescription}
            setMainData={setNewDescription}
            onDelete={() => {
              setIsNewDescription(false);
            }}
          />
        )}
        {/* New Description Box End */}

        {/* Edit or Add Description Button */}
        {(!isEditing || !isNewDescription) && (
          <ButtonWidthFull
            buttonText={!isEditing ? "Edit" : "Add New Description Box"}
            onClick={() => {
              if (isEditing) {
                setIsNewDescription(!isNewDescription);
              } else {
                setIsEditing(!isEditing);
              }
            }}
          />
        )}

        {/* Edit or Add Description Button End */}

        {/* Cancel Edit Button */}
        {isEditing && (
          <ButtonWidthFull
            buttonText={"Cancel Editing"}
            onClick={() => {
              setIsEditing(!isEditing);
              resetMainData();
              setIsNewDescription(false);
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
