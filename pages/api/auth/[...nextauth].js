import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
    FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  }),
  LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    token:{
        url:"https://www.linkedin.com/oauth/v2/accessToken",
        async request({
            client,
            params,
            checks,
            provider
        }){
            const response=await client.oauthCallback(provider.callbackUrl,params,checks,{
                exchangeBody:{
                        clientId: process.env.LINKEDIN_CLIENT_ID,
                        clientSecret: process.env.LINKEDIN_CLIENT_SECRET
                    }
                });
            return{
                tokens:response
            }; 
        }
    }
  })
 ],
});
