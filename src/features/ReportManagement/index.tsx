import { Table } from "antd";
import { ReportManageStyled } from "./styled";
import clsx from "clsx";
import { useState, useEffect } from "react";
import api from "@/utill/api";
import { useRouter } from "next/router";

const sample = [
  {
    id: 1,
    title: "욕설이 있습니다",
    content: "댓글에 부적절한 단어가 있어요.",
    reporter: "나나",
    date: "2024-11-03",
  },
  {
    id: 2,
    title: "홍보성 글입니다",
    content: "지나친 홍보 내용이 포함되어 있어요.",
    reporter: "바다",
    date: "2024-11-02",
  },
  {
    id: 3,
    title: "스포일러 포함",
    content: "리뷰에 결말이 그대로 나와 있어요.",
    reporter: "코코",
    date: "2024-11-01",
  },
];

const ReportManagement = () => {
  const router = useRouter();

  // 데이터 상태 (나중에 API 연동하여 저장) (현재는 sample)
  const [data, setData] = useState(sample);

  // 선택한 행의 ID
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 신고 내용 클릭 시 상세 페이지로 이동
  const handleContentClick = (report: any) => {
    router.push(`/reports/comment/${report.id}`);
  };

  // 신고 내용 컬럼 내용 일부만 보여주는 함수
  const shortContent = (text: string, record: any) => (
    <span
      style={{ cursor: "pointer", color: "#1890ff" }}
      onClick={() => handleContentClick(record)}
    >
      {text.length > 10 ? text.slice(0, 10) + "..." : text}
    </span>
  );

  const col = [
    {
      key: "id",
      title: "번호",
      dataIndex: "id",
    },
    {
      key: "title",
      title: "제목",
      dataIndex: "title",
    },
    {
      key: "content",
      title: "신고 내용",
      dataIndex: "content",
      render: shortContent,
    },
    {
      key: "reporter",
      title: "신고자",
      dataIndex: "reporter",
    },
    {
      key: "date",
      title: "신고 날짜",
      dataIndex: "date",
    },
  ];
  // 행 선택 핸들러
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("선택한 행 ID:", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 신고 데이터 불러오기 (API 연결 후에 사용 가능)
  //   useEffect(() => {
  //     // API 호출
  //     const getReports = async () => {
  //       try {
  //         const res = await api.get("/reports/comment"); // ←  URL 변경해야 함
  //         // key 값이 없는 경우, index를 key로 추가
  //         const datas = res.data.map((item: any, index: number) => ({
  //           ...item,
  //           id: item.id || index + 1,
  //         }));
  //         setData(datas);
  //       } catch (err) {
  //         console.error("신고 데이터를 불러오는 중 에러 발생:", err);
  //       }
  //     };

  //     getReports();
  //   }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <ReportManageStyled className={clsx("report-wrap")}>
      <div className="report-title">신고 관리</div>
      <div className="report-info">
        <div className="report-total-num">총 {data.length}건</div>
      </div>
      <Table
        columns={col}
        dataSource={data}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </ReportManageStyled>
  );
};

export default ReportManagement;
