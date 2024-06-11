"use client";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { postService } from "@/services";
import Modal from 'react-modal';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { createCategorySChema } from "@/utils";
import { useCategory } from "@/hooks";

interface ICategoryProps {
  closeModal?: () => void;
  isOpen?: boolean;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "30rem",
    maxHeight: "90vh",
    overflow: "auto"
  },
  overlay: {
    backgroundColor: '#1b1d22cc',
    zIndex: 40
  }
};


const AddCategory = ({ isOpen, closeModal }: ICategoryProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(createCategorySChema),
  });
  const { refetchCategoryList } = useCategory({})

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name }: { name: string }) => postService.createCategory({ name }),
  });



  const _onSubmit = (data) => {
    mutate(data, {
      onSuccess: async (res) => {
        refetchCategoryList()
        toast("Create a category successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: "#4A6CF7",
            backgroundColor: "#fff"
          },
        });
        closeModal();
        reset()
      },
      onError: (err: any) => {
        toast(err?.data?.message || "Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: "#4A6CF7",
            backgroundColor: "#fff"
          },
        });
      },
    });

  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
      style={customStyles}
    >
      <section className="items-center flex justify-center max-w-[1080px]">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div
                className="mb-12 rounded-sm bg-white shadow-three dark:bg-gray-dark sm:px-[24px] lg:mb-5 lg:px-8 xl:px-[24px]"
                data-wow-delay=".15s"
              >
                <div className="flex justify-end mb-2">
                  <button
                    className="bg-transparent hover:bg"
                    onClick={closeModal}
                  >
                    <span className="text-black">X</span>
                  </button>
                </div>
                <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Create Category
                </h2>
                <form onSubmit={handleSubmit(_onSubmit)}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="title"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Category Name
                        </label>
                        <input
                          {...register('name')}
                          placeholder="Enter category name"
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                        {errors?.name && <span className="text-red-500 text-sm">{errors?.name?.message}</span>}
                      </div>
                    </div>
                    <div className="w-full px-4 justify-end flex">
                      <Button
                        size="md"
                        className="rounded mr-2 flex justify-center items-center bg-pink-300 p-4 text-sm font-medium text-neutral-40 flex-center hover:bg-pink-500"
                        onClick={closeModal}
                      >
                        <span className="text-white">Cancel</span>
                      </Button>
                      <Button
                        size="md"
                        className="rounded min-w-16 flex justify-center items-center bg-indigo-500  p-4 text-sm font-medium text-neutral-40 flex-center hover:bg-indigo-700"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="0" fill="currentColor">
                            <animate
                              id="svgSpinnersPulse20"
                              fill="freeze"
                              attributeName="r"
                              begin="0;svgSpinnersPulse21.begin+0.6s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="0;11"
                            />
                            <animate
                              fill="freeze"
                              attributeName="opacity"
                              begin="0;svgSpinnersPulse21.begin+0.6s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="1;0"
                            />
                          </circle>
                          <circle cx="12" cy="12" r="0" fill="currentColor">
                            <animate
                              id="svgSpinnersPulse21"
                              fill="freeze"
                              attributeName="r"
                              begin="svgSpinnersPulse20.begin+0.6s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="0;11"
                            />
                            <animate
                              fill="freeze"
                              attributeName="opacity"
                              begin="svgSpinnersPulse20.begin+0.6s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="1;0"
                            />
                          </circle>
                        </svg> : <span className="text-white">Save</span>}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default AddCategory;
