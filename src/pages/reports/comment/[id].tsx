import ReportDetailPage from "@/components/ReportDetail";
import api from "@/utill/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
interface ReportData {
  id: number;
  title: string;
  content: string;
  reporter: string;
  date: string;
}

const ReportDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const reportId = Number(id);
    const found = sample.find((item) => item.id === reportId);
    setReport(found || null);

    // 만약 API 연결 시 아래로 교체 가능:
    // api.get(`/reports/comment/${reportId}`).then(res => setReport(res.data));
  }, [router.isReady, id]);

  if (!router.isReady || !id) return <div>로딩 중...</div>;
  if (!report) return <div>해당 신고를 찾을 수 없습니다.</div>;

  return <ReportDetailPage data={report} type="comment" />;
};

export default ReportDetail;
