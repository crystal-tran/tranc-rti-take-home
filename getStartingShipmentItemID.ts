/** Returns the starting starting shipment item ID to use for a batch of shipment items.
 *
 * Constraints:
 *    1) The starting ID for a batch of shipment items must be a multiple of 10
 *    2) All the shipment item IDs in the batch must be sequential, starting with the returned ID
 *    3) The function returns the MINIMUM ID that staties the two above conditions.
 *
 * Note: The list of shipment IDs may have "holes" because shipment item IDs can be deleted from the system
 *
 * @param allShipmentItemIDs - sorted array of the current shipment item IDs in the system
 * @param numSamplesInBatch - the number of shipment items in the incoming batch
 * @returns - the starting shipment item ID to use for this batch of shipment items
 *
 * Example:
 *    getStartingShipmentItemID([], 5); // 10
 *    getStartingShipmentItemID([2, 19], 3); // 10
 *    getStartingShipmentItemID([2, 8, 16], 50); // 20
 *
 */

function getStartingShipmentItemID(allShipmentItemIDs: number[], numSamplesInBatch: number): number {
  // Check for an empty array
  if(allShipmentItemIDs.length === 0) return 10;
  // Check for large gaps in the beginning of the array
  if(allShipmentItemIDs[0] >= numSamplesInBatch + 10) return 10;

  //iterate through the shipment array to find potential gaps that could fit numSamplesInBatch
  //if found, calculate the potential startID that is a multiple of 10 after the current ID
  //if it fits in within the gap, return the potential startID
  for (let i = 0; i < allShipmentItemIDs.length; i++) {
    let currID = allShipmentItemIDs[i];
    let nextID = allShipmentItemIDs[i + 1];

    if (nextID - currID > numSamplesInBatch) {
      let potentialStartID = Math.ceil((currID + 1) / 10) * 10;
      if (potentialStartID + numSamplesInBatch <= nextID) {
        return potentialStartID;
      }
    }
  }
   //if no gaps are found in the beginning or middle, return the next minimum starting ID
  const lastID = allShipmentItemIDs[allShipmentItemIDs.length - 1];
  const startID = Math.ceil((lastID + 1) / 10) * 10;
  return startID;
}