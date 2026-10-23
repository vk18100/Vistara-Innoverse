[out:json][timeout:120];

{{geocodeArea:Bengaluru, India}}->.searchArea;

(
  nw["tourism"~"^(hotel|hostel|guest_house|motel|resort|apartment|chalet)$"](area.searchArea);
);

out center tags;