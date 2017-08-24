import uuid from 'uuid/v4';

export const getTimestamp = () => Date.now();
export const getUUID = () => uuid();

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

