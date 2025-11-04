import type React from "react";
import { useContactInfo } from "@/hooks/useContactInfo";
import { createWhatsAppGeneralInquiryUrl } from "@/lib/whatsapp";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

export interface KnowMoreButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  onMobileMenuClose?: () => void;
}

export const KnowMoreButton: React.FC<KnowMoreButtonProps> = ({
  onMobileMenuClose,
  ...buttonProps
}) => {
  const { data: contactInfo } = useContactInfo();

  const handleClick = () => {
    if (contactInfo) {
      const url = createWhatsAppGeneralInquiryUrl(contactInfo.phone);
      window.open(url, "_blank");
      onMobileMenuClose?.();
    }
  };

  return (
    <Button onClick={handleClick} {...buttonProps}>
      Know More
    </Button>
  );
};

