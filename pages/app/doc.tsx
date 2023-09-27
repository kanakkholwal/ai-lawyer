import ApplicationLayout from "src/layouts/app"
import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "src/types/session"
import type { SessionUserType } from "src/types/user"
import { ChangeEvent, useState } from "react";
import Markdown from 'markdown-to-jsx'


export default function Application(
    {
        user
    }: {
        user: SessionUserType
    }
) {
    const [data, setData] = useState({
        content:
            'That my driving license No. ………….. has been lost/stolen on….. for which I have lodged FIR at Police Station,',
        editables: [
            { start: 28, end: 43, placeholder: '…………..' }, // Define the start and end indices of each editable part
            { start: 56, end: 61, placeholder: '…..' },
        ],
    });

    const updateData = (newData: string) => {
        setData({
            ...data,
            content: newData
        });
    };

    return (<ApplicationLayout user={user}>
        Doc app
        <Markdown>
            {data.content}
        </Markdown>
        <EditableForm data={data} onUpdateData={updateData} />
    </ApplicationLayout>)
}
function EditableForm({ data, onUpdateData }: {
    data: {
        content: string;
        editables: {
            start: number;
            end: number;
            label?: string;
        }[];
    },
    onUpdateData: (newData: string) => void;
}) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newData = { ...data };
        const { start, end } = newData.editables[index];
        const updatedValue = e.target.value;

        //   // Update the content between start and end indices
        //   newData.content =
        //     newData.content.slice(0, start) + updatedValue + newData.content.slice(end);

        onUpdateData(newData.content.slice(0, start) + updatedValue + newData.content.slice(end));
    };

    return (
        <form>
            {data.editables.map((editable, index) => (
                <div key={index}>
                    <label>{editable.label}</label>
                    <input
                        type="text"
                        value={data.content.slice(editable.start, editable.end)}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                </div>
            ))}
        </form>
    );
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