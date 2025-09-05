# 3D Animation & Transition Guide

This guide covers all the enhanced 3D animations and smooth transitions that have been added to your SpringBoot project frontend.

## 🎨 Overview

Your site now includes:
- **Advanced 3D Transform Effects** - Hover, scale, rotate, and depth animations
- **Smooth Transitions** - Enhanced cubic-bezier timing functions
- **Page Transitions** - Seamless navigation between pages
- **Interactive Elements** - Magnetic, glow, and morphing effects
- **Accessibility Support** - Respects `prefers-reduced-motion`

## 🚀 Quick Start

### Basic Usage
Add these classes to any element to get instant 3D effects:

```html
<!-- Basic 3D hover effects -->
<div class="hover-lift-3d">Hover me!</div>
<div class="hover-scale-3d">Scale on hover</div>
<div class="hover-rotate-3d">Rotate on hover</div>

<!-- Magnetic effect -->
<button class="magnetic-3d">Magnetic button</button>

<!-- Glow effect -->
<div class="glow-3d">Glowing element</div>
```

## 🎯 Animation Classes

### Hover Effects

#### `.hover-lift-3d`
- **Effect**: Lifts element with 3D rotation
- **Use**: Cards, buttons, images
- **Transform**: `translateY(-8px) rotateX(5deg) rotateY(3deg) translateZ(20px)`

#### `.hover-scale-3d`
- **Effect**: Scales with subtle 3D rotation
- **Use**: Icons, small elements
- **Transform**: `scale(1.05) rotateX(2deg) rotateY(2deg) translateZ(10px)`

#### `.hover-rotate-3d`
- **Effect**: Rotates in 3D space
- **Use**: Interactive elements, logos
- **Transform**: `rotateX(10deg) rotateY(10deg) translateZ(15px)`

#### `.magnetic-3d`
- **Effect**: Magnetic attraction with depth
- **Use**: Buttons, navigation items
- **Transform**: `translateZ(15px) scale(1.02)`

#### `.glow-3d`
- **Effect**: Animated gradient border glow
- **Use**: Important buttons, featured elements
- **Animation**: Rotating gradient border

### Continuous Animations

#### `.float-3d`
- **Effect**: Gentle floating with 3D rotation
- **Use**: Logos, decorative elements
- **Duration**: 6 seconds, infinite loop

#### `.pulse-3d`
- **Effect**: Pulsing with 3D scale and glow
- **Use**: Loading states, notifications
- **Duration**: 2 seconds, infinite loop

#### `.bounce-3d`
- **Effect**: Bouncing with 3D rotation
- **Use**: Call-to-action elements
- **Duration**: 1 second, infinite loop

### Entrance Animations

#### Slide Animations
```html
<div class="slide-in-left-3d">Slides from left</div>
<div class="slide-in-right-3d">Slides from right</div>
<div class="slide-in-up-3d">Slides from bottom</div>
<div class="slide-in-down-3d">Slides from top</div>
```

#### Zoom Animations
```html
<div class="zoom-in-3d">Zooms in with 3D rotation</div>
<div class="zoom-out-3d">Zooms out with 3D rotation</div>
```

#### Rotate Animations
```html
<div class="rotate-in-3d">Rotates in with 3D effect</div>
<div class="rotate-out-3d">Rotates out with 3D effect</div>
```

#### Fade Animations
```html
<div class="fade-in-3d">Fades in with 3D movement</div>
<div class="fade-out-3d">Fades out with 3D movement</div>
```

#### Bounce Animations
```html
<div class="bounce-in-3d">Bounces in with 3D effect</div>
<div class="bounce-out-3d">Bounces out with 3D effect</div>
```

#### Elastic Animations
```html
<div class="elastic-in-3d">Elastic entrance with 3D</div>
<div class="elastic-out-3d">Elastic exit with 3D</div>
```

### Special Effects

#### `.flip-3d`
- **Effect**: 3D flip on hover
- **Use**: Cards with front/back content
- **Structure**: Requires `.flip-front` and `.flip-back` children

```html
<div class="flip-3d">
  <div class="flip-front">Front content</div>
  <div class="flip-back">Back content</div>
</div>
```

#### `.tilt-3d`
- **Effect**: 3D tilt on hover
- **Use**: Interactive elements
- **Transform**: `perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)`

#### `.parallax-3d`
- **Effect**: Parallax-like 3D movement
- **Use**: Background elements, decorative items

#### `.morph-3d`
- **Effect**: Morphs shape with 3D rotation
- **Use**: Creative elements, special buttons
- **Transform**: `scale(1.1) rotateX(8deg) rotateY(8deg) translateZ(20px)` + `border-radius: 50%`

## 🎛️ Animation Controls

### Delays
```html
<div class="fade-in-3d delay-1">Delay 0.1s</div>
<div class="fade-in-3d delay-2">Delay 0.2s</div>
<div class="fade-in-3d delay-3">Delay 0.3s</div>
<!-- ... up to delay-8 -->
```

### Durations
```html
<div class="fade-in-3d duration-fast">0.3s duration</div>
<div class="fade-in-3d duration-normal">0.6s duration</div>
<div class="fade-in-3d duration-slow">1s duration</div>
<div class="fade-in-3d duration-slower">1.5s duration</div>
```

### Iterations
```html
<div class="pulse-3d animate-once">Play once</div>
<div class="pulse-3d animate-twice">Play twice</div>
<div class="pulse-3d animate-infinite">Play forever</div>
```

### Fill Modes
```html
<div class="fade-in-3d animate-forwards">Keep final state</div>
<div class="fade-in-3d animate-backwards">Start with first keyframe</div>
<div class="fade-in-3d animate-both">Both forwards and backwards</div>
```

