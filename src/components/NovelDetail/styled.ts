import styled from "styled-components";

export const NovelDetailStyled = styled.div`
  &.detail-wrap {
    padding: 24px;

    .detail-title {
      font-size: 22px;
      font-weight: 700;
    }

    .ant-table-tbody > tr:hover > td {
      background: transparent !important;
    }

    .ant-table-cell {
      width: 20px;
    }

    .detail-button {
      float: right;
      margin-top: 16px;
      .detail-publish-button {
        margin-right: 3px;
      }
    }

    .submitOn {
      display: none;
    }
  }
`;
