import TitleCompo from "@/components/TitleCompo";
import { BannerPageStyled } from "./styled";

const BannerPage = () => {
  return (
    <BannerPageStyled>
      <TitleCompo title="배너 관리" />
      <div></div>
    </BannerPageStyled>
  );
};

export default BannerPage;
