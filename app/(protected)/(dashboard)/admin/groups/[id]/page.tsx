import BackButton from "@/components/back-button";
import { getGroupById } from "@/data/group";
import { redirect } from "next/navigation";
import React from "react";
import GroupForm from "../components/group-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function GroupPage({ params }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/groups");
  }

  const group = await getGroupById(id);

  if (!group) {
    redirect("/admin/groups");
  }

  return (
    <>
      <BackButton backPath="/admin/groups" />
      <GroupForm initData={group} />
    </>
  );
}
