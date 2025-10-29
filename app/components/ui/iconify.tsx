import { Flex, type FlexProps } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function Iconify({
  icon,
  boxSize = "16px",
  ...rest
}: Omit<FlexProps, "flexShrink" | "boxsize"> & {
  icon: string;
  boxSize?: string;
  color?: string;
}) {
  return (
    <Flex fontSize={boxSize} boxSize={boxSize} flexShrink={0} {...rest}>
      <Icon icon={icon} fontSize={boxSize} />
    </Flex>
  );
}
