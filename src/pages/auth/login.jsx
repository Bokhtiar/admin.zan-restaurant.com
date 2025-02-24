import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { getToken, networkErrorHandeller, setToken } from "../../utils/helper";
import ZanIcon from "../../assets/icon/ZanIcon.jpg";
import { PasswordInput, TextInput } from "../../components/input";
import { Toastify } from "../../components/toastify";

// const inputStyle = "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data",data)
    navigate("/dashboard");
    try {
        setLoading(true)
        const response = await NetworkServices.Authentication.login(data)
        if (response.status === 200) {
            setToken(response.data.data.token);
            Toastify.Success("Login successfully done");
            navigate("/dashboard");
            setLoading(false)
        }
    } catch (error) {
        setLoading(false)
        setToken("response.data.data.token");
        networkErrorHandeller(error)
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     setLoading(true);
  
  //     // FormData object creation
  //     const formData = new FormData();
  //     formData.append("email", data.email);
  //     formData.append("password", data.password);
  
  //     // API call
  //     const response = await NetworkServices.Authentication.login(formData);
  
  //     if (response.status === 200) {
  //       setToken(response.data.data.token);
  //       Toastify.Success("Login successfully done");
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     networkErrorHandeller(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  useEffect(() => {
      if (getToken()) {
          navigate("/dashboard");
      }
  }, [navigate]);

  return (
    <section className="flex items-center justify-center h-screen bg-black ">
      <div className="bg-[#fff] shadow border border-green-100 rounded-lg w-[100%] md:w-[80%] max-w-[700px] ">
        <img
          height={70}
          width={70}
          className="mx-auto d-block border border-green-100 rounded-full mt-5"
          src={ZanIcon}
          alt=""
        />

        <form className="md:px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-[65%] mx-auto md:px-6">
            {/* email */}
            <div className="relative w-full mt-7">
              <TextInput
                name="email"
                label="Email *"
                control={control}
                placeholder="Enter your email name"
                rules={{ required: "Exam Name is required" }} // Validation rule
                error={errors?.exam_name?.message} // Show error message
              />
            </div>

            {/* password */}

            <div className="relative w-full mt-7">
              <PasswordInput
                name="password"
                label="Password *"
                control={control}
                placeholder="Enter Password"
                rules={{ required: "Password is required" }} // Validation rule
                error={errors?.exam_name?.message} // Show error message
              />
            </div>

            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton loading={loading} name="Login">
                {" "}
                Login
              </PrimaryButton>
            </div>
          </div>
        </form>

        <div className="text-center my-3 md:mb-12 mt-6">
          <p className="text-[#7c5cc4]">Forgate Password?</p>
          <p className="text-[#aaa]">Do not have an account?</p>
          <p className="text-[#7c5cc4]">Register</p>
        </div>
      </div>
    </section>
  );
};
