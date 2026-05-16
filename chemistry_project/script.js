const molecules = [
  {
    name: "Water Molecule",
    formula: "H2O",
    category: "Covalent",
    subtitle: "H2O / Polar covalent molecule",
    type: "Small Molecule",
    bond: "Polar covalent",
    state: "Liquid",
    geometry: "Bent",
    use: "Essential solvent for reactions, transport, and thermal regulation.",
    parts: "Oxygen / Hydrogen / Polar bonds",
    detailTitle: "Oxygen Atom",
    detailSubtitle: "Central atom",
    knowledge:
      "Water has a bent geometry that separates charge across the molecule. This polarity helps it dissolve ionic and polar compounds.",
    notes:
      "Hydrogen bonding between water molecules explains its high boiling point, surface tension, and ability to stabilize biological chemistry.",
    facts: ["Bond angle is about 104.5 degrees.", "Forms hydrogen bonds.", "Excellent solvent for polar substances."],
    items: [
      ["Oxygen", "More electronegative atom with a partial negative charge."],
      ["Hydrogen", "Partial positive ends that can form hydrogen bonds."],
      ["Polarity", "Uneven charge distribution drives solvent behavior."]
    ],
    atoms: [
      { id: "O", x: 0, y: 0, z: 0, r: 34, color: "#e94461", label: "O" },
      { id: "H", x: -82, y: 62, z: 24, r: 20, color: "#f7fafc", label: "H" },
      { id: "H", x: 82, y: 62, z: -24, r: 20, color: "#f7fafc", label: "H" }
    ],
    bonds: [[0, 1], [0, 2]]
  },
  {
    name: "Carbon Dioxide",
    formula: "CO2",
    category: "Covalent",
    subtitle: "CO2 / Linear oxide molecule",
    type: "Small Molecule",
    bond: "Double covalent",
    state: "Gas",
    geometry: "Linear",
    use: "Moves carbon through air, oceans, respiration, and combustion systems.",
    parts: "Carbon / Oxygen / Double bonds",
    detailTitle: "Carbon Atom",
    detailSubtitle: "Central atom",
    knowledge:
      "Carbon dioxide is linear and nonpolar overall because the two polar carbon-oxygen bonds cancel each other symmetrically.",
    notes:
      "Its infrared absorption makes CO2 important in climate chemistry, industrial carbonation, and fire suppression.",
    facts: ["Linear geometry.", "Two C=O double bonds.", "Nonpolar molecule despite polar bonds."],
    items: [
      ["Carbon", "Central atom sharing four electrons."],
      ["Oxygen", "Terminal atoms with high electronegativity."],
      ["Symmetry", "Opposing dipoles cancel out."]
    ],
    atoms: [
      { id: "O", x: -120, y: 0, z: 0, r: 30, color: "#e94461", label: "O" },
      { id: "C", x: 0, y: 0, z: 0, r: 32, color: "#2e3438", label: "C" },
      { id: "O", x: 120, y: 0, z: 0, r: 30, color: "#e94461", label: "O" }
    ],
    bonds: [[0, 1], [1, 2]]
  },
  {
    name: "Methane",
    formula: "CH4",
    category: "Organic",
    subtitle: "CH4 / Tetrahedral hydrocarbon",
    type: "Hydrocarbon",
    bond: "Nonpolar covalent",
    state: "Gas",
    geometry: "Tetrahedral",
    use: "Simple fuel molecule and starting point for organic chemistry.",
    parts: "Carbon / Hydrogen / Sigma bonds",
    detailTitle: "Carbon Center",
    detailSubtitle: "Tetrahedral atom",
    knowledge:
      "Methane places four hydrogen atoms around carbon in a tetrahedral arrangement, minimizing electron-pair repulsion.",
    notes:
      "Combustion converts methane and oxygen into carbon dioxide, water, and heat.",
    facts: ["Bond angle is about 109.5 degrees.", "Simplest alkane.", "Major component of natural gas."],
    items: [
      ["Carbon", "Forms four single covalent bonds."],
      ["Hydrogen", "Each shares one electron with carbon."],
      ["Tetrahedron", "Stable three-dimensional geometry."]
    ],
    atoms: [
      { id: "C", x: 0, y: 0, z: 0, r: 34, color: "#2e3438", label: "C" },
      { id: "H", x: 88, y: 70, z: 72, r: 18, color: "#f7fafc", label: "H" },
      { id: "H", x: -88, y: 70, z: -72, r: 18, color: "#f7fafc", label: "H" },
      { id: "H", x: 88, y: -70, z: -72, r: 18, color: "#f7fafc", label: "H" },
      { id: "H", x: -88, y: -70, z: 72, r: 18, color: "#f7fafc", label: "H" }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]]
  },
  {
    name: "Ammonia",
    formula: "NH3",
    category: "Covalent",
    subtitle: "NH3 / Trigonal pyramidal molecule",
    type: "Base",
    bond: "Polar covalent",
    state: "Gas",
    geometry: "Trigonal pyramidal",
    use: "Key base in fertilizers, cleaning products, and nitrogen chemistry.",
    parts: "Nitrogen / Hydrogen / Lone pair",
    detailTitle: "Nitrogen Atom",
    detailSubtitle: "Lone-pair center",
    knowledge:
      "A lone pair on nitrogen pushes the hydrogen atoms into a trigonal pyramidal shape and makes ammonia a weak base.",
    notes:
      "Ammonia accepts a proton to form ammonium, NH4+, in acid-base reactions.",
    facts: ["Has one lone pair.", "Weak base.", "Important nitrogen source for fertilizers."],
    items: [
      ["Nitrogen", "Central atom with one lone pair."],
      ["Hydrogen", "Three bonded atoms form the base of the pyramid."],
      ["Basicity", "Lone pair accepts protons."]
    ],
    atoms: [
      { id: "N", x: 0, y: -18, z: 0, r: 32, color: "#4967e8", label: "N" },
      { id: "H", x: -82, y: 68, z: 42, r: 18, color: "#f7fafc", label: "H" },
      { id: "H", x: 82, y: 68, z: 42, r: 18, color: "#f7fafc", label: "H" },
      { id: "H", x: 0, y: 82, z: -82, r: 18, color: "#f7fafc", label: "H" }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    name: "Sodium Chloride",
    formula: "NaCl",
    category: "Ionic",
    subtitle: "NaCl / Ionic crystal unit",
    type: "Salt",
    bond: "Ionic lattice",
    state: "Solid",
    geometry: "Cubic lattice",
    use: "Representative ionic compound used for lattice energy and solubility study.",
    parts: "Sodium ions / Chloride ions / Electrostatic lattice",
    detailTitle: "Ion Pair",
    detailSubtitle: "Repeating lattice",
    knowledge:
      "Sodium chloride forms a crystal lattice where each ion is attracted to oppositely charged neighbors in every direction.",
    notes:
      "In water, ion-dipole interactions can overcome lattice attractions and separate Na+ and Cl- into solution.",
    facts: ["High melting point.", "Conducts electricity when molten or dissolved.", "Forms a repeating cubic crystal."],
    items: [
      ["Na+", "Cation formed by losing one electron."],
      ["Cl-", "Anion formed by gaining one electron."],
      ["Lattice", "Alternating charges create a stable crystal."]
    ],
    atoms: [
      { id: "Na", x: -72, y: -72, z: -40, r: 28, color: "#d7b54a", label: "Na+" },
      { id: "Cl", x: 72, y: -72, z: 40, r: 34, color: "#58b66d", label: "Cl-" },
      { id: "Cl", x: -72, y: 72, z: 40, r: 34, color: "#58b66d", label: "Cl-" },
      { id: "Na", x: 72, y: 72, z: -40, r: 28, color: "#d7b54a", label: "Na+" },
      { id: "Na", x: 0, y: 0, z: 95, r: 28, color: "#d7b54a", label: "Na+" },
      { id: "Cl", x: 0, y: 0, z: -95, r: 34, color: "#58b66d", label: "Cl-" }
    ],
    bonds: [[0, 1], [0, 2], [1, 3], [2, 3], [4, 1], [4, 2], [5, 0], [5, 3]]
  },
  {
    name: "Benzene Ring",
    formula: "C6H6",
    category: "Organic",
    subtitle: "C6H6 / Aromatic ring",
    type: "Aromatic compound",
    bond: "Delocalized pi system",
    state: "Liquid",
    geometry: "Planar hexagonal",
    use: "Classic aromatic structure used to explain resonance and pi electron delocalization.",
    parts: "Carbon ring / Hydrogen atoms / Pi cloud",
    detailTitle: "Aromatic Ring",
    detailSubtitle: "Delocalized electrons",
    knowledge:
      "Benzene is unusually stable because six pi electrons are delocalized around the ring instead of fixed in separate double bonds.",
    notes:
      "Aromatic substitution reactions preserve the ring's stable electron system.",
    facts: ["Planar hexagonal molecule.", "Six delocalized pi electrons.", "Important aromatic scaffold."],
    items: [
      ["Carbon ring", "Six sp2 carbons arranged in a hexagon."],
      ["Hydrogen", "One hydrogen attached to each carbon."],
      ["Resonance", "Pi electrons spread across the ring."]
    ],
    atoms: [
      { id: "C", x: 0, y: -96, z: 0, r: 26, color: "#2e3438", label: "C" },
      { id: "C", x: 83, y: -48, z: 0, r: 26, color: "#2e3438", label: "C" },
      { id: "C", x: 83, y: 48, z: 0, r: 26, color: "#2e3438", label: "C" },
      { id: "C", x: 0, y: 96, z: 0, r: 26, color: "#2e3438", label: "C" },
      { id: "C", x: -83, y: 48, z: 0, r: 26, color: "#2e3438", label: "C" },
      { id: "C", x: -83, y: -48, z: 0, r: 26, color: "#2e3438", label: "C" },
      { id: "H", x: 0, y: -150, z: 0, r: 15, color: "#f7fafc", label: "H" },
      { id: "H", x: 130, y: -75, z: 0, r: 15, color: "#f7fafc", label: "H" },
      { id: "H", x: 130, y: 75, z: 0, r: 15, color: "#f7fafc", label: "H" },
      { id: "H", x: 0, y: 150, z: 0, r: 15, color: "#f7fafc", label: "H" },
      { id: "H", x: -130, y: 75, z: 0, r: 15, color: "#f7fafc", label: "H" },
      { id: "H", x: -130, y: -75, z: 0, r: 15, color: "#f7fafc", label: "H" }
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]]
  }
];

