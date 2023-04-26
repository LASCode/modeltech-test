import { useAppWindowSize } from "hooks/useAppWindowSize";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TestPage} from "pages/TestPage";


export const App = () => {
    useAppWindowSize();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/test'} element={<TestPage />} />
                <Route path={'*'} element={<>Error</>} />
            </Routes>
        </BrowserRouter>
    );
};
