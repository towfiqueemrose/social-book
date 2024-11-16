"use client"

import { deletePost } from "@/lib/actions"
import Image from "next/image"
import { useState } from "react"

export default function PostInfo({postId}:{postId:number}) {
      const [open, setOpen] = useState(false)
      const deletePostwithId = deletePost.bind(null, postId)
  return (
    <div className="relative">
      <Image
          src="/more.png"
          alt="More"
          width={16}
          height={16}
          className="h-5 w-5"
          onClick={() => setOpen((prev) =>!prev)}
        />
        {
            open && <div className="absolute top-4 right-0 z-30 bg-white p-4 text-xs w-32 shadow-lg rounded-lg flex flex-col gap-2">
<span className="cursor-pointer">View</span>
<span className="cursor-pointer">Re-post</span>
<form action={deletePostwithId}>
      <button className="text-red-500">Delete</button>
</form>
            </div>
        }
    </div>
  )
}
