import styled from "styled-components";

export const NovelDetailStyled = styled.div`
  &.detail-wrap {
    padding: 24px;

    .ant-table-tbody > tr:hover > td {
      background: transparent !important;
    }

    .detail-box {
      display: grid;
      grid-template-columns: 1fr 4fr 3fr 2fr;
      align-items: center;
      .detail-content {
        white-space: pre-wrap;
      }
    }

    .detail-button {
      float: right;
      .detail-publish-button {
        margin-right: 3px;
      }
    }
  }
`;
