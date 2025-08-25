import AVATAR_IMG from "@/shared/uiLibrary/assets/images/avatar.png";
import "@/shared/uiLibrary/assets/scss/atoms/avatar.scss";
import { generateRadiusClasses, getResponsiveClasses } from "@/shared/uiLibrary/utils/dynamicClass";
import type { RadiusProps, ResponsiveRadiusSideProps } from "@/shared/uiLibrary/utils/types";
import classNames from "classnames";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box } from "../box";
import { Button } from "../button";
import { Input } from "../input";
import { SoppiyaIcon } from "../soppiyaIcon";
import { Text } from "../text";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export interface UserAvatarProps extends React.ComponentProps<"div"> {
  size?: { xs: Sizes; sm?: Sizes; md?: Sizes; lg?: Sizes } | Sizes;
  name?: string;
  src?: string;
  radius?: RadiusProps | ResponsiveRadiusSideProps;
  editAble?: boolean;
  onChangeUrl?: (file: File, src: string) => void;
  onRemove?: () => void;
}

const SPACING = 8; // space between avatar button and dropdown
const VIEWPORT_PADDING = 8;

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>((props, ref) => {
  const { size = "md", name, src, radius = 3, className, editAble = false, onChangeUrl, onRemove, ...rest } = props;

  const [toggleEdit, setToggleEdit] = useState(false);
  const avatarEditBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Position and placement state for dropdown menu
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom" | "left" | "right">("bottom");

  const handleToggleEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  /* file handling */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (src) {
        URL.revokeObjectURL(src);
      }
      onChangeUrl?.(file, fileUrl);
      setToggleEdit(false);
    }
  };
  const handleRemovePhoto = () => {
    onRemove?.();
    setToggleEdit(false);
  };
  // Close dropdown on outside click
  useEffect(() => {
    if (!toggleEdit) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        avatarEditBtnRef.current &&
        !avatarEditBtnRef.current.contains(e.target as Node)
      ) {
        setToggleEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleEdit]);

  // Calculate dropdown position
  const calculateMenuPosition = () => {
    if (!avatarEditBtnRef.current || !dropdownRef.current) return;

    const btnRect = avatarEditBtnRef.current.getBoundingClientRect();
    const menuRect = dropdownRef.current.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const padding = VIEWPORT_PADDING;

    const spaceBelow = vh - btnRect.bottom;
    let top = 0;
    let left = btnRect.left + window.scrollX;
    let placement: "top" | "bottom" = "bottom";

    if (spaceBelow >= menuRect.height + SPACING + padding) {
      top = btnRect.bottom + SPACING + window.scrollY - 6;
      placement = "bottom";
    } else {
      top = btnRect.top - menuRect.height - SPACING + window.scrollY + 6;
      placement = "top";
    }

    left = Math.min(Math.max(left, padding), vw - menuRect.width - padding);

    setMenuPlacement(placement);
    setMenuPosition({ top, left });
  };

  useEffect(() => {
    if (!toggleEdit) return;
    calculateMenuPosition();

    window.addEventListener("resize", calculateMenuPosition);
    window.addEventListener("scroll", calculateMenuPosition);

    return () => {
      window.removeEventListener("resize", calculateMenuPosition);
      window.removeEventListener("scroll", calculateMenuPosition);
    };
  }, [toggleEdit]);

  const colorSet: Record<string, string> = {
    set1: "#5F27CD",
    set2: "#008060",
    set3: "#E66767",
    set4: "#B98900",
  };

  const alphabetSet: Record<string, string> = {
    set1: "AEIMQUY",
    set2: "BFSNRVZ",
    set3: "CGKOSWJ",
    set4: "DHLPTX",
  };

  const interpretCharacterColor = (char: string) => {
    for (const set of Object.keys(alphabetSet)) {
      if (alphabetSet[set].includes(char)) {
        return colorSet[set];
      }
    }
    return "";
  };

  function handleAvatarName(name: string): { initials: string; color: string } {
    const splitName = name.trim().split(" ");
    let initials = "";

    if (splitName.length > 1) {
      initials = splitName[0].charAt(0).toLocaleUpperCase() + splitName[1].charAt(0).toLocaleUpperCase();
    } else {
      if (name.length >= 2) {
        initials = name.slice(0, 2).toLocaleUpperCase();
      } else {
        initials = name.charAt(0).toLocaleUpperCase() + name.charAt(0).toLocaleUpperCase();
      }
    }

    const color = interpretCharacterColor(initials[0]);
    return { initials, color };
  }

  let avatarColor = "transparent";
  let initials = "";

  if (name && name.trim()) {
    const result = handleAvatarName(name);
    initials = result.initials;
    avatarColor = result.color || "transparent";
  }

  function displayNameSize(name: string) {
    switch (size) {
      case "xs":
        return (
          <Text size="sm" weight="semibold" color="white">
            {name}
          </Text>
        );
      case "sm":
        return (
          <Text size="md" weight="semibold" color="white">
            {name}
          </Text>
        );
      case "md":
        return (
          <Text size="lg" weight="semibold" color="white">
            {name}
          </Text>
        );
      case "lg":
        return (
          <Text size="lg" weight="semibold" color="white">
            {name}
          </Text>
        );
      case "xl":
        return (
          <Text as="h3" weight="semibold" color="white">
            {name}
          </Text>
        );
      case "xxl":
        return (
          <Text as="h2" weight="semibold" color="white">
            {name}
          </Text>
        );
      case "xxxl":
        return (
          <Text as="h1" weight="semibold" color="white">
            {name}
          </Text>
        );
      default:
        return (
          <Text size="lg" weight="semibold" color="white">
            {name}
          </Text>
        );
    }
  }

  let avatarElement: React.ReactNode;
  if (src) {
    avatarElement = (
      <img className={classNames("avatar-image", generateRadiusClasses(radius))} src={src} alt="avatar" loading="lazy" />
    );
  } else if (name && name.trim()) {
    avatarElement = displayNameSize(initials);
  } else {
    avatarElement = (
      <img className={classNames("avatar-image", generateRadiusClasses(radius))} src={AVATAR_IMG} alt="avatar" loading="lazy" />
    );
  }

  const userAvatarClasses = classNames(
    "avatar",
    className,
    getResponsiveClasses("avatar", size),
    generateRadiusClasses(radius)
  );

  // Dropdown menu portal node
  const dropdownMenu =
    toggleEdit === true
      ? createPortal(
        <div
          ref={dropdownRef}
          className="avatart--dropdown floating-menu"
          style={{
            position: "absolute",
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 9999,
            pointerEvents: "auto",
            minWidth: 160,
          }}
        >
          <Box background="white" border radius={8}>
            <ul className="menu">
              <li className="menu--item">
                <Button
                  variant="plain"
                  className="menu--item-button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <Text size="lg" color="primary">
                    Upload photo
                  </Text>
                  <Input
                    className="hidden"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Button>
              </li>
              <li className="menu--item">
                <Button
                  variant="plain"
                  className="menu--item-button"
                  onClick={handleRemovePhoto}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <Text size="lg" color="primary">
                    Remove photo
                  </Text>
                </Button>
              </li>
            </ul>
          </Box>
        </div>,
        document.body
      )
      : null;

  return (
    <>
      <div
        ref={ref}
        className={userAvatarClasses}
        {...rest}
        style={{
          background: src ? "transparent" : avatarColor,
          border: src ? "1px solid #B9B3AE" : "",
          position: "relative",
        }}
        menu-position={menuPlacement}
      >
        {avatarElement}

        {editAble && (
          <div className="avatar-edit">
            <Button
              variant="fill"
              color="white"
              className="edit-button"
              size="sm"
              ref={avatarEditBtnRef}
              onClick={handleToggleEdit}
              type="button"
              aria-haspopup="true"
              aria-expanded={toggleEdit}
              aria-controls="avatar-edit-menu"
            >
              <SoppiyaIcon icon="edit.svg" size="sm" />
              <Text size="md">Edit</Text>
            </Button>
          </div>
        )}
      </div>

      {dropdownMenu}
    </>
  );
});

UserAvatar.displayName = "UserAvatar";
export default UserAvatar;
