import { Table } from "antd";
import { useRouter } from "next/router";

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

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default ReportManagement;
