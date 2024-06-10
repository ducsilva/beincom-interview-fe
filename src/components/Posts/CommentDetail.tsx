import { useAuth } from "@/contexts";
import { IComment } from "@/types";
import { EActionType, commentMenuItems } from "@/utils";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { CommentForm } from "./CommentForm";
import { useMutation } from "@tanstack/react-query";
import { postService } from "@/services";
import { usePosts } from "@/hooks";
import { toast } from "react-toastify";

interface ICommentProps {
    comment: IComment;
    postId: string | any;
}

export const CommentDetail = ({ comment, postId }: ICommentProps) => {
    const { user } = useAuth();
    const { refetch } = usePosts({})
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const { mutate } = useMutation({
        mutationFn: (form: any) => postService.deleteComment(form),
    });

    const handleClickMenuItem = useCallback((type: string) => {
        if (type === EActionType.delete) {
            mutate({ id: comment.id }, {
                onSuccess: async (res) => {
                    refetch()
                    toast("Delete comment successfully", {
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
                    setIsMenuOpen(false)
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
        } else if (type === EActionType.update) [setIsUpdate(true)];
    }, []);

    return (
        <div className="flex gap-2 items-center space-x-2 pt-3">
            <div className="min-w-[54px]">
                <Image
                    className="!box-border aspect-square object-cover overflow-hidden bg-neutral-1 border-neutral-1 border-[1.5px] rounded-full"
                    alt={"Avatar"}
                    src="https://bic-pro-entity-attribute-s3-bucket.s3.ap-southeast-1.amazonaws.com/static/user/default-avatar.png"
                    width={50}
                    height={50}
                />
            </div>
            <div className="flex grow w-full flex-row rounded-lg  bg-[#f8f8f8] p-2 text-neutral-600">
                {isUpdate ? (
                    <CommentForm
                        postId={postId}
                        isUpdate={isUpdate}
                        id={comment.id}
                        content={comment.content}
                        setIsUpdate={setIsUpdate}
                    />
                ) : (
                    <div className="flex flex-col">
                        <a href={`/users/${comment?.userId?.username}`}>
                            <span className="relative flex shrink-0 cursor-pointer font-semibold">
                                {comment?.userId?.fullname}
                            </span>
                        </a>
                        <div className="text-base font-normal text-neutral-60 break-word">
                            <p>{comment?.content}</p>
                        </div>
                    </div>
                )}
                {user?.id === comment?.userId?.id && !isUpdate && (
                    <Menu
                        open={isMenuOpen}
                        handler={setIsMenuOpen}
                        placement="bottom-end"
                    >
                        <MenuHandler>
                            <Button
                                variant="text"
                                color="blue-gray"
                                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                            >
                                <AdjustmentsVerticalIcon
                                    strokeWidth={2.5}
                                    className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </MenuHandler>
                        <MenuList className="p-2 min-w-56">
                            {commentMenuItems.map(({ label, icon, type }, key) => {
                                return (
                                    <MenuItem
                                        key={label}
                                        onClick={() => handleClickMenuItem(type)}
                                        className="flex items-center gap-2 rounded"
                                    >
                                        {React.createElement(icon, {
                                            className: `h-4 w-4`,
                                            strokeWidth: 2,
                                            color: type === EActionType.delete ? "text-red-500" : "",
                                        })}

                                        <Typography
                                            as="span"
                                            variant="small"
                                            className={`font-normal ${type === EActionType.delete ? "text-red-500" : ""
                                                }`}
                                        >
                                            {label}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                )}
            </div>
        </div>
    );
};
