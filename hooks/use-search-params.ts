"use client";

import {
  usePathname,
  useSearchParams as useNavigationSearchParams,
  useRouter,
} from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const useSearchParams = () => {
  const [params, setParams] = useState<Record<string, string>[]>();

  const searchParams = useNavigationSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const current = useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams]
  );

  const getSearchParams = (param: string) => {
    return current.get(param);
  };

  const deleteSearchParams = (param: string, value?: string) => {
    if (!param) {
      current.delete(param);
    }
    current.delete(param, value);

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const setSearchParams = ({
    param,
    value,
    replace = false,
  }: {
    param: string;
    value: string;
    replace?: boolean;
  }) => {
    const existingValue = current.get(param);

    if (!replace && existingValue) {
      current.append(param, value);
    }

    if (!value && existingValue) {
      current.delete(param);
    }

    if (value && (!existingValue || replace)) {
      current.set(param, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    setParams(
      Array.from(current.entries()).map(([key, value]) => ({
        [key]: value,
      }))
    );
  }, [current]);

  return {
    setSearchParams,
    deleteSearchParams,
    getSearchParams,
    params,
  };
};
