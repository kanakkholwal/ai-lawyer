import ApplicationLayout from "src/layouts/app"
import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "src/types/session"
import type { SessionUserType } from "src/types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImSearch } from "react-icons/im"

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
            <Button type="submit" className="w-[200px]">Search Apps </Button>
        </div>
        <div className="flex w-full items-stretch justify-start">

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