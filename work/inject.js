<script>
(function(){
  var done = false;
  var attempts = 0;
  var MAX = 30;

  function inject(){
    if(done) return;
    attempts++;
    var container = document.querySelector('.space-y-5');
    if(!container) { if(attempts<MAX) setTimeout(inject,200); return; }

    // Find the IELTS card (original Next.js card)
    var ieltsCard = container.querySelector('a[href="/portfolio/work/ielts-trainer/"]');
    if(!ieltsCard) { if(attempts<MAX) setTimeout(inject,200); return; }

    // ── 1. Add live demo link to IELTS card's bottom div ──
    var ieltsBottom = ieltsCard.querySelector('.mt-auto.pt-4');
    if(ieltsBottom && !ieltsBottom.querySelector('a[data-link="ielts-demo"]')){
      ieltsBottom.className = 'mt-auto pt-4 flex items-center gap-4';
      var ieltsLink = document.createElement('a');
      ieltsLink.href = 'https://astonishing-sunburst-959e47.netlify.app';
      ieltsLink.target = '_blank';
      ieltsLink.rel = 'noopener';
      ieltsLink.className = 'text-sm font-medium text-[#6366F1] hover:underline';
      ieltsLink.setAttribute('data-link','ielts-demo');
      ieltsLink.textContent = '在线体验 ↗';
      ieltsLink.onclick = function(e){ e.stopPropagation(); };
      ieltsBottom.appendChild(ieltsLink);
    }

    // ── 2. Move IELTS card to the top ──
    var firstChild = container.firstElementChild;
    if(firstChild && firstChild !== ieltsCard.parentElement){
      container.insertBefore(ieltsCard.parentElement, firstChild);
    }

    // ── 3. Inject App Review Insights card after IELTS ──
    if(!container.querySelector('a[data-inject="review"]')){
      var wrapper = document.createElement('div');
      wrapper.className = '';
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(24px)';

      var card = document.createElement('a');
      card.href = '/portfolio/work/app-review-insights/';
      card.setAttribute('data-inject','review');
      card.className = 'group card flex flex-col overflow-hidden p-0 transition hover:border-accent-300 dark:hover:border-accent-700 md:flex-row';

      var iconDiv = document.createElement('div');
      iconDiv.className = 'flex h-40 items-center justify-center text-5xl md:w-56 md:flex-shrink-0';
      iconDiv.style.background = 'linear-gradient(135deg, #d9770622, #d9770608)';
      var iconSpan = document.createElement('span');
      iconSpan.textContent = '🔍';
      iconDiv.appendChild(iconSpan);

      var bodyDiv = document.createElement('div');
      bodyDiv.className = 'flex flex-1 flex-col p-6';

      // Meta line
      var metaDiv = document.createElement('div');
      metaDiv.className = 'flex flex-wrap items-center gap-2 text-xs';
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.style.cssText = 'border-color:#d9770655;color:#d97706';
      chip.textContent = 'AI 产品分析工具';
      metaDiv.appendChild(chip);
      var dateSpan = document.createElement('span');
      dateSpan.className = 'text-muted';
      dateSpan.textContent = '2026.07';
      metaDiv.appendChild(dateSpan);
      var dotSpan = document.createElement('span');
      dotSpan.className = 'text-muted';
      dotSpan.textContent = '· 可交互原型';
      metaDiv.appendChild(dotSpan);

      var title = document.createElement('h2');
      title.className = 'mt-2 text-xl font-semibold leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400';
      title.textContent = 'App Review Insights';

      var subtitle = document.createElement('p');
      subtitle.className = 'mt-1 text-sm text-soft';
      subtitle.textContent = 'AI 驱动的 App Store 评论分析与产品规划工具';

      var desc = document.createElement('p');
      desc.className = 'mt-3 line-clamp-2 text-sm leading-relaxed text-muted';
      desc.textContent = '从 App Store 评论中自动挖掘用户痛点、生成分类洞察、输出结构化 PRD 与测试用例，覆盖从"数据采集"到"可追溯验证"的完整产品分析闭环。支持 DeepSeek、通义千问、OpenAI、Gemini 四种 AI 模型，单文件部署零运维。';

      // Tags
      var tagsDiv = document.createElement('div');
      tagsDiv.className = 'mt-4 flex flex-wrap gap-1.5';
      ['#AI 产品','#数据分析','#PRD 自动化','#全栈开发'].forEach(function(t){
        var tag = document.createElement('span');
        tag.className = 'chip text-xs text-muted';
        tag.textContent = t;
        tagsDiv.appendChild(tag);
      });

      // Bottom links
      var bottomDiv = document.createElement('div');
      bottomDiv.className = 'mt-auto pt-4 flex items-center gap-4';
      var caseLink = document.createElement('span');
      caseLink.className = 'text-sm font-medium text-accent-600 dark:text-accent-400';
      caseLink.textContent = '查看 Case Study →';
      bottomDiv.appendChild(caseLink);
      var demoLink = document.createElement('a');
      demoLink.href = 'https://review-pilot-9.netlify.app';
      demoLink.target = '_blank';
      demoLink.rel = 'noopener';
      demoLink.className = 'text-sm font-medium text-[#d97706] hover:underline';
      demoLink.textContent = '在线体验 ↗';
      demoLink.onclick = function(e){ e.stopPropagation(); };
      bottomDiv.appendChild(demoLink);

      bodyDiv.appendChild(metaDiv);
      bodyDiv.appendChild(title);
      bodyDiv.appendChild(subtitle);
      bodyDiv.appendChild(desc);
      bodyDiv.appendChild(tagsDiv);
      bodyDiv.appendChild(bottomDiv);

      card.appendChild(iconDiv);
      card.appendChild(bodyDiv);
      wrapper.appendChild(card);

      // Insert after the IELTS card wrapper
      var ieltsWrapper = ieltsCard.parentElement;
      if(ieltsWrapper && ieltsWrapper.nextSibling){
        container.insertBefore(wrapper, ieltsWrapper.nextSibling);
      } else {
        container.appendChild(wrapper);
      }

      // Animate in
      requestAnimationFrame(function(){
        wrapper.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0)';
      });
    }

    done = true;
  }

  // Start polling after a short delay to let Next.js hydrate
  setTimeout(inject, 300);
  setTimeout(inject, 800);
  setTimeout(inject, 1500);

  // Also use MutationObserver as fallback
  var mo = new MutationObserver(function(){
    if(!done) inject();
  });
  mo.observe(document.body, {childList:true, subtree:true});
  setTimeout(function(){ mo.disconnect(); }, 6000);
})();
</script>