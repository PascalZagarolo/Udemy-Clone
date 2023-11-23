import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Socials } from "@prisma/client";

import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { userId : string }}
) {
    try {

        type SocialLinks = Socials

        const socialTypes: SocialLinks[] = [
            "instagram",
            "twitter",
            "youtube",
            "email"
        ];

        const { userId } = auth();

        if(userId !== params.userId) {
            return new NextResponse("Nicht autorisiert" , { status : 401 })
        }

        const {
            instagram,
            twitter,
            youtube,
            email,
        } = await req.json();

        const instaName = instagram;
        const twitterName = twitter
        const youtubeName = youtube;
        const emailName = email;


        const usernameHashMap: Record<SocialLinks, string>= {
            instagram: instaName,
            twitter: twitterName,
            youtube: youtubeName,
            email: emailName,
            facebook: "",
            website: "",
        }

        let linkList;

        linkList = await db.links.findUnique({
            where : {
                userId : params.userId
            }
        })

        if(!linkList) {
            const linkList = await db.links.create({
                data : {
                    userId : params.userId,
                }
            })
        }

        for (let i = 0; i < socialTypes.length ; i++) {
            const socialType: SocialLinks = socialTypes[i];

            const username = usernameHashMap[socialType];

            const existingLink = await db.socialLinks.findFirst({
                where : {
                    linkType : socialType,
                    linksId : userId
                }
            })

            if(!existingLink) {
                const createLink = await db.socialLinks.create({
                    data : {
                        linksId : userId,
                        linkType : socialType,
                        username : username,
                        enabled : username == null ? false : true
                    }
                })
            }
            
        }
        return NextResponse.json(linkList);

    } catch(error) {
        console.log("Fehler in PATCH /user/[userId]/links/route.ts:");
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}