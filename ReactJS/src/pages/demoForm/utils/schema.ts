import * as yup from "yup";

export const formSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  subject: yup.string().required("Subject is required"),
  gender: yup.string().required("Gender is required"),
  terms: yup.boolean().oneOf([true], "You must accept terms").required(),
  all: yup.boolean().default(false),
});
export type FormDefaultValue = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  gender: string;
  terms: boolean;
  all: boolean;
}

export type FormData = yup.InferType<typeof formSchema>;