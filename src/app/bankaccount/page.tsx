'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // use the new router hook in app directory
import { createBankAccount,getBankAccount } from "./actions"; // Import the server action

export default function CreateBankAccount() {
  interface Payload {
    amount: number;
  }


  const [formData, setFormData] = useState<Payload>({ amount: 0 });
  const [error, setError] = useState<string | null>(null);
  const [existingBankAccount,setExistingBankAccount] = useState<{amount: number} | null>(null);

  const router = useRouter();

  useEffect(() =>{
    const fetchBankAccount = () =>{
      getBankAccount()
      .then((bankAccount)=> setExistingBankAccount(bankAccount))
      .catch((error) =>{
        setExistingBankAccount(null)
      })
    }
     fetchBankAccount();
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    setFormData({ ...formData, [name]: numericValue });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const bankAccount = await createBankAccount(formData.amount);
      if (bankAccount) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating bank account:", error);
      setError("Failed to create bank account. Please try again.");
    }
  };

  return (
    <div className="card p-4 bg-slate-200 text-black">
      <form onSubmit={handleSubmit} className={`flex flex-col ${existingBankAccount ? 'hidden' : ''}`}>
        <label htmlFor="" className="label mb-4 bg-indigo-400 rounded text-white">Enter Your Initial Amount of Your Bank Account</label>
        <input
          type="text"
          name="amount"
          className="input text-white"
          onChange={handleChange}
          value={formData.amount}
          placeholder="Initial Amount of your bank account"
        />
        <button className="btn btn-primary mt-4" type="submit">Create Bank Account</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}