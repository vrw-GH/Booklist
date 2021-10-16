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
      console.log(`++ Book ${book.Title} added.`);
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
myBookList.add(new Book("A","A-genre","A-author"));
myBookList.readLater();
myBookList.finishCurrentBook();
myBookList.add(new Book("B","B-genre","B-author"));
myBookList.add(new Book("C","C-genre","C-author"));
myBookList.finishCurrentBook();
myBookList.add(new Book("D","D-genre","D-author"));
myBookList.readLater();
myBookList.readLater();
myBookList.add(new Book("E","E-genre","E-author"));
myBookList.readLater();
myBookList.add(new Book("F","F-genre","F-author"));
// myBookList.finishCurrentBook();
// myBookList.finishCurrentBook();
myBookList.finishCurrentBook();
myBookList.readLater();
myBookList.sayReading();
myBookList.finishCurrentBook();
myBookList.readLater();
myBookList.add(new Book("G","G-genre","G-author"));
myBookList.finishCurrentBook();
myBookList.readLater();

console.log();
console.log(myBookList);