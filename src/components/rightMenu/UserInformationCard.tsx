import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

export default async function UserInformationCard({ user }: { user: User }) {
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);
  }

  return (
    <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md text-sm">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-700">User Information</span>
        {currentUserId === user.id ? (<UpdateUser user={user}/>): <Link href={"/"} className="text-blue-500 text-xs">
          See all
        </Link>
        }
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-4 text-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-lg text-black">
            {" "}
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex flex-center gap-2">
            <Image src="/map.png" width={20} height={16} alt="city" />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex flex-center gap-2">
            <Image src="/work.png" width={20} height={16} alt="city" />
            <span>
              Works in <b>{user.work}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex flex-center gap-2">
            <Image src="/school.png" width={20} height={16} alt="city" />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}

        {user.website && (
          <div className="flex gap-1 items-center">
            <Image src="/link.png" width={20} height={16} alt="link" />
            <Link href={user.website} className="text-blue-500 text-xs">
              {user.website}
            </Link>
          </div>
        )}

        <div className="flex gap-1 items-center">
          <Image src="/date.png" alt="" width={16} height={16} />
          <span>Joined {formattedDate}</span>
        </div>
        {currentUserId && currentUserId !== user.id && (<UserInfoCardInteraction
          userId={user.id}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
        />
        )}
      </div>
    </div>
  );
}
