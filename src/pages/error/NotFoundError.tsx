import React from "react";
import NotFoundAnimation from "@/components/NotFoundAnimation";
import Button from "@/components/Button";

/**
 * 404 오류 화면
 * @returns
 */
const NotFoundError = () => {
  return (
    <div className="flex h-dvh w-full flex-col">
      <div className="flex h-full flex-col items-center">
        <div className="flex flex-grow items-center justify-center">
          <div className="flex flex-col items-center gap-600 w-[90%]">
            <NotFoundAnimation />
          </div>
        </div>
        <div className="mb-[1.875rem]">
          <Button
            size="big"
            active={true}
            text="홈으로 돌아가기"
            onClickHandler={() => window.location.replace("/")}
            bgColor="light"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundError;
