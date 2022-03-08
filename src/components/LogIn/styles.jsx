import styled from '@emotion/styled';

export const StyledButton = styled.button`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  background-color: #bb97ff;
  padding: 0.8rem 2.2rem;
  margin: 10px 0 0 0;
  border: 0;
  border-radius: 4px;
  float: right;
  &:hover {
    background-color: #7c4dff;
  }

  &[disabled] {
    background-color: #c0c0c0;
  }
`;

export const SignUpButton = styled.button`
  color: #8a60fd;
  background-color: #f1ecff;
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  border: 2px solid #dfd2ff;
  border-radius: 4px;
  margin-top: 50px;

  &:hover {
    color: #6e39ff;
    background-color: #eae2ff;
    border: 2px solid #ad8dff;
  }
`;

export const Message = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  height: 23px;
  margin-top: 5px;

  span {
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
    width: 100%;
  }

  .error {
    color: #ce0000;
  }
  .success {
    color: #007c00;
  }
`;
