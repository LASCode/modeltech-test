const paramsFormatter = (urlPart: string, needParams: boolean) => `${needParams ? ': ' : ''}${urlPart}`;

export const appRoutes = {

    index: () => `/`,

    analytics: (oilfieldId: string, withParams: boolean = false) =>
        `/analytics/${paramsFormatter(oilfieldId, withParams)}`,

    analyticsDetails: (oilfieldId: string, periodId: string, withParams: boolean = false) =>
        `/analytics/${paramsFormatter(oilfieldId, withParams)}/period/${paramsFormatter(periodId, withParams)}`,
};