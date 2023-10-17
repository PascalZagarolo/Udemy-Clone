import { PrismaClient } from '@prisma/client';



const database2 = new PrismaClient();

async function main() {
    try {
        await database.comments.delete({
            where : {
                content : null
            }
        })


    } catch (error){
        console.log("Error beim erstellen von Daten")
    } finally {
        await database.$disconnect();
    }
}

main();