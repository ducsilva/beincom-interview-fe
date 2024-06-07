"use client";

import { ISignIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { authService, userService } from "@/services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Metadata } from "next";
import { BannerWelcome, MetaDataCom } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TOKEN_MANAGEMENT, loginSchema } from "@/utils";
import { toast } from "react-toastify";

const metadata: Metadata = {
    title: "Sign In Page | Beincom",
    description: "Beincom",
};

const LoginPage = () => {
    const { setUser } = useAuth();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ISignIn | any>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange'
    });

    const { mutate } = useMutation({
        mutationFn: (form: ISignIn) => authService.signIn(form),
    });

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: async (res) => {
                const { access_token }: any = res;
                localStorage.setItem(TOKEN_MANAGEMENT.ACCESS_TOKEN, access_token)
                toast("🦄 Login successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "text-fuchsia-400 text-sm",
                });

                const profile: any = await userService.getProfile();
                if (!!profile) {
                    setUser(profile)
                    router.push('/')
                }
            },
            onError: (err: any) => {
                toast(`🦄 ${err?.data?.message || "Login failed! Please try again"}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "text-fuchsia-400 text-sm",
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
            <section className="relative z-10 h-screen bg-white flex flex-row">
                <div className="md:flex hidden w-1/2">
                    <BannerWelcome />
                </div>
                <div className="w-full md:w-1/2 col-span-full p-6 flex-center sm:col-span-1">
                    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center h-full">
                        <div className="w-full">
                            <div className="text-2xl font-semibold text-neutral-80">
                                Welcome back!
                            </div>
                            <h3 className="mt-2 text-base font-normal text-neutral-40">
                                Enter your credentials to access your account.
                            </h3>
                            <div className="my-6 flex w-full flex-col">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex w-full flex-col space-y-4"
                                >
                                    <div className="space-y-1">
                                        <label
                                            className="peer-disabled:cursor-not-allowed text-sm font-medium text-neutral-40"
                                            htmlFor=":rm:-form-item"
                                        >
                                            Email:
                                        </label>
                                        <div className="relative flex h-10 cursor-text items-center justify-between rounded-md border border-neutral-5 bg-white px-3 py-2 text-base w-full focus:border-purple-50 hover:border-purple-50 disabled:border-neutral-20 disabled:bg-gray-5 disabled:text-neutral-60">
                                            <input
                                                autoFocus={true}
                                                {...register("email")}
                                                autoComplete="off"
                                                placeholder="Your email"
                                                id=":rm:-form-item"
                                                aria-describedby=":rm:-form-item-description"
                                                aria-invalid="false"
                                                className="block w-full h-full text-base font-normal text-neutral-60 caret-neutral-60 placeholder:text-base placeholder:font-normal placeholder:text-neutral-20 autofill:!bg-gray-5 autofill:!text-neutral-60 read-only:cursor-default read-only:bg-gray-5 focus-visible:outline-none disabled:bg-gray-5 disabled:font-normal disabled:text-neutral-20"
                                            ></input>
                                        </div>
                                        {errors?.email && (
                                            <div className="flex w-fit items-center gap-1 rounded break-word text-red-300 bg-transparent text-xs font-normal">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-4 w-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 8C12.5523 8 13 8.44772 13 9V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V9C11 8.44772 11.4477 8 12 8ZM13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-sm">
                                                    {`${errors?.email?.message}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <label
                                            className="peer-disabled:cursor-not-allowed text-sm font-medium text-neutral-40"
                                            htmlFor=":rm:-form-item"
                                        >
                                            Password:
                                        </label>
                                        <div className="relative flex h-10 cursor-text items-center justify-between rounded-md border border-neutral-5 bg-white px-3 py-2 text-base w-full focus:border-purple-50 hover:border-purple-50 disabled:border-neutral-20 disabled:bg-gray-5 disabled:text-neutral-60">
                                            <input
                                                {...register("password")}
                                                autoComplete="off"
                                                placeholder="Your password"
                                                id=":rm:-form-item"
                                                aria-describedby=":rm:-form-item-description"
                                                aria-invalid="false"
                                                className="block w-full h-full text-base font-normal text-neutral-60 caret-neutral-60 placeholder:text-base placeholder:font-normal placeholder:text-neutral-20 autofill:!bg-gray-5 autofill:!text-neutral-60 read-only:cursor-default read-only:bg-gray-5 focus-visible:outline-none disabled:bg-gray-5 disabled:font-normal disabled:text-neutral-20"
                                            ></input>
                                        </div>
                                        {errors?.password && (
                                            <div className="flex w-fit items-center gap-1 rounded break-word text-red-300 bg-transparent text-xs font-normal">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-4 w-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 8C12.5523 8 13 8.44772 13 9V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V9C11 8.44772 11.4477 8 12 8ZM13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-sm">
                                                    {`${errors?.password?.message}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className={`relative flex items-center justify-center space-x-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:!cursor-not-allowed bg-purple-300 text-white hover:bg-purple-600 focus-visible:outline-purple-20 active:ring-purple-20 h-10 px-4 py-2 text-base focus-visible:outline-[3px] active:ring-[3px] [&amp;>svg]:h-6 [&amp;>svg]:w-6 disabled:bg-gray-5 disabled:text-gray-40 !mt-6 h-12 w-full rounded-lg p-2.5 ${isValid && "bg-purple-400"
                                            }`}
                                        disabled={!isValid || isSubmitting}
                                    >
                                        <span
                                            className={`${isValid ? "text-white" : "text-slate-400"
                                                } text-lg`}
                                        >
                                            Login
                                        </span>
                                    </button>
                                </form>
                            </div>
                            <div className="flex flex-col items-center space-y-6">
                                <div>
                                    Don’t have an account?{" "}
                                    <a
                                        className="text-[15px] font-semibold text-blue-500 hover:underline"
                                        href="/signup"
                                    >
                                        SignUp
                                    </a>
                                </div>
                            </div>
                            <div className="text-sm text-neutral-30 mt-3 items-center flex justify-center">
                                By logging in to BIC Group, you agree to our {" "}
                                <a
                                    target="_blank"
                                    className="text-blue-500 hover:underline"
                                    href="https://group.beincom.com/en/privacy&terms"
                                >
                                    Privacy &amp; Terms
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
