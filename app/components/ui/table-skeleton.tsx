import { Skeleton, Table } from "@chakra-ui/react";

type TableSkeletonProps = {
  rows?: number;
  cols?: number;
};

export function TableSkeleton({ rows = 5, cols = 5 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <Table.Row key={i} bg="white" color={"black"} h={"46px"}>
          {Array.from({ length: cols }).map((_, j) => (
            <Table.Cell color={"primary.600"} borderBottomColor="gray.200">
              <Skeleton h="16px" w="80px" bg={"gray.200"} />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </>
  );
}
