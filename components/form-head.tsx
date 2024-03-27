import { Separator } from "./ui/separator";

type Props = {
  title: string;
};

export default function FormHead({ title }: Props) {
  return (
    <div className="mb-4">
      <h1 className="text-primary text-lg mb-2 font-bold">{title}</h1>
      <Separator />
    </div>
  );
}
