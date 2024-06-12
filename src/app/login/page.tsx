"use client";

import { ISignIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { BannerWelcome, MetaDataCom } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TOKEN_MANAGEMENT, loginSchema } from "@/utils";
import { toast } from "react-toastify";
import { useState } from "react";

const metadata: Metadata = {
    title: "Sign In Page | Beincom",
    description: "Beincom",
};

const LoginPage = () => {
    const [isShow, setIsShow] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ISignIn | any>({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (form: ISignIn) => authService.signIn(form),
    });

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: async (res) => {
                const { access_token }: any = res;
                localStorage.setItem(TOKEN_MANAGEMENT.ACCESS_TOKEN, access_token);
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

                // const profile: any = await userService.getProfile();
                // console.log("🚀 ~ onSuccess: ~ profile:", profile);
                // if (!!profile) {
                //     setUser(profile);
                router.push("/home");
                // }
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
                                                type={isShow ? "text" : "password"}
                                                {...register("password")}
                                                autoComplete="off"
                                                placeholder="Your password"
                                                id=":rm:-form-item"
                                                aria-describedby=":rm:-form-item-description"
                                                aria-invalid="false"
                                                className="block w-full h-full text-base font-normal text-neutral-60 caret-neutral-60 placeholder:text-base placeholder:font-normal placeholder:text-neutral-20 autofill:!bg-gray-5 autofill:!text-neutral-60 read-only:cursor-default read-only:bg-gray-5 focus-visible:outline-none disabled:bg-gray-5 disabled:font-normal disabled:text-neutral-20"
                                            ></input>
                                            <div
                                                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center space-x-1 text-neutral-40"
                                                onClick={() => setIsShow(!isShow)}
                                            >
                                                <div className="flex justify-center items-center cursor-pointer">
                                                    {isShow ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className="text-neutral-40 w-6 h-6"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M4.38016 12.5216C4.26517 12.3192 4.17258 12.1423 4.10169 12C4.17258 11.8577 4.26517 11.6808 4.38016 11.4784C4.70064 10.9143 5.18876 10.1637 5.85708 9.41679C7.19435 7.9222 9.19398 6.5 12 6.5C14.806 6.5 16.8057 7.9222 18.1429 9.41679C18.8112 10.1637 19.2994 10.9143 19.6198 11.4784C19.7348 11.6808 19.8274 11.8577 19.8983 12C19.8274 12.1423 19.7348 12.3192 19.6198 12.5216C19.2994 13.0857 18.8112 13.8363 18.1429 14.5832C16.8057 16.0778 14.806 17.5 12 17.5C9.19398 17.5 7.19435 16.0778 5.85708 14.5832C5.18876 13.8363 4.70064 13.0857 4.38016 12.5216ZM21.9266 11.6239C21.9268 11.6243 21.9269 11.6247 21 12C21.9269 12.3753 21.9268 12.3757 21.9266 12.3761L21.9262 12.3771L21.9252 12.3795L21.9225 12.3861L21.914 12.4064C21.9071 12.423 21.8974 12.4456 21.885 12.4738C21.8603 12.5303 21.8247 12.6096 21.7778 12.7082C21.6842 12.9054 21.5453 13.1813 21.3588 13.5096C20.9868 14.1643 20.419 15.0387 19.6334 15.9168C18.0628 17.6722 15.5624 19.5 12 19.5C8.43759 19.5 5.93722 17.6722 4.3666 15.9168C3.58097 15.0387 3.01317 14.1643 2.64122 13.5096C2.45467 13.1813 2.31581 12.9054 2.22218 12.7082C2.17533 12.6096 2.13968 12.5303 2.11496 12.4738C2.10259 12.4456 2.09294 12.423 2.08598 12.4064L2.07754 12.3861L2.07481 12.3795L2.07382 12.3771L2.07342 12.3761C2.07325 12.3757 2.07308 12.3753 3 12C2.07308 11.6247 2.07325 11.6243 2.07342 11.6239L2.07382 11.6229L2.07481 11.6205L2.07754 11.6139L2.08598 11.5936C2.09294 11.577 2.10259 11.5544 2.11496 11.5262C2.13968 11.4697 2.17533 11.3904 2.22218 11.2918C2.31581 11.0946 2.45467 10.8187 2.64122 10.4904C3.01317 9.83572 3.58097 8.96126 4.3666 8.08321C5.93722 6.3278 8.43759 4.5 12 4.5C15.5624 4.5 18.0628 6.3278 19.6334 8.08321C20.419 8.96126 20.9868 9.83572 21.3588 10.4904C21.5453 10.8187 21.6842 11.0946 21.7778 11.2918C21.8247 11.3904 21.8603 11.4697 21.885 11.5262C21.8974 11.5544 21.9071 11.577 21.914 11.5936L21.9225 11.6139L21.9252 11.6205L21.9262 11.6229L21.9266 11.6239ZM21 12L21.9269 11.6247C22.0244 11.8654 22.0244 12.1346 21.9269 12.3753L21 12ZM2.07308 11.6247L3 12L2.07308 12.3753C1.97564 12.1346 1.97564 11.8654 2.07308 11.6247ZM15 12C15 13.6569 13.6568 15 12 15C10.3431 15 8.99999 13.6569 8.99999 12C8.99999 10.3432 10.3431 9.00001 12 9.00001C13.6568 9.00001 15 10.3432 15 12Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className="text-neutral-40 w-6 h-6"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M4.29272 18.2929C3.9022 18.6834 3.9022 19.3166 4.29272 19.7071C4.68325 20.0976 5.31641 20.0976 5.70694 19.7071L19.7069 5.70711C20.0975 5.31658 20.0975 4.68342 19.7069 4.29289C19.3164 3.90237 18.6832 3.90237 18.2927 4.29289L4.29272 18.2929ZM11.9998 19.5C10.9643 19.5 10.0185 19.3455 9.15915 19.0833L10.8283 17.4142C11.2021 17.47 11.5925 17.5 11.9998 17.5C14.8059 17.5 16.8055 16.0778 18.1427 14.5832C18.8111 13.8363 19.2992 13.0857 19.6197 12.5216C19.7347 12.3192 19.8273 12.1423 19.8981 12C19.8273 11.8577 19.7347 11.6808 19.6197 11.4784C19.3519 11.007 18.967 10.4055 18.4578 9.78465L19.8779 8.36458C20.5381 9.14582 21.0264 9.90575 21.3586 10.4904C21.5452 10.8187 21.684 11.0946 21.7777 11.2918C21.8245 11.3904 21.8601 11.4697 21.8849 11.5262C21.8972 11.5544 21.9069 11.577 21.9139 11.5936L21.9223 11.6139L21.925 11.6205L21.926 11.6229L21.9264 11.6239C21.9264 11.6239 21.9267 11.6247 20.9998 12C21.9267 12.3753 21.9264 12.3761 21.9264 12.3761L21.926 12.3771L21.925 12.3795L21.9223 12.3861L21.9139 12.4064C21.9069 12.4229 21.8972 12.4456 21.8849 12.4738C21.8601 12.5303 21.8245 12.6096 21.7777 12.7082C21.684 12.9054 21.5452 13.1813 21.3586 13.5096C20.9867 14.1643 20.4189 15.0387 19.6332 15.9168C18.0626 17.6722 15.5622 19.5 11.9998 19.5ZM20.9998 12L21.9264 11.6239C22.0239 11.8646 22.0239 12.1354 21.9264 12.3761L20.9998 12ZM11.9998 6.5C12.4072 6.5 12.7976 6.52997 13.1714 6.58579L14.8405 4.91667C13.9812 4.65445 13.0354 4.5 11.9998 4.5C8.43743 4.5 5.93706 6.3278 4.36643 8.0832C3.58081 8.96125 3.013 9.83572 2.64105 10.4904C2.4545 10.8187 2.31564 11.0946 2.22201 11.2918C2.17516 11.3904 2.13951 11.4697 2.11479 11.5262C2.10242 11.5544 2.09277 11.577 2.08581 11.5936L2.07737 11.6139L2.07464 11.6205L2.07366 11.6229L2.07325 11.6239C2.07325 11.6239 2.07291 11.6247 2.99983 12L2.07325 11.6239C1.97581 11.8646 1.97547 12.1346 2.07291 12.3753L2.99983 12C2.07291 12.3753 2.07291 12.3753 2.07291 12.3753L2.07366 12.3771L2.07464 12.3795L2.07737 12.3861L2.08581 12.4064C2.09277 12.4229 2.10242 12.4456 2.11479 12.4738C2.13951 12.5303 2.17516 12.6096 2.22201 12.7082C2.31564 12.9054 2.4545 13.1813 2.64105 13.5096C2.97321 14.0942 3.46157 14.8542 4.12177 15.6354L5.54184 14.2153C5.03262 13.5945 4.64778 12.993 4.37999 12.5216C4.265 12.3192 4.17241 12.1423 4.10152 12C4.17241 11.8577 4.265 11.6808 4.37999 11.4784C4.70047 10.9143 5.18859 10.1637 5.85691 9.41679C7.19418 7.9222 9.19381 6.5 11.9998 6.5Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
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
                                            <span
                                                className={`${isValid ? "text-white" : "text-slate-400"
                                                    } text-lg`}
                                            >
                                                Log In
                                            </span>
                                        )}
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
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                            <div className="text-sm text-neutral-30 mt-3 items-center flex justify-center">
                                By logging in to BIC Group, you agree to our{" "}
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
