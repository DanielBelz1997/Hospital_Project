import cx from "clsx";
import { useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Modal,
  Button,
} from "@mantine/core";
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";
import { AddMember } from "./AddMember";
import { retrieveMemberDetails } from "../api/members";

import classes from "../styles/TableSelection.module.css";

export function TableSelection({ members }) {
  const [selection, setSelection] = useState(["1"]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const {
    data: memberDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["memberDetails"],
    queryFn: retrieveMemberDetails,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const toggleAll = () =>
    setSelection((current) =>
      current.length === members.length ? [] : members.map((item) => item.id)
    );

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMember(null);
  };

  const rows = members.map((item) => {
    const selected = selection.includes(item.id);
    const fullAddress = `${item.address_city}, ${item.address_street}  ${item.address_house_num}`;
    const formattedDateOfBirth = new Date(
      item.date_of_birth
    ).toLocaleDateString();

    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td />
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.id_official}</Table.Td>
        <Table.Td>{item.phone_number}</Table.Td>
        <Table.Td>{item.cellphone}</Table.Td>
        <Table.Td>{fullAddress}</Table.Td>
        <Table.Td>{formattedDateOfBirth}</Table.Td>
        {/* Display delete, edit, and view details icons under the "Actions" column */}
        <Table.Td>
          <MdInfo
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => handleViewDetails(item)}
          />
          <MdDelete
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => console.log("hellp delete")}
          />
          <MdEdit
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => console.log("hellp edit")}
          />
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div style={{ marginBottom: rem(20), textAlign: "center" }}>
      <h1 style={{ marginBottom: rem(10) }}>Covid19 Management System</h1>
      <Button
        variant="outline"
        color="blue"
        style={{ marginBottom: rem(10) }}
        onClick={() => setIsAddMemberModalOpen(true)}
      >
        + Add Member
      </Button>
      <ScrollArea h={390}>
        <Table
          stickyHeader
          miw={700}
          verticalSpacing="sm"
          horizontalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Member</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Id</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Phone number</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Cell phone</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Address</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Date Of Birth</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      {selectedMember && (
        <Modal
          title="Member Details"
          opened={isDetailsModalOpen}
          onClose={closeDetailsModal}
        ></Modal>
      )}
      {isAddMemberModalOpen && (
        <Modal
          title="Add Member"
          style={{}}
          opened={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
        >
          <AddMember />
        </Modal>
      )}
    </div>
  );
}
