/**
 * AnimatedBackground - Subtle animated olive blob on near-black background
 * Creates atmospheric depth without distracting from content
 */

export function AnimatedBackground(): React.ReactElement {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base near-black background */}
      <div className="absolute inset-0 bg-olive-950" />

      {/* Primary blob - large, blurry, slow drift */}
      <div
        className="absolute w-[800px] h-[800px] animate-blob-drift"
        style={{
          top: "10%",
          left: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(35, 50, 25, 0.5) 0%, rgba(25, 35, 18, 0.3) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Secondary blob - offset timing for organic feel */}
      <div
        className="absolute w-[600px] h-[600px] animate-blob-drift-delayed"
        style={{
          bottom: "5%",
          left: "20%",
          background:
            "radial-gradient(ellipse at center, rgba(40, 55, 28, 0.4) 0%, rgba(30, 42, 20, 0.2) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle lime accent glow - very faint */}
      <div
        className="absolute w-[400px] h-[400px] animate-blob-drift"
        style={{
          top: "40%",
          right: "10%",
          background:
            "radial-gradient(ellipse at center, rgba(200, 245, 66, 0.03) 0%, transparent 60%)",
          filter: "blur(60px)",
          animationDelay: "-20s",
        }}
      />

      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
