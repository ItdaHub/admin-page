import styled from "styled-components";

export const NoticeStyled = styled.div`
  &.notice-wrap {
    padding: 24px;

    .notice-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .notice-title {
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 10px;
      }
    }
  }
`;
