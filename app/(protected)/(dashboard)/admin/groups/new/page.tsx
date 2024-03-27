import BackButton from "@/components/back-button";
import React from "react";
import GroupForm from "../components/group-form";

export default function NewGroupPage() {
  return (
    <div>
      <BackButton backPath="/admin/groups/" />
      <GroupForm />
    </div>
  );
}
