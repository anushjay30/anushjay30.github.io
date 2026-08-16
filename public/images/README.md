# Images folder

Put your real images here (profile photo, project screenshots/diagrams).

Any file you add is available at `/images/<filename>` in the app. For example:

```
public/images/profile.jpg        -> src="/images/profile.jpg"
public/images/riscv-pipeline.png -> src="/images/riscv-pipeline.png"
```

Then set the matching `image` (or `src`) field in:
- `src/components/About.jsx` for your profile photo
- `src/data/projects.js` for project card and gallery images

Until you add a file, a labeled placeholder box is shown automatically.
