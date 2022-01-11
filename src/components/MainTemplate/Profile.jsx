import { CaretDownOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="profile">
      <img src={user && user.photoURL} alt={user && user.displayName} />
      {/* <p className="img"></p> */}
      <p className="nickname">
        {user && user.displayName}
        <CaretDownOutlined />
      </p>
    </div>
  );
};

export default Profile;
