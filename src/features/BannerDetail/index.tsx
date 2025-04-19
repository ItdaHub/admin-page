import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { Button, Card, Descriptions } from "antd";
import TitleCompo from "@/components/TitleCompo";
import { BannerDetailStyled } from "./styled";
import clsx from "clsx";

interface Banner {
  id: number;
  title: string;
  imagePath: string;
}

const BannerDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    if (id) {
      const getBanner = async () => {
        try {
          const res = await api.get(`/banner/${id}`);
          setBanner(res.data);
        } catch (err) {
          console.error("배너 상세 불러오기 실패", err);
        }
      };
      getBanner();
    }
  }, [id]);

  if (!banner) return <div>로딩 중...</div>;

  return (
    <BannerDetailStyled className={clsx("banner-detail-wrap")}>
      <div className="detail-head">
        <TitleCompo title="배너 상세" />
        <Button onClick={() => router.back()}>목록으로</Button>
      </div>
      <Card className="detail-box">
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="ID">{banner.id}</Descriptions.Item>
          <Descriptions.Item label="제목">{banner.title}</Descriptions.Item>
          <Descriptions.Item label="이미지 미리보기">
            <img
              className="detail-image"
              src={banner.imagePath}
              alt={banner.title}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </BannerDetailStyled>
  );
};

export default BannerDetail;
