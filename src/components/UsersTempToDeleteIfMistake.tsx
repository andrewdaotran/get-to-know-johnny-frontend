import { XMarkIcon } from "@heroicons/react/24/solid";
import { api } from "andrewdaotran/utils/api";
import React from "react";

const UsersTempToDeleteIfMistake = () => {
  const trpc = api.useContext();
  const { data: users } = api.user.getAll.useQuery();
  const { mutate: deleteUser } = api.user.deleteUser.useMutation({
    onSettled: async () => {
      await trpc.user.invalidate();
    },
  });

  console.log(users);
  return (
    <>
      <div className="grid gap-4 pb-6">
        <h2 className="px-6 text-xl tracking-wider text-appOrange">Users</h2>
        {/* No Users */}
        {users?.length === 0 && (
          <h2 className="text-center text-2xl text-grayText">
            No users to display
          </h2>
        )}
        {/* No Users End */}
        <div className="flex gap-4">
          {users?.map((user) => (
            <div
              className="relative grid w-72 gap-2 rounded-md border border-black p-4"
              key={user.id}
            >
              {/* Delete Contact */}
              <div className="absolute right-4 top-4">
                <button
                  className=""
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  <XMarkIcon className=" my-auto h-8 w-8 cursor-pointer text-appOrange transition-colors hover:text-secondary" />
                </button>
              </div>
              {/* Delete Contact End */}

              {/* Delete Contact */}

              <div>
                <h3 className="text-center text-lg font-bold">{user.name}</h3>
              </div>

              <div>
                <p className="text-center text-grayText">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersTempToDeleteIfMistake;
