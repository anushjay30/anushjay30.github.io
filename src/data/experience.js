// ---------------------------------------------------------------------------
// EXPERIENCE DATA
// Edit this array to add, remove, or update work experience entries.
// The Experience section renders this list automatically as a timeline.
//
// To add a company/team logo:
//   1. Put the image file in `public/images/` (e.g. public/images/skyjack-logo.png)
//   2. Set that entry's `logo` field below to '/images/skyjack-logo.png'
//   Until you do, a small placeholder box is shown automatically.
// ---------------------------------------------------------------------------

const experience = [
  {
    id: 'formula-electric',
    title: 'firmware engineer',
    company: 'uw formula electric',
    logo: '/images/uwfe-logo.avif',
    dates: 'sept 2024 – present',
    location: 'waterloo, on',
    bullets: [
      'developed stm32 firmware for a dual-stage dc-dc pdu w/ mosfet switching and fsm-based control',
      'developed stm32-based bmu firmware with fsm-driven control, real-time sensing, hv contactor management, and can/isospi communication',
      'validated safety-critical fault detection and protection using hil testing and signal analysis',
    ],
    technologies: ['stm32', 'c', 'c++', 'can', 'isospi', 'fsm design', 'hil testing'],
  },
  {
    id: 'skyjack',
    title: 'embedded systems intern',
    company: 'skyjack',
    logo: '/images/skyjack-logo.png',
    dates: 'sept 2025 – dec 2025',
    location: 'guelph, on',
    bullets: [
      'built c++ tooling to process and visualize 3d mesh data, improving simulation pipeline efficiency by 30%',
      'developed and debugged code for embedded systems communicating over can bus networks',
      'debugged and validated controller, sensor, and electromechanical system behavior on scissor lift platforms using oscilloscopes, dmms, and waveform analysis to root-cause hardware interface issues',
    ],
    technologies: ['c++', 'can', 'oscilloscopes', 'dmms', 'hardware debugging'],
  },
  {
    id: 'waturbine',
    title: 'controls engineer',
    company: 'waturbine',
    logo: '/images/waturbine-logo.png',
    dates: 'may 2025 – aug 2025',
    location: 'waterloo, on',
    bullets: [
      'programmed an arm cortex-m7 microcontroller to control a mini wind turbine brake clamp, implementing deterministic stepper actuation and safety interlocks with sub-millisecond response times',
      'developed an ac-dc rectifier/filtering stage and optimized the low-voltage system for signal integrity',
    ],
    technologies: ['arm cortex-m7', 'c++', 'stepper actuation', 'circuit design'],
  },
]

export default experience
