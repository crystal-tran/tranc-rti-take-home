"use strict";

const { getStartingShipmentItemID } = require('./getStartingShipmentItemID');

describe('getStartingShipmentID function', function () {
  test('empty shipment array', function () {
    const startID = getStartingShipmentItemID([], 6);
    expect(startID).toEqual(10);
  });

  test('single item in array with batch starting before it', function () {
    const startID = getStartingShipmentItemID([19], 6);
    expect(startID).toEqual(10);
  });

  test('single item in array with batch starting after it', function () {
    const startID = getStartingShipmentItemID([19], 20);
    expect(startID).toEqual(20);
  });

  test('shipment array with a large enough gap in the middle', function () {
    const startID = getStartingShipmentItemID([1, 19], 6);
    expect(startID).toEqual(10);
  });

  test('shipment array with a large gap in the beginning', function () {
    const startID = getStartingShipmentItemID([50, 51, 52], 30);
    expect(startID).toEqual(10);
  });

  test('shipment array with no sufficient gaps', function () {
    const startID = getStartingShipmentItemID([2, 8, 16], 30);
    expect(startID).toEqual(20);
  });

  test('shipment array with no sufficient gaps and last ID already a multiple of 10', function () {
    const startID = getStartingShipmentItemID([2, 10, 20, 30], 30);
    expect(startID).toEqual(40);
  });

  test('shipment array with sufficient gaps but  ID already a multiple of 10', function () {
    const startID = getStartingShipmentItemID([2, 10, 20, 30], 5);
    expect(startID).toEqual(40);
  });

});