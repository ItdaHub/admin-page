import { useEffect, useMemo, useState } from "react";
import { Button, Select, Table } from "antd";
import { UserManageStyled } from "./styled";
import clsx from "clsx";
import api from "@/utill/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
const sample = [
  {
    id: 1,
    email: "test@email",
    user: "마루",
    phone: "010-1111-1111",
    noti: 6,
    status: "stop",
    createdAt: "2024-11-03",
    popcornCount: 1245,
  },
  {
    id: 2,
    email: "test11@email",
    user: "강쥐",
    phone: "010-2222-2222",
    noti: 3,
    status: "run",
    createdAt: "2024-11-02",
    popcornCount: 120,
  },
  {
    id: 3,
    email: "test2@email",
    user: "초코",
    phone: "010-2333-2222",
    noti: 1,
    status: "run",
    createdAt: "2024-11-01",
    popcornCount: 12,
  },
];
const UserManage = () => {
  const [userOrder, setUserOrder] = useState("DESC");
  const [notiOrder, setNotiOrder] = useState("DESC");
  const [potinOrder, setPointOrder] = useState("DESC");
  const [sortKey, setSortKey] = useState("user");
  const [users, setUsers] = useState<any[]>([]);
  const [sortedUsers, setSortedUsers] = useState<any[]>([]);
  const router = useRouter();

  const getUserList = async () => {
    try {
      // 유저 정보를 불러오는 axios요청
      // const res = await api.get("/manage/users");
      // const data = res.data;

      // const mapped = data.map((x: any) => ({
      //   key: x.id,
      //   email: x.email,
      //   user: x.name,
      //   phone: x.phone,
      //   noti: x.reportCount,
      //   status:
      //     x.status === "stop" ? (
      //       <div className="stop">정지</div>
      //     ) : (
      //       <div className="run">사용</div>
      //     ),
      //   joinedDate: x.joinedDate, // 가입한 날짜
      //   popcorn: x.popcornCount, // 구매한 팝콘 수
      // }));

      // setUsers(mapped);
      setUsers(sample);
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

    if (sortKey === "user") {
      sorted.sort((a, b) =>
        userOrder === "DESC"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortKey === "noti") {
      sorted.sort((a, b) =>
        notiOrder === "DESC" ? b.noti - a.noti : a.noti - b.noti
      );
    } else if (sortKey === "popcorn") {
      sorted.sort((a, b) =>
        potinOrder === "DESC"
          ? b.popcornCount - a.popcornCount
          : a.popcornCount - b.popcornCount
      );
    }
    setSortedUsers(sorted);
    // setUsers(sorted);
  };

  // 유저정렬
  useEffect(() => {
    sortUsers();
  }, [userOrder, notiOrder, potinOrder, sortKey, users]);

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

    // const worksheet = XLSX.utils.json_to_sheet(excelData);
    const worksheet = XLSX.utils.json_to_sheet(sample);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "회원목록");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "회원목록.xlsx");
  };

  // 컬럼
  const col: any = [
    {
      key: "email",
      title: "아이디",
      dataIndex: "email",
    },
    {
      key: "user",
      title: "이름",
      dataIndex: "user",
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
    },
    {
      key: "status",
      title: "상태",
      dataIndex: "status",
    },
    {
      key: "setting",
      title: "관리",
      render: (data: any) => {
        console.log(data, "asd");
        return (
          <Button
            onClick={() => {
              router.push(`/memberedit/${data.id}`);
            }}
          >
            관리
          </Button>
        );
      },
    },
  ];

  const list = useMemo(() => {
    return sortedUsers.map((x: any) => ({
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
  const option3 = [
    { value: "DESC", label: "팝콘 많은순" },
    { value: "ASC", label: "팝콘 적은순" },
  ];

  return (
    <UserManageStyled className={clsx("manage-wrap")}>
      <div className="manage-title-box">
        <div className="manage-title">회원 관리</div>
        <Button
          onClick={() => {
            router.push("/memberadd");
          }}
        >
          회원추가
        </Button>
      </div>
      <div className="manage-select-box">
        <Select
          value={userOrder}
          options={option1}
          onChange={(e) => {
            setUserOrder(e);
            setSortKey("user");
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
        <Select
          value={potinOrder}
          options={option3}
          onChange={(e) => {
            setPointOrder(e);
            setSortKey("popcorn");
          }}
        />
      </div>
      <div className="manage-info">
        <div className="manage-total-num">총 {list.length}명</div>
        <Button onClick={handleDownloadExcel}>엑셀</Button>
      </div>
      <Table columns={col} dataSource={list} />
    </UserManageStyled>
  );
};
export default UserManage;
