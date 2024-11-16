import Image from "next/image";
import Comments from "../feed/Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "../feed/PostInteraction";
import { Suspense } from "react";
import PostInfo from "../PostInfo";
import { auth } from "@clerk/nextjs/server";

type FeedPostType = PostType & { likes: [{ userId: string }] } & {
  _count: { comments: number };
} & { user: User };

export default function Post({ post }: { post: FeedPostType }) {
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt="Avater"
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}

        <p>{post.desc}</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* INTERACTION */}
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
}
