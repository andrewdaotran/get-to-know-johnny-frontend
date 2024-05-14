import React, { use, useEffect, useState } from "react";
import { Contact as ContactType } from "../../../typings";

import { truncate } from "andrewdaotran/utils";

interface Props extends ContactType {
  isAllTruncated: boolean;
  setIsAllTruncated: (value: boolean) => void;
}

const Contact = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  instagramHandle,
  age,
  horoscope,
  funFact,
  isAllTruncated,
  setIsAllTruncated,
}: Props) => {
  const handleSeeMoreOrSeeLess = () => {
    setIsAllTruncated(!isAllTruncated);
  };

  const [isTruncated, setIsTruncated] = useState(true);

  return (
    <div className="grid w-72 gap-2 rounded-md border border-black p-4">
      <div>
        <h3 className="text-center text-lg font-bold">
          {firstName} {lastName}
        </h3>
        <div className="flex justify-center">
          <p>
            {age} {horoscope}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Phone Number:</h4>
        <p>{phoneNumber ? phoneNumber : "None"}</p>
      </div>

      <div>
        <h4 className="font-semibold">Instagram Handle:</h4>
        <p>{instagramHandle ? instagramHandle : "None"}</p>
      </div>

      <div>
        <h4 className="font-semibold">Fun Fact:</h4>
        <p>
          {isAllTruncated && funFact.length > 40
            ? truncate(funFact) + "..."
            : funFact}
        </p>
        {funFact.length > 40 && (
          <button className="text-appOrange" onClick={handleSeeMoreOrSeeLess}>
            {isAllTruncated ? "see more" : "see less"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Contact;
