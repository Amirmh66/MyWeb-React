import Container from "./Component/Layouts/Container";
import { Provider } from "react-redux";
import { store, persister } from "./Component/Features/Store/Store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Container />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
