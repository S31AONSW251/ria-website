// RIA Image Library Registry
//
// To add a new image:
// 1. Paste image into public/assets/ria/image-library
// 2. Add a new object below:
// {
//   src: "/assets/ria/image-library/my-new-image.png",
//   title: "My New Image",
//   category: "Brand Concepts",
//   caption: "Short description.",
//   ratio: "wide"
// }
//
// Categories: Orbit OS | DefenseCore | Creative Studio | Brand Concepts | Investor Visuals | Product Screens | Concept Archive
// Ratio: "wide" (16:9) or "square" (1:1)

export type RiaImageCategory =
  | 'Orbit OS'
  | 'DefenseCore'
  | 'Creative Studio'
  | 'Brand Concepts'
  | 'Investor Visuals'
  | 'Product Screens'
  | 'Concept Archive'

export type RiaImageRatio = 'wide' | 'square'

export type RiaImage = {
  src: string
  title: string
  category: RiaImageCategory
  caption: string
  ratio?: RiaImageRatio
}

export const imageLibraryFilters = [
  { id: 'all', label: 'All' },
  { id: 'orbit', label: 'Orbit OS', category: 'Orbit OS' as RiaImageCategory },
  { id: 'defense', label: 'DefenseCore', category: 'DefenseCore' as RiaImageCategory },
  { id: 'creative', label: 'Creative', category: 'Creative Studio' as RiaImageCategory },
  { id: 'brand', label: 'Brand', category: 'Brand Concepts' as RiaImageCategory },
  { id: 'investor', label: 'Investor', category: 'Investor Visuals' as RiaImageCategory },
  { id: 'archive', label: 'Archive', category: 'Concept Archive' as RiaImageCategory }
] as const

