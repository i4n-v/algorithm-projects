import { useForm } from "react-hook-form";
import { Box } from "../../../../components";
import FormField from "../../../../components/Fields/FormField";
import FormSelectField from "../../../../components/Fields/FormSelectField";
import categories from "../../../../mocks/categories";
import { SubmitButton } from "../../../../components/Buttons";
import { useContext, useEffect } from "react";
import CustomArray from "../../../../entities/CustomArray";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";
import * as yup from "yup";
import { GlobalContext } from "../../../../contexts/GlobalContext";
export default function SalesForm() {
    const { sales, setSales } = useContext(GlobalContext)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(yup.object().shape({
            date: yup.string().required('É requerido'),
            category: yup.string().required('É requerido'),
            name: yup.string().required('É requerido'),
            price: yup.number().typeError("Deve ser um numero valido.").required('É requerido').nullable(),
        }))
    });
    const onSubmit = ({ date, category, name, price }) => {


        const year = date.split('-')[0]
        const month = date.split('-')[1]
        const day = date.split('-')[2]
        const yearIndex = getYearIndex(parseInt(year))

        const product = {
            "id": v4(),
            "name": name,
            "category": category,
            "price": parseFloat(price),
            "date": date,
            "day": parseInt(day),
            "month": parseInt(month),
            "year": parseInt(year)
        }

        reset()
        if (yearIndex === -1) {
            sales.push(new CustomArray(new CustomArray(new CustomArray(product))))
            return
        }

        const monthIndex = getMonthIndex(yearIndex, parseInt(month))
        if (monthIndex === -1) {
            sales.getValue(yearIndex).push(new CustomArray(new CustomArray(product)))
            return
        }

        const categoryIndex = getCategoryIndex(yearIndex, monthIndex, category)
        if (categoryIndex === -1) {
            sales.getValue(yearIndex).getValue(monthIndex).push(new CustomArray(product))
            return
        }

        sales.getValue(yearIndex).getValue(monthIndex).getValue(categoryIndex).push(product)
        return
    };


    function getYearIndex(year) {
        return sales.findIndex((data) => {
            return data.getValue(0).getValue(0).getValue(0)?.year === year
        })
    }

    function getMonthIndex(yearIndex, month) {
        return sales.getValue(yearIndex)?.findIndex((data) => {
            return data.getValue(0)?.getValue(0)?.month === month
        })
    }

    function getCategoryIndex(yearIndex, monthIndex, category) {
        return sales.getValue(yearIndex)?.getValue(monthIndex)?.findIndex((data) => {
            return data?.getValue(0)?.category === category
        })
    }


    useEffect(() => {

    }, [])
    return (
        <Box >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="flex flex-col gap-6 ">
                    <FormSelectField register={register} name={"category"} label={'category'} error={errors} options={categories} />
                    <FormField register={register} name={"name"} type={'text'} label={'Nome'} error={errors} />
                    <FormField register={register} name={"date"} type={'date'} label={'Data'} error={errors} />
                    <FormField register={register} name={"price"} type={'number'} label={'Preço'} error={errors} />
                    <SubmitButton type="submit" >Cadastrar</SubmitButton>
                </Box>
            </form>
        </Box>
    )
}