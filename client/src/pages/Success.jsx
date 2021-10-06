// import { useEffect } from 'react';
// import { useLocation } from 'react-router';
// import { userRequest } from '../requestMethods';
import { Link } from 'react-router-dom';
export const Success = () => {
  // const location = useLocation();
  // const data = location.state.data;

  //TODO
  //Create an order

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Successfull. Your order is being prepared...
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};
