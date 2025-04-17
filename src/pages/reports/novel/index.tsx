import ReportManagement from "@/components/ReportManagement";

interface ReportData {
  id: number;
  target_type: string;
  target_id: number;
  reason?: string;
  created_at?: string;
  reporterId?: string;
}

const sample = [
  {
    id: 1,
    target_type: "comment",
    target_id: 101,
    reason: "욕설",
    created_at: "2024-11-03",
    reporterId: "user1",
  },
  {
    id: 2,
    target_type: "chapter",
    target_id: 202,
    reason: "홍보",
    created_at: "2024-11-02",
    reporterId: "user2",
  },
  {
    id: 3,
    target_type: "novel",
    target_id: 303,
    reason: "부적절한 내용",
    created_at: "2024-11-01",
    reporterId: "user3",
  },
];

const NovelReports = () => {
  const filteredData = sample.filter(
    (report) => report.target_type === "novel"
  );

  return <ReportManagement data={filteredData} target_type="chapter" />;
};

export default NovelReports;
