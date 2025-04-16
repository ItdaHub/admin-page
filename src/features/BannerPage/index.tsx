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

// test data
const dummyData: Banner[] = [
  {
    id: 1,
    title: "봄맞이 이벤트",
    imageUrl: "/banner.png",
    linkUrl: "/login",
  },
  {
    id: 2,
    title: "여름 세일 시작!",
    imageUrl: "/banner2.png",
    linkUrl: "/signup",
  },
  {
    id: 3,
    title: "가을엔 독서",
    imageUrl: "/banner3.png",
    linkUrl: "/",
  },
  {
    id: 4,
    title: "겨울 한정 배너",
    imageUrl: "/banner4.png",
    linkUrl: "/notice",
  },
];

const BannerPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  const router = useRouter();

  // test
  useEffect(() => {
    // 현재는 더미 데이터 사용
    setBanners(dummyData);
  }, []);

  // // axios 요청 (실제데이터)
  // useEffect(() => {
  //   const getBanners = async () => {
  //     try {
  //       const res = await api.get("/banner");
  //       setBanners(res.data);
  //     } catch (err) {
  //       console.error("배너 불러오기 실패", err);
  //     }
  //   };

  //   getBanners();
  // }, []);

  // 한 행 삭제
  const handleDelete = async (e: React.MouseEvent, id: any) => {
    e.preventDefault();
    const confirm = window.confirm("배너를 삭제하시겠습니까?");

    if (confirm) {
      // 공지사항 삭제 요청 (해당 id만)
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
        <img src={record.imageUrl} alt={record.title} className="banner-img" />
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
              handleDelete(e, banner.id); //행(row)에 해당하는 고유한 id
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
        onRow={(record) => {
          // return {
          //   onClick: () => {
          //     router.push(`/bannerdetail/${record.id}`);
          //   },
          // };
          return {
            onClick: () => {
              router.push({
                pathname: `/bannerdetail/${record.id}`,
                query: {
                  data: JSON.stringify(record), // 더미 데이터 직접 넘기기
                },
              });
            },
          };
        }}
        locale={{
          emptyText:
            "등록된 배너가 없습니다. 상단의 [등록] 버튼을 눌러 추가해보세요.",
        }}
      />
    </BannerPageStyled>
  );
};

export default BannerPage;
