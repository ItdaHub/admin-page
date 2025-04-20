import styled from "styled-components";

export const NoticeDetailStyled = styled.div`
  &.notice-detail-wrap {
    padding: 24px;

    .notice-detail-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .detail-info {
      display: flex;
      gap: 15px;
      margin: 10px 0;
    }

    .content-box {
      height: 400px; /* 최대 높이 설정 */
      overflow-y: auto; /* 내용이 넘칠 경우 스크롤바가 생기도록 설정 */
      padding: 10px;
      margin: 10px 0;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
  }
`;
