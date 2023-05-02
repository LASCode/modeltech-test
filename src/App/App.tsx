import { useAppWindowSize } from "hooks/useAppWindowSize";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OilfieldAnalyticsPage} from "pages/OilfieldAnalyticsPage/OilfieldAnalyticsPage";
import {appRoutes} from "routes";


export const App = () => {
    useAppWindowSize();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={appRoutes.index()} element={<OilfieldAnalyticsPage />} />
                <Route path={'*'} element={<>PageNotFound</>} />
            </Routes>
        </BrowserRouter>
    );
};
