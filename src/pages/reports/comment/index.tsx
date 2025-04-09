import ReportManagement from "@/components/ReportManagement";

interface ReportData {
  id: number;
  title: string;
  content: string;
  reporter: string;
  date: string;
}

const sample: ReportData[] = [
  {
    id: 1,
    title: "욕설이 있습니다z",
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
    title: "욕설이 있습니다",
    content: "댓글에 부적절한 단어가 있어요.",
    reporter: "나나",
    date: "2024-11-03",
  },
  {
    id: 4,
    title: "홍보성 글입니다",
    content: "지나친 홍보 내용이 포함되어 있어요.",
    reporter: "바다",
    date: "2024-11-02",
  },
];

const Reports = () => {
  return <ReportManagement data={sample} type="comment" />;
};
export default Reports;
