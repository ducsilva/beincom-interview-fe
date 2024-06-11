import { TPost } from "@/types";
import { usePosts } from "@/hooks";
import { useHeader } from "@/contexts";
import SinglePost from "./SinglePost";

const PostList = () => {
  const { currentPage } = useHeader()
  const { data } = usePosts({ limit: 2, page: currentPage });

  return (
    <>
      {
        data?.pages?.[0]?.items?.map((post: TPost, index) => {
          return <SinglePost post={post} key={index} />
        })
      }
    </>
  );
};

export default PostList;
