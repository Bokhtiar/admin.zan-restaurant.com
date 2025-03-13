import React, { useCallback, useEffect, useState } from "react";
import { IoIosList } from "react-icons/io";
import { PageHeader } from "../../components/pageHeading/PageHeading";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";

const PopularList = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("firsppt", popular);

  // Fetch categories from API
  const fetchPopular = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Popular.index();
      console.log(response);
      if (response && response.status === 200) {
        setPopular(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPopular();
  }, [fetchPopular]);

  // Handle single category deletion
  const destroy = (id) => {
    console.log("iddd", id);
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Food?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Popular.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Food deleted successfully.");
                fetchPopular();
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
          <Link to={`/dashboard/edit-food/${row?.popular_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.popular_id)}
          />
        </div>
      ),
    },
  ];
  const propsData = {
    pageTitle: "Popular List",
    pageIcon: <IoIosList />,
    buttonName: "Create Popular Food",
    buttonUrl: "/dashboard/create-popular",
    type: "add",
  };

  return (
    <div>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={popular} pagination />
    </div>
  );
};

export default PopularList;
