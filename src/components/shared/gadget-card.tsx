import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import moment from "moment";
import { Button } from "../ui/button";

interface IProps {
  name: string;
  price: number;
  releaseDate: Date;
  brand: string;
  modelNumber: string;
  category: string;
}

export const GadgetCard: FC<IProps> = ({
  name,
  price,
  releaseDate,
  brand,
  modelNumber,
  category,
}) => {
  return (
    <Card>
      <CardHeader />
      <CardContent>
        <h2 className="text-xl my-2 font-bold">{name}</h2>
        <hr />
        <p className="flex gap-2 mt-2">
          <span className="font-bold">Price:</span>
          {price}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Release Date:</span>

          <span>{moment(releaseDate).format("DD/MM/YYYY")}</span>
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Brand:</span>
          {brand}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Model:</span>
          {modelNumber}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Category:</span>
          {category}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sell</Button>
      </CardFooter>
    </Card>
  );
};