const elementCategoryMeta = {
  "alkali metal": { label: "Alkali metal", color: "#e86f5c", simple: "Very reactive soft metal." },
  "alkaline earth metal": { label: "Alkaline earth", color: "#e1a83f", simple: "Reactive metal found in minerals." },
  "transition metal": { label: "Transition metal", color: "#5b8bd9", simple: "Strong metal, often colorful in compounds." },
  "post-transition metal": { label: "Post-transition", color: "#66a993", simple: "Softer metal after the transition block." },
  metalloid: { label: "Metalloid", color: "#8dbe62", simple: "In-between element with metal and nonmetal traits." },
  "reactive nonmetal": { label: "Reactive nonmetal", color: "#6fc7d9", simple: "Nonmetal that often forms covalent compounds." },
  halogen: { label: "Halogen", color: "#b98ce8", simple: "Very reactive salt-forming nonmetal." },
  "noble gas": { label: "Noble gas", color: "#9aa7f2", simple: "Very unreactive gas with a full outer shell." },
  lanthanide: { label: "Lanthanide", color: "#d578b9", simple: "Rare-earth metal used in magnets and screens." },
  actinide: { label: "Actinide", color: "#b77b69", simple: "Heavy metal family; many are radioactive." },
  unknown: { label: "Unknown", color: "#a9adb3", simple: "Properties are still being studied." }
};

