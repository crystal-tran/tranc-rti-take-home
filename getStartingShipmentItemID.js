'use strict';

/** Returns the starting starting shipment itdem ID to use for a batch of shipment items.
 *
 * 1) The starting ID for a batch of shipment items must be a multiple of 10
 * 2) All the shipment item IDs in the batch must be sequential, starting with the returned ID
 * 3) The function returns the MINIMUM ID that staties the two above conditions.
 *
 * Note: The list of shipment IDs may have "holes" because shipment item IDs can be deleted from the system
 *
 * @param allShipmentItemIDs - sorted array of the current shipment item IDs in the system
 * @param numSamplesInBatch - the number of shipment items in the incoming batch
 * @returns - the starting shipment item ID to use for this batch of shipment items
 *
 * Example:
 *  getStartingShipmentItemID([], 5); // 10
 *  getStartingShipmentItemID([2, 19], 3); // 10
 *  getStartingShipmentItemID([2, 8, 16], 50); // 20
 *
 */
function getStartingShipmentItemID(allShipmentItemIDs, numSamplesInBatch) {
    // Check for empty array and for large gaps in the beginning of the array
    if (allShipmentItemIDs.length === 0 || allShipmentItemIDs[0] > numSamplesInBatch + 9) {
        return 10;
    }

    //iterate through shipment array to find gaps where the new batch could fit
    //if so, calculate the potential startID that is a multiple of 10 after the current ID
    //if it fits in within the gap, return the potential startID
    for (let i = 0; i < allShipmentItemIDs.length; i++) {
        let currentID = allShipmentItemIDs[i];
        let nextID = allShipmentItemIDs[i + 1];
        if (nextID - currentID > numSamplesInBatch) {
            let potentialStartID = Math.ceil((currentID + 1) / 10) * 10;
            if (potentialStartID + numSamplesInBatch - 1 < nextID) {
                return potentialStartID;
            }
        }
    }
    //if no gaps are found in the beginning or middle, return the next minimum starting ID
    const lastID = allShipmentItemIDs[allShipmentItemIDs.length - 1];
    let startID = Math.ceil((lastID + 1) / 10) * 10;
    return startID;
}

module.exports = { getStartingShipmentItemID };