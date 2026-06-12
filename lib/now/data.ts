// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckItem = {
  name: string;
  checks: [boolean, boolean, boolean, boolean];
};

// Helpers
const f = (name: string): CheckItem => ({ name, checks: [false, false, false, false] });
const d = (name: string): CheckItem => ({ name, checks: [true, true, true, true] });
const p = (name: string, a: boolean, b: boolean, c: boolean, e: boolean): CheckItem => ({
  name,
  checks: [a, b, c, e],
});

// ─── Profile ──────────────────────────────────────────────────────────────────

export const nowProfile = {
  name: "Ansh",
  handle: "h4x-ansh",
  birthDate: "2007-10-22",
  codingStartDate: "2022-08-01",
  dashboardUpdatedAt: "2026-06-12T00:00:00Z",
};

// ─── JEE Chapters ─────────────────────────────────────────────────────────────

// Labels: Theory | NCERT | Mains PYQs | Adv PYQs

export const jeeChapters = {
  physics: [
    d("Units, Dimensions & Measurements"),
    p("Kinematics (1D & 2D Motion)", true, true, true, false),
    p("Laws of Motion & Friction", true, true, true, false),
    p("Work, Energy & Power", true, true, false, false),
    p("Circular Motion & Rotational Dynamics", true, true, false, false),
    p("Gravitation", true, false, false, false),
    p("Properties of Matter (Solids & Fluids)", true, false, false, false),
    p("Thermal Properties & Calorimetry", true, true, false, false),
    p("Kinetic Theory of Gases", true, true, false, false),
    p("Thermodynamics", true, false, false, false),
    p("Oscillations (SHM)", true, true, true, false),
    p("Waves & Sound", true, true, false, false),
    p("Electrostatics", true, false, false, false),
    p("Electric Potential & Capacitance", true, true, false, false),
    p("Current Electricity", true, false, false, false),
    f("Thermal Effects of Current"),
    f("Moving Charges & Magnetic Field"),
    f("Magnetism & Matter"),
    f("Electromagnetic Induction"),
    f("Alternating Current"),
    f("Electromagnetic Waves"),
    f("Ray Optics & Optical Instruments"),
    f("Wave Optics"),
    f("Dual Nature of Matter & Radiation"),
    f("Atoms & Nuclei (Bohr, Radioactivity)"),
    f("Semiconductors & Electronic Devices"),
    f("Communication Systems"),
    f("Experimental Skills"),
  ] as CheckItem[],

  chemistry: [
    d("Some Basic Concepts of Chemistry"),
    d("Structure of Atom"),
    p("Classification of Elements & Periodicity", true, true, true, false),
    p("Chemical Bonding & Molecular Structure", true, true, false, false),
    p("States of Matter: Gases & Liquids", true, true, false, false),
    p("Chemical Thermodynamics", true, false, false, false),
    p("Equilibrium", true, false, false, false),
    p("Redox Reactions", true, true, false, false),
    p("Hydrogen", true, true, true, false),
    p("s-Block Elements", true, true, false, false),
    p("p-Block Elements (Group 13 & 14)", true, false, false, false),
    p("Organic Chemistry: Basic Principles", true, true, false, false),
    p("Hydrocarbons", true, true, false, false),
    f("Environmental Chemistry"),
    f("Solid State"),
    f("Solutions"),
    f("Electrochemistry"),
    f("Chemical Kinetics"),
    f("Surface Chemistry"),
    f("General Principles of Metallurgy"),
    f("p-Block Elements (Group 15–18)"),
    f("d & f Block Elements"),
    f("Coordination Compounds"),
    f("Haloalkanes & Haloarenes"),
    f("Alcohols, Phenols & Ethers"),
    f("Aldehydes, Ketones & Carboxylic Acids"),
    f("Organic Compounds with Nitrogen"),
    f("Biomolecules"),
    f("Polymers"),
    f("Chemistry in Everyday Life"),
  ] as CheckItem[],

  maths: [
    d("Sets, Relations & Functions"),
    p("Complex Numbers & Quadratic Equations", true, true, true, false),
    p("Matrices & Determinants", true, true, false, false),
    p("Permutations & Combinations", true, true, false, false),
    p("Mathematical Induction", true, false, false, false),
    p("Binomial Theorem", true, true, false, false),
    p("Sequences & Series", true, true, false, false),
    p("Limits, Continuity & Differentiability", true, false, false, false),
    p("Integral Calculus", true, false, false, false),
    f("Differential Equations"),
    f("Coordinate Geometry (Straight Lines)"),
    f("Coordinate Geometry (Circles)"),
    f("Coordinate Geometry (Conic Sections)"),
    f("Three Dimensional Geometry"),
    f("Vector Algebra"),
    f("Statistics & Probability"),
    f("Trigonometric Functions"),
    f("Inverse Trigonometric Functions"),
    f("Application of Derivatives"),
    f("Application of Integrals"),
    f("Mathematical Reasoning"),
    f("Linear Programming"),
    f("Probability (Advanced)"),
    f("Definite Integration (Advanced)"),
    f("Area Under Curves"),
    f("Differential Equations (Advanced)"),
    f("Coordinate Geometry (Parabola)"),
    f("Coordinate Geometry (Ellipse & Hyperbola)"),
    f("3D Geometry (Advanced)"),
    f("Vectors (Advanced)"),
  ] as CheckItem[],
};

