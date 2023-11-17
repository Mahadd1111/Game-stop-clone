"use client"
import { useSession,signOut } from "next-auth/react"

const Admin = () => {
    const { data: session,status } = useSession({required:true});

    async function handleLogOut(){
        await signOut({
            redirect:true,
            callbackUrl:"/"
        })
    }
    return (
        <div className="pt-20">
            {
                status==="authenticated"?(
                    <div>
                        <p>Welcome {session.user.name}</p>
                    </div>
                ):(
                    <p>Access Denied</p>
                )
            }
        </div>
        
    )
}

export default Admin