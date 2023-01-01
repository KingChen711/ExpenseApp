import axios from 'axios';
import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider';
import { URL_BASE } from '../contexts/constants';
import FormExpense from './FormExpense';

export default function EditExpenseScreen(props) {
  const {
    expenses,
    setExpenses,
    expenseEditingId
  } = useContext(AppContext);


  function handleSubmit(data) {
    props.setIsEditing(false)
    const { name, amount, date } = data;
    setExpenses((prev) => prev.map((expense) => {
      if (expense._id !== expenseEditingId)
        return expense;
      return {
        _id: expenseEditingId,
        name,
        amount: Number(amount),
        date
      }
    }))

    axios.put(`${URL_BASE}/api/expenses/${expenseEditingId}`, {
      name,
      amount: Number(amount),
      date
    })
  }


  function getDefaultValues() {
    const foundExpense = expenses.find(expense => expense._id === expenseEditingId);
    return {
      name: foundExpense.name,
      amount: foundExpense.amount,
      date: foundExpense.date
    }
  }


  return (
    <div className="fixed top-0 z-30 bg-[#ffffff80] w-screen h-screen flex justify-center items-center">
      <div className="w-[300px] md:w-[600px] py-6 px-8 bg-purple-primary rounded-md max-w-[90%] flex justify-center items-center mt-8 -translate-x-2">
        <FormExpense
          defaultValues={getDefaultValues()}
          setDisplay={props.setIsEditing}
          onSubmit={handleSubmit}>
          <button
            type="submit"
            className="btn bg-purple-secondary text-white mr-4">
            SAVE
          </button>
        </FormExpense>
      </div>
    </div >
  )
}
