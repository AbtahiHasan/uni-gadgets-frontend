/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/shared/heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSaleHistoryQuery } from "@/redux/features/sales/SalesApi";
import moment from "moment";
import { useState } from "react";

const SalesHistory = () => {
  const [value, setValue] = useState("week");
  const { data, refetch } = useGetSaleHistoryQuery(value);

  return (
    <div>
      <Heading title="Sales History" />
      <div className="w-full flex justify-end max-w-[900px] mx-auto mt-2">
        <Select
          value={value}
          onValueChange={(value) => {
            setValue(value);
            refetch();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <section className="overflow-x-auto ">
        <table className="w-[900px] mx-auto mt-5">
          <thead className="bg-[#c1c1c1] ">
            <tr>
              <th className="py-2">Index</th>
              <th className="py-2">Buyer Name</th>
              <th className="py-2">Buy Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data?.data) && data?.data?.length === 0 && (
              <p className="my-2 text-center">no data found</p>
            )}
            {Array.isArray(data?.data) &&
              data?.data?.map((sale: any, i: number) => {
                const { _id, buyerName, buyDate } = sale;

                return (
                  <tr key={_id} className="border-b ">
                    <td className="font-bold py-1 text-center">{i + 1}</td>
                    <td className="py-1 text-center">{buyerName}</td>
                    <td className="py-1 text-center">
                      {moment(buyDate).format("DD/MM/YYYY")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SalesHistory;
