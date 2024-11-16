import Image from "next/image";
import Link from "next/link";

export default function Ad({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* Top */}
      <div className="flex justify-between items-center text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <span>
          <Image src="/more.png" alt="more" width={12} height={12} />
        </span>
      </div>
      {/* Bottom */}
      <div
        className={` flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div className={`relative w-full ${size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"}`}>
          <Image
            src="https://images.unsplash.com/photo-1706516560059-b03772add416?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="rounded-lg bg-cover"
          />
        </div>
        <div className="flex items-center gap-4">
        <Image
            src="https://images.unsplash.com/photo-1706516560059-b03772add416?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            height={24}
            width={24}
            className="rounded-full w-6 h-6 bg-cover"
          />
          <span>Google Ads</span>
        </div>
        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, consequuntur?</p>
      <Link href="https://adsense.google.com/start/" target="_blank" rel="noopener noreferrer" className=" text-gray-700">Learn more...</Link>
      </div>
    </div>
  );
}

