import { Container } from "@/shared/ui";
import { BlockStack, Button, Card, Form, Input, ListBox, Modal, Text } from "@/shared/uiLibrary";
import { useReducer, useState, type FormEvent } from "react";
import { booksData, type BooksTypes } from "./booksData";

// ---------------- Types ----------------
type InitialStateType = {
  books: BooksTypes[];
  modal: boolean;
  message: string;
}
const initialState: InitialStateType = {
  books: booksData,
  modal: false,
  message: ""
}
type StateType = typeof initialState;
// ---------------- Actions ----------------
type ActionType = { type: "ADD_BOOK", payload: { title: string, author: string } } | { type: "UPDATE_BOOK", payload: { books: BooksTypes } } | { type: "DELETE_BOOK", payload: { id: number } } | { type: "TOGGLE_MODAL", payload: { modal: boolean } };


// ---------------- Reducer ----------------
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_BOOK": {
      const newBooks: BooksTypes = {
        id: state.books.length + 1,
        title: action.payload.title,
        author: action.payload.author
      }
      return {
        ...state,
        books: [...state.books, newBooks],
        modal: !state.modal,
        message: "Book added successfully!"
      }
    }
    case "UPDATE_BOOK": {
      const updateBooks = state.books.map(book => book.id === action.payload.books.id ? action.payload.books : book);
      return {
        ...state,
        books: updateBooks,
        modal: !state.modal,
        message: "Book updated successfully!"
      }
    }
    case "DELETE_BOOK": {
      const filteredBooks = state.books.filter(book => book.id !== action.payload.id);
      return {
        ...state,
        books: filteredBooks,
        modal: !state.modal,
        message: "Book deleted successfully!"
      }
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        modal: action.payload.modal
      }
    }
    default:
      return state;
  }
}


// ---------------- Component ----------------
const ReducerTest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bookTitle, setBookTitle] = useState("");

  // Form submit handler
  const handleBookSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookTitle) return;
    dispatch({ type: "ADD_BOOK", payload: { title: bookTitle, author: "Unknown" } });
    setBookTitle("");
  };

  // Modal toggle
  const handleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: { modal: !state.modal } });
  };

  return (
    <Container size="xs" className="mt-10">
      <BlockStack>
        <Form gapY={70} onSubmit={handleBookSubmit}>
          <Input
            size="lg"
            name="title"
            placeholder="Enter book title"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
          />
          <Button size="lg" block type="submit">
            Submit
          </Button>
        </Form>

        <Card className="!mt-10" padding={60}>
          <ListBox listBoxClass="">
            {state.books.map((book) => (
              <ListBox.Option key={book.id}>
                <Text>{book.title}</Text>
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
