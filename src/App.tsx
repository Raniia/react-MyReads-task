import "./App.css";
import Homepage from "./pages/home-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store/store";
import SearchPage from "./pages/search-page";
import { ConnectedRouter } from 'connected-react-router'
import { historyBrowser } from "./store/middlewares/history";

function App() {
  return (
    <Provider store={store}>
      {/* <ConnectedRouter history={historyBrowser}> */}
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="search" element={<SearchPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      {/* </ConnectedRouter> */}
    </Provider>
  );
}

export default App;
