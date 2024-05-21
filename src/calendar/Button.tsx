import VanillaCalendar from "./index";
import React, { useEffect } from "react";

export const Button = () => {
  useEffect(() => {
    const calendarEl = document.querySelector("#calendar");
    console.log(calendarEl)
    if (calendarEl) {
      new VanillaCalendar(calendarEl as any).init();
    }
  }, []);

  return <div id="calendar"></div>;
};
