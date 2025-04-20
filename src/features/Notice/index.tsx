import { useState, useEffect } from "react";
import { Table, Button, message, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NoticeStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";
import api from "@/utill/api";
import TitleCompo from "@/components/TitleCompo";

interface Notice {
  id: number;
  title: string;
  admin: { nickname: string };
  created_at: string;
  content: string;
  priority: string;
}

const NoticeManage = () => {
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [noti, setNoti] = useState<Notice[]>([]);
  const [sortOrder, setSortOrder] = useState<"DESC" | "ASC">("DESC");
  const [loading, setLoading] = useState(true);

  // 공지사항 불러오기
  const getNotiList = async () => {
    setLoading(true);
    try {
      const res = await api.get("/announcement");
      setNoti(res.data);
    } catch (err) {
      console.error("공지사항 불러오기 실패", err);
      message.error("공지사항 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotiList();
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const confirm = window.confirm("공지사항을 삭제하시겠습니까?");

    if (confirm) {
      try {
        const response = await api.delete(`/announcement/${id}`);

        if (response.status === 200) {
          message.success("공지사항이 삭제되었습니다.");
          getNotiList(); // 삭제 후 목록 다시 불러오기
        } else {
          message.error("삭제를 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        message.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 선택한 공지사항 삭제
  const selectDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("삭제할 공지사항을 선택해주세요.");
      return;
    }

    const confirm = window.confirm("선택한 공지사항을 삭제하시겠습니까?");
    if (confirm) {
      try {
        await Promise.all(
          selectedRowKeys.map((id) => api.delete(`/announcement/${id}`))
        );
        message.success("선택한 공지사항을 삭제했습니다.");
        setSelectedRowKeys([]);
        getNotiList();
      } catch (err) {
        console.error("공지사항 삭제 실패:", err);
        message.error(
          "공지사항 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  const sortedNoti = [...noti].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return sortOrder === "DESC" ? bTime - aTime : aTime - bTime;
  });

  const columns: ColumnsType<Notice> = [
    {
      title: "번호",
      render: (text, record, index) => index + 1,
      width: "10%",
    },
    {
      title: "제목",
      dataIndex: "title",
      render: (text, record) => {
        const priority = record.priority === "normal" ? "[기본]" : "[긴급]";
        return (
          <span>
            {priority} {text}
          </span>
        );
      },
      width: "35%",
    },
    {
      title: "작성자",
      dataIndex: ["admin", "nickname"],
      width: "15%",
    },
    {
      title: "작성일자",
      dataIndex: "created_at",
      render: (_: any, record) =>
        record.created_at.replace("T", " ").slice(0, 19),
      width: "20%",
    },
    {
      key: "setting",
      title: "관리",
      render: (data: Notice) => (
        <div className="setting-button">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/noticeupdate/${data.id}`);
            }}
          >
            수정
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(e, data.id);
            }}
            danger
          >
            삭제
          </Button>
        </div>
      ),
      width: "20%",
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
      <div className="notice-info">
        <div>공지</div>
        <div>총 {noti.length}건</div>
        <Select
          value={sortOrder}
          style={{ width: 120 }}
          onChange={(value) => setSortOrder(value)}
          options={[
            { value: "DESC", label: "최신순" },
            { value: "ASC", label: "오래된순" },
          ]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={sortedNoti}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        loading={loading}
        showHeader={true}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => router.push(`/noticedetail/${record.id}`),
        })}
        rowClassName="notice-row"
      />

      <div>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          disabled={selectedRowKeys.length === 0}
          onClick={selectDelete}
        >
          삭제
        </Button>
      </div>
    </NoticeStyled>
  );
};

export default NoticeManage;
