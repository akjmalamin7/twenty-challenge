/*************************
 * Component Props
 *************************/
interface TabOptions {
  id: string;
  title: string;
  children?: React.ReactNode;
}
type BaseProps = React.HTMLAttributes<HTMLDivElement>;
export interface TabProps extends BaseProps {
  defaultTab?: string;
  tabButtonSize?: "normal" | "cover";
  tabButtonStyle?: "normal" | "underline";
  separator?: boolean;
  tabs?: TabOptions[];
  onTabSelect?: (id: string) => void;
}
