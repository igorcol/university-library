"use client";''
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";

// Made into new component to SO optimizations

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();

  const [borrowing, setBorrowing] = useState<boolean>(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
            title: "Success",
            description: "You have successfully borrowed the book.",
        });
        router.push('/');
      }
      else {
        toast({
            title: "Error",
            description: result.message || "Failed to borrow the book.",
            variant: "destructive",
        });
      }

    } catch (error) {
      console.log("❌ | Error while borrowing book:", error);
      toast({
        title: "Error",
        description: "An error ocurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button className="book-overview_btn" onClick={handleBorrowBook} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? 'Borrowing...' : 'Borrow Book'}
      </p>
    </Button>
  );
};

export default BorrowBook;
