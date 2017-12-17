
String.prototype.padLeft = function (n) {
	var pad = "";
	for (var i = 0; i < n; i++) {
		pad += "0";
	}
	return pad.substring(0, pad.length - this.length) + this;
}

var books = [
	{name:"A letter from Lord Hosidius to the Council of Elders."},
	{name:"An extract from Eathram & Rada, by Anonymous."},
	{name:"Census of King Rada III, by Matthias Vorseth."},
	{name:"Diary of Steklan Ricktor, volume 7. "},
	{name:"Killing of a King, by Griselle."},
	{name:"The Ideology of Darknes, by Philiphaire."},
	{name:"The Journey of Rada, by Griselle."},
	{name:"The Royal Accord of Twill."},
	{name:"The Parable of the Wintertodt, by Anonymous."},
	{name:"The Tragedy of Tristessa."},
	{name:"The Theory of Transvergence, by Amon Ducot."},
	{name:"The Treachery of Royalty, by Professor Answith."},
	{name:"Transportation Incantations, by Amon Ducot."},
	{name:"Speech of King Byrne I, on the occasion of his coronation."},
    {name:"The Journey of Souls, by Aretha."},
    {name:"The Envoy to Varlamore, by Deryk Paulson."}
];
var manuscripts = [];

var MAP_EMPTY = 0;
var MAP_BLOCK = 1;
var MAP_BOOKCASE_1 = 2;
var MAP_BOOKCASE_2 = 3;

var MAP_BOOK_FIRST = 0;
var MAP_BOOK_LAST = books.length;
var MAP_MANUSCRIPT = 35;
var MAP_HINT = 100;

