$file = 'g:\Projects\Affan-V1\pages\media.html'
$content = [System.IO.File]::ReadAllText($file)

# Find the start of old platform-grid and end of media-masonry
$startMarker = '<div class="platform-grid">'
$endMarker = '</div>
</div>'

$startIdx = $content.IndexOf($startMarker)

# New content to inject
$newContent = @'
  <!-- YOUTUBE -->
  <div class="platform-section yt-section">
    <div class="platform-section-header">
      <div class="platform-section-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zm-14 9.4V8.4l6.3 3.6-6.3 3.6z"/></svg></div>
      <div><div class="platform-section-title">YouTube</div><div class="platform-section-sub">7 CHANNELS</div></div>
    </div>
    <div class="channel-grid">
      <a href="https://www.youtube.com/@affanmarvels" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">AM</div><div><div class="channel-name">AffanMarvel</div><div class="channel-handle">@affanmarvels</div></div></div><p class="channel-desc">Marvel universe breakdowns, theories &amp; cinematic storytelling.</p><span class="channel-btn yt-btn">Open Channel</span></a>
      <a href="https://www.youtube.com/@superioraffan" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">SA</div><div><div class="channel-name">Superior-Affan</div><div class="channel-handle">@superioraffan</div></div></div><p class="channel-desc">High-tier content experiments and superior-level visual breakdowns.</p><span class="channel-btn yt-btn">Open Channel</span></a>
      <a href="https://www.youtube.com/@affancomics" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">AC</div><div><div class="channel-name">AffanComics</div><div class="channel-handle">@affancomics</div></div></div><p class="channel-desc">Comics lore, deep dives &amp; character analysis across universes.</p><span class="channel-btn yt-btn">Open Channel</span></a>
      <a href="https://www.youtube.com/@super-comics" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">SC</div><div><div class="channel-name">SuperComics!</div><div class="channel-handle">@super-comics</div></div></div><p class="channel-desc">Super-powered comics — DC, Marvel &amp; beyond.</p><span class="channel-btn yt-btn">Open Channel</span></a>
      <a href="https://www.youtube.com/@affan-kaze" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">AK</div><div><div class="channel-name">Affan Kaze</div><div class="channel-handle">@affan-kaze</div></div></div><p class="channel-desc">Movies &amp; series reviews, deep dives into cinema.</p><span class="channel-btn yt-btn">Open Channel</span></a>
      <a href="https://www.youtube.com/@anime-kaze" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">AnK</div><div><div class="channel-name">Anime Kazel</div><div class="channel-handle">@anime-kaze</div></div></div><p class="channel-desc">Anime breakdowns, lore, rankings &amp; character studies.</p><span class="channel-btn yt-btn">Open Channel</span></a>
      <a href="https://www.youtube.com/@ItisAFFAN" target="_blank" class="channel-card yt-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,0,0,.15);color:#ff0000">IA</div><div><div class="channel-name">It's Affan</div><div class="channel-handle">@ItisAFFAN</div></div></div><p class="channel-desc">Dark, unfiltered content — the side you don't see elsewhere.</p><span class="channel-btn yt-btn">Open Channel</span></a>
    </div>
  </div>

  <!-- INSTAGRAM -->
  <div class="platform-section ig-section">
    <div class="platform-section-header">
      <div class="platform-section-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="#e4405f"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></div>
      <div><div class="platform-section-title">Instagram</div><div class="platform-section-sub">2 ACCOUNTS</div></div>
    </div>
    <div class="channel-grid">
      <a href="https://www.instagram.com/affankaze" target="_blank" class="channel-card ig-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(228,64,95,.15);color:#e4405f">AK</div><div><div class="channel-name">AffanKaze</div><div class="channel-handle">@affankaze</div></div></div><p class="channel-desc">Main personal brand — lifestyle, creative process &amp; behind the scenes.</p><span class="channel-btn ig-btn">Follow</span></a>
      <a href="https://www.instagram.com/affan_marvel" target="_blank" class="channel-card ig-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(228,64,95,.15);color:#e4405f">AM</div><div><div class="channel-name">AffanMarvel</div><div class="channel-handle">@affan_marvel</div></div></div><p class="channel-desc">Marvel content, edits, fan theories &amp; comic culture posts.</p><span class="channel-btn ig-btn">Follow</span></a>
    </div>
  </div>

  <!-- X -->
  <div class="platform-section x-section">
    <div class="platform-section-header">
      <div class="platform-section-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
      <div><div class="platform-section-title">X (Twitter)</div><div class="platform-section-sub">2 ACCOUNTS</div></div>
    </div>
    <div class="channel-grid">
      <a href="https://x.com/AffanKaze" target="_blank" class="channel-card x-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,255,255,.08);color:#fff">AK</div><div><div class="channel-name">Affan Shaikh</div><div class="channel-handle">@AffanKaze</div></div></div><p class="channel-desc">Personal thoughts, updates &amp; real-time commentary on life &amp; work.</p><span class="channel-btn x-btn">Follow on X</span></a>
      <a href="https://x.com/affanmarvel" target="_blank" class="channel-card x-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,255,255,.08);color:#fff">AM</div><div><div class="channel-name">Affan Marvel</div><div class="channel-handle">@affanmarvel</div></div></div><p class="channel-desc">Marvel content, pop culture takes &amp; fandom discussions on X.</p><span class="channel-btn x-btn">Follow on X</span></a>
    </div>
  </div>

  <!-- REDDIT -->
  <div class="platform-section rd-section">
    <div class="platform-section-header">
      <div class="platform-section-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="#ff4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg></div>
      <div><div class="platform-section-title">Reddit</div><div class="platform-section-sub">1 ACCOUNT</div></div>
    </div>
    <div class="channel-grid">
      <a href="https://reddit.com/user/AffanMarvel" target="_blank" class="channel-card rd-card reveal"><div class="channel-card-top"><div class="channel-logo-placeholder" style="background:rgba(255,69,0,.15);color:#ff4500">AM</div><div><div class="channel-name">AffanMarvel</div><div class="channel-handle">u/AffanMarvel</div></div></div><p class="channel-desc">Community discussions, Marvel posts &amp; engaging with the fandom.</p><span class="channel-btn rd-btn">View Profile</span></a>
    </div>
  </div>

'@

# Find the old platform grid block and replace up to </section>
$sectionStart = $content.IndexOf('<div class="platform-grid">')
$sectionEnd = $content.IndexOf('  </section>') + '  </section>'.Length

if ($sectionStart -gt 0 -and $sectionEnd -gt $sectionStart) {
    $before = $content.Substring(0, $sectionStart)
    $after = $content.Substring($sectionEnd)
    $content = $before + $newContent + '</div>' + $after
    [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Done: replaced content from index $sectionStart to $sectionEnd"
} else {
    Write-Host "ERROR: Could not find markers. sectionStart=$sectionStart sectionEnd=$sectionEnd"
}
