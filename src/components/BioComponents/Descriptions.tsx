import DescriptionBox from "andrewdaotran/components/BioComponents/DescriptionBox";
import { useContext } from "react";
import ButtonWidthFull from "../UtilityComponents/ButtonWidthFull";
import DescriptionContext, {
  DescriptionContextType,
} from "andrewdaotran/context/DescriptionContext";

type Props = {
  isEditPage: boolean;
};

const Descriptions = ({ isEditPage }: Props) => {
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

      <div className="  grid gap-1 rounded-md bg-secondary">
        {/* Descriptions Mapped */}
        {mainDataArray?.map((description, index) => (
          <DescriptionBox
            key={description.id}
            id={description.id}
            index={index}
            mainDataArray={mainDataArray}
            setMainDataArray={setMainDataArray}
            mainData={description}
            isEditing={isEditPage ? isEditing : false}
            onSubmit={editDescription}
            onDelete={removeDescription}
            isNewDescription={false}
          />
        ))}
        {/* Descriptions Mapped End */}

        {/* New Description Box */}
        {isNewDescription && (
          <DescriptionBox
            mainData={newDescription}
            setMainData={setNewDescription}
            isEditing={isNewDescription}
            onSubmit={createDescription}
            onDelete={() => {
              setIsNewDescription(false);
            }}
            isNewDescription={isNewDescription}
            setIsNewDescription={setIsNewDescription}
          />
        )}
        {/* New Description Box End */}

        {/* Edit or Add Description Button */}

        {(!isEditing || !isNewDescription) && isEditPage && (
          <ButtonWidthFull
            buttonText={
              !isEditing ? "Edit Descriptions" : "Add New Description Box"
            }
            onClick={() => {
              if (isEditing) {
                setIsNewDescription(!isNewDescription);
              } else {
                setIsEditing(!isEditing);
              }
            }}
            buttonColor={"red-400"}
            addClassName={""}
          />
        )}

        {/* Edit or Add Description Button End */}

        {/* Cancel Edit Button */}
        {isEditing && isEditPage && (
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

export default Descriptions;
