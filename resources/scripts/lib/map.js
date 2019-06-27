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
    "images/tiles/roadTWest.png", // 49
    
    "images/map/t0.gif",  // 50
    "images/map/t1.gif",  // 51
    "images/map/t2.gif", // 52
    "images/map/t3.gif",  // 53
    "images/map/t4.gif",  // 54
    "images/map/t5.gif",  // 55
    "images/map/t6.gif",  // 56
    "images/map/t7.gif",  // 57
    "images/map/t8.gif",  // 58
    "images/map/t9.gif",  // 59

    "images/map/o1.gif", // 60
    "images/map/o2.gif", // 61
    "images/map/o3.gif", // 62
    "images/map/o4.gif", // 63
    "images/map/o5.gif", // 64
    "images/map/o6.gif", // 65
    "images/map/o7.gif", // 66
    "images/map/o8.gif", // 67
    "images/map/o9.gif", // 68
    "images/map/o10.gif", // 69
    "images/map/o11.gif", // 70
    "images/map/o12.gif", // 71

    "images/map/d10.gif", // 72
    "images/map/d11.gif", // 73
    "images/map/d12.gif", // 74
    "images/map/d13.gif", // 75
    "images/map/d14.gif", // 76
    "images/map/d15.gif", // 77

    "images/map/d20.gif", // 78
    "images/map/d21.gif", // 79
    "images/map/d22.gif", // 80
    "images/map/d23.gif", // 81
    "images/map/d24.gif", // 82
    "images/map/d25.gif", // 83

    "images/map/d30.gif", // 84
    "images/map/d31.gif", // 85
    "images/map/d32.gif", // 86
    "images/map/d33.gif", // 87
    "images/map/d34.gif", // 88
    "images/map/d35.gif" // 89

    ],		
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