// ─── JEE Analytics ────────────────────────────────────────────────────────────

export const jeeAnalytics = {
  totalHours: 509,
  streak: 24,
  todayHours: 2.4,
  sevenDayAvg: 3.07,
  weeklyData: [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 3.25 },
    { day: "Wed", hours: 5.0 },
    { day: "Thu", hours: 2.75 },
    { day: "Fri", hours: 4.0 },
    { day: "Sat", hours: 6.5 },
    { day: "Sun", hours: 3.5 },
  ],
  mockTests: [
    { date: "2026-05-10", name: "Full Mock #1", physics: 62, chemistry: 58, maths: 48 },
    { date: "2026-05-24", name: "Full Mock #2", physics: 67, chemistry: 61, maths: 54 },
    { date: "2026-06-07", name: "Full Mock #3", physics: 71, chemistry: 65, maths: 58 },
  ],
  examDate: "2027-04-01",
  weakChapter: "Thermodynamics",
  weakChapterSubject: "Physics",
  weakChapterScore: "2/4",
};

// ─── Health / Gym ─────────────────────────────────────────────────────────────

// Labels: Warm-up | Sets Done | Cool-down | Logged

export const healthExercises = {
  push: [
    p("Bench Press (Flat)", true, true, true, true),
    p("Incline Dumbbell Press", true, true, false, false),
    p("Cable Flyes", true, true, false, false),
    p("Overhead Press (OHP)", true, true, true, false),
    p("Lateral Raises", true, false, false, false),
    f("Front Raises"),
    f("Tricep Pushdowns"),
    f("Skull Crushers"),
    f("Dips"),
  ] as CheckItem[],
  pull: [
    p("Pull-ups", true, true, true, true),
    p("Barbell Rows", true, true, false, false),
    p("Lat Pulldown", true, true, false, false),
    p("Seated Cable Rows", true, false, false, false),
    f("Face Pulls"),
    f("Bicep Curls (Barbell)"),
    f("Hammer Curls"),
    f("Incline Curls"),
  ] as CheckItem[],
  legs: [
    p("Squats", true, false, false, false),
    f("Romanian Deadlift"),
    f("Leg Press"),
    f("Leg Extension"),
    f("Leg Curl"),
    f("Calf Raises"),
    f("Bulgarian Split Squats"),
    f("Hip Thrusts"),
  ] as CheckItem[],
  core: [
    p("Plank Holds", true, true, true, true),
    p("Ab Wheel Rollout", true, false, false, false),
    f("Hanging Leg Raises"),
    f("Cable Crunches"),
    f("Russian Twists"),
  ] as CheckItem[],
};

export const healthAnalytics = {
  totalHours: 187,
  streak: 18,
  todayHours: 1.5,
  sevenDayAvg: 1.07,
  weeklyData: [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 1.25 },
    { day: "Wed", hours: 0 },
    { day: "Thu", hours: 1.5 },
    { day: "Fri", hours: 1.25 },
    { day: "Sat", hours: 2.0 },
    { day: "Sun", hours: 0 },
  ],
  prs: [
    { date: "2026-06-01", exercise: "Bench Press", value: "60 kg" },
    { date: "2026-06-05", exercise: "Deadlift", value: "90 kg" },
    { date: "2026-05-28", exercise: "Squat", value: "80 kg" },
    { date: "2026-06-10", exercise: "Pull-ups", value: "BW + 10 kg" },
    { date: "2026-05-20", exercise: "OHP", value: "40 kg" },
  ],
  weakExercise: "Romanian Deadlift",
  weakGroup: "Legs",
  weakScore: "0/4",
};

