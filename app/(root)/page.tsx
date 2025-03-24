import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const Home = () => (
  <>
    <BookOverview {...sampleBooks[1]}/>

    <BookList 
      title='Latest Books'
      books={sampleBooks}
      containerClassname="mt-28"
    />
  </>
);

export default Home;
