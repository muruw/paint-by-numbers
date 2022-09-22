import * as canvas from "canvas";
import { Settings } from "./const/Settings.ts";
import { ColorReducer } from "./colorreductionmanagement.ts";
import { FacetResult } from "./facetmanagement.ts";
import { FacetReducer } from "./facetReducer.ts";
import { FacetCreator } from "./facetCreator.ts";
import {FacetBorderTracer} from './facetBorderTracer.ts';
import {FacetBorderSegmenter} from './facetBorderSegmenter.ts';
import {FacetLabelPlacer} from './facetLabelPlacer.ts';
import Buffer = Deno.Buffer;
import {RGB} from './common.ts';
import {Point} from './structs/point.ts';

import * as png2svg from "https://unpkg.com/@resvg/resvg-wasm";
import * as path from "https://deno.land/std/path/mod.ts";
import * as fs from "https://deno.land/std@0.156.0/fs/mod.ts";

interface GeneratorProps {
  imagePath: string;
  svgPath: string
}

export async function generatePaintableImage({ imagePath, svgPath }: GeneratorProps) {
  const settings: Settings = new Settings();

  const img = await canvas.loadImage(imagePath);
  const c = canvas.createCanvas(img.width, img.height);
  const ctx = c.getwContext("2d");
  ctx.drawImage(img, 0, 0, c.width, c.height);
  let imgData = ctx.getImageData(0, 0, c.width, c.height);
  if (
    settings.resizeImageIfTooLarge &&
    (canvas.width > settings.resizeImageWidth ||
      canvas.height > settings.resizeImageHeight)
  ) {
    imgData = resizeImageIfNeeded(settings, c, ctx);
  }

  /**
   * Run K-Means clustering
   */
  const cKmeans = canvas.createCanvas(imgData.width, imgData.height);
  const ctxKmeans = cKmeans.getContext("2d")!;
  ctxKmeans.fillStyle = "white";
  ctxKmeans.fillRect(0, 0, cKmeans.width, cKmeans.height);

  const kmeansImgData = ctxKmeans.getImageData(
    0,
    0,
    cKmeans.width,
    cKmeans.height,
  );
  await ColorReducer.applyKMeansClustering(
    imgData,
    kmeansImgData,
    ctx,
    settings,
    () => {
      ctxKmeans.putImageData(kmeansImgData, 0, 0);
    },
  );

  const colormapResult = ColorReducer.createColorMap(kmeansImgData);
  let facetResult = new FacetResult();
  if (
    typeof settings.narrowPixelStripCleanupRuns === "undefined" ||
    settings.narrowPixelStripCleanupRuns === 0
  ) {
    console.log("Creating facets");
    facetResult = await FacetCreator.getFacets(
      imgData.width,
      imgData.height,
      colormapResult.imgColorIndices,
    );

    console.log("Reducing facets");
    await FacetReducer.reduceFacets(
      settings.removeFacetsSmallerThanNrOfPoints,
      settings.removeFacetsFromLargeToSmall,
      settings.maximumNumberOfFacets,
      colormapResult.colorsByIndex,
      facetResult,
      colormapResult.imgColorIndices,
    );
  } else {
    for (let run = 0; run < settings.narrowPixelStripCleanupRuns; run++) {
      console.log("Removing narrow pixels run #" + (run + 1));
      // clean up narrow pixel strips
      await ColorReducer.processNarrowPixelStripCleanup(colormapResult);

      console.log("Creating facets");
      facetResult = await FacetCreator.getFacets(
        imgData.width,
        imgData.height,
        colormapResult.imgColorIndices,
      );

      console.log("Reducing facets");
      await FacetReducer.reduceFacets(
        settings.removeFacetsSmallerThanNrOfPoints,
        settings.removeFacetsFromLargeToSmall,
        settings.maximumNumberOfFacets,
        colormapResult.colorsByIndex,
        facetResult,
        colormapResult.imgColorIndices,
      );

      // the colormapResult.imgColorIndices get updated as the facets are reduced, so just do a few runs of pixel cleanup
    }
  }

  /**
   * Build border paths
   */
  await FacetBorderTracer.buildFacetBorderPaths(facetResult);

  /**
   * Build border path segments
   */
  await FacetBorderSegmenter.buildFacetBorderSegments(facetResult, settings.nrOfTimesToHalveBorderSegments);

  /**
   * Determine label placement
   */
  await FacetLabelPlacer.buildFacetLabelBounds(facetResult);

  for (const profile of settings.outputProfiles) {
    console.log("Generating output for " + profile.name);

    if (typeof profile.filetype === "undefined") {
      profile.filetype = "svg";
    }

    const svgProfilePath = path.join(path.dirname(svgPath), path.basename(svgPath).substr(0, path.basename(svgPath).length - path.extname(svgPath).length) + "-" + profile.name) + "." + profile.filetype;
    const svgString = await createSVG(facetResult, colormapResult.colorsByIndex, profile.svgSizeMultiplier, profile.svgFillFacets, profile.svgShowBorders, profile.svgShowLabels, profile.svgFontSize, profile.svgFontColor);
    console.log("MarcusMarcusMarcusMarcusMarcusMarcusMarcusMarcusMarcusMarcus")
    console.log(svgString)
    console.log("hi")
/*    if (profile.filetype === "svg") {
      fs.writeFileSync(svgProfilePath, svgString);
    } else if (profile.filetype === "png") {

      // TODO: use resvg instead of svg2img https://github.com/yisibl/resvg-js

      const imageBuffer = await new Promise<Buffer>((then, reject) => {
        svg2img(svgString, function (error: Error, buffer: Buffer) {
          if (error) {
            reject(error);
          } else {
            then(buffer);
          }
        });
      });
      fs.writeFileSync(svgProfilePath, imageBuffer);
    } else if (profile.filetype === "jpg") {
      const imageBuffer = await new Promise<Buffer>((then, reject) => {
        svg2img(svgString, { format: "jpg", quality: profile.filetypeQuality }, function (error: Error, buffer: Buffer) {
          if (error) {
            reject(error);
          } else {
            then(buffer);
          }
        });
      });
      fs.writeFileSync(svgProfilePath, imageBuffer);
    }*/
  }
}

