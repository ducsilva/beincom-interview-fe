"use client";

import { CreatePost, ImagePlacehoderSkeleton } from "@/components";
import PostList from "@/components/Posts/PostList";
import { useHeader } from "@/contexts";
import withAuth from "@/hoc/withAuth";
import { usePosts } from "@/hooks";
import { useCallback } from "react";

const Home = () => {
    const { currentPage, setCurrentPage } = useHeader()
    const { data, isLoading, isFetchingNextPage, fetchNextPage, fetchPreviousPage } =
        usePosts({ limit: 2, page: currentPage });

    const handlePageClick = useCallback(
        (page) => {
            if (currentPage < page) {
                fetchNextPage()
            } else if (currentPage > page) {
                fetchPreviousPage()
            }
            setCurrentPage(page);

        }, [currentPage, fetchNextPage, fetchPreviousPage, setCurrentPage])


    return (
        <div className="relative mt-16 h-calc-custom w-screen overflow-y-auto overflow-x-hidden bg-gray-100">
            <div className="flex items-start justify-center gap-x-6 px-5 xl:gap-x-12 xl:px-11 pt-6">
                <div className="min-w-[524px] max-w-[672px]">
                    <CreatePost />

                    <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
                        <div className="w-full px-4">
                            <ul className="flex items-center justify-end py-2">
                                <li className="mx-1">
                                    <button
                                        onClick={() => {
                                            fetchPreviousPage();
                                            handlePageClick(currentPage - 1);
                                        }}
                                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>
                                </li>
                                {Array.from({
                                    length: data?.pages?.[currentPage - 1]?.pagination?.totalPage,
                                }).map((_, index) => (
                                    <li key={index} className="mx-1">
                                        <button
                                            onClick={() => {
                                                handlePageClick(index + 1);
                                            }}
                                            className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white 
                        ${currentPage === index + 1
                                                    ? "bg-primary text-white"
                                                    : ""
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className="mx-1">
                                    <button
                                        onClick={() => {
                                            handlePageClick(currentPage + 1);
                                            fetchNextPage();
                                        }}
                                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                                        disabled={
                                            currentPage ===
                                            data?.pages?.[currentPage - 1]?.pagination?.totalPage
                                        }
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {isLoading || isFetchingNextPage ? (
                        <>
                            {[0, 1, 2].map((_, index) => (
                                <ImagePlacehoderSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        <div className="w-full mb-4 min-w-[524px] max-w-[672px]">
                            <PostList />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home);
