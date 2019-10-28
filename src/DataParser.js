function parseOsmData(obj, col){
  var fillColor = col || "#ff0000";
  var data = {
    name: obj.tags.name || obj.tags["name:en"],
    lat: obj.lat || obj.center.lat,
    lon: obj.lon || obj.center.lon,
    zoom: 19,
    data: {
      osm: {
        type: obj.type,
        id: obj.id
      },
      facilities: [
        {key: "Air Conditioning", value: isYes(obj, "air_conditioning")},
        {key: "Baby Changing Table", value: isYes(obj, "changing_table")},
        {key: "Delivery", value: isYes(obj, "delivery")},
        {key: "Delivery via GoFood", value: isYes(obj, "delivery:gofood")},
        {key: "Delivery via GrabFood", value: isYes(obj, "delivery:grabfood")},
        {key: "Drive Through", value: isYes(obj, "drive_through")},
        {key: "Internet Access", value: isYes(obj, "internet_access")},
        {key: "Outdoor Seating", value: isYes(obj, "outdoor_seating")},
        {key: "Take Away", value: isYes(obj, "takeaway")},
        {key: "Toilets", value: isYes(obj, "toilets")},
        {key: "Wheelchair Access", value: isYes(obj, "wheelchair")},
        {key: "Wheelchair-Accessible Toilets", value: isYes(obj, "toilets:wheelchair")}
      ],
      payments: [
        {key: "Cash (Notes)", value: isYes(obj, "payment:cash") || isYes(obj, "payment:notes")},
        {key: "Cash (Coins)", value: isYes(obj, "payment:cash") || isYes(obj, "payment:coins")},
        {key: "Debit Cards", value: isYes(obj, "payment:gpn_debit") || isYes(obj, "payment:maestro") || isYes(obj, "payment:visa_debit") || isYes(obj, "payment:visa_electron")},
        {key: "Credit Cards", value: isYes(obj, "payment:jcb") || isYes(obj, "payment:mastercard") || isYes(obj, "payment:unionpay") || isYes(obj, "payment:visa")},
        {key: "BRI BRIZZI", value: isYes(obj, "payment:ep_brizzi") || isYes(obj, "payment:id_brizzi")},
        {key: "BCA Flazz", value: isYes(obj, "payment:ep_flazz") || isYes(obj, "payment:id_flazz")},
        {key: "Mandiri e-money", value: isYes(obj, "payment:ep_mandiri_emoney") || isYes(obj, "payment:id_mandiri_emoney")},
        {key: "BNI TapCash", value: isYes(obj, "payment:ep_tapcash") || isYes(obj, "payment:id_tapcash")},
        {key: "Cashbac", value: isYes(obj, "payment:cashbac") || isYes(obj, "payment:id_cashbac")},
        {key: "DANA", value: isYes(obj, "payment:dana") || isYes(obj, "payment:id_dana") || isYes(obj, "payment:samsung_pay")},
        {key: "GoPay", value: isYes(obj, "payment:gopay_id") || isYes(obj, "payment:id_gopay")},
        {key: "i.saku", value: isYes(obj, "payment:isaku") || isYes(obj, "payment:id_isaku")},
        {key: "LinkAja", value: isYes(obj, "payment:linkaja") || isYes(obj, "payment:id_linkaja") || isYes(obj, "payment:id_linkaja_scan")},
        {key: "OVO", value: isYes(obj, "payment:ovo") || isYes(obj, "payment:id_ovo") || isYes(obj, "payment:grabpay")},
        {key: "Sakuku", value: isYes(obj, "payment:sakuku") || isYes(obj, "payment:id_sakuku")},
        {key: "YUKK", value: isYes(obj, "payment:yukk") || isYes(obj, "payment:yukk")},
        {key: "GPN QRIS", value: isYes(obj, "gpn_qris")}
      ],
      about: [
        {key: "Brand", value: obj.tags["brand"]},
        {key: "Wikidata", value: obj.tags["brand:wikidata"]},
        {key: "Operator", value: obj.tags["operator"]},
        {key: "Street Name", value: obj.tags["addr:street"]},
        {key: "House Number", value: obj.tags["addr:housenumber"]},
        {key: "Postcode", value: obj.tags["addr:postcode"]},
        {key: "Phone", value: obj.tags["phone"]},
        {key: "Email", value: obj.tags["email"]},
        {key: "Website", value: obj.tags["brand:website"] || obj.tags["website"]}
      ],
      building: obj.tags["building"],
      level: obj.tags["level"],
      opening_hours: obj.tags["opening_hours"],
    },
    maps: [
      {
        name: "OpenStreetMap",
        icon: "src/images/maps/openstreetmap.png",
        mask: true,
        background: "#99b69d",
        color: "#000000",
        osmType: "way",
        osmId: "153306200",
        url: "https://www.openstreetmap.org/%osmtype/%osmid"
      },
      {
        name: "GoFood",
        icon: "src/images/maps/gofood.jpg",
        mask: false,
        background: "#ed2736",
        color: "#ffffff",
        exclusives: ["Android", "iOS"],
        url: obj.tags[obj, "delivery:gofood:ref"] || null
      },
      {
        name: "GrabFood",
        icon: "src/images/maps/grabfood.png",
        mask: false,
        background: "#22b251",
        color: "#ffffff",
        url: obj.tags[obj, "delivery:grabfood:ref"] || null
      },
      {
        name: "Win10 Maps",
        icon: "src/images/maps/win10maps.jpg",
        mask: false,
        background: "#0078d7",
        color: "#ffffff",
        exclusives: ["Windows"],
        url: "bingmaps:?collection=point.%lat_%lon_%name&lvl=%zoom"
      },
      {
        name: "Apple Maps",
        icon: "src/images/maps/applemaps.png",
        mask: true,
        background: "#313131",
        color: "#ffffff",
        exclusives: ["MacOS", "iOS"],
        url: "https://maps.apple.com/?ll=%lat,%lon&q=%name&sll=%lat,%lon&z=%zoom&t=s"
      },
      {
        name: "GNOME Maps",
        icon: "src/images/maps/gnomemaps.png",
        mask: true,
        background: "#8ff0a4",
        color: "#000000",
        exclusives: ["Linux"],
        url: "geo:%lat,%lon"
      },
      {
        name: "Google Maps",
        icon: "src/images/maps/googlemaps.png",
        mask: true,
        background: "#f1f1f1",
        color: "#000000",
        url: "https://maps.google.com/?ll=%lat,%lon&q=%name&sll=%lat,%lon&z=%zoom&t=s"
      },
      {
        name: "Waze",
        icon: "src/images/maps/waze.png",
        mask: false,
        background: "#62d2eb",
        color: "#486067",
        url: "https://waze.com/ul?q=%name&ll=%lat,%lon"
      },
      {
        name: "OsmAnd",
        icon: "src/images/maps/osmand.png",
        mask: false,
        background: "#f0f0f0",
        color: "#000000",
        exclusives: ["Android", "iOS"],
        url: "https://osmand.net/go.html?lat=%lat&lon=%lon&z=%zoom"
      },
      {
        name: "Bing Maps",
        icon: "src/images/maps/bing.png",
        mask: true,
        background: "#ffffff",
        color: "#00809d",
        exclusives: ["Linux", "MacOS", "Windows"],
        url: "https://www.bing.com/maps?where1=%name&cp=%lat~%lon&lvl=%zoom"
      },
      {
        name: "HERE WeGo",
        icon: "src/images/maps/herewego.jpg",
        mask: false,
        background: "#292d38",
        color: "#ffffff",
        url: "https://share.here.com/l/%lat,%lon,%name?&z=%zoom&p=yes"
      },
      {
        name: "More...",
        icon: "src/images/maps/more.png",
        mask: true,
        background: "#ffff00",
        color: "#ffffff",
        exclusives: ["Android", "Linux", "macOS", "Windows"],
        url: "geo:%lat,%lon?q=%lat,%lon(%name)"
      },
      {
        name: "More...",
        icon: "src/images/maps/more.png",
        mask: true,
        background: "#ffff00",
        color: "#ffffff",
        exclusives: ["iOS"],
        url: "maps://?q=%lat,%lon(%name)"
      }
    ]
  };
  let initstring = "<h1 style='color:" + fillColor + "'>" + data.name + "</h1>";
  initstring += "<h3>" + detectPoiType() + "</h3>";
  initstring += detectFacilities();
  initstring += detectPayments();
  initstring += detectAbout();
  initstring += "<h4><a onClick='toggle(\"toggle1\", \"flex\")' style='color:" + fillColor + "'>Open With...</a><h4><div class='menutilecontainer' id='toggle1' style='display:none'>";

  let i;
  for (i = 0; i < data.maps.length; i++){
    let map = data.maps[i];
    let url = map.url;
    if (url !== null){
      url = decodeParams(url);
      if(map.exclusives && map.exclusives.length > 0){
        let j;
        for (j = 0; j < map.exclusives.length; j++){
          if (testUA(map.exclusives[j]) === true){
            initstring += appendList(map.name, url, map.icon, map.mask, map.color, map.background);
          }
        }
      } else {
        initstring += appendList(map.name, url, map.icon, map.mask, map.color, map.background);
      }
    }
  }

  function decodeParams(string){
    return string.replace("%zoom", data.zoom)
    .replace("%osmtype", data.data.osm.type)
    .replace("%osmid", data.data.osm.id)
    .replace("%lat", data.lat)
    .replace("%lon", data.lon)
    .replace("%lat", data.lat) //allow duplicate latlong parameters
    .replace("%long", data.long)
    .replace("%name", encodeURIComponent(data.name))
    .replace("%20", "+");
  }

  function detectPoiType(){
    let type = "";
    if (obj.tags.amenity){
      type += "Amenity: " + obj.tags.amenity.replace("_", " ");
    } else if (obj.tags.shop){
      type += "Shop: " + obj.tags.shop.replace("_", " ");
    };
    if (data.data.opening_hours){
      type += "<br>Opens " + data.data.opening_hours.replace(";", ", ");
    }
    return type;
  }

  function detectFacilities(){
    let available = false;
    let result;
    let i, j = 0;
    for (i = 0; i < data.data.facilities.length; i++){
      if (data.data.facilities[i].value == true){
        if (j == 0){
          result = "<h2>Facilities</h2><ul>";
          j++
        };
        available = true;
        result += "<li>" + data.data.facilities[i].key + "</li>";
      }
    }
    if (available == true){
      result += "</ul>"
      return result;
    } else {
      return "";
    }
  }

  function detectPayments(){
    let available = false;
    let result;
    let i, j = 0;
    for (i = 0; i < data.data.payments.length; i++){
      if (data.data.payments[i].value == true){
        if (j == 0){
          result = "<h2>Accepting Payments</h2><ul>";
          j++
        };
        available = true;
        result += "<li>" + data.data.payments[i].key + "</li>";
      }
    }
    if (available == true){
      result += "</ul>"
      return result;
    } else {
      return "";
    }
  }

  function detectAbout(){
    let available = false;
    let result;
    let i, j = 0;
    for (i = 0; i < data.data.about.length; i++){
      if (data.data.about[i].value != null){
        if (j == 0){
          result = "<h2>About This Place</h2><ul>";
          j++
        };
        available = true;
        result += "<li>" + data.data.about[i].key + ": " + formatValue(data.data.about[i].key, data.data.about[i].value) + "</li>";
      }
    }
    if (available == true){
      result += "</ul>"
      return result;
    } else {
      return "";
    }
  }

  function formatValue(key, value){
    var result;
    switch (key){
      case "Wikidata": result = "<a href='https://www.wikidata.org/wiki/" + value + "' target='_blank'>" + value + "</a>"; break;
      case "Phone": result = "<a href='tel:" + value + "' target='_blank'>" + value + "</a>"; break;
      case "Email": result = "<a href='mailto:" + value + "' target='_blank'>" + value + "</a>"; break;
      case "Website": result = "<a href='" + value + "' target='_blank'>" + value + "</a>"; break;
      default: result = value;
    }
    return result;
  }

  initstring += "</div>";
  return initstring;
}

