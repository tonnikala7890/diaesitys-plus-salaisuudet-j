
    var currentSlide = 1;
    var hasKnife = false;
    var hasRailgun = false;
    var hasStellar = false;
    var hasKey15 = false;
    var unlocked = { 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false };
    var aimMode = false;
    var blastRadius = 350;
    var audioOn = true;
    var audioCtx = null;
    var owlTimer = null;
    var owlCharge = 0;
    var key15Interval = null;
    var key15Seconds = 10;
    var turkeyStareInterval = null;
    var turkeyDistanceCm = 42;
    var pigSparkAnimId = null;
    var pigBoostIntensity = 1;
    var pigRoastedReadyToEat = false;

    var MASSIVE_TRILLION_STR = "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 triljoonaa";

    function updateKey15BadgeUI() {
      var ic = document.getElementById('key15Icon');
      var lb = document.getElementById('key15Label');
      var bd = document.getElementById('badgeKey15');
      if (!ic || !lb || !bd) return;
      if (hasKey15) {
        ic.textContent = '🗝️';
        lb.textContent = 'Avain 15 (Sivu 15 🦃)';
        bd.className = 'pill-btn gold';
      } else {
        ic.textContent = '🔒';
        lb.textContent = 'Avain Sivuun 15';
        bd.className = 'pill-btn';
      }
    }

    window.clickKey15Badge = function() {
      if (hasKey15 && unlocked[15]) {
        window.goToSlide(15);
      } else {
        showToast('🗝️ Laukaisen ☢️ OMEGA-ASE ja klikkaa Pöllön luona 5. nappia: ”Pölli avain 15 sivuun”!');
      }
    };

    var slideNames = {
      1: "Sivu 1: Virallinen kutsukirje (Timin numero +358 44 9854292)",
      2: "Sivu 2: Mikä on O-järjestö? + Tarkkailijakalkkuna",
      3: "Sivu 3: Raportit & Kuukausikokoukset (25.10. & 14.11.2026)",
      4: "Sivu 4: 4K Tonnikala — Klikkaa niin se raivostuu ja murenee!",
      5: "Sivu 5: O.järjestön 11 yhtiötä + Salapaikka (Salainen Veitsi)",
      6: "Sivu 6: iPhone 18 Pro Max (4K Titanium)",
      7: "Sivu 7: Sammen kaviaari (Mustaa kultaa)",
      8: "Sivu 8: Höh öö – Viesti kalkkunan sisältä!",
      9: "Sivu 9: Kattava yhteenveto",
      10: "Sivu 10: Iso kala (Klikkaa veitsellä ▶ Sivu 11)",
      11: "Salainen Sivu 11: Kalkkunan rituaali & 4K Orbital Railgun",
      12: "Salainen Sivu 12: Salainen Kirjasto — Norsu & Stellar Remote",
      13: "Salainen Sivu 13: Pöllöjen Torni (Korjaa ▶ Sivu 14)",
      14: "Salainen Sivu 14: Pöllöjen Kultti — Iso Sali & Klikattavat Salaisuudet",
      15: "Salainen Sivu 15: KALKKUNA TUIJOTTAA (Paina ”🍗 SYÖ SE!” ▶ Sivu 16!)",
      16: "Salainen Sivu 16: POSSU JOLLA ON PIUHAT IRTI (Anna Kvettawatti QW ▶ Syö Possu ▶ Sivu 17!)",
      17: "Salainen Sivu 17: TONNIKALAN PYÖRRE — Tonnikala imee koko diaesityksen pyörteeseen!"
    };

    // High-Resolution 4K Wallpapers per Slide
    var slideWallpapers = {
      1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85",
      2: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=2000&q=85",
      3: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85",
      4: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=85",
      5: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
      6: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=2000&q=85",
      7: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85",
      8: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=2000&q=85",
      9: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85",
      10: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=2000&q=85",
      11: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?auto=format&fit=crop&w=2000&q=85",
      12: "https://images.unsplash.com/photo-1507842229356-51c61504d3ab?auto=format&fit=crop&w=2000&q=85",
      13: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=2000&q=85",
      14: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85",
      15: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=2000&q=85",
      16: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=2000&q=85",
      17: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=85"
    };

    // High-Resolution 4K Wallpapers per Slide
    var slideWallpapers = {
      1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85",
      2: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=2000&q=85",
      3: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85",
      4: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=85",
      5: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
      6: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=2000&q=85",
      7: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85",
      8: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=2000&q=85",
      9: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85",
      10: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=2000&q=85",
      11: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?auto=format&fit=crop&w=2000&q=85",
      12: "https://images.unsplash.com/photo-1507842229356-51c61504d3ab?auto=format&fit=crop&w=2000&q=85",
      13: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=2000&q=85",
      14: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85",
      15: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=2000&q=85",
      16: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=2000&q=85",
      17: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=85"
    };

    function showToast(text) {
      var t = document.getElementById('toastBox');
      if (!t) return;
      t.textContent = text;
      t.style.display = 'block';
      clearTimeout(window._tTimer);
      window._tTimer = setTimeout(function() { t.style.display = 'none'; }, 3600);
    }

    function playSound(f1, f2, dur, wave) {
      if (!audioOn) return;
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AC) audioCtx = new AC();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = wave || 'sawtooth';
        osc.frequency.setValueAtTime(f1, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(Math.max(22, f2), audioCtx.currentTime + dur);
        gain.gain.setValueAtTime(0.24, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
      } catch (e) {}
    }

    function buildDots() {
      var bar = document.getElementById('dotsBar');
      if (!bar) return;
      bar.innerHTML = '';
      for (var i = 1; i <= 17; i++) {
        (function(idx) {
          var b = document.createElement('button');
          var isSec = idx >= 11;
          var isOpen = !isSec || unlocked[idx];
          b.className = 'dot-btn' + (idx === currentSlide ? ' active' : (isSec && isOpen ? ' secret-open' : ''));
          if (idx === 15) {
            b.textContent = isOpen ? '15 🦃' : '15 🔒';
          } else if (idx === 16) {
            b.textContent = isOpen ? '16 🐷⚡' : '16 🐷🔒';
          } else if (idx === 17) {
            b.textContent = isOpen ? '17 🐟🌪️' : '17 🐟🔒';
          } else {
            b.textContent = isSec ? (idx + (isOpen ? ' 🔓' : ' 🔒')) : String(idx);
          }
          b.onclick = function() {
            if (idx === 15 && !unlocked[15]) {
              showToast('🔒 Sivu 15 on lukittu! Pölli avain pimeyden Pöllöltä (5. nappi) ja maksa triljoonalasku!');
              return;
            }
            if (idx === 16 && !unlocked[16]) {
              showToast('🔒 Sivu 16 on lukittu! Mene Sivulle 15 ja paina ”🍗 SYÖ SE! (Syö Kalkkuna)”, niin Pöllö heittää sinut Sivulle 16!');
              return;
            }
            if (idx === 17 && !unlocked[17]) {
              showToast('🔒 Sivu 17 on lukittu! Anna Sivun 16 possulle 1 Kvettawatti (QW) ja klikkaa paistunutta possua syödäksesi sen!');
              return;
            }
            if (isSec && !unlocked[idx]) unlocked[idx] = true;
            window.goToSlide(idx);
          };
          bar.appendChild(b);
        })(i);
      }
    }

    window.goToSlide = function(n) {
      if (n < 1 || n > 17) return;
      clearInterval(owlTimer);
      clearInterval(turkeyStareInterval);
      var tor = document.getElementById('tornadoOverlay');
      if (tor) tor.style.opacity = '1';
      playSound(240, 720, 0.22, 'sine');

      var bgLayer = document.getElementById('dynamicBgLayer');
      if (bgLayer && slideWallpapers[n]) {
        bgLayer.style.backgroundImage = "url('" + slideWallpapers[n] + "')";
      }

      setTimeout(function() {
        for (var i = 1; i <= 17; i++) {
          var el = document.getElementById('slide-' + i);
          if (el) el.classList.toggle('active', i === n);
        }
        currentSlide = n;
        document.getElementById('pageIndicator').textContent = 'Sivu ' + n + ' / 17';
        document.getElementById('topSub').textContent = slideNames[n] || '';
        buildDots();
        if (n === 11) startOwlChargeLoop();
        if (n === 15) startTurkeyStareLoop();
        if (n === 16) startPigSparksLoop();
        if (n === 17) startTunaVortexIdleLoop();
      }, 120);

      setTimeout(function() {
        if (tor) tor.style.opacity = '0';
      }, 320);
    };

    window.nextSlide = function() {
      var nxt = currentSlide + 1;
      if (nxt <= 14) {
        if (nxt >= 11) unlocked[nxt] = true;
        window.goToSlide(nxt);
      } else if (nxt === 15 && unlocked[15]) {
        window.goToSlide(15);
      } else if (nxt === 16 && unlocked[16]) {
        window.goToSlide(16);
      } else if (nxt === 17 && unlocked[17]) {
        window.goToSlide(17);
      } else {
        window.goToSlide(1);
      }
    };

    window.prevSlide = function() {
      if (currentSlide > 1) window.goToSlide(currentSlide - 1);
    };

    window.toggleAudio = function() {
      audioOn = !audioOn;
      document.getElementById('audioIcon').textContent = audioOn ? '🔊' : '🔇';
      showToast(audioOn ? '🔊 4K Äänet päällä' : '🔇 Äänet mykistetty');
    };

    // ==========================================
    // SLIDE 4: 4K REAL PHOTO TUNA SHATTER INTO 48 PHOTO SHARDS
    // ==========================================
    var tunaShattered = false;
    window.clickTuna = function(e) {
      if (e) e.stopPropagation();
      if (tunaShattered) return;
      tunaShattered = true;
      var w = document.getElementById('tunaWrap');
      var st = document.getElementById('tunaStatus');
      w.classList.add('enraged');
      st.textContent = '😡 TONNIKALA RAIVOSTUU!! KOHTA SE MURENEE PALASIKSI!!';
      st.style.color = '#ef4444';
      playSound(190, 45, 0.45, 'sawtooth');

      setTimeout(function() {
        var r = w.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        w.style.opacity = '0';
        w.classList.remove('enraged');
        st.textContent = '💥 POKS! Tonnikala mureni 48 oikeaksi valokuvapalaseksi! Klikkaa ylhäältä ”Kokoa tonnikala”.';
        playSound(130, 25, 0.65, 'square');

        var fx = document.getElementById('orbital-fx-layer');
        for (var i = 0; i < 48; i++) {
          var sh = document.createElement('div');
          sh.className = 'photo-shard';
          var sw = 28 + Math.random() * 36;
          var shh = 24 + Math.random() * 32;
          sh.style.width = sw + 'px';
          sh.style.height = shh + 'px';
          sh.style.left = cx + 'px';
          sh.style.top = cy + 'px';
          sh.style.backgroundPosition = (-Math.floor(Math.random() * 260)) + 'px ' + (-Math.floor(Math.random() * 160)) + 'px';
          fx.appendChild(sh);
          var ang = Math.random() * Math.PI * 2;
          var dist = 80 + Math.random() * 360;
          sh.animate([
            { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + (Math.cos(ang)*dist) + 'px), calc(-50% + ' + (Math.sin(ang)*dist) + 'px)) scale(0.1) rotate(' + ((Math.random()-0.5)*720) + 'deg)', opacity: 0 }
          ], { duration: 920, fill: 'forwards' });
          setTimeout(function(el) { try { el.remove(); } catch (err) {} }, 960, sh);
        }
      }, 680);
    };

    window.resetTuna = function(e) {
      if (e) e.stopPropagation();
      tunaShattered = false;
      var w = document.getElementById('tunaWrap');
      var st = document.getElementById('tunaStatus');
      w.style.opacity = '1';
      w.classList.remove('enraged');
      st.textContent = '👆 KLIKKAA TONNIKALAA! Se raivostuu ja murenee 48 oikeaksi valokuvapalaseksi!';
      st.style.color = '#67e8f9';
    };

    // ==========================================
    // SLIDE 5 & 10: SECRET KNIFE & GIANT FISH
    // ==========================================
    window.findKnife = function() {
      hasKnife = true;
      unlocked[11] = true;
      playSound(340, 980, 0.35, 'triangle');
      document.getElementById('knifeIcon').textContent = '🔪';
      document.getElementById('knifeLabel').textContent = 'Veitsi VALMIS!';
      document.getElementById('badgeKnife').className = 'pill-btn gold';
      document.getElementById('knifeBoxTitle').textContent = '🔪 Salainen Veitsi löydetty!';
      document.getElementById('knifeBoxSub').textContent = 'Mene nyt Sivulle 10 ja klikkaa Isoa Kalaa!';
      var fk = document.getElementById('fishKnifeStatus');
      if (fk) {
        fk.textContent = '🔪 Veitsi mukana: Klikkaa Isoa Kalaa ▶ Sivu 11!';
        fk.className = 'pill-btn emerald';
      }
      buildDots();
      showToast('🔪 LÖYSIT SALAISEN VEITSEN! Klikkaa nyt Sivun 10 Isoa Kalaa!');
    };

    window.clickKnifeBadge = function() {
      if (!hasKnife) window.findKnife();
      window.goToSlide(5);
    };

    window.clickGiantFish = function() {
      if (!hasKnife) {
        playSound(110, 25, 0.7, 'sawtooth');
        showDeathModal('🦈🦷', 'ISO KALA SÖI SINUT! LOPPU!', 'Klikkasit Isoa Kalaa ilman Sivun 5 salapaikan veistä!', '💡 Vinkki: Hae Veitsi Sivulta 5 (tai klikkaa yläpalkin Veitsi-nappia) ja klikkaa kalaa uudelleen!');
      } else {
        unlocked[11] = true;
        playSound(380, 1120, 0.4, 'triangle');
        showToast('🔪 KUKISTIT ISON KALAN VEITSELLÄ! Salainen Sivu 11 avautuu!');
        window.goToSlide(11);
      }
    };

    // ==========================================
    // SLIDE 11: TURKEY RITUAL & 4K ORBITAL RAILGUN
    // ==========================================
    function startOwlChargeLoop() {
      clearInterval(owlTimer);
      owlCharge = 0;
      var txt = document.getElementById('owlChargeText');
      var fill = document.getElementById('owlChargeFill');
      owlTimer = setInterval(function() {
        if (currentSlide !== 11 || hasRailgun) { clearInterval(owlTimer); return; }
        owlCharge += 4;
        if (txt) txt.textContent = 'Lataus: ' + owlCharge + '%';
        if (fill) fill.style.width = owlCharge + '%';
        if (owlCharge >= 100) {
          clearInterval(owlTimer);
          spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, blastRadius);
          setTimeout(function() {
            showDeathModal('🦉🛰️', 'KUOLIT! (Orbital Railgun Mod)', 'Pöllö ampui sinua avaruudesta 4K Orbital Railgunilla!', '💡 Vinkki: Klikkaa Pöllöä ennen kuin lataus saavuttaa 100%, niin kaappaat Orbital Railgunin itsellesi!');
          }, 820);
        }
      }, 220);
    }

    window.clickOwl = function(e) {
      if (e) e.stopPropagation();
      clearInterval(owlTimer);
      hasRailgun = true;
      playSound(320, 1240, 0.4, 'triangle');
      document.getElementById('railgunIcon').textContent = '🛰️';
      document.getElementById('railgunLabel').textContent = 'Orbital Railgun VALMIS!';
      document.getElementById('badgeRailgun').className = 'pill-btn cyan';
      document.getElementById('weaponBar').classList.add('open');
      document.getElementById('s11Status').textContent = '✅ KAAPPASIT 4K ORBITAL RAILGUNIN! Klikkaa nyt vasemmanpuoleista Kalkkunaa ampuaksesi sitä kesken rituaalin ▶ Sivu 12!';
      showToast('🛰️ SAIT 4K ORBITAL RAILGUNIN! Voit ampua dioja oikealla hiirellä tai yläpalkin napista!');
    };

    window.clickRailgunBadge = function() {
      if (!hasRailgun) window.clickOwl();
      else document.getElementById('weaponBar').classList.toggle('open');
    };

    window.shootTurkey = function(e) {
      if (e) e.stopPropagation();
      if (!hasRailgun) window.clickOwl();
      unlocked[12] = true;
      spawnOrbitalBeamFX(window.innerWidth / 3, window.innerHeight / 2, blastRadius);
      showToast('🌌 AMMUIT KALKKUNAN KESKEN RITUAALIN! Salainen Sivu 12 (Salainen Kirjasto) avautuu!');
      setTimeout(function() { window.goToSlide(12); }, 820);
    };

    // ==========================================
    // 4K ORBITAL RAILGUN, BLAST HOLES & STELLAR REMOTE
    // ==========================================
    window.updateBlastRadius = function(v) {
      blastRadius = parseInt(v, 10) || 350;
      document.getElementById('radiusLabel').textContent = blastRadius + ' px';
    };

    window.toggleAimMode = function() {
      if (!hasRailgun) window.clickOwl();
      aimMode = !aimMode;
      document.body.classList.toggle('aim-mode', aimMode);
      document.getElementById('aimToggleBtn').textContent = aimMode ? '🎯 TÄHTÄYS PÄÄLLÄ (Klikkaa kohdetta!)' : '🎯 Tähtää & Ammu (tai Oikea hiiri)';
    };

    function spawnParticles(cx, cy, colors, count, maxDist) {
      var fx = document.getElementById('orbital-fx-layer');
      if (!fx) return;
      for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        var sz = 10 + Math.random() * 24;
        var poly = i % 2 === 0
          ? 'polygon(18% 0%, 88% 8%, 100% 74%, 64% 100%, 8% 84%, 0% 26%)'
          : 'polygon(10% 12%, 92% 0%, 86% 90%, 15% 100%)';
        p.style.cssText = 'position:fixed;width:' + sz + 'px;height:' + sz + 'px;left:' + cx + 'px;top:' + cy + 'px;background:' + colors[i % colors.length] + ';clip-path:' + poly + ';pointer-events:none;box-shadow:inset -3px -3px 6px rgba(0,0,0,0.65), 0 0 12px ' + colors[0] + ';';
        fx.appendChild(p);
        var ang = Math.random() * Math.PI * 2;
        var d = 40 + Math.random() * maxDist;
        var tx = Math.cos(ang) * d;
        var ty = Math.sin(ang) * d * 0.65;
        var fallY = ty + 180 + Math.random() * 240;
        var rot = (Math.random() - 0.5) * 920;
        p.animate([
          { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1 },
          { transform: 'translate(calc(-50% + ' + (tx * 0.6) + 'px), calc(-50% + ' + (ty - 45) + 'px)) scale(0.95) rotate(' + (rot * 0.45) + 'deg)', opacity: 0.95, offset: 0.35 },
          { transform: 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + fallY + 'px)) scale(0.15) rotate(' + rot + 'deg)', opacity: 0 }
        ], { duration: 920 + Math.random() * 380, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' });
        setTimeout(function(el) { try { el.remove(); } catch (err) {} }, 1350, p);
      }
    }

    function spawnOrbitalBeamFX(x, y, rad) {
      playSound(240, 26, 0.9, 'sawtooth');
      var body = document.getElementById('appBody');
      body.classList.add('quake');
      setTimeout(function() { body.classList.remove('quake'); }, 600);

      var fx = document.getElementById('orbital-fx-layer');
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:56;';
      fx.appendChild(wrap);
      setTimeout(function() { try { wrap.remove(); } catch (e) {} }, 880);

      var bw = Math.max(50, Math.round(rad * 0.38));
      var beam = document.createElement('div');
      beam.style.cssText = 'position:absolute;top:0;bottom:0;left:' + x + 'px;width:' + bw + 'px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,#ef4444,#38bdf8,#ffffff,#38bdf8,#ef4444,transparent);box-shadow:0 0 75px #38bdf8,0 0 130px #ef4444;';
      wrap.appendChild(beam);
      beam.animate([
        { opacity: 0, transform: 'translateX(-50%) scaleX(0.1)' },
        { opacity: 1, transform: 'translateX(-50%) scaleX(1.3)', offset: 0.2 },
        { opacity: 0, transform: 'translateX(-50%) scaleX(0.02)' }
      ], { duration: 840, fill: 'forwards' });

      var ring = document.createElement('div');
      ring.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + (rad*1.8) + 'px;height:' + (rad*1.8) + 'px;transform:translate(-50%,-50%);border-radius:50%;border:5px solid #fde047;box-shadow:0 0 50px #38bdf8;';
      wrap.appendChild(ring);
      ring.animate([
        { opacity: 1, transform: 'translate(-50%,-50%) scale(0.08)' },
        { opacity: 0, transform: 'translate(-50%,-50%) scale(1.06)' }
      ], { duration: 800, fill: 'forwards' });

      spawnParticles(x, y, ['#38bdf8', '#ffffff', '#ef4444', '#fde047'], 34, rad);

      var holes = document.getElementById('holesLayer');
      if (holes && currentSlide !== 14) {
        var h = document.createElement('div');
        h.className = 'blast-hole';
        var hSize = Math.max(50, Math.min(170, Math.round(rad * 0.35)));
        h.style.width = hSize + 'px';
        h.style.height = hSize + 'px';
        h.style.left = x + 'px';
        h.style.top = y + 'px';
        holes.appendChild(h);
      }

      var slideEl = document.getElementById('slide-' + currentSlide);
      if (slideEl) {
        slideEl.querySelectorAll('.destructible').forEach(function(card) {
          var r = card.getBoundingClientRect();
          var dist = Math.hypot((r.left + r.width/2) - x, (r.top + r.height/2) - y);
          if (dist <= rad * 1.15) {
            card.classList.add('orbital-damaged');
            var dx = ((Math.random() - 0.5) * 32).toFixed(1);
            var dy = (6 + Math.random() * 20).toFixed(1);
            var rot = ((Math.random() - 0.5) * 12).toFixed(1);
            card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rot + 'deg)';
          }
        });
      }
    }

    window.fireOrbitalBtn = function() {
      if (currentSlide === 11) { window.shootTurkey(); return; }
      if (currentSlide === 13) { window.shootOwlTower(); return; }
      if (currentSlide === 14) { window.shoot3D(); return; }
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, blastRadius);
    };

    window.addEventListener('contextmenu', function(e) {
      if (!hasRailgun || currentSlide === 14) return;
      e.preventDefault();
      spawnOrbitalBeamFX(e.clientX, e.clientY, blastRadius);
    });

    window.addEventListener('click', function(e) {
      if (!aimMode) return;
      if (e.target.closest('header') || e.target.closest('footer')) return;
      e.stopPropagation();
      aimMode = false;
      document.body.classList.remove('aim-mode');
      document.getElementById('aimToggleBtn').textContent = '🎯 Tähtää & Ammu (tai Oikea hiiri)';
      spawnOrbitalBeamFX(e.clientX, e.clientY, blastRadius);
    }, true);

    // ==========================================
    // SLIDE 12: ELEPHANT & STELLAR REMOTE
    // ==========================================
    window.stealStellarRemote = function(e) {
      if (e) e.stopPropagation();
      hasRailgun = true;
      hasStellar = true;
      unlocked[13] = true;
      playSound(420, 1380, 0.4, 'triangle');
      document.getElementById('stellarIcon').textContent = '📡';
      document.getElementById('stellarLabel').textContent = 'Stellar Remote VALMIS!';
      document.getElementById('badgeStellar').className = 'pill-btn purple';
      document.getElementById('weaponBar').classList.add('open');
      buildDots();
      showToast('📡 VARASTIT NORSUN STELLAR REMOTEN! Maailmankaikkeuden Salaisin Sivu 13 (Pöllöjen Torni) avautuu!');
      setTimeout(function() { window.goToSlide(13); }, 680);
    };

    window.clickStellarBadge = function() {
      if (!hasStellar) window.stealStellarRemote();
      else document.getElementById('weaponBar').classList.toggle('open');
    };

    window.elephantAttack = function() {
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, 500);
      setTimeout(function() {
        showDeathModal('🐘🕳️', 'KUOLIT! (Gravitia SS6 • Shooting Star Mod)', 'Kosminen Norsu imaisi sinut Gravitia SS6 -mustaan aukkoon!', '💡 Vinkki: Klikkaa ”Varasta Norsun Stellar Remote” päästäksesi Sivulle 13!');
      }, 820);
    };

    window.fireStellarPower = function(type) {
      if (currentSlide === 13) { window.shootOwlTower(); return; }
      if (currentSlide === 14) { window.set3DWeapon(2); window.shoot3D(); return; }
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, type === 'supernova' ? 650 : blastRadius);
      showToast('📡 STELLAR REMOTE: ' + type.toUpperCase() + ' laukaistu!');
    };

    // ==========================================
    // STELLAR REMOTE: "KORJAUS" -> UNLOCKS SLIDE 14 ON SLIDE 13
    // ==========================================
    window.triggerRepairAll = function() {
      playSound(320, 1280, 0.5, 'sine');
      var fx = document.getElementById('orbital-fx-layer');
      var wave = document.createElement('div');
      wave.style.cssText = 'position:fixed;left:50%;top:50%;width:90px;height:90px;transform:translate(-50%,-50%);border-radius:50%;border:6px solid #10b981;background:radial-gradient(circle,rgba(16,185,129,0.38),transparent 70%);box-shadow:0 0 80px #10b981;pointer-events:none;';
      fx.appendChild(wave);
      wave.animate([
        { transform: 'translate(-50%,-50%) scale(0.2)', opacity: 1 },
        { transform: 'translate(-50%,-50%) scale(24)', opacity: 0 }
      ], { duration: 780, fill: 'forwards' });
      setTimeout(function() { try { wave.remove(); } catch (e) {} }, 820);

      var holes = document.getElementById('holesLayer');
      if (holes) holes.innerHTML = '';

      document.querySelectorAll('.orbital-damaged').forEach(function(el) {
        el.classList.remove('orbital-damaged');
        el.style.transform = '';
      });

      if (currentSlide === 13) {
        unlocked[14] = true;
        var tb = document.getElementById('towerBanner');
        if (tb) {
          tb.style.background = '#10b981';
          tb.textContent = '✨ PÖLLÖTORNI KORJATTU! PORTTI FOTOREALISTISEEN 3D PÖLLÖJEN LINNAAN (SIVU 14) AUKEAA! ✨';
        }
        buildDots();
        showToast('🏰✨ KORJASIT PÖLLÖTORNIN! Salainen Sivu 14 (Fotorealistinen 3D Pöllöjen Linna) avautuu!');
        setTimeout(function() { window.goToSlide(14); }, 850);
        return;
      }

      if (currentSlide === 14) {
        window.repair3DHall();
        return;
      }

      showToast('🛠️✨ KORJAUS VALMIS: Kaikki ammutut reiät ja diat on korjattu!');
    };

    window.shootOwlTower = function() {
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, 480);
      var img = document.getElementById('towerOwlImg');
      if (img) img.style.transform = 'scale(2.4) rotate(12deg)';
      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var glass = document.createElement('div');
        glass.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:88;background:radial-gradient(circle,rgba(255,255,255,0.85) 0%,rgba(56,189,248,0.35) 35%,transparent 75%);';
        glass.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none"><g stroke="#ffffff" stroke-width="3" opacity="0.9"><line x1="500" y1="300" x2="80" y2="20"/><line x1="500" y1="300" x2="920" y2="40"/><line x1="500" y1="300" x2="960" y2="550"/><line x1="500" y1="300" x2="50" y2="560"/><polygon points="420,240 580,230 620,360 440,380" fill="none" stroke="#38bdf8" stroke-width="2.5"/></g></svg>';
        fx.appendChild(glass);
        setTimeout(function() { try { glass.remove(); } catch (e) {} }, 1150);
      }
      setTimeout(function() {
        if (img) img.style.transform = 'scale(1)';
        showDeathModal(
          '🦉🦶💥',
          'PÖLLÖ POTKAISI SINUT ULOS VERKKOSIVULTA! (4K)',
          'Ammuit Pöllöjen Tornia kesken korjaustöiden (”SIVUSTO KORJAUKSESSA”), joten raivostunut Pöllö särki ruutusi lasin ja potkaisi sinut ulos koko sivustolta!',
          '💡 Vinkki: Paina Sivulla 13 vihreää ”🛠️ KORJAUS” -nappia, niin korjaat tornin ja pääset Sivun 14 Fotorealistiseen 3D Pöllöjen Linnaan!'
        );
      }, 820);
    };

    function showDeathModal(icon, heading, reason, tip) {
      document.getElementById('deathIcon').textContent = icon;
      document.getElementById('deathHeading').textContent = heading;
      document.getElementById('deathReason').textContent = reason;
      document.getElementById('deathTip').textContent = tip;
      document.getElementById('deathModal').classList.add('show');
    }

    window.respawnPlayer = function(targetSlide) {
      document.getElementById('deathModal').classList.remove('show');
      window.goToSlide(targetSlide || 1);
    };

    window.open3DGameDirectly = function() {
      hasKnife = true;
      hasRailgun = true;
      hasStellar = true;
      unlocked[11] = true; unlocked[12] = true; unlocked[13] = true; unlocked[14] = true;
      buildDots();
      showToast('🦉 Tervetuloa Sivulle 14: Pöllöjen Kultin Isoon Saliin! Klikkaa pöllöjä, alttaria ja 5 salaisuutta!');
      window.goToSlide(14);
    };

    // ============================================================================
    // SLIDE 14: CLASSIC CLICKABLE 4K OWL CULT GREAT HALL ("ISO SALI & KLIKATTAVAT HOMMAT")
    // ============================================================================
    var cultState = {
      owlsClicked: {},
      secretsClicked: {},
      altarLit: false
    };

    var cultOwlsData = {
      1: {
        name: "👑 Suurmestari Ylipöllö",
        role: "PÖLLÖJEN KULTIN KORKEIN JOHTAJA • VALTAISTUIN",
        photo: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?auto=format&fit=crop&w=1200&q=85",
        text: "”HUU-HUU! Korjasit Pöllötornin Stellar Remotella, joten toivotan sinut tervetulleeksi Isoon Saliin! Klikkaa kaikkia 6 pöllöä ja tutki salin 5 salaisuutta, niin kruunaan sinut kulttimme Suurmestariksi!”"
      },
      2: {
        name: "📐 Arkkitehtipöllö",
        role: "ISON SALIN & SALAKÄYTÄVIEN RAKENTAJA",
        photo: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1200&q=85",
        text: "”Suunnittelin tämän Ison Salin marmoripylväät ja kultaisen holvin! Vinkki: Länsiseinän soihtuvivusta (#4) aukeaa salainen katakombikäytävä!”"
      },
      3: {
        name: "🛰️ Railgun-Komentajapöllö",
        role: "ORBITAL RAILGUN MK-X -ASEMESTARI",
        photo: "https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&w=1200&q=85",
        text: "”HUU! Kaappasit Orbital Railgunin Sivulla 11 kuin todellinen mestari! Kun aktivoit Itäholvin Kultaisen Tonnikalapatsaan (#2), aseesi päivittyy täyteen kultaiseen tehoon!”"
      },
      4: {
        name: "🔭 Tähtipöllö",
        role: "KOSMISEN TÄHTITORNIN VARTIJA",
        photo: "https://images.unsplash.com/photo-1553264701-d138db4fd5d4?auto=format&fit=crop&w=1200&q=85",
        text: "”Tähtitornista seuraamme Norsun Gravitia SS6 -mustia aukkoja ja tähdenlentoja! Muista tutkia myös Alttarin Kosminen Kruunumuna (#3)!”"
      },
      5: {
        name: "📜 Raporttipöllö",
        role: "O.ADMINISTRATION & RAPORTTIARKISTON YLIVARTIJA",
        photo: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
        text: "”Kirjaan kaikki O-järjestön 11 yhtiön raportit ja kuukausikokoukset (25.10. ja 14.11.2026) kultaisiin kirjoihin! Muista aina lukea pienellä printattu teksti!”"
      },
      6: {
        name: "🎶 Pöllökuoro",
        role: "ISON SALIN 4K HARMONIAKUORO",
        photo: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?auto=format&fit=crop&w=1200&q=85",
        text: "”HUU-HUU-HUUUUU! 🎶 Kun klikkaat meitä tai yläpalkin Pöllökuoron Rituaali -nappia, koko Iso Sali täyttyy kultaisesta pöllöharmoniasta!”"
      }
    };

    var cultSecretsData = {
      1: {
        title: "🪨 Salaisuus #1: Muinaisen Pöllön Riimukivi",
        text: "Tulkitset pohjoispylvään kultaiset riimut: ”Kun Timin numeroon +358 44 9854292 soitetaan ja pienellä printattu teksti luetaan, O-järjestö kukoistaa ikuisesti!”"
      },
      2: {
        title: "🐟 Salaisuus #2: Kultainen Tonnikalapatsas",
        text: "Aktivoit Tuna Studiosin Kultaisen Tonnikalapatsaan! Sen silmät välähtävät smaragdinvihreinä ja Orbital Railgunisi saa kultaisen ylilatauksen!"
      },
      3: {
        title: "🥚 Salaisuus #3: Kosminen Kruunumuna",
        text: "Avasit Kultaisen Alttarin salalokeron! Sisältä paljastuu hohtava Kosminen Kruunumuna, joka säteilee tähtipölyä koko Isoon Saliin!"
      },
      4: {
        title: "🕯️ Salaisuus #4: Salainen Katakombivipu",
        text: "Vedit länsiseinän soihtuvipua! Marmoriseinä liukuu sivuun ja paljastaa Pöllöjen Kultin maanalaisen aarrekryptan!"
      },
      5: {
        title: "👑 Salaisuus #5: Ylipöllön Kruunaus & Kulttisinetti",
        text: "Suurmestari Ylipöllö laskee kultaisen pöllökruunun päähäsi ja luovuttaa sinulle O-järjestön Korkeimman Kulttisinetin!"
      }
    };

    function updateSlide14Counters() {
      var oCount = Object.keys(cultState.owlsClicked).length;
      var sCount = Object.keys(cultState.secretsClicked).length;
      var ob = document.getElementById('s14OwlBadge');
      if (ob) ob.textContent = '🦉 Pöllöt: ' + oCount + ' / 6';
      var sb = document.getElementById('s14SecretBadge');
      if (sb) sb.textContent = '🔍 Salaisuudet: ' + sCount + ' / 5';
    }

    window.clickCultOwl = function(id) {
      var d = cultOwlsData[id];
      if (!d) return;
      cultState.owlsClicked[id] = true;
      var card = document.getElementById('cultOwlCard' + id);
      if (card) card.classList.add('activated');

      playSound(280 + id * 55, 760 + id * 80, 0.35, 'triangle');
      if (id === 6) playHarpChord([392.00, 493.88, 587.33, 783.99]);

      document.getElementById('cultSpeakerRole').textContent = d.role;
      document.getElementById('cultSpeakerStatus').textContent = '✅ Pöllö #' + id + ' jututettu!';
      document.getElementById('cultSpeakerName').textContent = d.name;
      document.getElementById('cultSpeakerText').textContent = d.text;

      var photo = document.getElementById('cultMainPhoto');
      if (photo) photo.src = d.photo;
      var cap = document.getElementById('cultMainCaption');
      if (cap) cap.textContent = d.name + ' — ' + d.role;

      updateSlide14Counters();
      showToast('🦉 ' + d.name + ' vastasi sinulle Isossa Salissa!');
    };

    window.clickCultGoldenAltar = function() {
      cultState.altarLit = true;
      var card = document.getElementById('cultAltarCard');
      if (card) card.classList.add('activated');
      playHarpChord([523.25, 659.25, 783.99, 1046.50]);
      spawnParticles(window.innerWidth / 2, window.innerHeight / 2, ['#fde047', '#f59e0b', '#34d399', '#38bdf8'], 42, 320);

      document.getElementById('cultSpeakerRole').textContent = '🏛️🔥 ISON SALIN KESKUS • KULTAINEN ALTTARI';
      document.getElementById('cultSpeakerStatus').textContent = '🔥 Alttarin Pyhä Liekki Sytytetty!';
      document.getElementById('cultSpeakerName').textContent = '🏛️ Kultainen Alttari & Pyhä Tornado';
      document.getElementById('cultSpeakerText').textContent = 'Sytytit Ison Salin Kultaisen Alttarin! Kultainen valoaalto pyyhkäisee marmoripylväiden läpi ja kaikki 6 pöllöä kumartavat sinulle!';
      showToast('🏛️🔥 Sytytit Ison Salin Kultaisen Alttarin!');
    };

    window.clickCultSecret = function(id) {
      var s = cultSecretsData[id];
      if (!s) return;
      cultState.secretsClicked[id] = true;
      var row = document.getElementById('cultSec' + id);
      if (row) row.classList.add('activated');
      var tag = document.getElementById('cultSecTag' + id);
      if (tag) {
        tag.className = 'pill-btn emerald';
        tag.textContent = '✅ Löydetty';
      }

      playHarpChord([440, 554.37, 659.25, 880]);
      spawnParticles(window.innerWidth * 0.65, window.innerHeight * 0.55, ['#fde047', '#10b981', '#38bdf8'], 32, 260);

      document.getElementById('cultSpeakerRole').textContent = '🔍 ISON SALIN SALAISUUS #' + id + ' PALJASTETTU';
      document.getElementById('cultSpeakerStatus').textContent = '✨ Salaisuus ' + Object.keys(cultState.secretsClicked).length + ' / 5';
      document.getElementById('cultSpeakerName').textContent = s.title;
      document.getElementById('cultSpeakerText').textContent = s.text;

      updateSlide14Counters();
      showToast('🔍 Löysit Ison Salin salaisuuden: ' + s.title);
    };

    window.unlockAllCultSecrets = function() {
      for (var i = 1; i <= 6; i++) {
        cultState.owlsClicked[i] = true;
        var oc = document.getElementById('cultOwlCard' + i);
        if (oc) oc.classList.add('activated');
      }
      for (var k = 1; k <= 5; k++) {
        cultState.secretsClicked[k] = true;
        var sc = document.getElementById('cultSec' + k);
        if (sc) sc.classList.add('activated');
        var tg = document.getElementById('cultSecTag' + k);
        if (tg) { tg.className = 'pill-btn emerald'; tg.textContent = '✅ Löydetty'; }
      }
      window.clickCultGoldenAltar();
      updateSlide14Counters();
      showToast('👑 Kaikki 6 Pöllöä ja 5 Salaisuutta aktivoitu Isossa Salissa!');
    };

    window.clickCultChoirRitual = function() {
      playHarpChord([261.63, 329.63, 392.00, 523.25, 659.25, 783.99]);
      spawnParticles(window.innerWidth / 2, window.innerHeight / 2, ['#e879f9', '#fde047', '#38bdf8'], 50, 380);
      window.clickCultOwl(6);
    };

    window.clickCultGrandCoronation = function() {
      window.clickCultSecret(5);
      window.clickCultOwl(1);
    };

    window.repair3DHall = function() {
      playSound(320, 1180, 0.45, 'sine');
      showToast('🛠️✨ Pöllöjen Kultin Iso Sali on täydessä 4K-kunnossa!');
    };

    window.shoot3D = function() {
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, blastRadius);
    };

    window.set3DWeapon = function() {};

    window.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') window.nextSlide();
      else if (e.key === 'ArrowLeft') window.prevSlide();
    });

    // =========================================================================
    // FORBIDDEN DOOMSDAY WEAPON (☢️ OMEGA-ASE), 4K CRUMBLING DISINTEGRATION,
    // PITCH-BLACK DARKNESS, "🔫 AMMU PÖLLÖÄ", "💵 VÄÄRENNETYT MASSIT" & 4K REPAIR
    // =========================================================================
    var fakeMoneyInterval = null;
    var fakeMoneySeconds = 8;

    function resetDarknessOwlInvoiceUI() {
      clearInterval(fakeMoneyInterval);
      clearInterval(key15Interval);
      var stamp = document.getElementById('owlPaidStamp');
      if (stamp) {
        stamp.className = 'paid-stamp';
        stamp.textContent = 'HYVÄKSYTTY ✅';
      }
      var card = document.getElementById('owlSpotlightCard');
      if (card) card.classList.remove('thrown-by-owl');
      var laser = document.getElementById('owlLaserSight');
      if (laser) laser.style.display = 'none';
      var redEyes = document.getElementById('owlRedEyesOverlay');
      if (redEyes) redEyes.style.display = 'none';
      var topTag = document.getElementById('darknessTopTag');
      if (topTag) {
        topTag.style.color = '#fde047';
        topTag.textContent = '🌑 SIVUSTO MURENNETTU PALASIKSI • JÄLJELLÄ VAIN TÄYDELLINEN PIMEYS 🌑';
      }
      var title = document.getElementById('darknessOwlTitle');
      if (title) {
        title.className = '';
        title.style.fontSize = '24px';
        title.textContent = '🦉 ”HUU! Varoitin sinua! Koko sivusto mureni palasiksi!”';
      }
      var desc = document.getElementById('darknessOwlDesc');
      if (desc) {
        desc.innerHTML = 'Ammuit Tuomion Omega-Aseella ja murskasit koko O-järjestön 4K-sivuston kivisirpaleiksi ja tuhkaksi. Täällä pimeydessä ei ole enää yhtäkään diaa jäljellä – ellet maksa virallista <strong>Pöllöjen Korjauslaskua</strong>!';
      }
      var invNum = document.getElementById('invoiceNumberTitle');
      if (invNum) invNum.textContent = '🧾 PÖLLÖJEN KORJAUSLASKU #404-OMEGA';
      var r1 = document.getElementById('invRow1Price');
      if (r1) r1.textContent = '499,99 €';
      var r2 = document.getElementById('invRow2Price');
      if (r2) r2.textContent = '400,00 €';
      var r3L = document.getElementById('invRow3Label');
      if (r3L) r3L.textContent = '• Yöpöllön hätäpäivystyslisä pimeydessä:';
      var r3P = document.getElementById('invRow3Price');
      if (r3P) {
        r3P.style.color = '#e2e8f0';
        r3P.textContent = '100,00 €';
      }
      var tot = document.getElementById('invTotalAmount');
      if (tot) {
        tot.style.color = '#34d399';
        tot.textContent = '999,99 € (tai 1 Kultainen Tonnikala & Kaviaari)';
      }
      var normBtns = document.getElementById('owlNormalButtons');
      if (normBtns) normBtns.style.display = 'flex';
      var penBtns = document.getElementById('owlPenaltyButtons');
      if (penBtns) penBtns.style.display = 'none';
      var fakeBtns = document.getElementById('owlFakeMoneyButtons');
      if (fakeBtns) fakeBtns.style.display = 'none';
      var keyBtns = document.getElementById('owlKey15Buttons');
      if (keyBtns) keyBtns.style.display = 'none';
    }

    window.openOmegaWarningModal = function() {
      playSound(160, 55, 0.4, 'sawtooth');
      var m = document.getElementById('omegaWarningModal');
      if (m) m.classList.add('show');
    };

    window.closeOmegaWarningModal = function() {
      var m = document.getElementById('omegaWarningModal');
      if (m) m.classList.remove('show');
    };

    window.confirmOmegaDoomsday = function() {
      var m = document.getElementById('omegaWarningModal');
      if (m) m.classList.remove('show');

      resetDarknessOwlInvoiceUI();

      // Deep multi-stage crumbling earthquake sound
      playSound(240, 22, 1.55, 'sawtooth');
      setTimeout(function() { playSound(95, 16, 1.35, 'triangle'); }, 220);
      setTimeout(function() { playSound(68, 14, 1.15, 'square'); }, 540);

      var body = document.getElementById('appBody');
      if (body) body.classList.add('quake');

      var activeSlide = document.getElementById('slide-' + currentSlide);
      if (activeSlide) activeSlide.classList.add('crumbling-collapse');

      var fx = document.getElementById('orbital-fx-layer');

      // Stage 1: Glowing Golden, Cyan & Crimson Fracture Cracks Across Viewport
      var cracks = document.createElement('div');
      cracks.style.cssText = 'position:fixed;inset:0;z-index:191;pointer-events:none;filter:drop-shadow(0 0 18px #fde047);';
      cracks.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="none">' +
        '<g stroke="#fde047" stroke-width="3.5" opacity="0.96">' +
        '<path d="M600,350 L420,180 L210,120 L40,20" fill="none"/>' +
        '<path d="M600,350 L780,190 L980,95 L1180,15" fill="none"/>' +
        '<path d="M600,350 L820,460 L1040,590 L1190,685" fill="none"/>' +
        '<path d="M600,350 L380,490 L170,610 L15,690" fill="none"/>' +
        '<path d="M420,180 L540,40 M780,190 L690,25 M380,490 L520,685 M820,460 L680,690" fill="none" stroke="#38bdf8" stroke-width="2.5"/>' +
        '<polygon points="460,250 740,235 810,455 410,475" fill="none" stroke="#ef4444" stroke-width="4"/>' +
        '</g></svg>';
      fx.appendChild(cracks);

      // Stage 2: 155 3D-shaded crystalline, gold, obsidian & ember shards tumbling under gravity
      var W = window.innerWidth;
      var H = window.innerHeight;
      var cols = [
        'linear-gradient(135deg,#fde047,#b45309)',
        'linear-gradient(135deg,#38bdf8,#0f172a)',
        'linear-gradient(135deg,#475569,#020617)',
        'linear-gradient(135deg,#ef4444,#450a0a)',
        'linear-gradient(135deg,#a855f7,#1e1b4b)',
        'linear-gradient(135deg,#334155,#090d18)'
      ];
      var shapes = [
        'polygon(14% 0%, 86% 6%, 100% 68%, 72% 100%, 12% 92%, 0% 34%)',
        'polygon(6% 18%, 92% 0%, 100% 82%, 48% 100%, 0% 74%)',
        'polygon(24% 0%, 100% 22%, 84% 100%, 0% 88%)',
        'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
      ];

      for (var i = 0; i < 155; i++) {
        var chunk = document.createElement('div');
        var isEmber = i % 5 === 0;
        var cw = isEmber ? (8 + Math.random() * 14) : (26 + Math.random() * 76);
        var ch = isEmber ? cw : (22 + Math.random() * 68);
        var sx = (W * 0.04) + Math.random() * (W * 0.92);
        var sy = (H * 0.04) + Math.random() * (H * 0.88);
        chunk.style.cssText =
          'position:fixed;z-index:193;pointer-events:none;width:' + cw + 'px;height:' + ch + 'px;' +
          'left:' + sx + 'px;top:' + sy + 'px;background:' + (isEmber ? '#fde047' : cols[i % cols.length]) + ';' +
          (isEmber ? 'border-radius:50%;box-shadow:0 0 22px #fde047,0 0 40px #ef4444;' :
            'clip-path:' + shapes[i % shapes.length] + ';border:1px solid rgba(253,224,71,0.55);box-shadow:inset -5px -5px 12px rgba(0,0,0,0.85), 0 14px 28px rgba(0,0,0,0.92);');
        fx.appendChild(chunk);

        var driftX = (Math.random() - 0.5) * 340;
        var popY = -30 - Math.random() * 85;
        var dropY = H - sy + 200 + Math.random() * 360;
        var rotZ = (Math.random() - 0.5) * 860;
        var delay = Math.random() * 310;

        chunk.animate([
          { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1 },
          { transform: 'translate(calc(-50% + ' + (driftX * 0.35) + 'px), calc(-50% + ' + popY + 'px)) scale(1.06) rotate(' + (rotZ * 0.3) + 'deg)', opacity: 1, offset: 0.24 },
          { transform: 'translate(calc(-50% + ' + driftX + 'px), calc(-50% + ' + dropY + 'px)) scale(0.18) rotate(' + rotZ + 'deg)', opacity: 0 }
        ], {
          duration: 1120 + Math.random() * 520,
          delay: delay,
          easing: 'cubic-bezier(0.45, 0.02, 0.75, 0.35)',
          fill: 'forwards'
        });

        setTimeout(function(el) { try { el.remove(); } catch (err) {} }, 1750, chunk);
      }

      setTimeout(function() {
        try { cracks.remove(); } catch (e) {}
        if (body) body.classList.remove('quake');
        if (activeSlide) activeSlide.classList.remove('crumbling-collapse');
        var dark = document.getElementById('omegaDarknessOverlay');
        if (dark) dark.classList.add('show');
      }, 1420);
    };

    // BUTTON 4: "💵 Maksa, mutta väärennetyt massit" -> OWL RAGES, FLINGS FAKE BILLS, DEMANDS 100 M € OR THROWS CASH AT YOUR HEAD!
    window.payWithCounterfeitMoney = function() {
      clearInterval(fakeMoneyInterval);
      playSound(480, 95, 0.5, 'sawtooth');
      setTimeout(function() { playSound(190, 52, 0.65, 'square'); }, 160);

      // 1) Slam "💸 VÄÄRENNETYT MASSIT!" stamp
      var stamp = document.getElementById('owlPaidStamp');
      if (stamp) {
        stamp.textContent = '💸 VÄÄRENNETYT MASSIT!';
        stamp.className = 'paid-stamp forbidden stamped';
      }

      // 2) Owl flings 42 counterfeit banknotes flying across the screen
      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var billIcons = ['💵', '💸', '💴', '💶', '🚫0€'];
        for (var i = 0; i < 42; i++) {
          var bill = document.createElement('div');
          bill.style.cssText = 'position:fixed;left:50%;top:45%;z-index:215;pointer-events:none;font-size:' + (24 + Math.random() * 24) + 'px;font-weight:900;color:#fde047;filter:drop-shadow(0 0 14px #ef4444);';
          bill.textContent = billIcons[i % billIcons.length];
          fx.appendChild(bill);
          var ang = Math.random() * Math.PI * 2;
          var dist = 160 + Math.random() * 560;
          var tx = Math.cos(ang) * dist;
          var ty = Math.sin(ang) * dist;
          var rot = (Math.random() - 0.5) * 1440;
          bill.animate([
            { transform: 'translate(-50%,-50%) scale(0.4) rotate(0deg)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + (tx * 0.65) + 'px), calc(-50% + ' + (ty * 0.65 - 60) + 'px)) scale(1.25) rotate(' + (rot * 0.5) + 'deg)', opacity: 1, offset: 0.4 },
            { transform: 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + (ty + 220) + 'px)) scale(0.3) rotate(' + rot + 'deg)', opacity: 0 }
          ], { duration: 1150 + Math.random() * 450, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
          setTimeout(function(el) { try { el.remove(); } catch (e) {} }, 1650, bill);
        }
      }

      // 3) Shake card and turn Owl's eyes blazing crimson
      var card = document.getElementById('owlSpotlightCard');
      if (card) {
        card.classList.remove('thrown-by-owl');
        void card.offsetWidth;
        card.classList.add('thrown-by-owl');
      }
      var redEyes = document.getElementById('owlRedEyesOverlay');
      if (redEyes) redEyes.style.display = 'block';

      var topTag = document.getElementById('darknessTopTag');
      if (topTag) {
        topTag.style.color = '#ef4444';
        topTag.textContent = '💸 VÄÄRENNETTYJÄ MASSEJA HAVAITTU! PÖLLÖ HEITTI SETELIT ILMAAN! 💸';
      }

      var title = document.getElementById('darknessOwlTitle');
      if (title) {
        title.className = 'owl-rage-threat';
        title.style.fontSize = '20px';
        title.textContent = '🦉💸 ”VÄÄRENNETTYJÄ MASSEJA?! MAKSAT 100 M € TAI HEITÄN NÄMÄ SUN PÄÄHÄN JA KUOLET!”';
      }

      var desc = document.getElementById('darknessOwlDesc');
      if (desc) {
        desc.innerHTML = 'Yritit huijata Pöllöä <strong>väärennetyillä masseilla</strong>! Pöllö repi setelit ilmaan ja vaatii nyt <strong>100 miljoonaa (100 M €)</strong> – ellet maksa heti, Pöllö viskaa väärennetyt massit suoraan päähäsi ja kuolet!';
      }

      var invNum = document.getElementById('invoiceNumberTitle');
      if (invNum) invNum.textContent = '🧾 PETOSSAKKO #100M-VÄÄRENNÖS';
      var r3L = document.getElementById('invRow3Label');
      if (r3L) r3L.textContent = '• 💸 Väärennettyjen massien yritys (Rangaistusmaksu):';
      var r3P = document.getElementById('invRow3Price');
      if (r3P) {
        r3P.style.color = '#ef4444';
        r3P.textContent = '100 000 000 € (100 M €)';
      }
      var tot = document.getElementById('invTotalAmount');
      if (tot) {
        tot.style.color = '#fde047';
        tot.textContent = '100 M € (100 MILJOONAA € — MAKSA HETI TAI SAAT MASSIT PÄÄHÄN!)';
      }

      var normBtns = document.getElementById('owlNormalButtons');
      if (normBtns) normBtns.style.display = 'none';
      var penBtns = document.getElementById('owlPenaltyButtons');
      if (penBtns) penBtns.style.display = 'none';
      var fakeBtns = document.getElementById('owlFakeMoneyButtons');
      if (fakeBtns) fakeBtns.style.display = 'flex';

      fakeMoneySeconds = 8;
      var tCount = document.getElementById('fakeMoneyTimerCount');
      if (tCount) tCount.textContent = String(fakeMoneySeconds);

      fakeMoneyInterval = setInterval(function() {
        fakeMoneySeconds--;
        if (tCount) tCount.textContent = String(Math.max(0, fakeMoneySeconds));
        playSound(440, 220, 0.12, 'square');
        if (fakeMoneySeconds <= 0) {
          clearInterval(fakeMoneyInterval);
          window.triggerFakeMoneyHeadThrow();
        }
      }, 1000);

      showToast('💸 Pöllö raivostui väärennetyistä masseista! Maksa 100 M € 8 sekunnissa tai saat massit päähäsi!');
    };

    // BUTTON 5: "🗝️ 5) Pölli avain 15 sivuun" -> STEAL KEY TO SLIDE 15, OWL DEMANDS 1000...000 TRILJOONAA OR SHOOTS YOU & YOU LOSE THE KEY!
    window.stealKeyToSlide15 = function() {
      clearInterval(fakeMoneyInterval);
      clearInterval(key15Interval);
      hasKey15 = true;
      updateKey15BadgeUI();

      playSound(580, 1180, 0.35, 'triangle');
      setTimeout(function() { playSound(520, 95, 0.65, 'sawtooth'); }, 220);

      // 1) Slam "🗝️ AVAIN 15 PÖLLITTY!" stamp
      var stamp = document.getElementById('owlPaidStamp');
      if (stamp) {
        stamp.textContent = '🗝️ AVAIN 15 PÖLLITTY!';
        stamp.className = 'paid-stamp forbidden stamped';
      }

      // 2) Flying golden key animation snatched from the Owl
      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var keyFx = document.createElement('div');
        keyFx.style.cssText = 'position:fixed;left:50%;top:42%;z-index:225;pointer-events:none;font-size:68px;filter:drop-shadow(0 0 35px #fde047);';
        keyFx.textContent = '🗝️✨🦃';
        fx.appendChild(keyFx);
        keyFx.animate([
          { transform: 'translate(-50%,-50%) scale(0.4) rotate(-25deg)', opacity: 1 },
          { transform: 'translate(-50%,-120%) scale(1.65) rotate(15deg)', opacity: 1, offset: 0.45 },
          { transform: 'translate(-50%,-210%) scale(0.8) rotate(360deg)', opacity: 0 }
        ], { duration: 1050, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
        setTimeout(function() { try { keyFx.remove(); } catch (e) {} }, 1080);
      }

      // 3) Owl spots the theft immediately, activates red eyes & laser sight
      var card = document.getElementById('owlSpotlightCard');
      if (card) {
        card.classList.remove('thrown-by-owl');
        void card.offsetWidth;
        card.classList.add('thrown-by-owl');
      }
      var laser = document.getElementById('owlLaserSight');
      if (laser) laser.style.display = 'block';
      var redEyes = document.getElementById('owlRedEyesOverlay');
      if (redEyes) redEyes.style.display = 'block';

      var topTag = document.getElementById('darknessTopTag');
      if (topTag) {
        topTag.style.color = '#ef4444';
        topTag.textContent = '🗝️ PÖLLIT SALAISEN AVAIMEN SIVUUN 15! PÖLLÖ TÄHTÄÄ SINUA! 🗝️';
      }

      var title = document.getElementById('darknessOwlTitle');
      if (title) {
        title.className = 'owl-rage-threat';
        title.style.fontSize = '15px';
        title.style.wordBreak = 'break-all';
        title.textContent = '🦉🗝️ ”PÖLLIT AVAIMEN SIVUUN 15?! ANNA HETI ' + MASSIVE_TRILLION_STR.toUpperCase() + ' TAI AMMUN SINUA JA MENETÄT AVAIMEN!”';
      }

      var desc = document.getElementById('darknessOwlDesc');
      if (desc) {
        desc.innerHTML = 'Nappasit Pöllön vyöltä <strong>Salaisen Sivun 15 kultaisen avaimen (🗝️)</strong>! Jos maksat Pöllön vaatiman triljoonalaskun, saat pitää avaimen ja pääset Sivulle 15 (missä Kalkkuna tuijottaa). Jos et maksa, <strong>Pöllö ampuu sinua ja menetät avaimen</strong>!';
      }

      var invNum = document.getElementById('invoiceNumberTitle');
      if (invNum) invNum.textContent = '🧾 AVAIMEN LUNASTUSLASKU #15-KALKKUNA';
      var r3L = document.getElementById('invRow3Label');
      if (r3L) r3L.textContent = '• 🗝️ Sivun 15 avaimen pölliminen Pöllöltä:';
      var r3P = document.getElementById('invRow3Price');
      if (r3P) {
        r3P.style.color = '#ef4444';
        r3P.style.wordBreak = 'break-all';
        r3P.textContent = MASSIVE_TRILLION_STR + ' €';
      }
      var tot = document.getElementById('invTotalAmount');
      if (tot) {
        tot.style.color = '#fde047';
        tot.style.wordBreak = 'break-all';
        tot.style.fontSize = '11.5px';
        tot.textContent = MASSIVE_TRILLION_STR.toUpperCase() + ' €';
      }

      var normBtns = document.getElementById('owlNormalButtons');
      if (normBtns) normBtns.style.display = 'none';
      var penBtns = document.getElementById('owlPenaltyButtons');
      if (penBtns) penBtns.style.display = 'none';
      var fakeBtns = document.getElementById('owlFakeMoneyButtons');
      if (fakeBtns) fakeBtns.style.display = 'none';
      var keyBtns = document.getElementById('owlKey15Buttons');
      if (keyBtns) keyBtns.style.display = 'flex';

      key15Seconds = 10;
      var kCount = document.getElementById('key15TimerCount');
      if (kCount) kCount.textContent = String(key15Seconds);

      key15Interval = setInterval(function() {
        key15Seconds--;
        if (kCount) kCount.textContent = String(Math.max(0, key15Seconds));
        playSound(520, 240, 0.12, 'square');
        if (key15Seconds <= 0) {
          clearInterval(key15Interval);
          window.failKey15Ultimatum();
        }
      }, 1000);

      showToast('🗝️ Pöllit avaimen Sivuun 15! Maksa Pöllölle triljoonalasku 10 sekunnissa tai Pöllö ampuu ja menetät avaimen!');
    };

    window.failKey15Ultimatum = function() {
      clearInterval(key15Interval);
      hasKey15 = false;
      unlocked[15] = false;
      updateKey15BadgeUI();
      buildDots();

      var dark = document.getElementById('omegaDarknessOverlay');
      if (dark) dark.classList.remove('show');
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, 760);

      setTimeout(function() {
        showDeathModal(
          '🦉🛰️🗝️❌',
          'PÖLLÖ AMPUI SINUT JA MENETIT SIVUN 15 AVAIMEN!',
          'Pöllit avaimen Sivuun 15, mutta et maksanut Pöllölle ' + MASSIVE_TRILLION_STR + ' €, joten Pöllö ampui sinua Orbital Railgunilla ja otti Sivun 15 avaimen takaisin!',
          '💡 Vinkki: Pölli avain uudelleen ja klikkaa ”💰 Maksa 1000...000 triljoonaa €”, niin pääset Salaiselle Sivulle 15!'
        );
      }, 780);
    };

    // OWL HURLS THE HEAVY BUNDLE OF COUNTERFEIT CASH STRAIGHT AT YOUR HEAD -> GLASS SHATTERS & YOU DIE!
    window.triggerFakeMoneyHeadThrow = function() {
      clearInterval(fakeMoneyInterval);
      playSound(320, 28, 0.85, 'sawtooth');

      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var wad = document.createElement('div');
        wad.style.cssText = 'position:fixed;left:50%;top:42%;z-index:240;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#166534,#14532d,#052e16);border:6px solid #fde047;border-radius:24px;padding:18px 34px;box-shadow:0 0 90px #ef4444,0 30px 80px #000;color:#fde047;font-weight:900;text-align:center;';
        wad.innerHTML = '<div style="font-size:64px;line-height:1;">💵🧱💸</div><div style="font-size:22px;letter-spacing:2px;margin-top:6px;">VÄÄRENNETYT MASSIT (100 KG)</div>';
        fx.appendChild(wad);

        wad.animate([
          { transform: 'translate(-50%,-50%) scale(0.15) rotate(-25deg)', opacity: 1 },
          { transform: 'translate(-50%,-50%) scale(1.6) rotate(12deg)', opacity: 1, offset: 0.55 },
          { transform: 'translate(-50%,-50%) scale(5.8) rotate(-18deg)', opacity: 1 }
        ], { duration: 640, easing: 'cubic-bezier(0.55, 0.05, 0.67, 0.19)', fill: 'forwards' });

        setTimeout(function() {
          try { wad.remove(); } catch (e) {}
          playSound(95, 18, 0.9, 'square');
          var smash = document.createElement('div');
          smash.style.cssText = 'position:fixed;inset:0;z-index:245;pointer-events:none;background:radial-gradient(circle,rgba(239,68,68,0.85) 0%,rgba(255,255,255,0.75) 30%,transparent 75%);';
          smash.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none"><g stroke="#ffffff" stroke-width="4" opacity="0.95"><line x1="500" y1="300" x2="40" y2="10"/><line x1="500" y1="300" x2="960" y2="25"/><line x1="500" y1="300" x2="980" y2="580"/><line x1="500" y1="300" x2="20" y2="575"/><circle cx="500" cy="300" r="140" fill="none" stroke="#fde047" stroke-width="5"/></g></svg>';
          fx.appendChild(smash);
          setTimeout(function() { try { smash.remove(); } catch (e) {} }, 900);
        }, 620);
      }

      setTimeout(function() {
        var dark = document.getElementById('omegaDarknessOverlay');
        if (dark) dark.classList.remove('show');
        showDeathModal(
          '🦉💵💥',
          'KUOLIT! PÖLLÖ HEITTI VÄÄRENNETYT MASSIT SUN PÄÄHÄN!',
          'Yritit maksaa Pöllölle väärennetyillä masseilla etkä suostunut maksamaan 100 miljoonan (100 M €) sakkoa, joten raivostunut Pöllö heitti painavan setelipinkan suoraan päähäsi!',
          '💡 Vinkki: Maksa Pöllön lasku rehellisesti tai maksa 100 M € sakko ajoissa nähdäksesi kauniin 4K-korjausanimaation!'
        );
      }, 1180);
    };

    // CLICKING "🔫 AMMU PÖLLÖÄ": FORBIDDEN STAMP, OWL THROWS WEAPON & YOU AWAY, DEMANDS 1000000000 MILJOONAA!
    window.shootDarknessOwl = function() {
      clearInterval(fakeMoneyInterval);
      // Loud alarm & deflection shockwave sound
      playSound(520, 110, 0.55, 'sawtooth');
      setTimeout(function() { playSound(180, 42, 0.75, 'square'); }, 180);

      // 1) Slam red "🚫 KIELLETTY!" stamp instead of approved stamp
      var stamp = document.getElementById('owlPaidStamp');
      if (stamp) {
        stamp.textContent = '🚫 KIELLETTY!';
        stamp.className = 'paid-stamp forbidden stamped';
      }

      // 2) Visual animation of your weapon being violently thrown spinning off-screen by the Owl
      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var flungGun = document.createElement('div');
        flungGun.style.cssText = 'position:fixed;left:50%;top:48%;z-index:215;pointer-events:none;font-size:64px;filter:drop-shadow(0 0 30px #ef4444);';
        flungGun.textContent = '🔫💥🦉';
        fx.appendChild(flungGun);
        flungGun.animate([
          { transform: 'translate(-50%,-50%) scale(0.8) rotate(0deg)', opacity: 1 },
          { transform: 'translate(-180px,-140px) scale(1.6) rotate(-380deg)', opacity: 1, offset: 0.35 },
          { transform: 'translate(780px, -520px) scale(0.2) rotate(1440deg)', opacity: 0 }
        ], { duration: 920, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
        setTimeout(function() { try { flungGun.remove(); } catch (e) {} }, 950);
      }

      // 3) Owl violently throws the player/card backward
      var card = document.getElementById('owlSpotlightCard');
      if (card) {
        card.classList.remove('thrown-by-owl');
        void card.offsetWidth;
        card.classList.add('thrown-by-owl');
      }

      // 4) Activate Owl's fiery red eyes, laser sight & 1000000000 miljoonaa ultimatum
      var laser = document.getElementById('owlLaserSight');
      if (laser) laser.style.display = 'block';
      var redEyes = document.getElementById('owlRedEyesOverlay');
      if (redEyes) redEyes.style.display = 'block';

      var topTag = document.getElementById('darknessTopTag');
      if (topTag) {
        topTag.style.color = '#ef4444';
        topTag.textContent = '🚫 HYÖKKÄYS PÖLLÖÄ KOHTI KIELLETTY! PÖLLÖ HEITTI ASEESI POIS! 🚫';
      }

      var title = document.getElementById('darknessOwlTitle');
      if (title) {
        title.className = 'owl-rage-threat';
        title.style.fontSize = '22px';
        title.textContent = '🦉💥 ”MAKSAT 1000000000 MILJOONAA TAI AMMUN SINUA!”';
      }

      var desc = document.getElementById('darknessOwlDesc');
      if (desc) {
        desc.innerHTML = 'Yritit ampua Pöllöä pimeydessä! Pöllö nappasi luodin, löi laskuun <strong>🚫 KIELLETTY!</strong> -leiman, <strong>heitti aseesi ja sinut pois</strong> ja tähtää nyt sinua omalla Orbital Railgunillaan!';
      }

      var invNum = document.getElementById('invoiceNumberTitle');
      if (invNum) invNum.textContent = '🧾 RANGAISTUSLASKU #999-KIELLETTY';
      var r3L = document.getElementById('invRow3Label');
      if (r3L) r3L.textContent = '• 🚫 Pöllön ampumisyritys (Rangaistussakko):';
      var r3P = document.getElementById('invRow3Price');
      if (r3P) {
        r3P.style.color = '#ef4444';
        r3P.textContent = '1 000 000 000 MILJOONAA €';
      }
      var tot = document.getElementById('invTotalAmount');
      if (tot) {
        tot.style.color = '#fde047';
        tot.textContent = '1000000000 MILJOONAA € (MAKSA HETI TAI PÖLLÖ AMPUU!)';
      }

      var normBtns = document.getElementById('owlNormalButtons');
      if (normBtns) normBtns.style.display = 'none';
      var penBtns = document.getElementById('owlPenaltyButtons');
      if (penBtns) penBtns.style.display = 'flex';

      showToast('🚫 KIELLETTY! Pöllö heitti sinut pois: ”MAKSAT 1000000000 MILJOONAA TAI AMMUN SINUA!”');
    };

    window.refuseOwlBillionPayment = function() {
      var dark = document.getElementById('omegaDarknessOverlay');
      if (dark) dark.classList.remove('show');
      spawnOrbitalBeamFX(window.innerWidth / 2, window.innerHeight / 2, 720);
      setTimeout(function() {
        showDeathModal(
          '🦉🛰️💥',
          'PÖLLÖ AMPUI SINUT! (1000000000 MILJOONAA MAKSAMATTA)',
          'Kieltäydyit maksamasta Pöllölle 1000000000 miljoonaa sen jälkeen kun yritit ampua sitä pimeydessä!',
          '💡 Vinkki: Kun Pöllö vaatii maksua korjauksesta, maksa lasku niin näet kauniin 4K-korjausanimaation!'
        );
      }, 780);
    };

    function playHarpChord(notes) {
      if (!audioOn) return;
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AC) audioCtx = new AC();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        notes.forEach(function(freq, idx) {
          setTimeout(function() {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.16, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 1.1);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.1);
          }, idx * 95);
        });
      } catch (e) {}
    }

    window.payOwlRepairInvoice = function(method) {
      clearInterval(fakeMoneyInterval);
      clearInterval(key15Interval);

      var openSlide15After = false;
      if (method === 'key15_trillion') {
        hasKey15 = true;
        unlocked[15] = true;
        openSlide15After = true;
        updateKey15BadgeUI();
        buildDots();
      }

      var stamp = document.getElementById('owlPaidStamp');
      if (stamp) {
        stamp.className = 'paid-stamp stamped';
        stamp.textContent = method === 'key15_trillion'
          ? 'AVAIN 15 LUNASTETTU ✅'
          : (method === 'billion'
            ? 'MAKSETTU 1000000000 MILJOONAA ✅'
            : (method === 'hundred_million'
              ? 'MAKSETTU 100 M € ✅'
              : (method === 'tuna' ? 'HYVÄKSYTTY (TONNIKALA) ✅' : 'HYVÄKSYTTY ✅')));
      }
      var laser = document.getElementById('owlLaserSight');
      if (laser) laser.style.display = 'none';
      playHarpChord([523.25, 659.25, 783.99, 1046.50]);

      setTimeout(function() {
        var dark = document.getElementById('omegaDarknessOverlay');
        if (dark) dark.classList.remove('show');
        run4KQuantumRepairSequence(openSlide15After);
      }, 780);
    };

    function run4KQuantumRepairSequence(goToSlide15WhenDone) {
      var ov = document.getElementById('omegaQuantumRepairOverlay');
      var canvas = document.getElementById('quantumRepairCanvas');
      var bar = document.getElementById('repairProgressBar');
      var pctLbl = document.getElementById('repairPercentLabel');
      var stTitle = document.getElementById('repairStageTitle');
      var stSub = document.getElementById('repairStageSub');
      if (!ov || !canvas) return;

      ov.classList.add('show');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext('2d');

      var particles = [];
      for (var i = 0; i < 110; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 1.5 + Math.random() * 3.5,
          vy: -1.5 - Math.random() * 3.2,
          vx: (Math.random() - 0.5) * 1.4,
          col: i % 3 === 0 ? '#fde047' : (i % 3 === 1 ? '#34d399' : '#38bdf8')
        });
      }

      var start = performance.now();
      var duration = 3400;
      playHarpChord([261.63, 329.63, 392.00, 523.25, 659.25, 783.99]);
      setTimeout(function() { playHarpChord([349.23, 440.00, 523.25, 698.46, 880.00]); }, 1200);
      setTimeout(function() { playHarpChord([523.25, 659.25, 783.99, 1046.50, 1318.51]); }, 2350);

      function step(now) {
        var p = Math.min(1, (now - start) / duration);
        var pct = Math.round(p * 100);
        if (bar) bar.style.width = pct + '%';
        if (pctLbl) pctLbl.textContent = pct + '%';

        if (p < 0.34) {
          stTitle.textContent = '1/3 • Kootaan särkyneitä 4K-pikseleitä ja valokuvia...';
          stSub.textContent = 'Pöllöjen kultti punoo kultaisia kvanttisäikeitä pimeyden halki...';
        } else if (p < 0.72) {
          stTitle.textContent = '2/3 • Palautetaan kaikki 17 diaa ja O-järjestön tietokanta...';
          stSub.textContent = 'Tornado-moottori, kutsukirje, tonnikala ja 11 yhtiötä kalibroidaan...';
        } else {
          stTitle.textContent = '3/3 • Viimeistellään Pöllöjen Kultin Iso Sali & 17 diaa!';
          stSub.textContent = 'Kaikki vauriot ja kraatterit on puhdistettu 100 % tarkkuudella!';
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var cx = canvas.width / 2, cy = canvas.height / 2;

        // Aurora Borealis harmonic wave
        var grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(canvas.width, canvas.height) * 0.65);
        grad.addColorStop(0, 'rgba(253, 224, 71, ' + (0.32 * Math.sin(p * Math.PI)) + ')');
        grad.addColorStop(0.5, 'rgba(16, 185, 129, ' + (0.28 * Math.sin(p * Math.PI)) + ')');
        grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Rotating Sacred Geometry Golden & Emerald Rings
        for (var rIdx = 1; rIdx <= 4; rIdx++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate((now * 0.0012 * (rIdx % 2 === 0 ? 1 : -1)) + rIdx);
          ctx.strokeStyle = rIdx % 2 === 0 ? 'rgba(253, 224, 71, 0.75)' : 'rgba(52, 211, 153, 0.75)';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([14, 10]);
          ctx.beginPath();
          ctx.arc(0, 0, 75 * rIdx * (0.4 + p * 0.7), 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Rising Golden & Emerald Starlight Particles
        particles.forEach(function(pt) {
          pt.y += pt.vy;
          pt.x += pt.vx;
          if (pt.y < 0) pt.y = canvas.height;
          ctx.fillStyle = pt.col;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
          ctx.fill();
        });

        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          // Restore all damaged elements and holes cleanly without any 3D references
          try {
            var holes = document.getElementById('holesLayer');
            if (holes) holes.innerHTML = '';
            document.querySelectorAll('.orbital-damaged').forEach(function(el) {
              el.classList.remove('orbital-damaged');
              el.style.transform = '';
            });
            if (typeof window.repair3DHall === 'function') window.repair3DHall();
          } catch (e) {}

          setTimeout(function() {
            ov.classList.remove('show');
            if (goToSlide15WhenDone) {
              showToast('🗝️🦃 AVAIN 15 PIDETTY! Salainen Sivu 15 aukeaa — Kalkkuna tuijottaa sinua!');
              window.goToSlide(15);
            } else {
              showToast('🦉✨ KIITOS MAKSUSTA! Koko 17-sivuinen 4K-verkkosivusto ja Pöllöjen Kulttisali on korjattu!');
            }
          }, 320);
        }
      }
      requestAnimationFrame(step);
    }

    // =========================================================================
    // SLIDE 15: STARING TURKEY INTERACTIONS & EYE TRACKING
    // =========================================================================
    function startTurkeyStareLoop() {
      clearInterval(turkeyStareInterval);
      turkeyDistanceCm = 42;
      var badge = document.getElementById('turkeyDistBadge');
      var sub = document.getElementById('turkeyStareSub');
      playSound(140, 62, 0.75, 'sawtooth');

      turkeyStareInterval = setInterval(function() {
        if (currentSlide !== 15) {
          clearInterval(turkeyStareInterval);
          return;
        }
        turkeyDistanceCm = Math.max(2, turkeyDistanceCm - 3);
        if (badge) {
          badge.textContent = '👁️ Etäisyys: ' + turkeyDistanceCm + ' cm (Tuijottaa...)';
        }
        if (turkeyDistanceCm <= 10 && sub) {
          sub.textContent = '👁️🦃👁️ ”HÖH ÖÖ!! KALKKUNA ON AIVAN RUUTUSI LASISSA KIINNI JA TUIJOTTAA!”';
        }
      }, 1400);
    }

    window.trackTurkeyEyes = function(e) {
      var pL = document.getElementById('turkeyPupilL');
      var pR = document.getElementById('turkeyPupilR');
      if (!pL || !pR) return;
      var dx = ((e.clientX / window.innerWidth) - 0.5) * 18;
      var dy = ((e.clientY / window.innerHeight) - 0.5) * 14;
      var tr = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      pL.style.transform = tr;
      pR.style.transform = tr;
    };

    window.stareBackAtTurkey = function() {
      playSound(180, 75, 0.55, 'triangle');
      turkeyDistanceCm = Math.max(1, turkeyDistanceCm - 6);
      var badge = document.getElementById('turkeyDistBadge');
      if (badge) badge.textContent = '👁️ Etäisyys: ' + turkeyDistanceCm + ' cm (Tuijotuskilpailu!)';
      var sub = document.getElementById('turkeyStareSub');
      if (sub) {
        sub.textContent = '👁️🦃👁️ Tuijotat Kalkkunaa suoraan silmiin... Kalkkuna ei räpäytä koskaan! ”HÖH ÖÖ!”';
      }
      showToast('👀 Tuijotat Kalkkunaa takaisin! Kalkkunan silmät hehkuvat entistä kirkkaammin!');
    };

    window.feedStaringTurkey = function() {
      playHarpChord([440, 554.37, 659.25, 880]);
      turkeyDistanceCm = 50;
      var badge = document.getElementById('turkeyDistBadge');
      if (badge) badge.textContent = '👁️ Etäisyys: 50 cm (Mutustelee kaviaaria... ja tuijottaa yhä!)';
      var sub = document.getElementById('turkeyStareSub');
      if (sub) {
        sub.textContent = '🐟🦃 ”HÖH ÖÖ! Kalkkuna söi Sammen Kaviaarin, mutta ei lopeta tuijottamista!”';
      }
      showToast('🐟 Annoit Kalkkunalle Sammen Kaviaaria! Se peruutti hieman, mutta tuijottaa sinua edelleen!');
    };

    // NEW ON SLIDE 15: "🍗 SYÖ SE!" -> EAT THE TURKEY -> OWL BURSTS IN & THROWS YOU TO SLIDE 16!
    window.eatStaringTurkey = function() {
      clearInterval(turkeyStareInterval);
      // Crunching / chomping 4K sound effects
      playSound(320, 85, 0.28, 'sawtooth');
      setTimeout(function() { playSound(280, 65, 0.32, 'square'); }, 180);
      setTimeout(function() { playSound(420, 110, 0.38, 'triangle'); }, 360);

      var cont = document.getElementById('turkeyStareContainer');
      if (cont) {
        cont.classList.remove('turkey-devoured');
        void cont.offsetWidth;
        cont.classList.add('turkey-devoured');
      }

      // Flying roast drumstick & bone particles
      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var biteIcons = ['🍗', '🍖', '🦴', '🍽️', '😋', '✨'];
        for (var i = 0; i < 32; i++) {
          var b = document.createElement('div');
          b.style.cssText = 'position:fixed;left:50%;top:48%;z-index:245;pointer-events:none;font-size:' + (26 + Math.random() * 28) + 'px;filter:drop-shadow(0 0 14px #fde047);';
          b.textContent = biteIcons[i % biteIcons.length];
          fx.appendChild(b);
          var ang = Math.random() * Math.PI * 2;
          var dist = 120 + Math.random() * 440;
          var tx = Math.cos(ang) * dist;
          var ty = Math.sin(ang) * dist;
          var rot = (Math.random() - 0.5) * 1080;
          b.animate([
            { transform: 'translate(-50%,-50%) scale(0.4) rotate(0deg)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) scale(1.25) rotate(' + rot + 'deg)', opacity: 0 }
          ], { duration: 920, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
          setTimeout(function(el) { try { el.remove(); } catch (e) {} }, 950, b);
        }
      }

      showToast('🍗 ROUSK! MUMS! Söit koko Sivun 15 Kalkkunan! Mutta Pöllö kuuli sen...');

      // After 850ms, the angry Owl bursts onto the screen!
      setTimeout(function() {
        playSound(580, 95, 0.7, 'sawtooth');
        setTimeout(function() { playSound(190, 42, 0.85, 'square'); }, 200);
        var modal = document.getElementById('owlEatTurkeyCutsceneModal');
        if (modal) modal.classList.add('show');
        clearTimeout(window._autoThrowS16Timer);
        window._autoThrowS16Timer = setTimeout(function() {
          if (modal && modal.classList.contains('show')) {
            window.completeOwlThrowToSlide16();
          }
        }, 3800);
      }, 880);
    };

    window.completeOwlThrowToSlide16 = function() {
      clearTimeout(window._autoThrowS16Timer);
      var modal = document.getElementById('owlEatTurkeyCutsceneModal');
      if (modal) modal.classList.remove('show');

      // Reset turkey visibility in case player returns to Slide 15 later
      var cont = document.getElementById('turkeyStareContainer');
      if (cont) cont.classList.remove('turkey-devoured');

      unlocked[16] = true;
      buildDots();

      // Dramatic 3D/4K Owl Hurling Animation across the screen
      playSound(640, 48, 1.1, 'sawtooth');
      var s15 = document.getElementById('slide-15');
      if (s15) s15.classList.add('hurling-to-s16');

      showToast('🦉🌪️ ”MIKSI SÖIT KALKKUNAN?! AVAINHAN ON PÖLLÖN!” Pöllö heitti sinut Sivulle 16!');

      setTimeout(function() {
        if (s15) s15.classList.remove('hurling-to-s16');
        window.goToSlide(16);
      }, 1150);
    };

    // =========================================================================
    // SLIDE 16: POSSU JOLLA ON PIUHAT IRTI (UNPLUGGED SPARKING CYBER-PIG)
    // =========================================================================
    function startPigSparksLoop() {
      if (pigSparkAnimId) cancelAnimationFrame(pigSparkAnimId);
      var canvas = document.getElementById('pigSparksCanvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var sparks = [];

      // 3 loose cable tip coordinates in 700x380 canvas space
      var cableTips = [
        { x: 118, y: 235, col: '#fde047' },
        { x: 575, y: 248, col: '#38bdf8' },
        { x: 218, y: 268, col: '#e879f9' }
      ];

      function renderSparks() {
        if (currentSlide !== 16) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn fresh electric sparks from the 3 unplugged cable ends
        cableTips.forEach(function(tip) {
          if (Math.random() < 0.55 * pigBoostIntensity) {
            for (var i = 0; i < 3 * pigBoostIntensity; i++) {
              var ang = Math.random() * Math.PI * 2;
              var spd = 2 + Math.random() * 6 * pigBoostIntensity;
              sparks.push({
                x: tip.x + (Math.random() - 0.5) * 10,
                y: tip.y + (Math.random() - 0.5) * 10,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd - 1.5,
                life: 1,
                col: tip.col
              });
            }
          }

          // Occasional jagged lightning arc jumping from unplugged cable tip
          if (Math.random() < 0.24 * pigBoostIntensity) {
            ctx.save();
            ctx.strokeStyle = tip.col;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = tip.col;
            ctx.shadowBlur = 14;
            ctx.beginPath();
            var lx = tip.x, ly = tip.y;
            ctx.moveTo(lx, ly);
            for (var seg = 0; seg < 5; seg++) {
              lx += (Math.random() - 0.5) * 48 * pigBoostIntensity;
              ly += (Math.random() - 0.3) * 42 * pigBoostIntensity;
              ctx.lineTo(lx, ly);
            }
            ctx.stroke();
            ctx.restore();
          }
        });

        for (var s = sparks.length - 1; s >= 0; s--) {
          var sp = sparks[s];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.28; // gravity
          sp.life -= 0.045;
          if (sp.life <= 0) {
            sparks.splice(s, 1);
            continue;
          }
          ctx.fillStyle = sp.col;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, 2.6 * sp.life, 0, Math.PI * 2);
          ctx.fill();
        }

        // Fluctuate voltage meter
        if (Math.random() < 0.15) {
          var v = Math.round(180 + Math.random() * 640 * pigBoostIntensity);
          var vLbl = document.getElementById('pigVoltageLabel');
          if (vLbl) vLbl.textContent = 'JÄNNITE: ' + v + ' V (PIUHAT IRTI!)';
          var vBar = document.getElementById('pigVoltageBar');
          if (vBar) vBar.style.width = Math.min(100, Math.round((v / 900) * 100)) + '%';
        }

        pigSparkAnimId = requestAnimationFrame(renderSparks);
      }
      pigSparkAnimId = requestAnimationFrame(renderSparks);
    }

    function playPigOinkZapSound() {
      // 4K Synth Pig Oink + Electric Zap
      playSound(145, 290, 0.22, 'sawtooth');
      setTimeout(function() { playSound(165, 340, 0.25, 'sawtooth'); }, 180);
      setTimeout(function() { playSound(920, 120, 0.32, 'square'); }, 340);
    }

    window.reconnectPigWires = function() {
      playPigOinkZapSound();
      pigBoostIntensity = 2.4;
      setTimeout(function() { pigBoostIntensity = 1; }, 1600);

      var wrap = document.getElementById('pigArenaWrap');
      if (wrap) {
        wrap.classList.remove('pig-electric-jolt');
        void wrap.offsetWidth;
        wrap.classList.add('pig-electric-jolt');
      }

      var cap = document.getElementById('pigCaptionStatus');
      if (cap) {
        cap.textContent = '🐷🔌 ”RÖH-BZZT!! Älä koske! Kun yrität kytkeä piuhan #1, piuha #2 ja #3 ampuvat irti!”';
      }
      var st = document.getElementById('pigStoryText');
      if (st) {
        st.innerHTML = 'Yritit kytkeä possun virtapiuhoja takaisin kiinni, mutta <strong>kaikki kolme piuhaa löivät kipinää ja pomppasivat uudestaan irti</strong>! Possu vain röhki: <em>”RÖH-BZZT! Piuhat ovat täysin irti!”</em>';
      }
      showToast('🔌⚡ BZZT! RÖH! Piuhat kipinöivät ja irtosivat heti uudelleen!');
    };

    window.superchargePig400V = function() {
      playSound(180, 1420, 0.55, 'sawtooth');
      pigBoostIntensity = 3.2;
      setTimeout(function() { pigBoostIntensity = 1; }, 2200);

      var wrap = document.getElementById('pigArenaWrap');
      if (wrap) {
        wrap.classList.remove('pig-electric-jolt');
        void wrap.offsetWidth;
        wrap.classList.add('pig-electric-jolt');
      }

      var cap = document.getElementById('pigCaptionStatus');
      if (cap) {
        cap.textContent = '🐷⚡⚡ ”MEGA-RÖH 400V!! Irti olevat piuhat syöksevät sinisiä salamoita ympäri huonetta!”';
      }
      showToast('⚡ Syötit 400V lisävirtaa! Possun irti olevat piuhat sinkoilevat valokaaria!');
    };

    window.petUnpluggedPig = function() {
      playHarpChord([392.00, 493.88, 587.33, 783.99]);
      setTimeout(function() { playPigOinkZapSound(); }, 650);
      var cap = document.getElementById('pigCaptionStatus');
      if (cap) {
        cap.textContent = '🐷💖 ”Röh-röh... Kiitos rapsutuksesta! *POKS-BZZT* ...Oho, taas irtosi yksi piuha!”';
      }
      showToast('🐷 Rapsutit Possua! Se rauhoittui hetkeksi, kunnes takapiuha poksahti taas irti!');
    };

    // NEW BUTTON 4 ON SLIDE 16: GIVE 1 QUETTAWATT (1 QW = 10^30 W) -> DIAGNOSTICS EXPLODES, PIG OINKS LOUDLY & ROASTS -> CLICK PIG TO EAT -> SLIDE 17!
    window.givePigQuettawatt = function() {
      pigRoastedReadyToEat = true;
      pigBoostIntensity = 4.5;

      // 1) Massive Quettawatt explosion + Earth-shattering Pig Oink sound
      playSound(620, 24, 1.15, 'sawtooth');
      setTimeout(function() { playSound(95, 280, 0.48, 'sawtooth'); }, 180);
      setTimeout(function() { playSound(130, 390, 0.55, 'square'); }, 360);
      setTimeout(function() { playSound(75, 22, 0.95, 'triangle'); }, 540);

      var body = document.getElementById('appBody');
      if (body) {
        body.classList.add('quake');
        setTimeout(function() { body.classList.remove('quake'); }, 950);
      }

      // 2) Explode the "POSSU-DIAGNOSTIIKKA" card into flying shards & sparks
      var diag = document.getElementById('pigDiagCard');
      if (diag) {
        diag.classList.remove('diag-exploded');
        void diag.offsetWidth;
        diag.classList.add('diag-exploded');
        var rect = diag.getBoundingClientRect();
        spawnParticles(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          ['#fde047', '#ef4444', '#38bdf8', '#f97316', '#ffffff'],
          65,
          420
        );
      }

      var hdrTag = document.getElementById('pigDiagHeaderTag');
      if (hdrTag) {
        hdrTag.style.color = '#ef4444';
        hdrTag.textContent = '💥🔥 DIAGNOSTIIKKA RÄJÄHTI PALASIKSI! (1 KVETTAWATTI = 10³⁰ W) 🔥💥';
      }
      var vLbl = document.getElementById('pigVoltageLabel');
      if (vLbl) {
        vLbl.style.color = '#fde047';
        vLbl.textContent = 'TEHO: 1 QW (10³⁰ W) • MITTARI RÄJÄHTI!';
      }
      var dTitle = document.getElementById('pigDiagTitle');
      if (dTitle) {
        dTitle.style.color = '#fde047';
        dTitle.textContent = '🐷⚡🔥 ”RÖÖÖÖÖÖÖÖHK!!” — POSSU PAISTUI SÄHKÖN YLIANNOSTUKSESTA!';
      }
      var st = document.getElementById('pigStoryText');
      if (st) {
        st.innerHTML = 'Annoit possulle maailman suurimman sähkötehon: <strong>1 Kvettawatin (1 000 000 000 000 000 000 000 000 000 000 W)</strong>! Possu-diagnostiikka räjähti kappaleiksi, possu päästi jättimäisen röhkäisyn ja <strong>paistui rapeaksi sähkön yliannostuksesta</strong>! <strong>👉 KLIKKAA NYT VASEMMALLA OLEVAA POSSUA SYÖDÄKSESI SEN (Avaa Sivu 17)!</strong>';
      }
      var vBar = document.getElementById('pigVoltageBar');
      if (vBar) {
        vBar.style.width = '100%';
        vBar.style.background = 'linear-gradient(90deg,#ef4444,#fde047,#ffffff)';
      }

      // 3) Transform Pig image into golden-brown roasted state & show clickable overlay
      var wrap = document.getElementById('pigArenaWrap');
      if (wrap) {
        wrap.classList.remove('pig-electric-jolt');
        void wrap.offsetWidth;
        wrap.classList.add('pig-electric-jolt');
        wrap.classList.add('pig-roasted-ready');
      }
      var pigImg = document.getElementById('unpluggedPigImg');
      if (pigImg) {
        pigImg.style.filter = 'sepia(0.75) saturate(2.8) contrast(1.38) brightness(0.95) drop-shadow(0 0 35px #f59e0b)';
      }
      var roastOv = document.getElementById('pigRoastedOverlay');
      if (roastOv) roastOv.style.display = 'flex';
      var eatBtn = document.getElementById('eatRoastedPigBtn');
      if (eatBtn) eatBtn.style.display = 'inline-flex';

      var cap = document.getElementById('pigCaptionStatus');
      if (cap) {
        cap.textContent = '🍖🐷🔥 ”RÖÖÖÖHK!! Paistuin rapeaksi 1 Kvettawatin sähköllä! Klikkaa minua syödäksesi minut ▶ Sivu 17!”';
      }

      showToast('💥🐷 RÖÖÖÖHK! Possu-diagnostiikka räjähti 1 Kvettawatista ja possu paistui! Klikkaa nyt possua syödäksesi sen!');
    };

    window.clickPigArena = function() {
      if (!pigRoastedReadyToEat) {
        showToast('⚡ Anna ensin possulle ”4) ANNA KVETTAWATTI (1 QW)”, jotta se paistuu sähkön yliannostuksesta!');
        return;
      }

      // Eat the roasted Quettawatt pig -> Crunch sound & flying roast particles -> Go to Slide 17!
      playSound(340, 88, 0.3, 'sawtooth');
      setTimeout(function() { playSound(290, 65, 0.35, 'square'); }, 170);
      setTimeout(function() { playHarpChord([523.25, 659.25, 783.99, 1046.50]); }, 360);

      var fx = document.getElementById('orbital-fx-layer');
      if (fx) {
        var icons = ['🍖', '🥓', '🍗', '⚡', '😋', '✨', '🐷'];
        for (var i = 0; i < 38; i++) {
          var p = document.createElement('div');
          p.style.cssText = 'position:fixed;left:32%;top:48%;z-index:245;pointer-events:none;font-size:' + (26 + Math.random() * 28) + 'px;filter:drop-shadow(0 0 14px #fde047);';
          p.textContent = icons[i % icons.length];
          fx.appendChild(p);
          var ang = Math.random() * Math.PI * 2;
          var dist = 120 + Math.random() * 440;
          var tx = Math.cos(ang) * dist;
          var ty = Math.sin(ang) * dist;
          var rot = (Math.random() - 0.5) * 1080;
          p.animate([
            { transform: 'translate(-50%,-50%) scale(0.5) rotate(0deg)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) scale(1.25) rotate(' + rot + 'deg)', opacity: 0 }
          ], { duration: 920, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
          setTimeout(function(el) { try { el.remove(); } catch (e) {} }, 960, p);
        }
      }

      unlocked[17] = true;
      buildDots();
      showToast('🍖⚡ ROUSK! MUMS! Söit Kvettawatti-sähköllä paistuneen possun! Salainen Sivu 17 (Tonnikalan Pyörre) avautuu!');

      setTimeout(function() {
        window.goToSlide(17);
      }, 950);
    };

    // =========================================================================
    // SLIDE 17: GIANT TUNA VORTEX THAT SUCKS THE ENTIRE PRESENTATION IN
    // AND DISPLAYS "DIAESITYS ON PÄÄTTYNYT"
    // =========================================================================
    var tunaVortexAnimId = null;
    var tunaVortexActiveSuction = false;
    var tunaVortexSpeedMult = 1;

    function startTunaVortexIdleLoop() {
      if (tunaVortexAnimId) cancelAnimationFrame(tunaVortexAnimId);
      var canvas = document.getElementById('tunaVortexCanvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var stars = [];
      for (var i = 0; i < 120; i++) {
        stars.push({
          ang: Math.random() * Math.PI * 2,
          radius: 30 + Math.random() * 520,
          speed: 0.018 + Math.random() * 0.032,
          pull: 0.6 + Math.random() * 1.4,
          size: 1.5 + Math.random() * 3.5,
          col: i % 3 === 0 ? '#38bdf8' : (i % 3 === 1 ? '#fde047' : '#e879f9')
        });
      }

      var angleOffset = 0;
      function renderVortex() {
        if (currentSlide !== 17 && !tunaVortexActiveSuction) return;
        var W = canvas.width;
        var H = canvas.height;
        var cx = W / 2;
        var cy = H / 2;

        ctx.fillStyle = 'rgba(2, 6, 23, 0.24)';
        ctx.fillRect(0, 0, W, H);

        angleOffset += 0.035 * tunaVortexSpeedMult;

        // Draw swirling logarithmic vortex arms
        for (var arm = 0; arm < 5; arm++) {
          ctx.save();
          ctx.beginPath();
          var baseAngle = angleOffset + (arm * Math.PI * 2 / 5);
          for (var r = 18; r < 520; r += 8) {
            var a = baseAngle + r * 0.016;
            var x = cx + Math.cos(a) * r;
            var y = cy + Math.sin(a) * (r * 0.58);
            if (r === 18) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = arm % 2 === 0 ? 'rgba(56, 189, 248, 0.42)' : 'rgba(168, 85, 247, 0.38)';
          ctx.lineWidth = 3.5;
          ctx.stroke();
          ctx.restore();
        }

        // Draw spiraling particles being sucked toward the Tuna center
        for (var i = 0; i < stars.length; i++) {
          var st = stars[i];
          st.ang += st.speed * tunaVortexSpeedMult;
          st.radius -= st.pull * tunaVortexSpeedMult;
          if (st.radius <= 12) {
            st.radius = 480 + Math.random() * 80;
            st.ang = Math.random() * Math.PI * 2;
          }
          var px = cx + Math.cos(st.ang) * st.radius;
          var py = cy + Math.sin(st.ang) * (st.radius * 0.58);
          ctx.fillStyle = st.col;
          ctx.beginPath();
          ctx.arc(px, py, st.size, 0, Math.PI * 2);
          ctx.fill();
        }

        tunaVortexAnimId = requestAnimationFrame(renderVortex);
      }
      tunaVortexAnimId = requestAnimationFrame(renderVortex);
    }

    function playTunaVortexSound() {
      if (!audioOn) return;
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AC) audioCtx = new AC();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        var now = audioCtx.currentTime;

        // Deep swirling vortex whoosh + sub-bass suction
        var osc1 = audioCtx.createOscillator();
        var osc2 = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(420, now);
        osc1.frequency.exponentialRampToValueAtTime(28, now + 2.2);
        osc2.frequency.setValueAtTime(140, now);
        osc2.frequency.exponentialRampToValueAtTime(18, now + 2.2);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.008, now + 2.25);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.25);
        osc2.stop(now + 2.25);
      } catch (e) {}
    }

    window.suckPresentationIntoTunaVortex = function() {
      if (tunaVortexActiveSuction) return;
      tunaVortexActiveSuction = true;
      tunaVortexSpeedMult = 5.5;

      playTunaVortexSound();
      var st = document.getElementById('s17VortexStatus');
      if (st) {
        st.textContent = '🐟🌪️ TONNIKALA IMEE NYT KAIKKI 17 SIVUA JA KOKO DIAESITYKSEN PYÖRTEESEEN!!';
        st.style.color = '#ef4444';
      }

      // 1) Spawn flying miniature slide cards (Sivu 1 .. Sivu 17) & icons spiraling into the Tuna center
      var fx = document.getElementById('orbital-fx-layer');
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var icons = ['✉️ Sivu 1', '🦃 Sivu 2', '📊 Sivu 3', '🐟 Sivu 4', '🏢 Sivu 5', '📱 Sivu 6', '💎 Sivu 7', '🍗 Sivu 8', '📋 Sivu 9', '🦈 Sivu 10', '🛰️ Sivu 11', '🐘 Sivu 12', '🏰 Sivu 13', '🦉 Sivu 14', '👁️ Sivu 15', '🐷⚡ Sivu 16', '🐟🌪️ Sivu 17'];

      if (fx) {
        for (var i = 0; i < 34; i++) {
          var card = document.createElement('div');
          var angle = (i / 34) * Math.PI * 2;
          var startDist = 360 + Math.random() * 420;
          var sx = cx + Math.cos(angle) * startDist;
          var sy = cy + Math.sin(angle) * startDist;
          card.style.cssText =
            'position:fixed;left:' + sx + 'px;top:' + sy + 'px;z-index:260;pointer-events:none;' +
            'padding:8px 14px;border-radius:12px;background:rgba(15,23,42,0.94);' +
            'border:2px solid #38bdf8;color:#fde047;font-weight:900;font-size:13px;' +
            'box-shadow:0 0 28px rgba(56,189,248,0.85);white-space:nowrap;';
          card.textContent = icons[i % icons.length];
          fx.appendChild(card);

          var midAng = angle + 2.4;
          var midDist = startDist * 0.42;
          var mx = cx + Math.cos(midAng) * midDist - sx;
          var my = cy + Math.sin(midAng) * midDist - sy;
          var endX = cx - sx;
          var endY = cy - sy;

          card.animate([
            { transform: 'translate(-50%,-50%) scale(1.1) rotate(0deg)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + mx + 'px), calc(-50% + ' + my + 'px)) scale(0.65) rotate(540deg)', opacity: 0.9, offset: 0.55 },
            { transform: 'translate(calc(-50% + ' + endX + 'px), calc(-50% + ' + endY + 'px)) scale(0.02) rotate(1440deg)', opacity: 0 }
          ], {
            duration: 1850 + Math.random() * 350,
            easing: 'cubic-bezier(0.55, 0.05, 0.67, 0.19)',
            fill: 'forwards'
          });
          setTimeout(function(el) { try { el.remove(); } catch (e) {} }, 2250, card);
        }
      }

      // 2) Suck the entire Header, Main stage, and Footer into the spinning Tuna Vortex
      var hdr = document.querySelector('header');
      var mn = document.querySelector('main');
      var ftr = document.querySelector('footer');
      if (hdr) hdr.classList.add('vortex-sucked-ui');
      if (mn) mn.classList.add('vortex-sucked-ui');
      if (ftr) ftr.classList.add('vortex-sucked-ui');

      // 3) Show the pitch-black "DIAESITYS ON PÄÄTTYNYT" final screen
      setTimeout(function() {
        tunaVortexActiveSuction = false;
        tunaVortexSpeedMult = 1;
        var endOv = document.getElementById('presentationEndedOverlay');
        if (endOv) endOv.classList.add('show');
        playHarpChord([261.63, 329.63, 392.00, 523.25]);
      }, 2150);
    };

    window.restorePresentationFromVortex = function(targetSlide) {
      var endOv = document.getElementById('presentationEndedOverlay');
      if (endOv) endOv.classList.remove('show');

      var hdr = document.querySelector('header');
      var mn = document.querySelector('main');
      var ftr = document.querySelector('footer');
      if (hdr) hdr.classList.remove('vortex-sucked-ui');
      if (mn) mn.classList.remove('vortex-sucked-ui');
      if (ftr) ftr.classList.remove('vortex-sucked-ui');

      var st = document.getElementById('s17VortexStatus');
      if (st) {
        st.textContent = '👆 KLIKKAA JÄTTILÄISTONNIKALAA TAI PAINIKETTA — TONNIKALA IMEE KOKO DIAESITYKSEN PYÖRTEESEEN!';
        st.style.color = '#fde047';
      }

      playHarpChord([523.25, 659.25, 783.99, 1046.50]);
      window.goToSlide(targetSlide || 1);
      showToast('🔄 Diaesitys palautettu Tonnikalan pyörteestä!');
    };

    // =========================================================================
    // PURE-JS CLIENT-SIDE .ZIP ARCHIVE GENERATOR & .HTML DOWNLOADER
    // =========================================================================
    function makeCRC32Table() {
      var c, table = new Uint32Array(256);
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c >>> 0;
      }
      return table;
    }

    function crc32Bytes(bytes, table) {
      var crc = 0 ^ (-1);
      for (var i = 0; i < bytes.length; i++) {
        crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xFF];
      }
      return (crc ^ (-1)) >>> 0;
    }

    function createZipBlob(filesArray) {
      var enc = new TextEncoder();
      var crcTable = makeCRC32Table();
      var localParts = [];
      var centralParts = [];
      var offset = 0;

      filesArray.forEach(function(file) {
        var nameBytes = enc.encode(file.name);
        var dataBytes = enc.encode(file.content);
        var crc = crc32Bytes(dataBytes, crcTable);
        var len = dataBytes.length;

        // Local File Header (30 bytes + filename)
        var lfh = new Uint8Array(30 + nameBytes.length);
        var ldv = new DataView(lfh.buffer);
        ldv.setUint32(0, 0x04034b50, true);
        ldv.setUint16(4, 20, true);
        ldv.setUint16(6, 0x0800, true); // UTF-8 flag
        ldv.setUint16(8, 0, true);      // Store (no compression)
        ldv.setUint16(10, 0, true);
        ldv.setUint16(12, 0, true);
        ldv.setUint32(14, crc, true);
        ldv.setUint32(18, len, true);
        ldv.setUint32(22, len, true);
        ldv.setUint16(26, nameBytes.length, true);
        ldv.setUint16(28, 0, true);
        lfh.set(nameBytes, 30);

        localParts.push(lfh, dataBytes);

        // Central Directory Header (46 bytes + filename)
        var cdh = new Uint8Array(46 + nameBytes.length);
        var cdv = new DataView(cdh.buffer);
        cdv.setUint32(0, 0x02014b50, true);
        cdv.setUint16(4, 20, true);
        cdv.setUint16(6, 20, true);
        cdv.setUint16(8, 0x0800, true);
        cdv.setUint16(10, 0, true);
        cdv.setUint16(12, 0, true);
        cdv.setUint16(14, 0, true);
        cdv.setUint32(16, crc, true);
        cdv.setUint32(20, len, true);
        cdv.setUint32(24, len, true);
        cdv.setUint16(28, nameBytes.length, true);
        cdv.setUint16(30, 0, true);
        cdv.setUint16(32, 0, true);
        cdv.setUint16(34, 0, true);
        cdv.setUint16(36, 0, true);
        cdv.setUint32(38, 0, true);
        cdv.setUint32(42, offset, true);
        cdh.set(nameBytes, 46);

        centralParts.push(cdh);
        offset += lfh.length + len;
      });

      var cdSize = 0;
      centralParts.forEach(function(p) { cdSize += p.length; });

      // End of Central Directory Record (22 bytes)
      var eocd = new Uint8Array(22);
      var edv = new DataView(eocd.buffer);
      edv.setUint32(0, 0x06054b50, true);
      edv.setUint16(4, 0, true);
      edv.setUint16(6, 0, true);
      edv.setUint16(8, filesArray.length, true);
      edv.setUint16(10, filesArray.length, true);
      edv.setUint32(12, cdSize, true);
      edv.setUint32(16, offset, true);
      edv.setUint16(20, 0, true);

      var allBlobs = localParts.concat(centralParts, [eocd]);
      return new Blob(allBlobs, { type: 'application/zip' });
    }

    window.downloadZIP = function() {
      try {
        var fullHtml = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
        var styleEl = document.querySelector('style');
        var scriptEls = document.querySelectorAll('script');
        var mainScript = scriptEls[scriptEls.length - 1];

        var readme = [
          "O-JÄRJESTÖ 4K MEGAREALISTINEN ESITYSSIVUSTO & 3D LINNA (14 SIVUA)",
          "=================================================================",
          "Tämä ZIP-paketti sisältää:",
          "1. index.html - Täydellinen 14-sivuinen 4K-sivusto ja Sivun 14 3D Pöllöjen Linna",
          "2. style.css  - Sivuston 4K-ulkoasu ja animaatiot",
          "3. script.js  - 3D-moottori, ääniefektit, aseet ja salaisuudet",
          "",
          "Käyttöohje:",
          "Pura ZIP-tiedosto omalle tietokoneellesi ja tuplaklikkaa 'index.html'!"
        ].join("\r\n");

        var zipBlob = createZipBlob([
          { name: "o_jarjesto_4k_sivusto/index.html", content: fullHtml },
          { name: "o_jarjesto_4k_sivusto/style.css", content: styleEl ? styleEl.textContent : "" },
          { name: "o_jarjesto_4k_sivusto/script.js", content: mainScript ? mainScript.textContent : "" },
          { name: "o_jarjesto_4k_sivusto/LUE_MINUT.txt", content: readme }
        ]);

        var url = URL.createObjectURL(zipBlob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'o_jarjesto_4k_sivusto.zip';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 300);
        showToast('📦 Ladataan o_jarjesto_4k_sivusto.zip omalle koneellesi!');
      } catch (err) {
        showToast('⚠️ ZIP-latausvirhe: ' + err.message);
      }
    };

    window.downloadHTML = function() {
      try {
        var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
        var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'o_jarjesto_4k_esitys.html';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 250);
        showToast('📥 Ladataan o_jarjesto_4k_esitys.html omalle koneellesi!');
      } catch (err) {
        showToast('⚠️ Latausvirhe: ' + err.message);
      }
    };

    // Ambient Background Starfield for 2D Slides
    window.addEventListener('DOMContentLoaded', function() {
      buildDots();
      var sc = document.getElementById('starCanvas');
      if (!sc) return;
      var ctx = sc.getContext('2d');
      function resizeStars() { sc.width = window.innerWidth; sc.height = window.innerHeight; }
      resizeStars();
      window.addEventListener('resize', resizeStars);
      var stars = [];
      for (var i = 0; i < 65; i++) {
        stars.push({ x: Math.random() * sc.width, y: Math.random() * sc.height, r: Math.random() * 1.8 + 0.4, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
      }
      function tickStars() {
        ctx.clearRect(0, 0, sc.width, sc.height);
        ctx.fillStyle = 'rgba(186, 230, 253, 0.45)';
        stars.forEach(function(s) {
          s.x = (s.x + s.vx + sc.width) % sc.width;
          s.y = (s.y + s.vy + sc.height) % sc.height;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(tickStars);
      }
      tickStars();
    });
  