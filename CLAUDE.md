# Gymso Fitness → Payload Website Template

## 🎯 Project Overview

We are converting the HTML template **Gymso Fitness** into a fully functional **Payload Website Template**, ensuring that **all component styling matches the original template as closely as possible**. We will **not add unnecessary blocks**; only essential ones for Gymso.

**The first and most important step** is to **modify the Tailwind CSS configuration and gloval.css** to replicate the template globally. This ensures that every component inherits the correct look and feel from the original template. Only after the global styling is correctly set, we continue with asset replacement and essential blocks.

We will also integrate **ShadCN/UI** components wherever possible (buttons, modals, forms, layout) to accelerate development, improve accessibility, and maintain clean code **without affecting the visual design** of the template.

## 📍 Exact Locations

### Source Template (HTML)

- Folder: `/home/evr/Desktop/website-templates/html templates/2119_gymso_fitness/`
- Main file: `index.html`
- Custom CSS: `css/tooplate-gymso-style.css`
- Images: `images/`
- JS: `js/`

### Destination Project (Payload)

- Folder: `/home/evr/Desktop/website-templates/template-2/`
- Base: Official Payload Website Template with Next.js + Tailwind
- Reference clean Payload template: `/home/evr/Desktop/website-templates/clean-payload-webiste-tempalte/` (always refer to this to avoid breaking core logic)

## 🏗️ Original Template Sections

- Header/Navigation
- Hero Section
- Features Section
- About Section
- Classes Section
- Schedule Section
- Contact Section
- Footer
- Membership Modal Form

**Technologies:** Bootstrap 4, Font Awesome, AOS, jQuery, Custom CSS

## 🎨 Styling Approach

**Key Principle:** Each Payload component will **inherit global styles** and replicate the original template's look exactly.

- **Global Tailwind configuration first**: colors, typography, spacing, keyframes, and animations must match the template
- Convert AOS animations into Tailwind/Framer Motion animations
- Ensure responsive design matches the original template
- All components (Blocks, Globals) use Tailwind classes defined globally to maintain visual consistency
- Integrate ShadCN/UI components where possible **without altering visual fidelity**

## 🔒 Preserve Payload & Next.js Core Logic

**Critical Rule:** Do **NOT** modify Payload’s core logic or Next.js routing/system.

### 🔒 Always Keep Intact

- Collections: `Pages`, `Posts`, `Media`, `Categories`, `Users`
- Globals: `Header`, `Footer`, `Settings`
- Blocks definitions (types, fields, relationships)
- TypeScript interfaces
- Next.js routing & folder structure
- Payload API logic

### 🔑 Safe Changes

- Update Tailwind CSS configuration and global styles first to match Gymso template styling (colors, typography, spacing, animations)
- Apply global modular styles so all components inherit correct look
- Replace default logo, images, and assets in the Payload project with **Gymso template assets** before adding blocks
- Add **only essential blocks** for Gymso (e.g., HeroBlock, FeaturesBlock, ClassesBlock, ScheduleBlock, TeamBlock, ContactBlock) after styling and asset replacement
- Use ShadCN/UI components to speed up coding and ensure accessibility **without affecting the template design**

### ❌ Do Not Touch

- Core collections structure beyond adding fields if needed
- Core globals logic (only add fields if needed)
- `_app.tsx`, `_document.tsx`, routing setup
- Payload internal helpers/utilities

## 🧹 Remove Unnecessary Content / Seed Data

**Principle:** Remove only if you have replacement content from the original Gymso template. Do not remove anything that will leave missing content in the site.

### ✅ Keep

- Payload structure (collections, globals, blocks, interfaces, routing)
- Functional blocks: Header, Footer, Hero, Content, Media, Call To Action, Archive
- Only remove demo/seed data **after preparing Gymso content replacements**

### ❌ Remove

- Demo posts/pages/images/texts that will be replaced by Gymso content
- Placeholder navigation/menu items not needed in Gymso
- Unused CSS, JS, Bootstrap/jQuery files
- Font Awesome / AOS libraries (replace with Tailwind + Framer Motion + Heroicons/ShadCN) only after Gymso replacements are ready

## 🔧 Adapting Header and Footer

### Gymso Header

- Logo, Navigation, Social icons
- Mobile responsive using Tailwind breakpoints + React state
- Modify `src/payload/globals/Header.ts` to add `socialLinks`
- **Replace logo with Gymso logo and relevant images before adding any blocks**

### Gymso Footer

- Copyright text
- Contact: email + phone
- 2-column layout
- Modify `src/payload/globals/Footer.ts`
- **Replace placeholder images or icons before adding blocks**

## 🎯 Correct Workflow (Updated)

1. **Modify Tailwind CSS configuration and global styles first** to match Gymso template styling globally.
2. **Replace logo, images, and assets** in the Payload project with Gymso template content.
3. Verify all components inherit correct styles via global classes.
4. Integrate ShadCN/UI components where possible **without altering template design**.
5. Only after global styling and assets are correctly set, add **essential Gymso-specific blocks**.
6. Homepage becomes a Pages collection entry with blocks layout.
7. Gymso blocks added to available blocks array.
8. HTML template converted to JSX with props from blocks.
9. Apply global modular styling to ensure all components look like the original Gymso template.

## 🎯 Optimized Workflow (Learned from Implementation)

### Phase 1: Global Foundation Setup ✅

