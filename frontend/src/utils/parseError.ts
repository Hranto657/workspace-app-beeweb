export const parseError = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response?.data?.message === "string"
  ) {
    return (error as any).response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred. Please try again.";
};
