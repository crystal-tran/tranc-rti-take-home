'use strict';

const { createWaterJug, reachGoal } = require('./waterJugSystem');
describe("reach goal", function () {

  test("return when goal is reached", function () {
    const jugA = createWaterJug('A', 3);
    const jugB = createWaterJug('B', 4);
    const targetCapacity = 2;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Goal reached! Jug ${jugB.name} contains ${jugB.currentVolume} gallons.`);
  });

  test("return when target capacity exceeds target jug capacity", function () {
    const jugA = createWaterJug('A', 3);
    const jugB = createWaterJug('B', 4);
    const targetCapacity = 7;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Target capacity ${targetCapacity} exceeds jug ${jugB.name} capacity.`);
  });

  test("return when goal cannot be reach", function () {
    const jugA = createWaterJug('A', 2);
    const jugB = createWaterJug('B', 6);
    const targetCapacity = 5;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Target capacity cannot be reached with ${jugA.name} and ${jugB.name}`);
  });
});