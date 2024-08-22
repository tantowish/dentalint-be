import { prismaClient } from "../../src/app/database";
import { users } from "./user-seeder";

async function main() {
    await prismaClient.user.createMany({
        data: users
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