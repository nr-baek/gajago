import { ScheduleOutlined } from "@ant-design/icons";
import { TemplateLeftBox } from "./styles";

export const TemplateLeft = () => {
  return (
    <TemplateLeftBox>
      <ScheduleOutlined className="logo" />
      <span className="hiMsg">Hi, Traveler</span>
      <span className="goMsg">Let's go anywhere!</span>
      <span className="gajago">&copy;GAJAGO</span>
    </TemplateLeftBox>
  );
};
