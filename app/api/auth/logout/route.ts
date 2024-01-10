import { options } from "../[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getIdToken } from "@/utils/sessionTokenAccessor";
import { NextApiRequest, NextApiResponse } from "next/types";
import { NextResponse } from 'next/server';
export async function GET(
    req: NextApiRequest
) {
    if (req.method === "GET") {
        try {
            const session: any = await getServerSession(options);
            if (session) {
                const idToken = await getIdToken();
                const endSessionUrl = process.env.END_SESSION_URL;
                const postLogoutRedirectUri = process.env.NEXTAUTH_URL;
                // this will log out the user on Keycloak side
                if (!endSessionUrl || !postLogoutRedirectUri) {
                    throw new Error("END_SESSION_URL or NEXTAUTH_URL is not defined");
                }
                const url = `${endSessionUrl}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
                const response = await fetch(url, { method: "GET" });
                if (!response.ok) {
                    console.error(`Failed to log out user: ${response.statusText}`);
                    return NextResponse.json({ error: "Internal Server Error" });
                }
            }
            return NextResponse.json({ message: "Logout successful" });
        } catch (err) {
            console.error(err);
            return NextResponse.json({ error: "Internal Server Error" });
        }
    }

    return NextResponse.json({ error: "Method Not Allowed" });
}