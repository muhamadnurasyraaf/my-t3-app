"use server"

import { api } from "~/trpc/server"


export async function getLatest(){
    const transaction = await api.transaction.getLatest();

    return transaction ?? null;
}

export async function add(title : string,description : string,amount : number,){

    const transaction = await api.transaction.create({title: title,description:description,amount: amount})

    return transaction ?? null;
}