let ocean_basemap = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Esri, Garmin, GEBCO, NOAA NGDC, and other contributors',
        url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
        // maxZoom: 19,
    })
});

let old_ocean_basemap = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Esri, Garmin, GEBCO, NOAA NGDC, and other contributors',
        // url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
        // maxZoom: 19,
    })
})

let ignore_layers = [
    'Admin0 forest or park',
    'Admin0 forest or park/label',
    'Admin0 ribbon L2 L3 inner',
    'Admin0 ribbon L2 L3 outer',
    'Admin0 ribbon L4 inner',
    'Admin0 ribbon L4 outer',
    'Admin0 ribbon L5 inner',
    'Admin0 ribbon L5 outer',
    'Admin0 ribbon L6 inner',
    'Admin0 ribbon L6 outer',
    'Admin0 ribbon L7 inner',
    'Admin0 ribbon L7 outer',
    'Admin1 forest or park',
    'Bathymetry',
    'Biome',
    'Boundary line',
    'Coastline',
    'Colormap',
    'Graticule',
    'Graticule/label',
    'Indigenous',
    'Land',
    'Marine area',
    'Military',
    'Military/label',
    // 'Ocean point',
    'Road',
    'Road tunnel',
    'Road/label',
    'Spot elevation',
    'Vegetation small scale',
    'Water area large scale',
    'Water area medium scale',
    'Water area small scale',
    'Water line large scale',
    'Water line medium scale',
    'Water line small scale',
    'Urban area',
]
let default_land_style = {
    color: 'black',
    outline_width: 2,
    outline_color: 'white',
    size: '12px',
    font: '"Verdana"',
    weight: 'normal',
    wrap: false,
    resolution: null,
};
let default_water_style = {
    color: 'blue',
    outline_width: 2,
    outline_color: 'white',
    size: '12px',
    font: '"Open Sans"',
    weight: 'normal',
    wrap: false,
    resolution: null
};
let label_layers = {
    'Admin0 point': {                   // Country
        color: 'rgba(150,150,150,1)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '14px',
        font: '"Open Sans"',
        weight: 'bold',
        wrap: false,
        resolution: null,
    },
    'Admin1 area/label': default_land_style,
    'Admin1 forest or park/label': default_land_style,
    'Continent': {
        color: 'rgba(150,150,150,1)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '16px',
        font: '"Open Sans"',
        weight: 'bold',
        wrap: true,
        resolution: null,
    },
    'City small scale': {                   // City
        color: 'rgba(80,80,80,1)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '10px',
        font: '"Open Sans"',
        weight: 'normal',
        wrap: false,
        resolution: null,
    },
    'Disputed label point': default_land_style,
    'Indigenous/label':default_land_style,
    'land': default_land_style,
    'Landform/label': default_land_style,
    'Marine waterbody/label': {         //Ocean or large sea
        color: '#0060c0',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '12px',
        font: 'Verdana',
        weight: 'italic',
        wrap: true,
        special: [
            {
                'condition': ['label', ['ocean',]],
                'change': [['size', '17px'],]
            },
        ],
        resolution: null
    },
    'Ocean area/label': {              //Sea, basin, strait, or ridge
        color: 'rgba(40,100,200,1)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '11px',
        font: 'Verdana',
        weight: 'italic',
        wrap: true,
        special: [
            {
                'condition':['label', [
                    'basin', 'ridge', 'plain', 
                    'rise', 'trench', 'escarpment',
                    'plateau', 'seamount', 'bank', 
                    'banque', 'canyon']
                ],
                'change': [
                    ['color', 'rgba(80,80,80,1)'],
                    ['weight', 'italic'],
                    ['font', '"Open Sans"']
                ]
            },
            {
                'condition': ['resolution_below', 4892], //resolutions[5].min_resolution
                'change': [
                    ['size', '16px']
                ]
            }
        ],
        resolution: null
    },
    'Ocean point': {                //Bathy feature/depth
        color: 'rgba(0,0,0,0.5)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '10px',
        font: 'Verdana',
        weight: 'normal',
        wrap: false,
        resolution: null
    },
    'Outdoors place': default_land_style,
    'Water area large scale/label': default_water_style,
    'Water area small scale/label': {              //large lake
        color: 'rgba(40,150,200,1)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '11px',
        font: 'Verdana',
        weight: 'italic',
        wrap: false,
        // special: [],
        resolution: null
    },
    'Water line large scale/label': default_water_style,
    'Water line medium scale/label': {              //large lake
        color: 'rgba(40,150,200,1)',
        outline_width: 0,
        outline_color: 'rgba(0,0,0,0)',
        size: '11px',
        font: 'Verdana',
        weight: 'italic',
        wrap: false,
        // special: [],
        resolution: null
    },
    'Water line small scale/label': default_water_style,
    'Water point/Sea or ocean': default_water_style,
}

