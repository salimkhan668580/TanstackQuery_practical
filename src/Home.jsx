import React from 'react'
import useCounter from './CustomHooks/UseCounter'

import axios from 'axios'

function Home({count}) {
 
  return (
    <div>
        <p>Second Page</p>
        <h1>Count: {count}</h1>
    </div>
  )
}

export default Home


