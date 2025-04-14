import TitleCompo from "@/components/TitleCompo";
import { DashStyled } from "./styled";
import VisitorChart from "@/components/VisitorChart";

const DashBoard = () => {
  return (
    <DashStyled>
      <TitleCompo title="대시보드" />
      <VisitorChart />
    </DashStyled>
  );
};
export default DashBoard;
