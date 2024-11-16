"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      // Unfollow the user
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
      console.log(`Unfollowed user ${userId}`);
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        // Cancel the follow request
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
        console.log(`Canceled follow request to user ${userId}`);
      } else {
        // Send a new follow request
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
        console.log(`Sent follow request to user ${userId}`);
      }
    }
  } catch (err) {
    console.error("Error in switchFollow:", err);
    throw new Error(
      "Something went wrong while processing the follow/unfollow request."
    );
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      // Unblock the user
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
      console.log(`Unblocked user ${userId}`);
    } else {
      // Block the user
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
      console.log(`Blocked user ${userId}`);
    }
  } catch (err) {
    console.error("Error in switchBlock:", err);
    throw new Error(
      "Something went wrong while processing the block/unblock request."
    );
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      // Accept the follow request
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (err) {
    console.error("Error in acceptFollowRequest:", err);
    throw new Error(
      "Something went wrong while processing the follow request."
    );
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      // Accept the follow request
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.error("Error in acceptFollowRequest:", err);
    throw new Error(
      "Something went wrong while processing the follow request."
    );
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;

  const fields = Object.fromEntries(formData);

  const filterdFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(50).optional(),
    surname: z.string().max(50).optional(),
    description: z.string().max(250).optional(),
    city: z.string().max(50).optional(),
    school: z.string().max(50).optional(),
    work: z.string().max(50).optional(),
    website: z.string().max(50).optional(),
  });
  const validatedFields = Profile.safeParse({ cover, ...filterdFields });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();
  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
    }
  } catch (err) {
    throw new Error(
      "Something went wrong while processing the like/unlike request."
    );
  }
};

export const addComment = async (postId: number, desc: string) => {
    const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        userId,
        postId,
        desc,
      },
      include: {
        user: true,
      }
    });
    return createdComment;
  } catch (err) {
    console.error(err);
  }
}

export const addPost = async (formData: FormData, img:string) => {
 const desc = formData.get('desc') as string;  
 const { userId } = auth();

 const Desc = z.string().max(250).min(1);
 const validatedDesc = Desc.safeParse(desc);

 if(!validatedDesc.success) {
 return
 }

 try {
  await prisma.post.create({
    data: {
      userId:userId as string,
      img,
      desc: validatedDesc.data,
    },
    include: {
      user: true,
    }
  });
  revalidatePath('/');
 } catch (err) {
  console.log(err)
 }

 if(!userId) throw new Error("User is not authenticated");
}

export const addStory = async (img: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};


export const deletePost = async (postId: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath('/');
  } catch (err) {
    console.error(err);
  }
}

