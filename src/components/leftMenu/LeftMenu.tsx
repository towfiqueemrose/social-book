import Link from "next/link";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import Ad from "../Ad";

export default function LeftMenu({ type }: { type: "home" | "profile" }) {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white flex flex-col gap-4 rounded-lg shadow-md text-sm text-gray-700">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/posts.png" alt="post" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/Activity.png" alt="post" width={20} height={20} />
          <span>Activity</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/Market.png" alt="post" width={20} height={20} />
          <span>Marketplace</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/events.png" alt="post" width={20} height={20} />
          <span>Events</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/albums.png" alt="post" width={20} height={20} />
          <span>Albums</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/videos.png" alt="post" width={20} height={20} />
          <span>Videos</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
        >
          <Image src="/settings.png" alt="post" width={20} height={20} />
          <span>Settings</span>
        </Link>
        {/*        <hr className="border-t-1 border-gray-100 w-36 self-center"/>*/}
      </div>
      <Ad size="sm" />
    </div>
  );
}
