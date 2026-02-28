import { Endpoints, Gateway } from "./api";

interface CreatePostPayload {
  title: string;
  description: string;
  savedFromSurgery: Boolean;
  remedy: string[];
}

export async function PostPayload(payload: CreatePostPayload) {
  try {
    console.log(Gateway, "/post");
    const res = await fetch(`${Gateway}${Endpoints.FEED.POSTS}`, {
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
