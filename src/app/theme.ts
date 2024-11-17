import type { MantineThemeOverride } from "@mantine/core";
export const theme: Partial<MantineThemeOverride> = {
  defaultRadius: "sm",
  primaryColor: "primary",
  primaryShade: 7,
  fontFamily: "inherit",
  fontFamilyMonospace: "inherit",
  fontSizes: {
    xs: "12px",
    sm: "13px",
    md: "16px",
    lg: "19px",
    xl: "24px",
  },
  breakpoints: {
    xs: "412px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  colors: {
    primary: [
      "#e1faff",
      "#cef0fe",
      "#a2def6",
      "#72caef",
      "#4cbae9",
      "#31afe6",
      "#1baae5",
      "#0095cc",
      "#0085b8",
      "#0073a3",
    ],
  },

  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "xs",
        fz: "12px",
        fw: 500,
        px: 12,
      },
      styles: {
        section: {
          marginRight: 4,
          marginLeft: 8,
        },
      },
    },

    Input: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    TextInput: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
        error: "min-h-[15px]",
      },
    },
    // TextInput: TextInput.extend({
    //   classNames: InputClasses
    // }),
    NumberInput: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Select: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    PasswordInput: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    DatePickerInput: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "sm",
        miw: 60,
      },
    },
    CheckboxGroup: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Radio: {
      defaultProps: {
        size: "sm",
        miw: 60,
      },
    },
    RadioGroup: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Textarea: {
      defaultProps: {
        size: "sm",
        miw: 100,
      },
      classNames: {
        root: "form-field",
        label: "font-bold",
      },
    },
    Breadcrumbs: {
      styles: {
        breadcrumb: {
          fontSize: "14px",
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: "var(--card)",
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: "#F3F4F6",
        },
        header: {
          height: 40,
        },
      },
    },
    Loader: {
      defaultProps: {
        type: "bars",
      },
    },
  },
};
