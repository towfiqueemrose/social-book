"use client";

import Image from "next/image";
import { FollowRequest, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";

type RequestWithUser = FollowRequest & {
  sender: User;
};

export default function FriendRequestList({
  requests,
}: {
  requests: RequestWithUser[];
}) {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== request.id)
      );
    } catch (err) {}
  };

  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== request.id)
      );
    } catch (err) {}
  };

  // Defines two functions for optimistic updates using the `useOptimistic` hook
  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState, // Initial state representing the current requests

    // Callback function that removes a request by ID from the state
    (state, value: number) =>
      // Filters the state array to remove the request with the matching `id`
      state.filter((request) => request.id !== value)
  );

  // `optimisticRequest`: Used to trigger an optimistic update
  // `removeOptimisticRequest`: Reverses or finalizes the update by removing the request with the specified `id`
  // This setup allows the UI to show a change immediately, improving user experience

  return (
    <div>
      {optimisticRequest.map((request) => (
        <div key={request.id} className="flex items-center  justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              height={40}
              width={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {" "}
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex justify-end gap-3">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  height={30}
                  width={30}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  height={30}
                  width={30}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
