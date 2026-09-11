import Foundation
import CoreGraphics
import ImageIO
let a = CommandLine.arguments
guard a.count >= 7 else { print("usage: crop.swift in x y w h out [scale]"); exit(1) }
guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { print("load fail"); exit(1) }
let r = CGRect(x: Double(a[2])!, y: Double(a[3])!, width: Double(a[4])!, height: Double(a[5])!)
guard var c = img.cropping(to: r) else { print("crop fail"); exit(1) }
let scale = a.count > 7 ? Double(a[7])! : 1.0
if scale != 1.0 {
  let w = Int(Double(c.width)*scale), h = Int(Double(c.height)*scale)
  let cs = CGColorSpaceCreateDeviceRGB()
  let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.interpolationQuality = .high
  ctx.draw(c, in: CGRect(x:0,y:0,width:w,height:h))
  c = ctx.makeImage()!
}
if let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[6]) as CFURL, "public.png" as CFString, 1, nil) {
  CGImageDestinationAddImage(dest, c, nil); CGImageDestinationFinalize(dest)
  print("saved \(a[6]) \(c.width)x\(c.height)")
}
