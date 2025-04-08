/**
 * 발리체크용
 */

import { Modal } from "antd";
import api from "@/utill/api";

// 전화번호 확인용
export const check = /^\d{3}-\d{4}-\d{4}$/;

// 전화번호 하이픈 추가 및 숫자 개수 제한
export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  let formattedPhone = e.target.value.replace(/[^\d]/g, ""); // 숫자만 추출

  if (formattedPhone.length > 11) {
    return;
  }

  if (formattedPhone.length <= 3) {
    // 3자리까지는 그대로 표시
    formattedPhone = formattedPhone;
  } else if (formattedPhone.length <= 7) {
    // 4~7자리에 하이픈 추가
    formattedPhone = formattedPhone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  } else {
    // 8자리 이상 하이픈 추가
    formattedPhone = formattedPhone.replace(
      /(\d{3})(\d{4})(\d{1,4})/,
      "$1-$2-$3"
    );
  }

  setPhoneNumber(formattedPhone);
  setErrorMessage(""); // 전화번호 입력 시 에러 메시지 초기화
};

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/;

// 비밀번호 유효성 검사
export const validationPass = (
  password: string,
  setPassError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!password) {
    setPassError(""); // 빈값이어도 에러 메시지 없이 통과
  } else if (!PASSWORD_REGEX.test(password)) {
    setPassError(
      "비밀번호는 8~16자, 대·소문자, 숫자, 특수문자를 포함해야 합니다."
    );
  } else {
    setPassError("");
  }
};

// 비밀번호 확인 유효성 검사
export const validationPassCheck = (
  password: string,
  passwordCheck: string,
  setPassCheckError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!passwordCheck) {
    setPassCheckError(""); // 빈값이어도 에러 메시지 없이 통과
  } else if (password !== passwordCheck) {
    setPassCheckError("비밀번호가 일치하지 않습니다.");
  } else {
    setPassCheckError("");
  }
};
