// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    listColor?: string;
    bgColor: string;
    accentColor: string;
    titleColor: string;
    borderColor: string;
  }
}
