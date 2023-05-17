import BasicDescriptionBox from "andrewdaotran/components/BasicDescriptionBox";
import { api } from "andrewdaotran/utils/api";
import { useState } from "react";

type Description = {
  id: string;
  title: string;
  description: string;
};

const Edit = () => {
  const { data, isLoading, isError } = api.description.getAll.useQuery();

  const [descriptions, setDescriptions] = useState(data);

  return (
    <>
      <div className="">
        {data?.map((description) => (
          <BasicDescriptionBox
            key={description.id}
            id={description.id}
            title={description.title}
            description={description.description}
            isEditing={true}
          />
        ))}
      </div>
    </>
  );
};

export default Edit;
