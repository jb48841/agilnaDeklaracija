import React from "react";
import { Route, Routes } from "react-router-dom";

import SearchList from "./SearchList";

const BaseRouter = () => (
    <div>
        <Routes>
            <Route exact path="/" element={<SearchList />} />
        </Routes>
    </div>
);

export default BaseRouter;
