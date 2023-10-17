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
                { name : "Wirtschaft" },
                { name : "Gesundheit" },
                { name : "Design"},
                { name : "Mathematik"},
                { name : "Sonstige Dienstleistungen "}
            ]
        })


    } catch (error){
        console.log("Error beim erstellen von Daten")
    } finally {
        await database.$disconnect();
    }
}

main();