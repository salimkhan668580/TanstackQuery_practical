import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { axiosInstance } from '../axiox/axiosInstance';
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';

function ScrolingPage() {
    const getData = async ({ pageParam }) => {
        const response = await axiosInstance.get(`/photos?_limit=10&_start=${pageParam}`);
        return response.data;
    };
    const {
        data: salim,
        hasNextPage,
        fetchNextPage,
        status,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({ pageParam = 1 }) => getData({ pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            // console.log("lastPage", lastPage, allPages);
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        },
    });

    console.log("map data",salim)
    const flattenedUsers = salim?.pages.flat() || [];
    console.log(" flatten map data",flattenedUsers)

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);


    if (status === 'loading') return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

    return (
        <div>
           <div className='w-full  flex flex-col justify-center items-center  '>
            <h1>TanstackPage</h1>
        
                {flattenedUsers?.map((item) => (
                    <div key={item.id} className="border px-2 w-1/2 py-5 my-3 shadow-md ">
                     <ul>
                    <Link to={`/view/${item.id}`}>
                    <li >{item.id}</li>
                   </Link>
                        
                     </ul>
                     <p>{item.title}</p>
                  
                    </div>
                ))}
          
        </div>

            <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Scroll down to load more"
                        : "No more users"}
            </div>
        </div>
    );
}

export default ScrolingPage;
