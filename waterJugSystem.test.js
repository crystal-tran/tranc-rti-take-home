'use strict';

const { createWaterJug, reachGoal } = require('./waterJugSystem');

describe("reach goal", function () {

  test("return when goal is reached", function () {
    const jugA = createWaterJug('A', 3);
    const jugB = createWaterJug('B', 4);
    const targetCapacity = 2;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Goal reached! Jug ${jugB.name} contains ${jugB.currVolume} gallons.`);
  });

  test("return when goal is reached", function () {
    const jugA = createWaterJug('A', 10);
    const jugB = createWaterJug('B', 12);
    const targetCapacity = 2;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Goal reached! Jug ${jugB.name} contains ${jugB.currVolume} gallons.`);
  });

  test("return when target capacity exceeds target jug capacity", function () {
    const jugA = createWaterJug('A', 3);
    const jugB = createWaterJug('B', 4);
    const targetCapacity = 7;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Target capacity exceeds jug ${jugB.name} capacity.`);
  });

  test("return when goal cannot be reach", function () {
    const jugA = createWaterJug('A', 2);
    const jugB = createWaterJug('B', 6);
    const targetCapacity = 5;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual('Target capacity cannot be reached');
  });

  test("return when target capacity is 0", function () {
    const jugA = createWaterJug('A', 3);
    const jugB = createWaterJug('B', 4);
    const targetCapacity = 0;

    const msg = reachGoal(jugA, jugB, targetCapacity);
    expect(msg).toEqual(`Goal reached! Jug ${jugB.name} contains ${jugB.currVolume} gallons.`);
  });

});