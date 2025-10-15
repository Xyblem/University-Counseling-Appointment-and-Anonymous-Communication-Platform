import {router} from "./router";
import {RouterProvider} from "react-router-dom";
import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
          <RouterProvider router={router}></RouterProvider>
      </div>
  );
};

export default App;