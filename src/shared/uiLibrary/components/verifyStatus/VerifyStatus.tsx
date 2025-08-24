import { NotVerifyIcon, VerifiedIcon } from "@/shared/uiLibrary/assets/icons";
import "@/shared/uiLibrary/assets/scss/atoms/verifyStatus.scss";
import React, { forwardRef } from "react";
import { Text } from "../text";
export interface VerifyStatusProps extends React.ComponentProps<'div'> {
  status?: "verified" | "unverified";
}
const VerifyStatus = forwardRef<HTMLDivElement, VerifyStatusProps>((props, ref) => {
  const { status = "unverified", ...rest } = props;
  return (
    <div ref={ref} {...rest} className={`verified-status ${status}`}>
      {status === "verified" ? (
        <>
          <VerifiedIcon />
          <Text as="span" size="md" color="success">Verified</Text>
        </>
      ) : (
        <>
          <NotVerifyIcon />
          <Text as="span" size="md" color="warning">Not Verified</Text>
        </>
      )}
    </div>
  );
});
VerifyStatus.displayName = "VerifyStatus";
export default VerifyStatus;