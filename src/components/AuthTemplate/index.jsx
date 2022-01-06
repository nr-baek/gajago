import React from "react";
import { AuthTemplateBlock, TemplateBox, TemplateRight } from "./styles";
import { TemplateLeft } from "./TemplateLeft";

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <TemplateBox>
        <TemplateLeft />
        <TemplateRight>{children}</TemplateRight>
      </TemplateBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
