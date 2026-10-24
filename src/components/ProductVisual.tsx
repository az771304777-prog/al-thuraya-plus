import React from 'react';
import { Product } from '../types/store';

interface ProductVisualProps {
  product: Product;
  selectedColorHex?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  selectedColorHex,
  className = '',
  size = 'md',
}) => {
  const color = selectedColorHex || product.colors[0]?.hex || '#3b82f6';

  const containerHeight =
    size === 'sm' ? 'h-36' : size === 'lg' ? 'h-72 md:h-80' : 'h-52';

  return (
    <div
      className={`relative w-full ${containerHeight} bg-gradient-to-b from-slate-100/80 via-slate-50 to-white flex items-center justify-center p-4 overflow-hidden rounded-xl border border-slate-200/60 select-none group transition-all duration-300 ${className}`}
    >
      {/* Subtle background ambient mesh glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none transition-colors duration-500 blur-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        }}
      />

      {/* Custom Image URL support if user uploaded or provided an image */}
      {product.customImageUrl ? (
        <div className="relative w-full h-full flex items-center justify-center p-2 z-10 transition-transform duration-300 group-hover:scale-105">
          <img
            src={product.customImageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain drop-shadow-lg rounded-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <>
          {/* RENDER BY VISUAL TYPE */}
          {product.visualType === 'iphone16' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Phone Frame */}
          <div
            className="w-24 sm:w-28 md:w-32 h-44 sm:h-52 md:h-56 rounded-[2rem] border-2 shadow-xl relative overflow-hidden flex flex-col items-center justify-between p-1.5 transition-colors duration-300"
            style={{
              borderColor: color,
              backgroundColor: '#090a0f',
              boxShadow: `0 20px 30px -10px ${color}40`,
            }}
          >
            {/* Dynamic Island */}
            <div className="w-9 h-2.5 bg-black rounded-full z-20 flex items-center justify-between px-1.5 mt-0.5">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
            </div>

            {/* Screen Content Graphic */}
            <div className="absolute inset-1 rounded-[1.6rem] overflow-hidden flex flex-col justify-between p-2 z-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
              <div className="text-center pt-4">
                <span className="text-[10px] font-mono text-slate-300 font-semibold tracking-wider">09:41</span>
                <p className="text-[9px] text-slate-400 mt-0.5">Apple Intelligence</p>
              </div>

              {/* Glowing circular lockscreen visual */}
              <div className="w-16 h-16 mx-auto rounded-full border border-cyan-400/30 bg-gradient-to-tr from-cyan-500/20 via-violet-500/20 to-transparent flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 blur-sm"></div>
              </div>

              {/* Bottom bar */}
              <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-1"></div>
            </div>

            {/* Simulated camera bump outline on hover */}
            <div
              className="absolute -top-1 -right-1 w-10 h-10 rounded-xl opacity-20 border"
              style={{ borderColor: color }}
            />
          </div>

          {/* Side action button badge */}
          <div
            className="absolute -left-1 top-16 w-0.5 h-4 rounded-l"
            style={{ backgroundColor: color }}
          />
        </div>
      )}

      {product.visualType === 's25ultra' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Phone Frame - Boxy titanium edges */}
          <div
            className="w-26 sm:w-30 md:w-32 h-44 sm:h-52 md:h-56 rounded-md border-2 shadow-xl relative overflow-hidden flex flex-col items-center justify-between p-1 transition-colors duration-300"
            style={{
              borderColor: color,
              backgroundColor: '#0a0a0c',
              boxShadow: `0 20px 35px -10px ${color}35`,
            }}
          >
            {/* Top punch hole camera */}
            <div className="w-1.5 h-1.5 bg-black rounded-full z-20 mt-1 ring-1 ring-slate-800"></div>

            {/* AMOLED Screen */}
            <div className="absolute inset-0.5 rounded-sm overflow-hidden flex flex-col justify-between p-2 z-10 bg-gradient-to-tr from-slate-950 via-zinc-900 to-slate-900">
              <div className="flex justify-between items-center text-[8px] text-zinc-400 pt-2 px-1">
                <span className="font-mono">5G</span>
                <span>Galaxy AI</span>
                <span className="font-mono">100%</span>
              </div>

              {/* Sleek S25 Ultra wallpaper geometry */}
              <div className="relative w-20 h-24 mx-auto flex items-center justify-center">
                <div
                  className="w-16 h-16 rotate-45 border border-cyan-400/40 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${color}30, transparent)`,
                  }}
                />
                <div className="absolute text-[10px] font-bold text-white tracking-widest uppercase">
                  S25 Ultra
                </div>
              </div>

              {/* S-Pen preview indicator */}
              <div className="flex items-center justify-between text-[8px] text-zinc-400 pb-1 px-1">
                <span className="text-amber-400">S-Pen Ready</span>
                <span>200MP Quad</span>
              </div>
            </div>
          </div>

          {/* S-Pen stylus protruding slightly */}
          <div
            className="absolute -bottom-2 -left-2 w-1.5 h-10 rounded-full border border-slate-700 shadow-md rotate-12"
            style={{ backgroundColor: color }}
          />
        </div>
      )}

      {product.visualType === 'pixel9' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div
            className="w-26 sm:w-28 md:w-30 h-44 sm:h-52 md:h-56 rounded-[1.8rem] border-2 shadow-xl relative overflow-hidden flex flex-col items-center justify-between p-1 transition-colors duration-300"
            style={{
              borderColor: color,
              backgroundColor: '#111315',
              boxShadow: `0 20px 30px -10px ${color}30`,
            }}
          >
            {/* Front Screen */}
            <div className="absolute inset-1 rounded-[1.5rem] overflow-hidden flex flex-col justify-between p-2 z-10 bg-gradient-to-b from-stone-900 via-neutral-900 to-stone-950">
              <div className="w-1.5 h-1.5 bg-black rounded-full mx-auto mt-0.5"></div>
              <div className="text-center my-auto">
                <div className="text-2xl font-light text-white tracking-tighter">09:30</div>
                <div className="text-[9px] text-emerald-400 font-medium">Google Tensor G4</div>
              </div>
              <div className="w-10 h-1 bg-white/30 rounded-full mx-auto"></div>
            </div>
          </div>
          {/* Iconic Pixel Visor Pill floating behind */}
          <div
            className="absolute -right-3 top-8 w-6 h-14 rounded-full border shadow-lg z-0"
            style={{ backgroundColor: color, borderColor: '#ffffff20' }}
          ></div>
        </div>
      )}

      {product.visualType === 'xiaomi15' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div
            className="w-26 sm:w-28 md:w-30 h-44 sm:h-52 md:h-56 rounded-[1.6rem] border-2 shadow-xl relative overflow-hidden flex flex-col items-center justify-center p-1"
            style={{
              borderColor: color,
              backgroundColor: '#181716',
            }}
          >
            {/* Leica Large Circular Camera Ring Graphic */}
            <div className="w-20 h-20 rounded-full border-2 border-amber-600/60 bg-gradient-to-br from-zinc-900 via-neutral-900 to-black flex items-center justify-center relative shadow-inner">
              <div className="w-12 h-12 rounded-full border border-zinc-700 bg-neutral-950 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-900/60 ring-1 ring-cyan-400/40"></div>
              </div>
              <span className="absolute top-1 right-2 text-[6px] font-bold text-red-500 uppercase tracking-wider">
                Leica
              </span>
              <span className="absolute bottom-1 text-[6px] text-zinc-400 font-mono">
                1-INCH · 50MP
              </span>
            </div>
            <span className="text-[10px] text-zinc-300 font-bold mt-2">Xiaomi 15 Ultra</span>
          </div>
        </div>
      )}

      {product.visualType === 'macbook' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Laptop Screen Open */}
          <div
            className="w-44 sm:w-52 md:w-56 h-28 sm:h-32 md:h-34 rounded-t-lg border-2 border-b-0 shadow-2xl relative overflow-hidden flex flex-col justify-between p-1"
            style={{
              borderColor: color,
              backgroundColor: '#0a0a0f',
            }}
          >
            {/* Notch */}
            <div className="w-6 h-1.5 bg-black rounded-b-md mx-auto z-20"></div>

            {/* Screen Wallpaper */}
            <div className="absolute inset-1 rounded-t-md overflow-hidden bg-gradient-to-tr from-indigo-950 via-slate-900 to-blue-950 flex flex-col justify-between p-2">
              <div className="flex justify-between items-center text-[7px] text-slate-400">
                <span className="font-semibold text-white">Finder</span>
                <span>M4 Pro · Liquid Retina XDR</span>
              </div>
              <div className="text-center my-auto">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
                  MacBook Pro
                </span>
              </div>
              <div className="flex gap-1 justify-center">
                <div className="w-2.5 h-2.5 rounded bg-blue-500/80"></div>
                <div className="w-2.5 h-2.5 rounded bg-purple-500/80"></div>
                <div className="w-2.5 h-2.5 rounded bg-amber-500/80"></div>
              </div>
            </div>
          </div>

          {/* Laptop Base & Keyboard Base */}
          <div
            className="w-52 sm:w-60 md:w-64 h-3 sm:h-3.5 rounded-b-md border shadow-lg flex items-center justify-center relative"
            style={{
              backgroundColor: color,
              borderColor: '#00000030',
            }}
          >
            <div className="w-12 h-1 bg-black/25 rounded-full mx-auto"></div>
          </div>
        </div>
      )}

      {product.visualType === 'xps16' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* XPS 16 Screen */}
          <div
            className="w-44 sm:w-52 md:w-56 h-28 sm:h-32 rounded-t-md border-2 border-b-0 shadow-2xl relative overflow-hidden flex flex-col justify-between p-1"
            style={{
              borderColor: color,
              backgroundColor: '#05070a',
            }}
          >
            <div className="absolute inset-0.5 rounded-t bg-gradient-to-br from-zinc-950 via-slate-900 to-neutral-900 flex flex-col justify-between p-2">
              <div className="text-[7px] text-slate-300 flex justify-between">
                <span>Dell XPS 16</span>
                <span>4K+ OLED 120Hz</span>
              </div>
              <div className="w-20 h-10 border border-slate-700/50 rounded-lg mx-auto flex items-center justify-center bg-slate-800/40">
                <span className="text-[8px] font-mono text-cyan-400">Intel Core Ultra 9</span>
              </div>
              <div className="w-16 h-0.5 bg-cyan-400/60 mx-auto"></div>
            </div>
          </div>

          {/* Platinum Base */}
          <div
            className="w-52 sm:w-60 md:w-64 h-3.5 rounded-b-md border flex items-center justify-center"
            style={{ backgroundColor: color, borderColor: '#00000020' }}
          >
            <div className="w-14 h-1 bg-black/20 rounded-full"></div>
          </div>
        </div>
      )}

      {product.visualType === 'rogzephyrus' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* ROG Screen */}
          <div
            className="w-44 sm:w-52 md:w-56 h-28 sm:h-32 rounded-t-md border-2 border-b-0 shadow-2xl relative overflow-hidden flex flex-col justify-between p-1"
            style={{
              borderColor: color,
              backgroundColor: '#090a0d',
            }}
          >
            <div className="absolute inset-0.5 rounded-t bg-gradient-to-br from-black via-zinc-950 to-red-950/40 flex flex-col justify-between p-2">
              <div className="flex justify-between items-center text-[7px] text-red-400 font-mono">
                <span>ROG ZEPHYRUS</span>
                <span>240Hz OLED · 0.2ms</span>
              </div>
              <div className="text-center">
                <span className="text-xs font-mono font-bold text-white tracking-widest">
                  RTX 4080
                </span>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-red-500 via-violet-500 to-cyan-500 rounded-full"></div>
            </div>
          </div>

          {/* Base with Slash Lighting Accent */}
          <div
            className="w-52 sm:w-60 md:w-64 h-3.5 rounded-b-md border relative overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: color, borderColor: '#ff005530' }}
          >
            <div className="absolute right-8 w-12 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
          </div>
        </div>
      )}

      {product.visualType === 'thinkpad' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Screen */}
          <div
            className="w-42 sm:w-48 md:w-52 h-26 sm:h-30 rounded-t-md border-2 border-b-0 shadow-2xl relative overflow-hidden p-1"
            style={{
              borderColor: '#262626',
              backgroundColor: '#0c0c0d',
            }}
          >
            <div className="absolute inset-0.5 rounded-t bg-gradient-to-b from-stone-900 to-black p-2 flex flex-col justify-between">
              <div className="text-[7px] text-neutral-400 flex justify-between">
                <span className="text-red-500 font-bold">ThinkPad X1</span>
                <span>Intel Evo</span>
              </div>
              <div className="text-center text-[10px] text-stone-300 font-semibold">
                Carbon Gen 12
              </div>
              <div className="text-[6px] text-stone-500 text-center">1.09 kg Ultra-Light</div>
            </div>
          </div>
          {/* Base with iconic red TrackPoint indicator */}
          <div className="w-48 sm:w-56 md:w-60 h-3 rounded-b-md bg-[#171717] border border-neutral-700 flex items-center justify-center relative">
            {/* Red trackpoint dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_4px_#ef4444]"></div>
          </div>
        </div>
      )}

      {product.visualType === 'charger_gan' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div
            className="w-24 sm:w-28 h-28 sm:h-32 rounded-xl border-2 shadow-xl flex flex-col justify-between p-3 relative"
            style={{
              backgroundColor: '#1e2024',
              borderColor: color,
            }}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-cyan-400 font-mono">100W GaN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>

            {/* Ports Array */}
            <div className="flex flex-col gap-2 my-auto">
              <div className="w-full h-3 bg-neutral-900 border border-slate-700 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-cyan-500/80 rounded-sm"></div>
              </div>
              <div className="w-full h-3 bg-neutral-900 border border-slate-700 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-cyan-500/80 rounded-sm"></div>
              </div>
              <div className="w-full h-3.5 bg-neutral-900 border border-slate-700 rounded flex items-center justify-center">
                <div className="w-6 h-1.5 bg-blue-600 rounded-sm"></div>
              </div>
            </div>

            <div className="text-[7px] text-slate-400 font-mono text-center">
              ActiveShield 2.0
            </div>
          </div>
        </div>
      )}

      {product.visualType === 'powerbank' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div
            className="w-24 sm:w-28 h-36 sm:h-40 rounded-2xl border-2 shadow-xl flex flex-col items-center justify-between p-2.5 relative"
            style={{
              backgroundColor: '#1b1d22',
              borderColor: color,
            }}
          >
            {/* MagSafe Ring Visual */}
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-600/70 flex items-center justify-center mt-2">
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">
                <span className="text-[9px] font-mono font-bold text-emerald-400">100%</span>
              </div>
            </div>

            <div className="w-full bg-neutral-900/90 rounded-lg p-1.5 text-center border border-neutral-800">
              <span className="text-[8px] font-bold text-slate-200">10,000 mAh</span>
              <p className="text-[7px] text-slate-400">15W MagSafe + Kickstand</p>
            </div>
          </div>
        </div>
      )}

      {product.visualType === 'airpods' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Earbuds Floating */}
          <div className="flex gap-4 mb-2">
            <div className="w-4 h-9 rounded-full bg-slate-200 border border-slate-300 shadow-md transform -rotate-12 flex flex-col justify-between p-0.5">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-0.5 bg-slate-400 mx-auto"></div>
            </div>
            <div className="w-4 h-9 rounded-full bg-slate-200 border border-slate-300 shadow-md transform rotate-12 flex flex-col justify-between p-0.5">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-0.5 bg-slate-400 mx-auto"></div>
            </div>
          </div>

          {/* AirPods Case */}
          <div className="w-24 h-18 bg-white border border-slate-200 shadow-xl rounded-2xl flex flex-col items-center justify-center relative">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-1"></div>
            <div className="w-16 h-0.5 bg-slate-200"></div>
            <span className="text-[7px] text-slate-400 mt-2 font-mono">USB-C · MagSafe</span>
          </div>
        </div>
      )}

      {product.visualType === 'laptop_stand' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Stand Top Plate */}
          <div
            className="w-36 sm:w-40 h-16 rounded-lg border-2 shadow-md flex items-center justify-center relative transform -rotate-6"
            style={{ backgroundColor: color, borderColor: '#334155' }}
          >
            <div className="w-16 h-6 border border-black/30 rounded flex items-center justify-center">
              <span className="text-[7px] font-bold text-slate-800">Airflow Grid</span>
            </div>
          </div>
          {/* Articulated Arm & Rotary Base */}
          <div className="w-6 h-10 bg-slate-600 rounded-sm"></div>
          <div className="w-28 h-4 rounded-full bg-slate-700 border-2 border-slate-500 shadow-lg flex items-center justify-center">
            <span className="text-[6px] text-slate-300 font-mono">360° SWIVEL</span>
          </div>
        </div>
      )}

      {product.visualType === 'braided_cable' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Smart LED connector */}
          <div className="w-24 h-12 rounded-lg bg-neutral-900 border border-slate-700 shadow-xl flex items-center justify-between px-3">
            <div className="w-4 h-6 bg-slate-300 rounded-sm"></div>
            <div className="text-center">
              <span className="text-xs font-mono font-bold text-emerald-400">240.0 W</span>
              <p className="text-[6px] text-slate-400">PD 3.1 Fast Charge</p>
            </div>
          </div>
          {/* Cable loops */}
          <div className="w-28 h-10 border-4 border-dashed border-neutral-700 rounded-full mt-2"></div>
        </div>
      )}

      {product.visualType === 'screen_protector' && (
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div className="w-24 sm:w-28 h-40 sm:h-44 rounded-2xl border-2 border-dashed border-blue-400/80 bg-blue-50/40 backdrop-blur-sm shadow-xl flex flex-col items-center justify-between p-3 relative">
            <span className="text-[8px] font-bold text-blue-600 font-mono">9H DIAMOND GLASS</span>
            <div className="w-14 h-14 rounded-full border border-blue-400/40 flex items-center justify-center">
              <span className="text-[7px] text-slate-600 font-medium text-center">
                Anti-Scratch
                <br />
                Oleophobic
              </span>
            </div>
            <span className="text-[8px] text-slate-500 font-mono">2.5D Curved Edge</span>
          </div>
        </div>
      )}
        </>
      )}

      {/* Brand Watermark / Identifier */}
      <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-wider text-slate-400/80 select-none pointer-events-none">
        {product.brand}
      </span>
    </div>
  );
};
