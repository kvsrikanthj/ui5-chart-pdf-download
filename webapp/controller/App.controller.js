sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
  "use strict";
  return Controller.extend("com.demo.vizframe.pdfDownload.controller.App", {
    onSavePDF: function() {
      //Step 1: Export chart content to svg
      var oVizFrame = this.getView().byId("idVizFrame");
      var sSVG = oVizFrame.exportToSVGString({
        width: 800,
        height: 600
      });

      // UI5 library bug fix:
      //    Legend SVG created by UI5 library has transform attribute with extra space
      //    eg:   transform="translate (-5,0)" but it should be without spaces in string quotes
      //    tobe: transform="translate(-5,0)
      sSVG = sSVG.replace(/translate /gm, "translate");

      //Step 2: Create Canvas html Element to add SVG content
      var oCanvasHTML = document.createElement("canvas");
      canvg(oCanvasHTML, sSVG); // add SVG content to Canvas

      // STEP 3: Get dataURL for content in Canvas as PNG/JPEG
      var sImageData = oCanvasHTML.toDataURL("image/png");

      // STEP 4: Create PDF using library jsPDF
      var oPDF = new jsPDF();
      oPDF.addImage(sImageData, "PNG", 15, 40, 180, 160);
      oPDF.save("test.pdf");
    }
  });
});
