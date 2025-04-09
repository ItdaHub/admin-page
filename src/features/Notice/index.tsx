// pages/notice-manage.tsx
import { useState } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { NoticeStyled } from "./styled";
import clsx from "clsx";

interface Notice {
  id: string;
  number: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const data: Notice[] = [
  {
    id: "1",
    number: 1,
    title: "2024년도 출판 안내",

    author: "권예은",
    date: "2018.05.04 14:16",
    views: 5,
  },
  {
    id: "2",
    number: 2,
    title: "4월 서비스점검 작업 안내",
    author: "박정은",
    date: "2018.04.20 15:31",
    views: 7,
  },
  {
    id: "3",
    number: 3,
    title: "웹메일 장애복구와 사과의 말씀",
    author: "손은비",
    date: "2018.05.04 14:40",
    views: 8,
  },
];

const NoticeManage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  const columns: ColumnsType<Notice> = [
    {
      title: "번호",
      dataIndex: "number",
    },
    {
      title: "제목",
      dataIndex: "title",
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
      title: "작성횟수",
      dataIndex: "views",
    },
    {
      key: "setting",
      title: "관리",
      render: (data: any) => {
        console.log(data, "asd");
        return (
          <>
            <Button>수정</Button>
            <Button>삭제</Button>
          </>
        );
      },
    },
  ];

  return (
    <NoticeStyled className={clsx("notice-wrap")}>
      <div className="notice-box">
        <h2 className="notice-title">공지사항 관리</h2>
        <Button type="primary" icon={<PlusOutlined />}>
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
        >
          삭제
        </Button>
      </div>
    </NoticeStyled>
  );
};

export default NoticeManage;
