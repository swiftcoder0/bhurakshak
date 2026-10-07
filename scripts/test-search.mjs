import fs from "fs";

const index = JSON.parse(
  fs.readFileSync("public/data/search-index/india-hierarchy.json", "utf8")
);

export function searchIndia(query, selectedState = null) {
  const q = query.trim().toLowerCase();

  // If no query and a state is selected, return the state's districts
  if (!q && selectedState) {
    const st = index.states.find((s) => s.id === selectedState.id);
    return { states: [], districts: st ? st.districts : [] };
  }

  if (!q) return { states: [], districts: [] };

  const tokens = q.split(/\s+/).filter(Boolean);

  // Match states
  const matchedStates = [];
  for (const st of index.states) {
    const nameLower = st.name.toLowerCase();
    const idLower = st.id.toLowerCase();
    if (
      nameLower.includes(q) ||
      (q === "up" && st.id === "uttar-pradesh") ||
      (q === "mp" && st.id === "madhya-pradesh") ||
      (q === "ap" && st.id === "andhra-pradesh")
    ) {
      matchedStates.push(st);
    }
  }

  // Match districts
  const matchedDistricts = [];
  for (const state of index.states) {
    if (selectedState && state.id !== selectedState.id) continue;

    for (const dist of state.districts) {
      const dName = dist.name.toLowerCase();
      const sName = state.name.toLowerCase();

      if (tokens.length > 1) {
        // e.g. "Rajasthan Jaipur" or "Jaipur Rajasthan"
        const matchesAll = tokens.every(
          (t) => dName.includes(t) || sName.includes(t)
        );
        if (matchesAll) {
          matchedDistricts.push(dist);
        }
      } else {
        if (dName.includes(q)) {
          matchedDistricts.push(dist);
        }
      }
    }
  }

  return {
    states: matchedStates.slice(0, 6),
    districts: matchedDistricts.slice(0, 15),
  };
}

console.log("Search 'Rajasthan':", searchIndia("Rajasthan").states.map((s) => s.name));
console.log("Search 'Jaipur':", searchIndia("Jaipur").districts.map((d) => `${d.name} (${d.stateName})`));
console.log("Search 'Rajasthan Jaipur':", searchIndia("Rajasthan Jaipur").districts.map((d) => `${d.name} (${d.stateName})`));
console.log("Search 'Maharashtra Pune':", searchIndia("Maharashtra Pune").districts.map((d) => `${d.name} (${d.stateName})`));
