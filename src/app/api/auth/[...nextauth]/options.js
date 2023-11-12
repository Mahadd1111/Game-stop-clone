import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    session:{
        strategy: "jwt"
    },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{
                    label:"Username: ",
                    type:"text",
                    placeholder:"your-username"
                },
                password:{
                    label:"Password: ",
                    type:"password",
                    placeholder:"your-password"
                }
            },
            async authorize(credentials){
                // Database Logic
                const user = {id:"40",username:"Mahad",password:"nextauth",email:"Mahad_1111@outlook.com"}
                if(credentials?.username.toLowerCase()==user.username.toLowerCase() && credentials?.password==user.password){
                    return {
                        name:user.username,
                        email:user.email
                    }
                }
                else{
                    return null
                }
            },
            
        })
    ],
    pages:{
        signIn:"/login"
    }
}