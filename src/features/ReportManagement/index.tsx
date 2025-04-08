import { Table } from "antd";
import { ReportManageStyled } from "./styled";
import clsx from "clsx";
import { useState, useEffect } from "react";
import api from "@/utill/api";

const sample = [
  {
    key: 1,
    title: "욕설이 있습니다",
    content: "댓글에 부적절한 단어가 있어요.",
    reporter: "나나",
    date: "2024-11-03",
  },
  {
    key: 2,
    title: "홍보성 글입니다",
    content: "지나친 홍보 내용이 포함되어 있어요.",
    reporter: "바다",
    date: "2024-11-02",
  },
  {
    key: 3,
    title: "스포일러 포함",
    content: "리뷰에 결말이 그대로 나와 있어요.",
    reporter: "코코",
    date: "2024-11-01",
  },
];

const col = [
  {
    key: "no",
    title: "번호",
    dataIndex: "key",
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
    render: (text: string) => (
      <span
        //   onClick={() => handleContentClick(text)}   // 모달로? 페이지로?
        style={{ cursor: "pointer", color: "#1890ff" }}
      >
        {text.length > 10 ? text.slice(0, 10) + "..." : text}
      </span>
    ),
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

const ReportManagement = () => {
  //   const [report, setReport] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  //   useEffect(() => {
  //     // API 호출
  //     const fetchReports = async () => {
  //       try {
  //         const res = await api.get("/reports/comment"); // ←  URL 변경해야 함
  //         // key 값이 없는 경우, index를 key로 추가
  //         const data = res.data.map((item: any, index: number) => ({
  //           ...item,
  //           key: item.id || index + 1,
  //         }));
  //         setReport(data);
  //       } catch (err) {
  //         console.error("신고 데이터를 불러오는 중 에러 발생:", err);
  //       }
  //     };

  //     fetchReports();
  //   }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      //   {
      //     key: "odd",
      //     text: "홀수 행 선택",
      //     onSelect: (changeableRowKeys: React.Key[]) => {
      //       const newSelectedRowKeys = changeableRowKeys.filter(
      //         (_, index) => index % 2 === 0
      //       );
      //       setSelectedRowKeys(newSelectedRowKeys);
      //     },
      //   },
      //   {
      //     key: "even",
      //     text: "짝수 행 선택",
      //     onSelect: (changeableRowKeys: React.Key[]) => {
      //       const newSelectedRowKeys = changeableRowKeys.filter(
      //         (_, index) => index % 2 !== 0
      //       );
      //       setSelectedRowKeys(newSelectedRowKeys);
      //     },
      //   },
    ],
  };

  return (
    <ReportManageStyled className={clsx("report-wrap")}>
      <div className="report-title">신고 관리</div>
      <div className="manage-info">
        <div className="manage-total-num">총 {sample.length}건</div>
      </div>
      <Table columns={col} dataSource={sample} rowSelection={rowSelection} />
    </ReportManageStyled>
  );
};

export default ReportManagement;
