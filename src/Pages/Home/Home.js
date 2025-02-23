import "./home.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import Analytics from "./Analytics";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";

const Home = () => {
  // ... existing imports and initial state ...

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('userBudget');
    return savedBudget ? parseInt(savedBudget) : 0;
  });

  // Add this new function for CSV export
  const handleExport = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export", toastOptions);
      return;
    }

    const csvContent = [
      ['Title', 'Amount', 'Category', 'Type', 'Date', 'Description'],
      ...transactions.map(transaction => [
        `"${transaction.title}"`,
        transaction.amount,
        transaction.category,
        transaction.transactionType,
        new Date(transaction.date).toLocaleDateString(),
        `"${transaction.description}"`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add budget input to the form
  const handleBudgetChange = (e) => {
    const value = Math.max(0, e.target.value);
    setBudget(value);
    localStorage.setItem('userBudget', value);
  };

  // Modify the filterRow section to include budget input
  // Inside the return statement, update the filterRow div:
  <div className="filterRow">
    {/* Existing filter components... */}
    
    <div className="text-white">
      <Form.Group className="mb-3" controlId="formBudget">
        <Form.Label>Monthly Budget</Form.Label>
        <Form.Control
          className="budgetInput"
          type="number"
          placeholder="Set budget"
          value={budget}
          onChange={handleBudgetChange}
          min="0"
        />
      </Form.Group>
    </div>

    {/* Rest of the existing filter components... */}
  </div>

  // Update the containerBtn section to include export button
  <div className="containerBtn">
    <Button variant="primary" onClick={handleReset}>
      Reset Filter
    </Button>
    <Button variant="success" onClick={handleExport} className="exportBtn">
      Export to CSV
    </Button>
  </div>

  // Update the Analytics component usage
  {view === "table" ? (
    <>
      <TableData data={transactions} user={cUser} />
    </>
  ) : (
    <>
      <Analytics transactions={transactions} user={cUser} budget={budget} />
    </>
  )}
