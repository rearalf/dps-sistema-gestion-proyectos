export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  allowedRoles?: string[];
}