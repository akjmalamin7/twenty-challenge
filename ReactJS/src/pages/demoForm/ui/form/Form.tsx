import { BlockStack, Button, Checkbox, InlineStack, Input, Radio, Select, Text } from "@/shared/uiLibrary/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { formSchema, type FormData, type FormDefaultValue } from "../../utils/schema";



const formDefaultValues: FormDefaultValue = {
  name: "",
  email: "",
  phone: "",
  subject: "bangla",
  gender: "",
  terms: false,
  all: false,
};
const Form = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: formDefaultValues
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Submitted ✅", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BlockStack gapY={70}>

        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input label="Name" {...field} error={{ status: !!errors.name, message: errors.name?.message || "" }} />}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input type="email" label="Email" {...field} error={{ status: !!errors.email, message: errors.email?.message || "" }} />}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <Input label="Phone" {...field} error={{ status: !!errors.phone, message: errors.phone?.message || "" }} />}
        />

        {/* Subject */}
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              label="Subject"
              options={[
                { name: "Bangla", value: "bangla" },
                { name: "English", value: "english" },
              ]}
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={{ status: !!errors.subject, message: errors.subject?.message || "" }}
            />
          )}
        />

        {/* Gender */}
        <InlineStack alignItems="center" gapX={70}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Radio
                  label="Male"
                  variant="primary"
                  value="male"
                  checked={field.value === "male"}
                  onChange={() => field.onChange("male")}
                />
                <Radio
                  label="Female"
                  variant="primary"
                  value="female"
                  checked={field.value === "female"}
                  onChange={() => field.onChange("female")}
                />
              </>
            )}
          />
        </InlineStack>
        {errors.gender && <Text color="danger">{errors.gender.message}</Text>}

        {/* Terms & All */}
        <InlineStack alignItems="center" gapX={70}>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Terms Condition"
                checked={!!field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="all"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="All"
                checked={!!field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </InlineStack>
        {errors.terms && <Text color="danger">{errors.terms.message}</Text>}

        {/* Submit */}
        <BlockStack>
          <Button type="submit">Submit</Button>
        </BlockStack>

      </BlockStack>
    </form>
  );
};

export default Form;
