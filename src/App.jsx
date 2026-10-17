import { useState, useEffect } from "react"

function App() {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income"
  })
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions")
    if(saved){
      return JSON.parse(saved)
    }
    return []
  })
  const totals = transactions.reduce((acc, item) => {
    if(item.type==="income") {
      acc.income += item.amount
    } else {
      acc.expense += item.amount
    }
    return acc
  }, {income: 0, expense: 0})
  const netBalance = totals.income - totals.expense
  const handleChange =(e)=> {
    setForm({
      ...form,
      [e.target.name]: e.target.value
  })}
  const handleSubmit =() => {
    if(!form.title || !form.amount) {
      alert("Please enter a title and amount!")
      return
    }
    const newTransaction = {
      id: Date.now(),
      title: form.title,
      amount: Number(form.amount),
      type: form.type
    }
    setTransactions([...transactions, newTransaction])
     setForm({title: "", amount: "", type: "income" })
  }
  const handleDelete =(id)=> {
    const filteredTransactions = transactions.filter((item) => item.id !== id)
    setTransactions(filteredTransactions)
  }
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  },[transactions])
 



return(
  <div className="bg-slate-300 min-h-screen py-10">
     <div className="max-w-2xl mx-auto px-4 ">
    <div className="mb-8 grid grid-cols-3 gap-4">
    <div className="border p-4 rounded bg-green-100 text-green-700 font-bold">
      TOTAL INCOME: {totals.income}
    </div>
    <div className="border p-4 rounded bg-red-100 text-red-700 font-bold">
      TOTAL EXPENSE: {totals.expense}
    </div>
    <div className="border p-4 rounded bg-blue-100 text-blue-700 font-bold">
      NET BALANCE: {netBalance}

    </div>
    </div>
    <div className="flex w-full mb-6">
    <input className="flex-1 border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-50"
     name="title"
     type="text" 
     placeholder="Write title"
     value={form.title}
     onChange={handleChange}
     />
     <input className="flex-1 border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-50" 
     name="amount"
     type="number"
     placeholder="Write count"
     value={form.amount}
     onChange={handleChange}
      />
      <select className="flex-1 border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-50"
      name="type"
      value={form.type}
      onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button 
      className="flex-1 border border-gray-400 bg-green-50 text-blue-700 font-bold px-4 py-2 rounded"
      onClick={handleSubmit}>Add</button>
      </div>
     {transactions.map((item) => (
      <div key={item.id}
      className="flex justify-between items-center border p-3 rounded my-2 bg-white shadow-sm">
        <span className="font-medium text-gray-700">{item.title}</span>
        <div className="flex items-center gap-4">
          <span className={item.type==="income" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {item.type === "income" ? "+" : "-"} ${item.amount}
          </span>
          <button
           onClick={() => handleDelete(item.id)}
           className="text-red-500 hover:text-red-700 font-semibold cursor-pointer">
            Delete
          </button>
        </div>
      </div>
     ))}
     </div>
  </div>
)
}


export default App