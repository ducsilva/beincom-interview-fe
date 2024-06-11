"use client";
import FileUploader from "./FileUpload";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { postService } from "@/services";
import Modal from "react-modal";
import { useCategory, usePosts } from "@/hooks";
import Select from "react-tailwindcss-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { createPostSChema } from "@/utils";
import { Button } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import AddCategory from "./AddCategory";
import { useHeader } from "@/contexts";

interface IPostFormProps {
  closeModal?: () => void;
  isOpen?: boolean;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "50rem",
    maxHeight: "90vh",
    overflow: "auto",
  },
  overlay: {
    backgroundColor: "#1b1d22cc",
    zIndex: 30
  },
};

const PostForm = ({ isOpen, closeModal }: IPostFormProps) => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const { currentPage } = useHeader()

  const { categoryList }: { categoryList: any } = useCategory(
    { limit: 100, page: 1 }
  );
  const { refetch } = usePosts({ page: currentPage, limit: 2 })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPostSChema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (form: any) => postService.createNewPost(form),
  });

  const _onSubmit = (data) => {
    const _formData = new FormData();
    _formData.append("banner", data?.banner);
    _formData.append("title", data.title);
    _formData.append("content", data.content);
    _formData.append("category", data?.category?.value);

    mutate(_formData, {
      onSuccess: async (res) => {
        refetch()
        toast("Create a new Post successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: "#4A6CF7",
            backgroundColor: "#fff",
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
            backgroundColor: "#fff",
          },
        });
      },
    });
  };

  const handleSelect = async (value) => {
    setValue("category", value, { shouldValidate: true });
    await trigger(["category"]); // Trigger validation on select
  };

  const toggleModalCategory = useCallback(() => {
    setIsOpenCategory(!isOpenCategory);
  }, [isOpenCategory]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
      style={customStyles}
    >
      <section className="items-center flex justify-center max-w-[1080px] z-30">
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
                  Create Post
                </h2>
                <form onSubmit={handleSubmit(_onSubmit)}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="title"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Title
                        </label>
                        <input
                          name="title"
                          type="text"
                          {...register("title")}
                          placeholder="Enter post title"
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                        {errors?.title && (
                          <span className="text-red-500 text-sm">
                            {`${errors?.title?.message}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="category"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Select category
                        </label>
                        <div className="flex justify-center items-center gap-2">
                          <Select
                            value={getValues("category")}
                            {...register("category")}
                            onChange={handleSelect}
                            options={categoryList}
                            placeholder="Select category"
                            primaryColor=""
                            classNames={{
                              menuButton: ({ isDisabled }) =>
                                `flex text-sm p-3 text-gray-500 h-12 items-center border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                                  ? "bg-gray-200"
                                  : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                }`,
                              menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-2 px-2 mt-1.5 text-sm text-gray-700",
                              listItem: ({ isSelected }) =>
                                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                                  ? `text-white bg-blue-500`
                                  : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                }`,
                            }}
                          />
                          <Button
                            size="md"
                            className="rounded  bg-indigo-300  flex-center hover:bg-indigo-500 h-full"
                            onClick={() => toggleModalCategory()}
                          >
                            <span className="text-white text-sm">+</span>
                          </Button>
                        </div>
                        {errors?.category && (
                          <span className="text-red-500  text-sm">
                            {errors?.category?.value?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="banner"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Banner
                        </label>
                        <Controller
                          name="banner"
                          control={control}
                          render={({ field }) => (
                            <FileUploader
                              {...field}
                              onFileSelect={(file) =>
                                setValue("banner", file, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          )}
                        />
                        {errors?.banner && (
                          <span className="text-red-500 text-sm">
                            {errors?.banner?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="content"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Content
                        </label>
                        <textarea
                          name="content"
                          {...register("content")}
                          rows={5}
                          placeholder="Enter your Message"
                          className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        ></textarea>
                        {errors?.content && (
                          <span className="text-red-500 text-sm">
                            {errors?.content?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full px-4 justify-end flex">
                      <Button
                        size="md"
                        className="rounded mr-2 min-w-16 flex justify-center items-center bg-pink-300 p-4 text-sm font-medium text-neutral-40 flex-center hover:bg-pink-500"
                        onClick={closeModal}
                      >
                        <span className="text-white">Cancel</span>
                      </Button>
                      <Button
                        size="md"
                        className="rounded flex min-w-16 justify-center items-center bg-indigo-500  p-4 text-sm font-medium text-neutral-40 flex-center hover:bg-indigo-700"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <svg
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
                          </svg>
                        ) : (
                          <span className="text-white">Save</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddCategory isOpen={isOpenCategory} closeModal={toggleModalCategory} />
    </Modal>
  );
};

export default PostForm;
