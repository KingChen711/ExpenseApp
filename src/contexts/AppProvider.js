import React, { useEffect, useState } from "react"
import { URL_BASE } from "./constants";
import axios from "axios"


export const AppContext = React.createContext()

export default function AppProvider({ children }) {
  const [year, setYear] = useState(`2023`);
  const [expenseEditingId, setExpenseEditingId] = useState();
  const [expenses, setExpenses] = useState()
  const [chartData, setChartData] = useState([{
    month: "Jan",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Feb",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Mar",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Apr",
    percentage: "0",
    amount: "0"
  },
  {
    month: "May",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Jun",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Jul",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Aug",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Sep",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Oct",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Nov",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Dec",
    percentage: "0",
    amount: "0"
  }]);


  useEffect(() => {
    async function getExpense() {
      await axios
        .get(`${URL_BASE}/api/expenses`)
        .then(res => { setExpenses(res.data.expenses) })
    }
    getExpense();
  }, [])


  //side effect update chart every time expenses or year change
  useEffect(() => {
    let amountEveryMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expenses?.forEach(expense => {
      const yearExpense = expense.date.split("-")[0]; //date have format "yyyy-MM-dd"
      if (yearExpense === year) {
        const amount = expense.amount;
        const month = Number(expense.date.split("-")[1]); //date have format "yyyy-MM-dd"
        amountEveryMonths[month - 1] += amount
      }
    })

    let maxAmount = Math.max(...amountEveryMonths);

    setChartData((prev) => {
      return prev.map((data, index) => ({
        ...data,
        amount: String(amountEveryMonths[index]),
        percentage: maxAmount !== 0 ? String(amountEveryMonths[index] / maxAmount * 100) : "0"
      }))
    })

  }, [year, expenses])



  return (
    <AppContext.Provider value={{
      year,
      setYear,
      expenses,
      setExpenses,
      chartData,
      expenseEditingId,
      setExpenseEditingId
    }}>
      {children}
    </AppContext.Provider>
  )
}

