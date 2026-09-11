import Foundation
import CoreGraphics
import ImageIO
// usage: cutout in.png out.png [tol] [scale]
let a = CommandLine.arguments
guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { exit(1) }
let w = img.width, h = img.height
var buf = [UInt8](repeating: 0, count: w*h*4)
let ctx = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(img, in: CGRect(x:0,y:0,width:w,height:h))
let tol = a.count > 3 ? Double(a[3])! : 14.0
func px(_ i: Int) -> (Double,Double,Double) { (Double(buf[i*4]), Double(buf[i*4+1]), Double(buf[i*4+2])) }
var keyed = [Bool](repeating: false, count: w*h)
var queue: [Int] = []
for x in 0..<w { queue.append(x); queue.append((h-1)*w + x) }
for y in 0..<h { queue.append(y*w); queue.append(y*w + w - 1) }
func lightBg(_ c: (Double,Double,Double)) -> Bool {
  let (r,g,b) = c
  return (r+g+b)/3.0 > 140 && b >= r - 12 && g >= r - 12
}
var head = 0
for i in queue { if lightBg(px(i)) { keyed[i] = true } }
queue = queue.filter { keyed[$0] }
while head < queue.count {
  let i = queue[head]; head += 1
  let (r,g,b) = px(i)
  let x = i % w, y = i / w
  for (dx,dy) in [(1,0),(-1,0),(0,1),(0,-1)] {
    let nx = x+dx, ny = y+dy
    if nx < 0 || ny < 0 || nx >= w || ny >= h { continue }
    let ni = ny*w + nx
    if keyed[ni] { continue }
    let (r2,g2,b2) = px(ni)
    let d = max(abs(r-r2), max(abs(g-g2), abs(b-b2)))
    if d <= tol && lightBg((r2,g2,b2)) { keyed[ni] = true; queue.append(ni) }
  }
}
// alpha: keyed -> 0, others 255; then 1px feather using neighbor count
var alpha = [Double](repeating: 255, count: w*h)
for i in 0..<(w*h) { if keyed[i] { alpha[i] = 0 } }
var out = alpha
for y in 1..<(h-1) { for x in 1..<(w-1) {
  let i = y*w+x
  if alpha[i] == 255 {
    var n = 0.0, t = 0.0
    for dy in -1...1 { for dx in -1...1 { n += 1; t += alpha[(y+dy)*w + (x+dx)] } }
    out[i] = t/n
  }
}}
for i in 0..<(w*h) {
  let al = out[i]/255.0
  buf[i*4]   = UInt8((Double(buf[i*4]) * al).rounded())
  buf[i*4+1] = UInt8((Double(buf[i*4+1]) * al).rounded())
  buf[i*4+2] = UInt8((Double(buf[i*4+2]) * al).rounded())
  buf[i*4+3] = UInt8(out[i].rounded())
}
let scale = a.count > 4 ? Double(a[4])! : 1.0
let base = ctx.makeImage()!
var final = base
if scale != 1.0 {
  let nw = Int(Double(w)*scale), nh = Int(Double(h)*scale)
  let c2 = CGContext(data: nil, width: nw, height: nh, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  c2.interpolationQuality = .high
  c2.draw(base, in: CGRect(x:0,y:0,width:nw,height:nh))
  final = c2.makeImage()!
}
if let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, "public.png" as CFString, 1, nil) {
  CGImageDestinationAddImage(dest, final, nil); CGImageDestinationFinalize(dest)
  print("wrote \(a[2]) \(final.width)x\(final.height)")
}
