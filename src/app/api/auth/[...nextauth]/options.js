import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import {dynamodb, userTables,QueryCommand, GetItemCommand,ScanCommand} from "../../../../../db/db.config"

export const options = {
    session:{
        strategy: "jwt"
    },
    providers:[
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
                if(credentials){
                    const command = new ScanCommand({
                        TableName:userTables,
                        FilterExpression:'#u = :u and #p = :p',
                        ExpressionAttributeNames:{
                            "#u":"username",
                            "#p":"password"
                        },
                        ExpressionAttributeValues:{
                            ':u':{"S":credentials.username.toLowerCase()},
                            ':p':{"S":credentials.password}  
                        },
                    })
                    try{
                        const response = await dynamodb.send(command);
                        console.log("Dynamo DB Response: ",response)
                        if(response.Items && response.Items.length===1){
                            return {
                                name:response.Items[0].username.S,
                                email:response.Items[0].email.S
                            }
                        }
                        else{
                            return null;
                        }
                    } catch(error){
                        console.error('Error authorizing user:', error);
                        throw error;
                    }
                }
            },    
        })
    ],
    pages:{
        signIn:"/login"
    }
}