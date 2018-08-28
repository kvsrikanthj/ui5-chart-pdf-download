# SAP UI5/FIORI chart download to PDF

This sample code provides option to download SAP UI5/FIORI vizframe charts to PDF using third party libraries.

![Alt text(missing Demo)](/assets/Demo.gif)

As part of the process we will export UI5 chart to SVG using UI5 library predefined method [exportToSVGString()](https://sapui5.hana.ondemand.com/#/api/sap.viz.ui5.controls.VizFrame/methods/exportToSVGString) then convert SVG to PNG/JPEG using thirdparty libraries and finally export PNG/JPEG format to PDF

## Third party libraries

- [canvg](https://github.com/canvg/canvg) : Convert SVG to PNG/JPEG

- [rgbcolor](https://cdnjs.cloudflare.com/ajax/libs/canvg/1.4/rgbcolor.js): Dependent library for canvg

- [stackblur](https://cdnjs.cloudflare.com/ajax/libs/stackblur-canvas/1.4.1/stackblur.js): Dependent library for canvg _(optional)_

- [jsPDF](https://parall.ax/products/jspdf): To create PDF using PNG/JPEG format

> ## Note:
>
> jsPDF library is modified so that it is avilable in global window object. This is done to ensure that this library works correctly with SAP UI5 framework (SAP UI5 framework has its own AMD syntax). **_So copy jsPDF library from this project folder_**
>
> Below line is added in jsPDF library
>
> ```javascript
> global.jsPDF = factory(); // -->> Added by Srikanth for SAP UI5
> ```

## SAP UI5 Vizframe library bug fix

### Error:

![Error Image Alt text](/assets/UI5Bug.PNG "Error Image")

This error is caused by UI5 library when genearting the SVG string for chart legend using method [exportToSVGString()](https://sapui5.hana.ondemand.com/#/api/sap.viz.ui5.controls.VizFrame/methods/exportToSVGString).
Below are the details of the bug

### Bug:

One of the generated SVG attribute value is like this

```xml
<g class="v-legend-element v-legend-item" transform="translate (-5,0)">
<!--attribute value "translate (-5,0)" should not contain spaces -->
```

### Solution:

After getting the SVG string replace spaces for the attribute

```javascript
<svgString value>.replace(/translate /gm, "translate");
```
