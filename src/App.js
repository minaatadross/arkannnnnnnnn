// App.js
import React from "react";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import UnderConstruction from "./components/UnderConstruction/UnderConstruction";
import Services from "./components/Services/Services";
import CommercialProjects from "./components/CommercialProjects/CommercialProjects";
import Bathroom from "./components/Bathroom/Bathroom";
import Bedroom from "./components/Bedroom/Bedroom";
import Dinning from "./components/Dinning/Dinning";
import Dressing from "./components/Dressing/Dressing";
import Kitchen from "./components/Kitchen/Kitchen";
import Living from "./components/Living/Living";
import Hospital from "./components/Hospital/Hospital";
import Office from "./components/Office/Office";
import Resturant from "./components/Resturant/Resturant";
import ScrollToTop from "./components/ScrollToTop";
import Commercial from "./components/Commercial/Commercial";
import Residential from "./components/Residential/Residential";
import Design from "./components/Design/Design";
import Design3D from "./components/Design3D/Design3D";
import Production from "./components/Production/Production";
import Home from "./components/Home/Home";
import BackToTop from "./components/BackToTop/BackToTop";
import Analytics from "./components/Analytics/Analytics";
import ScrollAnimations from "./components/Animations/ScrollAnimations";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/ContactUs" component={ContactUs} />
          <Route exact path="/services" component={Services} />
          <Route
            exact
            path="/commercialProjects"
            component={CommercialProjects}
          />
          <Route exact path="/bathroom" component={Bathroom} />
          <Route exact path="/bedroom" component={Bedroom} />
          <Route exact path="/dinning" component={Dinning} />
          <Route exact path="/dressing" component={Dressing} />
          <Route exact path="/kitchen" component={Kitchen} />
          <Route exact path="/living" component={Living} />
          <Route exact path="/hospital" component={Hospital} />
          <Route exact path="/office" component={Office} />
          <Route exact path="/resturant" component={Resturant} />
          <Route exact path="/Commercial" component={Commercial} />
          <Route exact path="/Residential" component={Residential} />
          <Route exact path="/Design" component={Design} />
          <Route exact path="/3DDesign" component={Design3D} />
          <Route exact path="/production" component={Production} />
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/under-construction"
            component={UnderConstruction}
          />
        </Switch>
        <Footer />
        <BackToTop />
        <Analytics />
        <ScrollAnimations />
      </BrowserRouter>
    </div>
  );
};

export default App;
