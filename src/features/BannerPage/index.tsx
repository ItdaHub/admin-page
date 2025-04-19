import TitleCompo from "@/components/TitleCompo";
import { BannerPageStyled } from "./styled";
import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/utill/api";
import clsx from "clsx";

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

const BannerPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const router = useRouter();

  // 실제 배너 데이터 요청
  useEffect(() => {
    const getBanners = async () => {
      try {
        const res = await api.get("/banner"); // 실제 API 호출
        setBanners(res.data); // 받아온 데이터로 상태 업데이트
      } catch (err) {
        console.error("배너 불러오기 실패", err);
      }
    };

    getBanners();
  }, []);

  // 한 행 삭제
  const handleDelete = async (e: React.MouseEvent, id: any) => {
    e.preventDefault();
    const confirm = window.confirm("배너를 삭제하시겠습니까?");

    if (confirm) {
      try {
        const response = await api.delete(`/banner/${id}`);

        if (response.status === 200) {
          router.reload();
        } else {
          alert("삭제를 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "배너 미리보기",
      dataIndex: "imageUrl",
      render: (_: any, record: Banner) => (
        <img
          src={record.imageUrl}
          alt={record.title}
          className="banner-img"
          style={{ width: "150px", height: "auto" }}
        />
      ),
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "URL",
      dataIndex: "linkUrl",
    },
    {
      title: "관리",
      render: (banner: any) => (
        <div className="banner-management">
          <Button
            onClick={(e) => {
              handleDelete(e, banner.id);
            }}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <BannerPageStyled className={clsx("banner-wrap")}>
      <div className="banner-box">
        <TitleCompo title="배너 관리" />
        <Button type="primary" onClick={() => router.push("/bannerform")}>
          등록
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={banners}
        rowKey="id"
        pagination={false}
        bordered
        onRow={(record) => ({
          onClick: () => {
            router.push({
              pathname: `/bannerdetail/${record.id}`,
              query: {
                data: JSON.stringify(record),
              },
            });
          },
        })}
        locale={{
          emptyText:
            "등록된 배너가 없습니다. 상단의 [등록] 버튼을 눌러 추가해보세요.",
        }}
      />
    </BannerPageStyled>
  );
};

export default BannerPage;
