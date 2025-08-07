import { redirect } from "next/navigation";
// import { headers } from "next/headers";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

// export async function getAbsoluteUrl(path: string) {
//   const headersList = await headers();
//   const host = headersList.get("host");
//   const protocol = headersList.get("x-forwarded-proto") || "http";
//   return `${protocol}://${host}${path}`;
// }
