import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/table/data-table'
import { Payment, columns } from '@/components/table/columns'

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "processing",
      email: "a@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "b@example.com",
    },
  ]
}

export default function Dashboard() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 text-center">
        Bienvenido Gabo Mmgvo
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}