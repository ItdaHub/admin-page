import Header from "@/features/Header";
import NotPc from "@/features/NotPc";
import Template from "@/layouts/Template";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import "antd/dist/reset.css";

const NO_HEADER_ROUTES = ["/login"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [notPc, setNotPc] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAdminLoggedIn") === "true";

    if (!isAuth && router.pathname !== "/login") {
      router.replace("/login");
      return;
    }

    setIsLoggedIn(isAuth);
    setIsReady(true);
  }, [router.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        // 이거 true로 바꿔야함
        setNotPc(false);
      } else {
        setNotPc(false);
      }
    };

    // 초기 width 확인
    handleResize();

    // resize 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="로딩 중..." />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>관리자</title>
      </Head>

      {notPc ? (
        <NotPc />
      ) : NO_HEADER_ROUTES.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Header />
          <Template>
            <Component {...pageProps} />
          </Template>
        </>
      )}
    </>
  );
}
