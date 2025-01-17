import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { ROUTE_PATH } from "@/router";

interface FormData {
  email: string;
  nickname: string;
}

export interface LoginContextType {
  formData: FormData;
  handleFormDataChange: (key: keyof FormData, value: string) => void;
  isEmailValid: boolean;
  isNicknameValid: boolean;
}

const LoginLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const isLastPage = location.pathname === `/login/nickname`;

  const handleNext = () => {
    if (location.pathname === ROUTE_PATH.EMAIL) {
      if (isEmailValid) {
        navigate(ROUTE_PATH.NICKNAME);
      }
    } else if (isLastPage && isNicknameValid) {
      // 닉네임을 localStorage에 저장
      localStorage.setItem("access_token", formData.nickname);
      navigate(ROUTE_PATH.HOME);
    }
  };

  const handleFormDataChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    } else if (key === "nickname") {
      setIsNicknameValid(value.trim().length > 0);
    }
  };

  const isButtonActive =
    location.pathname === ROUTE_PATH.EMAIL ? isEmailValid : isNicknameValid;

  return (
    <div className="flex h-dvh w-full flex-col items-center p-6">
      <Outlet
        context={{
          formData,
          handleFormDataChange,
          isEmailValid,
          isNicknameValid,
        }}
      />
      <Button
        size="big"
        active={isButtonActive}
        text="다음으로"
        onClickHandler={handleNext}
        bgColor="dark"
      />
    </div>
  );
};

export default LoginLayout;
