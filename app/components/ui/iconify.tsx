import { Flex, type FlexProps } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function Iconify({
  icon,
  boxSize = "16px",
  ...rest
}: Omit<FlexProps, "flexShrink" | "boxsize"> & {
  icon: string;
  boxSize?: string | number;
  color?: string;
}) {
  const size =
    typeof boxSize === "number" ? `${boxSize}px` : (boxSize as string);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      w={size}
      h={size}
      flexShrink={0}
      {...rest}
    >
      <Icon
        icon={icon}
        width={size}
        height={size}
        style={{ display: "block", width: size, height: size }}
      />
    </Flex>
  );
}
