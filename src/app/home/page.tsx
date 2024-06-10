"use client";

import { CreatePost, ImagePlacehoderSkeleton } from "@/components";
import SinglePost from "@/components/Posts/SinglePost";
import withAuth from "@/hoc/withAuth";
import { usePosts } from "@/hooks";
import { TPost } from "@/types";

const Home = () => {
    const { isLoading, data } = usePosts({ limit: 10, page: 1 })

    return (
        <div className="relative mt-16 h-calc-custom w-screen overflow-y-auto overflow-x-hidden bg-gray-100">
            <div className="flex items-start justify-center gap-x-6 px-5 xl:gap-x-12 xl:px-11 pt-6">
                <div className="min-w-[524px] max-w-[672px]">
                    <CreatePost />
                    {isLoading ? <>
                        {[0, 1, 2].map((_, index) => <ImagePlacehoderSkeleton key={index} />)}
                    </> : <>
                        {data?.pages?.[0]?.items?.map((post: TPost) => (
                            <div
                                key={post.id}
                                className="w-full mb-4"
                            >
                                <SinglePost post={post} />
                            </div>
                        ))}
                    </>}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home)