
import { Layout } from "./components/Layout";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path={"/"}>
        {() => (
          <Layout>
            <Home />
          </Layout>
        )}
      </Route>
      <Route path={"/about"}>
        {() => (
          <Layout>
            <About />
          </Layout>
        )}
      </Route>
      <Route path={"/projects"}>
        {() => (
          <Layout>
            <Projects />
          </Layout>
        )}
      </Route>
      <Route path={"/contact"}>
        {() => (
          <Layout>
            <Contact />
          </Layout>
        )}
      </Route>
      <Route path={"/404"}>
        {() => (
          <Layout>
            <NotFound />
          </Layout>
        )}
      </Route>
      {/* Final fallback route */}
      <Route>
        {() => (
          <Layout>
            <NotFound />
          </Layout>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
