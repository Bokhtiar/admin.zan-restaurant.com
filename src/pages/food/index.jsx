
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit} from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import DataTable from "react-data-table-component";
import { PageHeader } from "../../components/pageHeading/PageHeading";

export const FoodList = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("first",food)
  

  // Fetch categories from API
  const fetchfood = useCallback(async () => {
    setLoading(true)
    try {
      const response = await NetworkServices.Food.index();
      console.log(response);
      if (response && response.status === 200) {
        setFood(response?.data?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error); 
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchfood();
  }, [fetchfood]);

  // Handle single category deletion
  const destroy = (id) => {
    console.log("iddd",id)
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Food?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Food.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Food deleted successfully.");
                fetchfood();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  if (loading) {
    return (
      <div>
        <SkeletonTable />

      </div>
    );
  }

  const propsData = {
    pageTitle: "Food List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Food",
    buttonUrl: "/dashboard/create-food",
    type: "add",
  };

    const columns = [
      {
        name: "Food Image",
        cell: (row) => (
          <img
            className="w-10 h-10 rounded-full border"
            src={
              row?.cook_image
                ? `${process.env.REACT_APP_API_SERVER}${row?.cook_image}`
                : ""
            }
            alt="images"
          />
        ),
      },
      {
        name: "Food Name",
        cell: (row) => row?.cook_name,
      },
      {
        name: "Discount Price",
        cell: (row) => row?.discount_price,
      },
      {
        name: "Food Price",
        cell: (row) => row?.price,
      },
      {
        name: "Rating",
        cell: (row) => row?.rating,
      },

      {
        name: "Action",
        cell: (row) => (
          <div className="flex gap-2">
            <Link to={`/dashboard/edit-category/${row?.cook_id}`}>
              <FaEdit className="text-primary text-xl" />
            </Link>
            <MdDelete
              className="text-red-500 text-xl cursor-pointer"
              onClick={() => destroy(row?.cook_id)}
            />
          </div>
        ),
      },
    ];

  return (
    <>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={food} pagination />
    </>
  );
};