var mapBot = "333333333333333333333300000000003333333333333333333333333143141300314134133300000000003334134133003411341333330000000000000000003300000000003300000041000000000033340000000000000000001300000000003100000011000000000013310000003330000000004300000000003400330033003333330043330033003330000330001300000000003100330011003333330033310033003330000330003300000000003300000014000000000013340000003330000000000300000000003000000033000000000013330000000000000000000300000000003000000000000000000033300000000000031413143300000000003300000000000000000003300033000000034143143300000000003100000000003300000003330033003300000000004300000000003100033330001400000033310033001100033333301300000000003400033330004100000013340033004400033333303300000000003300033330001100330013330033003300000000003333333333333300000000003300330033310033001100000000003300000000003300000000004100000043310000001100000000000000000000000000000000001400000013330000003300000000000000000000000000000000003300000033333414133331141333000000000000000000333114133334114333333333333333333333000333330033333000333333333333333333000000000000000030000300000000003000030000000000000000000000000000000030000300000000003003330000000000000000000000000000000030000300333333003003330000000000000000000000000000000030000300333333003000030000000000000000000000000000000030000000000000000000330000000000000000000000000000000030000000000000000000330000000000000000000000000000000030000300333333003000030000000000000000000000000000000030000300333333003000030000000000000000000000000000000030000300000000003000330000000000000000000000000000000030000300000000003000330000000000000000333333333333333333000333330033333000030000000000000000333414133334141333000000000000000003330000000000000000330000000000000000000000000000000003330000000000000000310000000000000000000003300000000330030000000000000000340033000000000000003303303300330330330000000000000000330033003330000000003333333333333333330000000000000000310033003330000000003300000000000000000000000000000000310033003330000000001300000000000000000000000000000000330033003330000000004300000000000000000000000000000000300033000000034431413300000000000000000000000000000000300000000000031431443300000000000000000000000000000000330000003300000000000300000000000000000000000000000000340000001100000000000300000000000000000000000000000000310000004400000000003300000000000000000000000000000000330033001100333333001300000000000000000000000000000000340033003300333333001300000000000000000000000000000000310000001400000000004300000000000000000000000000000000330000004100000000003300000000000000000000000000000000333113143300344131133300000000000000000000000000000000333333333333333333333300000000000000000000000000000000";
var mapMid = "333333333333333333333333333333333333333333333333333333330031113331141300133333333333333333003111133411430033303300000000000000433333333333333334000000014000003303303300000000000000133333333333333331003330041000003303330003333000003300333333333333333334003330014000000033310003333000001400333333333333333333000000033000000013340003333003304100333333333333333334000000000003300013310003333003301400133333333333333331000000000004400013310000000003301400133333333333333331033330000004400043333341130003304400433333333333333334033330000004400043334143330003301100333333333333333333033330000004400013310000000003304400333333333333333333033330034443400013310000000000001100333333333333333333000000034444300013330330333000003300133333333333333331003300000000003333300330333000000000433333333333333331003300000000003303300000000000000000133333333333333331000000000000000003334141333411333141333333333333333333411333111433311433333333333333333333331133311113331133333333333333333333333333333333333333310000000000000013333333333333333333333333333333333333310000000000000013333333333333333333333333333333333333310033333333330033333333333333333333333333333333333333310033333333330003333333333333333333333333333333333333330033333333330003333333333333333333333333333333333333310033333333333303333333333333333333333333333333333333310033333333333303333333333333333333333333333333333333310033333333333303333333333333333333333333333333333333310033333333330003333333333333333333333333333333333333330033333333330003333333333333333333333333333333333333310033333333330033333333333333333333333333333333333333310033333333330013333333333333333333333333333333333333310000000000000013333333333333333333333333333333333333310000000000000013333333333333333333333333333333333333331133311113331133333333333333333333331413334114333141333333333333333333333333333333333333300000000000000000133333333333333333333333333333333333300003333000000000433333333333333333333333333333333333330003333333333000133333333333333333333333333333333333340003333333333000333333333333333333333333333333333333310003333000000330333333333333333333333333333333333333310000000000000330333333333333333333333333333333333333340000000000000330133333333333333333333333333333333333331114411300000000133333333333333333333333333333333333334141413100000000433333333333333333333333333333333333310000001400333141333333333333333333333333333333333333310000004100341133333333333333333333333333333333333333330000003300000000133333333333333333333333333333333333303300000000000000133333333333333333333333333333333333303300000000000000433333333333333333333333333333333333330031143413114300333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333";
var mapTop = "333333333333333333333333333333333333333333333333333333331411430033003411333333333333333333411300330034131433340000000033000000433333333333333334000000330000000013310000000000000000133333333333333331000033330000000043340000000000000000133333333333333334000033330333333013330000003114143000333333333333333333000000000333333033300330003441131000000330000000000000000000000000000003300330000000044000000330000000000000000000000000000003300330000033011000000000000000033000000003114311430333300330000033044000000000000000033000033004311314310333300330000000011000333333330033333333033001400000140003300330003141431000133333330033333331033004100000410003330000003141413000433333330033333331033001400000110033310333300000000000133333330033333334033004100000330043340333300000000000433333330033333331033001400000000013310000000000000000333333330033333333000003100000000013334111300003141314333333330033333333341133333414311433333333300003333333333114430031411333333333333333333333333333300003333333330000000000000033333333333333333333333333333003333333340000000000000013333333333333333333333333333003333333310033333333330043333333333333333333333333300003333333310033333333330013333333333333333333333333300003333333340033333333330013333333333333333333333333300003333333330033333333330033333333333333333333333333300000000000000033333333330003333333333333333333333333300000000000000033333333333303333333333333333333333333300003333333330033333333333303333333333333333333333333300003333333340033333333333303333333333333333333333333300003333333310033333333333303333333333333333333333333300333333333340033333333330003333333333333333333333333300333333333310000000000000333333333333333333333333333300003333333330000000000000333333333333333333333333333300003333333333141141300341333333333333333333333331411300003143143333333333333333333333333333333333333340000000000000000333333333333333333333333333333333333310000000000000330133333333333333333333333333333333333310000000000000330433333333333333333333333333333333333330000330003300330133333333333333333333333333333333333333000140004100330133333333333333333333333333333333333333000410001100000433333333333333333333333333333333333333000410001100000133333333333333333333333333333333333333000110004344311333333333333333333333333333333333333333000440003114314333333333333333333333333333333333333333000140000000000133333333333333333333333333333333333330000330000000000133333333333333333333333333333333333340000000033333300433333333333333333333333333333333333310000000033333300133333333333333333333333333333333333310000000000000000133333333333333333333333333333333333334131430000003141333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333";

