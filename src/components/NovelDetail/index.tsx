import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { Button, Result, Spin } from "antd";
import { NovelDetailStyled } from "./styled";
import clsx from "clsx";

interface Chapter {
  id: number;
  chapter_num: string;
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

  // 더미 데이터(삭제해도 됨)
  const generateDummyNovelDetail = (novelId: number): NovelDetail => {
    return {
      id: novelId,
      title: `소설 제목 ${novelId}`,
      chapters: [
        {
          id: 1,
          chapter_num: "1화",
          content: `더미 소설 ${novelId}의 1화 내용입니다. ${"더미 텍스트 ".repeat(
            10
          )}`,
          reportCount: Math.floor(Math.random() * 10),
          writerName: "작가, 작가, 작가, 작가, 작가, 작가, 작가, 작가, 작가",
        },
        {
          id: 2,
          chapter_num: "2화",
          content: `더미 소설 ${novelId}의 2화 내용입니다. ${"또 다른 더미 텍스트 ".repeat(
            15
          )}`,
          reportCount: Math.floor(Math.random() * 10),
          writerName: "챕터 2 작가",
        },
        {
          id: 3,
          chapter_num: "3화",
          content: `더미 소설 ${novelId}의 3화 내용입니다. ${"마지막 더미 텍스트 ".repeat(
            5
          )}`,
          reportCount: Math.floor(Math.random() * 10),
          writerName: `챕터 3 작가`,
        },
      ],
    };
  };

  useEffect(() => {
    if (novelId) {
      // fetchNovelDetail(novelId);

      // 더미 데이터(밑에 3줄 삭제해도 됨)
      const dummyData = generateDummyNovelDetail(novelId);
      setNovelDetail(dummyData);
      setLoading(false);
    }
  }, [novelId]);

  // 소설 상세 내용들 불러오기
  const fetchNovelDetail = async (novelId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/novel/${novelId}`);
      setNovelDetail(response.data);
    } catch (error: any) {
      setError(`소설 상세 정보를 불러오는데 실패했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 해당 소설 삭제하기
  const handleDeleteNovel = async () => {
    if (novelId) {
      try {
        await api.delete(`/novel/${novelId}`);
        alert("소설이 삭제되었습니다.");
        router.push("/exhibit");
      } catch (error: any) {
        setError(`소설 삭제에 실패했습니다: ${error.message}`);
      }
    }
  };

  const handlePublishNovel = async () => {
    if (novelId) {
      try {
        await api.post(`/novel/${novelId}`);
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
              <div>{chapter.chapter_num}</div>
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
