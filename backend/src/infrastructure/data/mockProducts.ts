import type { Product } from '../../domain/models/Product';

/**
 * モックの商品データ
 */
export const mockProducts: Product[] = [
  // 鈴木農園（ID: 1）の商品
  {
    id: 1,
    name: "有機にんじん",
    image: "/images/carrot.jpg",
    description: "甘みが強く、生でも美味しく食べられる有機栽培のにんじんです。栄養価が高く、ビタミンAやカロテンを豊富に含んでいます。",
    harvestSeason: "春・秋",
    price: 300,
    videoUrl: "/videos/carrot-growth.mp4",
    farmerId: 1,
    salesLocation: "盛岡市産直マルシェ、滝沢市あぐり市場",
    processVideos: [
      {
        id: 1,
        title: "種まきから収穫まで",
        videoUrl: "/videos/carrot-process1.mp4",
        description: "有機にんじんの種まきから収穫までの過程を紹介します。",
        likes: 24,
      },
      {
        id: 2,
        title: "土づくりのこだわり",
        videoUrl: "/videos/carrot-process2.mp4",
        description: "美味しいにんじんを育てるための土づくりについて解説します。",
        likes: 18,
      },
    ]
  },
  {
    id: 2,
    name: "じゃがいも（キタアカリ）",
    image: "/images/potato.jpg",
    description: "ホクホクとした食感と甘みが特徴の人気品種です。煮崩れしにくく、様々な料理に使えます。",
    harvestSeason: "夏",
    price: 400,
    videoUrl: "/videos/potato-growth.mp4",
    farmerId: 1,
    salesLocation: "盛岡市中央卸売市場、矢巾町産直プラザ",
    processVideos: [
      {
        id: 3,
        title: "じゃがいもの植え付け",
        videoUrl: "/videos/potato-process1.mp4",
        description: "春のじゃがいも植え付けの様子です。",
        likes: 15,
      }
    ]
  },
  {
    id: 3,
    name: "フルーツトマト",
    image: "/images/tomato.jpg",
    description: "糖度8度以上の甘いトマト。朝採りのフレッシュな味わいをお届けします。",
    harvestSeason: "夏",
    price: 600,
    videoUrl: "/videos/tomato-growth.mp4",
    farmerId: 1,
    salesLocation: "盛岡市フェザン、雫石町産直館",
    processVideos: [
      {
        id: 4,
        title: "トマトの栽培環境",
        videoUrl: "/videos/tomato-process1.mp4",
        description: "甘いトマトを育てるための環境づくりについて紹介します。",
        likes: 32,
      }
    ]
  },

  // 山田ファーム（ID: 2）の商品
  {
    id: 4,
    name: "サンふじりんご",
    image: "/images/apple.jpg",
    description: "蜜がたっぷり入った甘いりんご。みずみずしい食感と芳醇な香りが特徴です。",
    harvestSeason: "秋",
    price: 500,
    videoUrl: "/videos/apple-growth.mp4",
    farmerId: 2,
    salesLocation: "花巻市マルカン百貨店、道の駅石鳥谷"
  },
  {
    id: 5,
    name: "シャインマスカット",
    image: "/images/grape.jpg",
    description: "皮ごと食べられる、甘くて香りの良いぶどうです。一粒一粒が大きく、ジューシーな味わい。",
    harvestSeason: "夏",
    price: 2500,
    videoUrl: "/videos/grape-growth.mp4",
    farmerId: 2,
    salesLocation: "花巻農産物直売所「母ちゃんハウス」、道の駅とうわ"
  },
  {
    id: 6,
    name: "白桃",
    image: "/images/peach.jpg",
    description: "とろけるような食感と甘い香りが楽しめる、岩手県自慢の白桃です。",
    harvestSeason: "夏",
    price: 800,
    videoUrl: "/videos/peach-growth.mp4",
    farmerId: 2,
    salesLocation: "花巻市JA直売所、北上市展勝地レストハウス"
  },

  // その他の農家の商品
  {
    id: 7,
    name: "サラダレタス",
    image: "/images/lettuce.jpg",
    description: "シャキシャキとした食感と瑞々しさが特徴の、低農薬栽培のレタスです。",
    harvestSeason: "春・秋",
    price: 200,
    videoUrl: "/videos/lettuce-growth.mp4",
    farmerId: 3,
    salesLocation: "一関市地域交流センター、道の駅平泉"
  },
  {
    id: 8,
    name: "ほうれん草",
    image: "/images/spinach.jpg",
    description: "栄養価が高く、鮮度抜群のほうれん草。アクが少なく、生でもサラダとして楽しめます。",
    harvestSeason: "冬・春",
    price: 250,
    videoUrl: "/videos/spinach-growth.mp4",
    farmerId: 3,
    salesLocation: "一関市産直センター、奥州市江刺ふるさと市場"
  },
  {
    id: 9,
    name: "栗かぼちゃ",
    image: "/images/pumpkin.jpg",
    description: "甘みが強く、ホクホクとした食感の栗かぼちゃ。煮物や天ぷらなど、様々な料理に使えます。",
    harvestSeason: "秋",
    price: 600,
    videoUrl: "/videos/pumpkin-growth.mp4",
    farmerId: 3,
    salesLocation: "一関せんまや街かど交流館、道の駅厳美渓"
  }
]; 