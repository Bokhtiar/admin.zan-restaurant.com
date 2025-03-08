import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { getToken, networkErrorHandeller } from "../../utils/helper";
import ZanIcon from "../../assets/icon/ZanIcon.jpg";
import { PasswordInput, TextInput } from "../../components/input";
import { Toastify } from "../../components/toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      const response = await NetworkServices.Authentication.Register(data);
      if (response.status === 200) {     
        Toastify.Success("reagister successfully done");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      networkErrorHandeller(error);
    }
  };

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
            {/* Email Field */}
            <div className="relative w-full">
              <TextInput
                name="name"
                label="Name *"
                control={control}
                placeholder="Enter your name"
                rules={{
                  required: "Email is required",
                }}
                error={errors?.name?.message} // Show error message
              />
            </div>
            {/* Email Field */}
            <div className="relative w-full mt-4">
              <TextInput
                name="email"
                label="Email *"
                control={control}
                placeholder="Enter your email"
                rules={{
                  required: "Email is required",
                }}
                error={errors?.email?.message} // Show error message
              />
            </div>

            {/* Phone Field */}
            <div className="relative w-full mt-4">
              <TextInput
                name="phone"
                label="Phone *"
                control={control}
                placeholder="Enter your phone number"
                rules={{
                  required: "Phone number is required",
                }}
                error={errors?.phone?.message} // Show error message
              />
            </div>

            {/* Password Field */}
            <div className="relative w-full mt-4">
              <PasswordInput
                name="password"
                label="Password *"
                control={control}
                placeholder="Enter your password"
                rules={{
                  required: "Password is required",
                }}
                error={errors?.password?.message} // Show error message
              />
            </div>

            {/* Submit Button */}
            <div className="my-4 flex justify-center mb-7">
              <PrimaryButton loading={loading} name="register">
                Register
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
