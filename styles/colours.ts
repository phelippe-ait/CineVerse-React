export const colours = {
  primary: "#080C17",
  secondary: "#38384daf",
  terciary: "#919191",
  accent: "#3B82F6",
  textPrimary: "#ffffffc1",
  textSecondary: "#919191",
  buttonBackground: "#3B82F6",
  buttonText: "#ffffffc1",
  inputBackground: "#484444",
  inputBorder: "#ccc",
  navBarBackground: "#0a101d",
  navBarText: "#fff",
} as const;

export type Colours = keyof typeof colours;
