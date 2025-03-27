import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const logoImg = "/icons/logo.svg";

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src={logoImg} alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
          
          {/* <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100 font-bold flex items-center justify-center w-full">
                {getInitials(session?.user?.name || 'U')}
              </AvatarFallback>
            </Avatar>
          </Link> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
