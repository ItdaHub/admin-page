import styled from "styled-components";

export const ReportDetailStyled = styled.div`
  &.reportdetail-wrap {
    max-width: 600px;
    margin: 60px auto;
    padding: 32px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    font-family: "Pretendard", sans-serif;

    .header {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #111;
      display: flex;
      justify-content: center;
    }

    .row {
      margin-bottom: 20px;

      .label {
        font-size: 13px;
        font-weight: 500;
        color: #888;
        margin-bottom: 6px;
      }

      .value {
        font-size: 15px;
        color: #222;
        padding: 12px 14px;
        border: 1px solid #eee;
        border-radius: 8px;
        background-color: #f9f9fb;
        white-space: pre-wrap;
      }
    }

    .delete-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;

      button {
        background-color: #ff4d4f;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #d9363e;
        }
      }
    }
  }
`;
