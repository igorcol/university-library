import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const logoImg = "/icons/logo.svg";

const Header = async () => {

  return (
    <header className="my-10 flex justify-between items-center">
      <Link href="/">
        <Image src={logoImg} alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
          <li>
            <Link href={"/admin"}>
              <p className="text-light-100 underline">Admin Dashboard</p>
            </Link>
          </li>

        <li>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
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
