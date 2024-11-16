"use client";

// Import necessary functions and hooks from different modules.
import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

// Define a component to handle user interactions, such as follow and block.
const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  // Initialize state to track user interaction states.
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  // Function to handle the follow action.
  const follow = async () => {
    // Use optimistic update to provide a faster response.
    switchOptimisticState("follow");
    try {
      // Attempt to follow or unfollow the user.
      await switchFollow(userId);
      // Update the user state based on the follow action result.
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (err) {
      // Handle error if the follow action fails.
    }
  };

  // Function to handle the block action.
  const block = async () => {
    // Use optimistic update to provide a faster response.
    switchOptimisticState("block");
    try {
      // Attempt to block or unblock the user.
      await switchBlock(userId);
      // Update the user state based on the block action result.
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (err) {
      // Handle error if the block action fails.
    }
  };

  // Set up optimistic state handling for faster UI feedback.
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );

  // Render the follow and block buttons based on the current state.
  return (
    <>
      {/* Form to trigger the follow action */}
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      
      {/* Form to trigger the block action */}
      <form action={block} className="self-end ">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
          