import { TableSelection } from "../components/MembersTable";
import { retrieveMembers } from "../api/members";
import { useQuery } from "react-query";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export function RootPage() {
  const {
    data: members,
    error,
    isLoading,
  } = useQuery("members", retrieveMembers);

  console.log(members);

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred</div>;

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
