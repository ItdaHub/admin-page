import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import TitleCompo from "@/components/TitleCompo";
import api from "@/utill/api";

interface Notice {
  id: number;
  title: string;
  admin: { nickname: string };
  createdAt: string;
  content: string;
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

  return (
    <div style={{ padding: "2rem" }}>
      <TitleCompo title="공지사항" />
      <h1>{notice.title}</h1>
      <div
        style={{ display: "flex", gap: 15, marginTop: 10, marginBottom: 10 }}
      >
        <p>
          <strong>작성자 </strong>
          {notice.admin?.nickname}
        </p>
        <p>
          <strong>작성일 </strong>
          {notice.createdAt}
        </p>
      </div>
      <hr />
      <p>{notice.content}</p>

      <div style={{ marginTop: "2rem" }}>
        <Button
          type="primary"
          onClick={() => router.push(`/noticeupdate/${notice.id}`)}
          style={{ marginRight: 8 }}
        >
          수정하기
        </Button>

        <Button onClick={() => router.push(`/notice`)}>목록으로</Button>
      </div>
    </div>
  );
};

export default NoticeDetail;
