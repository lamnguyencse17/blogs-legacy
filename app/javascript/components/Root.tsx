import React, {FunctionComponent} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {Outlet} from "react-router-dom";

const RootComponent: FunctionComponent = () => {
    useAuth()
    return <ChakraProvider>
        <Outlet />
    </ChakraProvider>
}

export default RootComponent