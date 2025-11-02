import { Text } from "@chakra-ui/react";
import { useParams } from "react-router";

export default function DetailPelanggan(){
    const {slug} = useParams<{slug: string}>()

    return (
        <Text color={'black'}>{slug}</Text>
    )
}