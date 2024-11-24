export type ButtonProps = {
  size?: "small" | "medium" | "large";
  bgColor: "blue" | "black" | "red" | "gray" | "white";
  textColor?: "white" | "black";
  rounded: "lg" | "full"; //lgは角丸、fullは半円
  className?: string;
  // ここまでスタイリングのプロップス
  children: React.ReactNode;
};

const SubmitButton: React.FC<ButtonProps> = ({
  size,
  bgColor,
  textColor,
  rounded,
  className,
  children,
}) => {
  let sizeClass = "";
  switch (size) {
    case "small":
      sizeClass = "w-[6rem] sm:w-[8rem] md:w-[10rem]";
      break;
    case "medium":
      sizeClass = "w-[8rem] sm:w-[10rem] md:w-[12rem]";
      break;
    case "large":
      sizeClass = "w-[10rem] sm:w-[12rem] md:w-[14rem]";
      break;
    default:
      sizeClass = "w-auto";
  }
  let bgColorClass = "";
  switch (bgColor) {
    case "blue":
      bgColorClass = "bg-bblue";
      break;
    case "black":
      bgColorClass = "bg-bblack";
      break;
    case "red":
      bgColorClass = "bg-bred";
      break;
    case "gray":
      bgColorClass = "bg-bgray";
      break;
    case "white":
      bgColorClass = "bg-bwhite";
      break;
    default:
      bgColorClass = "bg-bblack";
  }

  let textColorClass = "";
  switch (textColor) {
    case "black":
      textColorClass = "text-bblack";
      break;
    case "white":
      textColorClass = "text-bwhite";
      break;
    default:
      textColorClass = "bwhite";
  }

  let roundedClass = "";
  switch (rounded) {
    case "lg":
      roundedClass = "rounded-lg";
      break;
    case "full":
      roundedClass = "rounded-full";
      break;
    default:
      roundedClass = "rounded-lg";
  }

  return (
    <button
      className={`${sizeClass} ${bgColorClass} ${textColorClass} ${roundedClass} ${className || ""} px-3 py-1 m-1 hover:scale-105 transition-transform duration-100 active:scale-95 `}
      type="submit"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
