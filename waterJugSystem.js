'use strict';


/**Creates a water jug object
 *
 * Arguments:
 *    name: a string name of the water jug
 *    capacity: the maximum capacity the jug can hold
 *
 * Returns: an object like {'A', 3, 0}
*/
function createWaterJug(name, capacity) {
    return {
        name,
        capacity,
        currVolume: 0
    };
}
/**Fills jug to its maximum capacity*/
function fill(jug) {
    jug.currVolume = jug.capacity;
}
/**Empties jug*/
function spill(jug) {
    jug.currVolume = 0;
}
/**Pours water from source jug into target jug*/
function pour(sourceJug, targetJug) {
    const pourAmount = Math.min(sourceJug.currVolume, targetJug.capacity - targetJug.currVolume);
    sourceJug.currVolume -= pourAmount;
    targetJug.currVolume += pourAmount;
}
/**Performs a series of actions to achieve target capacity in target jug.
   *
   * Process:
   * 1) If source jug is empty, fill source jug
   * 2) If there's water in source jug and target jug is not at target capacity,
   *    pour from source jug to target jug
   * 3) If target jug is full, spill target jug
   *
   *
   * Arguments:
   *    sourceJug & targetJug - Objects representing a jug. ie. { name, capacity, currVolume }
   *    target capacity: The number of gallons needed to reach goal in targetJug
   *
   * Returns:
   *   a string stating if the capacity was reached
*/
function reachGoal(sourceJug, targetJug, targetCapacity) {
    if (targetCapacity > targetJug.capacity) {
        return `Target capacity exceeds jug ${targetJug.name} capacity.`;
    }
    //Tracks unique volume states
    let seenStates = new Set();
    while (targetJug.currVolume !== targetCapacity) {
        if (sourceJug.currVolume === 0) {
            fill(sourceJug);
            console.log(`
            Fill ${sourceJug.name},
            State: ${sourceJug.currVolume}-${targetJug.currVolume}`);
        }
        else if (sourceJug.currVolume > 0 && targetJug.currVolume < targetJug.capacity) {
            pour(sourceJug, targetJug);
            console.log(`
            Pour ${sourceJug.name} to ${targetJug.name},
            State: ${sourceJug.currVolume}-${targetJug.currVolume}`);
        }
        else if (targetJug.currVolume === targetJug.capacity) {
            spill(targetJug);
            console.log(`
            Empty ${targetJug.name},
            State: ${sourceJug.currVolume}-${targetJug.currVolume}`);
        }
        const currState = `${sourceJug.currVolume}:${targetJug.currVolume}`;
        //Checks if the current state has been seen, if so, then target capacity cannot be reached
        if (seenStates.has(currState)) {
            return 'Target capacity cannot be reached';
        }
        seenStates.add(currState);
    }
    return `Goal reached! Jug ${targetJug.name} contains ${targetJug.currVolume} gallons.`;
}
// Example usage:
const jugA = createWaterJug("A", 3);
const jugB = createWaterJug("B", 4);
reachGoal(jugA, jugB, 2);

module.exports = { createWaterJug, reachGoal }