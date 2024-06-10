import { usePosts } from "@/hooks";
import { postService } from "@/services";
import { commentSchema } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ICommentForm {
    postId: string | any;
    isUpdate?: boolean;
    content?: string;
    id?: string;
    setIsUpdate?: (val) => void;
}

export const CommentForm = ({ postId, isUpdate, content, id, setIsUpdate }: ICommentForm) => {
    console.log("🚀 ~ CommentForm ~ content:", content)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(commentSchema),
        defaultValues: {
            content: content || ''
        }
    });

    const { refetch } = usePosts({})

    const { mutate, isPending } = useMutation({
        mutationFn: (form: any) => isUpdate ? postService.updateComment(form) : postService.addComment(form),
    });

    const onSubmit = (data) => {
        let dataSend = isUpdate ? {
            content: data.content,
            id: id
        } : {
            content: data?.content,
            postId: postId
        }
        mutate(dataSend, {
            onSuccess: async (res) => {
                if (setIsUpdate) {
                    setIsUpdate(false)
                }
                refetch()
                toast(`${isUpdate ? "Update comment" : "Create a  comment"} successfully`, {
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

    return (
        <div className="flex items-center flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex relative items-center min-h-12 w-full gap-y-2 overflow-hidden px-3 py-2 transition-all data-[state=edit]:min-h-[90px] data-[state=edit]:flex-col data-[state=edit]:animate-accordion-down data-[state=normal]:animate-accordion-up">
                    <div className="flex flex-col w-full text-base font-normal text-neutral-60">
                        <textarea
                            name="content"
                            {...register("content")}
                            rows={1}
                            placeholder="Write your Comment"
                            className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        ></textarea>
                        {errors?.content && <span className="text-red-500 text-sm mt-1">{errors?.content?.message}</span>}
                    </div>
                    <button
                        disabled={isPending}
                        type="submit"
                        className="grid h-16 w-16 bg-transparent absolute right-1 top-0 place-content-center text-purple-300 disabled:cursor-not-allowed disabled:text-neutral-20 hover:text-purple-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                        >
                            <path
                                d="M22 11.9554C21.9752 12.5182 21.7397 12.9202 21.2934 13.1614L4.67011 20.8794C4.49656 20.9598 4.33541 21 4.18665 21C3.86435 21 3.57924 20.866 3.33132 20.598C2.98422 20.1424 2.90985 19.6601 3.10819 19.1509L5.86014 13.2016L11.075 11.9956L5.86014 10.7897L3.10819 4.84037C2.90985 4.3044 2.98422 3.82202 3.33132 3.39324C3.7032 2.99126 4.14947 2.89747 4.67011 3.11186L21.3306 10.8299C21.7769 11.0711 22 11.4463 22 11.9554Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};
