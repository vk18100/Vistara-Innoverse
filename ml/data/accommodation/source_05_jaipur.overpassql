[out:json][timeout:120];

{{geocodeArea:Jaipur, India}}->.searchArea;

(
  nw["tourism"~"^(hotel|hostel|guest_house|motel|resort|apartment|chalet)$"](area.searchArea);
);

out center tags;