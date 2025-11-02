import { theme } from "@ui/styles/theme";
import { Text } from "react-native";

interface iAppTextProps extends React.ComponentProps<typeof Text> {
  size?: keyof typeof theme.fontSize;
  family?: keyof typeof theme.fontFamily;
  weight?: keyof typeof theme.fontFamily.sans;
  color?: string;
};

export function AppText({
  size = 'base',
  family = 'sans',
  weight = 'regular',
  color = theme.colors.black[700],
  style,
  ...props
}: iAppTextProps) {
  return (
    <Text
    style={[
      {
        fontFamily: theme.fontFamily[family][weight],
        fontSize: theme.fontSize[size],
        color,
      },
      style,
    ]}
      {...props}
    />
  )
};
