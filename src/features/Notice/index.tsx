// pages/notice-manage.tsx
import { useState } from "react";
import { Table, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NoticeStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";
import api from "@/utill/api";
import TitleCompo from "@/components/TitleCompo";

interface Notice {
  id: string;
  number: number;
  title: string;
  author: string;
  created_at: string;
  content: string;
}

const data: Notice[] = [
  {
    id: "1",
    number: 1,
    title: "2024년도 출판 안내",
    author: "권예은",
    created_at: "2018.05.04 14:16",
    content: "2024년 출판 계획에 대한 안내입니다...",
  },
  {
    id: "2",
    number: 2,
    title: "4월 서비스점검 작업 안내",
    author: "박정은",
    created_at: "2018.04.20 15:31",
    content: "4월 중 서비스 점검이 예정되어 있습니다...",
  },
  {
    id: "3",
    number: 3,
    title: "웹메일 장애복구와 사과의 말씀",
    author: "손은비",
    created_at: "2018.05.04 14:40",
    content: "웹메일 장애에 대해 사과드리며 복구를 완료했습니다...",
  },
];

const NoticeManage = () => {
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 선택한 행

  const [noti, setNoti] = useState<any[]>([]); // 불러온 공지사항

  // 공지사항 불러오는 axios 요청
  const getNotiList = async () => {
    try {
      const res = await api.get("/adminnotification");
      const data = res.data;

      setNoti(data);
    } catch (err) {
      console.error("공지사항 불러오기 실패", err);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  // 한 행 삭제
  const handleDelete = async (e: React.MouseEvent, id: any) => {
    e.preventDefault();
    const confirm = window.confirm("공지사항을 삭제하시겠습니까?");

    if (confirm) {
      // 공지사항 삭제 요청 (해당 id만)
      try {
        const response = await api.delete(`/adminnotification/${id}`);

        if (response.status === 200) {
          router.reload();
        } else {
          alert("삭제를 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 선택한 공지사항 삭제
  const selectDelete = async () => {
    if (selectedRowKeys.length === 0) {
      alert("삭제할 회원을 선택해주세요.");
      return;
    }

    try {
      await api.delete("/adminnotification/delete", {
        data: { items: selectedRowKeys },
      });
      alert("선택한 공지사항을 완전히 삭제했습니다.");
      //  여기에 공지사항 다시 불러오기
      setSelectedRowKeys([]); // 선택 초기화
    } catch (err) {
      console.error("공지사항 삭제 실패:", err);
      alert("공지사항 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const columns: ColumnsType<Notice> = [
    {
      title: "번호",
      dataIndex: "number",
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (text, record) => (
        <span
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={() => router.push(`/noticedetail/${record.id}`)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "작성자",
      dataIndex: "author",
    },
    {
      title: "작성일자",
      dataIndex: "date",
    },
    {
      key: "setting",
      title: "관리",
      render: (data: any) => {
        console.log(data, "asd");
        return (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // row 클릭 무시
                router.push(`/noticeupdate/${data.id}`);
              }}
            >
              수정
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // row 클릭 무시
                handleDelete(e, data.id); //행(row)에 해당하는 고유한 id
              }}
            >
              삭제
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <NoticeStyled className={clsx("notice-wrap")}>
      <div className="notice-box">
        <TitleCompo title="공지사항 관리" />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            router.push("/newnotice");
          }}
        >
          새 공지사항
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        // bordered
        showHeader={true}
        rowSelection={rowSelection}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <div>{selectedRowKeys.length}건 선택됨</div>
        <Button
          danger
          icon={<DeleteOutlined />}
          disabled={selectedRowKeys.length === 0}
          onClick={async () => {
            const confirm = window.confirm(
              "선택한 공지사항을 삭제하시겠습니까?"
            );
            if (confirm) {
              try {
                await Promise.all(
                  selectedRowKeys.map((id) =>
                    api.delete(`/adminnotification/${id}`)
                  )
                );
                message.success("삭제 완료");
                router.reload();
              } catch (error) {
                console.error(error);
                message.error("삭제 중 오류 발생");
              }
            }
          }}
        >
          삭제
        </Button>
      </div>
    </NoticeStyled>
  );
};

export default NoticeManage;
