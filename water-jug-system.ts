/** Water Jug
 *
 * This model represents a jug. The jug can be filled, spilled, or poured out to
 * another target jug.
 */
class WaterJug{
  name: string;
  maxCapacity: number;
  currentVolume: number;

  constructor(name : string, maxCapacity : number){
    this.name = name;
    this.maxCapacity = maxCapacity;
    this.currentVolume = 0;
  }

  /**fills jug to its maximum capacity*/
  fill(){
    this.currentVolume = this.maxCapacity;
    console.log(`Filled jug ${this.name} to ${this.maxCapacity}`)
  }

  /**empties jug*/
  spill(){
    this.currentVolume = 0;
    console.log(`Spilled jug ${this.name}`)
  }

  /**pours water from this jug into target jug*/
  pour(targetJug : WaterJug ){
    const pourAmount = Math.min(this.currentVolume, targetJug.maxCapacity - targetJug.currentVolume);
    this.currentVolume -= pourAmount;
    targetJug.currentVolume += pourAmount;
    console.log(`Poured ${pourAmount} from jug ${this.name} to jug ${targetJug.name}`)
  }
}


/**Water Jug System
 *
 * This model represents a water jug system. There are two water jugs in the
 * system with different capacities. It uses the two jugs to precisly fill jugB to
 * its target capacity.
 */
class WaterJugSystem{
  jugA: WaterJug;
  jugB: WaterJug;
  targetCapacity: number;

  constructor(jugAName : string, jugACapacity : number,jugBName : string, jugBCapacity : number, targetCapacity : number){
    this.jugA = new WaterJug(jugAName, jugACapacity);
    this.jugB = new WaterJug(jugBName, jugBCapacity)
    this.targetCapacity = targetCapacity
  }

  /**Performs a series of actions: filling jugA, pouring jugA into jugB, and
   * spilling from jugB until jugB reaches it's target capacity.
   *

    */
  reachGoal(){
    while(this.jugB.currentVolume !== this.targetCapacity){
      if(this.jugA.currentVolume === 0){
        this.jugA.fill();
      } else if(this.jugA.currentVolume > 0 && this.jugB.currentVolume < this.jugB.maxCapacity){
        this.jugA.pour(this.jugB);
      } else if(this.jugB.currentVolume === this.jugB.maxCapacity){
        this.jugB.spill();
      }
    }
    console.log(`Goal reached! Jug ${this.jugB.name} contains ${this.jugB.currentVolume} gallons.`)
  }
}

const waterJugSystem = new WaterJugSystem('A', 3, 'B', 4, 2);
waterJugSystem.reachGoal();