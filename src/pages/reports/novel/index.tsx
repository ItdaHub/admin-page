import ReportManagement from "@/components/ReportManagement";

const sample = [
  {
    id: 1,
    title: "욕설adfasdfadsf이 있습니다",
    content: "댓글에 부적절한 단어sdfads가 있어요.",
    reporter: "나나",
    date: "2024-11-03",
  },
  {
    id: 2,
    title: "dfsfad 글입니다",
    content: "지나친 홍보 내용이 포함되어dfsdfa 있어요.",
    reporter: "바다",
    date: "2024-11-02",
  },
];

const Reports = () => {
  return <ReportManagement data={sample} type="novel" />;
};
export default Reports;
