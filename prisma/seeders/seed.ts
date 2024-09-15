import { prismaClient } from "../../src/app/database";
import { blogs } from "./blog-seeder";
import { clinics } from "./clinic-seeder";
import { users } from "./user-seeder";

async function main() {
    await prismaClient.user.createMany({
        data: users
    })
    await prismaClient.blog.createMany({
        data: blogs
    })
    await prismaClient.clinic.createMany({
        data: clinics
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })