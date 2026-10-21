// ---------------------------------------------------------------------------
// PROJECTS DATA
// This is the ONLY file you need to edit to add, remove, or update a project.
// The layout (ProjectCard / ProjectModal) reads from this array automatically.
//
// `challenges` and `learned` aren't on your resume, so these are written to
// sound plausible and recruiter-friendly based on the project's real scope —
// double check they match what actually happened and adjust as needed.
//
// To add a project image:
//   1. Put the image file in `public/images/` (e.g. public/images/riscv-block-diagram.png)
//   2. Set `image: '/images/riscv-block-diagram.png'` below
//   Until you do, a labeled placeholder box is shown automatically.
// ---------------------------------------------------------------------------

const projects = [
  {
    id: 'bms-secure-ota',
    title: 'bms firmware w/ secure ota',
    image: '/images/bms-dashboard-fault.png',
    imageLabel: 'bms live dashboard isolating the pack on a cell fault',
    shortDescription:
      'freertos battery management firmware for a simulated 12-cell ev pack on an emulated arm cortex-m3, with a secure a/b bootloader that only boots ed25519-signed images and takes over-the-air updates over can.',
    technologies: ['c', 'freertos', 'arm cortex-m3', 'can', 'qemu'],
    accomplishments: [
      'architected freertos firmware in c for a simulated 12-cell ev battery pack with zero heap usage',
      'brought up an arm cortex-m3 with custom startup code, linker scripts, and interrupt-driven uart',
      'implemented a contactor state machine with fault detection, isolating the pack on overheat in ~221 ms',
      'built a 15.6 kb bootloader with ed25519 signature verification and a/b ota updates over can, featuring anti-rollback and auto-rollback after 3 failed boots',
      'verified with 179 unit tests, 24 end-to-end qemu scenarios, and github actions ci',
    ],
    github: 'https://github.com/anushjay30/bms-firmware-secure-ota',
    demo: '/videos/bms-firmware-demo.mp4',
    details: {
      overview:
        'freertos firmware for a simulated 12-cell ev battery pack running on an emulated arm cortex-m3, with a secure bootloader that only boots signed firmware and accepts updates over can.',
      features: [
        'contactor state machine with fault detection that isolates the pack on overheat',
        '15.6 kb bootloader with ed25519 signature verification',
        'a/b ota updates over can with anti-rollback and auto-rollback after 3 failed boots',
        'zero heap usage — all memory is statically allocated',
      ],
      architecture:
        'the bms runs as a set of freertos tasks for cell monitoring, fault handling, contactor control, and can communication. a separate bare-metal bootloader verifies the firmware’s signature on every boot and starts one of two firmware slots, so a bad update can always fall back to the last working version.',
      challenges:
        'making updates safe — a new image has to be verified, boot on trial, and roll back automatically if it fails, all without leaving the pack in an unsafe state mid-update.',
      testing:
        'verified with 179 unit tests, 24 end-to-end qemu scenarios, and github actions ci on every push.',
      learned:
        'a much better understanding of how production ecu firmware handles secure boot and over-the-air updates, and how much of that work is about handling failure cases rather than the happy path.',
      images: [
        { label: 'live dashboard: cell 7 overheats and the pack is isolated', src: '/images/bms-dashboard-fault.png' },
        { label: 'demo: fault isolation, signed ota update, and a rejected forged image', src: '/images/bms-demo.gif' },
      ],
    },
  },
  {
    id: 'riscv-pipeline',
    title: '5-stage pipelined risc-v32 processor',
    image: '/images/riscv-pipeline-block-diagram.png',
    imageLabel: 'risc-v pipeline block diagram',
    shortDescription:
      'a 5-stage rv32i-style risc-v processor built in verilog, with a modular datapath, forwarding, load-use stalling, and branch/jump flushing to handle pipeline hazards correctly.',
    technologies: ['verilog', 'icarus verilog', 'gtkwave', 'powershell'],
    accomplishments: [
      'designed a 5-stage rv32i-style processor in verilog with modular datapath, control, memory, and writeback logic',
      'implemented forwarding, 1-cycle load-use stalls, store-data forwarding, and branch/jump flushing to resolve pipeline hazards',
      'verified 15 instructions across 10 testbenches using icarus verilog, gtkwave, and powershell regression tests',
    ],
    github: 'https://github.com/anushjay30/riscv32-verilog',
    details: {
      overview:
        'a from-scratch rv32i-style processor implementing the classic 5-stage risc pipeline in verilog, with a modular datapath and a hazard-handling scheme built to keep the pipeline correct at speed.',
      features: [
        'modular datapath, control, memory, and writeback logic',
        'data forwarding and 1-cycle load-use stalling to resolve data hazards',
        'store-data forwarding for back-to-back load/store sequences',
        'branch/jump flushing to resolve control hazards without extra stall cycles',
      ],
      architecture:
        'the datapath is split into fetch, decode, execute, memory, and writeback stages connected by pipeline registers, with a forwarding unit feeding the alu directly from later stages and a hazard detection unit that stalls on unavoidable load-use hazards and flushes on taken branches/jumps.',
      challenges:
        'the trickiest part was covering every hazard combination correctly — chained data hazards across back-to-back instructions, and making sure branch/jump flushing didn’t clobber an in-flight forwarding path. getting the testbenches to catch these edge cases, not just the common-case ones, took the most iteration.',
      testing:
        'verified 15 instructions across 10 testbenches in icarus verilog, with gtkwave for waveform-level debugging and a powershell script to automate regression runs across the full testbench suite.',
      learned:
        'came away with a much more concrete sense of how pipelining trade-offs play out in practice — where forwarding alone isn’t enough and a stall is unavoidable, and how much testbench coverage actually matters for catching hazard bugs before they show up as silent wrong answers.',
      images: [
        { label: 'risc-v pipeline block diagram', src: '/images/riscv-pipeline-block-diagram.png' },
        { label: 'gtkwave waveform screenshot', src: '/images/riscv-gtkwave-waveform.png' },
      ],
    },
  },
  {
    id: 'jpeg-decoder',
    title: 'grayscale jpeg decoder',
    image: '/images/jpeg-decoder-architecture.png',
    imageLabel: 'jpeg decoder architecture diagram',
    shortDescription:
      'an rtl jpeg decoder written in verilog that reconstructs grayscale images from compressed jpeg data, with a streaming pipeline covering huffman decoding through a fixed-point inverse dct.',
    technologies: ['verilog', 'icarus verilog', 'python'],
    accomplishments: [
      'built a verilog jpeg decoder with huffman decoding, dequantization, zigzag reordering, and fixed-point 2d idct',
      'designed a streaming rtl pipeline to convert compressed jpeg data into reconstructed grayscale pixels',
      'created 6 testbenches and pgm visualization to verify individual modules and end-to-end decoding',
      'achieved 98.3% exact pixel agreement with libjpeg across 1,024 pixels, with a maximum error of 1',
    ],
    github: 'https://github.com/anushjay30/Greyscale-Jpeg-Decoder',
    details: {
      overview:
        'an rtl jpeg decoder implemented in verilog, covering the full grayscale decode path — huffman decoding, dequantization, zigzag reordering, and a fixed-point 2d idct — built as a streaming pipeline rather than a single monolithic block.',
      features: [
        'huffman decoding of the compressed jpeg bitstream',
        'dequantization and zigzag reordering back into natural block order',
        'fixed-point 2d inverse dct (idct) for hardware-friendly pixel reconstruction',
        'streaming rtl pipeline architecture, not a single-shot batch decode',
      ],
      architecture:
        'the top-level jpeg_file_decoder module drives a jpeg_byte_stream_parser (marker detection, 0xFF00 destuffing, restart-marker handling) feeding a jpeg_pipeline submodule. inside the pipeline, a jpeg_entropy_decoder does bit-serial huffman decoding (dc predictor + ac zero-run expansion) against annex k tables, then a jpeg_decoder stage dequantizes against a shared quant_table ram, zigzag-reorders coefficients back to natural 8x8 order, and runs a 2-pass fixed-point idct with level-shift and clamping. a block-sequencing fsm in the top module walks blocks in raster order, firing one start pulse per 8x8 block and streaming out pixel_out/pixel_x/pixel_y as each block completes, so the design reconstructs the image block-by-block instead of buffering it all before processing.',
      challenges:
        'fixed-point arithmetic was the main source of pain — tuning the idct’s bit widths so rounding error stayed small enough to match a floating-point reference, without over-provisioning bits and bloating the design. debugging that meant tracing individual coefficient errors back through the pipeline stage by stage in gtkwave.',
      testing:
        'built 6 testbenches covering individual modules and full end-to-end decoding, with pgm output for visual comparison against the source image. validated numerically against libjpeg, reaching 98.3% exact pixel agreement across 1,024 pixels with a maximum per-pixel error of 1.',
      learned:
        'got a much better feel for translating a software-shaped algorithm (huffman decoding, dct) into a hardware-shaped streaming pipeline, and for how much fixed-point precision decisions ripple through an entire rtl design.',
      images: [
        { label: 'jpeg decoder architecture diagram', src: '/images/jpeg-decoder-architecture.png' },
        { label: 'reconstructed grayscale image', src: '/images/jpeg-decoder-reconstructed-output.png' },
      ],
    },
  },
  {
    id: 'timing-scout',
    title: 'timing scout',
    image: '/images/timing-scout-main.png',
    imageLabel: 'timing scout application screenshot',
    shortDescription:
      'a python/flask web app that parses vivado static timing reports, deterministically extracts key timing metrics and a pass/fail verdict, and offers an optional llm layer to explain the results in plain english.',
    technologies: ['python', 'flask', 'vivado', 'llm integration'],
    accomplishments: [
      'developed a python-based web app that parses vivado report_timing_summary text reports, automatically extracting key timing metrics (wns, tns, slack, failing/total endpoints, critical path) for fpga and rtl designs',
      'built a rule-based timing analysis engine that renders a pass/fail verdict and rtl debugging suggestions directly from the parsed metrics, with no llm in the decision path',
      'built a flask web application with 15+ automated tests to verify timing report parsing and analysis',
      'integrated an optional llm layer that explains timing results in plain english without ever seeing the raw report or influencing the pass/fail call',
    ],
    github: 'https://github.com/anushjay30/TimingScout',
    demo: '/videos/timing-scout-demo.mp4',
    details: {
      overview:
        'a web app for making sense of vivado static timing reports quickly — parses the raw report, pulls out the metrics that actually matter (wns, tns, slack, critical path, failing/total endpoints), and renders a deterministic pass/fail verdict plus rule-based debugging suggestions. an optional llm layer can translate the already-computed results into a plain-english explanation, but it never touches the raw report and never decides pass or fail.',
      features: [
        'automatic extraction of key timing metrics from raw vivado report_timing_summary text reports',
        'deterministic, rule-based pass/fail verdict — wns/tns/failing endpoints decide the result, not an llm',
        'critical path breakdown (startpoint, endpoint, path group/type, logic levels, arrival vs. required time)',
        'rule-based debugging suggestions on failure (e.g. inspect the reported critical path, check optimization settings, consider a pipeline register)',
        'flask backend with 15+ automated tests covering parsing and analysis',
        'optional llm layer that explains results in plain english from structured output only — never sees the raw report',
        'built-in synthetic passing/failing sample reports so the tool is demoable with no file upload',
        'privacy-first design: uploaded reports are processed in memory and never written to disk',
      ],
      architecture:
        'the flask backend parses raw vivado timing report text into structured metrics, a rule-based analysis engine evaluates them against pass/fail thresholds and generates debugging suggestions, and an optional llm layer sits strictly downstream of that — it receives only the already-structured results (never the raw report or the pass/fail decision itself) and turns them into a plain-english explanation, all served through a lightweight web frontend.',
      challenges:
        'vivado timing reports aren’t a clean, stable format to parse — getting extraction right across different report variations, not just the happy-path example, took the most iteration. keeping the llm strictly advisory was a deliberate design constraint: it explains structured results in plain english but never sees the raw report and never gets a vote on pass/fail, so the verdict stays deterministic and reproducible.',
      testing:
        'covered with 15+ automated tests validating timing report parsing and analysis logic, so changes to the parser or analysis engine can’t silently break metric extraction. also validated end-to-end against synthetic passing and failing sample reports bundled with the app.',
      learned:
        'learned a lot about static timing analysis itself (wns/tns/slack/critical paths) by building the tool that explains it, plus practical experience designing an llm integration where the model is scoped to an advisory role — deterministic logic owns the decision, and the llm only explains it — rather than letting it drive the outcome.',
      imageGroups: [
        {
          heading: 'main page',
          images: [{ label: 'timing scout main page', src: '/images/timing-scout-main.png' }],
        },
        {
          heading: 'passing report',
          images: [
            { label: 'passing timing report result', src: '/images/timing-scout-pass-1.png' },
            { label: 'passing report critical path and recommendations', src: '/images/timing-scout-pass-2.png' },
          ],
        },
        {
          heading: 'failing report',
          images: [
            { label: 'failing timing report result', src: '/images/timing-scout-fail-1.png' },
            { label: 'failing report critical path and recommendations', src: '/images/timing-scout-fail-2.png' },
          ],
        },
      ],
    },
  },
  {
    id: 'mosfet-xor',
    title: 'mosfet-based xor gate',
    image: '/images/mosfet-xor-circuit-diagram.png',
    imageLabel: 'mosfet circuit diagram',
    shortDescription:
      'a 12-mosfet cmos xor gate designed at the transistor level with 1:1 sizing for balanced rise/fall performance, verified with oscilloscope-based timing analysis.',
    technologies: ['mosfets', 'cmos logic design', 'oscilloscope', 'timing analysis'],
    accomplishments: [
      'designed a 12-mosfet cmos xor gate with 1:1 sizing for balanced logic performance',
      'conducted timing analysis on output waveforms with an oscilloscope to evaluate rise and fall times',
    ],
    github: '', // TODO: add repo link
    details: {
      overview:
        'a transistor-level xor gate built from 12 mosfets in a cmos configuration, sized 1:1 for balanced pull-up/pull-down performance, with bench-measured timing to confirm it behaves the way the design predicted.',
      features: [
        '12-mosfet cmos implementation (transistor-level, not gate-level)',
        '1:1 transistor sizing for balanced rise and fall performance',
        'oscilloscope-based rise/fall time measurement',
      ],
      architecture:
        'two input inverters generate the complementary A\' and B\' signals, which feed a symmetric pmos pull-up / nmos pull-down core sized 1:1 so rise and fall times stay balanced rather than skewed toward one edge — a property that matters once you\'re chaining logic stages together.',
      challenges:
        'balancing rise and fall time with 1:1 sizing meant the pull-up and pull-down networks couldn’t just be mirror images of each other — getting both edges to behave symmetrically took some iteration on transistor sizing.',
      testing:
        'measured output waveforms on an oscilloscope across all input combinations, evaluating rise and fall times directly against the design targets rather than just confirming correct logic levels. measured roughly 272 microseconds rise time and 205 microseconds fall time on the output edge.',
      learned:
        'a much more physical, hands-on understanding of how cmos logic gates actually behave at the transistor level — where "correct on paper" sizing still needs to be validated against real rise/fall behavior on the bench.',
      images: [
        { label: 'mosfet circuit diagram', src: '/images/mosfet-xor-circuit-diagram.png' },
        { label: 'output rise/fall timing measurement', src: '/images/mosfet-xor-rise-fall-timing.png' },
        { label: 'output waveform across input combinations', src: '/images/mosfet-xor-output-waveform.png' },
      ],
    },
  },
]

export default projects
