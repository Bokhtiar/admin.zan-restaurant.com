import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { PageHeader } from "../../components/pageHeading/PageHeading";
import { ImageUpload, TextAreaInput, TextInput } from "../../components/input";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { useForm } from "react-hook-form";

const CreateChef = () => {
  const [loading, setLoading] = useState(false);

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

  const propsData = {
    pageTitle: " Create Chef ",
    pageIcon: <IoMdCreate />,
    buttonName: "Chef List",
    buttonUrl: "/dashboard/chef",
    type: "list", // This indicates the page type for the button
  };

  const onFormSubmit = async (data) => {
    console.log("Submitted Data:", data);

    try {
      setLoading(true);

      // Create FormData object
      const formData = new FormData();

      formData.append("chef_name", data?.chef_name); 
      formData.append("title", data?.title); // Add title
      formData.append("description", data?.description); 
      formData.append("status", data?.status ? "1" : "0"); // Convert boolean to string

      // Append image if exists
      if (data?.chef_image) {
        formData.append("chef_image", data.chef_image);
      }

      console.log("FormData Entries:", [...formData.entries()]); // Debugging log

      // Send data to API
      const response = await NetworkServices.Chef.store(formData);
      console.log("API Response:", response);

      if (response && response.status === 200) {
        Toastify.Success("Chef Created.");
      }
    } catch (error) {
      console.log("Error:", error);
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        {" "}
        <SkeletonTable />
        <br />
      </div>
    );
  }
  return (
    <div>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        <div>
          <TextInput
            name="chef_name"
            control={control}
            label="Chef Name *"
            type="text"
            placeholder=""
            rules={{ required: "Chef Name is required" }} // Validation rule
            error={errors.title?.message} // Show error message
          />
        </div>
        {/* Total Questions */}
        <div className="mt-4">
          <TextInput
            name="title"
            control={control}
            label="Title *"
            type="text"
            placeholder=""
            rules={{ required: "Title is required" }} // Validation rule
            error={errors.title?.message} // Show error message
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name=""
            control={control}
            label="Category Picture"
            file="image *"
            // required
            onUpload={(file) => setValue("chef_image", file)}
            error={errors.category_image?.message}
          />
        </div>
        <div className="mt-4">
          <TextAreaInput
            name="description"
            control={control}
            label="Description *"
            placeholder="Enter your description"
            error={errors?.description?.message} // Show error message
            isClearable={true}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <TextInput
            type="checkbox"
            name="status"
            className="w-5 h-5"
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") === 1}
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Status
          </label>
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
          {loading ? "Loading..." : "Create Chef"}
        </button>
      </form>
    </div>
  );
};

export default CreateChef;
