export async function getStories() {
  try {
    const res = await fetch("http://localhost:1323/");
    if (!res.ok) {
      throw new Error(`Failed to fetch stories: ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched stories:", data);
    return data.posts || [];
  } catch (err) {
    console.error("Failed to fetch stories:", err);
    return [];
  }
}
