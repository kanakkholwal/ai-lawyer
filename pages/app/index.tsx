import ApplicationLayout from "src/layouts/app"
import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "src/types/session"
import type { SessionUserType } from "src/types/user"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImSearch } from "react-icons/im"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
  
export default function Application(
    {
        user
    }: {
        user: SessionUserType
    }
) {

    return (<ApplicationLayout user={user}>
        <h1 className="text-center text-4xl leading-9 tracking-wider font-semibold my-5 mb-8 ">
            All Applications
        </h1>
        <div className="flex w-full items-center space-x-2 relative">
            <Input type="search" placeholder="Search Apps..." className="py-5  pl-10 text-lg" />
            <span className="absolute inset-block-0 left-2 text-[rgba(var(--grey-rgb),1)] outline-none">
                <ImSearch />
            </span>
            <Button type="submit" className="w-[200px]">Search Apps  <ImSearch className="ml-2"/> </Button>
        </div>
        <div className="flex w-full items-stretch justify-start mt-5">
            <Card className="max-w-[500px]">
                <CardContent className="overflow-hidden rounded-xl pt-4 pb-0">
                    <Image src="/prototype.png" alt="Prototype" width={400} height={300} className="w-full h-auto max-h-[280px] rounded-xl"/>
                </CardContent>
                <CardHeader>
                    <Link className="text-2xl  leading-none tracking-tight  font-semibold"  href={"/app/prototype"}>Prototype</Link>
                    <CardDescription className="text-sm">
                        Get your prototype ready in minutes
                    </CardDescription>
                   
                </CardHeader>
            </Card>
        </div>
    </ApplicationLayout>)
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