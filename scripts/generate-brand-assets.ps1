# ============================================================================
# AION / RIA brand asset generator
# ----------------------------------------------------------------------------
# Builds every favicon, logo and Open Graph image from the single official
# RIA asset (public/assets/brand/ria-mark-128.png) and the AION "A" mark.
# The official RIA logo is never re-drawn: it is resampled from the original.
# ============================================================================

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root       = 'C:\ria-website'
$brandDir   = Join-Path $root 'public\assets\brand'
$ogDir      = Join-Path $brandDir 'og'
$productDir = Join-Path $root 'public\assets\ria\product'
$publicDir  = Join-Path $root 'public'

New-Item -ItemType Directory -Force -Path $ogDir | Out-Null

$riaSource = Join-Path $brandDir 'ria-mark-128.png'
if (-not (Test-Path $riaSource)) { throw "Missing official RIA mark: $riaSource" }

# Preserve the previous horizontal lockup before ria-logo.png becomes canonical.
$lockup = Join-Path $brandDir 'ria-logo.png'
$lockupBackup = Join-Path $brandDir 'ria-logo-lockup.png'
if ((Test-Path $lockup) -and -not (Test-Path $lockupBackup)) {
  Copy-Item $lockup $lockupBackup
}

function Save-ResizedPng {
  param([System.Drawing.Image]$Image, [int]$Width, [string]$Path)
  $height = [int][Math]::Round($Image.Height * ($Width / $Image.Width))
  $bmp = New-Object System.Drawing.Bitmap($Width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bmp)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.DrawImage($Image, 0, 0, $Width, $height)
  $graphics.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  return $height
}

function New-RoundedPath {
  param([float]$X, [float]$Y, [float]$W, [float]$H, [float]$R)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $R * 2
  $path.AddArc($X, $Y, $d, $d, 180, 90)
  $path.AddArc($X + $W - $d, $Y, $d, $d, 270, 90)
  $path.AddArc($X + $W - $d, $Y + $H - $d, $d, $d, 0, 90)
  $path.AddArc($X, $Y + $H - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Get-AionPolygon {
  param([float]$Scale, [float]$OffsetX, [float]$OffsetY)
  $raw = @(
    @(50, 5), @(93, 94), @(77, 94), @(56, 57), @(56, 67),
    @(44, 67), @(44, 57), @(23, 94), @(7, 94)
  )
  $points = New-Object 'System.Drawing.PointF[]' $raw.Count
  for ($i = 0; $i -lt $raw.Count; $i++) {
    $points[$i] = New-Object System.Drawing.PointF(
      ([float]($OffsetX + $raw[$i][0] * $Scale)),
      ([float]($OffsetY + $raw[$i][1] * $Scale))
    )
  }
  return $points
}

# ---------------------------------------------------------------------------
# 1. Favicons + canonical logo raster (from the exact official RIA mark)
# ---------------------------------------------------------------------------
$src = [System.Drawing.Image]::FromFile($riaSource)

$faviconSizes = @{
  'favicon-16x16.png'      = 16
  'favicon-32x32.png'      = 32
  'favicon-48x48.png'      = 48
  'favicon-96x96.png'      = 96
  'favicon-192x192.png'    = 192
  'favicon-512x512.png'    = 512
  'android-chrome-192x192.png' = 192
  'android-chrome-512x512.png' = 512
  'apple-touch-icon.png'   = 180
}

foreach ($name in $faviconSizes.Keys) {
  $target = if ($name -eq 'favicon-192x192.png' -or $name -eq 'favicon-512x512.png' -or $name -eq 'apple-touch-icon.png') {
    Join-Path $publicDir $name
  } else {
    Join-Path $publicDir $name
  }
  Save-ResizedPng -Image $src -Width $faviconSizes[$name] -Path $target | Out-Null
}

# Canonical square product logo (512) + full-size copy of the original mark.
Save-ResizedPng -Image $src -Width 512 -Path (Join-Path $brandDir 'ria-logo.png') | Out-Null
Save-ResizedPng -Image $src -Width 512 -Path (Join-Path $brandDir 'ria-logo-512.png') | Out-Null
Save-ResizedPng -Image $src -Width 1024 -Path (Join-Path $brandDir 'ria-logo-1024.png') | Out-Null
Copy-Item $riaSource (Join-Path $brandDir 'ria-logo-128.png') -Force

# favicon.png (legacy single-file reference)
Save-ResizedPng -Image $src -Width 48 -Path (Join-Path $publicDir 'favicon.png') | Out-Null

$src.Dispose()

# ---------------------------------------------------------------------------
# 2. Multi-resolution favicon.ico (PNG-compressed frames: 16, 32, 48)
# ---------------------------------------------------------------------------
$icoPngs = @(
  (Join-Path $publicDir 'favicon-16x16.png'),
  (Join-Path $publicDir 'favicon-32x32.png'),
  (Join-Path $publicDir 'favicon-48x48.png')
)
$frames = @()
foreach ($p in $icoPngs) { $frames += ,([System.IO.File]::ReadAllBytes($p)) }

$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)
$bw.Write([UInt16]0)
$bw.Write([UInt16]1)
$bw.Write([UInt16]$frames.Count)
$offset = 6 + ($frames.Count * 16)
$sizes = @(16, 32, 48)
for ($i = 0; $i -lt $frames.Count; $i++) {
  $bw.Write([Byte]$sizes[$i])
  $bw.Write([Byte]$sizes[$i])
  $bw.Write([Byte]0)
  $bw.Write([Byte]0)
  $bw.Write([UInt16]1)
  $bw.Write([UInt16]32)
  $bw.Write([UInt32]$frames[$i].Length)
  $bw.Write([UInt32]$offset)
  $offset += $frames[$i].Length
}
foreach ($frame in $frames) { $bw.Write($frame) }
$bw.Flush()
[System.IO.File]::WriteAllBytes((Join-Path $publicDir 'favicon.ico'), $ms.ToArray())
$bw.Dispose()
$ms.Dispose()

# ---------------------------------------------------------------------------
# 3. SVG wrappers embedding the exact raster mark (no re-drawing)
# ---------------------------------------------------------------------------
$markBase64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($riaSource))
$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="RIA">
  <image href="data:image/png;base64,$markBase64" x="0" y="0" width="128" height="128"/>
