import React from 'react'
import { Link } from 'react-router-dom'

const index = () => {
    // const name = localStorage.getItem("user");
    // console.log('User from Dashboard ', name?.firstname );
  return (
    <div style={{textAlign: 'center', fontSize: "24px", marginTop: '40px'}}>
      <h1>Welcome to the User Dashboard</h1>
      <Link to='/'>Go Back Home</Link>
    </div>
  )
}

export default index
