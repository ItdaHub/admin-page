import MemberAdd from "@/components/MemberAdd";

const MemberEditPage = ({ id }: any) => {
  return (
    <>
      <MemberAdd id={Number(id)} />
    </>
  );
};

export default MemberEditPage;

// id를 미리 서버에서 가져와 컴포넌트로 안전하게 넘김
export async function getServerSideProps(context: any) {
  const { id } = context.params;

  return {
    props: {
      id,
    },
  };
}
