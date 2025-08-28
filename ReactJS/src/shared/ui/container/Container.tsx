interface Props {
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Container = ({ children, size = "xl" }: Props) => {
  const sizes: Record<NonNullable<Props["size"]>, string> = {
    xs: "max-w-[540px]",
    sm: "max-w-[798px]",
    md: "max-w-[1064px]",
    lg: "max-w-[1260px]",
    xl: "max-w-[1360px]",
  };

  return (
    <div className={`${sizes[size]} w-full px-4 mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
