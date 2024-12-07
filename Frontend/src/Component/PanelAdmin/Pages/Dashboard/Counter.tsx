import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Features/Store/Store";
import Button from "../../../Elements/Buttons";
import {
  decrementByAmount,
  incrementAsync,
} from "../../../Features/Counter/CounterSlice";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="my-2 counter">
        <h2 data-testid="counter" className="bg-gray-600 rounded-full p-2 inline-block font-bold text-2xl ">
          {count}
        </h2>
      </div>
      <div>
        <Button
          text="+صلوات شمار"
          className="bg-gray-950 font-semibold"
          onClick={() => dispatch(incrementAsync(10))}
        />
        <Button
          text="-صلوات شمار"
          className="bg-gray-950 font-semibold"
          onClick={() => dispatch(decrementByAmount(12))}
        />
      </div>
    </>
  );
}

export default Counter;
