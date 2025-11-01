import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FormModalProps = {
  title: string;
  trigger?: ReactNode;
  actionTrigger: ReactNode;
  saveButton: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FormModal({
  title,
  trigger,
  actionTrigger,
  saveButton,
  children,
  open,
  onOpenChange,
}: FormModalProps) {
  return (
    <Dialog.Root
      placement={"center"}
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor={"white"} maxW={"90vw"} w={"50vw"}>
            <Dialog.Header color={"black"}>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                {actionTrigger}
              </Dialog.ActionTrigger>
              {saveButton}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                color={"black"}
                _hover={{ bg: "gray.200" }}
                size={"sm"}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
