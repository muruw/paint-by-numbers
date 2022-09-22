export type RGBColorValues = number[];

export enum ClusteringColorSpace {
  RGB = 0,
  HSL = 1,
  LAB = 2,
}

export class Settings {
  kMeansNrOfClusters = 16;
  public kMeansMinDeltaDifference = 1;
  public kMeansClusteringColorSpace: ClusteringColorSpace =
    ClusteringColorSpace.RGB;

  public kMeansColorRestrictions: Array<RGBColorValues | string> = [];

  public colorAliases: { [key: string]: RGBColorValues } = {};

  public narrowPixelStripCleanupRuns = 3; // 3 seems like a good compromise between removing enough narrow pixel strips to convergence. This fixes e.g. https://i.imgur.com/dz4ANz1.png

  public removeFacetsSmallerThanNrOfPoints = 20;
  public removeFacetsFromLargeToSmall = true;
  public maximumNumberOfFacets = Number.MAX_VALUE;

  public nrOfTimesToHalveBorderSegments = 2;

  public resizeImageIfTooLarge = true;
  public resizeImageWidth = 1024;
  public resizeImageHeight = 1024;

  public randomSeed: number = new Date().getTime();
}
