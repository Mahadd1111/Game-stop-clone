"use client"
import { useSession,signOut } from "next-auth/react"

const Admin = () => {
    const { data: session } = useSession()
    if (session) {
        console.log("Session Data: ", session)
    }
    if (!session) {
        return (
            <div className="pt-20">Access Denied</div>
        )
    }

    async function handleLogOut(){
        await signOut({
            redirect:true,
            callbackUrl:"/"
        })
    }
    return (
        <div className="pt-20">
            <p>Successfully Logged In</p>
            <button onClick={handleLogOut}>sign Out</button>
        </div>
        
    )
}

export default Admin