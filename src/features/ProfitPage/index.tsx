import TitleCompo from "@/components/TitleCompo";
import { ProfitPageStyled } from "./styled";
import clsx from "clsx";
import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "@/utill/api";

const ProfitPage = () => {
  const [profits, setProfits] = useState<any[]>([]);

  const getExhibitList = async () => {
    try {
      // 수익 생긴 소설 axios 요청
      const res = await api.get("/profit");
      const data = res.data;

      console.log(data);

      const mapped = data.map((x: any) => ({
        key: x.id,
        id: x.id, //소설 id
        title: x.title, //소설 제목
        profit: x.profit, //수익
      }));

      setProfits(mapped);
    } catch (err) {
      console.error("수익 생긴 소설 불러오기 실패", err);
    }
  };

  // 수익 생기 소설 정보
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
      key: "profit",
      title: "수익",
      dataIndex: "profit",
    },
  ];

  return (
    <ProfitPageStyled className={clsx("profit-wrap")}>
      <TitleCompo title="수익 관리" />
      <Table columns={col} dataSource={profits} rowKey="id" />
    </ProfitPageStyled>
  );
};

export default ProfitPage;
