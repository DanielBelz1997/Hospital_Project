import { useForm, SubmitHandler } from "react-hook-form";
// import { useQuery } from "react-query";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export function AddMember() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example"));
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ columnGap: "2vh", columnCount: "2" }}>
        <input
          placeholder="goverment ID"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        {/* register your input into the hook by invoking the "register" function */}
        <input
          placeholder="FullName"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="Main phone"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Cellphone"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="City"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />

        <input
          placeholder="Street"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="House number"
          type="text"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Birth Date"
          type="date"
          {...(register("exampleRequired"), { required: true })}
          style={{ marginBottom: "4vh" }}
        />

        <input type="submit" value={"Submit"} />
      </div>
    </form>
  );
}
