"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import customers from "@/app/data/customers";
import definitionsData from "@/app/data/definitionsData";
import { useTranslations } from "next-intl";

const BlockPage = () => {
  const t = useTranslations("blocking");
  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: {
      searchId: "",
      reasonId: "",
      sourceId: "",
      hasDuration: false,
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
    validationSchema: Yup.object({
      searchId: Yup.string()
        .required(t("errors.requiredCustomer"))
        .oneOf(
          customers.map((c) => c.id.toString()),
          t("errors.invalidCustomer")
        ),
      reasonId: Yup.string().required(t("errors.requiredReason")),
      sourceId: Yup.string().required(t("errors.requiredSource")),
      startDate: Yup.date()
        .nullable()
        .test(
          "startDate-required",
          t("errors.requiredStartDate"),
          function (value) {
            return !this.parent.hasDuration || value !== null;
          }
        ),
      endDate: Yup.date()
        .nullable()
        .test(
          "endDate-required",
          t("errors.requiredEndDate"),
          function (value) {
            return !this.parent.hasDuration || value !== null;
          }
        )
        .test(
          "endDate-after-startDate",
          t("errors.endDateAfterStartDate"),
          function (value) {
            const { startDate } = this.parent;
            return (
              !this.parent.hasDuration ||
              !startDate ||
              (value !== null && value !== undefined && value > startDate)
            );
          }
        ),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("Block Details:", {
        customer: selectedCustomer,
        reasonId: values.reasonId,
        sourceId: values.sourceId,
        duration: values.hasDuration
          ? `${values.startDate?.toLocaleDateString()} - ${values.endDate?.toLocaleDateString()}`
          : t("permanent"),
      });
      alert(t("blockSuccess", { name: selectedCustomer?.name }));
      resetForm();
      setSelectedCustomer(null);
    },
  });

  const handleSearch = () => {
    const customer = customers.find(
      (c) => c.id.toString() === formik.values.searchId
    );
    if (customer) {
      setSelectedCustomer(customer);
    } else {
      setSelectedCustomer(null);
      alert(t("errors.invalidCustomer"));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center font-cairo">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          {t("headerTitle")}
        </h1>

        {/* Search Bar */}
        <div className="flex mb-6">
          <input
            type="text"
            name="searchId"
            placeholder={t("enterCustomerId")}
            value={formik.values.searchId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`flex-1 px-4 py-2 rounded-l-md border ${
              formik.touched.searchId && formik.errors.searchId
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-info-main text-white rounded-r-md hover:bg-info-dark"
          >
            {t("search")}
          </button>
        </div>
        {formik.touched.searchId && formik.errors.searchId && (
          <p className="text-sm text-red-500 mb-4">{formik.errors.searchId}</p>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">
                {t("customerId")}
              </label>
              <input
                type="text"
                value={selectedCustomer?.id || ""}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">{t("name")}</label>
              <input
                type="text"
                value={selectedCustomer?.name || ""}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                {t("email")}
              </label>
              <input
                type="text"
                value={selectedCustomer?.email || ""}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                {t("phone")}
              </label>
              <input
                type="text"
                value={selectedCustomer?.phone || ""}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Reason Dropdown */}
          <div>
            <label className="block text-sm text-gray-700">{t("reason")}</label>
            <select
              name="reasonId"
              value={formik.values.reasonId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.reasonId && formik.errors.reasonId
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">{t("selectReason")}</option>
              {definitionsData.reasons.map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {t("lang") === "ar" ? reason.nameAR : reason.nameEN}
                </option>
              ))}
            </select>
            {formik.touched.reasonId && formik.errors.reasonId && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.reasonId}
              </p>
            )}
          </div>

          {/* Source Dropdown */}
          <div>
            <label className="block text-sm text-gray-700">{t("source")}</label>
            <select
              name="sourceId"
              value={formik.values.sourceId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.sourceId && formik.errors.sourceId
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">{t("selectSource")}</option>
              {definitionsData.sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {t("lang") === "ar" ? source.nameAR : source.nameEN}
                </option>
              ))}
            </select>
            {formik.touched.sourceId && formik.errors.sourceId && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.sourceId}
              </p>
            )}
          </div>

          {/* Duration */}
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              name="hasDuration"
              checked={formik.values.hasDuration}
              onChange={formik.handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">{t("setDuration")}</label>
          </div>
          {formik.values.hasDuration && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">
                  {t("startDate")}
                </label>
                <DatePicker
                  selected={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  {t("endDate")}
                </label>
                <DatePicker
                  selected={formik.values.endDate}
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-success-main text-white rounded-md hover:bg-success-dark"
          >
            {t("block")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlockPage;
