import SelectBox from "./component/select-box";
import "./styles.css";
import data from "./data/data";
export default function App() {
  return (
    <div className="App">
      <SelectBox data={data} />
    </div>
  );
}
