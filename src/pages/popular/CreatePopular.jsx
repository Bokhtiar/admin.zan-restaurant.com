import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/pageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { MultiSelect, SingleSelect } from "../../components/input";

const CreatePopular = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multiImages, setMultiImages] = useState([]);

  console.log("food", food);

  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  const fetchFood = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Food.index();
      console.log("response", response);
      if (response && response.status === 200) {
        const result = response?.data?.data?.data?.map((item, index) => {
          return {
            label: item.cook_name,
            value: item.cook_name,
            ...item,
          };
        });
        setFood(result);
      }
    } catch (error) {
      console.error("Fetch Food Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  const onFormSubmit = async (data) => {
    console.log("data", data);

   

    const foodIds = data.Food.map((item) => item?.cook_id);
    
    console.log("Mapped food IDs:", foodIds);

    try {
    //   setLoading(true);
      const response = await NetworkServices.Popular.store({"popular_cook_ids":foodIds});
      console.log("response<<<<<<<<<<",response)
      if (response && response.status === 200) {
        // navigate("/dashboard/food");
        return Toastify.Success("Food Created Successfully.");
      }
    } catch (error) {
      console.log("error", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  const propsData = {
    pageTitle: " Create Popular Food ",
    pageIcon: <IoMdCreate />,
    buttonName: " Popular Food List",
    buttonUrl: "/dashboard/popular",
    type: "list", // This indicates the page type for the button
  };
  return (
    <div>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg "
      >
        <div className="mt-4">
          <MultiSelect
            name="Food"
            control={control}
            options={food}
            rules={{ required: "Food selection is required" }}
            onSelected={(selected) => setValue("food", selected?.cook_id)}
            placeholder="Select a Food "
            error={errors.Food?.message}
            label="Choose category *"
            isClearable={true}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CreatePopular;
