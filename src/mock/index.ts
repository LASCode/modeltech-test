import {rest, setupWorker} from "msw";
import {oilfieldAnalytics} from "./oilfieldAnalytics";

export const handlers = [
    rest.get(
        'https://LASCodeTest.com/analytics',
        (req, res, context) => {
            context.status(200);
            context.set('Content-Type', 'application/json');

            return res(context.json(oilfieldAnalytics));
        })
];

export const worker = setupWorker(...handlers);