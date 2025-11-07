import {
  Combobox,
  createListCollection,
  Field,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Options = {
  label: string;
  value: string;
};

type BaseSelectProps = {
  placeholder?: string;
  items: Options[];
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  isRequired?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
};

export default function BaseSelect({
  placeholder,
  items,
  size = "md",
  label,
  isRequired = false,
  value: externalValue,
  defaultValue,
  onChange,
  name,
}: BaseSelectProps) {
  const collection = createListCollection({ items });
  const form = useFormContext();
  const isInForm = !!(form && name);
  const value = isInForm
    ? form.watch(name!)
    : (externalValue ?? defaultValue ?? "");

  function handleChange(e: { value: string[] }) {
    const first = e.value[0] || "";

    if (isInForm) {
      form.setValue(name!, first, { shouldValidate: true });
    }

    onChange?.(first);
  }

  const errorMessage =
    isInForm && name ? (form.formState.errors[name]?.message as string) : "";

  return (
    <Field.Root required={isRequired}>
      {label && (
        <Field.Label color="gray.700">
          {label}
          {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
      )}
      <Select.Root
        size={size}
        collection={collection}
        color="black"
        value={value ? [value] : undefined}
        defaultValue={defaultValue ? [defaultValue] : undefined}
        onValueChange={handleChange}
      >
        {isInForm && name ? (
          <Select.HiddenSelect {...form.register(name)} />
        ) : (
          <Select.HiddenSelect />
        )}
        <Select.Control>
          <Select.Trigger
            border={"1.5px solid #E2E8F0"}
            borderRadius={"lg"}
            bg={"white"}
            cursor={"pointer"}
          >
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content
              bg={"white"}
              shadow={"lg"}
              borderRadius={"md"}
              zIndex={2000}
            >
              {items.map((item) => (
                <Select.Item
                  item={item}
                  key={item.value}
                  color={"black"}
                  _hover={{ bg: "gray.200" }}
                  cursor={"pointer"}
                >
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      {errorMessage && (
        <Text color={"red.500"} fontSize={"12px"}>
          {errorMessage}
        </Text>
      )}
    </Field.Root>
  );
}

type BaseComboboxProps = {
  placeholder?: string;
  items: Options[];
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  isRequired?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  filterable?: boolean;
};

export function BaseCombobox({
  placeholder,
  items,
  size = "md",
  label,
  isRequired,
  value: externalValue,
  defaultValue,
  onChange,
  name,
  filterable,
}: BaseComboboxProps) {
  const [query, setQuery] = useState("");
  const filteredItems =
    filterable && query
      ? items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
      : items;

  const collection = createListCollection({ items: filteredItems });
  const form = useFormContext();
  const isInForm = !!(form && name);
  const watchedValue = isInForm ? form.watch(name!) : undefined;

  const currentValue = watchedValue ?? externalValue ?? defaultValue ?? "";

  function handleChange(e: { value: string[] }) {
    const first = e.value[0] || "";

    if (isInForm) {
      form.setValue(name!, first, { shouldValidate: true });
    }

    onChange?.(first);
  }

  const errorMessage =
    isInForm && name ? (form.formState.errors[name]?.message as string) : "";

  return (
    <Field.Root required={isRequired}>
      {label && (
        <Field.Label color={"gray.700"}>
          {label}
          {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
      )}

      <Combobox.Root
        size={size}
        collection={collection}
        value={currentValue ? [currentValue] : undefined}
        defaultValue={defaultValue ? [defaultValue] : undefined}
        onValueChange={handleChange}
      >
        <Combobox.Control>
          <Combobox.Input
            placeholder={placeholder}
            border={"1.5px solid #E2E8F0"}
            borderRadius={"lg"}
            bg={"white"}
            color={"black"}
            value={
              query || items.find((i) => i.value === currentValue)?.label || ""
            }
            onChange={(e) => setQuery(e.target.value)}
          />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger color={"gray.400"} />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content
              bg={"white"}
              shadow={"lg"}
              borderRadius={"md"}
              zIndex={2000}
              maxH={"200px"}
              overflowY={"auto"}
            >
              <Combobox.Empty color={"black"}>Tidak ada hasil</Combobox.Empty>
              {filteredItems.map((item) => (
                <Combobox.Item
                  item={item}
                  key={item.value}
                  color={"black"}
                  _hover={{ bg: "gray.200" }}
                  cursor={"pointer"}
                  onClick={() => setQuery(item.label)}
                >
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>

      {errorMessage && (
        <Text color={"red.500"} fontSize={"12px"}>
          {errorMessage}
        </Text>
      )}
    </Field.Root>
  );
}
