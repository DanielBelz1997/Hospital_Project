import { useForm, SubmitHandler } from "react-hook-form";
import { useAddMember } from "../hooks/useAddMember";

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
  "1st_vaccination_date": string;
  "2nd_vaccination_date": string;
  "3rs_vaccination_date": string;
  "4th_vaccination_date": string;
  vaccine_manufacturer: string;
  positive_test_date: string | null;
  recovery_date: string | null;
};

export function AddMember() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const addMemberMutation = useAddMember();

  const onSubmit: SubmitHandler<Inputs> = async (memberData) => {
    console.log(memberData);
    addMemberMutation.mutate(memberData); // Trigger the mutation to create a new member
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          columnGap: "5vh",
          columnCount: "3",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <input
          placeholder="goverment ID"
          type="text"
          {...register("id_official", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="FullName"
          type="text"
          {...register("name", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Main phone"
          type="text"
          {...register("phone_number", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Cellphone"
          type="text"
          {...register("cellphone", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="City"
          type="text"
          {...register("address_city", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="Street"
          type="text"
          {...register("address_street", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="House number"
          type="number"
          {...register("address_house_num", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        Date of birth
        <input
          placeholder="Date of birth"
          type="date"
          {...register("date_of_birth", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="serial ID"
          type="number"
          {...register("id_serial", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        1st Vaccination date
        <input
          placeholder="1st Vaccination date"
          type="datetime-local"
          {...register("1st_vaccination_date", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        2nd Vaccination date
        <input
          placeholder="2nd Vaccination date"
          type="datetime-local"
          {...register("2nd_vaccination_date", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <p></p>3rd Vaccination date
        <input
          placeholder="3rd Vaccination date"
          type="datetime-local"
          {...register("3rs_vaccination_date", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        4th Vaccination date
        <input
          placeholder="4th Vaccination date"
          type="datetime-local"
          {...register("4th_vaccination_date", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Vaccine manufacturer"
          type="text"
          {...register("vaccine_manufacturer", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        Positive test date
        <input
          placeholder="Positive test date"
          type="datetime-local"
          {...register("positive_test_date")}
          style={{ marginBottom: "4vh" }}
        />
        Recovery date
        <input
          placeholder="Recovery date"
          type="datetime-local"
          {...register("recovery_date")}
          style={{ marginBottom: "4vh" }}
        />
        <input type="submit" value="Submit" style={{ marginTop: "2vh" }} />
      </div>
    </form>
  );
}
