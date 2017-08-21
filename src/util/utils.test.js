import * as Utils from './utils';

test('Timestamp is returned', () => {
    const timestamp = Utils.getTimestamp();
    //console.log(timestamp);
    expect(timestamp).toBeGreaterThan(1503336740341);
});

test('UUID is generated', () => {
    const uuid1 = Utils.getUUID();
    const uuid2 = Utils.getUUID();

    expect(uuid1).toBeDefined();
    expect(uuid2).toBeDefined();

    //console.log(uuid1);
    //console.log(uuid2);

    expect(uuid1).not.toEqual(uuid2);
});