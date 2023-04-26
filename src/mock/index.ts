import {rest} from "msw";

export const handlers = [
    rest.get('/table', (req, res, context) => res(context.status(200)))
];