import { Button, Flex, Span, Stack, Text } from "@chakra-ui/react";
import InputField, { PasswordField } from "~/components/ui/input-field";
import { z } from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthStore } from "~/store/auth-store";
import { useNavigate } from "react-router";
import { supabase } from "~/supabase-client";
import { toaster } from "~/components/ui/toaster";

const loginSchema = z.object({
  email: z
    .email("Format email salah")
    .min(5, "Email harus memiliki jumlah minimal 5 karakter"),
  password: z
    .string()
    .min(8, "Password harus memiliki jumlah minimal 8 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  function onSubmit(data: LoginForm) {
    startTransition(async () => {
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toaster.create({
          title: "Gagal Masuk",
          description: error.message.includes("Invalid login credentials")
            ? "Email atau kata sandi salah. Silakan coba lagi!"
            : "Terjadi kesalahan saat login. Silakan coba lagi nanti!",
          type: "error",
        });
        return;
      }
      if (!userData.session) {
        toaster.create({
          title: "Gagal Masuk",
          description:
            "Tidak ada sesi aktif yang ditemukan. Silakan periksa kredensial Anda.",
          type: "error",
        });
        return;
      }

      const accessToken = userData.session?.access_token;
      const user = userData.user;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setUser({
        id: user!.id,
        email: user!.email!,
        name: profile?.name,
        role: profile?.role,
        accessToken,
      });

      toaster.create({
        title: "Login Berhasil",
        description: `Selamat datang, ${profile?.name}!`,
        type: "success",
      });

      navigate("/dashboard/pelanggan");
    });
  }

  return (
    <>
      <Flex
        bg={"gray.50"}
        h={"100vh"}
        bgImage={"url(/images/login-bg.jpg)"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        alignItems={"center"}
        justifyContent={"end"}
        px={"15vw"}
      >
        <Stack bg={"white/50"} rounded={"xl"} gap={6} p={8} minW={"500px"}>
          <Stack gap={0}>
            <Text fontSize={"16px"} fontWeight={"normal"} color={"black"}>
              Selamat datang di{" "}
              <Span
                fontWeight={"bold"}
                color={"orange.500"}
                fontStyle={"italic"}
                fontSize={"18px"}
              >
                Griya<Span color={"blue.600"}>Care</Span>
              </Span>
            </Text>
            <Text fontSize={"40px"} fontWeight={"bold"} color={"black"}>
              Masuk
            </Text>
          </Stack>
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                methods.handleSubmit(onSubmit)(e);
              }}
            >
              <Stack gap={6} alignItems={"end"}>
                <InputField
                  placeholder="example@gmail.com"
                  label="Email"
                  isRequired
                  type="email"
                  name={"email"}
                />
                <PasswordField
                  placeholder="Kata sandi Anda"
                  label="Kata Sandi"
                  isRequired
                  name="password"
                />
                <Button
                  type="submit"
                  borderRadius={"lg"}
                  w={"200px"}
                  bg={"blue.400"}
                  color={"white"}
                  loading={isPending}
                >
                  Masuk
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </Stack>
      </Flex>
    </>
  );
}
