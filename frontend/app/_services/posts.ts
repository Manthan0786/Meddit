import { Endpoints, Gateway } from "./api";

interface CreatePostPayload {
  title: string;
  description: string;
  savedFromSurgery: Boolean;
  remedy: string[];
}

export async function PostPayload(
  payload: CreatePostPayload,
  backendToken: string,
) {
  if (!backendToken) {
    return {
      error: "No backend token provided",
    };
  }
  try {
    const response = await fetch(`${Gateway}${Endpoints.FEED.CREATE_POST}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${backendToken}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPosts(backendToken: string) {
  try {
    const response = await fetch(`${Gateway}${Endpoints.FEED.GET_POSTS}`, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function voteOnPost(
  postId: number,
  direction: "up" | "down",
  backendToken: string,
) {
  if (!backendToken) {
    throw new Error("No backend token provided");
  }

  const response = await fetch(`${Gateway}${Endpoints.FEED.VOTE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${backendToken}`,
    },
    body: JSON.stringify({
      post_id: postId,
      direction,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update vote");
  }

  const data = await response.json();
  return data as { votes: number; totalVotes: number };
}
