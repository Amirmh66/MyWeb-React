import Container from "./Component/Layouts/Container";
import { AuthProvider } from "./Component/Provider/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Container />
      </AuthProvider>
    </>
  );
}

export default App;
