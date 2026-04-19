function copyBibTeX() {
  const bibtexElement = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const copyText = button ? button.querySelector(".copy-text") : null;

  if (!bibtexElement || !button || !copyText) {
    return;
  }

  navigator.clipboard.writeText(bibtexElement.textContent).then(() => {
    button.classList.add("copied");
    copyText.textContent = "Copied";

    window.setTimeout(() => {
      button.classList.remove("copied");
      copyText.textContent = "Copy";
    }, 1800);
  }).catch(() => {
    copyText.textContent = "Failed";
    window.setTimeout(() => {
      copyText.textContent = "Copy";
    }, 1800);
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function resetPageToHero() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);
  document.body.classList.remove("hero-collapsed");
  document.body.classList.remove("page-nav-visible");
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    hero.classList.remove("is-collapsed");
  }
}

function setupPageNavigation() {
  const progress = document.querySelector("[data-reading-progress]");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateNavigationState() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

    document.body.classList.toggle("page-nav-visible", scrollTop > 120);

    if (progress) {
      progress.style.width = `${progressValue * 100}%`;
    }

    let activeId = sections[0] ? sections[0].id : "";
    sections.forEach((section) => {
      if (section.offsetTop - 140 <= scrollTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  }

  updateNavigationState();
  window.addEventListener("scroll", updateNavigationState, { passive: true });
  window.addEventListener("resize", updateNavigationState);
}

function setupMediaCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) {
    return;
  }

  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");

  if (!track || slides.length === 0 || !prevButton || !nextButton || !dotsWrap) {
    return;
  }

  let currentIndex = 0;
  let visibleCount = 3;
  let maxIndex = 0;
  let dots = [];

  function getGap() {
    const style = window.getComputedStyle(track);
    const gap = style.columnGap || style.gap || "0";
    return Number.parseFloat(gap) || 0;
  }

  function getSlideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

  function rebuildDots() {
    dotsWrap.innerHTML = "";
    dots = Array.from({ length: Math.max(1, maxIndex + 1) }, (_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to position ${index + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });
  }

  function updateCarousel() {
    const gap = getGap();
    const slideWidth = getSlideWidth();
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  }

  function recalcCarousel() {
    visibleCount = window.innerWidth <= 768 ? 1 : 3;
    maxIndex = Math.max(0, slides.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);
    rebuildDots();
    updateCarousel();
  }

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  });

  window.addEventListener("resize", recalcCarousel);
  recalcCarousel();
}

function setupHeroCollapse() {
  const hero = document.querySelector("[data-hero]");
  if (!hero) {
    return;
  }

  const collapseThreshold = 100;
  let lockedCollapsed = false;
  let hasActivatedCollapseTracking = false;

  function updateHeroState() {
    if (hasActivatedCollapseTracking && window.scrollY > collapseThreshold) {
      lockedCollapsed = true;
    }

    const collapsed = lockedCollapsed;
    hero.classList.toggle("is-collapsed", collapsed);
    document.body.classList.toggle("hero-collapsed", collapsed);
  }

  function activateCollapseTracking() {
    hasActivatedCollapseTracking = true;
    updateHeroState();
  }

  updateHeroState();
  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      activateCollapseTracking();
    }
  }, { passive: true, once: true });

  let touchStartY = 0;
  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0] ? event.touches[0].clientY : 0;
  }, { passive: true });

  window.addEventListener("touchmove", (event) => {
    const currentY = event.touches[0] ? event.touches[0].clientY : touchStartY;
    if (touchStartY - currentY > 0) {
      activateCollapseTracking();
    }
  }, { passive: true, once: true });

  window.addEventListener("scroll", () => {
    updateHeroState();
  }, { passive: true });
}

