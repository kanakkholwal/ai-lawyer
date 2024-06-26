import ApplicationLayout from "src/layouts/app/ui"
import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "src/types/session"
import type { SessionUserType } from "src/types/user"


export default function Application(
    {
        user
    }: {
        user: SessionUserType
    }
) {

    return (<ApplicationLayout user={user}>
            Admin
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