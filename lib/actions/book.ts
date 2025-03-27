'use server'

import { db } from "@/database/drizzle"
import { books, borrowRecords } from "@/database/schema"
import { eq } from "drizzle-orm"
import dayjs from 'dayjs'

export const borrowBook = async (params: BorrowBookParams) => {
    const { bookId, userId } = params

    try {
        const book = await db
            .select({ availableCopies: books.availableCopies })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1)

        if (!book.length || book[0].availableCopies <= 0) { // Verifies if book does not exist or there is no available copies
            return {
                success: false,
                message: 'This book is not available for borrowing.'
            }
        }

        const dueDate = dayjs().add(7, 'day').toDate().toDateString();  // Set due date to 7 days from the borrowing date
        
        // Creates borrowed book record and inserts into "borrowRecords" table
        const record = db.insert(borrowRecords).values({ 
            userId, 
            bookId, 
            dueDate, 
            status: 'BORROWED'
        })
        
        // Mutate original books, changing the available copies number
        await db.update(books)
            .set({availableCopies: book[0].availableCopies - 1})
            .where(eq(books.id, bookId))

        return {
            success: true,
            data: JSON.parse(JSON.stringify(record))
        }
    }
    catch (error) {
        console.log('✖️ | Error while borrowing book:', error)
        return {
            success: false,
            message: 'An error ocurred while borrowing the book'
        }
    }
}