export const SITE = {
  name: "e-life Embryo",
  parent: "e-life Society",
  tagline: "Student Skill & Entrepreneurship Program",
  phone: "+91 98470 00000",
  email: "embryo@elifesociety.org",
  website: "www.elifesociety.org",
  location: "e-life Society, Kerala, India",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/junior", label: "Junior Embryo" },
  { to: "/young", label: "Young Embryo" },
  { to: "/entrepreneurs", label: "Entrepreneurs" },
  { to: "/classes", label: "Classes" },
  { to: "/contact", label: "Contact" },
] as const;

export const JOURNEY = [
  { step: "Discover", detail: "Find the skill that fits the student." },
  { step: "Learn", detail: "Guided training from real practitioners." },
  { step: "Practice", detail: "Weekly projects and challenges." },
  { step: "Create", detail: "Build a real product or service." },
  { step: "Sell", detail: "Expos, fairs and online selling." },
  { step: "Earn", detail: "First income and a habit of earning." },
];

export const PANCHAYAT_PLACEHOLDER = "e.g. Chelakkara, Tirurangadi, Kottayam";

export const SKILL_OPTIONS = [
  "Crochet",
  "Doll Making",
  "Hamper Making",
  "Hair Accessories",
  "Flower Making",
  "Abacus",
  "Public Speaking",
  "Entrepreneurship",
  "Digital Skills",
];

export function formatClassDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export function formatClassTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

export function ageGroupLabel(group: string) {
  return group === "young" ? "Young Embryo · 16–22" : "Junior Embryo · 5–15";
}
