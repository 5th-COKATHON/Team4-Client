import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "big" | "small";
  active: boolean;
  text: string;
  bgColor: "light" | "dark" | "gray";
  onClickHandler: () => void;
}

const bgColorStyle = {
  light:
    "bg-primary-light-2 text-primary-normal dark:bg-primary-normal dark:text-white",
  dark: "bg-primary-normal text-white dark:bg-primary-medium",
  gray: "bg-gray-100 text-gray-500 dark:bg-gray-500 dark:text-gray-800",
  non: "bg-primary-light-1 text-primary-light-3 dark:bg-gray-700 dark:text-gray-300",
};

/**
 * 공통 Button
 * @param size  버튼 크기
 * @param active 활성화 상태
 * @param text 버튼 글귀
 * @param bgColor 배경 색상
 * @param onClickHandler 버튼 클릭 콜백 함수
 * @returns
 */
const Button = ({
  size,
  active,
  text,
  bgColor,
  className,
  onClickHandler,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${size === "big" ? "w-[20.4375rem]" : "w-[9.6875rem]"} ${
        active
          ? bgColorStyle[bgColor]
          : `${bgColorStyle.non} pointer-events-none`
      } ${className} rounded-200 py-600 font-Binggrae text-body-1 font-regular transition duration-200`}
      onClick={onClickHandler}
      {...props} // ...props는 추가적인 속성들을 전달
    >
      {text}
    </button>
  );
};

export default Button;
