const fs = require('fs');

mod = new Object();
mod.addItem = function (jsfile, type) {

}
mod.addBlock = function (jsfile, type) {
    blockjs = fs.readFileSync("blocks\\" + jsfile, "ascii").toLowerCase();
    hardness = new Array();
    harvestlevel = new Array();
    toolclass = new Array();
    resistance = new Array();
    drop = new Array();
    addtocreative = new Array();
    semitransparent = new Array();
    transparent = new Array();
    light = new Array();
    redstoneonly = new Array();
    hascollision = new Array();
    opacity = new Array();
    tiletransparent = new Array();

    texturefilexp = new Array();
    texturefilexn = new Array();
    texturefileyp = new Array();
    texturefileyn = new Array();
    texturefilezp = new Array();
    texturefilezn = new Array();

    doubleslabblock = new Array();
    doubleslabmeta = new Array();
    texturefilefront = new Array();
    texturefileback = new Array();
    texturefilesides = new Array();
    eval(blockjs);

    blockinit = new Object();
    blockinit.type = null;

    blockinit.entries = new Array();
    blockinit.entries[0] = new Object();
    blockinit.entries[0].id = name;
    blockinit.entries[0].material = material;
    
    if (addtocreative[0] == true&&typeof creativetab!="undefined") {
        blockinit.entries[0].creativeTab = ArraytoSubtype(creativetab);
    }
    
    blockinit.entries[0].hardness = ArraytoSubtype(hardness);
    blockinit.entries[0].resistance = ArraytoSubtype(resistance);
    blockinit.entries[0].soundType = ArraytoSubtype(stepsound);
    // blockinit.entries[0].harvestTool = ArraytoSubtype(toolClass);
    blockinit.entries[0].drop = ArraytoSubtype(drop);
    if (semitransparent == true||semitransparent[0] == true){
        blockinit.entries[0].renderLayer = "translucent";
        blockinit.entries[0].isOpaqueCube = false;

    }
    else if (transparent == true||transparent[0] == true){
        blockinit.entries[0].renderLayer = "cutout";
        blockinit.entries[0].isOpaqueCube = false;

    }
    
    blockinit.entries[0].light = ArraytoSubtype(light);
    if (hascollision[0] == false)
        blockinit.entries[0].collisionBounds = null;
    blockinit.entries[0].opacity = ArraytoSubtype(opacity);

    if (type == "normal") {
        blockinit.type = "block:simple";
        blockinit.entries[0].subtypes = [...hardness.keys()]
        var itemModel = new Object();
        for (var i = 0; i < hardness.length; i++) {
            itemModel[i.toString()] = CS2modinfo[0].modid + ":" + name + "_" + i;
        }
        blockinit.entries[0].itemModel = itemModel;

        var blockstate = new Object();
        blockstate.variants = new Object();

        for (var i = 0; i < hardness.length; i++) {
            blockstate.variants["subtype=subtype" + i] = new Object();
            blockstate.variants["subtype=subtype" + i].model = CS2modinfo[0].modid + ":" + name + "_" + i;
        }

        var blockstatestr = JSON.stringify(blockstate);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\" + name + ".json", blockstatestr);
        for (var i = 0; i < hardness.length; i++) {
            var model = new Object();
            model.parent = "block/cube";
            model.textures = new Object();
            model.textures.east = CS2modinfo[0].modid + ":blocks/" + texturefilexp[i].split('.')[0];
            model.textures.west = CS2modinfo[0].modid + ":blocks/" + texturefilexn[i].split('.')[0];
            model.textures.up = CS2modinfo[0].modid + ":blocks/" + texturefileyp[i].split('.')[0];
            model.textures.down = CS2modinfo[0].modid + ":blocks/" + texturefileyn[i].split('.')[0];
            model.textures.north = CS2modinfo[0].modid + ":blocks/" + texturefilezp[i].split('.')[0];
            model.textures.south = CS2modinfo[0].modid + ":blocks/" + texturefilezn[i].split('.')[0];
            var modelstr = JSON.stringify(model);
            fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + name + "_" + i + ".json", modelstr);

            var itemmodel = new Object();
            itemmodel.parent = CS2modinfo[0].modid + ":block/" + name + "_" + i
            var itemmodelstr = JSON.stringify(itemmodel);
            fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\item\\" + name + "_" + i + ".json", itemmodelstr);
        }

        fileblocks.blocks.push(blockinit);
    }
    else if (type == "slab") {
        blockinit.type = "block:slab";
        blockinit.entries[0].itemModel = CS2modinfo[0].modid + ":" + name;
        blockinit.entries[0].doubleSlab = new Object();
        blockinit.entries[0].doubleSlab.block = doubleslabblock[0];

        var blockstate = new Object();
        blockstate.variants = new Object();
        blockstate.variants["half=bottom"] = new Object();
        blockstate.variants["half=bottom"].model = CS2modinfo[0].modid + ":" + "half_"+name;
        
        blockstate.variants["half=top"] = new Object();
        blockstate.variants["half=top"].model = CS2modinfo[0].modid + ":" + "upper_"+name;

        var blockstatestr = JSON.stringify(blockstate);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\" + name + ".json", blockstatestr);

        var model = new Object();
        model.parent = "block/half_slab";
        model.textures = new Object();
        model.textures.bottom = CS2modinfo[0].modid + ":blocks/" + texturefileyn[0].split('.')[0];
        model.textures.top = CS2modinfo[0].modid + ":blocks/" + texturefileyp[0].split('.')[0];
        model.textures.side = CS2modinfo[0].modid + ":blocks/" + texturefilexp[0].split('.')[0];

        var modelstr = JSON.stringify(model);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + "half_" + name + ".json", modelstr);

        model.parent = "block/upper_slab";
        var modelstr = JSON.stringify(model);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + "upper_" + name + ".json", modelstr);

        var itemmodel = new Object();
        itemmodel.parent = CS2modinfo[0].modid + ":block/" + "half_" + name;
        var itemmodelstr = JSON.stringify(itemmodel);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\item\\" + name + ".json", itemmodelstr);

        fileblocks.blocks.push(blockinit);
    }
    else if (type == "stairs") {
        blockinit.type = "block:stairs";
        blockinit.entries[0].itemModel = CS2modinfo[0].modid + ":" + name;
        blockinit.entries[0].modelState = {};
        blockinit.entries[0].modelState.block = "minecraft:log";
        
        var stairtemp = fs.readFileSync('stairtemp.json', 'ascii');
        stairtemp = stairtemp.replace(/#/g,CS2modinfo[0].modid + ":" + name);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\" + name + ".json", stairtemp);

        var model = new Object();
        model.parent = "block/stairs";
        model.textures = new Object();
        model.textures.bottom = CS2modinfo[0].modid + ":blocks/" + texturefileyn[0].split('.')[0];
        model.textures.top = CS2modinfo[0].modid + ":blocks/" + texturefileyp[0].split('.')[0];
        model.textures.side = CS2modinfo[0].modid + ":blocks/" + texturefilexp[0].split('.')[0];
        var modelstr = JSON.stringify(model);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + name + ".json", modelstr);

        model.parent = "block/inner_stairs";
        var modelstr = JSON.stringify(model);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + name + "_inner" + ".json", modelstr);

        model.parent = "block/outer_stairs";
        var modelstr = JSON.stringify(model);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + name + "_outer" + ".json", modelstr);

        var itemmodel = new Object();
        itemmodel.parent = CS2modinfo[0].modid + ":block/" + name;
        var itemmodelstr = JSON.stringify(itemmodel);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\item\\" + name + ".json", itemmodelstr);

        fileblocks.blocks.push(blockinit);
    }
    else if (type == "pane") {
        blockinit.type = "block:pane";
        blockinit.entries[0].itemModel = CS2modinfo[0].modid + ":" + name;

        var panetemp = fs.readFileSync('panetemp.json', 'ascii');
        panetemp = panetemp.replace(/#/g,CS2modinfo[0].modid + ":" + name);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\" + name + ".json", panetemp);

        var model = new Object();
        model.textures = {
            "edge": CS2modinfo[0].modid + ":blocks/" + texturefileyp[0].split('.')[0],
            "pane": CS2modinfo[0].modid + ":blocks/" + texturefilexp[0].split('.')[0]
        }
        var pantypearray = ["post","side","side_alt","noside","noside_alt"] ;
        for(var str in pantypearray){
            model.parent = "block/pane_"+pantypearray[str];
            var modelstr = JSON.stringify(model);
            fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + name + "_" + pantypearray[str] + ".json", modelstr);
        }
        var itemmodel = {
            "parent": "item/generated",
            "textures": {
                "layer0": CS2modinfo[0].modid + ":blocks/" + texturefilexp[0].split('.')[0]
            }
        }
        var itemmodelstr = JSON.stringify(itemmodel);
            fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\item\\" + name + ".json", itemmodelstr);

        fileblocks.blocks.push(blockinit);
    }
    else if (type == "trapDoor") {
        
    }
    else if (type == "door") {
        
    }
    else if (type == "torch") {
        
    }
    else if (type == "crossTexture") {
        blockinit.type = "block:simple";
        blockinit.entries[0].renderLayer = "translucent";
        blockinit.entries[0].isOpaqueCube = false;
        blockinit.entries[0].isFullCube = false;
        blockinit.entries[0].opacity = 0;
        blockinit.entries[0].subtypes = [...hardness.keys()]
        var itemModel = new Object();
        for (var i = 0; i < hardness.length; i++) {
            itemModel[i.toString()] = CS2modinfo[0].modid + ":" + name + "_" + i;
        }
        blockinit.entries[0].itemModel = itemModel;

        var blockstate = new Object();
        blockstate.variants = new Object();

        for (var i = 0; i < hardness.length; i++) {
            blockstate.variants["subtype=subtype" + i] = new Object();
            blockstate.variants["subtype=subtype" + i].model = CS2modinfo[0].modid + ":" + name + "_" + i;
        }

        var blockstatestr = JSON.stringify(blockstate);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\" + name + ".json", blockstatestr);
        for (var i = 0; i < hardness.length; i++) {
            var model = new Object();
            model.parent = "block/tinted_cross";
            model.textures = new Object();
            model.textures.cross = CS2modinfo[0].modid + ":blocks/" + texturefilexp[i].split('.')[0];
            var modelstr = JSON.stringify(model);
            fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\" + name + "_" + i + ".json", modelstr);

            var itemmodel = {
                "parent": "item/generated",
                "textures": {
                    "layer0": CS2modinfo[0].modid + ":blocks/" + texturefilexp[0].split('.')[0]
                }
            }
            
            var itemmodelstr = JSON.stringify(itemmodel);
            fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\item\\" + name + "_" + i + ".json", itemmodelstr);
        }

        fileblocks.blocks.push(blockinit);
    }
    else if (type == "fluid") {
        blockinit.type = "block:fluid";
        blockinit.entries[0].density = density;
        blockinit.entries[0].texFlowing = CS2modinfo[0].modid + ":blocks/" + texturefileflowing.split('.')[0];
        blockinit.entries[0].texStill = CS2modinfo[0].modid + ":blocks/" + texturefilestill.split('.')[0];

        var fluidtemp = fs.readFileSync('fluidtemp.json', 'ascii');
        fluidtemp = fluidtemp.replace(/#/g, name);
        fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\" + name + ".json", fluidtemp);

        fileblocks.blocks.push(blockinit);
    }
    else if (type == "facing") {
        
    }

}
function ArraytoSubtype(arr) {
    if (Array.isArray(arr)) {
        if (arr.length == 0)
            return;
        if (arr.length == 1)
            return arr[0];
        var obj = new Object();
        for (var i = 0; i < arr.length; i++) {
            obj[i.toString()] = arr[i];
        }
        return obj;
    }
    else {
        return arr;
    }
}
mod.addRecipe = function (jsfile, type) {

}
mod.addCreativeTab = function (jsfile, type) {

}
var CS2modinfostr = fs.readFileSync('mcmod.info', 'ascii').toLowerCase();
CS2modinfo = JSON.parse(CS2modinfostr);
fs.mkdirSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\blockstates\\", { recursive: true });
fs.mkdirSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\lang\\", { recursive: true });
fs.mkdirSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\block\\", { recursive: true });
fs.mkdirSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\models\\item\\", { recursive: true });
fs.mkdirSync("CS4_" + CS2modinfo[0].modid + "\\assets\\" + CS2modinfo[0].modid + "\\textures\\blocks\\", { recursive: true });
fileblocks = new Object();
fileblocks.blocks = new Array();
var CS2mod = fs.readFileSync('mod.js', 'ascii');
console.log(CS2mod);
eval(CS2mod);
fileblocksstr = JSON.stringify(fileblocks)
console.log(fileblocksstr);
fs.writeFileSync("CS4_" + CS2modinfo[0].modid + "\\blocks.json", fileblocksstr);
