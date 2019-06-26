// Map between index and filename
var IsometricMap = {
  tiles: [
    // "images/dirt.png",
    "images/tiles/dirtHigh.png", 		// 0
    "images/tiles/grass.png",			// 1
    "images/tiles/water.png",			// 2
    "images/tiles/waterBeachCornerEast.png",	// 3
    "images/tiles/waterBeachCornerNorth.png",	// 4
    "images/tiles/waterBeachCornerSouth.png",	// 5
    "images/tiles/waterBeachCornerWest.png",	// 6
    "images/tiles/waterBeachEast.png",	// 7
    "images/tiles/waterBeachNorth.png",	// 8
    "images/tiles/waterBeachSouth.png",	// 9
    "images/tiles/waterBeachWest.png",	// 10
    "images/tiles/waterCornerEast.png",	// 11
    "images/tiles/waterCornerNorth.png",	// 12
    "images/tiles/waterCornerSouth.png",	// 13
    "images/tiles/waterCornerWest.png",	// 14
    "images/tiles/waterEast.png",		// 15
    "images/tiles/waterNorth.png",		// 16
    "images/tiles/waterSouth.png",		// 17
    "images/tiles/waterWest.png",		// 18
    "images/tiles/bridgeEast.png",		// 19
    "images/tiles/bridgeNorth.png",		// 20
    "images/tiles/crossroad.png",		// 21
    "images/tiles/lot.png",			// 22
    "images/tiles/lotCornerEast.png",		// 23
    "images/tiles/lotCornerNorth.png",	// 24
    "images/tiles/lotCornerSouth.png",	// 25
    "images/tiles/lotCornerWest.png",		// 26
    "images/tiles/lotEast.png",		// 27
    "images/tiles/lotExitEast.png",		// 28
    "images/tiles/lotExitNorth.png",		// 29
    "images/tiles/lotExitSouth.png",		// 30
    "images/tiles/lotExitWest.png",		// 31
    "images/tiles/lotNorth.png",		// 32
    "images/tiles/lotPark.png",		// 33
    "images/tiles/lotSouth.png",		// 34
    "images/tiles/lotWest.png",		// 35
    "images/tiles/roadCornerES.png",		// 36
    "images/tiles/roadCornerNE.png",		// 37
    "images/tiles/roadCornerNW.png",		// 38
    "images/tiles/roadCornerWS.png",		// 39
    "images/tiles/roadEast.png",		// 40
    "images/tiles/roadEndEast.png",		// 41
    "images/tiles/roadEndNorth.png",		// 42
    "images/tiles/roadEndSouth.png",		// 43
    "images/tiles/roadEndWest.png",		// 44
    "images/tiles/roadNorth.png",		// 45
    "images/tiles/roadTEast.png",		// 46
    "images/tiles/roadTNorth.png",		// 47
    "images/tiles/roadTSouth.png",		// 48
    "images/tiles/roadTWest.png"],		// 49
  map: [
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  setMap: function( map ) {
    this.map = map;
  }

};
