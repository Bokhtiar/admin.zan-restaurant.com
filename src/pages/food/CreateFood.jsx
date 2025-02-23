import React, { useCallback, useEffect, useState } from "react";

import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/pageHeading/PageHeading";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextInput,
} from "../../components/input";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";

const CreateFood = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.category_name,
            value: item.category_name,
            ...item,
          };
        });
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const onFormSubmit = async (data) => {
    console.log("data".data);

    try {
      setLoading(true);
      const response = await NetworkServices.Food.store(data);
      console.log("objecttt", response);
      if (response && response.status === 200) {
        navigate("/dashboard/food");
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      console.log("error", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
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
  const propsData = {
    pageTitle: " Create Category ",
    pageIcon: <IoMdCreate />,
    buttonName: "Food List",
    buttonUrl: "/dashboard/category",
    type: "list", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        <div className="mb-4">
          <SingleSelect
            name="category"
            control={control}
            options={categories}
            // rules={{ required: "Category selection is required" }}
            // onSelected={(selected) =>
            //   setValue("category_id", selected?.category_id)
            // }
            placeholder="Select a category "
            error={errors.category?.message}
            label="Choose Parent category *"
            isClearable={true}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        {/* Total Questions */}
        <div className="mb-4">
          <TextInput
            name="cook_name"
            control={control}
            label="Cook Name *"
            type="text"
            placeholder="Create Cook"
            rules={{ required: "Category is required" }} // Validation rule
            error={errors.category_name?.message} // Show error message
          />
        </div>
        {/* price */}
        <div className="mb-4">
          <TextInput
            name="price"
            control={control}
            label="Price *"
            type="text"
            placeholder="Enter Price"
            rules={{ required: "Price is required" }} // Validation rule
            error={errors.price?.message} // Show error message
          />
        </div>
        {/* rating */}
        <div className="mb-4">
          <SingleSelect
            name="rating"
            control={control}
            options={Array.from({ length: 5 }, (_, i) => ({
              label: (i + 1).toString(),
              value: i + 1,
            }))}
            error={errors.rating?.message}
            label="Choose Rating *"
            isClearable={true}
          />
        </div>
        <div className="mb-4">
          <TextAreaInput
            name="about_cook"
            control={control}
            label="About Cook *"
            placeholder="Enter your comment"
            error={errors?.about_cook?.message}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="cook_image"
            control={control}
            label="Cook Image"
            file="image *"
            // required
            onUpload={(file) => setValue("cook_image", file)}
            error={errors.cook_image?.message}
          />
        </div>

        {/* discount price */}
        <div className="mb-4">
          <TextInput
            name="discount_price"
            control={control}
            label="Discount Price *"
            type="text"
            placeholder="Enter discount Price"
            rules={{ required: "discount Price is required" }} // Validation rule
            error={errors.discount_price?.message} // Show error message
          />
        </div>

        {/* multiple image Upload */}
        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="gallary_image"
            control={control}
            label="Gallary"
            file="image *"
            // required
            onUpload={(file) => setValue("gallary_image", file)}
            error={errors.gallary_image?.message}
          />
        </div>

        {/* discount price */}
        <div className="mb-4">
          <TextInput
            name="discount_price"
            control={control}
            label="Discount Price *"
            type="text"
            placeholder="Enter discount Price"
            rules={{ required: "discount Price is required" }} // Validation rule
            error={errors.discount_price?.message} // Show error message
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
          {loading ? "Loading..." : "Create Category"}
        </button>
      </form>
    </>
  );
};

export default CreateFood;
