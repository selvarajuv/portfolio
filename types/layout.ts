// types/layout.ts

export type ClientLayoutProps = {
  children: React.ReactNode;
};

export type NavbarProps = {
  activeSection?: string;
};

export type NavItemProps = {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
};

export type PageLayoutProps = {
  children: React.ReactNode;
  activeSection?: string;
};