function setupMethodDiagram() {
  const diagram = document.querySelector("[data-method-diagram]");
  if (!diagram) {
    return;
  }

  const steps = Array.from(diagram.querySelectorAll("[data-method-step]"));
  const nodes = Array.from(diagram.querySelectorAll("[data-method-node]"));
  const links = Array.from(diagram.querySelectorAll("[data-method-link]"));
  const track = diagram.querySelector("[data-method-track]");
  const viewport = diagram.querySelector(".method-steps-viewport");
  const stage = diagram.querySelector(".method-diagram-stage");

  if (steps.length === 0 || nodes.length === 0 || !track || !viewport || !stage) {
    return;
  }

  let activeIndex = 0;
  let wheelLock = false;
  const stepThemes = {
    data: {
      color: "#ef4b34",
      soft: "rgba(239, 75, 52, 0.12)",
      shadow: "rgba(239, 75, 52, 0.16)"
    },
    model: {
      color: "#35a7ff",
      soft: "rgba(53, 167, 255, 0.12)",
      shadow: "rgba(53, 167, 255, 0.16)"
    },
    deployment: {
      color: "#f59e0b",
      soft: "rgba(245, 158, 11, 0.14)",
      shadow: "rgba(245, 158, 11, 0.16)"
    },
    feedback: {
      color: "#22c55e",
      soft: "rgba(34, 197, 94, 0.12)",
      shadow: "rgba(34, 197, 94, 0.16)"
    }
  };

  function setActiveStep(index) {
    activeIndex = Math.max(0, Math.min(index, steps.length - 1));
    const activeStep = steps[activeIndex];
    const stepName = activeStep.dataset.methodStep;
    const theme = stepThemes[stepName] || stepThemes.data;

    stage.style.setProperty("--method-color", theme.color);
    stage.style.setProperty("--method-color-soft", theme.soft);
    stage.style.setProperty("--method-color-shadow", theme.shadow);

    steps.forEach((step) => {
      step.classList.toggle("is-active", step.dataset.methodStep === stepName);
    });

    nodes.forEach((node) => {
      node.classList.toggle("is-active", node.dataset.methodNode === stepName);
    });

    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.methodLink === stepName);
    });

    track.style.transform = `translateX(-${activeIndex * 100}%)`;
  }

  function moveStep(direction) {
    if (steps.length === 0) {
      return false;
    }

    const nextIndex = (activeIndex + direction + steps.length) % steps.length;
    setActiveStep(nextIndex);
    return true;
  }

  diagram.addEventListener("wheel", (event) => {
    const mainDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (Math.abs(mainDelta) < 8) {
      return;
    }

    const direction = mainDelta > 0 ? 1 : -1;

    if (wheelLock) {
      event.preventDefault();
      return;
    }

    const moved = moveStep(direction);
    if (moved) {
      event.preventDefault();
      wheelLock = true;
      window.setTimeout(() => {
        wheelLock = false;
      }, 520);
    }
  }, { passive: false });

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      setActiveStep(index);
    });
  });

  setActiveStep(0);
}

function setupTsnePlot() {
  const plot = document.getElementById("tsne-plot");
  if (!plot) {
    return;
  }

  if (!window.Plotly) {
    const fallbackDots = [
      [22, 28, "#ef4b34"], [30, 36, "#ef4b34"], [18, 46, "#ef4b34"], [34, 52, "#ef4b34"],
      [62, 28, "#35a7ff"], [72, 36, "#35a7ff"], [58, 48, "#35a7ff"], [78, 54, "#35a7ff"],
      [44, 64, "#22c55e"], [52, 72, "#22c55e"], [36, 76, "#22c55e"], [58, 82, "#22c55e"],
      [68, 70, "#f59e0b"], [76, 78, "#f59e0b"], [84, 66, "#f59e0b"], [72, 58, "#f59e0b"]
    ];

    plot.classList.add("tsne-fallback");
    plot.innerHTML = fallbackDots.map(([left, top, color]) => (
      `<span class="tsne-fallback-dot" style="left:${left}%;top:${top}%;--dot-color:${color};"></span>`
    )).join("") + '<div class="tsne-fallback-label">Interactive 3D scatter uses Plotly. If the CDN is unavailable, this static cluster preview keeps the layout intact.</div>';
    return;
  }

  function makeCluster(label, color, cx, cy, cz) {
    const points = Array.from({ length: 42 }, (_, index) => {
      const angle = index * 0.74;
      const radius = 0.35 + (index % 9) * 0.045;
      return {
        x: cx + Math.cos(angle) * radius + (index % 5) * 0.035,
        y: cy + Math.sin(angle * 0.86) * radius,
        z: cz + Math.cos(angle * 1.17) * radius * 0.72
      };
    });

    return {
      name: label,
      type: "scatter3d",
      mode: "markers",
      x: points.map((point) => point.x),
      y: points.map((point) => point.y),
      z: points.map((point) => point.z),
      marker: {
        color,
        size: 4.8,
        opacity: 0.82,
        line: {
          color: "#ffffff",
          width: 0.35
        }
      }
    };
  }

  const traces = [
    makeCluster("Human demos", "#ef4b34", -1.2, 0.2, 0.4),
    makeCluster("Model rollouts", "#35a7ff", 0.8, 0.8, -0.2),
    makeCluster("Held-out tasks", "#22c55e", 0.2, -1.0, 0.5),
    makeCluster("Failure cases", "#f59e0b", 1.35, -0.45, -0.5)
  ];

  const layout = {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: "rgba(255,255,255,0)",
    plot_bgcolor: "rgba(255,255,255,0)",
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: "rgba(255,255,255,0.78)",
      bordercolor: "#e2e8f0",
      borderwidth: 1
    },
    scene: {
      bgcolor: "rgba(248,250,252,0.82)",
      xaxis: {
        title: { text: "t-SNE 1", font: { color: "#334155", size: 12 } },
        showgrid: true,
        gridcolor: "#dbe4ef",
        showline: true,
        linecolor: "#64748b",
        zeroline: true,
        zerolinecolor: "#94a3b8",
        tickfont: { color: "#64748b", size: 10 }
      },
      yaxis: {
        title: { text: "t-SNE 2", font: { color: "#334155", size: 12 } },
        showgrid: true,
        gridcolor: "#dbe4ef",
        showline: true,
        linecolor: "#64748b",
        zeroline: true,
        zerolinecolor: "#94a3b8",
        tickfont: { color: "#64748b", size: 10 }
      },
      zaxis: {
        title: { text: "t-SNE 3", font: { color: "#334155", size: 12 } },
        showgrid: true,
        gridcolor: "#dbe4ef",
        showline: true,
        linecolor: "#64748b",
        zeroline: true,
        zerolinecolor: "#94a3b8",
        tickfont: { color: "#64748b", size: 10 }
      },
      aspectmode: "cube",
      camera: {
        eye: { x: 1.55, y: 1.45, z: 1.1 }
      }
    }
  };

  window.Plotly.newPlot(plot, traces, layout, {
    responsive: true,
    displayModeBar: false
  });
}