var bookcasesOrderedIds = [ 110, 116, 114, 117, 119, 130, 132, 147, 146, 145, 138, 129, 124, 123, 128, 134, 141, 140, 139, 133, 125, 109, 108, 106, 99, 101, 103, 105, 89, 87, 86, 78, 72, 58, 57, 71, 77, 85, 83, 76, 70, 56, 35, 27, 0, 2, 4, 5, 7, 9, 22, 31, 44, 43, 41, 47, 49, 59, 53, 51, 32, 23, 11, 13, 24, 33, 36, 34, 25, 20, 15, 16, 18, 26, 38, 40, 63, 69, 81, 96, 95, 74, 68, 62, 54, 67, 79, 93, 91, 90, 226, 218, 211, 202, 201, 192, 184, 175, 148, 149, 150, 151, 152, 154, 155, 168, 187, 195, 234, 238, 249, 247, 246, 245, 243, 241, 227, 213, 193, 185, 176, 181, 214, 228, 333, 327, 320, 322, 324, 328, 335, 325, 317, 316, 313, 312, 311, 308, 307, 293, 295, 297, 298, 300, 302, 303, 305, 310, 318, 332, 330, 337, 338, 339, 340, 348, 347, 346, 343, 342, 283, 281, 279, 278, 277, 276, 275, 274, 273, 272, 270, 268, 260, 261, 262, 263, 264, 265, 266, 267, 269, 271, 280, 282, 284, 292, 291, 290, 289, 288, 287, 286, 285, 239, 237, 235, 196, 188, 169, 156, 157, 158, 159, 166, 173, 171, 161, 162, 178, 183, 191, 217, 225, 233, 258, 257, 255, 254, 253, 252, 251, 545, 543, 505, 503, 494, 496, 497, 498, 500, 504, 507, 512, 522, 529, 528, 521, 516, 511, 515, 520, 532, 533, 535, 539, 540, 544, 546, 553, 551, 549, 548, 537, 523, 508, 514, 519, 524, /* <WEIRD ONES: */ 525, 515, 511, 521, 526, 529, 536, 535, 533, /* /> */ 451, 450, 449, 445, 433, 369, 350, 352, 353, 356, 357, 370, 374, 416, 434, 455, 454, 452, 411, 413, 405, 389, 385, 384, 377, 378, 380, 386, 390, 406, 415, 426, 424, 422, 441, 428, 417, 371, 359, 360, 362, 363, 368, 376, 444, 447, 464, 463, 461, 446, 437, 419, 400, 401, 402, 409, 431, 432, 421, 404, 395, 394, 392, 391, 407, 429, 442, 459, 458, 485, 483, 478, 476, 466, 467, 470, 472, 473, 475, 479, 481, 493, 491, 489, 488, 486 ];
var tempArray = [];

var hintBookcaseIds = [];

var nFloors = 3;
var nSections = 4;

var step = 10;
var sourceX = 54;
var sourceY = 50;
var sectionSizeX = 460, sectionSizeY = 420;
var mapX = 20;
var mapY = 18;
var selectedBookcaseId = -1;
var lastHoverBookcaseId = -1;
var hoveringManuscripts = false;

var canvases = new Array(nFloors);
var contextes = new Array(nFloors);
var mapData = new Array(nFloors);
var mapBookData = new Array(nFloors);
var bookcaseIds = new Array(nFloors * nSections * mapX * mapY);
var mapPosAtBookcaseId = new Array();

var paintStart = new Array(nSections);

var sectionStarts = [
	{ x: 1, y: 1 },
	{ x: 33, y: 1 },
	{ x: 1, y: 31 },
	{ x: -1, y: -1 },
	{ x: 0, y: 0 },
	{ x: 34, y: 0 },
	{ x: 0, y: 32 },
	{ x: 17, y: 16 },
	{ x: 0, y: 0 },
	{ x: 34, y: 0 },
	{ x: 0, y: 32 },
	{ x: 17, y: 16 }
];

