import ApplicationLayout from "src/layouts/app"
import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "src/types/session"
import type { SessionUserType } from "src/types/user";
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"

import { useState } from "react";
import {AccountForm} from "src/layouts/settings/account"


function Account() {

    return <>
        g   fgggggggggggg
    </>
}


export default function Application(
    {
        user
    }: {
        user: SessionUserType
    }
) {
    const [active, setActive] = useState<string>("account")

    return (<ApplicationLayout user={user}>
        <div className="space-y-6 p-10 pb-16 md:block bg-background">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav
                        className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}
                    >
                        {sidebarNavItems.map((item: Item) => (
                            <button

                                key={item.id}

                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    active === item.id
                                        ? "bg-muted hover:bg-muted"
                                        : "hover:bg-[rgba(var(--grey-rgb),0.1)] hover:underline",
                                    "justify-start"
                                )}
                                onClick={() => {
                                    setActive(item.id)
                                }}
                            >
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    {sidebarNavItems.map((item: Item) => {
                        if (active !== item.id)
                            return null
                        else{

                            return <div key={item.id}>
                                {item.Component}
                                {/* <Component /> */}
                            </div>
                        }
                    })}

                </div>
            </div>
        </div>
    </ApplicationLayout>)
}


const sidebarNavItems = [
    {
        title: "Account",
        id: "account",
        Component: <AccountForm />
    },
    // {
    //     title: "Appearance",
    //     id: "/app/settings/appearance",
    //     Component: <Account />

    // },
    // {
    //     title: "Display",
    //     id: "/app/setting/display",
    //     Component: <Account />

    // },
] as Item[]
interface Item {
    title: string;
    id: string;
    Component: React.ReactNode;
}




export async function getServerSideProps(context: GetSessionParams | undefined) {


    const session = (await getSession(context)) as sessionType | null;

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }


    return {
        props: { user: session.user as SessionUserType },
    }
}