// TODO: fix types canvas - Canvas, ctx - NodeCanvasRenderingContext2D
function resizeImageIfNeeded(settings: Settings, canvas: any, ctx: any) {
  let width = canvas.width;
  let height = canvas.height;
  if (width > settings.resizeImageWidth) {
    const newWidth = settings.resizeImageWidth;
    const newHeight = canvas.height / canvas.width * settings.resizeImageWidth;
    width = newWidth;
    height = newHeight;
  }
  if (height > settings.resizeImageHeight) {
    const newHeight = settings.resizeImageHeight;
    const newWidth = width / height * newHeight;
    width = newWidth;
    height = newHeight;
  }

  const tempCanvas = canvas.createCanvas(width, height);
  tempCanvas.width = width;
  tempCanvas.height = height;
  tempCanvas.getContext("2d")!.drawImage(canvas, 0, 0, width, height);
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(tempCanvas, 0, 0, width, height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}


async function createSVG(facetResult: FacetResult, colorsByIndex: RGB[], sizeMultiplier: number, fill: boolean, stroke: boolean, addColorLabels: boolean, fontSize: number = 60, fontColor: string = "black", onUpdate: ((progress: number) => void) | null = null) {

  let svgString = "";
  const xmlns = "http://www.w3.org/2000/svg";

  const svgWidth = sizeMultiplier * facetResult.width;
  const svgHeight = sizeMultiplier * facetResult.height;
  svgString += `<?xml version="1.0" standalone="no"?>
                  <svg width="${svgWidth}" height="${svgHeight}" xmlns="${xmlns}">`;

  for (const f of facetResult.facets) {

    if (f != null && f.borderSegments.length > 0) {
      let newpath: Point[] = [];
      const useSegments = true;
      if (useSegments) {
        newpath = f.getFullPathFromBorderSegments(false);
      } else {
        for (let i: number = 0; i < f.borderPath.length; i++) {
          newpath.push(new Point(f.borderPath[i].getWallX() + 0.5, f.borderPath[i].getWallY() + 0.5));
        }
      }
      if (newpath[0].x !== newpath[newpath.length - 1].x || newpath[0].y !== newpath[newpath.length - 1].y) {
        newpath.push(newpath[0]);
      } // close loop if necessary

      // Create a path in SVG's namespace
      // using quadratic curve absolute positions

      let svgPathString = "";

      let data = "M ";
      data += newpath[0].x * sizeMultiplier + " " + newpath[0].y * sizeMultiplier + " ";
      for (let i: number = 1; i < newpath.length; i++) {
        const midpointX = (newpath[i].x + newpath[i - 1].x) / 2;
        const midpointY = (newpath[i].y + newpath[i - 1].y) / 2;
        data += "Q " + (midpointX * sizeMultiplier) + " " + (midpointY * sizeMultiplier) + " " + (newpath[i].x * sizeMultiplier) + " " + (newpath[i].y * sizeMultiplier) + " ";
      }

      let svgStroke = "";
      if (stroke) {
        svgStroke = "#000";
      } else {
        // make the border the same color as the fill color if there is no border stroke
        // to not have gaps in between facets
        if (fill) {
          svgStroke = `rgb(${colorsByIndex[f.color][0]},${colorsByIndex[f.color][1]},${colorsByIndex[f.color][2]})`;
        }
      }

      let svgFill = "";
      if (fill) {
        svgFill = `rgb(${colorsByIndex[f.color][0]},${colorsByIndex[f.color][1]},${colorsByIndex[f.color][2]})`;
      } else {
        svgFill = "none";
      }

      svgPathString = `<path data-facetId="${f.id}" d="${data}" `;

      svgPathString += `style="`;
      svgPathString += `fill: ${svgFill};`;
      if (svgStroke !== "") {
        svgPathString += `stroke: ${svgStroke}; stroke-width:1px`;
      }
      svgPathString += `"`;

      svgPathString += `>`;

      svgPathString += `</path>`;

      svgString += svgPathString;

      // add the color labels if necessary. I mean, this is the whole idea behind the paint by numbers part
      // so I don't know why you would hide them
      if (addColorLabels) {

        const labelOffsetX = f.labelBounds.minX * sizeMultiplier;
        const labelOffsetY = f.labelBounds.minY * sizeMultiplier;
        const labelWidth = f.labelBounds.width * sizeMultiplier;
        const labelHeight = f.labelBounds.height * sizeMultiplier;

        const nrOfDigits = (f.color + "").length;
        const svgLabelString = `<g class="label" transform="translate(${labelOffsetX},${labelOffsetY})">
                                        <svg width="${labelWidth}" height="${labelHeight}" overflow="visible" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
                                            <text font-family="Tahoma" font-size="${(fontSize / nrOfDigits)}" dominant-baseline="middle" text-anchor="middle" fill="${fontColor}">${f.color}</text>
                                        </svg>
                                       </g>`;

        svgString += svgLabelString;
      }
    }
  }

  svgString += `</svg>`;

  return svgString;
}

