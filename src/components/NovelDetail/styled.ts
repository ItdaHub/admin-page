import styled from "styled-components";

export const NovelDetailStyled = styled.div`
  &.detail-wrap {
    padding: 24px;
    ul {
      list-style: none;
    }
    li {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      div {
        padding: 0 10px;
      }
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
