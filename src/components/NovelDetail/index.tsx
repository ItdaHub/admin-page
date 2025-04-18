import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { Button, Result, Spin } from "antd";
import { NovelDetailStyled } from "./styled";
import clsx from "clsx";

interface Chapter {
  id: number;
  chapterNumber: string;
  content: string;
  reportCount: number;
  writerName: string;
}

interface NovelDetail {
  id: number;
  title: string;
  chapters: Chapter[];
}

const NovelDetail = ({ novelId }: { novelId: number }) => {
  const router = useRouter();
  const [novelDetail, setNovelDetail] = useState<NovelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (novelId) {
      fetchNovelDetail(novelId);
    }
  }, [novelId]);

  // ✅ 관리자용 소설 상세 조회 API 호출
  const fetchNovelDetail = async (novelId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/admin/novel/${novelId}`);
      setNovelDetail(response.data);
      console.log("aaaaaaaaaaaaaaa", response.data);
    } catch (error: any) {
      setError(`소설 상세 정보를 불러오는데 실패했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 관리자용 소설 삭제
  const handleDeleteNovel = async () => {
    if (novelId) {
      try {
        await api.delete(`/admin/delete/${novelId}`);
        alert("소설이 삭제되었습니다.");
        router.push("/exhibit");
      } catch (error: any) {
        setError(`소설 삭제에 실패했습니다: ${error.message}`);
      }
    }
  };

  // ✅ 관리자용 소설 출품
  const handlePublishNovel = async () => {
    if (novelId) {
      try {
        await api.post(`/admin/publish/${novelId}`);
        alert("소설이 출품되었습니다.");
        router.push("/exhibit");
      } catch (error: any) {
        setError(`소설 출품에 실패했습니다: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="데이터를 불러오는 데 실패했습니다."
        subTitle={error}
      />
    );
  }

  if (!novelDetail) {
    return <Result status="warning" title="소설 정보를 찾을 수 없습니다." />;
  }

  return (
    <NovelDetailStyled className={clsx("detail-wrap")}>
      <h3>{novelDetail.title}</h3>
      <ul>
        {novelDetail.chapters.map((chapter) => (
          <li key={chapter.id}>
            <div className="detail-box">
              <div>{chapter.chapterNumber} 화</div>
              <div className="detail-content">{chapter.content}</div>
              <div>{chapter.writerName}</div>
              <div>신고 횟수: {chapter.reportCount}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="detail-button">
        <Button className="detail-publish-button" onClick={handleDeleteNovel}>
          삭제하기
        </Button>
        <Button onClick={handlePublishNovel}>출품하기</Button>
      </div>
    </NovelDetailStyled>
  );
};

export default NovelDetail;
