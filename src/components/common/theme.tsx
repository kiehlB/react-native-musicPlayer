import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from 'react-native';
import {theme} from '../../lib/colors';

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof theme.light & keyof typeof theme.dark,
) {
  const color = useColorScheme() ?? 'light';
  const colorFromProps = props[color];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme[color][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}
