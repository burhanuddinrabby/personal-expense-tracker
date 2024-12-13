import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { categoryIcon, expenseCatIcon } from "../../utils/utilities";
import { dollar } from "../../utils/Icons";
const style1 = {
  backgroundColor: "#fff",
  padding: "20px",
  paddingLeft: "25px",
  margin: "auto",
  marginTop: "20px",
  marginBottom: "20px",
  color: "black",
  maxWidth: "90%",
  borderRadius: "20px",
};
const style2 = {
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
};
const Transaction = () => {
  const { transactionHistory } = useGlobalContext();
  const arr = transactionHistory();
  // console.log(arr);
  return (
    <div className="outer">
      <h1 style={{ textAlign: "center", margin: "30px" }}>All Transactions</h1>
      {arr.map((transaction) => {
        const { title, amount, date, category, description, type } =
          transaction;
        const formattedDate = new Date(date).toDateString();
        // console.log(formattedDate);
        return (
          <div style={style1} key={arr.indexOf(transaction)}>
            <span style={{ color: `${type === "expense" ? "red" : "green"}` }}>
              <div style={style2}>
                {type === "expense"
                  ? expenseCatIcon(category)
                  : categoryIcon(category)}
                &nbsp; &nbsp;
                <p>{type}</p>
              </div>
            </span>
            <h3
              style={{
                fontSize: "1.5em",
                marginTop: "2px",
                marginBottom: "2px",
              }}
            >
              {" "}
              <b>Title: </b> {title}
            </h3>
            <p>
              Amount: <span style={{ fontSize: "0.9em" }}>{dollar}</span>{" "}
              {amount}
            </p>
            <p>Description: {description}</p>
            <p>
              Added on: <b>{formattedDate}</b>
            </p>
            <p>
              {" "}
              {type === "expense" ? "Spent in " : "Earned from "}{" "}
              <span style={{color: `${type === "expense" ? "red" : "green"}`}}>{category}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Transaction;
