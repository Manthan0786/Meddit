import Sidebar from "./_components/sidebar/SideBar";
import StoryCard from "./_components/story-card/StoryCard";
import Tabs from "./_components/tabs/Tabs";
import { getPosts } from "../_services/posts";
import styles from "./feed.module.css";
import { auth } from "../api/auth/auth";
import CreatePostController from "./_components/create-post/CreatePostController";

export default async function MainFeed() {
  const session = await auth();
  if (!session) {
    return <h1>Please sign in to proceed</h1>;
  }
  const token = session?.user?.Token ?? "";
  const stories = await getPosts(token);

  return (
    <>
      <div className={styles.feed_root}>
        <div className={styles.feed_container}>
          <div className={styles.feed_wrapper}>
            <div className={styles.feed_col}>
              <div className={styles.compose_section}>
                <CreatePostController />
              </div>
              <Tabs />

              {stories?.posts?.length > 0 ? (
                stories.posts.map((story: any, i: number) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    index={i}
                    backendToken={token}
                  />
                ))
              ) : (
                <h1>No stories found</h1>
              )}
            </div>

            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
