import { useEffect, useMemo, useState } from "react";
import { Button, Select, Table } from "antd";
import { UserManageStyled } from "./styled";
import clsx from "clsx";
import api from "@/utill/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

const UserManage = () => {
  const [userOrder, setUserOrder] = useState("DESC");
  const [notiOrder, setNotiOrder] = useState("DESC");
  const [sortKey, setSortKey] = useState("createdAt"); // 기본 정렬 키를 'createdAt'으로 변경
  const [users, setUsers] = useState<any[]>([]);
  const [sortedUsers, setSortedUsers] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const getUserList = async () => {
    try {
      // 유저 정보를 불러오는 axios 요청
      const res = await api.get("/users");
      const data = res.data;

      const mapped = data.map((x: any) => ({
        key: x.id,
        id: x.id,
        email: x.email,
        user: x.name || x.nickname || "이름 없음", // 이름 또는 닉네임 사용, 없으면 기본값
        phone: x.phone || "전화번호 없음",
        noti: x.reportCount || 0,
        status:
          x.status === "stop" ? (
            <div className="stop">정지</div>
          ) : (
            <div className="run">사용</div>
          ),
        createdAt: x.joinedDate || x.createdAt, // 가입 날짜 필드명 확인
        popcornCount: x.popcornCount || 0, // 팝콘 수 필드명 확인
      }));

      setUsers(mapped);
    } catch (err) {
      console.error("유저 불러오기 실패", err);
    }
  };

  // 유저정보
  useEffect(() => {
    getUserList();
  }, []);

  // 유저 정렬하기
  const sortUsers = () => {
    let sorted = [...users];

    if (sortKey === "createdAt") {
      sorted.sort((a, b) =>
        userOrder === "DESC"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortKey === "noti") {
      sorted.sort((a, b) =>
        notiOrder === "DESC" ? b.noti - a.noti : a.noti - b.noti
      );
    } else if (sortKey === "user") {
      sorted.sort((a, b) => {
        const nameA = a.user.toLowerCase();
        const nameB = b.user.toLowerCase();
        return userOrder === "ASC"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    }
    setSortedUsers(sorted);
  };

  // 유저정렬
  useEffect(() => {
    sortUsers();
  }, [userOrder, notiOrder, sortKey, users]);

  // 엑셀 다운로드
  const handleDownloadExcel = () => {
    const excelData = users.map((user) => ({
      순서: user.id,
      아이디: user.email,
      이름: user.user,
      전화번호: user.phone,
      신고횟수: user.noti,
      팝콘수: user.popcornCount,
      가입일: user.createdAt,
      상태: user.status?.props?.children,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "회원목록");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "회원목록.xlsx");
  };

  // 회원탈퇴
  const WithdrawUser = async () => {
    if (selectedRowKeys.length === 0) {
      alert("탈퇴시킬 회원을 선택해주세요.");
      return;
    }

    try {
      //선택된 회원들 탈퇴 axios post요청
      const res = await api.post("/users/withdraw", {
        userIds: selectedRowKeys,
      });
      alert("선택한 회원을 탈퇴시켰습니다.");
      getUserList(); // 회원 목록 다시 불러오기
      setSelectedRowKeys([]); // 선택된 키 초기화
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert("회원 탈퇴에 실패했습니다. 잠시후 다시 시도해주세요.");
    }
  };

  // 테이블 rowSelection 설정
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  // 컬럼
  const col: any = [
    {
      key: "num",
      title: "번호",
      dataIndex: "num",
    },
    {
      key: "email",
      title: "아이디",
      dataIndex: "email",
    },
    {
      key: "user",
      title: "이름",
      dataIndex: "user",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      onHeaderCell: (column: any) => ({
        onClick: () => {
          setSortKey("user");
          setUserOrder(userOrder === "DESC" ? "ASC" : "DESC");
        },
      }),
    },
    {
      key: "phone",
      title: "전화번호",
      dataIndex: "phone",
    },
    {
      key: "noti",
      title: "신고 횟수",
      dataIndex: "noti",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      onHeaderCell: (column: any) => ({
        onClick: () => {
          setSortKey("noti");
          setNotiOrder(notiOrder === "DESC" ? "ASC" : "DESC");
        },
      }),
    },
    {
      key: "status",
      title: "상태",
      dataIndex: "status",
    },
    {
      key: "setting",
      title: "관리",
      render: (data: any) => (
        <Button
          onClick={() => {
            router.push(`/memberedit/${data.id}`);
          }}
        >
          관리
        </Button>
      ),
    },
  ];

  const list = useMemo(() => {
    return sortedUsers.map((x: any, i: number) => ({
      num: i + 1,
      key: x?.id,
      id: x?.id,
      email: x?.email,
      user: x?.user,
      phone: x?.phone,
      noti: x?.noti,
      status:
        x?.status === "stop" ? (
          <div className="stop">정지</div>
        ) : (
          <div className="run">사용</div>
        ),
      createdAt: x?.createdAt, // 가입 날짜 포함
      popcornCount: x?.popcornCount, // 팝콘 수 포함
    }));
  }, [sortedUsers]);

  const option1 = [
    { value: "DESC", label: "최신순" },
    { value: "ASC", label: "오래된순" },
  ];
  const option2 = [
    { value: "DESC", label: "신고 많은순" },
    { value: "ASC", label: "신고 적은순" },
  ];

  return (
    <UserManageStyled className={clsx("manage-wrap")}>
      <div className="manage-title-box">
        <div className="manage-title">회원 관리</div>
        <div>
          <Button
            onClick={() => {
              router.push("/memberadd");
            }}
          >
            회원추가
          </Button>
          <Button className="manage-delete-button" onClick={WithdrawUser}>
            회원탈퇴
          </Button>
        </div>
      </div>
      <div className="manage-select-box">
        <Select
          value={userOrder}
          options={option1}
          onChange={(e) => {
            setUserOrder(e);
            setSortKey("createdAt"); // 최신순/오래된순 정렬 기준을 가입일로 변경
          }}
        />
        <Select
          value={notiOrder}
          options={option2}
          onChange={(e) => {
            setNotiOrder(e);
            setSortKey("noti");
          }}
        />
      </div>
      <div className="manage-info">
        <div className="manage-total-num">총 {list.length}명</div>
        <Button onClick={handleDownloadExcel}>엑셀</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={col}
        dataSource={list}
        rowKey="id"
      />
    </UserManageStyled>
  );
};
export default UserManage;
