import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GolfCourses from "./pages/GolfCourses";
import Reviews from "./pages/Reviews";
import NonGolferGuide from "./pages/NonGolferGuide";
import BudgetCalculator from "./pages/BudgetCalculator";
import Itinerary from "./pages/Itinerary";
import Community from "./pages/Community";
import PostDetail from "./pages/PostDetail";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/golf-courses"} component={GolfCourses} />
      <Route path={"/reviews"} component={Reviews} />
      <Route path={"/non-golfer"} component={NonGolferGuide} />
      <Route path={"/budget"} component={BudgetCalculator} />
      <Route path={"/itinerary"} component={Itinerary} />
      <Route path={"/community"} component={Community} />
      <Route path={"/community/:postId"} component={PostDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
