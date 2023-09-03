import { useForm } from "react-hook-form";
import { Box } from "../../../../components";
import FormField from "../../../../components/Fields/FormField";
import FormSelectField from "../../../../components/Fields/FormSelectField";
import categories from "../../../../mocks/categories";
import { SubmitButton } from "../../../../components/Buttons";
export default function SalesForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="flex flex-col gap-2">
                    <FormSelectField register={register} name={"teste"} label={'category'} error={errors} options={categories} />
                    <FormField register={register} name={"name"} type={'text'} label={'Nome'} error={errors} />
                    <FormField register={register} name={"date"} type={'date'} label={'Data'} error={errors} />
                    <FormField register={register} name={"price"} type={'number'} label={'Preço'} error={errors} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <SubmitButton type="submit" >Cadastrar</SubmitButton>
                </Box>
            </form>
        </Box>
    )
}