"use client";

import { provinceServices } from "@/services/province-services";
import {
  Box,
  Button,
  ChevronDownIcon,
  Dialog,
  Flex,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import * as Select from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const token = session?.user?.data;

  const { data: provinceData, isLoading: isLoading } = useQuery({
    enabled: !!token,
    queryKey: ["getProvinces", token],
    queryFn: () =>
      provinceServices.getProvinces({
        token: token as string,
      }),
  });

  console.log(provinceData?.data.data);

  if (session && session.user) {
    return (
      <main className="p-32">
        <Box>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Benua</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Negara</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Pulau</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Provinsi</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {provinceData?.data?.data.map((province) => (
                <Table.Row key={province.id_provinsi}>
                  <Table.RowHeaderCell>{province.benua}</Table.RowHeaderCell>
                  <Table.Cell>{province.negara}</Table.Cell>
                  <Table.Cell>{province.pulau}</Table.Cell>
                  <Table.Cell>{province.provinsi}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Flex p={"2"} justify={"between"}>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button style={{ cursor: "pointer" }}>Tambah Provinsi</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Tambah provinsi</Dialog.Title>

              <select>
                <label>Pulau</label>
                {provinceData?.data?.data.map((province) => (
                  <option value={province.id_provinsi}>{province.pulau}</option>
                ))}
              </select>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Nama provinsi
                  </Text>
                  <TextField.Root placeholder="Masukkan nama provinsi" />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>

          <Button
            style={{ cursor: "pointer" }}
            color="red"
            onClick={() => signOut()}
          >
            {session.user.name} Sign Out
          </Button>
        </Flex>
      </main>
    );
  }
  return (
    <Button style={{ cursor: "pointer" }} onClick={() => signIn()}>
      SignIn
    </Button>
  );
}
