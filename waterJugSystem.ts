interface Jug {
  name: string;
  capacity: number;
  currentVolume: number;
}

/**Creates a water jug object
 *
 * Arguments:
 *    name: a string name of the water jug
 *    capacity: the maximum capacity the jug can hold
*/
function createWaterJug(name: string, capacity: number) : Jug {
  return {
    name,
    capacity,
    currentVolume: 0
  };
}


  /**Fills jug to its maximum capacity*/
function fill(jug: Jug) : void {
  jug.currentVolume = jug.capacity;
  console.log(`Filled jug ${jug.name} to ${jug.capacity}`);
}

/**Empties jug*/
function spill(jug: Jug) : void {
  jug.currentVolume = 0;
  console.log(`Spilled jug ${jug.name}`);
}


  /**Pours water from source jug into target jug*/
function pour(sourceJug : Jug, targetJug: Jug) : void {
  const pourAmount = Math.min(
    sourceJug.currentVolume,
    targetJug.capacity - targetJug.currentVolume
  );
  sourceJug.currentVolume -= pourAmount;
  targetJug.currentVolume += pourAmount;
  console.log(`Poured ${pourAmount} from jug ${sourceJug.name} to jug ${targetJug.name}`);
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
   *    sourceJug & targetJug - Objects representing a jug. ie. { name, capacity, currentVolume }
   *    target capacity: The number of gallons needed to reach goal
   * Returns:
   *   a string when target capacity is achieved.
*/
function reachGoal(sourceJug : Jug, targetJug : Jug, targetCapacity : number) : string {
  if(targetCapacity > targetJug.capacity){
    return `Target capacity ${targetCapacity} exceeds jug ${targetJug.name} capacity.`
  }

  let seenStates : Set<string> = new Set();

  while (targetJug.currentVolume !== targetCapacity) {
    const currentState = `${sourceJug.currentVolume}-${targetJug.currentVolume}`;

    if(seenStates.has(currentState)){
      return `Target capacity cannot be reached with ${sourceJug.name} and ${targetJug.name}`
    }

    seenStates.add(currentState);


    if (sourceJug.currentVolume === 0) {
      fill(sourceJug);
    } else if (sourceJug.currentVolume > 0 && targetJug.currentVolume < targetJug.capacity) {
      pour(sourceJug, targetJug);
    } else if (targetJug.currentVolume === targetJug.capacity) {
      spill(targetJug);
    }
  }
  return `Goal reached! Jug ${targetJug.name} contains ${targetJug.currentVolume} gallons.`;
}

// Example usage:
const jugA = createWaterJug("A", 3);
const jugB = createWaterJug("B", 4);
reachGoal(jugA, jugB, 2);