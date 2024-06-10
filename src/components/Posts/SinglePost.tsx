import { TPost } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { CommentForm } from "./CommentForm";
import { CommentDetail } from "./CommentDetail";

const SinglePost = ({ post }: { post: TPost }) => {
  const { title, category, banner, content, createdAt, user, id, comments } = post;

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href={`/post-details/${id}`}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {category?.name}
          </span>
          <Image src={banner} alt="image" fill />
        </Link>
        <div className="px-6 sm:p-8 md:px-6 md:py-2 lg:p-2 xl:py-2 xl:px-8 2xl:p-2 2xl:px-8">
          <h3 className="h-16">
            <Link
              href={`/post-details/${id}`}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10 h-12 text-clip overflow-hidden ..." >
            {content}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={user?.avatar || "https://bic-pro-entity-attribute-s3-bucket.s3.ap-southeast-1.amazonaws.com/static/user/default-avatar.png"} alt="author" fill />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {user?.username}
                </h4>
                <p className="text-xs text-body-color">{user?.designation || "designation"}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
          </div>
        </div>
        <hr className="mx-4 mb-1 mt-2 bg-neutral-5" />
        <section className="px-4 pb-4 pt-3">
          <div className="flex flex-row gap-2 items-center">
            <div className="">
              <Image
                className="!box-border aspect-square object-cover overflow-hidden bg-neutral-1 border-neutral-1 border-[1.5px] rounded-full"
                alt={"Avatar"}
                src="https://bic-pro-entity-attribute-s3-bucket.s3.ap-southeast-1.amazonaws.com/static/user/default-avatar.png"
                width={50}
                height={50}
              />
            </div>
            <CommentForm postId={id} />
          </div>
          {
            comments?.map((comment) => {
              return <CommentDetail key={comment.id} comment={comment} postId={id} />
            })
          }
        </section>
      </div>
    </>
  );
};

export default SinglePost;
