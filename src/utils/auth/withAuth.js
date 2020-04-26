import React, { useEffect, useState } from "react";
import {loggedIn, getConfirm, logout } from "./authHelperMethods";
import { useHistory } from "react-router-dom";

/* A higher order component is frequently written as a function that returns a class. */
const withAuth = (AuthComponent) => {
    return (() => {
        const [confirm, setConfirm] = useState(null)
        const [loaded, setLoaded] = useState(false)
        const history = useHistory()

        useEffect(() => {
            if (!loggedIn()) {
                history.replace("/login")
            } else {
                /* Try to get confirmation message from the Auth helper. */
                try {
                    const confirm = getConfirm();
                    console.log("confirmation is:", confirm);
                    setConfirm(confirm)
                    setLoaded(true)
                } catch (err) {
                    /* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
                    console.log(err);
                    logout();
                    history.replace("/login");
                }
            }
        },[history])
            
                if (loaded === true) {
                    if (confirm) {
                        console.log("confirmed!");
                        return (
                            /* component that is currently being wrapper(App.js) */
                            <AuthComponent
                                history={history}
                                confirm={confirm}
                            />
                        );
                    } else {
                        // console.log("not confirmed!");
                        return null;
                    }
                } else {
                    return null;
                }
            }
    )
    }



export { withAuth }