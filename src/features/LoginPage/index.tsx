import { useState } from "react";
import { useRouter } from "next/router";
import { LoginPageStyled } from "./styled";
import axios from "axios";
import clsx from "clsx";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const LoginPage = () => {
  // 비밀번호 토글
  const [toggle, setToggle] = useState(true);

  // 아이디
  const [email, setEmail] = useState("");

  // 비밀번호
  const [password, setPassword] = useState("");

  // 오류 메시지
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // 로그인 버튼 클릭시
  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("아이디(이메일)를 입력해주세요");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요");
      return;
    }

    try {
      // Axios로 Get요청(입력한 아이디와 비밀번호가 일치하는지 + 관리자인지 확인)
      const response = await axios.get("/api/adminLogin", {
        params: {
          email,
          password,
        },
      });

      // 성공적으로 로그인한 경우 대시보드로 이동
      if (response.data.success) {
        setErrorMessage("");

        // 로그인 성공 후 대시보드로 이동
        router.push("/dashboard");
      } else {
        setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
      }
    } catch (error) {
      // 요청 오류
      setErrorMessage(`${error} : 서버 오류가 발생했습니다`);
    }
  };

  return (
    <LoginPageStyled className={clsx("login-wrap")}>
      <div className="login-box">
        <h3 className="login-title">관리자 로그인</h3>
        <form className="login-form">
          {/* 아이디 */}
          <div>
            <input
              className="login-id"
              type="email"
              name="email"
              placeholder="아이디"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              className="login-pw"
              type={toggle ? "password" : "text"}
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          {/* 토글 버튼 */}
          {toggle ? (
            <EyeInvisibleOutlined
              className="toggleBtn"
              onClick={(e) => {
                e.preventDefault();
                setToggle(!toggle);
              }}
            />
          ) : (
            <EyeOutlined
              className="toggleBtn"
              onClick={(e) => {
                e.preventDefault();
                setToggle(!toggle);
              }}
            />
          )}

          {/* 오류 메시지 */}
          {errorMessage && (
            <div className="login-errorMessage">{errorMessage}</div>
          )}

          {/* 로그인 버튼 */}
          <button className="login-btn" onClick={handleLoginSubmit}>
            로그인
          </button>
        </form>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