function isYes(obj, tag){
  return (obj.tags[tag] && (obj.tags[tag] == "yes" || (tag == "takeaway" && obj.tags[tag] == "only") || ((tag == "toilets:wheelchair" || tag == "wheelchair") && obj.tags[tag] == "dedicated") || (tag == "internet_access" && obj.tags[tag] != "no"))) ? true : false;
}

function appendList(string, url, icon, masked, foreground, background){
  let mask = "";
  if (masked === true){mask = "masked";}
  return "<div class='menutile' style='color:" + foreground + ";background-color:" + background + "'><a href='" + url + "' target='_blank' style='color:" + foreground + "'><img src='" + icon + "' alt='" + string + "' class='" + mask + "'><br><p>" + string + "</p></a></div>";
}

function toggle(id, display){
  let object = document.getElementById(id);
  let state = display || "block";
  if (object.style.display === "none"){
    object.style.display = state;
  } else {
    object.style.display = "none";
  }
}

function testUA(string){
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macOSStrings = ['Macintosh', 'MacOS'];
  const iOSStrings = ['iPhone', 'iPad', 'iPod'];
  const WindowsStrings = ['Win32', 'Win64', 'Windows'];
  let os;
  if (macOSStrings.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iOSStrings.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (WindowsStrings.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os === string ? true : false;
}
function randomColor(){
  const colors = ["#008cff", "#0d48f7", "#8103c8", "#ac00a7", "#f23221", "#fb582e", "#f7bd0d", "#7cd140", "#00be55", "#008986", "#1aabfe", "#d88c24", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f39c12", "#d35400", "#c0392b"];
  return colors[Math.floor(Math.random() * colors.length)];
}
