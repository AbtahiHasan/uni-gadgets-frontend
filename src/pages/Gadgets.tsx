/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { useGetGadgetsQuery } from "@/redux/features/gadgets/gadgetsApi";
import { Link } from "react-router-dom";

const Gadgets = () => {
  const { data } = useGetGadgetsQuery(undefined);
  return (
    <main>
      <Heading title="Gadgets Management" />

      <section>
        <table className="w-[900px] mx-auto mt-10">
          <thead className="bg-[#c1c1c1] ">
            <tr>
              <th className="py-2">Index</th>
              <th className="py-2">Gadgets Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Release Date</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data?.data) &&
              data?.data?.map((gadget: any, i: number) => {
                const {
                  _id,
                  name,
                  price,
                  releaseDate,
                  brand,

                  category,
                  quantity,
                } = gadget;

                return (
                  <tr key={_id}>
                    <td className="font-bold">{i + 1}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{releaseDate}</td>
                    <td>{brand}</td>
                    <td>{category}</td>
                    <td>
                      <Link to={`/dashboard/gadgets/${_id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button>Delete</Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Gadgets;
