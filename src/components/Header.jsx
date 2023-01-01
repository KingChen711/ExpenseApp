import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppProvider';
import { v4 as uuid } from 'uuid';
import FormExpense from './FormExpense';
import { URL_BASE } from '../contexts/constants';
import axios from 'axios';

export default function Header() {
  const [isAdding, setIsAdding] = useState(false);
  const { setExpenses } = useContext(AppContext);


  function handleSubmit(data) {
    setIsAdding(false)
    const { name, date, amount } = data;
    setExpenses((prev) => ([
      ...prev,
      {
        _id: uuid(),
        name,
        date,
        amount: Number(amount)
      }
    ]))
    axios.post(`${URL_BASE}/api/expenses`, {
      name,
      date,
      amount: Number(amount)
    })
  }

  return (
    <div className="w-[500px] md:w-[800px] py-6 px-8 bg-purple-primary rounded-md mx-auto max-w-[90%] flex justify-center items-center mt-8">
      {
        isAdding ?
          <FormExpense
            setDisplay={setIsAdding}
            onSubmit={handleSubmit}>
            <button
              type='submit'
              className="btn bg-purple-secondary text-white mr-4">
              ADD
            </button>
          </FormExpense>
          :
          <div
            className="btn bg-purple-secondary text-white min-w-[220px]"
            onClick={() => { setIsAdding(true) }}>
            ADD NEW EXPENSE
          </div>
      }
    </div>
  )
}

