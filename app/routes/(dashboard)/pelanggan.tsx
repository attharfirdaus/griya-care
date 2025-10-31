import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/auth-store";

export default function Pelanggan() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Text color={"black"}>Halo, {user?.name}</Text>
    </>
  );
}
