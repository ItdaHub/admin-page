import styled from "styled-components";

export const UserManageStyled = styled.div`
  &.manage-wrap {
    .manage-title-box {
      display: flex;
      justify-content: space-between;
      .manage-title {
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 10px;
      }
    }

    .manage-select-box {
      .ant-select-selector {
        margin-right: 5px;
      }
    }
    .manage-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .manage-total-num {
        font-weight: 600;
        margin: 15px 0 2px 5px;
      }
    }
    .manage-delete-button {
      margin-left: 3px;
    }
  }
`;
