"use client";

import DataTable from "@/components/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentMapped } from "@/types/student";
import { Group } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { studentDataTableColumns } from "./columns";
import React, { useState } from "react";
import { useSearchParams } from "@/hooks/use-search-params";
import { Button } from "@/components/ui/button";
import { LuX } from "react-icons/lu";
import { Input } from "@/components/ui/input";

type Props = {
  data: StudentMapped[];
  groups?: Group[];
};

const SEARCH_PARAM = "search";
const GROUP_PARAM = "group";

export default function StudentDataTable({ data, groups }: Props) {
  const { setSearchParams, deleteSearchParams } = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onClearParam = () => {
    deleteSearchParams(GROUP_PARAM);
    setSearchTerm("");
  };

  const onGroupChange = (value: string) => {
    setSearchParams({
      param: GROUP_PARAM,
      value: value,
      replace: true,
    });
    setSearchTerm(value);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      param: SEARCH_PARAM,
      value: e.target.value,
      replace: true,
    });
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-row gap-5 max-w-lg">
          <Input type="search" placeholder="Filtrar por nombre" onChange={onSearch} />
          {groups && (
            <div className="flex flex-row gap-3">
              <Select onValueChange={onGroupChange} value={searchTerm}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por grupo" />
                </SelectTrigger>
                <SelectContent align="start">
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.name}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={onClearParam}>
                <LuX size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <DataTable data={data} columns={studentDataTableColumns} />
    </>
  );
}
