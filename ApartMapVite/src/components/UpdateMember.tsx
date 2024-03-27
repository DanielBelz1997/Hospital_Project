import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateMember } from "../hooks/useUpdateMember";

type Inputs = {
  id_official: string;
  name: string;
  phone_number: string;
  cellphone: string;
  address_city: string;
  address_street: string;
  address_house_num: number;
  date_of_birth: string | null;
  id_serial: number;
  first_vaccination_date: string;
  second_vaccination_date: string;
  third_vaccination_date: string;
  forth_vaccination_date: string;
  vaccine_manufacturer: string;
  positive_test_date: string | null;
  recovery_date: string | null;
};

export function UpdateMember({ selectedMember }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const updateMemberMutation = useUpdateMember();

  const onSubmit: SubmitHandler<Inputs> = async (memberData) => {
    console.log(memberData);
    updateMemberMutation.mutate(memberData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          columnGap: "vh",
          columnCount: "2",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <input
          placeholder="goverment ID"
          type="text"
          defaultValue={selectedMember.id_official}
          {...register("id_official", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="FullName"
          type="text"
          defaultValue={selectedMember.name}
          {...register("name", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Main phone"
          type="text"
          defaultValue={selectedMember.phone_number}
          {...register("phone_number", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Cellphone"
          type="text"
          defaultValue={selectedMember.cellphone}
          {...register("cellphone", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="City"
          type="text"
          defaultValue={selectedMember.address_city}
          {...register("address_city", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="Street"
          type="text"
          defaultValue={selectedMember.address_street}
          {...register("address_street", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="House number"
          type="number"
          defaultValue={selectedMember.address_house_num}
          {...register("address_house_num", { required: true })}
          style={{ marginBottom: "2vh" }}
        />
        <input
          type="submit"
          value="Update"
          style={{ marginTop: "2vh", width: "30vh", height: "7vh" }}
        />
      </div>
    </form>
  );
}