function setupMetricsDashboard() {
  const dashboard = document.querySelector("[data-metrics-dashboard]");
  if (!dashboard) {
    return;
  }

  const chart = dashboard.querySelector("[data-metric-chart]");
  const tabs = Array.from(dashboard.querySelectorAll("[data-metric-tab]"));
  const datasets = {
    success: [
      ["Baseline 1", 42, "#64748b", "#94a3b8", "rgba(100, 116, 139, 0.13)"],
      ["Baseline 2", 58, "#7c3aed", "#a78bfa", "rgba(124, 58, 237, 0.12)"],
      ["Project Title", 82, "#ef4b34", "#f59e0b", "rgba(239, 75, 52, 0.13)"]
    ],
    generalization: [
      ["Seen tasks", 86, "#0ea5e9", "#35a7ff", "rgba(14, 165, 233, 0.13)"],
      ["New objects", 74, "#16a34a", "#22c55e", "rgba(34, 197, 94, 0.13)"],
      ["New scenes", 68, "#f97316", "#facc15", "rgba(249, 115, 22, 0.13)"]
    ],
    efficiency: [
      ["Training cost", 54, "#8b5cf6", "#d946ef", "rgba(139, 92, 246, 0.13)"],
      ["Fine-tune time", 71, "#06b6d4", "#2dd4bf", "rgba(6, 182, 212, 0.13)"],
      ["Inference FPS", 88, "#ef4b34", "#fb7185", "rgba(239, 75, 52, 0.13)"]
    ]
  };

  function renderMetric(metricName) {
    const rows = datasets[metricName] || datasets.success;
    chart.innerHTML = rows.map(([label, value, from, to, soft]) => `
      <div class="metric-row" style="--metric-from: ${from}; --metric-to: ${to}; --metric-soft: ${soft};">
        <span class="metric-label">${label}</span>
        <span class="metric-bar-track">
          <span class="metric-bar" style="width: ${value}%;"></span>
        </span>
        <span class="metric-value">${value}%</span>
      </div>
    `).join("");

    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.metricTab === metricName);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => renderMetric(tab.dataset.metricTab));
  });

  renderMetric("success");
}

function setupDemoGallery() {
  const gallery = document.querySelector("[data-demo-gallery]");
  if (!gallery) {
    return;
  }

  const track = gallery.querySelector("[data-demo-track]");
  const cards = Array.from(gallery.querySelectorAll("[data-demo-card]"));
  const prev = gallery.querySelector("[data-demo-prev]");
  const next = gallery.querySelector("[data-demo-next]");
  const dotsWrap = gallery.querySelector("[data-demo-dots]");

  if (!track || cards.length === 0 || !prev || !next || !dotsWrap) {
    return;
  }

  let activeIndex = 0;
  const dots = cards.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "demo-gallery-dot";
    dot.setAttribute("aria-label", `Show demo ${index + 1}`);
    dot.addEventListener("click", () => setActiveDemo(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function setActiveDemo(index) {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      const isPrev = cardIndex === (activeIndex - 1 + cards.length) % cards.length;
      const isNext = cardIndex === (activeIndex + 1) % cards.length;
      const video = card.querySelector("video");
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-prev", isPrev);
      card.classList.toggle("is-next", isNext);
      card.classList.toggle("is-hidden", !isActive && !isPrev && !isNext);
      if (video) {
        if (isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  }

  prev.addEventListener("click", () => setActiveDemo(activeIndex - 1));
  next.addEventListener("click", () => setActiveDemo(activeIndex + 1));
  setActiveDemo(0);
}

resetPageToHero();
setupPageNavigation();
setupMediaCarousel();
setupHeroCollapse();
setupMethodDiagram();
setupTsnePlot();
setupMetricsDashboard();
setupDemoGallery();
window.addEventListener("pageshow", resetPageToHero);

window.addEventListener("scroll", () => {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (!scrollButton) {
    return;
  }

  if (window.scrollY > 320) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
});
