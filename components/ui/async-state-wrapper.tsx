// components/ui/async-state-wrapper.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";

type AsyncStateWrapperProps = {
  loading: boolean;
  error: string | null;
  notFound: boolean;
  loadingMessage?: string;
  notFoundTitle?: string;
  notFoundMessage?: string;
  children: React.ReactNode;
  activeSection?: string;
};

export default function AsyncStateWrapper({
  loading,
  error,
  notFound,
  loadingMessage = "Loading...",
  notFoundTitle = "Not found",
  notFoundMessage = "The requested item could not be found.",
  children,
  activeSection = "home",
}: AsyncStateWrapperProps) {
  // Loading state
  if (loading) {
    return (
      <PageLayout activeSection={activeSection}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-lg">{loadingMessage}</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout activeSection={activeSection}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 bg-red-900/20 p-4 rounded-lg mb-4">
              {error}
            </div>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <PageLayout activeSection={activeSection}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {notFoundTitle}
            </h1>
            <p className="text-gray-400 mb-4">{notFoundMessage}</p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Success state - render children
  return <>{children}</>;
}
