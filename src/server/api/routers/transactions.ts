import {  z } from "zod";

import { createTRPCRouter,protectedProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({

    getLatest:protectedProcedure
    .query( async ({ctx}) =>{
        const latestTransaction = await ctx.db.transaction.findMany({
           orderBy:{
            createdAt: 'desc'
           },
           take:4
        })

        return latestTransaction ?? null
    }),

    create:protectedProcedure
    .input(z.object({title : z.string(), description : z.string(), amount: z.number()}))
    .mutation( async ({ ctx ,input}) => {

        const {title ,description,amount} = input;

        const bankAccount = await ctx.db.bankAccount.findFirst({
            where:{
                userId: ctx.session.user.id
            }
        })

        if(!bankAccount){
            throw new Error("Bank Account not found")
        }

        const newBalance = bankAccount.amount - amount;

        await ctx.db.bankAccount.update({
            where:{id:bankAccount.id},
            data:{amount: newBalance}
        })

        const transaction = await ctx.db.transaction.create({
          data:{
            title: title,
            description: description,
            amount:amount,
            bankAccountId:bankAccount.id
          }
        })

        return transaction
    }),

});