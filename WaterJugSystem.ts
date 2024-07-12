type Jug = {
  name: string;
  capacity: number;
  currentVolume: number;
}

function createWaterJug(name: string, capacity: number) : Jug {
  return {
    name,
    capacity,
    currentVolume: 0
  };
}

function fill(jug: Jug) {
  jug.currentVolume = jug.capacity;
  console.log(`Filled jug ${jug.name} to ${jug.capacity}`);
}

function spill(jug: Jug) {
  jug.currentVolume = 0;
  console.log(`Spilled jug ${jug.name}`);
}

function pour(sourceJug : Jug, targetJug: Jug) {
  const pourAmount = Math.min(
    sourceJug.currentVolume,
    targetJug.capacity - targetJug.currentVolume
  );
  sourceJug.currentVolume -= pourAmount;
  targetJug.currentVolume += pourAmount;
  console.log(`Poured ${pourAmount} from jug ${sourceJug.name} to jug ${targetJug.name}`);
}

function reachGoal(sourceJug : Jug, targetJug : Jug, targetCapacity : number) {
  while (jugB.currentVolume !== targetCapacity) {
    if (jugA.currentVolume === 0) {
      fill(jugA);
    } else if (jugA.currentVolume > 0 && jugB.currentVolume < jugB.capacity) {
      pour(jugA, jugB);
    } else if (jugB.currentVolume === jugB.capacity) {
      spill(jugB);
    }
  }
  return `Goal reached! Jug ${jugB.name} contains ${jugB.currentVolume} gallons.`;
}

// Example usage:
const jugA = createWaterJug("A", 3);
const jugB = createWaterJug("B", 4);
reachGoal(jugA, jugB, 2);