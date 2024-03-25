import { TableSelection } from "../components/MembersTable";
import { retrieveMembers } from "../api/members";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export function RootPage() {
  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: retrieveMembers,
  });

  console;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ paddingTop: "8vh", marginRight: "10vh", marginLeft: "10vh" }}>
      <Link to={"/Dashboard"}>
        <Button color="blue" variant="outline" size="md">
          Covid19 Dashboard
        </Button>
      </Link>
      <TableSelection members={members} />
    </div>
  );
}
