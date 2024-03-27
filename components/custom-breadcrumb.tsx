"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import { normalizeString } from "@/lib/utils";

const EXCLUDE_PATHS = ["admin"];

export default function CustomBreadcrumb() {
  const pathanme = usePathname();

  const paths = pathanme.split("/").filter((path) => path !== "" && !EXCLUDE_PATHS.includes(path));

  return (
    <div className="mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <>
              <BreadcrumbItem key={path}>
                {index === paths.length - 1 ? (
                  <BreadcrumbPage>{normalizeString(path)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>{normalizeString(path)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== paths.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
