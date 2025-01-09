import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { axiosInstance } from '../axiox/axiosInstance';
import { H } from 'highlight.run';


function TanstackPage() {

    const [pageNumber,setPageNumber] = useState(0);
    // Define the API call function
    const getData = async (pageNumber) => {
        const res = await axiosInstance.get(`/photos?_limit=3&_start=${pageNumber}`);
        return res.data;
    };



    const queryClient = useQueryClient(); // Get the queryClient instance
    // Use React Query's useQuery hook
    const { isLoading, isError, data:salim, error } = useQuery({
        queryKey: ['products',pageNumber],
        queryFn: ()=>getData(pageNumber),
        // staleTime:100,
        placeholderData:keepPreviousData,
        // refetchIntervalInBackground: true, 
        // refetchInterval:2000
    });


    const deletePost=async(id)=>{
        return await axiosInstance.delete(`/photos/${id}`);
    } 
    const updatePost=async(id)=>{
        return await axiosInstance.patch(`/photos/${id}`,{title:"salim khan"});
    } 
    
    
    const deleteFunction=useMutation({
        mutationKey: 'products',
        mutationFn:(id)=>deletePost(id) ,
        onSuccess: (data,id) => {
            queryClient.setQueryData(['products', pageNumber], (oldData) => {
                return oldData.filter((post)=> post.id!==id);
            });
        },
        onError: (error) => {
            console.error('Error during deletion:', error);
        },
    })
    

    const updateFunction=useMutation({
        mutationKey: 'products',
        mutationFn:(id)=>updatePost(id) ,
        onSuccess: (updateData,id) => {
            queryClient.setQueryData(['products', pageNumber], (oldData) => {
                return oldData.map((post)=>{
                    if(post.id===id) return {...post,title:updateData.data.title};                    return post;
                })
            });
        },
        onError: (error) => {
            console.error('Error during deletion:', error);
        },
    })
 

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
                     <button  onClick={()=>deleteFunction.mutate(item.id)} className={' mx-4 cursor-pointer px-4 py-1  my-1 bg-green-500 font-semibold rounded text-white'}>delete</button>
                     <button  onClick={()=>updateFunction.mutate(item.id)} className={'cursor-pointer px-4 py-1  my-1 bg-green-500 font-semibold rounded text-white'}>Update</button>
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
