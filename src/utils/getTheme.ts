import { Appearance } from "react-native";
import { dark_theme_colors, light_theme_colors } from "./colors";

const isDarkMode = Appearance.getColorScheme() === 'dark' ? true : false;

export const Colors = isDarkMode ? dark_theme_colors : light_theme_colors
