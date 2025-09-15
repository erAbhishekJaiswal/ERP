import React, { useEffect,useState } from 'react'
import axios from 'axios'
import '../../CSSfolder/CommonCSS/allfile.css'
import apiClient from '../../services/axios';

const Featureone = () => {
    const [users, setUsers] = useState();
    const token = localStorage.getItem('token');
    useEffect( () => {
        feature();
      }, [token]);
    const feature = async () => {

        await apiClient.get('/api/features/feature-one', {
            // Include the Authorization header with the token in the request
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            console.log(response.data);
            setUsers(response.data.message);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  return (
    <div className='allcontainer'>
      <h1>Feature One</h1>
      <p>This is feature one</p>
      <p>{users}</p>
    </div>
  )
}

export default Featureone
