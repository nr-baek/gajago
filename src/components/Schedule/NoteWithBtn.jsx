import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { StyledModalContents } from './styles';

function NoteWithBtn({ children, onClickClose, onClickEdit, onClickDel }) {
  return (
    <StyledModalContents>
      <Scrollbars autoHide>
        <div className="contentsWrapper">{children}</div>
      </Scrollbars>
      <button className="closeBtn" onClick={onClickClose}>
        X 닫기
      </button>
      <div className="btnWrapper">
        <button className="editBtn" onClick={onClickEdit}>
          <EditOutlined style={{ verticalAlign: 'middle' }} /> 수정하기
        </button>
        <button className="delBtn" onClick={onClickDel}>
          <DeleteOutlined style={{ verticalAlign: 'middle' }} /> 삭제하기
        </button>
      </div>
    </StyledModalContents>
  );
}

export default NoteWithBtn;
