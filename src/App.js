import "./App.css";
import InfiniteScroll from "./Components/InfiniteScroll";
import { useMediaQuery } from "react-responsive";

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  return (
    <div className="App">
      <InfiniteScroll isDesktopOrLaptop={isDesktopOrLaptop} />
    </div>
  );
}

export default App;
