import { prismaClient } from "../../src/app/database";
import { blogs } from "./blog-seeder";
import { users } from "./user-seeder";

async function main() {
    await prismaClient.user.createMany({
        data: users
    })
    await prismaClient.blog.createMany({
        data: blogs
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