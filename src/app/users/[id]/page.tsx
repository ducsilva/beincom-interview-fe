"use client";

import { Metadata } from "next";
import { Audio } from "react-loader-spinner";
import { AvatarUploader, MetaDataCom } from "@/components";
import { useProfile } from "@/hooks";
import { useAuth } from "@/contexts";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadAvatarSchema } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services";
import { toast } from "react-toastify";

const metadata: Metadata = {
    title: "Profile User Page",
    description: "This is Profile Page",
    // other metadata
};

const ProfilePage = ({ params }) => {
    const { user, refetchProfile } = useAuth();
    const [initialAvatar, setInitialAvatar] = useState('')
    const [isChange, setIsChange] = useState(false)
    const { profileUser, isLoading } = useProfile(
        user?.username === params?.id ? "" : params?.id
    ); // just call api get profile by username when user logged different profile with user view profile

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(uploadAvatarSchema),
    });


    const { mutate, isPending } = useMutation({
        mutationFn: (form: any) => userService.updateUserAvatar(form),
    });

    useEffect(() => {
        if (user && user?.username === params?.id) {
            user?.avatar && setInitialAvatar(user?.avatar);
        } else {
            profileUser?.avatar && setInitialAvatar(profileUser?.avatar);
        }
    }, [params?.id, profileUser, setValue, user, initialAvatar]);

    const onSubmit = (data) => {
        const _formData = new FormData();
        _formData.append("avatar", data?.avatar);

        mutate(_formData, {
            onSuccess: async (res) => {
                refetchProfile()
                toast("Upload avatar successfully", {
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
                setIsChange(false)
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
        <>
            <MetaDataCom
                seoDescription={metadata.description}
                seoTitle={metadata.title}
            />
            <section className="mt-16 bg-gray-100">
                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="flex w-full h-96 items-center justify-center">
                            <Audio
                                height="80"
                                width="80"
                                color={"#4A6CF7"}
                                ariaLabel="loading"
                            />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-center w-full">
                            <div className="flex justify-center items-center h-screen">
                                <Card className="w-96 flex flex-col justify-center items-center">
                                    <Controller
                                        name="avatar"
                                        control={control}
                                        render={({ field }) => (
                                            <AvatarUploader
                                                {...field}
                                                onFileSelect={(file) => {
                                                    setIsChange(true)
                                                    setValue("avatar", file, {
                                                        shouldValidate: true,
                                                    })
                                                }}
                                                canUpdate={user?.username === params?.id}
                                                initialAvatar={initialAvatar}
                                            />
                                        )}
                                    />
                                    {errors?.avatar && (
                                        <span className="text-red-500 text-sm">
                                            {errors?.avatar?.message}
                                        </span>
                                    )}
                                    {isChange && <div className="flex flex-row items-center gap-2">
                                        <Button
                                            size="sm"
                                            className="rounded-3xl min-w-16 h-5 flex justify-center items-center bg-indigo-500  p-4 text-sm font-medium text-neutral-40 flex-center hover:bg-indigo-700"
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
                                    </div>}
                                    {user?.username === params?.id && <Typography
                                        variant="title1"
                                        color="gray"
                                        className="mt-2"
                                    >
                                        Upload Your Avatar
                                    </Typography>}
                                    <CardBody className="text-center">
                                        <Typography variant="h5" color="gray">
                                            FullName: {profileUser?.fullname || user?.fullname}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="gray"
                                            className="mt-2"
                                        >
                                            Email:  {profileUser?.email || user?.email}
                                        </Typography>
                                        <Typography variant="body2" color="gray" className="mt-2">
                                            Username: {profileUser?.username || user?.username}
                                        </Typography>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </form>
                )}
            </section>
        </>
    );
};

export default ProfilePage;
