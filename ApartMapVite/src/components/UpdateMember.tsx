import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateMember } from "../hooks/useUpdateMember";
import { ToastContainer } from "react-toastify";
import { parse, format } from "date-fns";

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
  const { register, handleSubmit } = useForm<Inputs>();

  const updateMemberMutation = useUpdateMember();

  const onSubmit: SubmitHandler<Inputs> = async (memberData) => {
    console.log(memberData);
    updateMemberMutation.mutate(memberData);
  };

  const ifDateExists = (dateVal: string) => {
    if (dateVal) {
      return format(dateVal, "yyyy-dd-MM");
    } else {
      return "";
    }
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
        <ToastContainer />
        <input
          placeholder="goverment ID"
          type="text"
          defaultValue={selectedMember.id_official}
          {...register("id_official", { required: true })}
          style={{ marginBottom: "2vh", marginTop: "2vh" }}
        />
        <input
          placeholder="FullName"
          type="text"
          defaultValue={selectedMember.name}
          {...register("name", { required: true })}
          style={{ marginBottom: "2vh" }}
        />
        <input
          placeholder="Main phone"
          type="text"
          defaultValue={selectedMember.phone_number}
          {...register("phone_number", { required: true })}
          style={{ marginBottom: "2vh" }}
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
        <p>1st Vaccination date</p>
        <input
          placeholder="first vaccination date"
          type="date"
          defaultValue={ifDateExists(selectedMember.first_vaccination_date)}
          {...register("first_vaccination_date")}
          style={{ marginBottom: "2vh" }}
        />
        <>
          <p>2nd Vaccination date</p>
          <input
            placeholder="second vaccination date"
            type="date"
            defaultValue={ifDateExists(selectedMember.second_vaccination_date)}
            {...register("second_vaccination_date")}
            style={{ marginBottom: "2vh" }}
          />
        </>
        <>
          <p>3rd Vaccination date</p>
          <input
            placeholder="third vaccination date"
            type="date"
            defaultValue={ifDateExists(selectedMember.third_vaccination_date)}
            {...register("third_vaccination_date")}
            style={{ marginBottom: "2vh" }}
          />
        </>
        <>
          <p>4th Vaccination date</p>
          <input
            placeholder="forth vaccination date"
            type="date"
            defaultValue={ifDateExists(selectedMember.forth_vaccination_date)}
            {...register("forth_vaccination_date")}
            style={{ marginBottom: "2vh" }}
          />
        </>
        <input
          placeholder="Vaccine manufacturer"
          type="text"
          defaultValue={selectedMember.vaccine_manufactorer}
          {...register("vaccine_manufacturer")}
          style={{ marginBottom: "2vh" }}
        />
        <p>Positive test date</p>
        <input
          placeholder="Positive test date"
          type="datetime-local"
          defaultValue={selectedMember.positive_test_date}
          {...register("positive_test_date")}
          style={{ marginBottom: "2vh" }}
        />
        <p>Recovery date</p>
        <input
          placeholder="Recovery date"
          type="date"
          defaultValue={selectedMember.positive_test_date}
          {...register("recovery_date")}
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
