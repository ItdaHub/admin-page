import clsx from "clsx";
import { ReportDetailStyled } from "./styled";
import api from "@/utill/api";
import router from "next/router";

interface ReportData {
  id: number;
  reason: string;
  content: string;
  reporter: {
    id: number;
    name: string;
    nickname: string;
  };
  created_at?: string;
  userId?: number;
  target_id?: number;
}

interface Props {
  data: ReportData;
  target_type: "comment" | "chapter";
}

const ReportDetail = ({ data, target_type }: Props) => {
  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await api.delete(`/reports/comment/${data.id}`); // ← id 필요
      alert(
        `${target_type === "comment" ? "댓글" : "소설"} 신고가 삭제되었습니다.`
      );
      router.push("/reports");
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <ReportDetailStyled className={clsx("reportdetail-wrap")}>
      <h2 className="header">
        {target_type === "comment" ? "댓글" : "소설"} 신고 상세 보기
      </h2>

      <div className="row">
        <div className="label">신고자 ID</div>
        <div className="value">{data.reporter.id}</div>
      </div>

      <div className="row">
        <div className="label">신고자</div>
        <div className="value">{data.reporter.nickname}</div>
      </div>

      <div className="row">
        <div className="label">신고 이유</div>
        <div className="value">{data.reason}</div>
      </div>

      <div className="row">
        <div className="label">
          신고 내용 ({target_type === "comment" ? "댓글" : "소설"})
        </div>
        <div className="value"></div>
      </div>

      {/* <div className="row">
        <div className="label">신고된 내용</div>
        <div className="value">{data.content}</div>
      </div> */}

      <div className="row">
        <div className="label">신고된 글 작성자</div>
        {/* <div className="value">{data.userId}</div> */}
        {<div className="value">{data.target_id}</div>}
      </div>

      <div className="row">
        <div className="label">신고 날짜</div>
        <div className="value">{data.created_at}</div>
      </div>

      <div className="delete-btn">
        <button onClick={handleDelete}>삭제</button>
      </div>
    </ReportDetailStyled>
  );
};

export default ReportDetail;
