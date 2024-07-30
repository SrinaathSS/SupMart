import React, { useState } from 'react';
import './POS.css'; // Import the CSS file

function POS() {
  const [transactionType, setTransactionType] = useState('sale');
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState('');
  const [history, setHistory] = useState([]);

  const handleTransaction = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    let message = '';
    if (transactionType === 'sale') {
      message = `Sale of $${amount} processed.`;
    } else if (transactionType === 'refund') {
      message = `Refund of $${amount} processed.`;
    } else if (transactionType === 'discount') {
      message = `Discount of $${amount} applied.`;
    }

    setReceipt(message);

    // Add to transaction history
    setHistory([
      ...history,
      {
        id: Date.now(),
        type: transactionType,
        amount: parseFloat(amount),
        message
      }
    ]);

    // Reset form fields
    setAmount('');
  };

  return (
    <div className="pos-container">
      <h1>Point of Sale</h1>
      <div className="transaction-controls">
        <label>
          <input
            type="radio"
            name="transactionType"
            value="sale"
            checked={transactionType === 'sale'}
            onChange={() => setTransactionType('sale')}
          />
          Sale
        </label>
        <label>
          <input
            type="radio"
            name="transactionType"
            value="refund"
            checked={transactionType === 'refund'}
            onChange={() => setTransactionType('refund')}
          />
          Refund
        </label>
        <label>
          <input
            type="radio"
            name="transactionType"
            value="discount"
            checked={transactionType === 'discount'}
            onChange={() => setTransactionType('discount')}
          />
          Discount
        </label>
      </div>
      <div className="amount-input">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button onClick={handleTransaction}>Process</button>
      {receipt && (
        <div className="receipt">
          <h2>Receipt</h2>
          <p>{receipt}</p>
        </div>
      )}
      <div className="history">
        <h2>Transaction History</h2>
        <ul>
          {history.map(transaction => (
            <li key={transaction.id}>
              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} of ${transaction.amount}: {transaction.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default POS;