let resolutions = [
    {
        zoom: 0,
        min_resolution: 88270.96,
        max_resolution: Infinity,
        layers: [
            'Continent',
            'Marine waterbody/label'
        ]
    },
    {
        zoom: 1,
        min_resolution: 44135.48,
        max_resolution: 88270.96,
        layers: [
            'Continent',
            'Marine waterbody/label'
        ]
    },
    {
        zoom: 2,
        min_resolution: 39135.75,
        max_resolution: 44135.48,
        layers: [
            'Continent',
            'Marine waterbody/label'
        ]
    },
    {
        zoom: 3,
        min_resolution: 19567.87,
        max_resolution: 39135.75,
        layers: [
            'Continent',        //Continent
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
        ]
    },
    {
        zoom: 4,
        min_resolution: 9783.93,
        max_resolution: 19567.87,
        layers: [
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
            'City small scale', //City
        ]
    },
    {
        zoom: 5,
        min_resolution: 4891.96,
        max_resolution: 9783.93,
        layers: [
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
            'City small scale', //City
            'Water area small scale/label', //large lakes
        ]
    },
    {
        zoom: 6,
        min_resolution: 2445.98,
        max_resolution: 4891.96,
        // layers: Object.keys(label_layers)
        layers: [
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
            'City small scale', //City
            'Water area small scale/label', //large lakes
            'Water line medium scale/label', //large rivers
        ]
    },
    {
        zoom: 7,
        min_resolution: 1222.99,
        max_resolution: 2445.98,
        // layers: Object.keys(label_layers)
        layers: [
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
            'City small scale', //City
            'Water area small scale/label', //large lakes
            'Water line medium scale/label', //large rivers
        ]
    },
    {
        zoom: 8,
        min_resolution: 611.49,
        max_resolution: 1222.99,
        // layers: Object.keys(label_layers)
        layers: [
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
            'City small scale', //City
            'Water area small scale/label', //large lakes
            'Water line medium scale/label', //large rivers
            'Admin1 area/label',        //State
        ]
    },
    {
        zoom: 9,
        min_resolution: 305.74,
        max_resolution: 611.49,
        // layers: Object.keys(label_layers)
        layers: [
            'Marine waterbody/label',   //Ocean
            'Admin0 point',     //Country
            'Ocean point',      //bathy feature/depth
            'Ocean area/label', //Sea
            'City small scale', //City
            'Water area small scale/label', //large lakes
            'Water line medium scale/label', //large rivers
            'Admin1 area/label',        //State
        ]
    },
    {
        zoom: 10,
        min_resolution: 152.87,
        max_resolution: 305.74,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 11,
        min_resolution: 76.43,
        max_resolution: 152.87,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 12,
        min_resolution: 38.21,
        max_resolution: 76.43,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 13,
        min_resolution: 19.10,
        max_resolution: 38.21,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 14,
        min_resolution: 9.55,
        max_resolution: 19.10,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 15,
        min_resolution: 4.777,
        max_resolution: 9.55,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 16,
        min_resolution: 2.388,
        max_resolution: 4.777,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 17,
        min_resolution: 1.194,
        max_resolution: 2.388,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 18,
        min_resolution: 0.597,
        max_resolution: 1.194,
        layers: Object.keys(label_layers)
    },
    {
        zoom: 19,
        min_resolution: 0,
        max_resolution: 0.597,
        layers: Object.keys(label_layers)
    },
]

