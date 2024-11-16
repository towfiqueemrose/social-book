import { User } from "@prisma/client";
import Ad from "../Ad";
import Birthday from "./Birthday";
import FriendRequest from "./FriendRequest";
import UserInformationCard from "./UserInformationCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";

export default function RightMenu({ user }: { user?: User }) {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInformationCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequest />
      <Birthday />
      <Ad size="md" />
    </div>
  );
}
