// pages/notice/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import TitleCompo from "@/components/TitleCompo";

interface Notice {
  id: string;
  number: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

const dummyData: Notice[] = [
  {
    id: "1",
    number: 1,
    title: "2024년도 출판 안내",
    author: "권예은",
    date: "2018.05.04 14:16",
    content: "2024년 출판 계획에 대한 안내입니다...",
  },
  {
    id: "2",
    number: 2,
    title: "4월 서비스점검 작업 안내",
    author: "박정은",
    date: "2018.04.20 15:31",
    content: `안녕하세요, 고객님. 저희 서비스를 이용해 주셔서 감사합니다. 
    4월 중에 예정된 서비스 점검이 있을 예정입니다. 점검 기간 동안 일부 기능이 일시적으로 제공되지 않거나 이용에 어려움이 있을 수 있습니다. 
    정확한 점검 일정과 영향 범위에 대해서는 추후 안내드릴 예정이니, 참고 부탁드립니다. 점검 작업은 서비스의 품질 개선과 안정화를 위한 중요한 과정입니다. 고객님께 불편을 드리게 되어 대단히 죄송하며, 점검이 원활히 완료될 수 있도록 최선을 다하겠습니다. 이용에 불편이 없도록 사전에 충분히 안내드리겠습니다.
    감사합니다.`,
  },
  {
    id: "3",
    number: 3,
    title: "웹메일 장애복구와 사과의 말씀",
    author: "손은비",
    date: "2018.05.04 14:40",
    content: "웹메일 장애에 대해 사과드리며 복구를 완료했습니다...",
  },
];

const NoticeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (id) {
      const found = dummyData.find((item) => item.id === id);
      if (found) {
        setNotice(found);
      }
    }
  }, [id]);

  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <TitleCompo title="공지사항" />
      <h1>{notice.title}</h1>
      <div
        style={{ display: "flex", gap: 15, marginTop: 10, marginBottom: 10 }}
      >
        <p>
          <strong>작성자 </strong>
          {notice.author}
        </p>
        <p>
          <strong>작성일 </strong>
          {notice.date}
        </p>
      </div>
      <hr />
      <p>{notice.content}</p>

      <div style={{ marginTop: "2rem" }}>
        <Button
          type="primary"
          onClick={() => router.push(`/noticeupdate/${id}`)}
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
