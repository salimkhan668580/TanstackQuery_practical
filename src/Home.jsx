import React, { useEffect, useState } from 'react'
import useCounter from './CustomHooks/UseCounter'
import MediaAccess from './MediaAccess';


function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);
 
  return (
    <div className='text-center h-screen flex w-full flex-col justify-center items-center'>
      <h1>User Location</h1>
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>{error || 'Fetching location...'}</p>
      )}
      <MediaAccess/>
    </div>
  )
}

export default Home


