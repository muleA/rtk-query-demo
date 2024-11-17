import React from "react";
import {
  MantineProvider as Provider,
  MantineThemeOverride,
  ColorSchemeScript,
} from "@mantine/core";
import { theme as baseTheme } from "../theme";
import { Notifications } from "@mantine/notifications";

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Partial<MantineThemeOverride> = baseTheme;

  return (
    <Provider theme={theme}>
      <ColorSchemeScript />
      <Notifications />

      {children}
    </Provider>
  );
}
