import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/constants/navigation";

function useSidebar(){
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (!item.allowedRoles) return true;
    return user && item.allowedRoles.includes(user.rol);
  });

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    pathname,
    filteredNavItems
  }
}

export default useSidebar