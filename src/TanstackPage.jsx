import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { axiosInstance } from './axiox/axiosInstance';


function TanstackPage() {

    const [pageNumber,setPageNumber] = useState(0);
    // Define the API call function
    const getData = async (pageNumber) => {
        const res = await axiosInstance.get(`/photos?_limit=3&_start=${pageNumber}`);
        return res.data;
    };

    // Use React Query's useQuery hook
    const { isLoading, isError, data:salim, error } = useQuery({
        queryKey: ['products',pageNumber],
        queryFn: ()=>getData(pageNumber),
        staleTime:2000,
        placeholderData:keepPreviousData,
        // refetchIntervalInBackground: true, 
        // refetchInterval:2000
    });

    // Debugging: Log values to understand what's happening
    console.log("Loading:", isLoading);
    console.log("Error:", error);
    console.log("Data:", salim);

    // Conditional rendering based on query state
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

    return (
        <div className='w-full  flex flex-col justify-center items-center  '>
            <h1>TanstackPage</h1>
        
                {salim.map((item) => (
                    <div key={item.id} className="border px-2 w-1/2 py-5 my-3 shadow-md ">
                     <ul>
                    <Link to={`/view/${item.id}`}>
                    <li >{item.id}</li>
                   </Link>
                        
                     </ul>
                     <p>{item.title}</p>
                    </div>
                ))}
          
          <div className='flex items-center '>
            <button disabled={pageNumber<=1 && true} onClick={()=>setPageNumber((prev)=>prev-3)} className={'cursor-pointer px-4 py-2 bg-rose-500 font-semibold rounded text-white'}>Prev</button>
            <p className='mx-4 '>{(pageNumber/3)+1}</p>
            <button onClick={()=>setPageNumber((prev)=>prev+3)} className=' cursor-pointer px-4 py-2 bg-rose-500 font-semibold rounded text-white'>Next</button>
          </div>
        </div>
    );
}

export default TanstackPage;
