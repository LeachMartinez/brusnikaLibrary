import { type TReader } from "./types"

export default function ShowReader(reader: TReader) {
  return (
    <div>
      <h2>Читатель</h2>
      <h3>{reader.name}</h3>
      <span>Читает:</span>
      <div>
        {
          reader.books.map((book) => (
            <div key={book.id}>
              <h3>{book.name}</h3>
              <span>{book.author}</span>
              <button>Удалить</button>
            </div>
          ))
        }
      </div>
      <button>Редактировать</button>
      <button>Удалить читателя</button>
    </div>
  )
}