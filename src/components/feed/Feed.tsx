import { auth } from "@clerk/nextjs/server";
import Post from "../rightMenu/Post";
import prisma from "@/lib/client";

export default async function Feed({ username }: { username?: string }) {
  const { userId } = auth();

  let posts: any[] = [];

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        user: true,

        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);

    const ids = [...followingIds, userId];

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,

        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return (
    <div className="p-4 bg-whiteflex flex-col gap-12 shadow-md my-4 rounded-lg flex justify-between text-sm">
      {posts.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No posts found"}
    </div>
  );
}
