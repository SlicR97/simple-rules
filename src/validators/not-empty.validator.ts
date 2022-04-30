export namespace NotEmpty {
  export const validator = (x: string | any[]): boolean => {
    return x.length !== 0;
  };

  export const errorMessage = "String or array must not be empty.";
}
