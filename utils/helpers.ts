export const sendRequest = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, init);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || `API Error: ${res.status}`);
    }

    return data as T;
  } catch (error) {
    console.error("API Request failed", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown fetch error");
  }
};
