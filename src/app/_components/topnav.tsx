"use client"

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/nextjs";

export default function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl
        font-semibold bg-blue-900 border-b-blue-50 text-amber-50">
            <div>RentHub</div>
            <div>
                <SignedOut>
                    <div className="cursor-pointer">
                      <SignInButton />
                    </div>
                </SignedOut>
                <SignedIn>
                    <SignOutButton />
                  <UserButton />
                </SignedIn>          
            </div>
        </nav>
    );
}