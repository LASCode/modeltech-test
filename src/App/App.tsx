import { useAppWindowSize } from "hooks/useAppWindowSize";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OilfieldAnalyticsPage} from "pages/OilfieldAnalyticsPage/OilfieldAnalyticsPage";
import {appRoutes} from "routes";
import {OilfieldListPage} from "../pages/OilfieldListPage/OilfieldListPage";


export const App = () => {
    useAppWindowSize();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={appRoutes.index()} element={<OilfieldListPage />} />
                <Route path={'/test'} element={<OilfieldAnalyticsPage />} />
                <Route path={'*'} element={<>Error</>} />
            </Routes>
        </BrowserRouter>
    );
};
