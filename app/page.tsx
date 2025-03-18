"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../components/manual/Landing/Loader"
import Dashboard from "../components/manual/Landing/Dashboard";

const Home = () => {
  const [isCurtainLifted, setIsCurtainLifted] = useState(false);
  const curtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) {
      console.error("Curtain element not found");
      return;
    }

    console.log("Curtain element:", curtain);

    // Ensure animation starts after mounting
    requestAnimationFrame(() => {
      curtain.style.transform = "translateY(-100%)";
    });

    // Wait for the animation to complete before showing content
    curtain.addEventListener("transitionend", () => {
      setIsCurtainLifted(true);
    });
  }, []);

  return (
    <>
      {/* Curtain */}
      <div
        ref={curtainRef}
        className="curtain z-50 fixed inset-0 h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center transition-transform duration-1000 ease-in-out"
        style={{ transform: "translateY(0%)" }}
      >
         <Loader />
      </div>

      {/* Content */}
      <div
        className={`content w-full h-full bg-gradient-to-br from-purple-600 to-purple-900  transition-opacity duration-1000 ${
          isCurtainLifted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Dashboard></Dashboard>
      </div>
    </>
  );
};

export default Home;
