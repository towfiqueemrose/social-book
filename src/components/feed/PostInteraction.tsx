"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

export default function PostInteraction({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) {
  const { isLoaded, userId } = useAuth();

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {}
  };

  return (
    <div className="flex  items-center justify-between text-sm my-3">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-200 rounded-xl p-2">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt=""
                height={25}
                width={25}
                className="cursor-pointer pl-2"
              />
            </button>
          </form>
          <span className="text-gray-400">|</span>
          <span className="text-gray-700">
            {optimisticLike.likeCount}{" "}
            <span className="hidden xs:inline">Likes</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-slate-200 rounded-xl p-2">
        <Image
          src="/comment.png"
          alt=""
          height={16}
          width={16}
          className="cursor-pointer"
        />

        <span className="text-gray-400">|</span>
        <span className="text-gray-700">
          {commentNumber} <span className="hidden xs:inline">Comments</span>
        </span>
      </div>
      <div className="flex items-center gap-4 bg-slate-200 rounded-xl p-2">
        <Image
          src="/share.png"
          alt=""
          height={16}
          width={16}
          className="cursor-pointer"
        />
        <span className="text-gray-400">|</span>
        <span className="text-gray-700">
          <span className="hidden xs:inline">Share</span>
        </span>
      </div>
    </div>
  );
}
