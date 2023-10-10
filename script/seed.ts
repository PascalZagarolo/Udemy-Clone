const { PrismaClient} = require('@prisma/client');


const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data : [
                { name : "Webentwicklung" },
                { name : "Softwareentwicklung" },
                { name : "Musik" },                        
                { name : "Sport" },
                { name : "Ingenieurswissenschaften" }, 
                { name : "Filme & Kunst" },
            ]
        })


    } catch (error){
        console.log("Error beim erstellen von Daten")
    } finally {
        await database.$disconnect();
    }
}

main();