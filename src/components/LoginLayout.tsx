// LoginLayout.tsx
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { ROUTE_PATH } from "@/router";
import { memberApi } from "@/api";
import axios from "axios";

interface FormData {
  email: string;
  nickname: string;
  memberId?: number;
}

export interface LoginContextType {
  formData: FormData;
  handleFormDataChange: (key: keyof FormData, value: string) => void;
  isEmailValid: boolean;
  isNicknameValid: boolean;
  isLoading: boolean;
  error: string | null;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLastPage = location.pathname === `/login/nickname`;

  const handleNext = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (location.pathname === ROUTE_PATH.EMAIL) {
        if (isEmailValid) {
          // Check email duplication and get memberId
          const response = await memberApi.checkEmail(formData.email);
          setFormData((prev) => ({
            ...prev,
            memberId: response.data.memberId,
          }));
          navigate(ROUTE_PATH.NICKNAME);
        }
      } else if (isLastPage && isNicknameValid) {
        // Check nickname duplication
        await memberApi.checkNickname(formData.nickname);

        // Join member
        const memberId = await memberApi.join({
          email: formData.email,
          nickname: formData.nickname,
        });

        

        // Save memberId to localStorage
        localStorage.setItem("access_token", String(memberId));
        navigate(ROUTE_PATH.HOME);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "오류가 발생했습니다.");
      } else {
        setError("오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
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
          isLoading,
          error,
        }}
      />
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <Button
        size="big"
        active={isButtonActive && !isLoading}
        text={isLoading ? "처리 중..." : "다음으로"}
        onClickHandler={handleNext}
        bgColor="dark"
        disabled={isLoading}
      />
    </div>
  );
};

export default LoginLayout;
