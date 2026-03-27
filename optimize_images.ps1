$htmlPath = "c:\Users\DIVINE\Downloads\Portfolio\indexx.html"
$imgDir   = "c:\Users\DIVINE\Downloads\Portfolio\images"

# ── 1. Read HTML ──────────────────────────────────────────────────────────────
$html = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# ── 2. Base64-embed the four small project thumbnails (~30-43 KB each) ────────
$thumbs = @(
    "thumb_akum.png",
    "thumb_handyman_customer.png",
    "thumb_handyman_provider.png",
    "thumb_maamaka.png"
)

foreach ($t in $thumbs) {
    $fullPath = Join-Path $imgDir $t
    if (Test-Path $fullPath) {
        $b64  = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes($fullPath))
        $data = "data:image/png;base64,$b64"
        # Replace the src="images/THUMB" references with inline data URL
        $html = $html -replace [regex]::Escape("src=""images/$t"""), "src=""$data"""
        Write-Host "  Embedded $t as Base64"
    } else {
        Write-Host "  SKIPPED $t (not found)"
    }
}

# ── 3. Add loading="lazy" decoding="async" to all remaining external <img> ───
# Matches <img ... src="images/..."> that don't already have loading= set
# Strategy: find all <img tags that reference images/ folder and lack loading=
$pattern = '(<img\b)(?![^>]*\bloading\s*=)([^>]*src="images/[^>]+>)'
$html = [regex]::Replace($html, $pattern, '$1 loading="lazy" decoding="async"$2')
Write-Host "  Added lazy loading to all large images"

# ── 4. Write back ─────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.Encoding]::UTF8)
Write-Host "`nDone! indexx.html updated."
