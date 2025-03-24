"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Session } from "next-auth";

const logoImg = "/icons/logo.svg";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src={logoImg} alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100 font-bold flex items-center justify-center w-full">
                {getInitials(session?.user?.name || 'U')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
