import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();
   
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[]

  return (
    <>
      {/* OVERVIEW */}
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      {/* BOOK LIST */}
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)} // Starts displaying from the second element because the first one is already in the overview
        containerClassname="mt-28"
      />
    </>
  );
};

export default Home;