1. **Analyze original Gymso CSS** (`css/tooplate-gymso-style.css`) to extract:
   - Colors (--primary-color: #f13a11, --dark-color: #171819, etc.)
   - Typography (Plain font family, font sizes, weights)
   - Spacing (section padding: 7rem, border-radius values)

2. **Configure Tailwind globally** (`tailwind.config.mjs`):
   - Add Gymso color palette as utility classes (`gymso-primary`, `gymso-dark`, etc.)
   - Define Gymso font sizes (`gymso-h1: 48px`, `gymso-h2: 36px`, etc.)
   - Set Gymso spacing and border radius values

3. **Setup global CSS** (`src/app/(frontend)/globals.css`):
   - Add font-face declarations for Plain font family
   - Define base typography styles (h1-h6, p, a, strong)
   - Create utility classes (`.gymso-section`, `.gymso-bg-overlay`, `.gymso-btn`)

### Phase 2: Asset Management ✅

4. **Copy Gymso assets** to appropriate Payload locations:
   - Fonts: `/src/app/(frontend)/fonts/` (Plain-Regular, Plain-Light, Plain-Bold)
   - Images: `/public/images/` (hero-bg.jpg, class images, team images)

5. **Replace seed images** with Gymso images:
   - Copy Gymso images to `/src/endpoints/seed/`
   - Update GitHub URLs in seeder to point to your repository
   - Update alt texts in image definition files

### Phase 3: Component Adaptation (Not Creation) ✅

6. **Adapt existing components instead of creating new ones**:
   - **High Impact Hero**: Modified to support Gymso overlay, button styles, typography
   - **CallToAction Block**: Extended with 'gymso-feature' style for dark background layout
   - Keep all existing Payload logic intact

7. **Update seeders with Gymso content**:
   - Hero text: subtitle + main title + button labels
   - CTA content: membership info + working hours
   - Meta descriptions and titles

### Phase 4: Essential Blocks Only (In Progress)

8. **Create ONLY necessary new blocks** (not duplicates):
   - **Classes Block**: For fitness classes with images and pricing
   - **Schedule Block**: For weekly schedule table
   - All other sections use adapted existing blocks

### Key Principles Learned:

- ✅ **Never modify Payload core logic** - only extend existing functionality
- ✅ **Reuse existing components** - adapt rather than recreate
- ✅ **Global styling first** - ensures consistent look across all components
- ✅ **GitHub asset management** - maintain Payload's seeder URL approach
- ✅ **Conditional styling** - add style variants without breaking existing functionality

# Generic HTML to Payload Website Template Guide

## 🎯 Objective

Convert any HTML template into a fully functional Payload Website Template while **preserving Payload logic**, **integrating ShadCN**, and replicating the template's styling globally using Tailwind.

## 📍 Pre-requisites

- Clean Payload Website Template (reference project): `/home/evr/Desktop/website-templates/clean-payload-webiste-tempalte/`
- HTML template to convert.
- Tailwind + ShadCN setup in Payload project.

## 🏗️ General Approach

1. **Analyze HTML template**
   - Identify all sections (Header, Hero, Features, Classes, Contact, Footer, Modals).
   - List all assets (images, fonts, icons, JS behavior).
   - Note animations, colors, spacing, typography.

2. **Prepare global assets before blocks**
   - Replace default Payload logo, favicon, and images with template assets.
   - Update media in Media collection.
   - Ensure all global references (fonts, icons, images) are ready.

3. **Tailwind CSS configuration (first and most important step)**
   - Map all template colors, fonts, spacing, and breakpoints to `tailwind.config.js`.
   - Use the Payload global CSS and integrate template styles without overriding component logic.
   - Integrate ShadCN components wherever possible to reduce custom work, but **do not change template design**.
   - Example of global base setup:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;

     @layer base {
       :root {
         --primary: 222.2 47.4% 11.2%;
         --secondary: 210 40% 96.1%;
         --accent: 210 40% 96.1%;
         --background: 0 0% 100%;
         --foreground: 222.2 84% 4.9%;
         /* ... other color and theme variables ... */
       }
       body {
         @apply bg-background text-foreground min-h-[100vh] flex flex-col;
       }
     }
     ```

4. **Remove unnecessary content / seed data**
   - Delete Posts, Pages, images, and demo content that are not used.
   - Only replace content when you have the correct asset or text from the template.

5. **Blocks integration (add only what is necessary)**
   - **Minimal new blocks**: Only create blocks required by the template (e.g., HeroBlock, FeaturesBlock, ClassesBlock, ContactBlock).
   - Adapt existing Payload blocks when possible.
   - Follow clean template patterns strictly.

6. **React Components**
   - Components must be **presentational only**.
   - Receive props from Payload CMS blocks.
   - Use Tailwind + ShadCN for styling.
   - Respect responsive design; use Tailwind breakpoints.

7. **Animations & Interactivity**
   - Convert any template animations (AOS, jQuery) to Tailwind/Framer Motion.
   - Smooth scroll, modals, or interactive features should be implemented with React + Payload fields.

8. **Testing & Optimization**
   - Test mobile, tablet, desktop responsiveness.
   - Verify Payload CMS functionality (add/edit content, blocks, pages).
   - Ensure performance, lazy loading, accessibility, and global styling consistency.

## 🔒 Rules / Key Notes

- **Never delete Payload logic or standard collections** (Posts, Pages, Media, Categories, Users).
- **Always reference clean Payload Website Template** to check structure and block definitions.
- **Global CSS first**: Adjust Tailwind config before creating blocks to ensure visual consistency.
- **ShadCN components**: Use wherever possible but never override template design.
- **Blocks**: Only add essential new blocks, adapt existing ones instead of creating duplicates.
- **Assets**: Replace logos, images, fonts globally before blocks integration.

## 🎯 Final Outcome

- Template UI matches original HTML template.
- Fully editable via Payload CMS.
- Tailwind and ShadCN used for modular, maintainable styling.
- Animations and interactive elements functional in React.
- Minimal new blocks, Payload logic preserved, clean and scalable structure.
