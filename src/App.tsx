import "./App.css";
import { useState } from "react";
import BookListContainer from "./components/book-list-container/book-list-container.component";
import Search from "./components/search/search.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store";
import SearchBookListContainer from "./components/search/search.component";
function App() {
  return (
    <Provider store={store}>
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookListContainer />}/>
            <Route path="search" element={<SearchBookListContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
