import React, { Component, useEffect } from "react";
import Router from "next/router";
import HttpServiceManager from "services/HttpServiceManager";

const Index = () => {
    React.useEffect(() => {
        Router.push("/admin/dashboard");
    });
    return <div />;
};

export default Index;
