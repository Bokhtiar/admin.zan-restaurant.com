import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextInput,
} from "../../components/input";
import { PageHeader } from "../../components/pageHeading/PageHeading";
import { FaRegEdit } from "react-icons/fa";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";

const EditFood = () => {
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const { foodId } = useParams(); // URL থেকে ID নেওয়া
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
  console.log("foodDatass",food)

  // ক্যাটাগরি লোড করা
  const fetchCategory = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      if (response?.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.category_name,
          value: item.category_id,
        }));
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
  }, []);

  // ফুড ডাটা লোড করা
  const fetchFoodData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Food.show(foodId);
      if (response?.status === 200) {
        const foodData = response.data.data;
        setFood(foodData)
        
        setValue("category_id", foodData.category_id);
        setValue("cook_name", foodData.cook_name);
        setValue("price", foodData.price);
        setValue("cook_time", foodData.cook_time);
        setValue("rating", { label: food.rating.toString(), value: food.rating });
        setValue("discount_price", foodData.discount_price);
        setValue("cook_image", foodData?.cook_image);
        setValue("gallary_image", foodData.gallary_image);
        setValue("about_cook", foodData.about_cook);
        setValue("status", foodData.status);
      }
    } catch (error) {
      console.error("Fetch Food Data Error:", error);
    }
    setLoading(false);
  }, [foodId, setValue]);

  useEffect(() => {
    fetchCategory();
    if (foodId) {
      fetchFoodData();
    }
  }, [fetchCategory, fetchFoodData, foodId]);

  const onFormSubmit = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      status: data.status ? 1 : 0,
    };

    try {
      const response = await NetworkServices.Food.update(foodId, payload);
      if (response?.status === 200) {
        Toastify.Success("Food Updated Successfully.");
        navigate("/dashboard/food");
      }
    } catch (error) {
      console.error("Update Error:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  const propsData = {
    pageTitle: "Update Food",
    pageIcon: <FaRegEdit />,
    buttonName: "Food List",
    buttonUrl: "/dashboard/food",
    type: "list",
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="mt-4">
            <SingleSelect
              name="categories"
              control={control}
              options={categories}
              onSelected={(selected) =>
                setValue("category_id", selected?.value)
              }
              placeholder=""
              error={errors.category_id?.message}
              label="Choose category *"
              isClearable={true}
            />
          </div>

          <div className="mt-4">
            <TextInput
              name="cook_name"
              control={control}
              label="Cook Name *"
              type="text"
              placeholder="Create Cook"
              error={errors.cook_name?.message}
            />
          </div>

          <div className="mt-4">
            <TextInput
              name="price"
              control={control}
              label="Price *"
              type="number"
              placeholder="Enter Price"
              error={errors.price?.message}
            />
          </div>

          <div className="mt-4">
            <TextInput
              name="cook_time"
              control={control}
              label="Cook Time *"
              type="number"
              placeholder="Enter Cook Time"
              error={errors.cook_time?.message}
            />
          </div>

          <div className="mt-4">
            <SingleSelect
              name="ratings"
              control={control}
              options={[1, 2, 3, 4, 5].map((num) => ({
                label: num,
                value: num,
              }))}
              onSelected={(selected) => setValue("rating", selected?.value)}
              placeholder={food?.rating}
              error={errors.rating?.message}
              label="Choose Rating *"
              isClearable={true}
            />
          </div>

          <div className="mt-4">
            <TextInput
              name="discount_price"
              control={control}
              label="Discount Price *"
              type="number"
              placeholder="Enter Discount Price"
              error={errors.discount_price?.message}
            />
          </div>
        </div>

        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="cook_images"
            control={control}
            label="Cook Image"
            onUpload={(file) => setValue("cook_image", file)}
            error={errors.cook_image?.message}
            imgUrl={food?.cook_image}
          />
        </div>

        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="gallary_imagess"
            control={control}
            label="Gallery"
            onUpload={(file) => setValue("gallary_image", file)}
            error={errors.gallary_image?.message}
            imgUrl={food?.cook_image}
          />
        </div>

        <div className="mt-4">
          <TextAreaInput
            name="about_cook"
            control={control}
            label="About Cook *"
            placeholder="Enter details"
            error={errors?.about_cook?.message}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="status"
            className=""
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") === 1}
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Status
          </label>
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Food"}
        </button>
      </form>
    </>
  );
};

export default EditFood;