// ─── Art ──────────────────────────────────────────────────────────────────────

// Labels: Theory | Practice | Reference | Complete

export const artSkills = {
  fundamentals: [
    d("Basic Shapes & Forms"),
    d("Line Confidence & Weight"),
    d("Value Rendering (Light/Shadow)"),
    p("Perspective (1-Point)", true, true, true, false),
    p("Perspective (2-Point)", true, true, false, false),
    p("Composition Rules", true, false, false, false),
    f("Color Theory"),
    f("Perspective (3-Point)"),
    f("Atmospheric Perspective"),
  ] as CheckItem[],
  figure: [
    p("Gesture Drawing (10 min)", true, true, true, false),
    p("Anatomy Basics", true, false, false, false),
    p("Portrait Proportions", true, true, false, false),
    f("Hands & Feet"),
    f("Full Figure Construction"),
    f("Clothing Folds"),
    f("Facial Expressions"),
  ] as CheckItem[],
  digital: [
    p("Digital Tool Setup", true, true, true, true),
    p("Layer Management", true, true, false, false),
    f("Digital Inking"),
    f("Cel Shading"),
    f("Soft Rendering"),
    f("Texture Brushes"),
    f("Background Painting"),
  ] as CheckItem[],
};

export const artAnalytics = {
  totalHours: 142,
  streak: 12,
  todayHours: 1.0,
  sevenDayAvg: 1.14,
  weeklyData: [
    { day: "Mon", hours: 1.0 },
    { day: "Tue", hours: 0.5 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 0 },
    { day: "Fri", hours: 1.0 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 1.5 },
  ],
  recentPieces: [
    { date: "2026-06-01", name: "Figure sketch", medium: "Digital" },
    { date: "2026-05-15", name: "Architecture study", medium: "Pencil" },
    { date: "2026-05-02", name: "Portrait attempt", medium: "Digital" },
    { date: "2026-04-18", name: "Landscape sketch", medium: "Pencil" },
    { date: "2026-04-10", name: "Still life study #1", medium: "Pencil" },
  ],
  completedPieces: 14,
  currentPiece: "Digital portrait study — value focus",
  weakSkill: "Perspective (3-Point)",
  weakArea: "Digital",
  weakScore: "0/4",
};

// ─── Projects ─────────────────────────────────────────────────────────────────

// Labels: Design | Dev | Test | Shipped

export const projectFeatures = {
  hisarchives: [
    d("Routing & scaffold"),
    d("Archive backend"),
    d("Journal system"),
    d("Identity page"),
    d("Timeline page"),
    d("Gallery page"),
    d("NextAuth integration"),
    d("Supabase setup"),
    p("CMS rollout", true, true, false, false),
    f("Now redesign"),
    f("Admin dashboard"),
    f("Search"),
    f("Tags & filtering"),
  ] as CheckItem[],
  discordbot: [
    d("Command framework"),
    d("Auto-moderation"),
    d("Role assignment"),
    d("Logging & audit"),
    d("Welcome flow"),
    d("Reaction roles"),
    d("Slash command migration"),
    d("Error handling v2"),
    p("Mod flow stability", true, true, false, false),
    f("Cleanup pass"),
    f("Dashboard"),
  ] as CheckItem[],
  future: [
    p("Ideation notes", true, false, false, false),
    f("Pick a lane"),
    f("Prototype"),
    f("MVP build"),
  ] as CheckItem[],
};

export const projectsAnalytics = {
  totalHours: 312,
  streak: 19,
  todayHours: 3.5,
  sevenDayAvg: 4.46,
  weeklyData: [
    { day: "Mon", hours: 2.0 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3.0 },
    { day: "Thu", hours: 2.5 },
    { day: "Fri", hours: 1.0 },
    { day: "Sat", hours: 3.5 },
    { day: "Sun", hours: 1.5 },
  ],
  weakFeature: "Search",
  weakProject: "HisArchives",
  weakScore: "0/4",
};
