import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import TitleCompo from "@/components/TitleCompo";
import api from "@/utill/api";
import { NoticeDetailStyled } from "./styled";
import clsx from "clsx";

interface Notice {
  id: number;
  title: string;
  admin: { nickname: string };
  created_at: string;
  content: string;
  priority: string;
}

const NoticeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get<Notice>(`/announcement/${id}`);
        setNotice(res.data);
      } catch (error: any) {
        console.error("공지사항 상세 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [router, id]);

  if (loading) {
    return <div>공지사항 상세 정보를 불러오는 중...</div>;
  }

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const confirm = window.confirm("공지사항을 삭제하시겠습니까?");

    if (confirm) {
      try {
        const response = await api.delete(`/announcement/${id}`);

        if (response.status === 200) {
          router.push("/notice");
        } else {
          message.error("삭제를 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        message.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <NoticeDetailStyled className={clsx("notice-detail-wrap")}>
      <div className="notice-detail-box">
        <TitleCompo title="공지사항" />
        <Button onClick={() => router.push(`/notice`)}>목록으로</Button>
      </div>
      <h1>
        {notice.priority === "normal" ? "[기본]" : "[긴급]"} {notice.title}
      </h1>
      <div className="detail-info">
        <p>
          <strong>작성자 </strong>
          {notice.admin?.nickname}
        </p>
        <p>
          <strong>작성일 </strong>
          {notice.created_at.replace("T", " ").slice(0, 19)}
        </p>
      </div>
      <hr />
      <div className="content-box">{notice.content}</div>

      <div>
        <Button
          type="primary"
          onClick={() => router.push(`/noticeupdate/${notice.id}`)}
        >
          수정
        </Button>{" "}
        <Button onClick={(e) => handleDelete(e, notice.id)} danger>
          삭제
        </Button>
      </div>
    </NoticeDetailStyled>
  );
};

export default NoticeDetail;
