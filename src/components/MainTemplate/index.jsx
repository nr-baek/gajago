import { LogoutOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import Navigation from './Navigation';
import Profile from './Profile';
import { Background, Container, LeftBar, LeftBarBtn, MainContent } from './styles';

const CommonTemplate = ({ children }) => {
  return (
    <Background>
      <Container>
        <LeftBar>
          <Profile />
          <Navigation />
          <LeftBarBtn className="logoutBtn">
            <LogoutOutlined />
            <span>Logout</span>
          </LeftBarBtn>
        </LeftBar>
        <MainContent>{children}</MainContent>
      </Container>
    </Background>
  );
};

export default CommonTemplate;
