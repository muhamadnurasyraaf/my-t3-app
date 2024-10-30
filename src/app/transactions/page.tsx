"use client"

import React,{useState} from "react";
import { add } from "./actions";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element{

    interface Payload{
        title : string
        description: string
        amount : number
    }

    const [formData,setFormData] = useState<Payload>({ title: '',description: '' ,amount : 0});

    const handleChange = (e : React.ChangeEvent) =>{
        const { name , value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "amount" ? parseFloat(value) : value as string,
        }));
    }

    const router = useRouter()

    const handleSubmit = async ( e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const {title, description,amount} = formData;
        const transaction = await add(title,description,amount);

        if(transaction){
        router.push('/')
        }
    }

    return (
    <form className="card p-4 flex flex-col gap-4 bg-blue-900" onSubmit={handleSubmit}>
        <label htmlFor="" className="label font-bold">Record New Transaction</label>
        <input type="text" name="title" onChange={handleChange} className="input bg-slate-200 text-black" placeholder="Title of your transaction" />
        <input type="text" name="description" onChange={handleChange} className="input bg-slate-200 text-black" placeholder="Description" />
        <input type="text" name="amount" onChange={handleChange} className="input bg-slate-200 text-black" placeholder="amount" />
        <button type="submit" className="btn btn-secondary">Submit</button>
    </form>
    )
}