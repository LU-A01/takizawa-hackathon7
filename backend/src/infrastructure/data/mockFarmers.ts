import type { Farmer } from '../../domain/models/Farmer';

/**
 * モックの農家データ
 */
export const mockFarmers: Farmer[] = [
  {
    id: 1,
    name: "鈴木農園",
    icon: "/images/farmer1.jpg",
    description: "自然と共に生きる農業を目指しています。無農薬・有機栽培にこだわり、安全でおいしい野菜を育てています。",
    location: "岩手県盛岡市",
    latitude: 39.7036,
    longitude: 141.1527,
    establishedYear: 1985,
    farmSize: "5ヘクタール",
    certifications: ["有機JAS認証", "GLOBALG.A.P."]
  },
  {
    id: 2,
    name: "山田ファーム",
    icon: "/images/farmer2.jpg",
    description: "代々続く農家の伝統を守りながらも、新しい技術を取り入れた農業を実践しています。",
    location: "岩手県花巻市",
    latitude: 39.3863,
    longitude: 141.1146,
    establishedYear: 1962,
    farmSize: "8ヘクタール",
    certifications: ["エコファーマー"]
  },
  {
    id: 3,
    name: "緑の谷農場",
    icon: "/images/farmer3.jpg",
    description: "自然豊かな山間部で育てる作物は、味と栄養にこだわっています。四季折々の野菜と果物を提供します。",
    location: "岩手県一関市",
    latitude: 38.9355,
    longitude: 141.1263,
    establishedYear: 2005,
    farmSize: "3ヘクタール",
    certifications: ["特別栽培農産物", "岩手県安全・安心農産物認証"]
  },
  {
    id: 4,
    name: "佐藤果樹園",
    icon: "/images/farmer4.jpg",
    description: "広大な畑で太陽の光をたっぷり浴びた作物を栽培しています。化学肥料を使わず、自然の力を最大限に活かした農法です。",
    location: "岩手県奥州市",
    latitude: 39.1196,
    longitude: 141.1395,
    establishedYear: 1970,
    farmSize: "6ヘクタール",
    certifications: ["エコファーマー", "農場HACCP"]
  },
  {
    id: 5,
    name: "高橋りんご園",
    icon: "/images/farmer5.jpg",
    description: "50年以上の歴史を持つ果樹園です。一つ一つの果物に愛情を込めて丁寧に育てています。",
    location: "岩手県北上市",
    latitude: 39.2859,
    longitude: 141.1134,
    establishedYear: 1968,
    farmSize: "4ヘクタール",
    certifications: ["特別栽培農産物"]
  }
]; 