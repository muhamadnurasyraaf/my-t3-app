"use server"
import { api } from "~/trpc/server";

export async function createBankAccount(initialAmount : number){
    try {
        const bankAccount = await api.bankaccount.create({
          initial_amount: initialAmount,
        });
        return bankAccount;
      } catch (error) {
        console.error("Error creating bank account:", error);
        throw new Error("Failed to create bank account");
      }
}

export async function adjustBalance(amount : number){
  const bankAccount = await api.bankaccount.addBalance({ amount: amount});

  return bankAccount ?? null;
}

export async function getBankAccount(){
  return await api.bankaccount.getBankAccount();
}