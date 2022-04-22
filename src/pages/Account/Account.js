import React from "react";
import { Outlet } from "react-router-dom";
function Account() {
  return (
      <div className="max-w-[1200px] mb-[200px] m-auto">
        <Outlet />
      </div>
  );
}

export default Account;
