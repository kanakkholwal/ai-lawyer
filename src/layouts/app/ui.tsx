import Image from "next/image"
import Link from "next/link";
import type { SessionUserType } from "src/types/user";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { HeaderWrapper, MenuItem, MenuSeperator, MenuLabel, AppWrapper, Menubar, MenubarItem } from "./components";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Textarea } from "@/components/ui/textarea"
import { Button,buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils"

import { AiOutlineUser, AiFillStar,AiOutlineStar } from "react-icons/ai"
import { FiExternalLink, FiSend } from "react-icons/fi"
import { LuShieldAlert } from "react-icons/lu"
import { FcFeedback } from "react-icons/fc"
import { RiAppsLine } from "react-icons/ri"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { IoSettingsOutline } from "react-icons/io5"
import { signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const routes = [
    {
        name: "All applications",
        path: "/app",
        icon:<RiAppsLine className="h-4 w-4" />
    },
    {
        name: "Recommend for you",
        path: "/app/favourites",
        icon:<MdOutlineFavoriteBorder className="h-4 w-4" />
    },
    {
        name: "Favourites",
        path: "/app/favourites",
        icon:<AiOutlineStar className="h-4 w-4" />
    },
    {
        name: "Settings",
        path: "/app/settings",
        icon:<IoSettingsOutline className="h-4 w-4" />
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
        // console.log(user)

    const sendVerificationMail = async () => {

        return new Promise(async (resolve, reject) => {

            try {
                await axios.post("/api/auth/request-verification-mail", {
                    email: user.email,
                    id: user.id
                })
                resolve(true)
            }
            catch (e) {
                reject(e)
            }

        })
    }

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
                    <DialogTrigger className={cn(buttonVariants({ variant:"outline", size:"sm", className:"" }))} >
                            Feedback <FcFeedback size={16} className="ml-2" />
                    </DialogTrigger>
                    <FeedBackModal />

                </Dialog>
                <Popover>
                    <PopoverTrigger className={cn(buttonVariants({ variant:"outline", size:"icon", className:"rounded-full" }))}>
                            <AiOutlineUser className="h-4 w-4" />
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
                {routes.map((item, index) => {
                    return <MenubarItem key={index} as={Link} href={item.path}>
                        {item.name}
                        {item.icon ? item.icon : null}
                    </MenubarItem>
                })}
            </Menubar>

        </HeaderWrapper>
        <AppWrapper>
            {user.verified === false ? <div className="relative w-full rounded-lg border p-4 bg-background flex items-center justify-between">
                <div>
                    <h5 className="mb-1 font-medium leading-none tracking-tigh text-[rgba(var(--warning-rgb),1)]">
                        <LuShieldAlert className="h-4 w-4 inline-block mr-1 -mt-1" />
                        Your account is not verified</h5>
                    <p className="text-sm leading-relaxed text-[rgba(var(--grey-rgb),1)]">
                        Please verify your email address to access all features.
                    </p>
                </div>
                <Button onClick={() => {
                    toast.promise(sendVerificationMail(), {
                        loading: "Sending verification mail...",
                        success: "Verification mail sent successfully to " + user.email,
                        error: "Failed to send verification mail"
                    })
                }}>
                    Verify Email <FiSend className="ml-1" />
                </Button>
            </div> : null}

            {children}
        </AppWrapper>


    </>)
}
const maxStars = 5;
export function FeedBackModal() {
    const [rating, setRating] = useState<number>(0);
    const [feedback, setFeedBack] = useState<string>("");

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };
    const submitFeedback = () =>{
        console.log(feedback, rating)

        return new Promise(async(resolve, reject) => {
            try{
                await axios.post("/api/feedback", {
                    feedback,
                    rating
                })
                resolve(true)
            }
            catch(e){
                reject(e)
            }
            finally{
                setFeedBack("");
                setRating(0);
            }
        })
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>We value your input!</DialogTitle>
                <DialogDescription>Help us improve the AI Lawyer app by sharing your thoughts. Your feedback matters.</DialogDescription>
            </DialogHeader>
            <h6 className="text-[rgba(var(--dark-rgb),1)]">How can we make AI Lawyer even better?</h6>
            <Textarea className="mb-1"
                placeholder="Your feedback"
                value={feedback}
                onChange={(e) => setFeedBack(e.target.value)}
            />

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
            <Button disabled={feedback.trim() === "" || feedback.trim().length <= 3 || rating === 0}
            onClick={() =>{
                

            toast.promise(submitFeedback(), {
                    loading: "Submitting feedback...",
                    success: "Feedback submitted successfully",
                    error: "Failed to submit feedback"
                })
    

                
            }}
            >
                Submit Feedback
            </Button>
        </DialogContent>
    )
}