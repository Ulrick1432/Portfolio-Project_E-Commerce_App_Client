import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/userAuth';

const Orders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const user = await getUser();
        if (!user.success) {
          console.log('User is not allowed in Orders if not logged in');
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking user authentication", error);
      }
    }

    checkUserAuthentication();
  }, []);

  return (
    <div className="OrdersPage">
      <h2>This is the history of your orders</h2>
      <h3>Dammit I'm not programmed to show it to you yet... :D</h3>
    </div>
  );
};

export default Orders;