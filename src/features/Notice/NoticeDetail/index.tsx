import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
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
        console.log(res.data);
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

  return (
    <NoticeDetailStyled className={clsx("notice-detail-wrap")}>
      <div className="notice-detail-box">
        <TitleCompo title="공지사항" />
        <Button onClick={() => router.push(`/notice`)}>목록으로</Button>
      </div>
      <h1>
        {[notice.priority === "normal" ? "[기본]" : "[긴급]"]} {notice.title}
      </h1>
      <div className="detail-info">
        <p>
          <strong>작성자 </strong>
          {notice.admin?.nickname}
        </p>
        <p>
          <strong>작성일 </strong>
          {notice.created_at}
        </p>
      </div>
      <hr />
      <div className="content-box">{notice.content}</div>

      <div>
        <Button
          type="primary"
          onClick={() => router.push(`/noticeupdate/${notice.id}`)}
        >
          수정하기
        </Button>
      </div>
    </NoticeDetailStyled>
  );
};

export default NoticeDetail;
