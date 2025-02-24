import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { PageHeader } from "../../components/pageHeading/PageHeading";
import { ImageUpload, TextAreaInput, TextInput } from "../../components/input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { networkErrorHandeller } from "../../utils/helper";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

const EditChef = () => {
    const [chef, setChef] = useState(null);
    const [loading, setLoading] = useState(false);

    const { chefId } = useParams();

    const {
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        control,
    } = useForm({
        defaultValues: {
            status: 0,
        },
    });

    const fetchChef = async (chefId) => {
        setLoading(true);
        try {
            const response = await NetworkServices.Chef.show(chefId);
            console.log("response", response.data.data);
            if (response && response.status === 200) {
                const chefData = response?.data?.data;
                setChef(chefData);
                // Set form values with fetched data
                setValue("chef_name", chefData.chef_name);
                setValue("title", chefData.title);
                setValue("description", chefData.description);
                // setValue("status", chefData.status=== 1 ? true : false);
                
            }
        } catch (error) {
            networkErrorHandeller(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chefId) {
            fetchChef(chefId);
        }
    }, [chefId]);

    const propsData = {
        pageTitle: "Update Chef",
        pageIcon: <FaRegEdit />,
        buttonName: "Chef List",
        buttonUrl: "/dashboard/chef",
        type: "list",
    };

    const onFormSubmit = async (data) => {
        console.log("Submitted Data:", data);

        try {
            setLoading(true);

            // Create FormData object
            const formData = new FormData();
            formData.append("chef_name", data.chef_name);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("status", data.status ? "1" : "0");

            // Append image if exists
            if (data.chef_image) {
                formData.append("chef_image", data.chef_image);
            }

            console.log("FormData Entries:", [...formData.entries()]); // Debugging log

            // Send data to API
            const response = await NetworkServices.Chef.update(chefId, formData);
            console.log("API Response:", response);

            if (response && response.status === 200) {
                // Navigate to chef list or show success message
                Toastify.Success("Chef updated successfully.");
            }
        } catch (error) {
            console.log("Error:", error);
            networkErrorHandeller(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                        error={errors.chef_name?.message} // Show error message
                    />
                </div>
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

                <div className="mt-4 cursor-pointer">
                    <ImageUpload
                        name="chef_image"
                        control={control}
                        label="Category Picture"
                        file="image *"
                        onUpload={(file) => setValue("chef_image", file)}
                        error={errors.chef_image?.message}
                        imgUrl={chef?.chef_image}
                    />
                </div>
                <div className="mt-4">
                    <TextAreaInput
                        name="description"
                        control={control}
                        label="Description *"
                        placeholder="Enter your description"
                        error={errors.description?.message} // Show error message
                        isClearable={true}
                    />
                </div>

                {/* <div className="flex items-center gap-2 mt-4">
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
                </div> */}

                <button
                    type="submit"
                    className={`px-4 py-2 text-white rounded-md transition mt-4 ${
                        loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Loading..." : "Update Chef"}
                </button>
            </form>
        </>
    );
};

export default EditChef;
