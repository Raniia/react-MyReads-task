import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
export const historyBrowser = createBrowserHistory();

// preventing pushing same route to history
const prevHistoryPush = historyBrowser.push;
let lastLocation: any = historyBrowser.location;
historyBrowser.listen(location => {
    lastLocation = location;
});
historyBrowser.push = (pathname: any, state = {}) => {
    if (
        lastLocation === null ||
        pathname !==
        lastLocation.pathname + lastLocation.search + lastLocation.hash ||
        JSON.stringify(state) !== JSON.stringify(lastLocation.state)
    ) {
        prevHistoryPush(pathname, state);
    }
};
// end preventing pushing same route to history

export const historyMiddleware = routerMiddleware(historyBrowser);