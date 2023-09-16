import Image from "next/image"
import Link from "next/link";
import type { SessionUserType } from "src/types/user";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { HeaderWrapper, MenuItem, MenuSeperator, MenuLabel, Main, Menubar,MenubarItem } from "./components";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AiOutlineUser, AiFillStar } from "react-icons/ai"
import { FiExternalLink } from "react-icons/fi"
import { FcFeedback } from "react-icons/fc"
import { signOut } from "next-auth/react";
import { useState } from "react";

const routes = [
    {
        name: "All applications",
        path: "/app",
    },
    {
        name: "Recommend for you",
        path: "/app/favourites",
    },
    {
        name: "Favourites",
        path: "/app/favourites",
    },
    {
        name: "Settings",
        path: "/app/settings",
    }
]


export default function ApplicationLayout(
    {
        user,
        children
    }: {
        user: SessionUserType,
        children: React.ReactNode
    }) {
    return (<>
        <HeaderWrapper>
            <nav>
                <Link href="/app" className="logo">
                    <Image src="/logo-square-dark.png" alt="Logo" width={100} height={100} />
                    <div className="text">
                        <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
                        <h2>Your Legal Assitant</h2>
                    </div>
                </Link>

                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline" size="sm">
                            Feedback <FcFeedback size={16} className="ml-2" />
                        </Button>
                    </DialogTrigger>
                    <FeedBackModal />

                </Dialog>
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <AiOutlineUser className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 py-2 mr-5 w-[250px] text-left">
                        <MenuLabel>
                            <h6 className="text-[rgba(var(--dark-rgb),1)]"> {user.name}</h6>
                            <p>{user.email}</p>
                        </MenuLabel>
                        <MenuSeperator />
                        <MenuItem as={Link} href="/" target="_blank">
                            App Homepage <FiExternalLink />
                        </MenuItem>
                        <MenuItem as={"button"} onClick={() => {
                            signOut({
                                callbackUrl: "/login"
                            })
                        }}>
                            Log Out
                        </MenuItem>
                    </PopoverContent>
                </Popover>


            </nav>
            <Menubar>
                {routes.map((item,index) =>{
                    return <MenubarItem key={index} as={Link} href={item.path}>
                            {item.name}
                    </MenubarItem>
                })}
            </Menubar>

        </HeaderWrapper>
        <Main>
            {children}
        </Main>


    </>)
}
const maxStars = 5;
export function FeedBackModal() {
    const [rating, setRating] = useState<number>(0);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>We value your input!</DialogTitle>
                <DialogDescription>Help us improve the AI Lawyer app by sharing your thoughts. Your feedback matters.</DialogDescription>
            </DialogHeader>
            <h6 className="text-[rgba(var(--dark-rgb),1)]">How can we make AI Lawyer even better?</h6>
            <Textarea className="mb-1" />

            <h6 className="text-[rgba(var(--dark-rgb),1)]">Rate Your Experience
                <span className="text-[rgba(var(--grey-rgb),0.5)] text-[14px] spacing-0"> (1 star - Terrible, 5 stars - Excellent)</span>
            </h6>
            <div className="flex justify-center">
                {[...Array(maxStars)].map((_, index) => (
                    <AiFillStar
                        key={index}
                        onClick={() => handleStarClick(index + 1)}
                        style={{
                            fill: index < rating ? 'gold' : 'rgba(var(--grey-rgb),1)', // Change star color based on rating
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>
            <p className="text-[rgba(var(--grey-rgb),1)] text-[16px] my-0 text-center">Your rating: {rating} out of {maxStars}</p>
            <Button>
                Submit Feedback
            </Button>
        </DialogContent>
    )
}