export class Point {
  constructor(public x: number, public y: number) {}

  /**
   * don't do euclidean because then neighbours should be diagonally as well
   * because sqrt(2) < 2
   * @return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y));
   */
  public distanceTo(pt: Point): number {
    return Math.abs(pt.x - this.x) + Math.abs(pt.y - this.y);
  }

  /**
   * don't do euclidean because then neighbours should be diagonally as well
   * because sqrt(2) < 2
   * @return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y));
   */
  public distanceToCoord(x: number, y: number): number {
    return Math.abs(x - this.x) + Math.abs(y - this.y);
  }
}
