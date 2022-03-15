import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

import "./assets/scss/style.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
        {/*  
          // TODO: Veroni and Subi
          <Route exact path="/create-brand" component={CreateBrand} />
          <Route exact path="/edit-brand" component={EditProduct} />

          // TODO: 
          <Route exact path="/find-brands" component={findBrands} />

          // TODO: Gabriel
          <Route exact path="/:id" component={BrandById} /> 
          <Route path="*" component={NotFound} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
