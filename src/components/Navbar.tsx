import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="bg-blue-100 p-3 h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="w-[15%] items-start">{/*w-20%]*/}
        <Link href="/" className="font-bold text-xl  text-blue-600 sm:text-base">
          SOCIALBOOK
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden md:flex w-[60%] text-sm items-center justify-between md:px-6">{/*w-50%]*/}
        {/* LINKS */}

        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt="Stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
          
        </div>
        <div className="hidden xl:flex p-4 bg-slate-100 items-center rounded-xl md:ml-6">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="" width={14} height={14} />
        </div>
      </div>
      <div className="w-[20%] flex items-center gap-4 xl:gap-8 justify-end">{/*w-30%]*/}
        <ClerkLoading>
          <MobileMenu />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="people" width={20} height={20}></Image>
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="messages" width={20} height={20}></Image>
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="notifications" width={20} height={20}></Image>
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 cursor-pointer">

              <Link href="/sign-in">
                <Image src="/login.png" alt="login" width={50} height={50}></Image></Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
}
