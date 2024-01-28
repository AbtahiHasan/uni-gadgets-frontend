import { FC } from "react";

interface IHeadingProps {
  title: string;
}

const Heading: FC<IHeadingProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">{title}</h2>
    </div>
  );
};

export default Heading;
