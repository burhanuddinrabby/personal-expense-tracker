/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react"
import axios from 'axios'


// eslint-disable-next-line eqeqeq
const BASE_URL =
  process.env.MOOD == "DEV"
    ? "http://localhost:8080/"
    : "https://pextracker-backend.onrender.com/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(`${BASE_URL}add-income`, income);
        getIncomes();
        // const response = await fetch("http://localhost:8080/add-income", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(income),
        // });
        // console.log(response);

        // let id;
        // const prv = JSON.parse(localStorage.getItem('incomes'))
        // if(prv?.length > 0){
        //     id = prv[prv.length - 1].id + 1
        // }else{
        //     id = 1
        // }
        // income.id = id;
        // try {
        //     localStorage.setItem('incomes', JSON.stringify([...prv, income]))
        // } catch (error) {
        //     // eslint-disable-next-line eqeqeq
        //     if (error.message == "prv is not iterable") {
        //       localStorage.setItem("incomes", JSON.stringify([income]));
        //     }
        // }
        //     // .catch((err) =>{
        //     //     setError(err.response.data.message)
        //     // })
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response?.data);
        // setIncomes(JSON.parse(localStorage.getItem('incomes')));
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`);
        // const a = JSON.parse(localStorage.getItem("incomes"));
        // const b = [];
        // for (let i = 0; i < a.length; i++) {
        //   if (a[i].id == id) {
        //     continue;
        //   }
        //   b.push(a[i]);
        // }
        // localStorage.setItem("incomes", JSON.stringify(b));
        getIncomes();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes?.forEach((income) =>{
            totalIncome = totalIncome + parseInt(income.amount);
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)

        // const response = await fetch("http://localhost:8080/add-expense", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(expense),
        // });
        // console.log(response);
        // let id;
        // const prv = JSON.parse(localStorage.getItem("expenses"));
        // if (prv?.length > 0) {
        //   id = prv[prv.length - 1].id + 1;
        // } else {
        //   id = 1;
        // }
        // income.id = id;

        // try {
        //   localStorage.setItem("expenses", JSON.stringify([...prv, income]));
        // } catch (error) {
        //   // eslint-disable-next-line eqeqeq
        //   if (error.message == "prv is not iterable") {
        //     localStorage.setItem("expenses", JSON.stringify([income]));
        //   }
        // }
        // // const response = localStorage.setItem('expenses', income)
        //     // .catch((err) =>{
        //     //     setError(err.response.data.message)
        //     // })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response?.data)
        // setExpenses(JSON.parse(localStorage.getItem("expenses")));
        
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        // const res  = localStorage.removeItem('expenses')
        // const a = JSON.parse(localStorage.getItem("expenses"));
        // const b = [];
        // for (let i = 0; i < a.length; i++) {
        //   if (a[i].id == id) {
        //     continue;
        //   }
        //   b.push(a[i]);
        // }
        // localStorage.setItem("expenses", JSON.stringify(b));
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses?.forEach((expense) =>{
            totalExpenses = totalExpenses + parseInt(expense.amount);
        })

        return totalExpenses;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

        // return history.slice(0, 3)
        return history;
        // return [];
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}