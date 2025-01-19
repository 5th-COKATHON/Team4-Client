// Email.tsx
import { LoginContextType } from "@/components/LoginLayout";
import { Input } from "@/components/ui/input";
import { useOutletContext } from "react-router-dom";

const Email: React.FC = () => {
  const { formData, handleFormDataChange, isEmailValid, isLoading } =
    useOutletContext<LoginContextType>();

  return (
    <div className="flex h-full flex-grow flex-col pt-24 gap-24 w-full">
      <div className="text-center font-bold text-title-2">
        가입할 이메일을 입력해주세요
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="Email"
          className={`min-w-full ${
            !isEmailValid && formData.email !== "" ? "border-red-500" : ""
          }`}
          value={formData.email}
          onChange={(e) => handleFormDataChange("email", e.target.value)}
          disabled={isLoading}
        />
        {!isEmailValid && formData.email !== "" && (
          <p className="text-sm text-red-500">올바른 이메일 형식이 아닙니다</p>
        )}
      </div>
    </div>
  );
};

export default Email;
