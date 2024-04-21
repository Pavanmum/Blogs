import Navbar from "../components/Navbar";
import React, { Suspense } from "react";

const LazyPostComponent = React.lazy(() => import("../components/Posts"));

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyPostComponent />
      </Suspense>
    </div>
  );
};
export default HomePage;
