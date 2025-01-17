import { LoginContextType } from "@/components/LoginLayout";
import { Input } from "@/components/ui/input";
import React from "react";
import { useOutletContext } from "react-router-dom";

const Nickname: React.FC = () => {
  const { formData, handleFormDataChange, isNicknameValid } =
    useOutletContext<LoginContextType>();

  return (
    <div className="flex h-full flex-grow flex-col pt-24 gap-24 w-full">
      <div className="text-center font-bold text-title-2">
        가입할 닉네임을 입력해주세요
      </div>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Nickname"
          className={`min-w-full ${
            !isNicknameValid && formData.nickname !== "" ? "border-red-500" : ""
          }`}
          value={formData.nickname}
          onChange={(e) => handleFormDataChange("nickname", e.target.value)}
        />
        {!isNicknameValid && formData.nickname !== "" && (
          <p className="text-sm text-red-500">닉네임을 입력해주세요</p>
        )}
      </div>
    </div>
  );
};

export default Nickname;
