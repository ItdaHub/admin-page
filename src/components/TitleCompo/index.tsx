import clsx from "clsx";
import { TitleCompoStyled } from "./stlyed";

interface TitleProps {
  title: string;
}

const TitleCompo = ({ title }: TitleProps) => {
  return (
    <TitleCompoStyled className={clsx("title-compo")}>{title}</TitleCompoStyled>
  );
};

export default TitleCompo;
