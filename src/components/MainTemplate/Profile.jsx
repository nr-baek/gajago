import React, { useCallback, useRef, useState } from 'react';
import Compressor from 'compressorjs';
import Dropdown from 'react-bootstrap/Dropdown';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref, update } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setPhotoURL } from '../../redux/actions/user_action';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const trophy = useSelector((state) => state.user.trophyInfo.isOwner);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const inputOpenImageRef = useRef();

  const auth = getAuth();
  const storage = getStorage();
  const storageRef = user && strRef(storage, `user_image/${user.uid}`);

  const handleOpenImageRef = useCallback(() => {
    inputOpenImageRef.current.click();
  }, []);

  const handleUploadImage = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (file) {
        setLoading(true);
        const metadata = { contentType: file.type };
        new Compressor(file, {
          maxWidth: 300,
          maxHeight: 300,
          minWidth: 120,
          minHeight: 120,
          quality: 0.8,
          success: async (result) => {
            try {
              await uploadBytes(storageRef, result, metadata);
              const downloadURL = await getDownloadURL(storageRef);
              await updateProfile(auth.currentUser, {
                photoURL: downloadURL,
              });
              await update(ref(getDatabase(), `userList/${user.uid}`), {
                image: downloadURL,
              });
              dispatch(setPhotoURL(downloadURL));
              setLoading(false);
            } catch (e) {
              setLoading(false);
              console.log(e);
            }
          },
          error(err) {
            setLoading(false);
            console.log(err.message);
          },
        });
      }
    },
    [storageRef, auth.currentUser, dispatch, user],
  );

  return (
    <div className="profile">
      <div className="imgBox">
        <img src={user && user.photoURL} alt={user && user.displayName} />
        <div className={`changing ${loading ? 'show' : ''}`}>변경중...</div>
      </div>

      <div className="dropDownBox">
        <Dropdown>
          <Dropdown.Toggle style={{ background: 'transparent', border: '0px' }} id="dropdown-basic">
            {trophy && '🏆 '}
            <span className="nickname">{user && user.displayName}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={handleUploadImage}
        ref={inputOpenImageRef}
        type="file"
        accept="image/jpeg, image/png"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Profile;
