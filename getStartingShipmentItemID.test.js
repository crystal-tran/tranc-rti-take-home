"use strict";

const { getStartingShipmentItemID } = require('./getStartingShipmentItemID');

describe('getStartingShipmentID function', function () {
  test('empty shipment array', function (){
    const startID = getStartingShipmentItemID([], 6);
    expect(startID).toEqual(10);
  });

  test('shipment array with a large enough gap', function (){
    const startID = getStartingShipmentItemID([1, 19], 6);
    expect(startID).toEqual(10);
  });

  test('shipment array and a not large enough gap', function (){
    const startID = getStartingShipmentItemID([2, 8, 16], 30);
    expect(startID).toEqual(20);
  })
});