</svg>
"@
Set-Content -Path (Join-Path $publicDir 'favicon.svg') -Value $svg -Encoding UTF8 -NoNewline
Set-Content -Path (Join-Path $brandDir 'ria-logo.svg') -Value $svg -Encoding UTF8 -NoNewline

# ---------------------------------------------------------------------------
# 4. AION organisation logo (exact header "A" geometry as a 512 raster)
# ---------------------------------------------------------------------------
$aionBmp = New-Object System.Drawing.Bitmap(512, 512)
$aionG = [System.Drawing.Graphics]::FromImage($aionBmp)
$aionG.Clear([System.Drawing.Color]::Transparent)
$aionG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$aionG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$scale = 500.0 / 89.0
$offsetX = (512 - 86 * $scale) / 2 - 7 * $scale
$offsetY = (512 - 89 * $scale) / 2 - 5 * $scale
$aionPoints = Get-AionPolygon -Scale $scale -OffsetX $offsetX -OffsetY $offsetY
$aionBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#171717'))
$aionG.FillPolygon($aionBrush, $aionPoints)
$aionBrush.Dispose()
$aionG.Dispose()
$aionBmp.Save((Join-Path $brandDir 'aion-logo-512.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$aionBmp.Dispose()

# White A mark for OG dark panels.
$aionWhiteBmp = New-Object System.Drawing.Bitmap(512, 512)
$aionWG = [System.Drawing.Graphics]::FromImage($aionWhiteBmp)
$aionWG.Clear([System.Drawing.Color]::Transparent)
$aionWG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$aionWG.FillPolygon($whiteBrush, $aionPoints)
$whiteBrush.Dispose()
$aionWG.Dispose()
$aionWhiteBmp.Save((Join-Path $brandDir 'aion-logo-white-512.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$aionWhiteBmp.Dispose()

# ---------------------------------------------------------------------------
# 5. Open Graph / social images (1200 x 630)
# ---------------------------------------------------------------------------
$riaLogo = [System.Drawing.Image]::FromFile((Join-Path $brandDir 'ria-logo.png'))
$workspace = [System.Drawing.Image]::FromFile((Join-Path $productDir 'ria-workspace-1600.png'))

$ink       = [System.Drawing.ColorTranslator]::FromHtml('#171717')
$ink2      = [System.Drawing.ColorTranslator]::FromHtml('#686868')
$ink3      = [System.Drawing.ColorTranslator]::FromHtml('#8C8C88')
$line      = [System.Drawing.ColorTranslator]::FromHtml('#E2E2DD')
$bg        = [System.Drawing.ColorTranslator]::FromHtml('#F7F7F5')
$dark      = [System.Drawing.ColorTranslator]::FromHtml('#111110')
$accent    = [System.Drawing.ColorTranslator]::FromHtml('#3D5A49')

function Draw-AionMark {
  param([System.Drawing.Graphics]$G, [float]$X, [float]$Y, [float]$Height, [System.Drawing.Color]$Color)
  $s = $Height / 89.0
  $ox = $X - 7 * $s
  $oy = $Y - 5 * $s
  $pts = Get-AionPolygon -Scale $s -OffsetX $ox -OffsetY $oy
  $b = New-Object System.Drawing.SolidBrush($Color)
  $G.FillPolygon($b, $pts)
  $b.Dispose()
}

function New-OgImage {
  param(
    [string]$FileName,
    [string]$Eyebrow,
    [string]$Title,
    [string]$Variant,   # 'product' | 'privacy' | 'about' | 'download'
    [string]$Foot
  )

  $bmp = New-Object System.Drawing.Bitmap(1200, 630)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear($bg)

  # hairline frame
  $framePen = New-Object System.Drawing.Pen($line, 1)
  $g.DrawRectangle($framePen, 24, 24, 1151, 581)
  $framePen.Dispose()

  # top brand lockup
  Draw-AionMark -G $g -X 64 -Y 56 -Height 26 -Color $ink
  $brandFont = New-Object System.Drawing.Font('Segoe UI Semibold', 16, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $brandBrush = New-Object System.Drawing.SolidBrush($ink)
  $g.DrawString('AION', $brandFont, $brandBrush, 98, 52)
  $dividerPen = New-Object System.Drawing.Pen($line, 1)
  $g.DrawLine($dividerPen, 168, 52, 168, 82)
  $dividerPen.Dispose()
  $g.DrawImage($riaLogo, 190, 52, 32, 32)
  $g.DrawString('RIA', $brandFont, $brandBrush, 232, 52)

  # eyebrow
  $dotBrush = New-Object System.Drawing.SolidBrush($accent)
  $g.FillEllipse($dotBrush, 64, 278, 7, 7)
  $dotBrush.Dispose()
  $eyebrowFont = New-Object System.Drawing.Font('Segoe UI', 13, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $eyebrowBrush = New-Object System.Drawing.SolidBrush($ink3)
  $g.DrawString($Eyebrow.ToUpperInvariant(), $eyebrowFont, $eyebrowBrush, 80, 268)

  # title
  $titleFont = New-Object System.Drawing.Font('Segoe UI Semibold', 46, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $titleBrush = New-Object System.Drawing.SolidBrush($ink)
  $titleRect = New-Object System.Drawing.RectangleF(64, 300, 540, 210)
  $g.DrawString($Title, $titleFont, $titleBrush, $titleRect)

  # footer statement
  $footFont = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $footBrush = New-Object System.Drawing.SolidBrush($ink2)
  $g.DrawString($Foot, $footFont, $footBrush, 64, 552)

  # right-hand visual card
  $card = New-RoundedPath -X 648 -Y 128 -W 488 -H 374 -R 16
  if ($Variant -eq 'privacy' -or $Variant -eq 'about') {
    $darkBrush = New-Object System.Drawing.SolidBrush($dark)
    $g.FillPath($darkBrush, $card)
    $darkBrush.Dispose()
    if ($Variant -eq 'privacy') {
      $g.DrawImage($riaLogo, 832, 176, 120, 120)
      $capFont = New-Object System.Drawing.Font('Segoe UI Semibold', 25, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
      $capBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
      $g.DrawString('Local-first by design', $capFont, $capBrush, 800, 330)
      $subFont = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
      $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#A8A8A1'))
      $g.DrawString('Your workspace stays on your machine.', $subFont, $subBrush, 800, 368)
      $capBrush.Dispose(); $subBrush.Dispose(); $capFont.Dispose(); $subFont.Dispose()
    } else {
      Draw-AionMark -G $g -X 852 -Y 168 -Height 96 -Color ([System.Drawing.Color]::White)
      $capFont = New-Object System.Drawing.Font('Segoe UI Semibold', 25, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
      $capBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
      $g.DrawString('Independent. India.', $capFont, $capBrush, 800, 330)
      $subFont = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
      $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#A8A8A1'))
      $g.DrawString('Building intelligence you can own.', $subFont, $subBrush, 800, 368)
      $capBrush.Dispose(); $subBrush.Dispose(); $capFont.Dispose(); $subFont.Dispose()
    }
  } else {
    # product screenshot, cropped to fill the card
    $cardBrush = New-Object System.Drawing.SolidBrush($bg)
    $g.FillPath($cardBrush, $card)
    $cardBrush.Dispose()
    $state = $g.Save()
    $g.SetClip($card)
    $srcRatio = $workspace.Width / $workspace.Height
    $cardRatio = 488 / 374
    if ($srcRatio -gt $cardRatio) {
      $drawH = 374
      $drawW = 374 * $srcRatio
      $dx = 648 - (($drawW - 488) / 2)
      $dy = 128
    } else {
      $drawW = 488
      $drawH = 488 / $srcRatio
      $dx = 648
      $dy = 128 - (($drawH - 374) / 2)
    }
    $g.DrawImage($workspace, [int]$dx, [int]$dy, [int]$drawW, [int]$drawH)
    $g.Restore($state)
  }

  $cardPen = New-Object System.Drawing.Pen($line, 1)
  $g.DrawPath($cardPen, $card)
  $cardPen.Dispose()
  $card.Dispose()

  $out = Join-Path $ogDir $FileName
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

  $g.Dispose()
  $bmp.Dispose()
  $brandFont.Dispose(); $brandBrush.Dispose()
  $eyebrowFont.Dispose(); $eyebrowBrush.Dispose()
  $titleFont.Dispose(); $titleBrush.Dispose()
  $footFont.Dispose(); $footBrush.Dispose()
}

New-OgImage -FileName 'aion-home.png' -Eyebrow 'AION · RIA' -Title 'Advancing the future of personal intelligence.' -Variant 'product' -Foot 'Made in India. Built for the World.'
New-OgImage -FileName 'ria-product.png' -Eyebrow 'RIA · Product' -Title 'A personal intelligence workspace.' -Variant 'product' -Foot 'Conversation, memory, knowledge and local tools. One desktop.'
New-OgImage -FileName 'ria-features.png' -Eyebrow 'RIA · Features' -Title 'Intelligence designed around you.' -Variant 'product' -Foot 'Connected systems, built to work together.'
New-OgImage -FileName 'ria-privacy.png' -Eyebrow 'RIA · Privacy' -Title 'Your intelligence. Your control.' -Variant 'privacy' -Foot 'Local where it matters. Explicit everywhere else.'
New-OgImage -FileName 'ria-download.png' -Eyebrow 'RIA · Download' -Title 'RIA for Windows.' -Variant 'download' -Foot 'Windows 10 / 11 · x86-64 · Version 0.0.2'
New-OgImage -FileName 'aion-about.png' -Eyebrow 'AION · Company' -Title 'The vision behind AION.' -Variant 'about' -Foot 'An independent software company. Founded 2026, India.'

$riaLogo.Dispose()
$workspace.Dispose()

Write-Host 'Brand assets generated.'
Get-ChildItem $brandDir -File | Select-Object Name, Length | Format-Table -AutoSize
Get-ChildItem $ogDir -File | Select-Object Name, Length | Format-Table -AutoSize
