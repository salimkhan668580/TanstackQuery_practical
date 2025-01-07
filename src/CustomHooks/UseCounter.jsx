import React, { useState } from 'react'

function UseCounter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return [count, increment, decrement];
 
}

export default UseCounter