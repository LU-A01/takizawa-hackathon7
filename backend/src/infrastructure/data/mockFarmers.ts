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
    products: ["にんじん", "じゃがいも", "トマト"]
  },
  {
    id: 2,
    name: "山田ファーム",
    icon: "/images/farmer2.jpg",
    description: "代々続く農家の伝統を守りながらも、新しい技術を取り入れた農業を実践しています。",
    products: ["りんご", "ぶどう", "もも"]
  },
  {
    id: 3,
    name: "緑の谷農場",
    icon: "/images/farmer3.jpg",
    description: "自然豊かな山間部で育てる作物は、味と栄養にこだわっています。四季折々の野菜と果物を提供します。",
    products: ["レタス", "ほうれん草", "かぼちゃ"]
  },
  {
    id: 4,
    name: "青空農園",
    icon: "/images/farmer4.jpg",
    description: "広大な畑で太陽の光をたっぷり浴びた作物を栽培しています。化学肥料を使わず、自然の力を最大限に活かした農法です。",
    products: ["なす", "きゅうり", "ピーマン"]
  },
  {
    id: 5,
    name: "田中果樹園",
    icon: "/images/farmer5.jpg",
    description: "50年以上の歴史を持つ果樹園です。一つ一つの果物に愛情を込めて丁寧に育てています。",
    products: ["梨", "柿", "みかん"]
  }
]; 