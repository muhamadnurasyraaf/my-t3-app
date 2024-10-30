
import { z } from 'zod';

import { createTRPCRouter,protectedProcedure } from '../trpc';

export const bankAccountRouter = createTRPCRouter({
    create:protectedProcedure
    .input(z.object({ initial_amount : z.number() }))
    .mutation(async ({ctx,input}) => {
         const bankAccount = await ctx.db.bankAccount.create({
            data:{
                amount: input.initial_amount,
                userId : ctx.session.user.id
            }
         })

         return bankAccount;
    }),

    getBankAccount:protectedProcedure
    .query(async ({ctx}) =>{
        const bankAccount = await ctx.db.bankAccount.findFirst({
            where:{
                userId:ctx.session.user.id
            }
        })

        return bankAccount ?? null;
    }),

    addBalance:protectedProcedure
    .input(z.object({amount : z.number()}))
    .mutation( async ({ctx,input}) =>{
        const {amount} = input;

        const bankAccount = await ctx.db.bankAccount.update({
            where:{
                userId:ctx.session.user.id
            },
            data:{
                amount:{
                    increment:amount
                }
            }
        })
        return bankAccount ?? null;
    }),

});