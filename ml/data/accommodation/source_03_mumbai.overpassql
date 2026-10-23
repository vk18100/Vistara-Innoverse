[out:json][timeout:120];

{{geocodeArea:Mumbai, India}}->.searchArea;

(
  nwr["tourism"~"^(hotel|hostel|guest_house|motel|resort|apartment|chalet)$"](area.searchArea);
);

out center tags;