const elementFilters = ["All", "Metals", "Nonmetals", "Metalloids", "Noble gases", "Lanthanides", "Actinides"];
const lessons = {
  groups:
    "Columns are called groups. Elements in the same group usually behave alike because they have a similar number of outer electrons.",
  periods:
    "Rows are called periods. As you move left to right, atoms usually get more protons and their properties change step by step.",
  metals:
    "Metals mostly sit on the left and center. Nonmetals sit on the right, while metalloids form the staircase between them."
};

const elementRows = `
1|H|Hydrogen|1|1|reactive nonmetal|1.008|gas|Water, acids, stars
2|He|Helium|18|1|noble gas|4.003|gas|Balloons, cooling magnets
3|Li|Lithium|1|2|alkali metal|6.94|solid|Batteries, mood medicines
4|Be|Beryllium|2|2|alkaline earth metal|9.012|solid|Aerospace alloys
5|B|Boron|13|2|metalloid|10.81|solid|Glass, detergents
6|C|Carbon|14|2|reactive nonmetal|12.011|solid|Life, fuels, graphite
7|N|Nitrogen|15|2|reactive nonmetal|14.007|gas|Air, fertilizers
8|O|Oxygen|16|2|reactive nonmetal|15.999|gas|Breathing, combustion
9|F|Fluorine|17|2|halogen|18.998|gas|Toothpaste fluoride
10|Ne|Neon|18|2|noble gas|20.180|gas|Signs, lasers
11|Na|Sodium|1|3|alkali metal|22.990|solid|Salt, street lamps
12|Mg|Magnesium|2|3|alkaline earth metal|24.305|solid|Alloys, chlorophyll
13|Al|Aluminum|13|3|post-transition metal|26.982|solid|Cans, aircraft
14|Si|Silicon|14|3|metalloid|28.085|solid|Computer chips, glass
15|P|Phosphorus|15|3|reactive nonmetal|30.974|solid|DNA, fertilizers
16|S|Sulfur|16|3|reactive nonmetal|32.06|solid|Proteins, vulcanized rubber
17|Cl|Chlorine|17|3|halogen|35.45|gas|Disinfection, salt
18|Ar|Argon|18|3|noble gas|39.948|gas|Welding, light bulbs
19|K|Potassium|1|4|alkali metal|39.098|solid|Nerve signals, fertilizers
20|Ca|Calcium|2|4|alkaline earth metal|40.078|solid|Bones, limestone
21|Sc|Scandium|3|4|transition metal|44.956|solid|Light alloys
22|Ti|Titanium|4|4|transition metal|47.867|solid|Implants, aircraft
23|V|Vanadium|5|4|transition metal|50.942|solid|Strong steel
24|Cr|Chromium|6|4|transition metal|51.996|solid|Stainless steel
25|Mn|Manganese|7|4|transition metal|54.938|solid|Steel, batteries
26|Fe|Iron|8|4|transition metal|55.845|solid|Steel, blood hemoglobin
27|Co|Cobalt|9|4|transition metal|58.933|solid|Magnets, pigments
28|Ni|Nickel|10|4|transition metal|58.693|solid|Alloys, coins
29|Cu|Copper|11|4|transition metal|63.546|solid|Wires, plumbing
30|Zn|Zinc|12|4|transition metal|65.38|solid|Galvanizing, batteries
31|Ga|Gallium|13|4|post-transition metal|69.723|solid|Semiconductors
32|Ge|Germanium|14|4|metalloid|72.630|solid|Fiber optics
33|As|Arsenic|15|4|metalloid|74.922|solid|Semiconductors
34|Se|Selenium|16|4|reactive nonmetal|78.971|solid|Nutrition, solar cells
35|Br|Bromine|17|4|halogen|79.904|liquid|Flame retardants
36|Kr|Krypton|18|4|noble gas|83.798|gas|Lighting, lasers
37|Rb|Rubidium|1|5|alkali metal|85.468|solid|Atomic clocks
38|Sr|Strontium|2|5|alkaline earth metal|87.62|solid|Red fireworks
39|Y|Yttrium|3|5|transition metal|88.906|solid|LEDs, ceramics
40|Zr|Zirconium|4|5|transition metal|91.224|solid|Reactors, ceramics
41|Nb|Niobium|5|5|transition metal|92.906|solid|Superconductors
42|Mo|Molybdenum|6|5|transition metal|95.95|solid|Steel hardening
43|Tc|Technetium|7|5|transition metal|98|solid|Medical imaging
44|Ru|Ruthenium|8|5|transition metal|101.07|solid|Electronics
45|Rh|Rhodium|9|5|transition metal|102.91|solid|Catalytic converters
46|Pd|Palladium|10|5|transition metal|106.42|solid|Catalysts
47|Ag|Silver|11|5|transition metal|107.87|solid|Jewelry, circuits
48|Cd|Cadmium|12|5|transition metal|112.41|solid|Batteries, pigments
49|In|Indium|13|5|post-transition metal|114.82|solid|Touch screens
50|Sn|Tin|14|5|post-transition metal|118.71|solid|Solder, coatings
51|Sb|Antimony|15|5|metalloid|121.76|solid|Flame retardants
52|Te|Tellurium|16|5|metalloid|127.60|solid|Solar cells
53|I|Iodine|17|5|halogen|126.90|solid|Thyroid health
54|Xe|Xenon|18|5|noble gas|131.29|gas|Lamps, anesthesia
55|Cs|Cesium|1|6|alkali metal|132.91|solid|Atomic clocks
56|Ba|Barium|2|6|alkaline earth metal|137.33|solid|Medical imaging
57|La|Lanthanum|3|8|lanthanide|138.91|solid|Camera lenses
58|Ce|Cerium|4|8|lanthanide|140.12|solid|Glass polishing
59|Pr|Praseodymium|5|8|lanthanide|140.91|solid|Magnets, glass
60|Nd|Neodymium|6|8|lanthanide|144.24|solid|Powerful magnets
61|Pm|Promethium|7|8|lanthanide|145|solid|Research batteries
62|Sm|Samarium|8|8|lanthanide|150.36|solid|Magnets
63|Eu|Europium|9|8|lanthanide|151.96|solid|Red phosphors
64|Gd|Gadolinium|10|8|lanthanide|157.25|solid|MRI contrast
65|Tb|Terbium|11|8|lanthanide|158.93|solid|Green phosphors
66|Dy|Dysprosium|12|8|lanthanide|162.50|solid|High-temp magnets
67|Ho|Holmium|13|8|lanthanide|164.93|solid|Lasers
68|Er|Erbium|14|8|lanthanide|167.26|solid|Fiber amplifiers
69|Tm|Thulium|15|8|lanthanide|168.93|solid|Portable X-rays
70|Yb|Ytterbium|16|8|lanthanide|173.05|solid|Lasers, clocks
71|Lu|Lutetium|17|8|lanthanide|174.97|solid|PET scanners
72|Hf|Hafnium|4|6|transition metal|178.49|solid|Control rods
73|Ta|Tantalum|5|6|transition metal|180.95|solid|Capacitors
74|W|Tungsten|6|6|transition metal|183.84|solid|Filaments, tools
75|Re|Rhenium|7|6|transition metal|186.21|solid|Jet engines
76|Os|Osmium|8|6|transition metal|190.23|solid|Hard alloys
77|Ir|Iridium|9|6|transition metal|192.22|solid|Spark plugs
78|Pt|Platinum|10|6|transition metal|195.08|solid|Catalysts, jewelry
79|Au|Gold|11|6|transition metal|196.97|solid|Jewelry, electronics
80|Hg|Mercury|12|6|transition metal|200.59|liquid|Thermometers, lamps
81|Tl|Thallium|13|6|post-transition metal|204.38|solid|Special glass
82|Pb|Lead|14|6|post-transition metal|207.2|solid|Shielding, batteries
83|Bi|Bismuth|15|6|post-transition metal|208.98|solid|Medicines, alloys
84|Po|Polonium|16|6|post-transition metal|209|solid|Research sources
85|At|Astatine|17|6|halogen|210|solid|Cancer research
86|Rn|Radon|18|6|noble gas|222|gas|Geology tracing
87|Fr|Francium|1|7|alkali metal|223|solid|Research
88|Ra|Radium|2|7|alkaline earth metal|226|solid|Historical glow paints
89|Ac|Actinium|3|9|actinide|227|solid|Research medicine
90|Th|Thorium|4|9|actinide|232.04|solid|Nuclear research
91|Pa|Protactinium|5|9|actinide|231.04|solid|Research
92|U|Uranium|6|9|actinide|238.03|solid|Nuclear fuel
93|Np|Neptunium|7|9|actinide|237|solid|Research
94|Pu|Plutonium|8|9|actinide|244|solid|Nuclear energy
95|Am|Americium|9|9|actinide|243|solid|Smoke detectors
96|Cm|Curium|10|9|actinide|247|solid|Space research
97|Bk|Berkelium|11|9|actinide|247|solid|Research
98|Cf|Californium|12|9|actinide|251|solid|Neutron sources
99|Es|Einsteinium|13|9|actinide|252|solid|Research
100|Fm|Fermium|14|9|actinide|257|solid|Research
101|Md|Mendelevium|15|9|actinide|258|solid|Research
102|No|Nobelium|16|9|actinide|259|solid|Research
103|Lr|Lawrencium|17|9|actinide|266|solid|Research
104|Rf|Rutherfordium|4|7|transition metal|267|solid|Research
105|Db|Dubnium|5|7|transition metal|268|solid|Research
106|Sg|Seaborgium|6|7|transition metal|269|solid|Research
107|Bh|Bohrium|7|7|transition metal|270|solid|Research
108|Hs|Hassium|8|7|transition metal|277|solid|Research
109|Mt|Meitnerium|9|7|unknown|278|solid|Research
110|Ds|Darmstadtium|10|7|unknown|281|solid|Research
111|Rg|Roentgenium|11|7|unknown|282|solid|Research
112|Cn|Copernicium|12|7|transition metal|285|liquid|Research
113|Nh|Nihonium|13|7|unknown|286|solid|Research
114|Fl|Flerovium|14|7|post-transition metal|289|solid|Research
115|Mc|Moscovium|15|7|unknown|290|solid|Research
116|Lv|Livermorium|16|7|unknown|293|solid|Research
117|Ts|Tennessine|17|7|halogen|294|solid|Research
118|Og|Oganesson|18|7|noble gas|294|gas|Research
`;