function init() {
	var i;
	
	for (i = 0; i < books.length; i++) {
		var ele = $("<div class='book'>");
		ele.text(books[i].name);
		$(".book-names").append(ele);
	}
    for (i = 0; i < 1; i++) {
        var ele = $("<div class='book manuscript'>");
        ele.text("Dark manuscript");
        $(".book-names").append(ele);
    }

	canvases[0] = $(".canv-bot");
	canvases[1] = $(".canv-mid");
	canvases[2] = $(".canv-top");
	for (i = 0; i < nFloors; i++) {
		canvases[i].attr("width", sectionSizeX);
		canvases[i].attr("height", sectionSizeY);
		contextes[i] = canvases[i][0].getContext("2d");
	}
	
	for (i = 0; i < nFloors; i++) {
		mapData[i] = new Array();
        mapBookData[i] = new Array();
	}
	
	for (i = 0; i < books.length; i++) {
		books[i].pos = -1;
		books[i].collected = false;
	}

    mapPosAtBookcaseId = new Array();
    var currBookcaseId = 0;
	function loadData(data, floor) {
		var x, y;
		for (y = 0; y < sourceY; y++) {
			for (x = 0; x < sourceX; x++) {
				var d = parseInt(data[x + y * sourceX]);
				var val = MAP_EMPTY;
				if (d === 1) {
					val = MAP_BOOKCASE_1;
				}
                else if (d === 4) {
                    val = MAP_BOOKCASE_2;
                }
				else if (d === 3) {
					val = MAP_BLOCK;
				}
                
                if (d === 1 || d === 4) {
                    mapPosAtBookcaseId.push({
                        floor: floor,
                        x: x,
                        y: y
                    });
                    bookcaseIds[getMapPos(floor, x, y)] = currBookcaseId;
                    currBookcaseId++;
                }
				setMap(floor, x, y, val);
                setMapBook(floor, x, y, -1);
			}
		}
	}

	loadData(mapBot, 0);
	loadData(mapMid, 1);
	loadData(mapTop, 2);
	
	var padd = 10;
	var midX = sectionSizeX / 2;
	var midY = sectionSizeY / 2;
	
	paintStart[0] = {
		x: midX - padd / 2 - mapX * step,
		y: midY - padd / 2 - mapY * step
	};
	paintStart[1] = {
		x: midX + padd / 2,
		y: midY - padd / 2 - mapY * step
	};
	paintStart[2] = {
		x: midX - padd / 2 - mapX * step,
		y: midY + padd / 2
	};
	paintStart[3] = {
		x: midX + padd / 2,
		y: midY + padd / 2
	};
	
	window.requestAnimationFrame(render);
}

function drawMapBorder(floor, dx, dy, w, h) {
	var ctx = contextes[floor];
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000000";
	for (var i = 0; i <= h; i++) {
		ctx.beginPath();
		ctx.moveTo(dx, dy + i * step);
		ctx.lineTo(dx + w * step, dy + i * step);
		ctx.stroke();
	}
	for (var i = 0; i <= w; i++) {
		ctx.beginPath();
		ctx.moveTo(dx + i * step, dy);
		ctx.lineTo(dx + i * step, dy + h * step);
		ctx.stroke();
	}
}

