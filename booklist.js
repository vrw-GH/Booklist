class Book{
   constructor(title,genre,author) {
   this.Title =title,
   this.Genre = genre,
   this.Author = author,
   this.Read = false,
   this.ReadDate = 0   // JS Date() object
   };
}

class BookList{
   constructor(){
      this.books = [],
      this.readBooks = 0,
      this.toRead = 0, //this.books.length - this.readBooks,
      this.nowBook = 0,
      this.nextBook = 0,
      this.lastBook = 0
   }

   add(book) {
      this.books.push(book);
      this.toRead++;
      if (this.nowBook === 0){
         this.nowBook = book;
      } else if (this.nextBook === 0){
            this.nextBook = book;
      };
      console.log(`++ Book added: ${book.Title}.`);
      this.sayReading();
   }

   finishCurrentBook() {
      if (this.nowBook === 0){
         return; // no message needed... for now
      } else {
         this.nowBook.Read = true;
         this.nowBook.ReadDate = new Date();
         console.log(`=  Book ${this.nowBook.Title} completed on `+
            this.nowBook.ReadDate.getDate()+"/"+
            (this.nowBook.ReadDate.getMonth()+1)+"/"+
            this.nowBook.ReadDate.getFullYear());
         this.readBooks++;
         this.toRead = this.books.length - this.readBooks;
         this.lastBook = this.nowBook;
         this.nowBook = 0;
         if (this.nextBook != 0){
            this.nowBook = this.nextBook;
            this.nextBook = 0;
            let filteredBooks = this.books.filter(function (currentElement) {
               return !currentElement.Read;
            });
            if (filteredBooks.length>1) {
               this.nextBook = filteredBooks[1];
            } else {
               this.nextBook = 0;
            }
         }
         this.sayReading();
      };
   }

   listBooks(sortBy) {
      let arr1 = Array.from(this.books);
         switch (sortBy) {
         case "A":
            sortBy="Author"
            arr1.sort(function (a,b) {
               let ret = (a.Author.toUpperCase() < b.Author.toUpperCase()) ? -1 : 0;
               return (a.Author.toUpperCase() > b.Author.toUpperCase()) ? 1 : ret;
            });
            break;
         case "G":
            sortBy="Genre"
            arr1.sort(function (a,b) {
               let ret = (a.Genre.toUpperCase() < b.Genre.toUpperCase()) ? -1 : 0;
               return (a.Genre.toUpperCase() > b.Genre.toUpperCase()) ? 1 : ret;
            });
            break;
         case "D":
            sortBy="DateRead"
            arr1.sort(function (a,b) {
               let ret = (a.ReadDate < b.ReadDate) ? -1 : 0;
               return (a.ReadDate > b.ReadDate) ? 1 : ret;
            });
            break;
         case "R":
            sortBy="Read"
            arr1.sort(function (a,b) {
               let ret = (a.Read < b.Read) ? -1 : 0;
               return (a.Read > b.Read) ? 1 : ret;
            });
            break;
         default:
            sortBy="Title"
            arr1.sort(function (a,b) {
               let ret = (a.Title.toUpperCase() < b.Title.toUpperCase()) ? -1 : 0;
               return (a.Title.toUpperCase() > b.Title.toUpperCase()) ? 1 : ret;
            });
            break
         }
      console.table(`Sorted by: ${sortBy} -`);
      console.table(arr1);
   }

   sayReading() {
      let messageLine = "";
      if (this.nowBook === 0) {
         messageLine = "           *** (Nothing more to read!)";
      } else {
         messageLine = `           *** Reading ${this.nowBook.Title}, `;
         messageLine += (this.nextBook === 0) ? "(Nothing more to read!)":`(${this.nextBook.Title} is next).`;
      }

      console.log(messageLine);
   }

   readLater() {
      if (this.nextBook === 0){
         console.log((this.nowBook === 0)?"!! No books!":`!! Cant skip, ${this.nowBook.Title} is the only book.`);
         return;
      } else {
         //this.nowBook.Read = false;
         //this.nowBook.ReadDate = 0
         let nowBook = this.nowBook;
         this.books.splice(this.books.indexOf(this.nowBook), 1);
         this.books.push(nowBook);
         this.nowBook = this.nextBook;
         this.nextBook = 0;
         let unreadBooks = this.books.filter(function (currentElement) {
            return !currentElement.Read;
         });
         if (unreadBooks.length>1) {
            this.nextBook = unreadBooks[1];
         } else {
            this.nextBook = 0;
            console.log();
            console.log("--- Nothing more to read!");
            console.log();
         }
      console.log(`>> Skipped ${nowBook.Title},`);
      this.sayReading();
      }
   }
}

console.clear();
const myBookList = new BookList();
myBookList.readLater();
myBookList.add(new Book("Where the Deer and the Antelope Play","Hardcover","Nick Offerman"));
myBookList.readLater();
myBookList.finishCurrentBook();
myBookList.add(new Book("Komi Can’t Communicate","Paperback","Tomohito Oda"));
myBookList.add(new Book("Stop Overthinking","Paperback","Nick Trenton"));
myBookList.finishCurrentBook();
myBookList.add(new Book("The Pout-Pout Fish","Board book","Deborah Diesen"));
myBookList.readLater();
myBookList.readLater();
myBookList.add(new Book("The Modern Herbal Dispensatory","Paperback","Easley & Horne"));
myBookList.readLater();
myBookList.add(new Book("Bushcraft 101","Paperback","Dave Canterbury"));
// myBookList.finishCurrentBook();
// myBookList.finishCurrentBook();
myBookList.finishCurrentBook();
myBookList.readLater();
myBookList.sayReading();
myBookList.finishCurrentBook();
myBookList.readLater();
myBookList.add(new Book("The Book with No Pictures","Hardcover","B. J. Novak"));
myBookList.finishCurrentBook();
myBookList.readLater();
myBookList.finishCurrentBook();

console.log();
myBookList.listBooks("A");
myBookList.listBooks("G");
myBookList.listBooks("R");
myBookList.listBooks("T");
myBookList.sayReading();
console.log();