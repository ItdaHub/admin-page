import styled from "styled-components";

export const ReportDetailStyled = styled.div`
  &.reportdetail-wrap {
    max-width: 1000px;
    margin: 40px auto;
    padding: 40px 60px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: none;
    border: 1px solid #e5e5e5;
    font-family: "Pretendard", sans-serif;

    .header {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 32px;
      color: #111;
      border-bottom: 2px solid #eee;
      padding-bottom: 12px;
      display: flex;
      justify-content: center;
    }

    .row {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .label {
        width: 180px;
        font-size: 14px;
        font-weight: 500;
        color: #555;
      }

      .value {
        flex: 1;
        font-size: 15px;
        color: #222;
        padding: 10px 14px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #fafafa;
        white-space: pre-wrap;
      }
    }

    .report-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      gap: 10px;

      button {
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .add {
        background-color: #1677ff;
        &:hover {
          background-color: #155ec5;
        }
      }

      .remove {
        background-color: #ff4d4f;
        &:hover {
          background-color: #d9363e;
        }
      }
    }
  }
`;
