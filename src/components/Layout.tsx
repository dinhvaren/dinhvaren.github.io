import { CustomCursor } from './CustomCursor';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}