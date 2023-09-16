// Your verification page or component

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import toast from "react-hot-toast"

export default function VerifyUser() {
    const router = useRouter();
    const {
        session,
        status,
        update
    } = useSession();
    const { token } = router.query;

    useEffect(() => {
        const verify = async () =>{
            await axios.get(`/api/auth/verify?token=${token}`)
                    .then(async (response) => {
                        console.log(response.data.message);
                        // Handle successful verification

                        if(status === "authenticated" ){
                            await update({
                                ...session,
                                user:{
                                    ...session.user,
                                    verified:true
                                }
                            })
                            toast.success("You are already logged in");
                            router.push("/app");
                            return;
                        }
                        toast.success(response.data.message);
                        router.push(response.data.callbackUrl);
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);
                        toast.error(error.response.data.message);
                        // Handle verification error
                    })
        }
        if (token) {
            verify()
        }
        else{
            router.push('/get-started');
        }
    }, [router, session, status, token, update]);


    return (<div className='flex justify-center items-center flex-col gap-4 w-[100vw] h-[100vh]'>
        
            <Image src="/loader.gif" alt="logo" width={500} height={500} />
            <h4>Verification in progress, Please wait ...</h4>

        <p className='text-sm text-[rgba(var(--grey-rgb),1)]'>
            If you are not redirected automatically, <Link href="/login" className='underline'>follow this link</Link>
        </p>
        <Head>
            <title>Verifying...</title>
        </Head>



    </div>);
};
