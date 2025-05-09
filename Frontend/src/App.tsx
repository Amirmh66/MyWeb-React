import Container from "./Component/Layouts/Container";
import { Provider } from "react-redux";
import { store, persister } from "./Component/Features/Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DeviceProvider } from "./Component/Context/DeviceContext";


const domain: any = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId: any = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
const org: any = window.location.origin;
const queryClient = new QueryClient();


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DeviceProvider>
          <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: org }}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persister}>
                <Container />
              </PersistGate>
            </Provider>
          </Auth0Provider>
        </DeviceProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
