

export interface User {
    userID: number,
    age: number,
    gender: string
}

export interface Book {
    bookID: number,
    bookName: string
}

export interface ReadingHabits {
    habitID: number,
    pagesRead: number,
    submissionMoment: string,
    book: Book,
    user: User
}
