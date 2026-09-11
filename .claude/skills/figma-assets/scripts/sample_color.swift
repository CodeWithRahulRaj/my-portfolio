import Foundation
import CoreGraphics
import ImageIO
let a = CommandLine.arguments // in x y w h [topN]
guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { exit(1) }
let w = img.width, h = img.height
var buf = [UInt8](repeating: 0, count: w*h*4)
let ctx = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(img, in: CGRect(x:0,y:0,width:w,height:h))
let x0 = Int(a[2])!, y0 = Int(a[3])!, rw = Int(a[4])!, rh = Int(a[5])!
let topN = a.count > 6 ? Int(a[6])! : 6
var counts: [Int: Int] = [:]
for y in y0..<(y0+rh) { for x in x0..<(x0+rw) {
  let o = (y*w+x)*4
  let key = (Int(buf[o])<<16) | (Int(buf[o+1])<<8) | Int(buf[o+2])
  counts[key, default: 0] += 1
}}
let total = rw*rh
for (k,v) in counts.sorted(by: { $0.value > $1.value }).prefix(topN) {
  print(String(format: "#%06X  %.1f%%", k, 100.0*Double(v)/Double(total)))
}
