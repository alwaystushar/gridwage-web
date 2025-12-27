"use client";

import AboutHero from "./components/AboutHero";
import WhyChoose from "./components/WhyChoose";
import OurMission from './components/OurMission'
import ExploreSection from "./components/ExploreSection";
import OurVision from "./components/OurVision";
// import { Globe } from "../Components/UI/Globe"
import BuiltForGrowth from "./components/BuiltForGrowth";



export default function About(){
  return (
<>
<AboutHero />
<WhyChoose />
<OurMission />
<ExploreSection />
{/* <Globe /> */}
<OurVision />
<BuiltForGrowth />


</>
  );
}