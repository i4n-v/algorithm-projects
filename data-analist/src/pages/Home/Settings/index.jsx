import { useForm } from "react-hook-form";
import { Box } from "../../../components";
import { FormField, FormSelectField } from "../../../components/Fields";
import categories from "../../../mocks/categories";
import CustomArray from "../../../entities/CustomArray";
import { SubmitButton } from "../../../components/Buttons";

export default function Settings({ filters, setFilters }) {
  const { register, handleSubmit } = useForm({
    defaultValues: filters,
  });

  const dimensions = new CustomArray("Ano", "Mês", "Categoria");

  function saveValues(values) {
    setFilters(values);
  }

  return (
    <Box className="bg-transparent/0 grid grid-cols-2 gap-8 py-6">
      <FormField
        register={register}
        label="Data incial"
        type="date"
        name="initial_date"
      />
      <FormField
        register={register}
        label="Data final"
        type="date"
        name="final_date"
      />
      <FormSelectField
        register={register}
        label="Categoria"
        name="category"
        options={categories}
        defaultValue={"-"}
      />
      <Box className="bg-transparent/0">
        <span className="text-title text-violet-400 text-sm">Dimensões</span>
        <Box className="bg-transparent/0 flex gap-2 items-center max-h-8">
          {dimensions
            .map((dimension) => (
              <FormField
                key={dimension}
                register={register}
                label={dimension}
                type="checkbox"
                name="dimensions"
                value={dimension}
              />
            ))
            .getStructure()}
        </Box>
      </Box>
      <SubmitButton
        onClick={handleSubmit(saveValues)}
        className="mt-4 col-span-full"
      >
        Salvar
      </SubmitButton>
    </Box>
  );
}
