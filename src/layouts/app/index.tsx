// export * from "./header";

import type { SessionUserType } from "src/types/user"
export default function ApplicationLayout(
    {
        user,
        children
    }: {
        user: SessionUserType,
        children: React.ReactNode
    }) {
    return (<>
        {children}
    </>)
}