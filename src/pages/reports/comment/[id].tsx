import ReportDetailPage from "@/features/ReportDetail";
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
    title: "스포일러 포함",
    content: "리뷰에 결말이 그대로 나와 있어요.",
    reporter: "코코",
    date: "2024-11-01",
  },
];

const ReportDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>로딩 중...</div>;

  const report = sample.find((item) => item.id === Number(id));

  if (!report) return <div>해당 신고를 찾을 수 없습니다.</div>;
  return <ReportDetailPage data={report} />;
};

export default ReportDetail;
