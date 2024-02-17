import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundButton from "@share/ui/RoundButton/RoundButton";
import { MouseEventHandler } from "react";

type Props = {
  icon: IconProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function RoundIconButton({ icon, onClick }: Props) {
  return (
    <RoundButton onClick={onClick}>
      <FontAwesomeIcon icon={icon} size='lg' />
    </RoundButton>
  );
}
