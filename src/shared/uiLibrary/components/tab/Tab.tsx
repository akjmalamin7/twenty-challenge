import "@/shared/uiLibrary/assets/scss/atoms/tab.scss";
import classNames from "classnames";
import { forwardRef, useState } from "react";
import { Text } from "../text";
import type { TabProps } from "./Tab.props";

const Tab = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const {
    defaultTab,
    tabButtonSize = "normal",
    tabButtonStyle = "underline",
    separator = true,
    tabs,
    onTabSelect,
    ...rest
  } = props;
  const [tabItem, setTabItem] = useState(() => {
    if (defaultTab) return defaultTab;
    return tabs?.[0]?.id ?? "";
  });
  const handleTab = (id: string) => {
    setTabItem(id);
    if (typeof onTabSelect === "function") {
      onTabSelect(id);
    }
  };

  return (
    <div className="tab" ref={ref} {...rest}>
      <div className="tab--nav-scroll">
        <div className="tab--nav-wrapper">
          <ul className={classNames("tab--nav", { "tab--separator": separator })}>
            {tabs?.map((tab) => (
              <li
                key={tab.id}
                className={classNames(
                  "nav--item",
                  tabItem === tab.id && "nav--item-active",
                  `nav--style-${tabButtonStyle}`,
                  `nav--item-${tabButtonSize}`
                )}
                onClick={() => handleTab(tab?.id)}
              >
                <Text
                  size={"md"}
                  weight="regular"
                  color={tabItem === tab.id ? "primary" : "secondary"}
                  alignment={tabButtonSize === "cover" ? "center" : "start"}
                >
                  {tab.title}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="tab--content"> {tabs?.find((tab) => tab.id === tabItem)?.children}</div>
    </div>
  );
});
Tab.displayName = "Tab";
export default Tab;
