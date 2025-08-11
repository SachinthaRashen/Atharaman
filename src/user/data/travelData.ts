export interface Location {
  id: number;
  name: string;
  location: string;
  image: string;
}

export interface Guide {
  id: number;
  name: string;
  location: string;
  photo: string;
}

export interface Shop {
  id: number;
  shopName: string;
  location: string;
  logo: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
}

export interface Vehicle {
  id: number;
  vehicleName: string;
  ownerName: string;
  pricePerDay: number;
  photo: string;
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Mount Everest Base Camp",
    location: "Nepal",
    image: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Sahara Desert",
    location: "Morocco",
    image: "https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Amazon Rainforest",
    location: "Brazil",
    image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Swiss Alps",
    location: "Switzerland",
    image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Grand Canyon",
    location: "USA",
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Bali Rice Terraces",
    location: "Indonesia",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const guides: Guide[] = [
  {
    id: 1,
    name: "Alex Mountain",
    location: "Nepal",
    photo: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Sarah Explorer",
    location: "Morocco",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Carlos Adventure",
    location: "Brazil",
    photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Emma Alpine",
    location: "Switzerland",
    photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Mike Canyon",
    location: "USA",
    photo: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Lisa Tropical",
    location: "Indonesia",
    photo: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const shops: Shop[] = [
  {
    id: 1,
    shopName: "Adventure Gear Co.",
    location: "Nepal",
    logo: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    shopName: "Desert Supplies",
    location: "Morocco",
    logo: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    shopName: "Jungle Equipment",
    location: "Brazil",
    logo: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    shopName: "Alpine Outfitters",
    location: "Switzerland",
    logo: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    shopName: "Canyon Gear",
    location: "USA",
    logo: "https://images.pexels.com/photos/1496372/pexels-photo-1496372.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    shopName: "Island Adventure",
    location: "Indonesia",
    logo: "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Everest Lodge",
    location: "Nepal",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Desert Oasis Resort",
    location: "Morocco",
    image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Rainforest Retreat",
    location: "Brazil",
    image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Alpine Chalet",
    location: "Switzerland",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Grand View Hotel",
    location: "USA",
    image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Tropical Paradise Inn",
    location: "Indonesia",
    image: "https://images.pexels.com/photos/1483894/pexels-photo-1483894.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 1,
    vehicleName: "4WD Mountain Jeep",
    ownerName: "Raj Sherpa",
    pricePerDay: 120,
    photo: "https://images.pexels.com/photos/1129019/pexels-photo-1129019.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    vehicleName: "Desert Safari Truck",
    ownerName: "Ahmed Hassan",
    pricePerDay: 95,
    photo: "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    vehicleName: "Jungle Explorer Van",
    ownerName: "Carlos Silva",
    pricePerDay: 85,
    photo: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    vehicleName: "Alpine Adventure Car",
    ownerName: "Hans Mueller",
    pricePerDay: 110,
    photo: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    vehicleName: "Canyon Cruiser",
    ownerName: "Jake Wilson",
    pricePerDay: 100,
    photo: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    vehicleName: "Island Hopper Bike",
    ownerName: "Made Sari",
    pricePerDay: 45,
    photo: "https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];