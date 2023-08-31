import { useForm } from "react-hook-form";

export default function Settings() {
  const { register } = useForm();

  return <div {...register()}>index</div>;
}