const elements = elementRows
  .trim()
  .split("\n")
  .map((row) => {
    const [number, symbol, name, column, rowNumber, category, mass, naturalState, use] = row.split("|");
    return {
      number: Number(number),
      symbol,
      name,
      column: Number(column),
      row: Number(rowNumber),
      category,
      mass,
      naturalState,
      use
    };
  });

const categories = ["All", "Covalent", "Organic", "Ionic"];
const canvas = document.getElementById("moleculeCanvas");
const ctx = canvas.getContext("2d");
const state = {
  selected: 0,
  category: "All",
  query: "",
  rotationX: -0.25,
  rotationY: 0.55,
  zoom: 1.65,
  autoRotate: true,
  markers: true,
  bondLabels: false,
  dragging: false,
  lastX: 0,
  lastY: 0,
  elementFilter: "All",
  elementQuery: "",
  selectedElement: 1,
  showElementStates: false,
  lesson: "groups"
};

const els = {
  modelList: document.getElementById("modelList"),
  categoryChips: document.getElementById("categoryChips"),
  searchInput: document.getElementById("searchInput"),
  modelName: document.getElementById("modelName"),
  modelSubtitle: document.getElementById("modelSubtitle"),
  modelUse: document.getElementById("modelUse"),
  modelParts: document.getElementById("modelParts"),
  detailTitle: document.getElementById("detailTitle"),
  detailSubtitle: document.getElementById("detailSubtitle"),
  detailList: document.getElementById("detailList"),
  knowledgeText: document.getElementById("knowledgeText"),
  knowledgeItems: document.getElementById("knowledgeItems"),
  chemistryNotes: document.getElementById("chemistryNotes"),
  quickFacts: document.getElementById("quickFacts"),
  particleTiles: document.getElementById("particleTiles"),
  compareName: document.getElementById("compareName"),
  compareFormula: document.getElementById("compareFormula"),
  compareBond: document.getElementById("compareBond"),
  autoRotateBtn: document.getElementById("autoRotateBtn"),
  bondLabelBtn: document.getElementById("bondLabelBtn"),
  showMarkersBtn: document.getElementById("showMarkersBtn"),
  elementSearch: document.getElementById("elementSearch"),
  elementFilters: document.getElementById("elementFilters"),
  elementLegend: document.getElementById("elementLegend"),
  periodicTable: document.getElementById("periodicTable"),
  selectedSymbol: document.getElementById("selectedSymbol"),
  selectedNumber: document.getElementById("selectedNumber"),
  selectedName: document.getElementById("selectedName"),
  selectedCategory: document.getElementById("selectedCategory"),
  selectedElementFacts: document.getElementById("selectedElementFacts"),
  lessonText: document.getElementById("lessonText"),
  highlightStates: document.getElementById("highlightStates"),
  resetElements: document.getElementById("resetElements")
};

