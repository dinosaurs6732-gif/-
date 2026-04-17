/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ExternalLink, 
  Globe, 
  ArrowUpRight,
  Filter,
  Grid,
  List as ListIcon
} from 'lucide-react';

interface Studio {
  name: string;
  location: string;
  category: string[];
  url: string;
  description: string;
}

const STUDIOS: Studio[] = [
  {
    name: "Pentagram",
    location: "London / New York / Austin / Berlin",
    category: ["综合设计", "品牌设计", "标志设计"],
    url: "https://www.pentagram.com",
    description: "全球最大的独立设计咨询公司，由多位合伙人共同拥有和管理。"
  },
  {
    name: "Sagmeister & Walsh",
    location: "New York",
    category: ["品牌设计", "艺术指导"],
    url: "https://sagmeisterwalsh.com",
    description: "由 Stefan Sagmeister 和 Jessica Walsh 创立的顶尖创意工作室。"
  },
  {
    name: "Collins",
    location: "New York / San Francisco",
    category: ["品牌设计", "策略设计"],
    url: "https://www.wearecollins.com",
    description: "专注于品牌转型和体验设计的策略与设计公司。"
  },
  {
    name: "Design Army",
    location: "Washington, D.C.",
    category: ["品牌设计", "艺术指导", "包装设计"],
    url: "https://designarmy.com",
    description: "以视觉冲击力强、充满活力的设计风格著称。"
  },
  {
    name: "Mousegraphics",
    location: "Athens",
    category: ["包装设计", "品牌设计"],
    url: "https://www.mousegraphics.eu",
    description: "屡获殊荣的包装设计工作室，以简约和创意著称。"
  },
  {
    name: "Backbone Branding",
    location: "Yerevan",
    category: ["包装设计", "品牌设计"],
    url: "https://backbonebranding.com",
    description: "专注于品牌故事和独特包装解决方案的创意机构。"
  },
  {
    name: "Chermayeff & Geismar & Haviv",
    location: "New York",
    category: ["标志设计", "品牌设计"],
    url: "https://www.cghnyc.com",
    description: "标志性品牌形象设计的先驱，曾为众多全球知名品牌设计标志。"
  },
  {
    name: "Moving Brands",
    location: "London / San Francisco / New York / Zurich",
    category: ["交互设计", "品牌设计"],
    url: "https://www.movingbrands.com",
    description: "专注于数字时代品牌体验的全球性设计公司。"
  },
  {
    name: "Fantasy",
    location: "New York / San Francisco",
    category: ["交互设计", "产品设计"],
    url: "https://fantasy.co",
    description: "全球领先的人机交互和数字产品设计工作室。"
  },
  {
    name: "Huge",
    location: "Global",
    category: ["交互设计", "品牌设计", "策略设计"],
    url: "https://www.hugeinc.com",
    description: "将设计、技术和策略相结合的全球性数字代理商。"
  },
  {
    name: "MetaDesign",
    location: "Global",
    category: ["品牌设计", "标志设计"],
    url: "https://metadesign.com",
    description: "德国顶尖的品牌设计公司，专注于品牌系统和视觉识别。"
  },
  {
    name: "Wolff Olins",
    location: "London / New York / San Francisco",
    category: ["品牌设计", "策略设计"],
    url: "https://www.wolffolins.com",
    description: "以大胆、颠覆性的品牌策略和设计闻名于世。"
  },
  {
    name: "Bond",
    location: "Helsinki / London / Dubai / Tallinn",
    category: ["品牌设计", "包装设计", "交互设计"],
    url: "https://www.bond-agency.com",
    description: "北欧顶尖的多领域设计工作室，风格简约现代。"
  },
  {
    name: "Snask",
    location: "Stockholm",
    category: ["品牌设计", "艺术指导", "综合设计"],
    url: "https://snask.com",
    description: "以幽默、大胆和色彩丰富的视觉风格著称的创意工作室。"
  },
  {
    name: "A Black Cover Design",
    location: "Beijing / Los Angeles",
    category: ["品牌设计", "综合设计"],
    url: "https://ablackcover.com",
    description: "由广煜和 NOD 创立，以极简主义和实验性视觉语言著称。"
  },
  {
    name: "PATON Design",
    location: "Hangzhou",
    category: ["品牌设计", "标志设计", "综合设计"],
    url: "https://www.hzvis.com",
    description: "致力于品牌形象、文化推广和视觉研究的顶尖设计机构。"
  },
  {
    name: "United Design Lab",
    location: "Beijing / London",
    category: ["品牌设计", "综合设计"],
    url: "https://u-d-l.com",
    description: "跨学科的设计工作室，致力于品牌识别、视觉传达和空间体验。"
  },
  {
    name: "Nofans Design",
    location: "Hangzhou",
    category: ["品牌设计", "标志设计"],
    url: "https://nofans.com.cn",
    description: "专注于品牌视觉沟通，以其独特的视觉美学和策略思考服务于多元客户。"
  },
  {
    name: "297 Design",
    location: "Beijing",
    category: ["综合设计", "品牌设计"],
    url: "http://www.297design.com/?mode=color",
    description: "专注于视觉传达与品牌建构，以独特的色彩运用和实验性设计见长。"
  },
  {
    name: "7654321 Design",
    location: "Beijing",
    category: ["品牌设计", "标志设计"],
    url: "https://7654321.design",
    description: "北京领先的设计驱动型工作室，致力于品牌身份与视觉系统的深度开发。"
  },
  {
    name: "Stockholm Design Lab",
    location: "Stockholm",
    category: ["品牌设计", "综合设计"],
    url: "https://www.stockholmdesignlab.se",
    description: "来自瑞典的顶尖设计机构，以极致的简约与理性的商业设计闻名。"
  },
  {
    name: "1983 Asia",
    location: "Macau / Shenzhen",
    category: ["品牌设计", "综合设计"],
    url: "http://www.1983asia.com/",
    description: "专注于亚洲文化设计的跨国工作室，作品充满跨文化的视野与艺术深度。"
  },
  {
    name: "L3 Branding",
    location: "Beijing",
    category: ["品牌设计", "标志设计"],
    url: "https://www.l3branding.com/works/",
    description: "国内顶尖的品牌设计公司，擅长大型品牌战略与视觉身份的系统化打造。"
  },
  {
    name: "Atmosphere Office",
    location: "Beijing",
    category: ["综合设计"],
    url: "https://www.atmosphereoffice.cn/zh",
    description: "北京新锐跨学科设计工作室，探索设计、文化与空间的艺术连接。"
  },
  {
    name: "2x4",
    location: "New York",
    category: ["综合设计", "品牌设计"],
    url: "https://2x4.org/",
    description: "闻名全球的设计咨询公司，由视觉艺术家和策略师组成，深耕品牌与媒体设计。"
  },
  {
    name: "Studio NAEO",
    location: "Shanghai",
    category: ["综合设计", "包装设计"],
    url: "https://www.studionaeo.com/works",
    description: "专注于高品质包装与产品视觉的设计机构，追求平衡美学与工艺的结合。"
  },
  {
    name: "Reesaw",
    location: "Shanghai",
    category: ["品牌设计", "标志设计"],
    url: "http://www.reesaw.com/",
    description: "知名品牌顾问公司，为客户提供从策略到视觉的全体系品牌解决方案。"
  }
];

