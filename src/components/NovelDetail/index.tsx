import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { Button, Result, Spin, Table } from "antd";
import { NovelDetailStyled } from "./styled";
import clsx from "clsx";

interface Chapter {
  id: number;
  chapterNumber: string;
  content: string;
  reportCount: number;
  authorNickname: string;
}

interface NovelDetail {
  id: number;
  title: string;
  chapters: Chapter[];
}

interface NovelDetailProps {
  novelId: number;
  status: string;
}

const NovelDetail = ({ novelId, status }: NovelDetailProps) => {
  const router = useRouter();
  const [novelDetail, setNovelDetail] = useState<NovelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (novelId) {
      fetchNovelDetail(novelId);
    }
  }, [novelId]);

  const fetchNovelDetail = async (novelId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/admin/novel/${novelId}`);
      setNovelDetail(response.data);
    } catch (error: any) {
      setError(`소설 상세 정보를 불러오는데 실패했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  // 테이블 컬럼 정의
  const columns = [
    {
      title: "회차",
      dataIndex: "chapterNumber",
      key: "chapterNumber",
      render: (text: string) => `${text} 화`,
    },
    {
      title: "내용",
      dataIndex: "content",
      key: "content",
      render: (text: string) => <div className="detail-content">{text}</div>,
    },
    {
      title: "작가",
      dataIndex: "authorNickname",
      key: "authorNickname",
    },
    {
      title: "신고 횟수",
      dataIndex: "reportCount",
      key: "reportCount",
    },
  ];

  return (
    <NovelDetailStyled className={clsx("detail-wrap")}>
      <h3>{novelDetail.title}</h3>
      <Table
        dataSource={novelDetail.chapters}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <div className="detail-button">
        <Button className="detail-publish-button" onClick={handleDeleteNovel}>
          삭제하기
        </Button>
        <Button
          className={status === "completed" ? "" : "submitOn"}
          onClick={handlePublishNovel}
        >
          출품하기
        </Button>
      </div>
    </NovelDetailStyled>
  );
};

export default NovelDetail;
