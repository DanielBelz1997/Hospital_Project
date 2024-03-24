import { LastMonthInfo } from "../components/LastMonthChart.tsx";
import { retrieveCoronaInfo } from "../api/lastMonthInfo";
import { useQuery } from "react-query";

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
    <>
      <LastMonthInfo lastMonthInfo={lastMonthInfo} />
    </>
  );
}
