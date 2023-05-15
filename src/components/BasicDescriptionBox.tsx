type Props = {
  title: string;
  description: string;
};

const BasicDescriptionBox = ({ title, description }: Props) => {
  return (
    <div className="grid gap-2 rounded-md bg-main px-6 py-4">
      <h2 className="w-fit font-semibold">{title}</h2>
      <p className="text-sm text-grayText">{description}</p>
    </div>
  );
};

export default BasicDescriptionBox;
