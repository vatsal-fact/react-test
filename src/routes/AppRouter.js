import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { WorkspaceProvider } from "../contexts/Workspace";
import Page from "../components/Page";

import Login from "./Login";
import Logout from "./Logout";
import Welcome from "./Welcome";
import Dashboard2 from "./MaturityDashboard";
import Dashboard1 from "./ExecutiveDashboard";
import Email from "./Email";
import Sms from "./Sms";
import MobilePush from "./MobilePush";
import Home2 from "./Home2";
// import Home3 from "./Home3";

import styles from "./AppRouter.module.scss";

// Uncomment these lines if you want to redirect unauthorized users to login form
// import { useAuth } from "../contexts/Auth";
// import { AuthStatus } from "../contexts/Auth/state";
// const RedirectIfNotLoggedIn = () => {
//     const auth = useAuth();
//     const shouldRedirectToLogin = auth.authStatus === AuthStatus.UNAUTHORIZED;
//     return shouldRedirectToLogin ? <Route component={() => <Redirect to="/login" />} /> : null;
// };

const AppRouter = () => {
    return (
        <div className={styles.AppRouter}>
            <Router>
                {/* WorkspaceProvider depends on Router so it must be nested */}
                <WorkspaceProvider>
                    <Route exact path="/welcome" component={Welcome} />
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/dashboard" component={() => <Page>Dashboard</Page>} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/dashboard/executive" component={Dashboard1} />
                    <Route exact path="/dashboard/maturity" component={Dashboard2} />
                    <Route exact path="/cohort/email" component={Email} />
                    <Route exact path="/cohort/sms" component={Sms} />
                    <Route exact path="/cohort/mobilepush" component={MobilePush} />
                    <Route exact path="/test" component={Home2} />
                    {/* <Route exact path="/test1" component={Home3} /> */}
                    {/* Uncomment the next line if you want to redirect unauthorized users to login form */}
                    {/* <RedirectIfNotLoggedIn /> */}
                </WorkspaceProvider>
            </Router>
        </div>
    );
};

export default AppRouter;
