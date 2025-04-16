import styled from "styled-components";

export const BannerDetailStyled = styled.div`
  &.banner-detail-wrap {
    padding: 24px;

    .detail-head {
      display: flex;
      justify-content: space-between;
    }

    .detail-box {
      margin-top: 24px;
      border-radius: 12px;
    }

    .detail-image {
      width: 100%;
      max-width: 700px;
      height: auto;
      border: 1px solid #eee;
      object-fit: contain;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 8px 0;
    }
  }
`;
