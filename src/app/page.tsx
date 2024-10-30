import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {

  const session = await getServerAuthSession();
  const bankAccount = await api.bankaccount.getBankAccount();
  const transactions = await api.transaction.getLatest();
  return (
    
    <HydrateClient>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Your <span className="text-[hsl(280,100%,70%)]">Finance</span> Partner
          </h1>
        
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
             
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href="/bankaccount"
                className={`rounded-full bg-white/10 px-10 py-3 font-semibold 
                  no-underline transition hover:bg-white/20 ${bankAccount ? 'hidden' : ''}`}
              >
              Dont have bank account yet? Create new one!
              </Link>

              <div className={`${bankAccount ? '' : 'hidden'} flex flex-col gap-4`}>
                <div className="card p-4 bg-slate-100 text-black">
                  <div className="flex justify-between items-center gap-2">
                  <span className="font-bold">Your Bank Account</span>
                  <Link href="/bankaccount" className="btn btn-secondary text-white">
                  Adjust Balance to your account
                  </Link>
                  </div>  
                   
                    <span>Balance : {bankAccount?.amount}</span>
                </div>

              <div className={`card p-4 bg-slate-100 text-black ${bankAccount ? '' : 'hidden'} flex flex-col items-center`}>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold">Your Latest Transaction </span>
                  <Link href="/transactions" className="btn btn-primary text-white">Add Transaction</Link>
                </div>
                  <div className={`${transactions ? '' : 'hidden'}`}>
                    {/* {latestTransaction ? `${latestTransaction.title} :  ${latestTransaction.amount}` : 'No Transaction Found yet'}  */}

                    <div>
                     {transactions?.map((transaction) =>(
                      <div className="bg-slate-500 mt-4 rounded-full text-white p-4" key={transaction.id}>{transaction.title} :{transaction.amount}</div>
                     ))}
                    </div>
                  </div>
              </div>
              </div>
            

              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
    </HydrateClient>
  );
}
