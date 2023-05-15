type Props = {
  icon: string;
  hobby: string;
};

const IconAndTag = ({ icon, hobby }: Props) => {
  return (
    <li className="rounded-2xl bg-secondary px-3 py-1 text-sm">
      {icon} {hobby}
    </li>
  );
};

export default IconAndTag;
