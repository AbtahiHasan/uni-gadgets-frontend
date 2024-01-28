/* eslint-disable @typescript-eslint/no-explicit-any */
import { GadgetCard } from "@/components/shared/gadget-card";
import Heading from "@/components/shared/heading";
import { useGetGadgetsQuery } from "@/redux/features/gadgets/gadgetsApi";

const SalesManagement = () => {
  const { data } = useGetGadgetsQuery(null);
  console.log({ data });
  return (
    <main>
      <Heading title="Sales Management" />
      <section className="md:grid grid-cols-3 gap-5 mt-10">
        {Array.isArray(data?.data) &&
          data?.data?.map((gadget: any) => {
            const {
              _id,
              name,
              price,
              releaseDate,
              brand,
              modelNumber,
              category,
            } = gadget;
            return (
              <GadgetCard
                key={_id}
                name={name}
                price={price}
                releaseDate={releaseDate}
                brand={brand}
                modelNumber={modelNumber}
                category={category}
              />
            );
          })}
      </section>
    </main>
  );
};

export default SalesManagement;