function drawMapData(floor, section) {
	var x, y;
	var dx = sectionStarts[floor * nSections + section].x;
	var dy = sectionStarts[floor * nSections + section].y;
	var ctx = contextes[floor];
	
	var highlighted = [];
	
	for (y = 0; y < mapY; y++) {
		for (x = 0; x < mapX; x++) {
			var d = getMap(floor, dx + x, dy + y);
			if (d === MAP_BOOKCASE_1) { //Bookcase
				ctx.fillStyle = "#FF0000";
                var bookcaseId = mapToBookcaseId(floor, dx + x, dy + y);
                if (bookcaseId === selectedBookcaseId || bookcaseId === lastHoverBookcaseId) {
                    highlighted.push({ x:x, y:y });
                }
			}
            else if (d === MAP_BOOKCASE_2) { // Dead bookcase
                ctx.fillStyle = "#B59090";
                var bookcaseId = mapToBookcaseId(floor, dx + x, dy + y);
                if (bookcaseId === selectedBookcaseId || bookcaseId === lastHoverBookcaseId) {
                    highlighted.push({ x:x, y:y });
                }
            }
			else if (d === MAP_BLOCK) { //Block
				ctx.fillStyle = "#666666";
			}
			else if (d === MAP_EMPTY) {
				ctx.fillStyle = "#FFFFFF";
			}
            
            var bookTile = getMapBook(floor, dx + x, dy + y);
			if (bookTile >= MAP_BOOK_FIRST && bookTile <= MAP_BOOK_LAST) {
                if (books[bookTile].collected) {
					ctx.fillStyle = "#FF973D";
                }
                else {
					ctx.fillStyle = "#00FFD0";
                }
			}
            else if (bookTile === MAP_MANUSCRIPT) {
                ctx.fillStyle = "#327DFF";
                if (hoveringManuscripts) {
                    highlighted.push({ x:x, y:y });
                }
            }
            else if (bookTile === MAP_HINT) {
                ctx.fillStyle = "#CECE00";
            }
            
			ctx.fillRect(
				1 + paintStart[section].x + x * step,
				1 + paintStart[section].y + y * step,
				step - 2, step - 2);
		}
	}
    
	var lineW = 4;
	ctx.strokeStyle = "#0000FF";
	ctx.lineWidth = lineW;
	for (var i = 0; i < highlighted.length; i++) {
		var x = highlighted[i].x;
		var y = highlighted[i].y;
		ctx.strokeRect(
			paintStart[section].x + x * step,
			paintStart[section].y + y * step,
			step, step);
	}
}

function render() {
	for (var i = 0; i < contextes.length; i++) {
		var ctx = contextes[i];
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, sectionSizeX, sectionSizeY);
	}

	for (var floor = 0; floor < nFloors; floor++) {
		for (var sec = 0; sec < nSections; sec++) {
			if (floor !== 0 || sec !== 3) {
				drawMapBorder(floor, paintStart[sec].x, paintStart[sec].y, mapX, mapY);
				drawMapData(floor, sec);
			}
		}		
	}
	
	for (var i = 0; i < books.length; i++) {
		if (books[i].pos != -1) {
			$(".book").eq(i).addClass("found-book");
		}
		else {
			$(".book").eq(i).removeClass("found-book");
		}
	}
}

function getMap(floor, x, y) {
	return mapData[floor][x + y * sourceX];
}

function setMap(floor, x, y, value) {
	mapData[floor][x + y * sourceX] = value;
}

function getMapBook(floor, x, y) {
    return mapBookData[floor][x + y * sourceX];
}

function setMapBook(floor, x, y, value) {
    mapBookData[floor][x + y * sourceX] = value;
}

function getMapPos(floor, x, y) {
	return floor +
		x * nFloors +
		y * nFloors * sourceX;
}

function mapToBookcaseId(floor, x, y) {
	var pos = getMapPos(floor, x, y);
	return bookcaseIds[pos];
}

function selectBookcase(bookcaseId) {
	selectedBookcaseId = bookcaseId;
	if (bookcaseId === undefined || bookcaseId === -1) {
		$(".book-names").removeClass("highlight");
	}
	else {
		$(".book-names").addClass("highlight");
        $(".book-section").trigger("resize");
	}
    
    window.requestAnimationFrame(render);
}

