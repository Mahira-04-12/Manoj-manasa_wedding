const sharp = require("sharp");
const a = (f) => require("path").join(__dirname, "public", "assets", f);
(async () => {
  const jobs = [
    ["MANpotrit.JPG", "hero-portrait.jpg", 1200, 1800],
    ["MAN_land.JPG", "hero-landscape.jpg", 2400, 1600],
  ];
  for (const [src, out, w, h] of jobs) {
    const info = await sharp(a(src)).rotate()
      .resize(w, h, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(a(out));
    console.log(out, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
  }
})();
