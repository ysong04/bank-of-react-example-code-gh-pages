/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const [creditObject, setCreditObject] = useState({
    description: "",
    amount: 0
  })
  // Create the list of Credit items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0, 10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    })
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    props.addCredit({
      ...creditObject,
      date: (new Date()).toISOString(),
      id: Date.now()
    })
  }

  let handleChange = (e) => {
    setCreditObject({
      ...creditObject,
      [e.target.name]: e.target.value
    })
  }
  // Render the list of Credit items and a form to input new Credit item
  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" value={creditObject.description} onChange={handleChange} />
        <input type="number" name="amount" value={creditObject.amount} onChange={handleChange} />
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <AccountBalance accountBalance={props.accountBalance}/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;