let getFeatureName = function(feature) {
    let name = feature.get('_name');
    if (!name || name === undefined) {
        name = feature.get('_name_en');
    }
    if (!name || name === undefined) {
        name = feature.get('_name_global');
    }

    return name;
}

let getResolutionLayers = function(resolution) {
    for (let x of resolutions) {
        if (resolution < x.max_resolution && resolution >= x.min_resolution) {
            return x.layers;
        }
    }
    return [];
}

let applySpecialStyle = function(label, resolution, style, rule) {
    let active = false;
    switch(rule.condition[0]) {
        case 'label':
            for (match of rule.condition[1]){
                if (label.toLowerCase().indexOf(match.toLowerCase()) >= 0){
                    active = true;
                }
            }
            break;
        case 'resolution_below':
            if (resolution < rule.condition[1]){
                active = true;
            }
            break;
        default:
            active = false;
    }
    if (active){
        for (change of rule.change) {
            style[change[0]] = change[1];
        }
    }
    return style;
};

let buildLabelStyle = function(feature, resolution) {
    let layer = feature.get('layer');
    // let label = feature.get('_name');
    let label = getFeatureName(feature);
    let visible_layers = getResolutionLayers(resolution);
    if (visible_layers.indexOf(layer) >= 0) {
        console.log('[VISIBLE] ' + layer + ' - ' + label + ' - ' + resolution);
        // if (layer == 'Ocean point' && !isNaN(label)){
        //     return null;
        // }
        let style = structuredClone(label_layers[layer]);
        if (style.wrap) {
            label = stringDivider(label, 12, '\n');
        }
        if (style.special) {
            for (rule of style.special) {
                style = applySpecialStyle(label, resolution, style, rule);
            }
        }
        return new ol.style.Text({
            text: label,
            font: style.weight + ' ' + style.size + ' ' + style.font,
            fill: new ol.style.Fill({
                color: style.color
            }),
            stroke: new ol.style.Stroke({
                color: style.outline_color,
                width: style.outline_width,
            }),
        });
    } else {
        if (ignore_layers.indexOf(feature.get('layer')) < 0) {
            console.log('[NOT VISIBLE] ' + layer + ' - ' + label);
        }
    }
    return null;
    // return new ol.style.Text({
    //     // textAlign: 'center',
    //     // textBaseline: 'middle',
    //     // placement: 'point',
    //     // overflow: true,
    //     // font: 'normal 12px "Open Sans"',
    //     // getText(feature, resolution, {}),
    //     text: feature.get('_name'),
    //     // text: 'foo',
    //     // fill: new ol.style.Fill({color: 'black'}),
    //     // stroke: new ol.style.Stroke({color: 'white', width: 2}),

    // })

}

let labelStyleFunction = function(feature, resolution) {
    let label_style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 1,
            color: 'rgba(255,0,0,0)'
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0,255,0,0)'
        }),
        text: buildLabelStyle(feature, resolution)
        
    });
    // console.log(feature.get('layer') + ' - ' + feature.get('_name'));
    return label_style;

}


let labels = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
        attributions: "Sources: Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors, and the GIS User Community",
        format: new ol.format.MVT(),
        url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf',
        zDirection: 0,
    }),
    style: labelStyleFunction,
    declutter: true,
    useInterimTilesOnError: false,
});

const map = new ol.Map({
    target: 'map',
    layers: [
        old_ocean_basemap,
        // ocean_basemap,
        labels,
    ],
    view: new ol.View({
        // center:[-53800000,5800000],
        // center:[-13800000, 5800000],
        center:[-8000000, 5000000],
        // center:[0, 0],
        zoom: 8
    })
});

// https://stackoverflow.com/questions/14484787/wrap-text-in-javascript
function stringDivider(str, width, spaceReplacer) {
    if (str.length > width) {
      let p = width;
      while (p > 0 && str[p] != ' ' && str[p] != '-') {
        p--;
      }
      if (p > 0) {
        let left;
        if (str.substring(p, p + 1) == '-') {
          left = str.substring(0, p + 1);
        } else {
          left = str.substring(0, p);
        }
        const right = str.substring(p + 1);
        return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
      }
    }
    return str;
  }