import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const Home = async () => {

  return (
    <>
      {/* OVERVIEW */}
      <BookOverview
        {...{
          ...sampleBooks[0],
          color: sampleBooks[0].coverColor,
          video: sampleBooks[0].videoUrl,
        }}
      />

      {/* BOOK LIST */}
      <BookList
        title="Latest Books"
        books={sampleBooks.map((book) => ({
          ...book,
          color: book.coverColor,
          video: book.videoUrl,
        }))}
        containerClassname="mt-28"
      />
    </>
  );
};

export default Home;
