import styled from "styled-components";

export const MemberAddStyled = styled.div`
  &.add-wrap {
    padding: 24px;

    .add-box {
      margin: 10px 0 15px 0;
      .ant-input,
      .ant-btn {
        margin-top: 3px;
      }
      .add-status {
        margin-right: 20px;
      }
    }

    .error-message {
      font-size: 12px;
      color: red;
    }
    .green-text {
      color: green;
    }
    .red-text {
      color: red;
    }
  }
`;
