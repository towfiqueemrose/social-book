import Image from "next/image";
import Link from "next/link";

export default function Birthday() {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 shadow-md text-sm">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-700">Birthdays</span>
      </div>
      {/* Bottom */}
      <div className="flex items-center  justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1725610588150-c4cd8b88affd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            height={40}
            width={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-bold">Kobe</span>
        </div>
        <div className="flex justify-end gap-3">
          <button className="bg-blue-500 text-white text-xs rounded-md p-2">
            Celebrate
          </button>
        </div>
      </div>

{/* Upcoming */}
      <div className="p-4 bg-yellow-200 rounded-lg flex items-center gap-4">
      <Image
            src="/gift.png"
            alt=""
            height={25}
            width={25}
          />
          <Link href="/" className="flex flex-col gap-1 text-45">
          <div className="text-gray-700 font-semibold">Upcoming Birthdays</div>

          </Link>
      </div>
    </div>
  );
}
