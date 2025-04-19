import NovelDetail from "@/components/NovelDetail";
import { useRouter } from "next/router";

const NovelDetailPage = () => {
  const router = useRouter();
  const { id, status } = router.query;

  return <NovelDetail novelId={Number(id)} status={String(status)} />;
};

export default NovelDetailPage;

// id를 미리 서버에서 가져와 컴포넌트로 안전하게 넘김
export async function getServerSideProps(context: any) {
  const { id } = context.params;

  return {
    props: {
      id,
    },
  };
}
