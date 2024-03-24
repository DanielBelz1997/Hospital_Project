import {TableSelection} from "../components/MembersTable";
import {retrieveMembers} from "../api/members"
import { useQuery } from "react-query";



export function RootPage() {

    const {
      data: members,
      error,
      isLoading,
    } = useQuery("members", retrieveMembers);

    console.log(members)

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <>
    <div style={{paddingTop: "15vh", marginRight: "10vh", marginLeft: "10vh"}}>
      <ul>
      {members.map((member) => {
        <li key={member.id}>{member}</li>
      })}
      </ul>
    </div>
    <TableSelection members={members} />
    </>
  );

}