function recalculateHints() {
    var weirdBookcaseIds = [525, 515, 511, 521, 526, 529, 536, 535, 533];

    var step = 13;
    var totalItems = books.length + 10;
    for (var i = 0; i < hintBookcaseIds.length; i++) {
        var loc = mapPosAtBookcaseId[hintBookcaseIds[i]];
        if (getMapBook(loc.floor, loc.x, loc.y) === MAP_HINT) {
            setMapBook(loc.floor, loc.x, loc.y, -1);
        }
    }
    hintBookcaseIds = [];
    
    var index = -1;
    for (var i = 0; i < bookcasesOrderedIds.length; i++) {
        if (weirdBookcaseIds.indexOf(bookcasesOrderedIds[i]) !== -1) {
            // Skip weird bookcase ids for simplicity
            // It should rarely matter anyway
            continue;
        }
        var loc = mapPosAtBookcaseId[bookcasesOrderedIds[i]];
        if (getMapBook(loc.floor, loc.x, loc.y) !== -1) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        return;
    }
    
    index -= (totalItems - 1) * step;
    while (index < 0) {
        index += bookcasesOrderedIds.length;
    }
    
    var foundStart = -1, foundEnd = -1;
    var foundStartIndex = -1;
    var foundEndIndex = -1;
    for (var i = 0; i < (totalItems * 2) - 1; i++) {
        if (weirdBookcaseIds.indexOf(bookcasesOrderedIds[index]) !== -1) {
            // Skip weird bookcase ids for simplicity
            // It should rarely matter anyway
        }
        else {
            var loc = mapPosAtBookcaseId[bookcasesOrderedIds[index]];
            if (getMapBook(loc.floor, loc.x, loc.y) !== -1) {
                if (foundStart === -1) {
                    foundStart = index;
                    foundStartIndex = i;
                }
                foundEnd = index;
                foundEndIndex = i;
            }
        }
        index += step;
        index %= bookcasesOrderedIds.length;
    }
    var length = foundEndIndex - foundStartIndex + 1;
    if (length <= totalItems) {
        index = foundStart - (totalItems - length) * step;
        while (index < 0) {
            index += bookcasesOrderedIds.length;
        }
        
        for (var i = 0; i < length + 2 * (totalItems - length); i++) {
            var bookcaseId = bookcasesOrderedIds[index];
            hintBookcaseIds.push(bookcaseId);
            var loc = mapPosAtBookcaseId[bookcaseId];
            if (getMapBook(loc.floor, loc.x, loc.y) === -1) {
                setMapBook(loc.floor, loc.x, loc.y, MAP_HINT);
            }
            index += step;
            index %= bookcasesOrderedIds.length;
        }
    }
}

function onBookClick(bookId) {
	if (selectedBookcaseId !== -1) {
		mapBook(bookId, selectedBookcaseId);
	}
	else {
		if (books[bookId].collected) {
			books[bookId].collected = false;
			$(".book").eq(bookId).removeClass("collected-book");
		}
		else {
			books[bookId].collected = true;
			$(".book").eq(bookId).addClass("collected-book");
		}
	}
}

function mapBook(bookId, bookcaseId) {
    unmapBook(bookId);
    unmapBookcase(bookcaseId);
    
	books[bookId].pos = bookcaseId;
	var loc = mapPosAtBookcaseId[bookcaseId];
	setMapBook(loc.floor, loc.x, loc.y, bookId);
	generateCode(false);
}

function updateManuscriptsText() {
    var text = "Dark manuscript";
    if (manuscripts.length > 0) {
        text += " (" + manuscripts.length + ")";
    }
    $(".manuscript").text(text);
}

function mapManuscript(bookcaseId) {
    unmapBookcase(bookcaseId);
    
    manuscripts.push({
        pos: bookcaseId
    });
    updateManuscriptsText();
    
    var loc = mapPosAtBookcaseId[bookcaseId];
    setMapBook(loc.floor, loc.x, loc.y, MAP_MANUSCRIPT);
    generateCode(false);
}

function unmapBookcase(bookcaseId) {
	var loc = mapPosAtBookcaseId[bookcaseId];
    var tile = getMapBook(loc.floor, loc.x, loc.y);
    setMapBook(loc.floor, loc.x, loc.y, -1);
    
    if (tile >= MAP_BOOK_FIRST && tile <= MAP_BOOK_LAST) {
        books[tile].pos = -1;
    }
    else if (tile === MAP_MANUSCRIPT) {
        for (var i = 0; i < manuscripts.length; i++) {
            var manuscript = manuscripts[i];
            if (manuscript.pos === bookcaseId) {
                manuscripts.splice(i, 1);
                i--;
            }
        }
        updateManuscriptsText();
    }
    generateCode(false);
}

function unmapBook(bookId) {
    if (bookId !== -1) {
        var bookcaseId = books[bookId].pos;
        if (bookcaseId !== -1) {
            unmapBookcase(bookcaseId);
        }
    }
}

