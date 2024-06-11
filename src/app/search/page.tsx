"use client";

import { ImagePlacehoderSkeleton } from "@/components";
import SinglePost from "@/components/Posts/SinglePost";
import withAuth from "@/hoc/withAuth";
import { useSearchList } from "@/hooks/useSearchList";
import { TPost } from "@/types";
import { useSearchParams } from 'next/navigation';

const Search = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const { searchList, isLoading } = useSearchList(search)


    return (
        <div className="relative mt-16 h-calc-custom w-screen overflow-y-auto overflow-x-hidden bg-gray-100">
            <div className="flex items-start justify-center gap-x-6 px-5 xl:gap-x-12 xl:px-11 pt-6">
                <div className="min-w-[524px] max-w-[672px]">
                    {isLoading ? (
                        <>
                            {[0, 1, 2].map((_, index) => (
                                <ImagePlacehoderSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        <div className="w-full mb-4 min-w-[524px] max-w-[672px]">
                            {searchList?.length ? <>
                                {
                                    searchList?.map((post: TPost, index) => {
                                        return <SinglePost post={post} key={post._id} />
                                    })
                                }
                            </> : <div className="text-lg text-black">Not found data with search value</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Search);