## 📱 Responsive Behavior

All animations automatically adjust for mobile devices:

- **Tablet (≤768px)**: Reduced transform values
- **Mobile (≤480px)**: Minimal transform values
- **Accessibility**: Respects `prefers-reduced-motion`

## 🎨 Page Transitions

### Available Transitions
```javascript
// Fade transition
<Route path="/" element={<Home className="fade-enter" />} />

// Slide transition
<Route path="/about" element={<About className="slide-enter" />} />

// 3D Flip transition
<Route path="/contact" element={<Contact className="flip-enter" />} />

// Zoom transition
<Route path="/services" element={<Services className="zoom-enter" />} />

// 3D Cube transition
<Route path="/portfolio" element={<Portfolio className="cube-enter" />} />

// Elastic transition
<Route path="/blog" element={<Blog className="elastic-enter" />} />
```

### Page Load Animation
```html
<div class="page-load">Entire page animates in</div>
```

### Staggered Elements
```html
<div class="page-stagger">
  <div>Element 1 (delay: 0.1s)</div>
  <div>Element 2 (delay: 0.2s)</div>
  <div>Element 3 (delay: 0.3s)</div>
  <div>Element 4 (delay: 0.4s)</div>
</div>
```

## 🎯 Component-Specific Enhancements

### Buttons
All buttons now have enhanced 3D effects:
- **Hover**: 3D lift with rotation
- **Active**: Pressed state with reduced transform
- **Shimmer**: Light sweep effect on hover
- **Ripple**: Expanding circle effect

### Cards
Cards include multiple 3D effects:
- **Hover**: Lift with 3D rotation
- **Shimmer**: Light sweep across surface
- **Glow**: Subtle background glow
- **Interactive**: Enhanced press states

### Navigation
Navigation elements have:
- **3D Hover**: Lift with rotation
- **Magnetic**: Attraction effect
- **Glow**: Gradient border animation
- **Mobile**: 3D slide-in menu

## 🛠️ Customization

### CSS Variables
Modify these variables in `global.css` to customize animations:

```css
:root {
  /* 3D Transform Variables */
  --perspective: 1000px;
  --perspective-close: 500px;
  --rotate-x-hover: 5deg;
  --rotate-y-hover: 5deg;
  --rotate-x-intense: 10deg;
  --rotate-y-intense: 10deg;
  --scale-hover: 1.05;
  --scale-intense: 1.1;
  --translate-hover: -8px;
  --translate-intense: -15px;
  --depth-shallow: 10px;
  --depth-medium: 20px;
  --depth-deep: 40px;
  
  /* Enhanced Transitions */
  --transition-smooth: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-spring: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --transition-magnetic: 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
```

## 🎨 Color Scheme

The animations use your existing color palette:
- **Primary**: `#667eea` (Blue)
- **Secondary**: `#764ba2` (Purple)
- **Accent**: `#f093fb` (Pink)
- **Success**: `#4facfe` (Light Blue)
- **Warning**: `#f5576c` (Red)

## 🚀 Performance Tips

1. **Use `transform` and `opacity`** - These properties are GPU-accelerated
2. **Avoid animating `width`, `height`, `top`, `left`** - These cause layout recalculations
3. **Use `will-change`** for elements that will animate:
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```
4. **Limit simultaneous animations** - Too many can impact performance

## 🎯 Best Practices

1. **Consistency**: Use similar animation types throughout your site
2. **Purpose**: Each animation should serve a functional purpose
3. **Timing**: Keep animations under 1 second for UI elements
4. **Accessibility**: Always provide reduced-motion alternatives
5. **Testing**: Test on various devices and browsers

## 🔧 Troubleshooting

### Animation Not Working?
1. Check if the class is correctly applied
2. Ensure the element has `display: block` or `display: inline-block`
3. Verify no conflicting CSS is overriding the animation
4. Check browser developer tools for errors

### Performance Issues?
1. Reduce the number of simultaneous animations
2. Use `transform` instead of changing layout properties
3. Add `will-change: transform` to animated elements
4. Consider using `transform3d()` for hardware acceleration

### Mobile Issues?
1. Animations automatically reduce on mobile
2. Check if `prefers-reduced-motion` is being respected
3. Test on actual devices, not just browser dev tools

## 📚 Examples

### Complete Card with Multiple Effects
```html
<div class="card hover-lift-3d glow-3d">
  <div class="card-header">
    <h3 class="text-3d">3D Card Title</h3>
  </div>
  <div class="card-body">
    <p>This card has multiple 3D effects!</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary magnetic-3d">3D Button</button>
  </div>
</div>
```

### Animated Page Section
```html
<section class="page-stagger">
  <h2 class="slide-in-up-3d delay-1">Welcome</h2>
  <p class="fade-in-3d delay-2">This section animates in with staggered timing</p>
  <div class="hover-lift-3d delay-3">
    <img src="image.jpg" alt="3D Image" class="img-3d">
  </div>
</section>
```

### Interactive Navigation
```html
<nav class="navbar-3d">
  <a href="/" class="nav-link nav-magnetic">Home</a>
  <a href="/about" class="nav-link nav-magnetic">About</a>
  <a href="/contact" class="nav-link nav-magnetic">Contact</a>
</nav>
```

---

## 🎉 Conclusion

Your SpringBoot project now has a comprehensive set of 3D animations and smooth transitions! These effects will make your site feel modern, interactive, and engaging while maintaining excellent performance and accessibility.

Start by adding basic hover effects to your existing elements, then gradually incorporate more complex animations as needed. Remember to test on various devices and always consider your users' experience.

Happy animating! 🚀
