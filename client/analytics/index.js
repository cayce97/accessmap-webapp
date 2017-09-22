import { eventsMap } from 'analytics/eventsmap';

const analytics = store => next => action => {
  // Make sure analytics is available
  if (typeof window === 'undefined') {
    return;
  }

  // TODO: improve checking - look for rakam function(s)?
  if (typeof window.rakam !== 'object') {
    throw new Error('window.rakam is not defined');
  }
  const rakam = window.rakam;

  if (action.type in eventsMap) {
    const eventFunction = eventsMap[action.type];
    const meta = eventFunction(action);
    rakam.logEvent(meta.eventAction, meta.payload);
    next(action);
  }
};

export default analytics;
