import React, { Component } from "react";
import Router from "next/router";

const Error404 = () => {
    React.useEffect(() => {
        Router.push("/admin/dashboard");
    });

    return <div />;
};
export default Error404;
