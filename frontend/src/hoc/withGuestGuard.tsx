import type { ComponentType } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/auth/useAuth";

export function withGuestGuard(WrappedComponent: ComponentType): ComponentType {
  const ComponentWithGuard = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && user) {
        router.replace("/dashboard");
      }
    }, [user, isLoading, router]);

    if (isLoading || user) return null;

    return <WrappedComponent />;
  };

  return ComponentWithGuard;
}
