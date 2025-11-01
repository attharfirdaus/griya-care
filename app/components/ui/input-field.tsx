import { Field, Input, Span, Text, Textarea } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { PasswordInput } from "./password-input";

type InputFieldProps = {
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  type?: string;
  size?: "xs" | "sm" | "md" | "lg";
  name: string;
};

export default function InputField({
  placeholder,
  label,
  isRequired = false,
  type = "text",
  size = "md",
  name,
}: InputFieldProps) {
  const { control } = useFormContext();

  return (
    <Field.Root>
      {label && (
        <Field.Label>
          <Text fontSize={"sm"} color={"gray.700"}>
            {label}
          </Text>
          {isRequired && <Span color={"red.500"}>*</Span>}
        </Field.Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              color={"black"}
              border={"1.5px solid #E2E8F0"}
              bg={"white"}
              borderRadius={"lg"}
            />

            {error && (
              <Text fontSize={"xs"} color={"red.500"}>
                {error.message}
              </Text>
            )}
          </>
        )}
      ></Controller>
    </Field.Root>
  );
}

type PasswordFieldProps = {
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  name: string;
};

export function PasswordField({
  placeholder,
  label,
  isRequired = false,
  size = "md",
  name,
}: PasswordFieldProps) {
  const { control } = useFormContext();

  return (
    <Field.Root>
      {label && (
        <Field.Label>
          <Text fontSize="sm" color="gray.700">
            {label}
          </Text>
          {isRequired && <Span color="red.400"> *</Span>}
        </Field.Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <PasswordInput
              {...field}
              placeholder={placeholder}
              size={size}
              color="black"
              border="1.5px solid #E2E8F0"
              bg="white"
              borderRadius="lg"
            />

            {error && (
              <Text fontSize="xs" color="red.500">
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </Field.Root>
  );
}

type TextAreaFieldProps = {
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  name: string;
  rows?: number;
};

export const TextAreaField = ({
  placeholder,
  label,
  isRequired = false,
  size = "md",
  name,
  rows = 4,
}: TextAreaFieldProps) => {
  const { control } = useFormContext();

  return (
    <Field.Root>
      {label && (
        <Field.Label>
          <Text fontSize={"sm"} color={"gray.700"}>
            {label}
          </Text>
          {isRequired && <Span color="red.400"> *</Span>}
        </Field.Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              placeholder={placeholder}
              size={size}
              color={"black"}
              border="1.5px solid #E2E8F0"
              bg={"white"}
              borderRadius={"lg"}
              rows={rows}
              resize={"vertical"}
            />
            {error && (
              <Text fontSize={"xs"} color={"red.500"}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </Field.Root>
  );
};
