const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface CreatePostPayload {
  title: string;
  description: string;
  savedFromSurgery: Boolean;
  remedy: string[];
}

export async function PostPayload(payload: CreatePostPayload) {
  try {
    console.log(BASE_URL, "/post");
    const res = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