function filteredMolecules() {
  return molecules.filter((molecule) => {
    const categoryMatch = state.category === "All" || molecule.category === state.category;
    const query = state.query.toLowerCase();
    const queryMatch =
      molecule.name.toLowerCase().includes(query) ||
      molecule.formula.toLowerCase().includes(query) ||
      molecule.type.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
}

function renderCategories() {
  els.categoryChips.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = category === state.category ? "active" : "";
    button.addEventListener("click", () => {
      state.category = category;
      renderAll();
    });
    els.categoryChips.append(button);
  });
}

function renderList() {
  const visible = filteredMolecules();
  els.modelList.innerHTML = "";
  visible.forEach((molecule) => {
    const realIndex = molecules.indexOf(molecule);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `model-button ${realIndex === state.selected ? "active" : ""}`;
    button.innerHTML = `
      <span class="atom-icon">${molecule.formula.replace(/[0-9]/g, "")[0]}</span>
      <span class="model-copy"><strong>${molecule.name}</strong><span>${molecule.type}</span></span>
      <span class="chevron">›</span>
    `;
    button.addEventListener("click", () => {
      state.selected = realIndex;
      state.rotationX = -0.25;
      state.rotationY = 0.55;
      state.zoom = 1.65;
      renderAll();
    });
    els.modelList.append(button);
  });
}

