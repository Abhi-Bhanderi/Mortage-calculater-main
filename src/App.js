import { Routes, Route } from "react-router-dom";
import Slider from "./pages/Slider";
import List from "./pages/List";
import House from "./pages/House";
import SliderForm from "./pages/SliderForm";
import ListForm from "./pages/ListForm";
import HouseForm from "./pages/HouseForm";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Slider />} />
      <Route path="/list" element={<List />} />
      <Route path="/house" element={<House />} />
      <Route path="/sliderForm" element={<SliderForm />} />
      <Route path="/ListForm" element={<ListForm />} />
      <Route path="/HouseForm" element={<HouseForm />} />
    </Routes>
  </>
);
export default App;
