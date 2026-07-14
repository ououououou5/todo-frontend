import { AuthProvider } from "./states/AuthContext";
import AppComponent from "./components/AppComponent/AppComponent";

export default function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  );
}
