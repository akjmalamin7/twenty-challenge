import { Container } from "@/shared/ui";
import { BlockStack, Button, Card, Form, InlineStack, Input, ListBox, Modal, Text } from "@/shared/uiLibrary";
import { useReducer, useState, type FormEvent } from "react";
import { booksData, type BooksTypes } from "./booksData";

// ---------------- Types ----------------
type InitialStateType = {
  books: BooksTypes[];
  modal: boolean;
  message: string;
};
const initialState: InitialStateType = {
  books: booksData,
  modal: false,
  message: ""
};
type StateType = typeof initialState;

// ---------------- Actions ----------------
type ActionType =
  | { type: "ADD_BOOK"; payload: { title: string } }
  | { type: "UPDATE_BOOK"; payload: { book: BooksTypes } }
  | { type: "DELETE_BOOK"; payload: { id: number } }
  | { type: "TOGGLE_MODAL"; payload: { modal: boolean } };

// ---------------- Reducer ----------------
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ADD_BOOK": {
      const newBook: BooksTypes = {
        id: state.books.length + 1,
        title: action.payload.title,
        author: "Unknown"
      };
      return {
        ...state,
        books: [...state.books, newBook],
        modal: true,
        message: `Book "${action.payload.title}" added successfully!`
      };
    }
    case "UPDATE_BOOK": {
      const updatedBooks = state.books.map(book =>
        book.id === action.payload.book.id ? { ...book, title: action.payload.book.title } : book
      );
      return {
        ...state,
        books: updatedBooks,
        modal: true,
        message: `Book "${action.payload.book.title}" updated successfully!`
      };
    }
    case "DELETE_BOOK": {
      const filteredBooks = state.books.filter(book => book.id !== action.payload.id);
      return {
        ...state,
        books: filteredBooks,
        modal: true,
        message: "Book deleted successfully!"
      };
    }
    case "TOGGLE_MODAL": {
      return { ...state, modal: action.payload.modal };
    }
    default:
      return state;
  }
};

// ---------------- Component ----------------
const ReducerTest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bookTitle, setBookTitle] = useState("");
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  // Add / Update book
  const handleBookSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;

    if (editingBookId) {
      dispatch({
        type: "UPDATE_BOOK",
        payload: { book: { id: editingBookId, title: bookTitle, author: "Unknown" } }
      });
    } else {
      dispatch({
        type: "ADD_BOOK",
        payload: { title: bookTitle }
      });
    }

    setBookTitle("");
    setEditingBookId(null);
  };

  // Modal toggle
  const handleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: { modal: !state.modal } });
  };

  // Select book to edit
  const handleEditBook = (book: BooksTypes) => {
    setBookTitle(book.title);
    setEditingBookId(book.id);
  };

  return (
    <Container size="xs" className="mt-10">
      <BlockStack>
        <Form gapY={20} onSubmit={handleBookSubmit}>
          <Input
            size="lg"
            name="title"
            placeholder="Enter book title"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
          />
          <Button size="lg" block type="submit">
            {editingBookId ? "Update Book" : "Add Book"}
          </Button>
        </Form>

        <Card className="!mt-10" padding={60}>
          <ListBox listBoxClass="">
            {state.books.map((book) => (
              <ListBox.Option key={book.id}>
                <InlineStack gapX={50} justifyContent={"space-between"}>
                  <InlineStack className="!max-w-[max-content]"><Text >{book.title}</Text></InlineStack>
                  <InlineStack gapX={40} justifyContent={"end"}>
                    <Button size="xs" onClick={() => handleEditBook(book)}>Edit</Button>
                    <Button
                      size="xs"
                      variant="fill"
                      onClick={() => dispatch({ type: "DELETE_BOOK", payload: { id: book.id } })}
                    >
                      Delete
                    </Button>
                  </InlineStack>
                </InlineStack>
              </ListBox.Option>
            ))}
          </ListBox>

          {state.modal && (
            <Modal
              open={state.modal}
              onClose={handleModal}
              title="Books"
              buttons={<Button onClick={handleModal}>Cancel</Button>}
            >
              <Text>{state.message}</Text>
            </Modal>
          )}
        </Card>
      </BlockStack>
    </Container>
  );
};

export default ReducerTest;
