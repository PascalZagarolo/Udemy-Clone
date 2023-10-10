import { PrismaClient } from '@prisma/client'

//hinders Prisma client to be instantiated every time a file is saved. => HotReload !!!
//global This is not affected by the hot reload

declare global {
    var prisma : PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production")  globalThis.prisma = db;