function renderPanels() {
  const molecule = molecules[state.selected];
  els.modelName.textContent = molecule.name;
  els.modelSubtitle.textContent = molecule.subtitle;
  els.modelUse.textContent = molecule.use;
  els.modelParts.textContent = molecule.parts;
  els.detailTitle.textContent = molecule.detailTitle;
  els.detailSubtitle.textContent = molecule.detailSubtitle;
  els.knowledgeText.textContent = molecule.knowledge;
  els.chemistryNotes.textContent = molecule.notes;
  els.compareName.textContent = molecule.name.replace(" Molecule", "");
  els.compareFormula.textContent = molecule.formula;
  els.compareBond.textContent = molecule.bond;

  els.detailList.innerHTML = "";
  [
    ["Formula", molecule.formula],
    ["Type", molecule.type],
    ["State", molecule.state],
    ["Geometry", molecule.geometry],
    ["Bonding", molecule.bond]
  ].forEach(([term, value]) => {
    const row = document.createElement("div");
    row.innerHTML = `<dt>${term}</dt><dd>${value}</dd>`;
    els.detailList.append(row);
  });

  els.knowledgeItems.innerHTML = "";
  molecule.items.forEach(([title, copy]) => {
    const item = document.createElement("div");
    item.className = "knowledge-item";
    item.innerHTML = `<strong>${title}</strong>${copy}`;
    els.knowledgeItems.append(item);
  });

  els.quickFacts.innerHTML = "";
  molecule.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    els.quickFacts.append(li);
  });

  els.particleTiles.innerHTML = "";
  molecule.formula.match(/[A-Z][a-z]?|[0-9]+/g).slice(0, 6).forEach((part) => {
    const tile = document.createElement("div");
    tile.className = "particle-tile";
    tile.textContent = part;
    els.particleTiles.append(tile);
  });
}

function categorySlug(category) {
  return category.replace(/[^a-z0-9]+/g, "-");
}

function isMetal(element) {
  return (
    element.category.includes("metal") ||
    element.category === "lanthanide" ||
    element.category === "actinide"
  ) && element.category !== "metalloid";
}

function elementMatchesFilter(element) {
  if (state.elementFilter === "All") return true;
  if (state.elementFilter === "Metals") return isMetal(element);
  if (state.elementFilter === "Nonmetals") {
    return ["reactive nonmetal", "halogen", "noble gas"].includes(element.category);
  }
  if (state.elementFilter === "Metalloids") return element.category === "metalloid";
  if (state.elementFilter === "Noble gases") return element.category === "noble gas";
  if (state.elementFilter === "Lanthanides") return element.category === "lanthanide";
  if (state.elementFilter === "Actinides") return element.category === "actinide";
  return true;
}

function elementMatchesQuery(element) {
  const query = state.elementQuery.trim().toLowerCase();
  if (!query) return true;
  return (
    element.name.toLowerCase().includes(query) ||
    element.symbol.toLowerCase().includes(query) ||
    String(element.number) === query
  );
}

function renderElementFilters() {
  els.elementFilters.innerHTML = "";
  elementFilters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = filter;
    button.className = filter === state.elementFilter ? "active" : "";
    button.addEventListener("click", () => {
      state.elementFilter = filter;
      renderPeriodicExperience();
    });
    els.elementFilters.append(button);
  });
}

function renderElementLegend() {
  els.elementLegend.innerHTML = "";
  Object.entries(elementCategoryMeta).forEach(([key, meta]) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "legend-item";
    item.innerHTML = `<span style="background:${meta.color}"></span>${meta.label}`;
    item.addEventListener("click", () => {
      state.elementFilter =
        key === "metalloid" ? "Metalloids" :
        key === "noble gas" ? "Noble gases" :
        key === "lanthanide" ? "Lanthanides" :
        key === "actinide" ? "Actinides" :
        ["reactive nonmetal", "halogen"].includes(key) ? "Nonmetals" :
        key.includes("metal") ? "Metals" :
        "All";
      renderPeriodicExperience();
    });
    els.elementLegend.append(item);
  });
}