const CATEGORIES = ["全部", "品牌设计", "包装设计", "标志设计", "交互设计", "综合设计"];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredStudios = useMemo(() => {
    return STUDIOS.filter(studio => {
      const matchesSearch = studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          studio.description.includes(searchQuery);
      const matchesCategory = selectedCategory === "全部" || studio.category.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-studio-50 selection:bg-studio-900 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-studio-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-3 py-1 bg-studio-900 text-white text-[10px] uppercase tracking-[0.2em] font-medium"
              >
                Design Directory
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-studio-950"
              >
                设计视界 <span className="font-light text-studio-400">Studio Index</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-studio-500 max-w-xl text-lg"
              >
                汇集全球顶尖设计工作室，为您提供最前沿的视觉灵感与专业导航。
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative group flex-1 sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-studio-400 group-focus-within:text-studio-900 transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="搜索工作室或描述..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-studio-100 border-transparent border-b-2 border-b-studio-200 focus:border-b-studio-900 focus:bg-white transition-all outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 text-xs font-medium transition-all border ${
                    selectedCategory === cat 
                      ? "bg-studio-900 text-white border-studio-900" 
                      : "bg-white text-studio-500 border-studio-200 hover:border-studio-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-studio-200 p-1 bg-white">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-studio-100 text-studio-900" : "text-studio-400 hover:text-studio-600"}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-studio-100 text-studio-900" : "text-studio-400 hover:text-studio-600"}`}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {filteredStudios.length > 0 ? (
            <motion.div
              key={viewMode + selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "space-y-4"
              }
            >
              {filteredStudios.map((studio, idx) => (
                <motion.div
                  key={studio.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`studio-card group ${viewMode === "list" ? "flex items-center justify-between p-6" : "p-8 flex flex-col h-full"}`}
                >
                  <div className={viewMode === "list" ? "flex-1" : "flex-1 mb-8"}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {studio.category.map(cat => (
                          <span key={cat} className="category-tag">{cat}</span>
                        ))}
                      </div>
                      <div className="text-[10px] text-studio-400 flex items-center gap-1">
                        <Globe size={10} />
                        {studio.location}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-studio-600 transition-colors">
                      {studio.name}
                    </h3>
                    
                    <p className="text-studio-500 text-sm leading-relaxed line-clamp-2">
                      {studio.description}
                    </p>
                  </div>

                  <div className={viewMode === "list" ? "ml-8" : "mt-auto pt-8 border-t border-studio-100 flex items-center justify-between"}>
                    <a 
                      href={studio.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all group/link"
                    >
                      访问官网 <ArrowUpRight size={14} className="text-studio-400 group-hover/link:text-studio-900" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 border border-dashed border-studio-200"
            >
              <div className="text-studio-300 mb-4 flex justify-center">
                <Filter size={48} />
              </div>
              <h3 className="text-xl font-bold text-studio-900 mb-2">未找到匹配的工作室</h3>
              <p className="text-studio-500">请尝试更改搜索词或分类过滤器。</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("全部"); }}
                className="mt-8 text-studio-900 font-bold border-b-2 border-studio-900 pb-1 hover:text-studio-600 hover:border-studio-600 transition-all"
              >
                重置所有过滤器
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-studio-200 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-studio-900 flex items-center justify-center text-white font-bold">视</div>
            <div className="text-sm font-bold tracking-tighter">设计视界 STUDIO INDEX</div>
          </div>
          <div className="text-studio-400 text-xs tracking-widest uppercase">
            © 2026 全球顶尖设计工作室名录 · 灵感源于卓越
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-studio-900 hover:text-studio-500 transition-colors">关于我们</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-studio-900 hover:text-studio-500 transition-colors">提交申请</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