const rawImages: RiaImage[] = [
  // Orbit OS
  { src: '/assets/ria/orbit-dashboard-desktop.jpg', title: 'Orbit Dashboard', category: 'Orbit OS', caption: 'RIA Orbit desktop dashboard with telemetry and mission panels.', ratio: 'wide' },
  { src: '/assets/ria/ria-command-grid.jpg', title: 'Command Grid', category: 'Orbit OS', caption: 'Multi-panel command grid for operations and supervision.', ratio: 'wide' },
  { src: '/assets/ria/mission-control-orbit-room.jpg', title: 'Mission Control', category: 'Orbit OS', caption: 'Cinematic Orbit mission control in a command room environment.', ratio: 'wide' },
  { src: '/assets/ria/ria-os-orbit-hero.jpg', title: 'RIA OS Orbit Hero', category: 'Orbit OS', caption: 'RIA OS Orbit dashboard hero screen in a premium interface.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/orbit/ria-orbit-premium-desktop.jpg', title: 'RIA Orbit Premium Desktop', category: 'Orbit OS', caption: 'Curved desktop monitor showing the RIA Orbit command dashboard.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/orbit/orbit-dashboard-square.jpg', title: 'Orbit Dashboard Square', category: 'Orbit OS', caption: 'Square Orbit dashboard concept with dark command interface.', ratio: 'square' },
  { src: '/assets/ria/concept-atlas/orbit/orbit-dashboard-square-alt.jpg', title: 'Orbit Dashboard Square Alt', category: 'Orbit OS', caption: 'Alternative square Orbit dashboard concept.', ratio: 'square' },
  { src: '/assets/ria/concept-atlas/orbit/ria-command-grid.jpg', title: 'RIA Command Grid', category: 'Orbit OS', caption: 'Multi-panel operating system command grid.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/orbit/ria-os-beyond-limits.jpg', title: 'RIA OS Beyond Limits', category: 'Orbit OS', caption: 'RIA OS product page with Orbit dashboard modules.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/orbit/orbit-mission-control-display.jpg', title: 'Orbit Mission Control Display', category: 'Orbit OS', caption: 'Large Orbit mission control screen in a dark command room.', ratio: 'wide' },

  // DefenseCore
  { src: '/images/aion-uploaded/defensecore-dashboard.png', title: 'Defense Dashboard', category: 'DefenseCore', caption: 'DefenseCore dashboard with satellite intelligence and command panels.', ratio: 'wide' },
  { src: '/images/aion-uploaded/defensecore-command.png', title: 'Command Grid', category: 'DefenseCore', caption: 'DefenseCore command screen with operational metrics.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/defensecore/defensecore-live-satellite-map.jpg', title: 'DefenseCore Live Map', category: 'DefenseCore', caption: 'Live satellite map dashboard with command panels.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/defensecore/defensecore-command-grid.jpg', title: 'DefenseCore Command Grid', category: 'DefenseCore', caption: 'Command grid with intelligence panels and operations feed.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/defensecore/defensecore-dashboard-wide.png', title: 'DefenseCore Dashboard Wide', category: 'DefenseCore', caption: 'Wide DefenseCore dashboard with live satellite visualization.', ratio: 'wide' },

  // Creative Studio
  { src: '/assets/ria/creative-studio-grid.jpg', title: 'Production Grid', category: 'Creative Studio', caption: 'Creative Studio with generated image, video, and asset panels.', ratio: 'wide' },
  { src: '/assets/ria/creative-studio-grid-alt.jpg', title: 'Production Grid Alt', category: 'Creative Studio', caption: 'Alternative Creative Studio command center with media panels.', ratio: 'wide' },
  { src: '/images/aion-uploaded/creative-intelligence-wall.jpg', title: 'Creative Wall', category: 'Creative Studio', caption: 'Cinematic creative intelligence wall with visual assets.', ratio: 'wide' },
  { src: '/images/aion-uploaded/creative-intelligence-wall-alt.jpg', title: 'Creative Wall Alt', category: 'Creative Studio', caption: 'Alternative creative intelligence wall concept.', ratio: 'wide' },
  { src: '/assets/ria/software-studio-command-center.jpg', title: 'Software Studio', category: 'Creative Studio', caption: 'Software Studio command center with agent workspaces.', ratio: 'wide' },
  { src: '/images/aion-uploaded/creative-studio-dashboard.png', title: 'Creative Studio Dashboard', category: 'Creative Studio', caption: 'Creative Studio dashboard with media generation panels.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-intelligence-wall.jpg', title: 'Creative Intelligence Wall', category: 'Creative Studio', caption: 'Creative Intelligence wall with generated visual asset cards.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-intelligence-wall-alt.jpg', title: 'Creative Intelligence Wall Alt', category: 'Creative Studio', caption: 'Alternative Creative Intelligence wall with cinematic cards.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-studio-production-grid.jpg', title: 'Creative Studio Production Grid', category: 'Creative Studio', caption: 'Production grid with generated imagery and asset controls.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-studio-production-grid-alt.jpg', title: 'Creative Studio Production Grid Alt', category: 'Creative Studio', caption: 'Alternative production grid with media generation panels.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-studio-dashboard.jpg', title: 'Creative Studio Dashboard', category: 'Creative Studio', caption: 'Creative Studio dashboard with generated media controls.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-render-archive-a.jpg', title: 'Creative Render Archive A', category: 'Creative Studio', caption: 'Archived creative render concept for visual production testing.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/creative/creative-render-archive-b.jpg', title: 'Creative Render Archive B', category: 'Creative Studio', caption: 'Second archived creative render concept.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/software/software-studio-command-center.jpg', title: 'Software Studio Command Center', category: 'Creative Studio', caption: 'Software Studio with agent workspace and build panels.', ratio: 'wide' },

  // Brand Concepts
  { src: '/images/aion-uploaded/ria-ring-mark.png', title: 'Energy Ring', category: 'Brand Concepts', caption: 'RIA ring mark on a dark energy field.', ratio: 'square' },
  { src: '/images/logos/ria-conscious-logo.png', title: 'Brain Mark', category: 'Brand Concepts', caption: 'RIA brain logo for memory, reasoning, and autonomous work.', ratio: 'square' },
  { src: '/assets/ria/ria-os-company-mosaic-detail.jpg', title: 'Company Mosaic', category: 'Brand Concepts', caption: 'Detailed RIA OS mosaic showing dashboard modules.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/brand/ria-energy-ring-mark.jpg', title: 'RIA Energy Ring Mark', category: 'Brand Concepts', caption: 'RIA wordmark inside a luminous circular energy ring.', ratio: 'square' },
  { src: '/assets/ria/concept-atlas/brand/ria-spectrum-brain-logo.jpg', title: 'Spectrum Brain Logo', category: 'Brand Concepts', caption: 'Color spectrum RIA brain logo on a light background.', ratio: 'square' },
  { src: '/assets/ria/concept-atlas/brand/ria-spectrum-brain-logo-alt.jpg', title: 'Spectrum Brain Logo Alt', category: 'Brand Concepts', caption: 'Alternative color spectrum RIA brain logo.', ratio: 'square' },
  { src: '/images/aion-uploaded/ria-brain-structure.png', title: 'RIA Brain Structure', category: 'Brand Concepts', caption: 'RIA brain structure poster with intelligence modules.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/brain/ria-brain-structure-poster.jpg', title: 'RIA Brain Structure Poster', category: 'Brand Concepts', caption: 'Cognitive modules and memory architecture poster.', ratio: 'wide' },
  { src: '/images/logos/ria-logo.png', title: 'RIA Logo', category: 'Brand Concepts', caption: 'Primary RIA brand logo.', ratio: 'square' },

  // Investor Visuals
  { src: '/images/aion-uploaded/launch-poster.png', title: 'Launch Poster', category: 'Investor Visuals', caption: 'RIA launch poster announcing July 5, 2026.', ratio: 'wide' },
  { src: '/assets/ria/chip-infrastructure-vision.jpg', title: 'Infrastructure Board', category: 'Investor Visuals', caption: 'AI infrastructure chip concept with technical interface.', ratio: 'wide' },
  { src: '/assets/ria/village-impact-transformation.jpg', title: 'Impact Vision', category: 'Investor Visuals', caption: 'Village transformation concept showing infrastructure impact.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/launch/ria-orbit-launch-poster.jpg', title: 'RIA Orbit Launch Poster', category: 'Investor Visuals', caption: 'RIA Orbit launch poster with July 5 2026 date.', ratio: 'square' },
  { src: '/assets/ria/concept-atlas/infrastructure/ria-silicon-investor-board.jpg', title: 'RIA Silicon Investor Board', category: 'Investor Visuals', caption: 'Silicon family investor board showing chip roadmap.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/positioning/beyond-intelligence-comparison.jpg', title: 'Beyond Intelligence Comparison', category: 'Investor Visuals', caption: 'RIA positioning board against generic AI.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/impact/village-transformation-impact.jpg', title: 'Village Transformation Impact', category: 'Investor Visuals', caption: 'Technology-enabled village infrastructure impact concept.', ratio: 'wide' },

  // Product Screens
  { src: '/assets/ria/ria-os-company-mosaic.jpg', title: 'RIA OS Company Mosaic', category: 'Product Screens', caption: 'RIA OS company website mosaic with product panels.', ratio: 'wide' },
  { src: '/assets/ria/ria-os-company-mosaic-alt.jpg', title: 'RIA OS Company Mosaic Alt', category: 'Product Screens', caption: 'Alternative RIA OS company mosaic with OS panels.', ratio: 'wide' },
  { src: '/assets/ria/crypto-core-dashboard.jpg', title: 'Crypto Core Dashboard', category: 'Product Screens', caption: 'Crypto Core dashboard showing private compute monitoring.', ratio: 'wide' },
  { src: '/assets/ria/automotive-engineering-dashboard.jpg', title: 'Automotive Engineering Dashboard', category: 'Product Screens', caption: 'Automotive engineering dashboard with design intelligence.', ratio: 'wide' },
  { src: '/assets/ria/automotive-engineering-dashboard-alt.jpg', title: 'Automotive Engineering Dashboard Alt', category: 'Product Screens', caption: 'Alternative automotive engineering simulation panels.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/company/ria-operating-system-mosaic.jpg', title: 'RIA Operating System Mosaic', category: 'Product Screens', caption: 'Operating system company mosaic with dashboards.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/company/ria-operating-system-mosaic-alt.jpg', title: 'RIA Operating System Mosaic Alt', category: 'Product Screens', caption: 'Alternative operating system company mosaic.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/company/ria-operating-system-mosaic-detail.jpg', title: 'RIA Operating System Detail', category: 'Product Screens', caption: 'Detailed operating system mosaic with brand modules.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/engineering/work-design-evolve-automotive.jpg', title: 'Work Design Evolve Automotive', category: 'Product Screens', caption: 'Automotive engineering dashboard with simulation panels.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/engineering/work-design-evolve-automotive-alt.jpg', title: 'Work Design Evolve Automotive Alt', category: 'Product Screens', caption: 'Alternative automotive engineering dashboard.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/crypto/crypto-core-security-dashboard.jpg', title: 'Crypto Core Security Dashboard', category: 'Product Screens', caption: 'Crypto Core security dashboard with compute controls.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/company/building-next-layer-hero.jpg', title: 'Building The Next Layer', category: 'Product Screens', caption: 'Company hero with humanoid robot and next intelligence layer.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/company/building-next-layer-hero-alt.jpg', title: 'Building The Next Layer Alt', category: 'Product Screens', caption: 'Alternative company hero with humanoid robot and lab scene.', ratio: 'wide' },

  // Concept Archive
  { src: '/assets/ria/humanoid-portrait.jpg', title: 'Humanoid Presence', category: 'Concept Archive', caption: 'Humanoid robotics concept with interface overlays.', ratio: 'wide' },
  { src: '/assets/ria/robotics-lab-bench.jpg', title: 'Robotics Lab', category: 'Concept Archive', caption: 'Robotics lab bench with humanoid prototype and monitors.', ratio: 'wide' },
  { src: '/assets/ria/humanoid-system-board.jpg', title: 'System Board', category: 'Concept Archive', caption: 'Humanoid robotics system board with modular views.', ratio: 'wide' },
  { src: '/assets/ria/humanoid-system-board-alt.jpg', title: 'System Board Alt', category: 'Concept Archive', caption: 'Alternative humanoid system board with engineering panels.', ratio: 'wide' },
  { src: '/assets/ria/automotive-engineering-dashboard.jpg', title: 'Engineering Dashboard', category: 'Concept Archive', caption: 'Applied systems engineering dashboard concept.', ratio: 'wide' },
  { src: '/assets/ria/crypto-core-dashboard.jpg', title: 'Crypto Core', category: 'Concept Archive', caption: 'Private compute monitoring concept.', ratio: 'wide' },
  { src: '/assets/ria/ria-office-lab-wide.jpg', title: 'RIA Lab', category: 'Concept Archive', caption: 'RIA office and robotics laboratory wide view.', ratio: 'wide' },
  { src: '/assets/ria/robotics-workshop-desk.jpg', title: 'Robotics Workshop Desk', category: 'Concept Archive', caption: 'Robotics workshop desk with prototype and hardware.', ratio: 'wide' },
  { src: '/assets/ria/company-hero-humanoid.jpg', title: 'Company Hero Humanoid', category: 'Concept Archive', caption: 'Company hero with humanoid robot and lab environment.', ratio: 'wide' },
  { src: '/assets/ria/company-hero-humanoid-alt.jpg', title: 'Company Hero Humanoid Alt', category: 'Concept Archive', caption: 'Alternative company hero with humanoid robot.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/robotics/humanoid-presence-portrait.jpg', title: 'Humanoid Presence Portrait', category: 'Concept Archive', caption: 'Humanoid concept portrait with interface annotations.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/robotics/ria-robotics-lab-wide.jpg', title: 'RIA Robotics Lab Wide', category: 'Concept Archive', caption: 'Wide robotics laboratory with engineers and humanoid systems.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/robotics/robotics-workshop-desk.jpg', title: 'Robotics Workshop Desk', category: 'Concept Archive', caption: 'Workshop desk with humanoid prototype and monitors.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/robotics/robotics-lab-bench.jpg', title: 'Robotics Lab Bench', category: 'Concept Archive', caption: 'Lab bench with prototype, monitors, and engineering tools.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/robotics/humanoid-system-board.jpg', title: 'Humanoid System Board', category: 'Concept Archive', caption: 'Humanoid system board with modular technical views.', ratio: 'wide' },
  { src: '/assets/ria/concept-atlas/robotics/humanoid-system-board-alt.jpg', title: 'Humanoid System Board Alt', category: 'Concept Archive', caption: 'Alternative humanoid system board.', ratio: 'wide' }
]

function dedupeImages(images: RiaImage[]): RiaImage[] {
  const seen = new Set<string>()
  return images.filter((image) => {
    if (seen.has(image.src)) return false
    seen.add(image.src)
    return true
  })
}

export const riaImages = dedupeImages(rawImages)

export function filterRiaImages(filterId: string): RiaImage[] {
  if (filterId === 'all') return riaImages
  const filter = imageLibraryFilters.find((item) => item.id === filterId)
  if (!filter || !('category' in filter)) return riaImages
  return riaImages.filter((image) => image.category === filter.category)
}
