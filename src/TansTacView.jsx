import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from './axiox/axiosInstance';

function TansTacView() {
 const {id}=useParams();


//  https://jsonplaceholder.typicode.com/comments?_limit=10&_start=3
    const {data,isLoading,isError,error}=useQuery({
        queryKey: ['product',id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/products/${id}`)
            return response
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;
  return (

    <div>
     <h1>{data?.title}</h1>
     </div>
  )
}

export default TansTacView