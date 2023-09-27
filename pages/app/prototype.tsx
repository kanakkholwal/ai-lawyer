import { sessionType } from "@/src/types/session";
import { GetSessionParams, getSession } from "next-auth/react";
import ApplicationLayout from "src/layouts/app/ui"
import { SessionUserType } from "src/types/user"


import sampleDoc from "src/layouts/app/doc/sample/doc";
import DocView from "src/layouts/app/doc/view";
import { DocProvider } from "src/layouts/app/doc/context"

import Editor from "@/src/layouts/app/doc/editor";



export default function ProtoType({
    user
}: {
    user: SessionUserType
}) {



    return (<ApplicationLayout user={user}>
        <DocProvider doc={sampleDoc}>
            <div className=" grid w-full grid-cols-2 gap-2  max-w-[1400px] m-auto">
                <DocView />
                <Editor />
            </div>
        </DocProvider>




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