import { useEffect, useState } from "react";
import { Button, Input, message, Radio, Space } from "antd";
import { useFormik } from "formik";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { MemberAddStyled } from "./styled";
// 비밀번호, 비밀번호 확인 유효성 검사
import { validationPass, validationPassCheck } from "@/utill/vail";
import clsx from "clsx";
import api from "@/utill/api";
import { useRouter } from "next/router";

const MemberAdd = ({ id }: { id?: number }) => {
  //id가 있으면 수정, 없으면 등록
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 입력한 비밀번호 보기
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  // 이메일/닉네임 중복검사 여부
  const [emailChecked, setEmailChecked] = useState(false);
  const [nickChecked, setNickChecked] = useState(false);

  // 중복 검사 상태 메세지
  const [emailSuccess, setEmailSuccess] = useState("");
  const [nickNameSuccess, setNickNameSuccess] = useState("");

  // 각 필드의 유효성 검사 상태
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthYearError, setBirthYearError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // 폼 기본값 설정
  const userFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      phone: "",
      nickname: "",
      birthYear: "",
      role: "user",
      status: "active",
      reportCount: 0,
    },
    // 버튼을 눌렀을때 실행될 것(axios요청)
    onSubmit: async (values) => {
      if (!emailChecked || !nickChecked) {
        message.info("이메일과 닉네임 중복검사를 완료해주세요.");
        return;
      }
      console.log("뭐가 들었나", values);
      try {
        if (id) {
          // 수정
          await api.patch(`/members/${id}`, values);
          alert("수정 완료");
          router.push("/users/manage");
        } else {
          // 추가
          await api.post("/auth/register", values);
          alert("추가 완료");
          router.push("/users/manage");
        }
      } catch (error) {
        console.error("에러 발생:", error);
        alert("오류 발생");
      }
    },
  });

  // 등록일때만 입력하고 중복검사했는지 확인
  const checkDisabled = () => {
    return !(
      userFormik.values.name &&
      userFormik.values.email &&
      userFormik.values.password &&
      userFormik.values.passwordCheck &&
      userFormik.values.phone &&
      userFormik.values.nickname &&
      userFormik.values.birthYear &&
      emailChecked &&
      nickChecked &&
      userFormik.values.password === userFormik.values.passwordCheck
    );
  };

  // 수정인 경우 기존 데이터 불러오기(axios get요청)
  useEffect(() => {
    const fetchMember = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await api.get(`/members/${id}`);
          const data = res.data;
          userFormik.setValues({
            ...userFormik.values,
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            nickname: data.nickname || "",
            birthYear: data.birthYear || "",
            role: data.role || "user",
            status: data.status || "active",
            reportCount: data.reportCount || 0,
            password: "",
            passwordCheck: "",
          });
          setEmailChecked(true);
          setNickChecked(true);
        } catch (err) {
          console.error("멤버 정보 불러오기 실패:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMember();
  }, [id]);

  // 이메일 중복 검사
  const handleIdCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = validationEmail(userFormik.values.email);
    if (!isValid) return;

    try {
      const res = await api.post("/auth/emailCheck", {
        email: userFormik.values.email,
      });
      if (res.data.success) {
        setEmailChecked(true);
        setEmailError("");
        setEmailSuccess(res.data.message);
      } else {
        setEmailChecked(false);
        setEmailError(res.data.message || "이미 사용된 이메일입니다.");
        setEmailSuccess("");
      }
    } catch (err: any) {
      console.error(
        "이메일 중복 확인 에러:",
        err.response?.data || err.message
      );
      const message =
        err.response?.data?.message ||
        "이메일 중복 확인 중 오류가 발생했습니다.";
      setEmailError(message);
      setEmailSuccess("");
    }
  };

  // 닉네임 중복검사
  const handleNickCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validationNickName(userFormik.values.nickname);
    const isValid =
      userFormik.values.nickname.length >= 2 &&
      userFormik.values.nickname.length <= 8;

    if (!isValid) {
      setNickNameError("닉네임은 2~8자 사이여야 합니다.");
      return;
    }

    try {
      const res = await api.post("/auth/nicknameCheck", {
        nickName: userFormik.values.nickname,
      });
      if (res.data.success) {
        setNickChecked(true);
        setNickNameError("");
        setNickNameSuccess(res.data.message);
      } else {
        setNickChecked(false);
        setNickNameError(res.data.message || "이미 사용된 닉네임입니다.");
        setNickNameSuccess("");
      }
    } catch (err: any) {
      console.error(
        "닉네임 중복 확인 에러:",
        err.response?.data || err.message
      );
      const message =
        err.response?.data?.message ||
        "닉네임 중복 확인 중 오류가 발생했습니다.";
      setNickNameError(message);
      setNickNameSuccess("");
    }
  };

  // 이메일 유효성 검사
  const validationEmail = (email: string): boolean => {
    if (!email) {
      setEmailError(""); // 빈 값일 땐 에러 메시지 없음
      return false;
    }
    const valid = /\S+@\S+\.\S+/.test(email);
    if (!valid) {
      setEmailError("유효한 이메일이 아닙니다.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // 닉네임 유효성 검사
  const validationNickName = (nickName: string) => {
    if (!nickName) {
      setNickNameError(""); // 빈 값이면 메시지 없음
    } else if (nickName.length < 2) {
      setNickNameError("닉네임은 최소 2자 이상이어야 합니다.");
    } else {
      setNickNameError(""); // 2자 이상이면 메시지 없음
    }
  };

  // 생일 유효성 검사
  const validationBirthYear = (birthYear: string) => {
    const year = parseInt(birthYear);
    if (!birthYear) {
      setBirthYearError(""); // 빈 값일 땐 에러 메시지 없음
    } else if (!/^\d{4}$/.test(birthYear)) {
      setBirthYearError("출생년도는 4자리 숫자여야 합니다.");
    } else if (year < 1900 || year > new Date().getFullYear()) {
      setBirthYearError("유효한 연도가 아닙니다.");
    } else {
      setBirthYearError("");
    }
  };

  // 휴대폰 유효성 검사
  const validationPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
    if (!phoneNumber) {
      setPhoneNumberError(""); // 빈 값일 땐 에러 메시지 없음
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError(
        "올바른 휴대폰번호를 입력해주세요. (예: 010-1234-5678)"
      );
    } else {
      setPhoneNumberError("");
    }
  };

  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  };

  return (
    <MemberAddStyled className={clsx("add-wrap")}>
      <form onSubmit={userFormik.handleSubmit} className="add-form">
        <div className="add-box">
          <label>이름</label>
          <Input
            placeholder="이름을 입력해주세요"
            name="name"
            value={userFormik.values.name}
            onChange={userFormik.handleChange}
          />
        </div>

        <div className="add-box">
          <label>아이디</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              name="email"
              placeholder="이메일을 입력해주세요"
              value={userFormik.values.email}
              onChange={(e) => {
                userFormik.handleChange(e);
                setEmailChecked(false);
                validationEmail(e.target.value);
              }}
            />
            <Button onClick={handleIdCheck}>중복검사</Button>
          </Space.Compact>
          <p
            className={`error-message ${
              emailError ? "red-text" : "green-text"
            }`}
          >
            {emailError || emailSuccess}
          </p>
        </div>

        <div className="add-box">
          <label>비밀번호</label>
          <Input
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? "text" : "password"}
            name="password"
            value={userFormik.values.password}
            onChange={(e) => {
              userFormik.handleChange(e);
              validationPass(e.target.value, setPassError);
            }}
            suffix={
              showPassword ? (
                <EyeOutlined onClick={() => setShowPassword(false)} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setShowPassword(true)} />
              )
            }
          />
          <p className="error-message">{passError}</p>
        </div>

        <div className="add-box">
          <label>비밀번호 확인</label>
          <Input
            placeholder="비밀번호를 확인주세요"
            type={showPasswordCheck ? "text" : "password"}
            name="passwordCheck"
            value={userFormik.values.passwordCheck}
            onChange={(e) => {
              userFormik.handleChange(e);
              validationPassCheck(
                e.target.value,
                userFormik.values.password,
                setPassCheckError
              );
            }}
            suffix={
              showPasswordCheck ? (
                <EyeOutlined onClick={() => setShowPasswordCheck(false)} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setShowPasswordCheck(true)}
                />
              )
            }
          />
          <p className="error-message">{passCheckError}</p>
        </div>

        <div className="add-box">
          <label>전화번호</label>
          <Input
            name="phone"
            placeholder="전화번호를 입력해주세요"
            value={userFormik.values.phone}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              userFormik.setFieldValue("phone", formatted);
              validationPhoneNumber(formatted);
            }}
            maxLength={13}
          />
          <p className="error-message">{phoneNumberError}</p>
        </div>

        <div className="add-box">
          <label>닉네임</label>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              name="nickname"
              placeholder="최대 8자까지 입력가능합니다"
              value={userFormik.values.nickname}
              onChange={(e) => {
                const value = e.target.value.slice(0, 8); // 8자까지만 자르기
                userFormik.setFieldValue("nickname", value);
                setNickChecked(false);
                validationNickName(value); // 잘린 값으로 유효성 검사
              }}
            />
            <Button onClick={handleNickCheck}>중복검사</Button>
          </Space.Compact>

          <p
            className={`error-message ${
              nickNameError ? "red-text" : "green-text"
            }`}
          >
            {nickNameError || nickNameSuccess}
          </p>
        </div>

        <div className="add-box">
          <label>출생년도</label>
          <Input
            type="text"
            name="birthYear"
            placeholder="출생년도를 입력해주세요"
            value={userFormik.values.birthYear}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
              userFormik.setFieldValue("birthYear", onlyNums);
              validationBirthYear(onlyNums);
            }}
            maxLength={4}
          />
          <p className="error-message">{birthYearError}</p>
        </div>

        <div className="add-box">
          <label className="add-status">권한</label>
          <Radio.Group
            name="role"
            value={userFormik.values.role}
            onChange={userFormik.handleChange}
          >
            <Radio value="user">User</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </div>

        <div className="add-box">
          <label className="add-status">상태</label>
          <Radio.Group
            name="status"
            value={userFormik.values.status}
            onChange={userFormik.handleChange}
          >
            <Radio value="active">활동</Radio>
            <Radio value="suspended">정지</Radio>
          </Radio.Group>
        </div>

        <div className="add-box">
          <label>신고 횟수</label>
          <Input
            placeholder="신고 횟수를 입력해주세요"
            type="number"
            name="reportCount"
            value={userFormik.values.reportCount}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 3) {
                userFormik.handleChange(e);
              }
            }}
          />
        </div>

        <Button htmlType="submit" disabled={!id && checkDisabled()}>
          {id ? "수정하기" : "등록하기"}
        </Button>
      </form>
    </MemberAddStyled>
  );
};

export default MemberAdd;
