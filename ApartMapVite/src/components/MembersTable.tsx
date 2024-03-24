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
import { MdDelete, MdEdit } from "react-icons/md";

import classes from "../styles/TableSelection.module.css";

export function TableSelection({ members }) {
  const [selection, setSelection] = useState(["1"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === members.length ? [] : members.map((item) => item.id)
    );

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleAddMember = () => {
    // Logic to add a new member goes here
  };

  const rows = members.map((item) => {
    const selected = selection.includes(item.id);
    const fullAddress = `${item.address_city}, ${item.address_street}  ${item.address_house_num}`;
    const formattedDateOfBirth = new Date(item.date_of_birth).toLocaleDateString();
    
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
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
          <Button
            onClick={() => handleViewDetails(item)}
            variant="link"
            color="gray"
            style={{ cursor: 'pointer' }}
          >
            <div style={{ fontSize: rem(12), lineHeight: 1 }}>
              Covid19<br />Details
            </div>
          </Button>
          <MdDelete /> <MdEdit />
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div style={{ marginTop: rem(20), marginBottom: rem(20), textAlign: 'center' }}>
      <h1 style={{ marginBottom: rem(10) }}>Covid19 Management System</h1>
      <Button
        variant="outline"
        color="blue"
        style={{ marginBottom: rem(10) }}
        onClick={handleAddMember}
      >
        + Add Member
      </Button>
      <ScrollArea h={390}>
        <Table stickyHeader miw={800} verticalSpacing="sm" horizontalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(60) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === members.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== members.length
                  }
                />
              </Table.Th>
              <Table.Th>Member</Table.Th>
              <Table.Th>Id</Table.Th>
              <Table.Th>Phone number</Table.Th>
              <Table.Th>Cell phone</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Date Of Birth</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      {selectedMember && (
        <Modal
          title="Member Details"
          opened={isModalOpen}
          onClose={closeModal}
        >
          {/* Display detailed information about the selected member */}
         
          {/* Add more details as needed */}
        </Modal>
      )}
    </div>
  );
}
