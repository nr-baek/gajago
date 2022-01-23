import { MehOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { EmptyMessage } from './styles';

function EmptyTripList() {
  return (
    <EmptyMessage>
      <p className="empty">텅</p>
      <p className="msg">
        <MehOutlined />
        등록된 여행 일정이 없습니다.
      </p>
    </EmptyMessage>
  );
}

export default EmptyTripList;
