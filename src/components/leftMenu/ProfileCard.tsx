import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function ProfileCard() {
  const { userId } = auth();
  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include:{
      _count:{
        select:{
          followers: true,
          
        }
      }
    }
  });

  console.log(user);
  if(!user) return null

  return (
    <div className="p-2 bg-white flex flex-col gap-4 rounded-lg shadow-md text-sm">
      <div className="h-20 relative">
        <Image
          src= {user.cover || "/noCover.jpg"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto ring-1 z-10 ring-white -bottom-6"
        />
      </div>
      <div className="h-20 flex flex-col items-center my-3">
        <span className="font-semibold">{(user.name && user.surname) ? user.name+" " +user.surname : user.username}</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.unsplash.com/photo-1714250099418-3f149876a6b5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-700 m-2">{user._count.followers} Followers</span>
        </div>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
          My Profile
        </button>
      </div>
    </div>
  );
}
