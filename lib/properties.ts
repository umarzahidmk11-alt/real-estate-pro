export type Property = {
  id: number;
  title: string;
  purpose: string;
  type: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image?: string;
};

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    purpose: "Buy",
    type: "Villa",
    location: "DHA Phase 6, Lahore",
    price: "PKR 8.5 Crore",
    area: "1 Kanal",
    bedrooms: 5,
    bathrooms: 6,
    description:
      "A beautiful modern luxury villa with spacious rooms and premium finishes.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  },
];