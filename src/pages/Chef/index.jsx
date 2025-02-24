
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

export const ChefList = () => {
  const [chef, setChef] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("chef", chef);

  // Fetch categories from API
  const fetchChef = useCallback(async () => {
    setLoading(true)
    try {
      const response = await NetworkServices.Chef.index();
      console.log(response);
      if (response && response.status === 200) {
        setChef(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error); 
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchChef();
  }, [fetchChef]);

  // Handle single category deletion
  const destroy = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Chef.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Category deleted successfully.");
                fetchChef();
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
    pageTitle: "Chef List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Chef",
    buttonUrl: "/dashboard/create-chef",
    type: "add",
  };

    const columns = [
      {
        name: "Chef Image",
        cell: (row) => (
          <img
            className="w-10 h-10 rounded-full border"
            src={
              row?.chef_image
                ? `${process.env.REACT_APP_API_SERVER}${row?.chef_image}`
                : ""
            }
            alt="images"
          />
        ),
      },
      {
        name: "Chef Name",
        cell: (row) => row.chef_name,
      },
      {
        name: "Title",
        cell: (row) => row?.title,
      },
      {
        name: "Description",
        cell: (row) => row?.description,
      },

      {
        name: "Action",
        cell: (row) => (
          <div className="flex gap-2">
            <Link to={`/dashboard/edit-chef/${row?.chef_id}`}>
              <FaEdit className="text-primary text-xl" />
            </Link>
            <MdDelete
              className="text-red-500 text-xl cursor-pointer"
              onClick={() => destroy(row?.chef_id)}
            />
          </div>
        ),
      },
    ];

  return (
    <>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={chef} pagination />
    </>
  );
};



