import React from 'react'
import { useForm } from 'react-hook-form'

export default function FormExpense(props) {
  const { register, handleSubmit } = useForm();


  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="flex flex-col w-full">
      <label className="flex justify-between items-center my-2">
        <div className="text-white font-bold w-28">Name</div>
        <input
          defaultValue={props.defaultValues ? props.defaultValues.name : ""}
          className="flex-1 max-w-[550px] py-2 px-4 rounded-md"
          type="text"
          placeholder="Enter name here..."
          {...register("name", { required: true })}
        />
      </label>
      <label className="flex justify-between items-center my-2">
        <div className="text-white font-bold w-28">Amount</div>
        <input
          defaultValue={props.defaultValues ? props.defaultValues.amount : ""}
          className="flex-1 max-w-[550px] py-2 px-4 rounded-md"
          type="text"
          placeholder="Enter amount here..."
          {...register("amount", {
            required: true,
            valueAsNumber: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/
            },
          })}
        />
      </label>
      <label className="flex justify-between items-center my-2">
        <div className="text-white font-bold w-28">Date</div>
        <input
          defaultValue={props.defaultValues ? props.defaultValues.date : ""}
          className="flex-1 max-w-[550px] py-2 px-4 rounded-md"
          type="date"
          {...register("date", { required: true })}
        />
      </label>
      <div className="flex justify-end items-center mt-4">
        {props.children}
        <div
          className="btn bg-slate-300 text-gray-600"
          onClick={() => { props.setDisplay(false) }}>
          CANCEL
        </div>
      </div >
    </form>
  )
}