function generateCode(compress) {
    compress = false; // TODO: Always false for now

	var code = "";
	if (compress) {
		code += encode(books.length, 1);
		for (var i = 0; i < books.length; i++) {
			var book = books[i];
			if (book.pos !== undefined && book.pos >= 0) {
				code += encode(book.pos, 2);
			}
		}
	}
	else {
		for (var i = 0; i < books.length; i++) {
			var book = books[i];
			if (book.pos !== -1) {
				code += encode(i, 1);
				code += encode(book.pos, 2);
			}
		}
        for (var i = 0; i < manuscripts.length; i++) {
            var manuscript = manuscripts[i];
            if (manuscript.pos !== -1) {
                code += 'Z';
                code += encode(manuscript.pos, 2);
            }
        }
	}
	$("#book-data-inp").val(code);
	window.requestAnimationFrame(render);
}

function parseCode(code) {
	var pos = 0, bookId = 0, bookcaseId, loc;
	for (bookId = 0; bookId < books.length; bookId++) {
        unmapBook(bookId);
	}
	bookId = -1;
	while (pos < code.length) {
        bookId = decode(code[pos++]);
		if (pos + 2 > code.length) break;
		
		bookcaseId = decode(code.substring(pos, pos + 2));
		pos += 2;
		
        if (bookId === MAP_MANUSCRIPT) {
            mapManuscript(bookcaseId);
        }
        else {
            mapBook(bookId, bookcaseId);
        }
	}
	window.requestAnimationFrame(render);
}

function encode(num, padNum) {
	return num.toString(36).toUpperCase().padLeft(padNum);
}

function decode(code) {
	return parseInt(code, 36);
}

