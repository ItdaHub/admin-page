import styled from "styled-components";

export const MemberAddStyled = styled.div`
  &.add-wrap {
    .add-title {
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
    .add-box {
      margin: 10px 0;
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
