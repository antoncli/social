import { UserIcon } from "@share/ui/UserIcon/UserIcon";
import { MouseEventHandler } from "react";
import RoundButton from "@share/ui/RoundButton/RoundButton";

type Props = {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function UserIconButton({ name, onClick }: Props) {
  return (
    <RoundButton onClick={onClick}>
      <UserIcon name={name} />
    </RoundButton>
  );
}
