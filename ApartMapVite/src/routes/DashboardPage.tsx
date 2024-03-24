import { LastMonthInfo } from "../components/LastMonthChart.tsx";
import { retrieveCoronaInfo } from "../api/lastMonthInfo";
import { useQuery } from "react-query";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const {
    data: lastMonthInfo,
    error,
    isLoading,
  } = useQuery("coronaInfo", retrieveCoronaInfo);

  console.log(lastMonthInfo);

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div style={{ paddingTop: "3vh", marginRight: "10vh", marginLeft: "10vh" }}>
      <Link to={"/"}>
        <Button
          color="blue"
          variant="outline"
          size="md"
          style={{ marginTop: "5vh" }}
        >
          Back To Main Page
        </Button>
      </Link>
      <LastMonthInfo lastMonthInfo={lastMonthInfo} />
    </div>
  );
}
