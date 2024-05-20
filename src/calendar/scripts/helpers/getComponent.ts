import * as components from 'calendar/scripts/helpers/createComponents';

const getComponent = (pattern: string) => components[pattern as keyof typeof components];

export default getComponent;