$(document).ready(function() {

	init();
	
	$(".book-names").on("mousedown", ".book", function(e) {
		if (e.button != 0) return;
        if ($(this).hasClass("manuscript")) {
            if (selectedBookcaseId !== -1) {
                mapManuscript(selectedBookcaseId);
            }
            recalculateHints();
            return;
        }
        
		var bookId = -1;
		for (var i = 0; i < books.length; i++) {
			if (books[i].name === $(e.target).text()) {
				bookId = i;
				break;
			}
		}
		onBookClick(bookId);
        recalculateHints();
		window.requestAnimationFrame(render);
	});
	
	$(".book-names").on("contextmenu", ".book", function(e) {
		e.preventDefault();
        if ($(this).hasClass("manuscript")) {
            for (var i = 0; i < manuscripts.length; i++) {
                unmapBookcase(manuscripts[i].pos);
                i--;
            }
            recalculateHints();
            return;
        }
        
		var bookId = -1;
		for (var i = 0; i < books.length; i++) {
			if (books[i].name === $(e.target).text()) {
				bookId = i;
				break;
			}
		}
		var pos = books[bookId].pos;
		if (pos != -1) {
			unmapBookcase(pos);
            recalculateHints();
		}
        lastHoverBookcaseId = -1;
		window.requestAnimationFrame(render);
	});
	
	$(".book-names").on("mouseenter", ".book", function(e) {
        if ($(this).hasClass("manuscript")) {
            hoveringManuscripts = true;
            return;
        }
    
		var bookId = -1;
		for (var i = 0; i < books.length; i++) {
			if (books[i].name === $(e.target).text()) {
				bookId = i;
				break;
			}
		}
		
		var bookcaseId = books[bookId].pos;
		if (bookcaseId === -1 || bookcaseId === lastHoverBookcaseId) {
			return;
		}
		lastHoverBookcaseId = bookcaseId;
		window.requestAnimationFrame(render);
	});
	
	$(".book-names").on("mouseleave", ".book", function(e) {
        if ($(this).hasClass("manuscript")) {
            hoveringManuscripts = false;
            return;
        }
    
		var bookId = -1;
		for (var i = 0; i < books.length; i++) {
			if (books[i].name === $(e.target).text()) {
				bookId = i;
				break;
			}
		}
		
		var bookcaseId = books[bookId].pos;
		if (bookcaseId === -1) {
			return;
		}
		lastHoverBookcaseId = -1;
		window.requestAnimationFrame(render);
	});
    
    $(".section").on("mouseleave", "canvas", function(e) {
		if (lastHoverBookcaseId !== -1) {
            lastHoverBookcaseId = -1;
			window.requestAnimationFrame(render);
		}
    });
	
	$(".section").on("mousedown", "canvas", function(e) {
		if (e.button != 0) return;
	
		var className = $(e.target).attr("class");
		var floor = -1, section;
		var x, y, found = false;
		
		if (className == "canv-bot") { floor = 0; }
		else if (className == "canv-mid") { floor = 1; }
		else if (className == "canv-top") { floor = 2; }
		
		for (section = 0; section < nSections * nFloors; section++) {
			var ps = paintStart[section % nSections];
			x = Math.floor((e.offsetX - ps.x) / step);
			y = Math.floor((e.offsetY - ps.y) / step);
			if (x >= 0 && x < mapX && y >= 0 && y < mapY) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			return;
		}
		
		var start = sectionStarts[floor * nSections + section];
		x += start.x;
		y += start.y;
		
        if (e.ctrlKey) {
            tempArray.push(bookcaseIds[getMapPos(floor, x, y)]);
        }
        else if (e.shiftKey) {
            tempArray.splice(tempArray.length - 1, 1);
        }
        else if (e.altKey) {
            var text = "[ " + tempArray.join(", ") + " ]";
            console.log(text);
        }
        else {
            selectBookcase(bookcaseIds[getMapPos(floor, x, y)]);
        }
		
		return false;
	});
	
	$(".section").on("contextmenu", "canvas", function(e) {
		e.preventDefault();
		var clazz = $(e.target).attr("class");
		var floor = -1, section;
		var x, y, found = false;
		
		if (clazz == "canv-bot") { floor = 0; }
		else if (clazz == "canv-mid") { floor = 1; }
		else if (clazz == "canv-top") { floor = 2; }
		
		for (section = 0; section < nSections * nFloors; section++) {
			var ps = paintStart[section % nSections];
			x = Math.floor((e.offsetX - ps.x) / step);
			y = Math.floor((e.offsetY - ps.y) / step);
			if (x >= 0 && x < mapX && y >= 0 && y < mapY) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			return false;
		}
		
		var start = sectionStarts[floor * nSections + section];
		x += start.x;
		y += start.y;
		
		var bookcaseId = bookcaseIds[getMapPos(floor, x, y)];
		
		if (bookcaseId !== -1 && bookcaseId !== undefined) {
			unmapBookcase(bookcaseId);
            recalculateHints();
		}
		return false;
	});
	
	$(".section").on("mousemove", "canvas", function(e) {
		var clazz = $(e.target).attr("class");
		var floor = -1, section;
		var x, y, found = false;
		
		if (clazz == "canv-bot") { floor = 0; }
		else if (clazz == "canv-mid") { floor = 1; }
		else if (clazz == "canv-top") { floor = 2; }
		
		for (section = 0; section < nSections * nFloors; section++) {
			var ps = paintStart[section % nSections];
			x = Math.floor((e.offsetX - ps.x) / step);
			y = Math.floor((e.offsetY - ps.y) / step);
			if (x >= 0 && x < mapX && y >= 0 && y < mapY) {
				found = true;
				break;
			}
		}
		
		if (!found) {
            if (lastHoverBookcaseId !== -1) {
                lastHoverBookcaseId = -1;
                window.requestAnimationFrame(render);
            }
			return;
		}
		
		var start = sectionStarts[floor * nSections + section];
		x += start.x;
		y += start.y;
		
		var bookcaseId = bookcaseIds[getMapPos(floor, x, y)];
        
		var requestUpdate = false;
		if (lastHoverBookcaseId !== -1 && lastHoverBookcaseId !== bookcaseId) {
			requestUpdate = true;
		}
		if (bookcaseId !== -1 && bookcaseId !== lastHoverBookcaseId) {
			requestUpdate = true;
		}
		lastHoverBookcaseId = bookcaseId;
		
		if (requestUpdate) {
			window.requestAnimationFrame(render);
		}
		return false;
	});
	
	$("#book-data-inp").on("input", function(e) {
		parseCode($(e.target).val());
        recalculateHints();
	});
	
	$("#book-data-inp").on("keydown", function(e) {
		if (e.which == 13) {
			var txt = $("#book-data-inp").val();
			if (txt.length == 3 * books.length) {
				generateCode(true);
			}
			else {
				generateCode(false);
			}
		}
	});
	
	$(window).mousedown(function(e) {
		selectBookcase(-1);
	});

});