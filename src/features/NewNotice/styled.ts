import styled from "styled-components";

export const NewNoticeStyled = styled.div`
  &.newNotice-wrap {
    padding: 24px;

    .newNotice-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .newNotice-title {
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 10px;
      }
    }

    .form-item {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      .form-label {
        margin-bottom: 10px;
      }
      .form-error {
        color: red;
        font-size: 14px;
      }

      .ant-input {
        padding: 14px;
      }
    }
  }
`;
