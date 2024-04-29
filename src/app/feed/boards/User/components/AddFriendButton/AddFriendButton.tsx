import { User } from "@/schemas/UserSchema";
import { friendshipService } from "@/services/friendshipService";
import { LeftIconButton } from "@/share/ui/LeftIconButton/LeftIconButton";
import { useQuery } from "@tanstack/react-query";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FriendshipSchema } from "@/schemas/FriendshipSchema";

type Props = {
  name: string;
};

export default function AddFriendButton({ name }: Props) {
  const data = useQuery({ queryKey: ["name", name], queryFn: () => friendshipService.get(name), retry: false });

  const friendParseResult = FriendshipSchema.safeParse(data.data?.data);
  const friendshipInitiated = friendParseResult.success;
  const isIFriendshipInitiator = friendParseResult.success && friendParseResult.data.name2 === name;
  const accepted = friendParseResult.success && friendParseResult.data.accepted;

  const addFriendButtonClick = () => {
    friendshipService.add(name);
  };

  if (!friendshipInitiated) {
    return <LeftIconButton icon={faUserPlus} text='Add friend' onClick={addFriendButtonClick} />;
  } else if (accepted) {
    return <LeftIconButton icon={faUserPlus} text='You are friends' onClick={addFriendButtonClick} disabled={true} />;
  } else if (!isIFriendshipInitiator) {
    return <LeftIconButton icon={faUserPlus} text='Accept friendship' onClick={addFriendButtonClick} />;
  } else {
    return <LeftIconButton icon={faUserPlus} text='Add friend' onClick={addFriendButtonClick} disabled={true} />;
  }
}
