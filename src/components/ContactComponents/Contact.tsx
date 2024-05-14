import React from "react";
import { Contact as ContactType } from "../../../typings";

const Contact = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  instagramHandle,
  age,
  horoscope,
  funFact,
}: ContactType) => {
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

      {phoneNumber && (
        <div>
          <h4 className="font-semibold">Phone Number:</h4>
          <p>{phoneNumber}</p>
        </div>
      )}
      {instagramHandle && (
        <div>
          <h4 className="font-semibold">Instagram Handle:</h4>
          <p>{instagramHandle}</p>
        </div>
      )}
      <div>
        <h4 className="font-semibold">Fun Fact:</h4>
        <p>{funFact}</p>
      </div>
    </div>
  );
};

export default Contact;
