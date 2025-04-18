import { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { ExhibitPageStyled } from "./styled";
import clsx from "clsx";
import api from "@/utill/api";
import { useRouter } from "next/router";
import TitleCompo from "@/components/TitleCompo";

const ExhibitPage = () => {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const router = useRouter();

  const getExhibitList = async () => {
    try {
      // 완결된 소설 axios 요청
      const res = await api.get("/complete");
      const data = res.data;

      console.log("이거당", data);

      const mapped = data.map((x: any) => ({
        key: x.id,
        id: x.id, //소설 id
        title: x.title, //소설 제목
        writer: x.writer, //소설 작가
        date: x.date, //소설 완결된 날짜
        status:
          x.status === "ready" ? (
            <div className="ready">대기중</div>
          ) : (
            <div className="publish">출품 완료</div>
          ),
      }));

      setExhibits(mapped);
    } catch (err) {
      console.error("완결 소설 불러오기 실패", err);
    }
  };

  // 완결된 소설 정보
  useEffect(() => {
    getExhibitList();
  }, []);

  // 컬럼
  const col: any = [
    {
      key: "title",
      title: "제목",
      dataIndex: "title",
    },
    {
      key: "writer",
      title: "작가",
      dataIndex: "writer",
    },
    {
      key: "date",
      title: "날짜",
      dataIndex: "date",
    },
    {
      key: "status",
      title: "상태",
      dataIndex: "status",
    },
  ];

  return (
    <ExhibitPageStyled className={clsx("exhibit-wrap")}>
      <TitleCompo title="출품 관리" />
      <Table
        columns={col}
        dataSource={exhibits}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/novel/${record.id}`);
            },
            style: { cursor: "pointer" },
          };
        }}
      />
    </ExhibitPageStyled>
  );
};
export default ExhibitPage;
