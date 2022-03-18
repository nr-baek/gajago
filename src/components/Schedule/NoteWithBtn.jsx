import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { StyledModalContents } from './styles';

function NoteWithBtn({ children, onClickClose, onClickEdit, onClickDel, editable }) {
  return (
    <StyledModalContents>
      <Scrollbars autoHide>
        <div className="contentsWrapper">{children}</div>
      </Scrollbars>
      {editable && (
        <div className="btnWrapper">
          <button className="editBtn" onClick={onClickEdit}>
            <EditOutlined style={{ verticalAlign: 'middle' }} /> 수정
          </button>
          <button className="delBtn" onClick={onClickDel}>
            <DeleteOutlined style={{ verticalAlign: 'middle' }} /> 삭제
          </button>
        </div>
      )}
      <button className="closeBtn" onClick={onClickClose}>
        X 닫기
      </button>
    </StyledModalContents>
  );
}

export default NoteWithBtn;
