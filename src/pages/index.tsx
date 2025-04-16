import DashBoard from "@/features/DashPage";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login");
  }, []);
  return null;
};

export default Home;
