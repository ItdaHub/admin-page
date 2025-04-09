import { Table } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReportManageStyled } from "./styled";
import clsx from "clsx";

interface ReportData {
  id: number;
  title: string;
  content: string;
  reporter: string;
  date: string;
}

interface Props {
  data: ReportData[];
  type: "comment" | "novel";
}

const ReportManagement = ({ data, type }: Props) => {
  const router = useRouter();

  const [report, setReport] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleContentClick = (report: ReportData) => {
    router.push(`/reports/${type}/${report.id}`);
  };

  const columns = [
    { key: "id", title: "번호", dataIndex: "id" },
    { key: "title", title: "제목", dataIndex: "title" },
    {
      key: "content",
      title: "신고 내용",
      dataIndex: "content",
      render: (text: string, record: ReportData) => (
        <span
          onClick={() => handleContentClick(record)}
          style={{ cursor: "pointer", color: "#1890ff" }}
        >
          {text.length > 10 ? text.slice(0, 10) + "..." : text}
        </span>
      ),
    },
    { key: "reporter", title: "신고자", dataIndex: "reporter" },
    { key: "date", title: "신고 날짜", dataIndex: "date" },
  ];

  // useEffect(() => {
  //   // API 호출
  //   const getReports = async () => {
  //     try {
  //       const res = await api.get(`/reports/${type}`); // ←  URL 변경해야 함
  //       // key 값이 없는 경우, index를 key로 추가
  //       const datas = res.data.map((item: any, index: number) => ({
  //         ...item,
  //         key: item.id || index + 1,
  //       }));
  //       setReport(datas);
  //     } catch (err) {
  //       console.error("신고 데이터를 불러오는 중 에러 발생:", err);
  //     }
  //   };

  //   getReports();
  // }, []);

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
      <div className="manage-info">
        <div className="manage-total-num">총 {data.length}건</div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </ReportManageStyled>
  );
};

export default ReportManagement;
