import styled from "styled-components";

export const NoticeStyled = styled.div`
  &.notice-wrap {
    padding: 24px;

    .notice-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .notice-info {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
    }

    .notice-row {
      cursor: pointer;
    }

    .setting-button {
      display: flex;
      gap: 10px;
    }
  }
`;
