"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";

const Admin = () => {
    const { data: session, status } = useSession({ required: true });


    return (
        <div className="pt-20 bg-white h-screen">
            {
                status === "authenticated" ? (
                    <div className="shadow-xl flex flex-col items-center justify-center px-10 py-10 w-full">
                        <div className="py-5 px-10 flex flex-row w-full h-20 justify-between items-center text-xl">
                            <p className="text-black font-bold">Welcome <span className="text-red-600">{session.user.name}</span></p>
                            <p className="text-black font-bold">Admin Dashboard</p>
                        </div>
                        <div className="grid grid-cols-3 gap-20 px-10 py-10 w-full">
                            <div className="py-10 px-10 flex flex-col items-center justify-center gap-10 bg-slate-900 rounded-xl">
                                <h1 className="text-white text-2xl">Upload New Product</h1>
                                <Link href={`/upload`} className="bg-red-600 hover:bg-red-400 text-white font-bold rounded-xl px-12 py-3 text-center">Create</Link>
                            </div>
                        </div>
                    </div>


                ) : (
                    <p>Access Denied</p>
                )
            }
        </div>

    )
}

export default Admin