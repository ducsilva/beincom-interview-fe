import { useAuth } from "@/contexts";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import PostForm from "./PostForm";
import { DEFAULT_AVATAR } from "@/utils";

export const CreatePost = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);

  return (
    <div className="mb-4 relative">
      <div className="w-full flex gap-2 rounded-lg bg-white p-4 items-center">
        <a href={`/users/${user?.username}`}>
          <span className="relative flex shrink-0 h-12 w-12 cursor-pointer">
            <Image
              className="!box-border aspect-square h-full w-full object-cover overflow-hidden bg-neutral-1 border-neutral-1 border-[1.5px] rounded-full"
              alt={user?.fullname}
              src={DEFAULT_AVATAR}
              layout="fill"
            />
          </span>
        </a>
        <div className="flex items-center justify-evenly">
          <Button
            size="md"
            className="grow rounded flex justify-center items-center bg-neutral-1 p-4 text-sm font-medium text-neutral-40 flex-center hover:bg-neutral-2"
            onClick={toggleModal}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-50"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.09225 17.9711H5.00225C4.87064 17.9719 4.74018 17.9466 4.61834 17.8969C4.49651 17.8471 4.38569 17.7738 4.29225 17.6811C4.18805 17.5773 4.10804 17.4518 4.05791 17.3135C4.00778 17.1752 3.98878 17.0276 4.00225 16.8811L4.43225 12.7111C4.47775 12.2543 4.67902 11.8271 5.00225 11.5011L14.0022 2.50111C14.377 2.18448 14.8551 2.01666 15.3456 2.02956C15.836 2.04247 16.3046 2.23521 16.6623 2.57111L19.4022 5.31111C19.7702 5.66162 19.9841 6.14367 19.9972 6.65165C20.0103 7.15962 19.8216 7.65208 19.4722 8.02111L10.4722 17.0211C10.1463 17.3443 9.71905 17.5456 9.26225 17.5911L5.09225 17.9711ZM18.0023 6.70111L15.2723 3.97111L13.3222 5.97111L16.0023 8.65111L18.0023 6.70111ZM5.0022 19.9711H19.0022C19.2674 19.9711 19.5218 20.0765 19.7093 20.264C19.8968 20.4516 20.0022 20.7059 20.0022 20.9711C20.0022 21.2363 19.8968 21.4907 19.7093 21.6782C19.5218 21.8658 19.2674 21.9711 19.0022 21.9711H5.0022C4.73698 21.9711 4.48263 21.8658 4.29509 21.6782C4.10755 21.4907 4.0022 21.2363 4.0022 20.9711C4.0022 20.7059 4.10755 20.4516 4.29509 20.264C4.48263 20.0765 4.73698 19.9711 5.0022 19.9711Z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="ml-1">Quick Post</span>
          </Button>
        </div>
      </div>
      <PostForm isOpen={showModal} closeModal={toggleModal} />
    </div>
  );
};
