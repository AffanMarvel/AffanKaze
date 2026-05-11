$file = 'g:\Projects\Affan-V1\pages\media.html'
$content = [System.IO.File]::ReadAllText($file)

# Replace section opening and header
$old1 = '<section class="media-section">
    <div class="media-header">
      <div class="media-header-label">TRANSMISSION HUBS</div>
      <h2>Media &amp; Socials</h2>
    </div>'

$new1 = '<div class="media-page">
  <div class="media-hero">
    <div class="media-hero-eyebrow">// TRANSMISSION HUBS</div>
    <h1>Media &amp; Channels</h1>
    <p>All official platforms, channels &amp; social accounts of Affan Shaikh — organized by network.</p>
    <div class="media-hero-line"></div>
  </div>'

$content = $content.Replace($old1, $new1)

# Replace closing section tag
$content = $content.Replace('  </section>', '</div>')

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host 'Step 1 done'
