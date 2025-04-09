import clsx from "clsx";
import { ReportDetailStyled } from "./styled";
import api from "@/utill/api";
import router from "next/router";

interface ReportData {
  id: number;
  title: string;
  content: string;
  reporter: string;
  date: string;
}

interface Props {
  data: ReportData;
  type: "comment" | "novel";
}

const ReportDetail = ({ data, type }: Props) => {
  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await api.delete(`/reports/comment/${data.id}`); // ← id 필요
      alert(`${type === "comment" ? "댓글" : "소설"} 신고가 삭제되었습니다.`);
      router.push("/reports");
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <ReportDetailStyled className={clsx("reportdetail-wrap")}>
      <h2 className="header">
        {type === "comment" ? "댓글" : "소설"} 신고 상세
      </h2>

      <div className="row">
        <div className="label">제목</div>
        <div className="value">{data.title}</div>
      </div>

      <div className="row">
        <div className="label">신고된 소설</div>
        <div className="value">신고된 소설 제목</div>
      </div>

      <div className="row">
        <div className="label">신고 내용</div>
        <div className="value">{data.content}</div>
      </div>

      <div className="row">
        <div className="label">신고자</div>
        <div className="value">{data.reporter}</div>
      </div>

      <div className="row">
        <div className="label">신고 날짜</div>
        <div className="value">{data.date}</div>
      </div>

      <div className="delete-btn">
        <button onClick={handleDelete}>삭제</button>
      </div>
    </ReportDetailStyled>
  );
};

export default ReportDetail;
