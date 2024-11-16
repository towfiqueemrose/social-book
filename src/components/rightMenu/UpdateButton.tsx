"use client"

import { useFormStatus } from "react-dom"

export default function UpdateButton() {
      const { pending } = useFormStatus()
  return (
    <button className="bg-blue-500 p-2 m-2 rounded-md text-white disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </button>
  )
}
