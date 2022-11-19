/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const [debitObject, setDebitObject] = useState({
    description: "",
    amount: 0
  })
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0, 10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    })
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    props.addDebit({
      ...debitObject,
      date: (new Date()).toISOString(),
      id: Date.now()
    })
  }

  let handleChange = (e) => {
    setDebitObject({
      ...debitObject,
      [e.target.name]: e.target.value
    })
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" onChange={handleChange} />
        <input type="number" name="amount" onChange={handleChange} />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <AccountBalance accountBalance={props.accountBalance}/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Debits;