function renderPeriodicTable() {
  els.periodicTable.innerHTML = "";
  const matchingElements = elements.filter((element) => elementMatchesFilter(element) && elementMatchesQuery(element));
  if (matchingElements.length && !matchingElements.some((element) => element.number === state.selectedElement)) {
    state.selectedElement = matchingElements[0].number;
  }

  elements.forEach((element) => {
    const category = elementCategoryMeta[element.category] || elementCategoryMeta.unknown;
    const matches = elementMatchesFilter(element) && elementMatchesQuery(element);
    const selected = element.number === state.selectedElement;
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "element-tile",
      `cat-${categorySlug(element.category)}`,
      selected ? "selected" : "",
      matches ? "" : "muted",
      state.showElementStates ? `state-${element.naturalState}` : ""
    ].filter(Boolean).join(" ");
    button.style.gridColumn = element.column;
    button.style.gridRow = element.row;
    button.style.setProperty("--element-color", category.color);
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${element.name}, atomic number ${element.number}`);
    button.innerHTML = `
      <span class="element-number">${element.number}</span>
      <strong>${element.symbol}</strong>
      <span class="element-name">${element.name}</span>
      <span class="element-state">${element.naturalState}</span>
    `;
    button.addEventListener("click", () => {
      state.selectedElement = element.number;
      renderPeriodicExperience();
    });
    els.periodicTable.append(button);
  });
}

function renderSelectedElement() {
  const element = elements.find((item) => item.number === state.selectedElement) || elements[0];
  const meta = elementCategoryMeta[element.category] || elementCategoryMeta.unknown;
  const groupText = element.row > 7 ? `${meta.label} series` : `Group ${element.column}`;
  const periodText = element.row > 7 ? (element.row === 8 ? "Period 6 inner row" : "Period 7 inner row") : `Period ${element.row}`;

  els.selectedSymbol.textContent = element.symbol;
  els.selectedSymbol.style.setProperty("--element-color", meta.color);
  els.selectedNumber.textContent = `Atomic number ${element.number}`;
  els.selectedName.textContent = element.name;
  els.selectedCategory.textContent = meta.label;
  els.selectedElementFacts.innerHTML = "";

  [
    ["Atomic mass", element.mass],
    ["Family", meta.simple],
    ["Position", `${groupText}, ${periodText}`],
    ["Room state", element.naturalState],
    ["Everyday link", element.use]
  ].forEach(([term, value]) => {
    const row = document.createElement("div");
    row.innerHTML = `<dt>${term}</dt><dd>${value}</dd>`;
    els.selectedElementFacts.append(row);
  });
}

function renderLesson() {
  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lesson === state.lesson);
  });
  els.lessonText.textContent = lessons[state.lesson];
}

function renderPeriodicExperience() {
  renderElementFilters();
  renderElementLegend();
  renderPeriodicTable();
  renderSelectedElement();
  renderLesson();
  els.highlightStates.classList.toggle("active", state.showElementStates);
}

function renderAll() {
  renderCategories();
  renderList();
  renderPanels();
  drawMolecule();
  renderPeriodicExperience();
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawMolecule();
}

function project(atom) {
  const cosY = Math.cos(state.rotationY);
  const sinY = Math.sin(state.rotationY);
  const cosX = Math.cos(state.rotationX);
  const sinX = Math.sin(state.rotationX);
  const x1 = atom.x * cosY - atom.z * sinY;
  const z1 = atom.x * sinY + atom.z * cosY;
  const y1 = atom.y * cosX - z1 * sinX;
  const z2 = atom.y * sinX + z1 * cosX;
  const rect = canvas.getBoundingClientRect();
  const perspective = 620 / (620 + z2);

  return {
    atom,
    x: rect.width / 2 + x1 * perspective * state.zoom,
    y: rect.height / 2 + y1 * perspective * state.zoom,
    z: z2,
    r: atom.r * perspective * state.zoom
  };
}

function drawBackground(width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#eaf9ef");
  gradient.addColorStop(0.45, "#eef7ff");
  gradient.addColorStop(1, "#f9f3eb");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 26; i += 1) {
    const x = (Math.sin(i * 12.13) * 0.5 + 0.5) * width;
    const y = (Math.cos(i * 9.42) * 0.5 + 0.5) * height;
    ctx.fillStyle = i % 2 ? "#8b5fe8" : "#328c68";
    ctx.beginPath();
    ctx.arc(x, y, 2 + (i % 4), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawBond(a, b, label) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  if (!length) return;

  const ux = dx / length;
  const uy = dy / length;
  const offset = state.bondLabels ? 4 : 0;
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(8, 12 * state.zoom);
  ctx.strokeStyle = "#cad4d2";
  ctx.beginPath();
  ctx.moveTo(a.x + ux * a.r + -uy * offset, a.y + uy * a.r + ux * offset);
  ctx.lineTo(b.x - ux * b.r + -uy * offset, b.y - uy * b.r + ux * offset);
  ctx.stroke();

  ctx.lineWidth = Math.max(3, 5 * state.zoom);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.68)";
  ctx.stroke();

  if (state.bondLabels) {
    ctx.save();
    ctx.fillStyle = "rgba(35, 43, 41, 0.82)";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, (a.x + b.x) / 2, (a.y + b.y) / 2 - 12);
    ctx.restore();
  }
}

function drawAtom(point) {
  const { atom } = point;
  const radial = ctx.createRadialGradient(
    point.x - point.r * 0.35,
    point.y - point.r * 0.42,
    point.r * 0.08,
    point.x,
    point.y,
    point.r
  );
  radial.addColorStop(0, "#ffffff");
  radial.addColorStop(0.22, atom.color);
  radial.addColorStop(1, shade(atom.color, -34));

  ctx.save();
  ctx.shadowColor = "rgba(28, 36, 34, 0.28)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = radial;
  ctx.beginPath();
  ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = atom.id === "C" ? "#f9fbfc" : "#20211f";
  ctx.font = `${Math.max(11, point.r * 0.45)}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(atom.label, point.x, point.y);
}

function drawMarkers(points) {
  if (!state.markers) return;
  ctx.save();
  ctx.font = "12px Inter, sans-serif";
  ctx.textBaseline = "middle";
  points.slice(0, 4).forEach((point, index) => {
    const x = point.x + point.r + 14;
    const y = point.y - point.r - 10;
    ctx.strokeStyle = "rgba(66, 92, 80, 0.42)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(point.x + point.r * 0.6, point.y - point.r * 0.6);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
    roundRect(ctx, x, y - 14, 74, 28, 14);
    ctx.fill();
    ctx.fillStyle = index % 2 ? "#6b43b8" : "#2d7a5a";
    ctx.fillText(point.atom.label, x + 37, y);
  });
  ctx.restore();
}

function drawMolecule() {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  drawBackground(width, height);

  const molecule = molecules[state.selected];
  const points = molecule.atoms.map(project);
  molecule.bonds
    .map(([from, to]) => [points[from], points[to]])
    .sort((a, b) => (a[0].z + a[1].z) - (b[0].z + b[1].z))
    .forEach(([a, b]) => drawBond(a, b, molecule.bond));

  points
    .slice()
    .sort((a, b) => a.z - b.z)
    .forEach(drawAtom);

  drawMarkers(points.sort((a, b) => b.r - a.r));
}

function shade(hex, percent) {
  const value = parseInt(hex.slice(1), 16);
  const amount = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, (value >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((value >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (value & 0xff) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function animate() {
  if (state.autoRotate && !state.dragging) {
    state.rotationY += 0.007;
    drawMolecule();
  }
  requestAnimationFrame(animate);
}

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderList();
});

els.autoRotateBtn.addEventListener("click", () => {
  state.autoRotate = !state.autoRotate;
  els.autoRotateBtn.classList.toggle("active", state.autoRotate);
});

els.bondLabelBtn.addEventListener("click", () => {
  state.bondLabels = !state.bondLabels;
  els.bondLabelBtn.classList.toggle("active", state.bondLabels);
  drawMolecule();
});

document.getElementById("toggleMarkers").addEventListener("click", () => {
  state.markers = !state.markers;
  drawMolecule();
});

els.showMarkersBtn.addEventListener("click", () => {
  state.markers = true;
  drawMolecule();
});

document.getElementById("resetView").addEventListener("click", () => {
  state.rotationX = -0.25;
  state.rotationY = 0.55;
  state.zoom = 1.65;
  drawMolecule();
});

document.getElementById("zoomIn").addEventListener("click", () => {
  state.zoom = Math.min(2.2, state.zoom + 0.12);
  drawMolecule();
});

document.getElementById("zoomOut").addEventListener("click", () => {
  state.zoom = Math.max(0.55, state.zoom - 0.12);
  drawMolecule();
});

document.getElementById("downloadView").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "chemistry-structure-view.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

canvas.addEventListener("pointerdown", (event) => {
  state.dragging = true;
  state.lastX = event.clientX;
  state.lastY = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  if (!state.dragging) return;
  const dx = event.clientX - state.lastX;
  const dy = event.clientY - state.lastY;
  state.rotationY += dx * 0.01;
  state.rotationX += dy * 0.01;
  state.rotationX = Math.max(-1.25, Math.min(1.25, state.rotationX));
  state.lastX = event.clientX;
  state.lastY = event.clientY;
  drawMolecule();
});

canvas.addEventListener("pointerup", () => {
  state.dragging = false;
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  state.zoom = Math.max(0.55, Math.min(2.2, state.zoom + (event.deltaY > 0 ? -0.08 : 0.08)));
  drawMolecule();
}, { passive: false });

els.elementSearch.addEventListener("input", (event) => {
  state.elementQuery = event.target.value;
  renderPeriodicExperience();
});

els.highlightStates.addEventListener("click", () => {
  state.showElementStates = !state.showElementStates;
  renderPeriodicExperience();
});

els.resetElements.addEventListener("click", () => {
  state.elementFilter = "All";
  state.elementQuery = "";
  state.selectedElement = 1;
  state.showElementStates = false;
  els.elementSearch.value = "";
  renderPeriodicExperience();
});

document.querySelectorAll("[data-lesson]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lesson = button.dataset.lesson;
    renderLesson();
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("resize", resizeCanvas);

renderAll();
resizeCanvas();
animate();
