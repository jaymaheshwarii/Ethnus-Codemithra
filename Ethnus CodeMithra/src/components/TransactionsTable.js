import React, { useState } from 'react';

function TransactionsTable({ transactions }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = transactions.transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.price.toString().includes(search)
  );

  const pageCount = Math.ceil(filteredTransactions.length / 10);

  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>${t.price.toFixed(2)}</td>
              <td>{t.category}</td>
              <td>{t.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(t.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} / {pageCount}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionsTable;