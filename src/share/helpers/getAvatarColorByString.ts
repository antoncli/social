import { AvatarColors } from "@/share/constants/AvatarColors";
import { numberFromText } from "@/share/helpers/numberFromText";

export const getAvatarColorByString = (str: string): string => {
  return AvatarColors[numberFromText(str) % AvatarColors.length];
};
