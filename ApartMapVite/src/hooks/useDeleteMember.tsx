import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../api/members";
import { toast } from "react-toastify";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["membersDetalis"] });
      console.log("deleted!");
    },
    onError() {
      toast("error in deleting the member");
    },
  });
};
