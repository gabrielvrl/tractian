import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
  background: string
  pink?: string
  darker_pink?: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    palette: {
      common: {
        black: string
        white: string
      }
      primary: IPalette
      secondary: IPalette
   }
  }
}