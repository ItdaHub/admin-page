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
  }
`;
