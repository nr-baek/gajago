import { LogoutOutlined } from '@ant-design/icons/lib/icons';
import React, { useCallback } from 'react';
import Navigation from './Navigation';
import Profile from './Profile';
import { Background, Container, LeftBar, LeftBarBtn, MainContent } from './styles';
import { getAuth, signOut } from 'firebase/auth';

const MainTemplate = ({ children }) => {
  const auth = getAuth();

  const onClickLogout = useCallback(() => {
    signOut(auth);
  }, [auth]);

  return (
    <Background>
      <Container>
        <LeftBar>
          <Profile />
          <Navigation />
          <LeftBarBtn className="logoutBtn" onClick={onClickLogout}>
            <LogoutOutlined />
            <span>Logout</span>
          </LeftBarBtn>
        </LeftBar>
        <MainContent>{children}</MainContent>
      </Container>
    </Background>
  );
};

export default MainTemplate;
