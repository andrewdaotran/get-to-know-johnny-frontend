type Props = {
  icon: string;
  hobby: string;
  isEditing: boolean;
};

const IconAndTag = ({ icon, hobby, isEditing }: Props) => {
  return (
    <li className="rounded-2xl bg-secondary px-3 py-1 text-sm">
      {icon} {hobby}
    </li>
  );
};

export default IconAndTag;
