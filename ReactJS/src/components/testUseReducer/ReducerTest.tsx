import { Container } from "@/shared/ui";
import { BlockStack, Button, Card, Form, Input, ListBox, Modal, Text } from "@/shared/uiLibrary";
import { useReducer, useState, type FormEvent } from "react";
import { booksData, type BooksTypes } from "./booksData";

// ---------------- Types ----------------
type InitialStateTypes = {
  books: BooksTypes[],
  modal: boolean,
  message: string;
}

// ---------------- Initial State ----------------
const initialState: InitialStateTypes = {
  books: booksData,
  modal: false,
  message: ""
}
type StateTypes = typeof initialState;
// ---------------- Actions ----------------
type ActionTypes = { type: "ADD_BOOK", payload: { id: number, title: string, author: string } } | { type: "UPDATE_BOOK", payload: { id: number, title: string, author: string } } | { type: "DELETE_BOOK", payload: { id: number } } | { type: "TOGGLE_MODAL" }

// ---------------- Reducer ----------------
const reducer = (state: StateTypes, action: ActionTypes): StateTypes => {
  switch (action.type) {
    case "ADD_BOOK": {
      const newBook = {
        id: state.books.length + 1,
        title: action.payload.title,
        author: action.payload.author
      }
      return {
        ...state,
        books: [...state.books, newBook],
        modal: true,
        message: `Book "${action.payload.title}" added successfully!`
      }
    }
    case "UPDATE_BOOK": {
      const updatedBooks = state.books.map(book => book.id === action.payload.id ? { ...book, title: action.payload.title, author: action.payload.author } : book);
      return {
        ...state,
        books: updatedBooks,
        modal: true,
        message: `Book "${action.payload.title}" updated successfully!`
      }
    }
    case "DELETE_BOOK": {
      const filteredBooks = state.books.filter(book => book.id !== action.payload.id);
      return {
        ...state,
        books: filteredBooks,
        modal: true,
        message: `Book with id ${action.payload.id} deleted successfully!`
      }
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        modal: !state.modal
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
    dispatch({ type: "ADD_BOOK", payload: { id: state.books.length + 1, title: bookTitle, author: "Unknown" } });
    setBookTitle("");
  };

  // Modal toggle
  const handleModal = () => {
    dispatch({ type: "TOGGLE_MODAL" })
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
